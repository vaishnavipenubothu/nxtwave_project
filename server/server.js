const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

const apiRoutes = require('./routes/api');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/nxtwave_growth';

// Middleware
app.use(cors());
app.use(express.json());

// Track DB state
app.locals.isMongoConnected = false;

// Attempt MongoDB connection, otherwise use turnkey fallback
mongoose.connect(MONGODB_URI, {
  serverSelectionTimeoutMS: 2000
}).then(() => {
  app.locals.isMongoConnected = true;
  console.log(' Connected to MongoDB at:', MONGODB_URI);
}).catch(err => {
  console.log('ℹ️ MongoDB not found locally. Running with high-performance persistent JSON storage engine.');
  app.locals.isMongoConnected = false;
});

// API Routes
app.use('/api', apiRoutes);

// Root route
app.get('/', (req, res) => {
  res.json({
    project: 'NxtWave Growth Challenge - AI Workshop Platform',
    status: 'Server active',
    apiDocs: '/api/health',
    endpoints: ['/api/register', '/api/referral/:code', '/api/stats', '/api/match-project']
  });
});

app.listen(PORT, () => {
  console.log(` NxtWave Growth Server running on http://localhost:${PORT}`);
});
