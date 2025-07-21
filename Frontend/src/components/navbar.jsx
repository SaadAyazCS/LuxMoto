import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css';
import Logo from '../assets/images/LuxMoto_Main.png';
import menuIcon from '../assets/images/menus.png';

const Navbar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 767);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 767);
      if (window.innerWidth > 767) setSidebarOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) setUser(JSON.parse(storedUser));
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  const renderLinks = () => {
    if (!user) {
      return (
        <>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/rent">Rent Now</Link></li>
          <li><Link to="/contact">Contact Us</Link></li>
          <li><Link to="/login" className="login-btn">Login</Link></li>
        </>
      );
    }

    if (user.role === 'admin') {
      return (
        <>
          <li><Link to="/admin">Admin Panel</Link></li>
          <li><Link to="/orders">Order List</Link></li>
          <li><Link to="/admin-messages">Messages</Link></li>
          <li className="welcome-text">Welcome, {user.username}</li>
          <li><button onClick={handleLogout} className="logout-btn">Logout</button></li>
        </>
      );
    }

    return (
      <>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/rent">Rent Now</Link></li>
        <li><Link to="/contact">Contact Us</Link></li>
        <li><Link to="/your-bookings">Your Bookings</Link></li>
        <li className="welcome-text">Welcome, {user.username}</li>
        <li><button onClick={handleLogout} className="logout-btn">Logout</button></li>
      </>
    );
  };

  return (
    <>
      {!isMobile ? (
        <div className="nav">
          <div className="logo"><img src={Logo} alt="GoDrive Logo" /></div>
          <nav><ul>{renderLinks()}</ul></nav>
        </div>
      ) : (
        <div className="navmobile">
          <nav>LuxMoto</nav>
          <button className="sidebar-btn" onClick={toggleSidebar}><img src={menuIcon} alt="Sidebar Icon" /></button>
          <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
            <div className="side-content"><ul>{renderLinks()}</ul></div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
