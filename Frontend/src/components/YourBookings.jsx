import React, { useEffect, useState } from 'react';
import axios from '../utils/axios';
import './yourbookings.css';

const YourBookings = () => {
  const [bookings, setBookings] = useState([]);
  const token = localStorage.getItem('token');

  const fetchBookings = async () => {
    try {
      const res = await axios.get('/api/bookings', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const filtered = res.data.filter(order => order.carId !== null);
      setBookings(filtered);
    } catch (err) {
      console.error('Error fetching bookings:', err);
    }
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm('Are you sure you want to cancel this booking?');
    if (!confirm) return;

    try {
      await axios.delete(`/api/bookings/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setBookings((prev) => prev.filter((b) => b._id !== id));
      alert('Booking cancelled!');
    } catch (err) {
      console.error('Error deleting booking:', err);
      alert('Failed to cancel booking.');
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div className="yourbookings-container">
      <h2 className="yourbookings-title">Your Bookings</h2>
      {bookings.length > 0 ? (
        <table className="yourbookings-table">
          <thead>
            <tr>
              <th>Car Model</th>
              <th>Hours</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking, i) => (
              <tr key={i}>
                <td>{booking.carId?.model}</td>
                <td>{booking.hours}</td>
                <td>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(booking._id)}
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="no-bookings">No bookings found.</p>
      )}
    </div>
  );
};

export default YourBookings;
