import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './NavBar.css';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logo from 'C:/Users/Ragnor/Desktop/react_vite_app/public/images/Logo/logo.png';


<nav className="navbar bg-body-tertiary">
</nav>
const NavBar = () => {
  return (
    <Navbar expand="lg" className="bg-body-tertiary pt-0 mt-0">
      <Container className='pt-0 mt-0'>
        <Navbar.Brand href="#home" className="custom-navbar-brand">
          <img
            src={logo}
            alt="Homio Properties Logo"
            width="230"
            height="70"
            style={{ marginTop: '20px' }} 
            className="d-inline-block align-top"
          />{' '}
          
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="/" className={`m-1 ${location.pathname === '/' ? 'active' : ''}`}>
              Home
            </Nav.Link>
            <Nav.Link
              href="/properties"
              className={`m-1 ${location.pathname === '/properties' ? 'active' : ''}`}
            >
              Properties
            </Nav.Link>
            <Nav.Link
              href="/services"
              className={`m-1 ${location.pathname === '/services' ? 'active' : ''}`}
            >
              Services
            </Nav.Link>
            <Nav.Link
              href="/aboutus"
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

