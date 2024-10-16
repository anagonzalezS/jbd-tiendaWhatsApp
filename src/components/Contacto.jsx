import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './Contacto.css'; // Archivo CSS para estilos personalizados

const Contacto = () => {
  return (
    <Container id="contacto" className="contacto-container my-5">
      <h2 className="text-center mb-4">Contacto</h2>
      <Row className="justify-content-center">
        {/* Teléfono */}
        <Col md={4} className="text-center mb-4">
          <div className="contact-info">
            <i className="fas fa-phone fa-1x mb-2 phone-icon"></i> {/* Icono de teléfono reducido */}
            <h5>Teléfono</h5>
            <p><a href="tel:+5491136545084" className="contact-link">+54 9 11 3654-5084</a></p>
          </div>
        </Col>

        {/* Correo Electrónico */}
        <Col md={4} className="text-center mb-4">
          <div className="contact-info">
            <i className="fas fa-envelope fa-1x mb-2 gmail-icon"></i> {/* Icono de correo reducido */}
            <h5>Correo Electrónico</h5>
            <p><a href="mailto:jonatandanielsanchez03@gmail.com" className="contact-link">jonatandanielsanchez03@gmail.com</a></p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Contacto;
