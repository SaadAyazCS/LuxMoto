const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Car = require('../models/Cars');

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // folder to save images
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  },
});
const upload = multer({ storage });

// GET all cars
router.get('/', async (req, res) => {
  try {
    const cars = await Car.find();
    res.json(cars);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST: Add a new car
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { model, category, pricePerHour, availability } = req.body;
    const image = req.file ? req.file.filename : null;

    const newCar = new Car({ model, category, pricePerHour, availability, image });
    await newCar.save();
    res.status(201).json(newCar);
  } catch (error) {
    console.error('Failed to add car:', error);
    res.status(500).json({ error: 'Failed to add car', details: error.message });
  }
});

// PUT: Update existing car
router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    const { model, category, pricePerHour, availability } = req.body;
    const updateData = { model, category, pricePerHour, availability };

    if (req.file) {
      updateData.image = req.file.filename;
    }

    const updatedCar = await Car.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!updatedCar) {
      return res.status(404).json({ error: 'Car not found' });
    }

    res.status(200).json({ message: 'Car updated successfully', car: updatedCar });
  } catch (error) {
    console.error('Failed to update car:', error);
    res.status(500).json({ error: 'Failed to update car', details: error.message });
  }
});

// DELETE: Delete a car
router.delete('/:id', async (req, res) => {
  try {
    const deletedCar = await Car.findByIdAndDelete(req.params.id);
    if (!deletedCar) {
      return res.status(404).json({ error: 'Car not found' });
    }
    res.status(200).json({ message: 'Car deleted successfully' });
  } catch (error) {
    console.error('Failed to delete car:', error);
    res.status(500).json({ error: 'Failed to delete car', details: error.message });
  }
});

module.exports = router;
