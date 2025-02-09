// NavBar.js
import React, { useState } from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import './Navbar.css';
import productos from '../../../client/data/productos';

const NavBar = React.forwardRef(({ productosRef, setProductos }, ref) => {
  const [, setCategoriaSeleccionada] = useState('Todos');

  const handleCategoriaChange = () => {
    setCategoriaSeleccionada('Todos');
    if (productosRef && productosRef.current) {
      productosRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setProductos(productos); // Muestra todos los productos
  };

  return (
    <div className="hero">
      <Navbar bg="dark" variant="dark" expand="md">
        <Container>
          <Navbar.Brand href="#">JBD Accesorios</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link onClick={handleCategoriaChange}>Tienda</Nav.Link>
              <Nav.Link href="#ubicacion">Ubicación</Nav.Link>
              <Nav.Link href="#contacto">Contacto</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div className="main-content d-flex flex-column justify-content-center align-items-center text-center text-white">
        <h1 className="display-4">Bienvenido a JBD Accesorios</h1>
        <p>Encuentra lo mejor para tus necesidades.</p>
        <Button variant="light" onClick={handleCategoriaChange}>Ver Productos</Button>
      </div>
    </div>
  );
});

export default NavBar;
