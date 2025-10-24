const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Trade = require('../models/Trade');

// Create trade
router.post('/', auth, async (req, res) => {
  try {
    const { pair, type, amount, price } = req.body;
    
    if (!pair || !type || !amount || !price) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    // Important: Make sure to use req.user._id (not req.user.id)
    const newTrade = new Trade({
      user: req.user._id,
      pair,
      type,
      amount: Number(amount),
      price: Number(price)
    });
    
    const savedTrade = await newTrade.save();
    console.log('Trade saved:', savedTrade); // For debugging
    
    res.status(201).json(savedTrade);
  } catch (err) {
    console.error('Trade save error:', err);
    res.status(500).json({ error: 'Failed to save trade' });
  }
});

// Get user trades
router.get('/', auth, async (req, res) => {
  try {
    const trades = await Trade.find({ user: req.user._id }).sort({ timestamp: -1 });
    res.json(trades);
  } catch (err) {
    console.error('Error fetching trades:', err);
    res.status(500).json({ error: 'Failed to fetch trades' });
  }
});

module.exports = router;
