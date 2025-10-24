const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Trade = require('../models/Trade');

// Example: Calculate portfolio based on trades
router.get('/', auth, async (req, res) => {
  try {
    const trades = await Trade.find({ user: req.user._id });
    // Aggregate holdings per asset (simplified)
    const portfolio = {};
    trades.forEach(trade => {
      if (!portfolio[trade.pair]) portfolio[trade.pair] = 0;
      portfolio[trade.pair] += trade.type === 'buy' ? trade.amount : -trade.amount;
    });
    // Return as array
    res.json(Object.entries(portfolio).map(([pair, amount]) => ({
      coin_id: pair.split('/')[0].toLowerCase(),
      amount,
      avg_buy_price: 0 // You can expand this logic as needed
    })));
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
