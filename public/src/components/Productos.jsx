import React, { useState } from 'react';
import { Card, Container, Row, Col, Button } from 'react-bootstrap';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import axios from "axios";
import './Productos.css';

// Inicializa Mercado Pago con tu clave pública
initMercadoPago(process.env.REACT_APP_MP_PUBLIC_KEY, { locale: "es-AR" });


const Productos = React.forwardRef((props, ref) => {
  const { productos } = props;

  const [productosVisibles, setProductosVisibles] = useState(6);
  const [preferenceId, setPreferenceId] = useState(null);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);

  const productosOrdenados = [...productos];

  const mostrarMasProductos = () => {
    setProductosVisibles((prev) => prev + 6);
  };

  const manejarCompra = async (producto) => {
    try {
      // Realiza una solicitud al backend para obtener el `preferenceId`
      const response = await axios.post('http://localhost:3000/create_preference', {
        title: producto.nombre,
        price: producto.precio,
        quantity: 1,
      });

      if (response.data && response.data.id) {
        setPreferenceId(response.data.id); // Guarda el preferenceId que recibimos del backend
        setProductoSeleccionado(producto); // Guarda el producto seleccionado (opcional)
      }
    } catch (error) {
      console.error('Error al crear la preferencia de pago:', error);
    }
  };

  return (
    <Container id="productos" ref={ref} className="productos-container">
      <Row className="productos-fila">
        {productosOrdenados.slice(0, productosVisibles).map((producto) => (
          <Col key={producto.id} xs={6} sm={6} md={3} lg={3} className="producto-col">
            <Card className="producto-card">
              <div className="producto-imagen-container">
                <Card.Img
                  src={producto.imagen}
                  alt={producto.nombre}
                  className="producto-imagen"
                />
              </div>
              <Card.Body>
                <Card.Title>{producto.nombre}</Card.Title>
                <Card.Text className="producto-descripcion">
                  {producto.descripcion}
                </Card.Text>
                <Card.Text className="font-weight-bold" style={{ fontSize: '1.25rem' }}>
                  <strong>${producto.precio.toLocaleString('es-AR')}</strong>
                </Card.Text>
                <Button
                  className="boton-sutil"
                  onClick={() => manejarCompra(producto)}
                >
                  Comprar
                </Button>

                {/* Muestra el botón de Mercado Pago solo para el producto seleccionado */}
                {preferenceId && productoSeleccionado?.id === producto.id && (
                  <div style={{ marginTop: '10px' }}>
                    <Wallet initialization={{ preferenceId }} />
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {productosVisibles < productosOrdenados.length && (
        <div className="text-center my-3">
          <Button className="btn-sutil" onClick={mostrarMasProductos}>
            Mostrar más
          </Button>
        </div>
      )}
    </Container>
  );
});

export default Productos;
