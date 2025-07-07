const express = require('express');
const { ProductManagement, User } = require('../models');
const auth = require('../middleware/auth');
const KeeperService = require('../services/keeperService');

const router = express.Router();

// Get all products for user
router.get('/', auth, async (req, res) => {
  try {
    const products = await ProductManagement.findAll({
      where: { userId: req.user.id },
      order: [['createdAt', 'DESC']]
    });

    res.json({ products });
  } catch (error) {
    console.error('Get products error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Add new product
router.post('/', auth, async (req, res) => {
  try {
    const { asin, targetSellPrice, purchasePrice } = req.body;

    if (!asin) {
      return res.status(400).json({ error: 'ASIN is required' });
    }

    // Check if product already exists for this user
    const existingProduct = await ProductManagement.findOne({
      where: { userId: req.user.id, asin }
    });

    if (existingProduct) {
      return res.status(400).json({ error: 'Product already exists in your list' });
    }

    const product = await ProductManagement.create({
      userId: req.user.id,
      asin,
      targetSellPrice: targetSellPrice || null,
      purchasePrice: purchasePrice || null
    });

    res.status(201).json({
      message: 'Product added successfully',
      product
    });
  } catch (error) {
    console.error('Add product error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Fetch product data from Keeper API
router.post('/fetch-data', auth, async (req, res) => {
  try {
    const { productIds } = req.body;

    if (!productIds || !Array.isArray(productIds)) {
      return res.status(400).json({ error: 'Product IDs array is required' });
    }

    const user = await User.findByPk(req.user.id);
    if (!user.keeperApiKey) {
      return res.status(400).json({ error: 'Keeper API key not configured' });
    }

    const keeperService = new KeeperService(user.keeperApiKey);
    const updatedProducts = [];

    for (const productId of productIds) {
      try {
        const product = await ProductManagement.findOne({
          where: { id: productId, userId: req.user.id }
        });

        if (!product) continue;

        const productData = await keeperService.getProductData(product.asin);
        const fees = keeperService.calculateFees(productData.currentPrice, productData.category);

        // Calculate profit
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

        updatedProducts.push(product);
      } catch (error) {
        console.error(`Error updating product ${productId}:`, error);
      }
    }

    res.json({
      message: 'Product data updated successfully',
      updatedProducts
    });
  } catch (error) {
    console.error('Fetch product data error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update product
router.put('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    const { targetSellPrice, purchasePrice } = req.body;

    const product = await ProductManagement.findOne({
      where: { id, userId: req.user.id }
    });

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Recalculate profit if purchase price is updated
    let profit = product.profit;
    if (purchasePrice !== undefined && product.netIncome) {
      profit = product.netIncome - purchasePrice;
    }

    // Check if sellable status changed
    let isSellable = product.isSellable;
    if (targetSellPrice !== undefined && product.currentPrice) {
      isSellable = product.currentPrice >= targetSellPrice;
    }

    await product.update({
      targetSellPrice: targetSellPrice !== undefined ? targetSellPrice : product.targetSellPrice,
      purchasePrice: purchasePrice !== undefined ? purchasePrice : product.purchasePrice,
      profit,
      isSellable
    });

    res.json({
      message: 'Product updated successfully',
      product
    });
  } catch (error) {
    console.error('Update product error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete product
router.delete('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;

    const product = await ProductManagement.findOne({
      where: { id, userId: req.user.id }
    });

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    await product.destroy();

    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Delete product error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;