import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './adminpanel.css';

const AdminPanel = () => {
  const [formData, setFormData] = useState({
    model: '',
    category: '',
    pricePerHour: '',
    availability: 'Available',
    image: null,
  });

  const [cars, setCars] = useState([]);
  const [message, setMessage] = useState('');
  const [editingCarId, setEditingCarId] = useState(null);

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/cars');
      setCars(response.data);
    } catch (error) {
      console.error('Error fetching cars:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      image: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('model', formData.model);
    data.append('category', formData.category);
    data.append('pricePerHour', formData.pricePerHour);
    data.append('availability', formData.availability);
    if (formData.image) {
      data.append('image', formData.image);
    }

    try {
      if (editingCarId) {
        // PUT: Update
        await axios.put(`http://localhost:5000/api/cars/${editingCarId}`, data, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        setMessage('Car updated successfully!');
      } else {
        // POST: Add
        await axios.post('http://localhost:5000/api/cars', data, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        setMessage('Car added successfully!');
      }

      setFormData({
        model: '',
        category: '',
        pricePerHour: '',
        availability: 'Available',
        image: null,
      });
      setEditingCarId(null);
      fetchCars();
    } catch (error) {
      console.error('Error submitting car:', error);
      setMessage(editingCarId ? 'Failed to update car.' : 'Failed to add car.');
    }
  };

  const handleEdit = (car) => {
    setFormData({
      model: car.model,
      category: car.category,
      pricePerHour: car.pricePerHour,
      availability: car.availability,
      image: null, // don't prefill file
    });
    setEditingCarId(car._id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/cars/${id}`);
      setMessage('Car deleted successfully!');
      fetchCars();
    } catch (error) {
      console.error('Error deleting car:', error);
      setMessage('Failed to delete car.');
    }
  };

  return (
    <div className="admin-panel">
      <h2>{editingCarId ? 'Update Car' : 'Add New Car'}</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="model" placeholder="Car Model" value={formData.model} onChange={handleChange} required />
        <input type="text" name="category" placeholder="Category" value={formData.category} onChange={handleChange} required />
        <input type="number" name="pricePerHour" placeholder="Price Per Hour" value={formData.pricePerHour} onChange={handleChange} required />
        <select name="availability" value={formData.availability} onChange={handleChange}>
          <option value="Available">Available</option>
          <option value="Not Available">Not Available</option>
        </select>
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <button type="submit">{editingCarId ? 'Update Car' : 'Add Car'}</button>
      </form>

      {message && <p>{message}</p>}

      <h3>All Cars</h3>
      <table>
        <thead>
          <tr>
            <th>Model</th>
            <th>Category</th>
            <th>Price/Hour</th>
            <th>Availability</th>
            <th>Image</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {cars.map((car) => (
            <tr key={car._id}>
              <td>{car.model}</td>
              <td>{car.category}</td>
              <td>Rs. {car.pricePerHour}</td>
              <td>{car.availability}</td>
              <td>
                <img src={`http://localhost:5000/uploads/${car.image}`} alt="Car" width="100" />
              </td>
              <td>
                <button onClick={() => handleEdit(car)} style={{ marginRight: '10px', color: 'blue' }}>Edit</button>
                <button onClick={() => handleDelete(car._id)} style={{ color: 'red' }}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPanel;
