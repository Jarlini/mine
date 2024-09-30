// routes/bookings.js
const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/Booking');
const app = express();
app.post('/api/bookings', (req, res) => {
    const { packages, numberOfPassengers, totalAmount } = req.body;
  
    // Create booking logic
    const newBooking = {
      packages, // Array of packages
      numberOfPassengers,
      totalAmount,
      // Add other booking details
    };
  
    // Save booking to database
    // Example: MongoDB
    Booking.create(newBooking, (err, booking) => {
      if (err) {
        return res.status(500).json({ message: 'Error saving booking' });
      }
      res.status(201).json({ message: 'Booking successful', booking });
    });
  });
   // Create a new booking
router.get('/orders', bookingController.getAllBookings); // Fetch all bookings

module.exports = router;
