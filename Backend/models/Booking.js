const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  name: String,
  email: String,
  hours: Number,
  carId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Car'
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true
  }
});

module.exports = mongoose.model('Booking', bookingSchema);
