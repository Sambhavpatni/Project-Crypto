const mongoose = require('mongoose');

const TradeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  pair: {
    type: String,
    required: true,
    enum: ['BTC/USDT', 'ETH/USDT', 'SOL/USDT']
  },
  type: {
    type: String,
    required: true,
    enum: ['buy', 'sell']
  },
  amount: {
    type: Number,
    required: true,
    min: 0.0001
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Trade', TradeSchema);
