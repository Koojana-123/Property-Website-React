import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, Row, Col, Card, Button } from 'react-bootstrap';
import { FiArrowRight, FiCheckCircle, FiUser, FiHome, FiSearch } from 'react-icons/fi';
import './HomePage.css';

// Using absolute path for public folder images in Vite
// Using Vite's base URL variable to ensure paths work on GitHub Pages
const Homeimage = `${import.meta.env.BASE_URL}images/Banner/Homeimage.png`;
const detailImg1 = `${import.meta.env.BASE_URL}images/Homeimg/img1.jpg`;
const detailImg2 = `${import.meta.env.BASE_URL}images/Homeimg/Img2.jpeg`;
const detailImg3 = `${import.meta.env.BASE_URL}images/Homeimg/Img3.jpeg`;

const HomePage = () => {
  const extraDetails = [
    { id: 1, title: "Modern Designs", desc: "Sleek, contemporary architecture for modern living.", img: detailImg1 },
    { id: 2, title: "Design your dream with US", desc: "Properties situated in the heart of the most vibrant cities.", img: detailImg2 },
    { id: 3, title: "Prime Location", desc: "Every property is manually checked for safety and quality.", img: detailImg3 },
  ];

  return (
    <div className="home-page">
      
      
      
          

      {/* HERO SECTION */}
      <section className="home-banner-container">
        {/* Layer 1: The House Image (Bottom-Left Cornered) */}
        <div className="home-image-wrapper">
          <img src={Homeimage} alt="Luxury Home" className="home-image-large" />
        </div>

        {/* Layer 2: The Glass Textbox (Positioned on the Right) */}
        <div className="banner-content-overlay">
          <div className="glass-textbox">
            <h1 className="primary-heading">Find Your Dream Home</h1>
            <h2 className="secondary-heading">With Homio Properties</h2>
            <p className="description">
              Discover a curated selection of premium properties. 
              Whether you're buying or renting, we find the perfect fit for your lifestyle.
            </p>
            <Link to="/properties" className="btn-action">
              Explore Now <FiArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* THREE TABS SECTION (DETAILS) */}
      <Container className="details-section py-5">
        <div className="text-center mb-5">
          <h2 className="fw-bold fs-1">Our Expertise</h2>
          <div className="accent-bar"></div>
        </div>
        <Row className="g-4">
          {extraDetails.map((item) => (
            <Col key={item.id} lg={4} md={6}>
              <Card className="info-card border-0 shadow h-100">
                <div className="img-zoom-wrapper">
                  <Card.Img variant="top" src={item.img} className="info-card-img" />
                </div>
                <Card.Body className="p-4">
                  <Card.Title className="fw-bold mb-3 d-flex align-items-center">
                    <FiCheckCircle className="text-primary me-2" /> {item.title}
                  </Card.Title>
                  <Card.Text className="text-muted">
                    {item.desc}
                  </Card.Text>
                  <Link to="/details" className="btn btn-link p-0 fw-bold text-decoration-none">
                    Read More <FiArrowRight />
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default HomePage;