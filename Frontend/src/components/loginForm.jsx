import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', credentials);
      const { token, user } = res.data;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      alert('Login successful!');

      // Redirect based on role
      navigate(user.role === 'admin' ? '/admin' : '/');
    } catch (err) {
      alert('Login failed: ' + (err.response?.data?.message || 'Invalid credentials'));
    }
  };

  return (
    <div className="auth-container">
      <div className="form-box">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
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
          <button type="submit">Login</button>
        </form>

        <p className="auth-switch-text">
          Don’t have an account?{' '}
          <Link to="/register" className="auth-link">Sign Up</Link>
        </p>

        <p className="auth-switch-text">
          <Link to="/" className="auth-link">← Back to Home</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
