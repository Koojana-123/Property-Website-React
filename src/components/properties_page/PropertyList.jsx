import React, { useEffect, useState } from 'react';
import { Card, Container, Row, Col, Button } from 'react-bootstrap';
import { FaHeart, FaBed, FaHome } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useFavorite } from './FavoriteContext';
import data from "./properties.json";

// Using React Widgets to satisfy the enhanced UI
import { NumberPicker, Combobox, DropdownList } from 'react-widgets';
import "react-widgets/styles.css";

const baseUrl = import.meta.env.BASE_URL;

const Properties = () => {
  //State Management 
  const [properties, setProperties] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [minRooms, setMinRooms] = useState(null);
  const [minPrice, setMinPrice] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);
  const [type, setType] = useState('Any');
  const [postalCode, setPostalCode] = useState('');
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  const { dispatch, state } = useFavorite();
  const navigate = useNavigate();

  // Load the JSON data on component mount
  useEffect(() => {
    
    setProperties(data.properties);
  }, []);

  // Search Logic 
  const filteredProperties = properties.filter((item) => {
    const checkLocation = item.location.toLowerCase().includes(searchTerm.toLowerCase());
    const checkRooms = minRooms ? item.bedrooms >= minRooms : true;
    const checkType = type === 'Any' ? true : item.type.toLowerCase() === type.toLowerCase();
    const checkMinPrice = minPrice ? item.price >= minPrice : true;
    const checkMaxPrice = maxPrice ? item.price <= maxPrice : true;
    const checkPostcode = item['postal code'].toLowerCase().includes(postalCode.toLowerCase());
    
    // Search functionality checks all conditions
    return checkLocation && checkRooms && checkType && checkMinPrice && checkMaxPrice && checkPostcode;
  });

  // drag handlers
  const handleDragStart = (e, property) => {
    e.dataTransfer.setData("propertyId", property.id);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDraggingOver(false);
    const id = e.dataTransfer.getData("propertyId");
    const favItem = properties.find(p => p.id === id);
    
    if (favItem) {
      // Logic to ensure property is only added once
      const exists = state.favorites.some(f => f.id === favItem.id);
      if (!exists) {
        dispatch({ type: 'ADD_TO_FAVORITES', payload: favItem });
      }
    }
  };

  // ui enhancements
  const goToDetails = (id) => navigate('/properties/' + id, { state: { id } });

  const toggleFavorite = (item) => {
    const isFav = state.favorites.some((f) => f.id === item.id);
    isFav 
      ? dispatch({ type: 'REMOVE_FROM_FAVORITES', payload: item }) 
      : dispatch({ type: 'ADD_TO_FAVORITES', payload: item });
  };

  return (
    <div className="properties-wrapper" style={{ minHeight: '100vh', background: '#f4f7f6' }}>
      
      {/* floating drop zone for favourites */}
      <div 
        onDragOver={(e) => { e.preventDefault(); setIsDraggingOver(true); }}
        onDragLeave={() => setIsDraggingOver(false)}
        onDrop={handleDrop}
        style={{
          position: 'fixed', right: '20px', top: '50%', zIndex: 1000,
          width: '110px', height: '110px', borderRadius: '50%',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          backgroundColor: isDraggingOver ? '#e74c3c' : '#2c3e50',
          color: '#fff', transition: '0.3s all ease',
          boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
          border: isDraggingOver ? '2px dashed #fff' : 'none'
        }}
      >
        <FaHeart size={25} />
        <small style={{ fontSize: '10px', fontWeight: 'bold' }}>
          {isDraggingOver ? "DROP NOW" : `FAVORITES: ${state.favorites.length}`}
        </small>
      </div>

        <h2 
      className="mb-4 fw-bold text-center" 
      style={{ color: '#000000' }}
      >
        Find Your Property
          </h2>
        
        {/* Search form using React Widgets  */}
        <div className="filter-panel p-4 bg-white rounded shadow-sm mb-5">
          <Row className="gy-3">
            <Col md={4}>
              <label>Location Search</label>
              <Combobox 
                data={data.properties.map(p => p.location)}
                value={searchTerm}
                onChange={val => setSearchTerm(val)}
              />
            </Col>
            <Col md={2}>
              <label>Type</label>
              <DropdownList 
                data={['Any', 'House', 'Flat']}
                value={type}
                onChange={val => setType(val)}
              />
            </Col>
            <Col md={3}>
              <label>Min Price</label>
              <NumberPicker value={minPrice} onChange={v => setMinPrice(v)} step={5000} />
            </Col>
            <Col md={3}>
              <label>Max Price</label>
              <NumberPicker value={maxPrice} onChange={v => setMaxPrice(v)} step={5000} />
            </Col>
            <Col md={3}>
              <label>Min Bedrooms</label>
              <NumberPicker value={minRooms} onChange={v => setMinRooms(v)} min={0} />
            </Col>
            <Col md={3}>
              <label>Postcode Area</label>
              <input 
                className="form-control" 
                value={postalCode} 
                onChange={(e) => setPostalCode(e.target.value)} 
                placeholder="e.g. NW1"
              />
            </Col>
            <Col md={6} className="d-flex align-items-end">
               <Button variant="dark" className="w-100" onClick={() => {setSearchTerm(''); setMinPrice(null); setMaxPrice(null); setMinRooms(null); setType('Any'); setPostalCode('')}}>
                 Reset Filters
               </Button>
            </Col>
          </Row>
        </div>

        {/* Results Display */}
        <Row>
          {filteredProperties.length > 0 ? filteredProperties.map((prop) => (
            <Col key={prop.id} lg={4} md={6} className="mb-4">
              <Card 
                draggable 
                onDragStart={(e) => handleDragStart(e, prop)}
                className="h-100 border-0 shadow-sm"
                style={{ cursor: 'move', borderRadius: '12px', overflow: 'hidden' }}
              >
                <Card.Img 
                  variant="top" 
                  src={`${baseUrl}${prop.pictures[0]}`} 
                  style={{ height: '200px', objectFit: 'cover' }} 
                />
                <Card.Body>
                  <Card.Title className="fw-bold">{prop.location}</Card.Title>
                  <Card.Text className="text-muted mb-2">
                    <FaHome className="me-1"/> {prop.type} | <FaBed className="me-1"/> {prop.bedrooms} Bed
                  </Card.Text>
                  <h5 className="text-dark fw-bold">${prop.price.toLocaleString()}</h5>
                  
                  <div className="d-flex mt-3 gap-2">
                    <Button onClick={() => goToDetails(prop.id)} variant="outline-dark" className="flex-grow-1">
                      View Details
                    </Button>
                    <Button onClick={() => toggleFavorite(prop)} variant="light">
                      <FaHeart color={state.favorites.some(f => f.id === prop.id) ? "#e74c3c" : "#bdc3c7"} />
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          )) : (
            <Col className="text-center py-5">
              <h4>No properties found. Try changing your search!</h4>
            </Col>
          )}
        </Row>
      </Container>
    </div>
  );
};

export default Properties;
