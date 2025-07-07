const express = require('express');
const { User, ProductManagement, RepeatList, PriceHistory } = require('../models');
const auth = require('../middleware/auth');
const KeeperService = require('../services/keeperService');

const router = express.Router();

// Manual price update for all products
router.post('/update-prices', auth, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    
    if (!user.keeperApiKey) {
      return res.status(400).json({ error: 'Keeper API key not configured' });
    }

    const keeperService = new KeeperService(user.keeperApiKey);
    let updatedProducts = 0;
    let updatedRepeatItems = 0;

    // Update product management items
    const products = await ProductManagement.findAll({
      where: { userId: req.user.id }
    });

    for (const product of products) {
      try {
        const productData = await keeperService.getProductData(product.asin);
        const fees = keeperService.calculateFees(productData.currentPrice, productData.category);

        const sellPrice = product.targetSellPrice || productData.currentPrice;
        const netIncome = sellPrice - fees.totalFees;
        const profit = product.purchasePrice ? netIncome - product.purchasePrice : null;
        const isSellable = product.targetSellPrice ? productData.currentPrice >= product.targetSellPrice : false;

        await product.update({
          productName: productData.title,
          productImageUrl: productData.image,
          currentPrice: productData.currentPrice,
          fees: fees.totalFees,
          netIncome,
          profit,
          isSellable
        });

        // Save price history
        await PriceHistory.create({
          asin: product.asin,
          price: productData.currentPrice
        });

        updatedProducts++;
      } catch (error) {
        console.error(`Error updating product ${product.asin}:`, error);
      }
    }

    // Update repeat list items
    const repeatItems = await RepeatList.findAll({
      where: { userId: req.user.id }
    });

    for (const item of repeatItems) {
      try {
        const productData = await keeperService.getProductData(item.asin);
        const fees = keeperService.calculateFees(productData.currentPrice, productData.category);

        const netIncome = productData.currentPrice - fees.totalFees;
        const profit = item.purchasePrice ? netIncome - item.purchasePrice : null;

        await item.update({
          productName: productData.title,
          productImageUrl: productData.image,
          currentPrice: productData.currentPrice,
          fees: fees.totalFees,
          netIncome,
          profit
        });

        // Save price history
        await PriceHistory.create({
          asin: item.asin,
          price: productData.currentPrice
        });

        updatedRepeatItems++;
      } catch (error) {
        console.error(`Error updating repeat item ${item.asin}:`, error);
      }
    }

    res.json({
      message: 'Batch price update completed',
      updatedProducts,
      updatedRepeatItems,
      totalUpdated: updatedProducts + updatedRepeatItems
    });
  } catch (error) {
    console.error('Batch update error:', error);
    res.status(500).json({ error: 'Server error during batch update' });
  }
});

// Get price history for a specific ASIN
router.get('/price-history/:asin', auth, async (req, res) => {
  try {
    const { asin } = req.params;
    const { days = 30 } = req.query;

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - parseInt(days));

    const priceHistory = await PriceHistory.findAll({
      where: {
        asin,
        recordedAt: {
          [require('sequelize').Op.gte]: startDate
        }
      },
      order: [['recordedAt', 'ASC']]
    });

    res.json({ priceHistory });
  } catch (error) {
    console.error('Get price history error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;