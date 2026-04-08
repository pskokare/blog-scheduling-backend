const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Import routes
const blogRoutes = require('./routes/blogRoutes');
const publicRoutes = require('./routes/publicRoutes');
const authorRoutes = require('./routes/authorRoutes');

// Initialize Firebase
const admin = require('firebase-admin');
admin.initializeApp();

// Connect to database
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/blog-scheduling', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = express();

// Middleware
app.use(cors({
  origin: [
    'https://pragati-c2a04.web.app',
    'http://127.0.0.1:5500',
    'http://localhost:5500',
    'http://127.0.0.1:3000',
    'http://localhost:3000'
  ],
  credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/public', publicRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/authors', authorRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error(error.stack);
  res.status(500).json({ 
    message: 'Something went wrong!', 
    error: error.message 
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Export as Firebase Function
exports.api = functions.https.onRequest(app);
