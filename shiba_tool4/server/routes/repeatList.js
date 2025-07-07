const express = require('express');
const { RepeatList, User } = require('../models');
const auth = require('../middleware/auth');
const KeeperService = require('../services/keeperService');

const router = express.Router();

// Get all repeat list items for user
router.get('/', auth, async (req, res) => {
  try {
    const repeatItems = await RepeatList.findAll({
      where: { userId: req.user.id },
      order: [['profit', 'DESC']] // Order by profit descending
    });

    res.json({ repeatItems });
  } catch (error) {
    console.error('Get repeat list error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Add new repeat item
router.post('/', auth, async (req, res) => {
  try {
    const { asin, purchasePrice } = req.body;

    if (!asin) {
      return res.status(400).json({ error: 'ASIN is required' });
    }

    // Check if item already exists for this user
    const existingItem = await RepeatList.findOne({
      where: { userId: req.user.id, asin }
    });

    if (existingItem) {
      return res.status(400).json({ error: 'Item already exists in your repeat list' });
    }

    const repeatItem = await RepeatList.create({
      userId: req.user.id,
      asin,
      purchasePrice: purchasePrice || null
    });

    res.status(201).json({
      message: 'Repeat item added successfully',
      repeatItem
    });
  } catch (error) {
    console.error('Add repeat item error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update repeat item pricing
router.post('/update-prices', auth, async (req, res) => {
  try {
    const { itemIds } = req.body;

    if (!itemIds || !Array.isArray(itemIds)) {
      return res.status(400).json({ error: 'Item IDs array is required' });
    }

    const user = await User.findByPk(req.user.id);
    if (!user.keeperApiKey) {
      return res.status(400).json({ error: 'Keeper API key not configured' });
    }

    const keeperService = new KeeperService(user.keeperApiKey);
    const updatedItems = [];

    for (const itemId of itemIds) {
      try {
        const item = await RepeatList.findOne({
          where: { id: itemId, userId: req.user.id }
        });

        if (!item) continue;

        const productData = await keeperService.getProductData(item.asin);
        const fees = keeperService.calculateFees(productData.currentPrice, productData.category);

        // For repeat list, sell price equals current price
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

        updatedItems.push(item);
      } catch (error) {
        console.error(`Error updating repeat item ${itemId}:`, error);
      }
    }

    res.json({
      message: 'Repeat list prices updated successfully',
      updatedItems
    });
  } catch (error) {
    console.error('Update repeat list prices error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update repeat item
router.put('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    const { purchasePrice } = req.body;

    const item = await RepeatList.findOne({
      where: { id, userId: req.user.id }
    });

    if (!item) {
      return res.status(404).json({ error: 'Repeat item not found' });
    }

    // Recalculate profit if purchase price is updated
    let profit = item.profit;
    if (purchasePrice !== undefined && item.netIncome) {
      profit = item.netIncome - purchasePrice;
    }

    await item.update({
      purchasePrice: purchasePrice !== undefined ? purchasePrice : item.purchasePrice,
      profit
    });

    res.json({
      message: 'Repeat item updated successfully',
      repeatItem: item
    });
  } catch (error) {
    console.error('Update repeat item error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete repeat item
router.delete('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;

    const item = await RepeatList.findOne({
      where: { id, userId: req.user.id }
    });

    if (!item) {
      return res.status(404).json({ error: 'Repeat item not found' });
    }

    await item.destroy();

    res.json({ message: 'Repeat item deleted successfully' });
  } catch (error) {
    console.error('Delete repeat item error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;