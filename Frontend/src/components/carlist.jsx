import React, { useEffect, useState } from 'react';
import './carlist.css';
import axios from 'axios';

const CarList = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/cars')
      .then((response) => {
        setCars(response.data);
      })
      .catch((error) => {
        console.error('Error fetching cars:', error);
      });
  }, []);

  return (
    <div className="car-list-section">
      <h2 className="car-list-title">Available Cars</h2>
      <div className="car-cards-container">
        {cars.length > 0 ? (
          cars.map((car, index) => (
            <div className="car-card" key={index}>
              <h3 className="car-model">{car.model}</h3>
              <p><strong>Category:</strong> {car.category}</p>
              <p><strong>Price/Hour:</strong> Rs. {car.pricePerHour}</p>
              <p className={`availability ${car.availability === 'Available' ? 'available' : 'unavailable'}`}>
                <strong>Status:</strong> {car.availability}
              </p>
            </div>
          ))
        ) : (
          <p className="loading-msg">No available cars</p>
        )}
      </div>
    </div>
  );
};

export default CarList;
