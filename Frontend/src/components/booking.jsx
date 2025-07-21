import React, { useState } from 'react';
import axios from '../utils/axios';
import { useLocation } from 'react-router-dom';
import './booking.css';

const Booking = () => {
  const { state } = useLocation();
  const car = state?.car;
  const [formData, setFormData] = useState({ name: '', email: '', hours: '' });
  const token = localStorage.getItem('token');

  const handleChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) { alert('Please log in first to book a car.'); return; }

    const payload = { ...formData, carId: car?._id };
    console.log("🚨 Booking payload:", payload, "Token:", token);

    try {
      const res = await axios.post('/api/bookings', payload, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log("🎉 Booking response:", res.data);
      alert('Booking successful!');
      setFormData({ name: '', email: '', hours: '' });
    } catch (err) {
      console.error('Booking error:', err.response?.data || err.message);
      alert('Booking failed: ' + (err.response?.data?.error || 'Server error'));
    }
  };

  return (
    <div className="booking-page">
      <div className="booking-box">
        <h2 className="booking-title">Book Car: <span>{car?.model || 'Unknown'}</span></h2>
        <form onSubmit={handleSubmit}>
          <label>Name:</label>
          <input type="text" name="name" required onChange={handleChange} value={formData.name} />
          <label>Email:</label>
          <input type="email" name="email" required onChange={handleChange} value={formData.email} />
          <label>Hours:</label>
          <input type="number" name="hours" required onChange={handleChange} value={formData.hours} />
          <button type="submit">Confirm Booking</button>
        </form>
      </div>
    </div>
  );
};

export default Booking;
