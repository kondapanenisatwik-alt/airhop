require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Auth Middleware
const authMiddleware = require('./middleware/authMiddleware');
app.use(authMiddleware);

// Routes
app.get('/', (req, res) => {
  res.send('AirHop backend is running 🚀');
});

// Auth routes
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

// Search routes
const searchRoutes = require('./routes/search');
app.use('/api/search', searchRoutes);

// User routes
const userRoutes = require('./routes/user');
app.use('/api/user', userRoutes);

// Favorite routes
const favoriteRoutes = require('./routes/favorite');
app.use('/api/favorites', favoriteRoutes);

// Review routes
const reviewRoutes = require('./routes/review');
app.use('/api/reviews', reviewRoutes);

// Export routes
const exportRoutes = require('./routes/export');
app.use('/api/export', exportRoutes);

// Share routes
const shareRoutes = require('./routes/share');
app.use('/api/share', shareRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(process.env.PORT, () => {
      console.log(`✅ Server running on http://localhost:${process.env.PORT}`);
    });
  })
  .catch(err => {
    console.error('❌ MongoDB connection error:', err);
  });
