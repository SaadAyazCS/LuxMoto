import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './Register.css';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    mobile: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/register', formData);
      alert('Registration successful!');
      navigate('/login');
    } catch (err) {
      alert('Registration failed!');
      console.error(err);
    }
  };

  return (
    <div className="auth-container">
      <div className="form-box">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Full Name"
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="mobile"
            placeholder="Mobile Number"
            onChange={handleChange}
            required
          />
          <button type="submit">Register</button>
        </form>

        <p className="auth-switch-text">
          Already have an account?{' '}
          <Link to="/login" className="auth-link">Login</Link>
        </p>

        {/* Clean text-style back link */}
        <Link to="/" className="back-home-link">← Back to Home</Link>
      </div>
    </div>
  );
};

export default Register;
