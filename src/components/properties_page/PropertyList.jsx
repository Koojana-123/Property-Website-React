import React, { useEffect, useState } from 'react';
import { Card, Container, Row, Col, Button } from 'react-bootstrap';
import { FaHeart, FaBed, FaHome } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useFavorite } from './FavoriteContext';
import data from "./properties.json";

// I'm using react-widgets here to make the form feel more professional 
// and to hit the requirement for enhance ui
import { NumberPicker, Combobox, DropdownList } from 'react-widgets';
import "react-widgets/styles.css";

const baseUrl = import.meta.env.BASE_URL;

const Properties = () => {
  
  // Setting up local state for all our search filters. 
  // I used 'null' for numbers so the placeholder text shows up properly in the widgets.
  const [properties, setProperties] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [minRooms, setMinRooms] = useState(null);
  const [minPrice, setMinPrice] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);
  const [type, setType] = useState('Any');
  const [postalCode, setPostalCode] = useState('');
  const [isDraggingOver, setIsDraggingOver] = useState(false); // To toggle the red color on the drop zone

  const { dispatch, state } = useFavorite();
  const navigate = useNavigate();

  //  pull the properties stored from the local JSON file instead of an API
  
  useEffect(() => {
    setProperties(data.properties);
  }, []);

  //Filtering Logic
  // This is the core of the search functionality to check each property against active filters.
  
  const filteredProperties = properties.filter((item) => {
    const checkLocation = item.location.toLowerCase().includes(searchTerm.toLowerCase());
    const checkRooms = minRooms ? item.bedrooms >= minRooms : true;
    const checkType = type === 'Any' ? true : item.type.toLowerCase() === type.toLowerCase();
    const checkMinPrice = minPrice ? item.price >= minPrice : true;
    const checkMaxPrice = maxPrice ? item.price <= maxPrice : true;
    const checkPostcode = item['postal code'].toLowerCase().includes(postalCode.toLowerCase());
    
    // Only return the property if it matches every single filter currently active
    return checkLocation && checkRooms && checkType && checkMinPrice && checkMaxPrice && checkPostcode;
  });

  // Drag and drop favourites
  // I implemented this so users can easily save favorites by dragging the cards.
  const handleDragStart = (e, property) => {
    // store the ID in the dataTransfer so the drop zone knows which house was moved
    e.dataTransfer.setData("propertyId", property.id);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDraggingOver(false); // Reset the ui color
    const id = e.dataTransfer.getData("propertyId");
    const favItem = properties.find(p => p.id === id);
    
    if (favItem) {
      //  add to favorites if it's not already in the list
      const exists = state.favorites.some(f => f.id === favItem.id);
      if (!exists) {
        dispatch({ type: 'ADD_TO_FAVORITES', payload: favItem });
      }
    }
  };

  
  const goToDetails = (id) => navigate('/properties/' + id, { state: { id } });

  const toggleFavorite = (item) => {
    const isFav = state.favorites.some((f) => f.id === item.id);
    // If it's already a favorite, the button removes it. Otherwise, it adds it.
    isFav 
      ? dispatch({ type: 'REMOVE_FROM_FAVORITES', payload: item }) 
      : dispatch({ type: 'ADD_TO_FAVORITES', payload: item });
  };

  return (
    <div className="properties-wrapper" style={{ minHeight: '100vh', background: '#f4f7f6' }}>
      
      {/* This is the floating drop zone. positioned it fixed on the right 
          so it stays visible while scrolling through results.
      */}
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
        <small style={{ fontSize: '10px', fontWeight: 'bold', textAlign: 'center' }}>
          {isDraggingOver ? "DROP NOW" : `FAVORITES: ${state.favorites.length}`}
        </small>
      </div>

      <Container className="py-5">
        {/* Main Heading forced to black as per the final aesthetic check */}
        <h2 className="mb-4 fw-bold text-center" style={{ color: '#000000' }}>
          Find Your Property
        </h2>
        
        {/*  Grouped filters together for better UX.
            Using React Widgets for enhanced input handling.
        */}
        <div className="filter-panel p-4 bg-white rounded shadow-sm mb-5">
          <Row className="gy-3">
            <Col md={4}>
              <label className="text-dark fw-bold">Location Search</label>
              <Combobox 
                data={data.properties.map(p => p.location)}
                value={searchTerm}
                onChange={val => setSearchTerm(val)}
                placeholder="Select or type area..."
              />
            </Col>
            <Col md={2}>
              <label className="text-dark fw-bold">Type</label>
              <DropdownList 
                data={['Any', 'House', 'Flat']}
                value={type}
                onChange={val => setType(val)}
              />
            </Col>
            <Col md={3}>
              <label className="text-dark fw-bold">Min Price</label>
              <NumberPicker value={minPrice} onChange={v => setMinPrice(v)} step={5000} placeholder="No min" />
            </Col>
            <Col md={3}>
              <label className="text-dark fw-bold">Max Price</label>
              <NumberPicker value={maxPrice} onChange={v => setMaxPrice(v)} step={5000} placeholder="No max" />
            </Col>
            <Col md={3}>
              <label className="text-dark fw-bold">Min Bedrooms</label>
              <NumberPicker value={minRooms} onChange={v => setMinRooms(v)} min={0} />
            </Col>
            <Col md={3}>
              <label className="text-dark fw-bold">Postcode Area</label>
              <input 
                className="form-control" 
                value={postalCode} 
                onChange={(e) => setPostalCode(e.target.value)} 
                placeholder="e.g. NW1"
              />
            </Col>
            <Col md={6} className="d-flex align-items-end">
               <Button variant="dark" className="w-100 shadow-sm" onClick={() => {setSearchTerm(''); setMinPrice(null); setMaxPrice(null); setMinRooms(null); setType('Any'); setPostalCode('')}}>
                 Reset All Filters
               </Button>
            </Col>
            <Col md={6} className="d-flex align-items-end gap-2">
               {/* This button toggles the view to show only saved properties.
                  
               */}
               <Button 
                 variant="outline-danger" 
                 className="w-100 shadow-sm" 
                 onClick={() => setProperties(state.favorites)}
               >
                 Show Favourites ({state.favorites.length})
               </Button>

               {/* Reset button clears all filters and restores the full property list 
                 from the original JSON data.
               */}
               <Button 
                 variant="dark" 
                 className="w-100 shadow-sm" 
                 onClick={() => {
                   setSearchTerm(''); 
                   setMinPrice(null); 
                   setMaxPrice(null); 
                   setMinRooms(null); 
                   setType('Any'); 
                   setPostalCode('');
                   setProperties(data.properties); // Important: Restore the full list
                 }}
               >
                 Show All Properties
               </Button>
            </Col>
          </Row>

        </div>

        {/* Responsive layout using Bootstrap breakpoints */}
        <Row>
          {filteredProperties.length > 0 ? filteredProperties.map((prop) => (
            <Col key={prop.id} lg={4} md={6} className="mb-4">
              <Card 
                draggable 
                onDragStart={(e) => handleDragStart(e, prop)}
                className="h-100 border-0 shadow-sm property-card"
                style={{ cursor: 'move', borderRadius: '12px', overflow: 'hidden' }}
              >
                {/* Wrapped image in a div to maintain consistent height */}
                <div style={{ overflow: 'hidden', height: '200px' }}>
                  <Card.Img 
                    variant="top" 
                    src={`${baseUrl}${prop.pictures[0]}`} 
                    style={{ height: '100%', objectFit: 'cover' }} 
                  />
                </div>
                <Card.Body>
                  <Card.Title className="fw-bold text-dark">{prop.location}</Card.Title>
                  <Card.Text className="text-muted mb-2">
                    <FaHome className="me-1"/> {prop.type} | <FaBed className="me-1"/> {prop.bedrooms} Bed
                  </Card.Text>
                  <h5 className="text-dark fw-bold">${prop.price.toLocaleString()}</h5>
                  
                  <div className="d-flex mt-3 gap-2">
                    <Button onClick={() => goToDetails(prop.id)} variant="outline-dark" className="flex-grow-1">
                      View Details
                    </Button>
                    <Button onClick={() => toggleFavorite(prop)} variant="light" className="shadow-sm">
                      <FaHeart color={state.favorites.some(f => f.id === prop.id) ? "#e74c3c" : "#bdc3c7"} />
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          )) : (
            <Col className="text-center py-5">
              <h4 className="text-muted">No properties found. Try adjusting your search criteria!</h4>
            </Col>
          )}
        </Row>
      </Container>
    </div>
  );
};

export default Properties;
