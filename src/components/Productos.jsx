// src/components/Productos.js
import React  from 'react';
import { Card, Button } from 'react-bootstrap';
import './Productos.css'; // Asegúrate de importar los estilos

const Productos = ({ productos }) => {
  return (
    <div className="d-flex flex-wrap justify-content-center">
      {productos.map((producto) => (
        <Card key={producto.id} className="producto-card" style={{ margin: '10px', width: '18rem' }}>
          <Card.Img variant="top" src={producto.imagen} alt={producto.nombre} className="zoom-img" />
          <Card.Body>
            <Card.Title>{producto.nombre}</Card.Title>
            <Card.Text className="descripcion">{producto.descripcion}</Card.Text>
            <Card.Text>Precio: ${producto.precio}</Card.Text>
            <div className="cantidad-container">
              <label htmlFor={`cantidad-${producto.id}`}>Cantidad:</label>
              <input
                type="number"
                id={`cantidad-${producto.id}`}
                min="1"
                defaultValue="1"
                className="cantidad-input"
              />
            </div>
            <Button
              className="btn-sutil"
              onClick={() => alert(`Comprar ${producto.nombre} (Cantidad: ${document.getElementById(`cantidad-${producto.id}`).value}) por WhatsApp`)}
            >
              Comprar por WhatsApp
            </Button>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default Productos;
