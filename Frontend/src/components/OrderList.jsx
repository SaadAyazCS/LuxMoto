import React, { useEffect, useState } from 'react';
import axios from '../utils/axios';
import './orderlist.css';

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [user, setUser] = useState(null);

  const token = localStorage.getItem('token');

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleDelete = async (id) => {
    const confirm = window.confirm('Are you sure you want to delete this booking?');
    if (!confirm) return;

    try {
      await axios.delete(`/api/bookings/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setOrders((prev) => prev.filter((order) => order._id !== id));
      alert('Booking deleted!');
    } catch (err) {
      console.error('Delete failed:', err.response?.data || err.message);
      alert('Failed to delete booking');
    }
  };

  const fetchOrders = async () => {
    try {
      const res = await axios.get('/api/bookings', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const filtered = res.data.filter(order => order.carId !== null);
      setOrders(filtered);
    } catch (err) {
      console.error('Error fetching orders:', err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="orderlist-container">
      <h2 className="orderlist-heading">All Bookings</h2>
      {orders.length > 0 ? (
        <table className="orderlist-table">
          <thead>
            <tr>
              <th>Customer</th>
              <th>Email</th>
              <th>Car Model</th>
              <th>Hours</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, i) => (
              <tr key={i}>
                <td>{order.name}</td>
                <td>{order.email}</td>
                <td>{order.carId?.model}</td>
                <td>{order.hours}</td>
                <td>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(order._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="no-orders">No bookings yet.</p>
      )}
    </div>
  );
};

export default OrderList;
