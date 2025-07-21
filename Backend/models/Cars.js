const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  model: String,
  category: String,
  pricePerHour: Number,
  availability: String,
  image: String,
});

module.exports = mongoose.model('Car', carSchema);
