import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button } from 'react-bootstrap';
import './Services.css';

// New component for each service card
const ServiceCard = ({ title, description, handleClose }) => (
  <Modal show={true} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>{title}</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <p>{description}</p>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={handleClose}>
        Close
      </Button>
    </Modal.Footer>
  </Modal>
);

function ServicesPage() {
  // State to keep track of the selected service and modal visibility
  const [selectedService, setSelectedService] = React.useState(null);
  const [showModal, setShowModal] = React.useState(false);

  // Function to open the modal
  const handleOpenModal = (service) => {
    setSelectedService(service);
    setShowModal(true);
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedService(null); // Clear the selected service when closing the modal
  };

  // Service data with titles and descriptions
  const Services = [
    {
      title: 'Build up new Property',
      description: <h3>Homio have full base of construcion companies across the world to lead a new buildup for real state property.So the time and the quolity will be worldclass not depending on any substance of difficalities across the nations. Join with us to build up a efficient property according to your dreams.</h3>,
    },
    {
      title: 'Banking support and loan services',
      description: <h3>Providing banking support and loan services to customers by a real estate company can add value to your business and enhance customer satisfaction. So Homio offers it to customers.</h3> 
    },
    {
      title: 'Real Estate Consulting',
      description: <h3>When buying a house,apartment or a mantion customer may not have knowledge to buy according to purpose and budjet .So Homio offers consulting service for that.</h3>
    },
    {
      title: 'Renting services',
      description: <h3>Homio offers a partial service for found out houses which are for rent </h3>,
    },
  ];

  return (
    <>
      <div className="services-body">
        <div className="services-container">
          <h2>Homio Services</h2>
          <p className="services-description">
            Homio Properties isn't just a Real Estate Company. Homio properties are all around the world with the following services offered to customers all around the world.
          </p>
          <div className="services-list-container">
            <ul className="services-list">
              {Services.map((service, index) => (
                <li key={index} onClick={() => handleOpenModal(service)}>
                  {service.title}
                </li>
              ))}
            </ul>
          </div>
          {/* Conditionally render the modal */}
          {selectedService && (
            <ServiceCard
              title={selectedService.title}
              description={selectedService.description}
              handleClose={handleCloseModal}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default ServicesPage;
