// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./config/db'); // Make sure this connects to your MongoDB
const authRoutes = require('./routes/auth'); // Authentication routes
const tripRoutes = require('./routes/trip'); // Trip routes
const packageRoutes = require('./routes/packege'); // Fixed typo from 'packege' to 'package'
const userRoutes = require('./routes/auth'); // User routes
const adminRoutes = require('./routes/Admin'); // Admin routes
const bookingRoutes = require('./routes/booking'); // Booking routes
const User = require('./models/user'); // Adjust the path as necessary

require('dotenv').config();

const app = express();

// Connect to the Database
connectDB();

// Middleware
app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
}));
app.use(express.json()); // Middleware to parse JSON bodies
app.use(express.urlencoded({ extended: false })); // Parse URL-encoded bodies

// Routes
app.use('/api/auth', authRoutes); // Authentication routes
app.use('/api/trip', tripRoutes); // Trip routes
app.use('/api/packages', packageRoutes); // Package routes
app.use('/api/users', userRoutes); // User routes
app.use('/api/admin', adminRoutes); // Admin routes
app.use('/api/bookings', bookingRoutes); // Add booking routes

// Static files
app.use('/uploads', express.static('uploads'));


// Test Route
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Check if email is associated with a logged-in user
app.get('/api/users/email/:email', async (req, res) => {
  const { email } = req.params;
  try {
      const user = await User.findOne({ email });
      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
  } catch (error) {
      console.error("Error checking email:", error);
      res.status(500).json({ message: 'Internal Server Error' });
  }
});
app.use('/api/bookings', bookingRoutes);

app.get('/api/admin/orders', (req, res) => {
    // Add logic to return the orders
    res.send({ orders: [] });
  });
  app.get('/api/admin/packages', (req, res) => {
    // Logic to fetch packages
    res.json({ packages: [] }); // Replace with actual data
  });

// Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
