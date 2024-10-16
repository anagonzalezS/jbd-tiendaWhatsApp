import React, { useState } from 'react';
import { Card } from 'react-bootstrap';
import './Productos.css'; // Asegúrate de importar los estilos

const Productos = ({ productos }) => {
  // Crear un estado para almacenar la cantidad por cada producto
  const [cantidades, setCantidades] = useState(
    productos.reduce((acc, producto) => {
      acc[producto.id] = 1; // Iniciar la cantidad en 1 para cada producto
      return acc;
    }, {})
  );

  // Función para manejar el cambio en la cantidad de un producto
  const handleCantidadChange = (id, nuevaCantidad) => {
    setCantidades((prevCantidades) => ({
      ...prevCantidades,
      [id]: nuevaCantidad
    }));
  };

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
                value={cantidades[producto.id]}
                onChange={(e) => handleCantidadChange(producto.id, e.target.value)}
                className="cantidad-input"
              />
            </div>
            {/* Enlace de WhatsApp que incluye la cantidad seleccionada */}
            <a
              href={`https://wa.me/+5491136545084?text=Quiero%20comprar%20${producto.nombre}%20(Cantidad:%20${cantidades[producto.id]})`}
              className="btn-sutil"
            >
              <i className="fab fa-whatsapp whatsapp-icon" aria-hidden="true"></i>
              Comprar
            </a>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default Productos;
