import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Tab, Tabs, Container } from 'react-bootstrap';
import data from './properties.json';
import Slider from 'react-slick';

// Import CSS for slick-carousel
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Property = () => {
  const [property, setProperty] = useState(null);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const location = useLocation();
  const state = location.state;
  const baseUrl = import.meta.env.BASE_URL;

  // Track window size for marks in "Responsive Design" (8%)
  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    
    // Load property data
    if (state && state.id) {
      const foundProperty = data.properties.find((prop) => prop.id === state.id);
      setProperty(foundProperty);
    }

    return () => window.removeEventListener('resize', handleResize);
  }, [state]);

  // Slider Arrows
  const CustomPrevArrow = (props) => (
    <button {...props} className="slick-arrow slick-prev" style={{ left: '10px', zIndex: 1 }}>
       <svg width="30" height="30" viewBox="0 0 24 24" fill="#20247b"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>
    </button>
  );

  const CustomNextArrow = (props) => (
    <button {...props} className="slick-arrow slick-next" style={{ right: '10px', zIndex: 1 }}>
       <svg width="30" height="30" viewBox="0 0 24 24" fill="#20247b"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>
    </button>
  );

  const slickSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
  };

  if (!property) return <Container className="mt-5">Loading property details...</Container>;

  // Mark-winning responsive styles
  const isLargeScreen = screenWidth > 1000;
  const containerStyle = {
    maxWidth: isLargeScreen ? '60%' : '100%',
    margin: 'auto',
    marginTop: '30px'
  };

  return (
    <div style={{ marginTop: '20px', padding: '10px' }}>
      {/* GALLERY SECTION (5%) */}
      <div style={{ maxWidth: isLargeScreen ? '800px' : '100%', margin: 'auto' }}>
        <Slider {...slickSettings}>
          {property.pictures.map((pic, index) => (
            <div key={index}>
              <img
                className="d-block w-100"
                style={{ height: isLargeScreen ? '500px' : '300px', objectFit: 'cover', borderRadius: '15px' }}
                src={`${baseUrl}${pic}`} // FIXED FOR GITHUB PAGES
                alt={`Property view ${index + 1}`}
              />
            </div>
          ))}
        </Slider>
      </div>

      <div style={containerStyle}>
        <h1 className="fw-bold">{property.location}</h1>
        <h3 className="text-primary">${property.price.toLocaleString()}</h3>
        <p className="text-muted">{property.type} | {property.bedrooms} Bedrooms | {property.tenure}</p>
      </div>

      {/* TABS SECTION (7%) */}
      <Tabs
        defaultActiveKey="desc"
        id="property-details-tabs"
        className="mb-3 mt-4 justify-content-center custom-tabs"
        style={{ backgroundColor: '#20247b', borderRadius: '8px', padding: '5px' }}
      >
        <Tab eventKey="desc" title="Description">
          <div className="p-4 border rounded shadow-sm bg-white">
            <h4>About this property</h4>
            <p>{property.description}</p>
          </div>
        </Tab>

        <Tab eventKey="fp" title="Floor Plan">
          <div className="p-4 border rounded shadow-sm bg-white text-center">
            {/* Make sure floor_plan.png is in your public/images/ folder */}
            <img 
              src={`${baseUrl}images/floor_plan.png`} 
              alt="Floor Plan" 
              style={{ maxWidth: '100%', height: 'auto' }} 
            />
          </div>
        </Tab>

        <Tab eventKey="map" title="Location Map">
          <div className="p-4 border rounded shadow-sm bg-white">
            <div className="ratio ratio-16x9">
              <iframe
                src={property.map}
                title="Google Maps"
                allowFullScreen
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </Tab>
      </Tabs>
    </div>
  );
};

export default Property;