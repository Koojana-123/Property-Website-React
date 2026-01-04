import React, { useEffect, useState } from 'react';
import { Card, Container, Row, Button } from 'react-bootstrap';
import { FaHeart, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useFavorite } from './FavoriteContext';
import data from "./properties.json";

const baseUrl = import.meta.env.BASE_URL;

const Properties = () => {
  const [properties, setProperties] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [minRooms, setMinRooms] = useState(0);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000000);
  const [postalCode, setPostalCode] = useState('');
  const [isDraggingOver, setIsDraggingOver] = useState(false); // UI state for the drop zone

  const { dispatch, state } = useFavorite();
  const navigate = useNavigate();

  useEffect(() => {
    setProperties(data.properties);
  }, []);

  // --- Filtering Logic ---
  const filteredProperties = properties.filter((property) => {
    const matchesSearchTerm = property.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesMinRooms = property.bedrooms >= minRooms;
    const matchesPrice = property.price >= minPrice && property.price <= maxPrice;
    const matchesPostalCode = property['postal code'].toLowerCase().includes(postalCode.toLowerCase());
    return matchesSearchTerm && matchesMinRooms && matchesPrice && matchesPostalCode;
  });

  // --- Drag and Drop Handlers ---
  const onDragStart = (e, property) => {
    // Store the property ID in the dataTransfer object
    e.dataTransfer.setData("propertyId", property.id);
    e.dataTransfer.effectAllowed = "move";
  };

  const onDrop = (e) => {
    e.preventDefault();
    setIsDraggingOver(false);
    const droppedId = e.dataTransfer.getData("propertyId");
    const propertyToFavorite = properties.find(p => p.id === droppedId);
    
    if (propertyToFavorite) {
      // If it's already a favorite, we don't need to add it again
      const isAlreadyFav = state.favorites.some(fav => fav.id === propertyToFavorite.id);
      if (!isAlreadyFav) {
        addToFavorites(propertyToFavorite);
      }
    }
  };

  // --- Existing Functions ---
  const handleSearch = (e) => setSearchTerm(e.target.value);
  const handlePostalCodeChange = (e) => setPostalCode(e.target.value);
  const showAll = () => setProperties(data.properties);
  const showFavorites = () => setProperties(state.favorites);
  const handleMinRoomsChange = (e) => setMinRooms(parseInt(e.target.value, 10) || 0);
  const handleMinPriceChange = (e) => setMinPrice(parseInt(e.target.value, 10) || 0);
  const handleMaxPriceChange = (e) => setMaxPrice(parseInt(e.target.value, 10) || 10000000);

  const sortByPrice = () => setProperties([...properties].sort((a, b) => a.price - b.price));
  const sortByRooms = () => setProperties([...properties].sort((a, b) => a.bedrooms - b.bedrooms));

  const handleClick = (id) => navigate('/properties/' + id, { state: { id } });

  const handleFavorites = (item) => {
    const isItemInFavorites = state.favorites.some((i) => i.id === item.id);
    !isItemInFavorites ? addToFavorites(item) : removeFromFavorites(item);
  };

  const addToFavorites = (item) => dispatch({ type: 'ADD_TO_FAVORITES', payload: item });
  const removeFromFavorites = (item) => dispatch({ type: 'REMOVE_FROM_FAVORITES', payload: item });

  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      {/* 1. THE DROP ZONE (Floating on the right) */}
      <div 
        onDragOver={(e) => {
          e.preventDefault(); // Required to allow drop
          setIsDraggingOver(true);
        }}
        onDragLeave={() => setIsDraggingOver(false)}
        onDrop={onDrop}
        style={{
          position: 'fixed',
          right: '30px',
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 2000,
          width: '100px',
          height: '100px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '50%',
          transition: 'all 0.3s ease',
          backgroundColor: isDraggingOver ? '#dc3545' : '#20247b',
          color: 'white',
          boxShadow: isDraggingOver ? '0 0 20px #dc3545' : '0 4px 10px rgba(0,0,0,0.3)',
          border: isDraggingOver ? '3px dashed white' : 'none'
        }}
      >
        <FaHeart size={30} style={{ marginBottom: '5px' }} />
        <span style={{ fontSize: '10px', textAlign: 'center', fontWeight: 'bold' }}>
          {isDraggingOver ? "RELEASE!" : "DRAG HERE"}
        </span>
      </div>

      <Container fluid style={{ marginTop: '20px' }}>
        {/* --- Search & Filters (Same as before) --- */}
        <Row className="justify-content-center">
          <div className="col-md-6 col-sm-12">
            <div className="input-group">
              <input className="form-control" type="text" value={searchTerm} onChange={handleSearch} placeholder="Search by location" />
              <Button variant="primary">Search</Button>
            </div>
            <div className="d-flex justify-content-center align-items-center mt-3">
              <span className="me-2">Price: Min</span>
              <input type="number" value={minPrice} onChange={handleMinPriceChange} className="form-control me-2" style={{width: '100px'}} />
              <span className="me-2">Max</span>
              <input type="number" value={maxPrice} onChange={handleMaxPriceChange} className="form-control me-2" style={{width: '100px'}} />
            </div>
            <input className="form-control mt-2" type="text" value={postalCode} onChange={handlePostalCodeChange} placeholder="Search by postal code" />
            <div className="d-flex justify-content-center mt-2">
              <Button onClick={sortByPrice} variant="outline-primary" className="me-2">Sort Price</Button>
              <Button onClick={sortByRooms} variant="outline-primary" className="me-2">Sort Rooms</Button>
              <Button onClick={showFavorites} variant="danger" className="me-2">Favorites ({state.favorites.length})</Button>
              <Button onClick={showAll} variant="secondary">All</Button>
            </div>
          </div>
        </Row>

        {/* --- Property Cards --- */}
        <Row className="justify-content-center mt-4">
          {filteredProperties.map((property) => (
            <Card 
              key={property.id} 
              className="col-md-3 col-sm-10 m-4 p-0 shadow-sm"
              draggable // 2. ENABLE DRAGGING
              onDragStart={(e) => onDragStart(e, property)} // 3. START DRAG
              style={{ cursor: 'grab' }}
            >
              <Card.Img 
              variant="top" 
               src={`${baseUrl}${property.pictures[0]}`} 
               style={{ height: '200px', objectFit: 'cover' }} 
                />
              <Card.Body>
                <Card.Title>{property.location}</Card.Title>
                <ul className="list-unstyled">
                  <li><strong>Type:</strong> {property.type}</li>
                  <li><strong>Price:</strong> ${property.price.toLocaleString()}</li>
                </ul>
                <div className="d-flex justify-content-between">
                  <Button onClick={() => handleClick(property.id)} variant="primary" size="sm">Details</Button>
                  <Button onClick={() => handleFavorites(property)} variant="link" className="p-0">
                    <FaHeart color={state.favorites.some(i => i.id === property.id) ? "red" : "#ccc"} size={24} />
                  </Button>
                </div>
              </Card.Body>
            </Card>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default Properties;