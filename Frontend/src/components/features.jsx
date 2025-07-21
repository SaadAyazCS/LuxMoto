import React from 'react';
import './features.css'; 
import affordableImg from '../assets/images/affordable.png'
import sedanImg from '../assets/images/sedan.png'
import supportImg from '../assets/images/24-7.png'

const Features = () => {
  return (
    <div className="features">
      <h2>Why LuxMoto is Your Best Choice</h2>

      <div className="feature">
        <img src={affordableImg} alt="Affordable" />
        <h3>Affordable Prices</h3>
        <p>Get the best rates for high-quality vehicles.</p>
      </div>

      <div className="feature">
        <img src={sedanImg} alt="Wide Selection" />
        <h3>Wide Selection</h3>
        <p>Choose from sedans, SUVs, and luxury cars.</p>
      </div>

      <div className="feature">
        <img src={supportImg} alt="24/7 Support" />
        <h3>24/7 Support</h3>
        <p>We’re here to help you anytime, anywhere.</p>
      </div>
    </div>
  );
};

export default Features;
