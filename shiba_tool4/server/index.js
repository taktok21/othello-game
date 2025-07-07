const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const cron = require('node-cron');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/settings', require('./routes/settings'));
app.use('/api/products', require('./routes/products'));
app.use('/api/repeat-list', require('./routes/repeatList'));
app.use('/api/batch', require('./routes/batch'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Shiba Tool 4 API is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Schedule price updates (runs every day at 2 AM)
cron.schedule('0 2 * * *', () => {
  console.log('Running scheduled price update...');
  // TODO: Implement price update logic
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});