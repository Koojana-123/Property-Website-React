// HomePage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import './HomePage.css';

const CarouselItemCard = ({ title, description }) => {
  return (
    <Card className="carousel-card">
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{description}</Card.Text>
      </Card.Body>
    </Card>
  );
};

const HomePage = () => {
  return (
    <div className="home-page">

      {/* HERO / CAROUSEL */}
      <Carousel fade>
        {[
          { img: 'p21.jpg', title: 'Perfect Locations', desc: 'Make a path to your dream home' },
          { img: 'p22.jpg', title: 'Apartments', desc: 'Find homes within your budget' },
          { img: 'p23.jpg', title: 'Mansions', desc: 'Luxury that matches your vision' },
        ].map((item, index) => (
          <Carousel.Item key={index}>
            <img
              className="d-block w-100 carousel-image"
              src={`/src/components/CarouselImage/${item.img}`}
              alt={item.title}
            />
            <Carousel.Caption>
              <CarouselItemCard
                title={item.title}
                description={item.desc}
              />
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>

      {/* SERVICES SECTION */}
      <Container fluid className="services-section">
        <Row className="justify-content-center text-center">
          <Col lg={8} md={10}>
            <h2>Our Services</h2>
            <p>
              Homio Properties helps you search, compare, and save properties
              with ease. Explore homes based on your preferences and manage
              your favourites all in one place.
            </p>

            <Link to="/properties" className="btn btn-primary mt-3">
              Browse Properties
            </Link>
          </Col>
        </Row>
      </Container>

    </div>
  );
};

export default HomePage;
