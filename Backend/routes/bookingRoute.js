const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const verifyToken = require('../middlewares/authMiddleware');

// Create a booking
router.post('/', verifyToken, async (req, res) => {
  try {
    const { name, email, hours, carId } = req.body;

    if (!name || !email || !hours || !carId || !req.user?.userId) {
      return res.status(400).json({ error: 'Missing booking data' });
    }

    const newBooking = new Booking({
      name,
      email,
      hours,
      carId,
      userId: req.user.userId,
    });

    await newBooking.save();
    res.status(201).json({ message: 'Booking saved!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get bookings (admin sees all, user sees own)
router.get('/', verifyToken, async (req, res) => {
  try {
    const query = req.user.role === 'admin' ? {} : { userId: req.user.userId };
    const bookings = await Booking.find(query).populate('carId');
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
});

// Delete booking (allowed for admin or booking owner)
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });

    const isAdmin = req.user.role === 'admin';
    const isOwner = booking.userId.toString() === req.user.userId;

    if (!isAdmin && !isOwner) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    await booking.deleteOne();
    res.json({ message: 'Booking deleted' });
  } catch (err) {
    console.error('Delete error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
