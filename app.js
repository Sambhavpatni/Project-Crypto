require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./database');
const authRoutes = require('./routes/auth');
const portfolioRoutes = require('./routes/portfolio');
const tradeRoutes = require('./routes/trade');

const app = express();
connectDB();

app.use(bodyParser.json());
app.use(cors());
app.use(express.static('../frontend'));

app.use('/api/auth', authRoutes);
app.use('/api/portfolio', portfolioRoutes);
app.use('/api/trades', tradeRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Frontend available at http://localhost:${PORT}`);
});
