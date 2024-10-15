import React, { useState } from 'react';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import './Productos.css'; // Asegúrate de que esté tu archivo CSS

const Productos = ({ productos = [] }) => {
  // Estado para la cantidad de productos. Usa un objeto para manejar la cantidad de cada producto
  const [cantidades, setCantidades] = useState({});

  const handleCantidadChange = (id, value) => {
    setCantidades((prev) => ({
      ...prev,
      [id]: value
    }));
  };

  return (
    <Container id="tienda">
      <Row>
        {productos.map((producto) => {
          // Obtener la cantidad actual del producto si existe, de lo contrario, usar 1
          const cantidad = cantidades[producto.id] || 1;

          return (
            <Col key={producto.id} sm={6} md={4} lg={3} className="mb-4">
              <Card className="producto-card">
                <Card.Img variant="top" src={producto.imagen} alt={producto.nombre} className="zoom-img" />
                <Card.Body>
                  <Card.Title>{producto.nombre}</Card.Title>
                  <Card.Text>Precio: ${producto.precio}</Card.Text>
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                    <label style={{ marginRight: '10px' }}>Cantidad:</label>
                    <input 
                      type="number" 
                      value={cantidad} 
                      min="1" 
                      onChange={(e) => handleCantidadChange(producto.id, e.target.value)} // Actualiza la cantidad
                      style={{ width: '60px', marginRight: '10px' }} // Estilo para el input de cantidad
                    />
                  </div>
                  <Button 
                    variant="light" // Color claro para el botón
                    className="btn-sutil" // Aplicar la clase CSS personalizada
                    href={`https://wa.me/91136545084?text=Hola,%20me%20gustaría%20comprar%20${producto.nombre}%20en%20cantidad%20${cantidad}`} 
                    target="_blank"
                  >
                    Comprar por WhatsApp
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};

export default Productos;
