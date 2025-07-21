import React from 'react';
import { useNavigate } from 'react-router-dom';
import heroImg from '../assets/images/LuxMoto_Main.png'; 
import './hero.css'; 
const HeroSection = () => {
  const navigate = useNavigate();

  const handleRentNowClick = () => {
    navigate('/rent');
  };

  return (
    <div className="hero">
      <div className="hero-content">
        <div className="tag">LuxMoto</div>
        <h1>Find the Perfect Ride for Your Next Adventure</h1>
        <p>
          Explore a wide range of vehicles at unbeatable prices. Book your car now
          and make your journey unforgettable.
        </p>
        <button className="btn" onClick={handleRentNowClick}>Rent Now</button>
      </div>
      <div className="hero-image">
        <img src={heroImg} alt="Car" />
      </div>
    </div>
  );
};

export default HeroSection;
