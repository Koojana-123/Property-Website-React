import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import data from './properties.json';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Property = () => {
  const [properties, setProperties] = useState([]);/*Declaring properties and setProperties using useState*/
  const [property, setProperty] = useState(null); // Initialize as null

  const location = useLocation();/*Declaring location using useLocation*/
  const state = location.state; // Get state from location

  useEffect(() => {
    // From json file
    setProperties(data.properties);/*Setting properties*/
    setProperty(data.properties.find((prop) => prop.id === state.id));/*Setting property*/
     console.log('Property:', property);/*Logging property*/
  }, [state.id]);

  const windowSize = useRef([window.innerWidth, window.innerHeight]);/*Declaring windowSize using useRef*/
  const CustomPrevArrow = (props) => (
    <button {...props} > 
      <svg className="svg-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
  <path d="M17.815 19.157l-11.927-7.157 11.927-7.157-2.982 7.157 2.982 7.157zm4.185 4.843l-5-12 5-12-20 12 20 12z"/>
</svg>
    </button>
  );

  const CustomNextArrow = (props) => ( /*Declaring CustomNextArrow using props*/
    <button {...props} > 
      <svg className="svg-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M6.185 4.843l11.927 7.157-11.927 7.157 2.982-7.157-2.982-7.157zm-4.185-4.843l5 12-5 12 20-12-20-12z"/></svg>
    </button>
  );
  const slickSettings = { /*Declaring slickSettings*/
    dots: true, // Show dots below the slider
    infinite: true, // Infinite loop
    speed: 500, // Transition speed
    slidesToShow: 1, // Number of slides to show at a time
    slidesToScroll: 1, // Number of slides to scroll at a time
    prevArrow: <CustomPrevArrow />, // Custom previous arrow component
    nextArrow: <CustomNextArrow />, // Custom next arrow component
  };
  

  return (
    <div style={{ marginTop: '50px', padding: '20px' }}> 
      <Slider {...slickSettings} className="slick-slider-custom"> 
        {property && 
          property.pictures.map((pic, index) => ( /*Declaring property.pictures using map*/
            <div key={index}> 
              <img
                className="d-block w-100 img-fluid"
                src={pic}
                alt={`Slide ${index}`}
              />
            </div>//Declaring img-fluid
          ))}
      </Slider>
    
      <div style={windowSize.current[0] > 1000 ? { maxWidth: '50%', margin: 'auto', marginTop: '50px' } : { margin: 'auto' }}>
        <h1>{property ? property.location : ''}</h1>
        {/* {property && `${property.added.month} ${property.added.day}, ${property.added.year}`} */}
      </div>

      <Tabs
  defaultActiveKey="desc" /*Declaring defaultActiveKey*/
  transition={false} /*Declaring transition*/
  className="mb-3" /*Declaring className*/
  style={windowSize.current[0] > 1000 ? { maxWidth: '50%', margin: 'auto', marginTop: '20px', backgroundColor: '#20247b', borderRadius: '8px' } : { margin: 'auto', marginTop: '20px', backgroundColor: '#20247b', borderRadius: '10px' }} /*Declaring style*/
>
  <Tab eventKey="desc" title="Description" style={windowSize.current[0] > 1000 ? { maxWidth: '50%', margin: 'auto', marginTop: '20px', backgroundColor: '#ffffff', border: '1px solid #20247b', borderRadius: '10px', padding: '20px' } : { margin: 'auto', backgroundColor: '#ffffff', border: '1px solid #20247b', borderRadius: '10px', padding: '20px' }}> 
    <div>
      <ul className="list-group list-group-flush"> 
        <li className="list-group-item">Type: {property ? property.type : ''}</li> 
        <li className="list-group-item">Bedrooms: {property ? property.bedrooms : ''}</li> 
        <li className="list-group-item">Tenure: {property ? property.tenure : ''}</li>
        <li className="list-group-item">Price: ${property ? property.price : ''}</li>
      </ul> 
    </div>
    <div style={{ padding: '20px' }}>{property ? property.description : ''}</div> 
  </Tab>
  <Tab eventKey="fp" title="Floor plan" style={windowSize.current[0] > 1000 ? { maxWidth: '50%', margin: 'auto', marginTop: '20px', backgroundColor: '#ffffff', border: '1px solid #20247b', borderRadius: '10px', padding: '20px' } : { margin: 'auto', backgroundColor: '#ffffff', border: '1px solid #20247b', borderRadius: '10px', padding: '20px' }}>
    Floor plan
    <div>
      <img src="/src/assets/floor_plan.png" style={{ maxWidth: '100%', height: 'auto' }} /> 
    </div>
  </Tab>
  <Tab eventKey="map" title="Map" style={windowSize.current[0] > 1000 ? { maxWidth: '50%', margin: 'auto', marginTop: '20px', backgroundColor: '#ffffff', border: '1px solid #20247b', borderRadius: '10px', padding: '20px' } : { margin: 'auto', backgroundColor: '#ffffff', border: '1px solid #20247b', borderRadius: '10px', padding: '20px' }}>
    Map
    <div className="embed-responsive embed-responsive-16by9"> 
      <iframe
        className="embed-responsive-item" /*Declaring embed-responsive-item*/
        src={property ? property.map : ''} /*Declaring src*/
        title="Property Map" /*Declaring title*/
        allowFullScreen="" /*Declaring allowFullScreen*/
        loading="lazy" /*Declaring loading*/
        referrerPolicy="no-referrer-when-downgrade" /*Declaring referrerPolicy*/
      ></iframe>
    </div>
  </Tab>
</Tabs>

    </div>
  );
};

export default Property;
