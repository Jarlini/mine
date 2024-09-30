// models/Booking.js
const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    packageId: { type: mongoose.Schema.Types.ObjectId, ref: 'Package', required: true },
    // passengers: [{ name: String, age: Number }],
    address: String,
    email: String,
    phone: String,
    paymentMethod: String,
    totalAmount: Number,
    name:String,
});

module.exports = mongoose.model('Booking', bookingSchema);
