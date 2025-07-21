const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config();

const Booking = require('./models/Booking');
const Car = require('./models/Cars');
const upload = require('./middlewares/upload');

// Routes
const bookingRoutes = require('./routes/bookingRoute');
const contactRoutes = require('./routes/contactRoute');
const authRoutes = require('./routes/authRoute');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)

.then(() => console.log('✅ Connected to MongoDB Atlas'))
.catch((err) => console.error('❌ MongoDB connection error:', err));

// Root route
app.get('/', (req, res) => {
  res.send('🚗 LuxMoto backend is running!');
});

// Routes
app.use('/api/bookings', bookingRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/auth', authRoutes);

// Cars APIs
app.get('/api/cars', async (req, res) => {
  try {
    const cars = await Car.find();
    res.json(cars);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch cars' });
  }
});

app.post('/api/cars', upload.single('image'), async (req, res) => {
  try {
    const { model, category, pricePerHour, availability } = req.body;
    const image = req.file ? req.file.filename : null;

    const newCar = new Car({ model, category, pricePerHour, availability, image });
    await newCar.save();

    res.status(201).json({ message: 'Car added successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add car' });
  }
});

app.put('/api/cars/:id', upload.single('image'), async (req, res) => {
  try {
    const { model, category, pricePerHour, availability } = req.body;
    const updateFields = { model, category, pricePerHour, availability };

    if (req.file) {
      updateFields.image = req.file.filename;
    }

    const updatedCar = await Car.findByIdAndUpdate(req.params.id, updateFields, { new: true });
    if (!updatedCar) return res.status(404).json({ error: 'Car not found' });

    res.json({ message: 'Car updated successfully', car: updatedCar });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update car' });
  }
});

app.delete('/api/cars/:id', async (req, res) => {
  try {
    const result = await Car.findByIdAndDelete(req.params.id);
    if (!result) return res.status(404).json({ error: 'Car not found' });

    res.json({ message: 'Car deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete car' });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
