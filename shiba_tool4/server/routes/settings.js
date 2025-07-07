const express = require('express');
const { User } = require('../models');
const auth = require('../middleware/auth');

const router = express.Router();

// Get user settings
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: ['keeperApiKey', 'rakutenId', 'autoUpdateEnabled']
    });

    res.json({
      settings: {
        keeperApiKey: user.keeperApiKey,
        rakutenId: user.rakutenId,
        autoUpdateEnabled: user.autoUpdateEnabled
      }
    });
  } catch (error) {
    console.error('Get settings error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update user settings
router.put('/', auth, async (req, res) => {
  try {
    const { keeperApiKey, rakutenId, autoUpdateEnabled } = req.body;

    await User.update(
      {
        keeperApiKey,
        rakutenId,
        autoUpdateEnabled
      },
      {
        where: { id: req.user.id }
      }
    );

    res.json({
      message: 'Settings updated successfully',
      settings: {
        keeperApiKey,
        rakutenId,
        autoUpdateEnabled
      }
    });
  } catch (error) {
    console.error('Update settings error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;