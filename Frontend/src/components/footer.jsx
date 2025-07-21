import React from 'react';
import './footer.css'; 

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-logo">
          <h3>LuxMoto</h3>
          <p>Your perfect ride, just a click away!</p>
        </div>
        <div className="footer-links">
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/rent">Rent Now</a></li>
            <li><a href="/contact">Contact Us</a></li>
          </ul>
        </div>
        <div className="footer-socials">
          <a href="#" className="social-icon">Facebook</a>
          <a href="#" className="social-icon">Instagram</a>
          <a href="#" className="social-icon">LinkedIn</a>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2025 LuxMoto. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
