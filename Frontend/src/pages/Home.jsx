import Hero from '../components/hero';
import Features from '../components/features'
import CarList from '../components/carlist'
import Footer from '../components/footer'
import React from 'react';

const Home = () => {
  return (
    <div>
      <Hero />
      <Features />
      <CarList />
      <Footer />
    </div>
  );
};

export default Home;
