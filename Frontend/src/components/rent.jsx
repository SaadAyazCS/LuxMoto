import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import './rent.css';

const Rent = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/cars')
      .then((res) => setCars(res.data))
      .catch((err) => console.error("Error fetching cars:", err));
  }, []);

  return (
    <div style={{ backgroundColor: '#000', minHeight: '100vh' }}>
      <div className="container mt-4">
        <a href="/" className="btn btn-secondary back-btn">
          Back to Home
        </a>
      </div>

      <section className="py-5">
        <div className="container">
          <h2 className="text-center mb-5 rent-title text-white">Available Cars</h2>
          <div className="row g-4">
            {cars.map((car, index) => (
              <div className="col-md-4" key={index}>
                <div className="card h-100 shadow-sm border-0 car-card">
                  <img src={`http://localhost:5000/uploads/${car.image}`} className="card-img-top" alt={car.model} />
                  <div className="card-body text-white">
                    <h5 className="card-title text-black">{car.model}</h5>
                    <p className="card-text text-black">Rs. {car.pricePerHour}/hour</p>
                    <p className={`card-text fw-semibold ${car.availability === 'Available' ? 'text-success' : 'text-danger'}`}>
                      {car.availability}
                    </p>
                    {car.availability === 'Available' ? (
                      <Link to="/booking" state={{ car: car }}>
                        <button className="btn btn-primary w-100">Book Now</button>
                      </Link>

                    ) : (
                      <button className="btn btn-secondary w-100" disabled>Unavailable</button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Rent;
