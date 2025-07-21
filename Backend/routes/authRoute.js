const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');

// REGISTER
router.post('/register', async (req, res) => {
  const { username, email, password, mobile } = req.body;

  try {
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword, mobile });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully!' });
  } catch (err) {
    res.status(500).json({ message: 'Registration failed', error: err.message });
  }
});

// LOGIN
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: 'Invalid credentials' });

    // Assign admin role if specific email matches
    let role = user.role;
    if (user.email === 'admin@gmail.com') {
      role = 'admin';
    }

    // ✅ Include role in the token
    const token = jwt.sign({ userId: user._id, role }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({
      token,
      user: {
        username: user.username,
        email: user.email,
        role: role
      }
    });

  } catch (err) {
    res.status(500).json({ message: 'Login failed', error: err.message });
  }
});

module.exports = router;
