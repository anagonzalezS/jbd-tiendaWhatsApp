import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import './Navbar.css'; 

const Nav_bar = () => {
  return (
    <div className="hero">
      {/* Navegación */}
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="#">JBD Accesorios</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="#productos">Tienda</Nav.Link> {/* Link a la sección de productos */}
              <Nav.Link href="#ubicacion">Ubicación</Nav.Link> {/* Link a la sección de ubicación */}
              <Nav.Link href="#contacto">Contacto</Nav.Link> {/* Link a la sección de contacto */}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Sección principal con bienvenida */}
      <div className="main-content d-flex flex-column justify-content-center align-items-center text-center text-white">
        <h1 className="display-4">Bienvenido a JBD accesorios</h1>
        <p>Descubre nuestra completa colección de accesorios</p>
        <Button variant="outline-light" size="lg" href="#productos">Comprar ahora</Button> {/* Link a productos */}
      </div>

      {/* Flecha hacia abajo */}
      <div className="scroll-down">
        <a href="#productos">
          <i className="fas fa-chevron-down"></i>
        </a>
      </div>
    </div>
  );
};

export default Nav_bar;
