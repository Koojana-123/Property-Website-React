import React from 'react';
import NavBar from './components/Navbar/NavBar';
import HomePage from './components/home_page/HomePage';
import Services from './components/services_page/Services';
import Properties from './components/properties_page/PropertyList';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Aboutus from './components/aboutus_page/Aboutus';
import Property from './components/properties_page/PropertyDetails';
import { FavoriteProvider } from './components/properties_page/FavoriteContext';
import Footer from './components/Navbar/Footer'; 


function App() {
  return (
    <BrowserRouter>
      <FavoriteProvider>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<Services />} />
          <Route path="/properties" element={<Properties />} />
          <Route path="/aboutus" element={<Aboutus />} />
          
          <Route path="/properties/:id" element={<Property />} />
        </Routes>
        <Footer />
      </FavoriteProvider>
    </BrowserRouter>
  );
}

export default App;
