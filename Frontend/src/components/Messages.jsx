import React, { useEffect, useState } from 'react';
import axios from '../utils/axios';
import './messages.css';

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));

  const fetchMessages = async () => {
    try {
      const res = await axios.get('/api/contact', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessages(res.data);
    } catch (err) {
      console.error('Error fetching messages:', err);
    }
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm('Are you sure you want to delete this message?');
    if (!confirm) return;

    try {
      await axios.delete(`/api/contact/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessages((prev) => prev.filter((msg) => msg._id !== id));
      alert('Message deleted!');
    } catch (err) {
      console.error('Delete failed:', err.response?.data || err.message);
      alert('Failed to delete message');
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <div className="messages-container">
      <h2 className="messages-heading">Customer Messages</h2>
      {messages.length > 0 ? (
        <table className="messages-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Message</th>
              {user?.role === 'admin' && <th>Action</th>}
            </tr>
          </thead>
          <tbody>
            {messages.map((msg) => (
              <tr key={msg._id}>
                <td>{msg.name}</td>
                <td>{msg.email}</td>
                <td>{msg.message}</td>
                {user?.role === 'admin' && (
                  <td>
                    <button className="delete-btn" onClick={() => handleDelete(msg._id)}>
                      Delete
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="no-messages">No messages yet.</p>
      )}
    </div>
  );
};

export default Messages;
