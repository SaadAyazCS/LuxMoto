import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './contact.css';
const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.id]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/contact', formData);
      alert('Message sent!');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      alert('Failed to send message');
      console.error(error);
    }
  };

  return (
    <div style={{ backgroundColor: '#000', minHeight: '100vh', paddingBottom: '2rem' }}>
      <div className="container my-4">
        <a href="/" className="btn btn-secondary" style={{ backgroundColor: '#444', color: '#fff' }}>
          Go Back to Home
        </a>
      </div>

      <div className="container">
        <h2 className="text-center mb-5" style={{ color: '#fff' }}>Contact Us</h2>
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card p-4" style={{ backgroundColor: '#333' }}>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="name" className="form-label" style={{ color: '#fff' }}>Full Name</label>
                  <input
                    type="text"
                    className="form-control bg-dark text-white border-0"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="form-label" style={{ color: '#fff' }}>Email Address</label>
                  <input
                    type="email"
                    className="form-control bg-dark text-white border-0"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="message" className="form-label" style={{ color: '#fff' }}>Message</label>
                  <textarea
                    className="form-control bg-dark text-white border-0"
                    id="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">Send Message</button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <footer className="bg-dark text-center text-muted py-3 mt-5">
        <p style={{ color: '#fff' }}>&copy; 2025 LuxMoto. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Contact;
