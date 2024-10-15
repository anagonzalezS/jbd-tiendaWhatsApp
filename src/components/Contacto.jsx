import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './Contacto.css'; // Asegúrate de incluir un archivo CSS para estilos personalizados

const Contacto = () => {
  return (
    <Container id="contacto" className="contacto-container my-5">
      <h2 className="text-center mb-4">Contacto</h2>
      <Row className="justify-content-center">
        <Col md={4} className="text-center mb-4">
          <div className="contact-info">
            <i className="fas fa-phone fa-2x mb-2"></i>
            <h5>Teléfono</h5>
            <p>+549113654-5084</p>
          </div>
        </Col>
        <Col md={4} className="text-center mb-4">
          <div className="contact-info">
            <i className="fas fa-envelope fa-2x mb-2"></i>
            <h5>Correo Electrónico</h5>
            <p>jonatandanielsanchez03@gmail.com</p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Contacto;
