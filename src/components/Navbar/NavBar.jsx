import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Container, Nav, Navbar } from 'react-bootstrap';
import './NavBar.css';

// RELATIVE PATH: This ensures the logo loads on GitHub Pages and other computers
const logo = '/images/Logo/logo.png'; 

const NavBar = () => {
  // HOOK: useLocation is required to get the current path for the 'active' class
  const location = useLocation(); 

  return (
    <Navbar expand="lg" className="bg-body-tertiary pt-0 mt-0">
      <Container className='pt-0 mt-0'>
        {/* SPA NAVIGATION: Use 'as={Link}' to prevent page reloads */}
        <Navbar.Brand as={Link} to="/" className="custom-navbar-brand">
          <img
            src={logo}
            alt="Homio Properties Logo"
            width="230"
            height="70"
            style={{ marginTop: '20px' }} 
            className="d-inline-block align-top"
          />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link 
              as={Link} 
              to="/" 
              className={`m-1 ${location.pathname === '/' ? 'active' : ''}`}
            >
              Home
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/properties"
              className={`m-1 ${location.pathname === '/properties' ? 'active' : ''}`}
            >
              Properties
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/services"
              className={`m-1 ${location.pathname === '/services' ? 'active' : ''}`}
            >
              Services
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/aboutus"
              className={`m-1 ${location.pathname === '/aboutus' ? 'active' : ''}`}
            >
              About Us
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;