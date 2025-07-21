import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar';
import Home from './pages/Home';
import Rent from './pages/Rent';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminPanel from './components/adminpanel';
import Booking from './components/booking';
import YourBookings from './components/YourBookings';
import OrderList from './components/OrderList';
import Messages from './components/Messages';


function App() {
  return (
    <Router>
      <div className="page-wrapper">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<><Navbar /><Home /></>} />
          <Route path="/rent" element={<><Navbar /><Rent /></>} />
          <Route path="/contact" element={<><Navbar /><Contact /></>} />
          <Route path="/admin" element={<><Navbar /><AdminPanel /></>} />
          <Route path="/booking" element={<><Navbar /><Booking /></>} />
          <Route path="/your-bookings" element={<><Navbar /><YourBookings /></>} />
          <Route path="/orders" element={<><Navbar /><OrderList /></>} />
          <Route path="/admin-messages" element={<><Navbar /><Messages /></>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
