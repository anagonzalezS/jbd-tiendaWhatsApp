import React, { useState, useEffect } from 'react';
import { Card, Container, Row, Col, Button, Modal, Alert } from 'react-bootstrap';
import { FaWhatsapp } from 'react-icons/fa';
import './Productos.css';
import Sidebar from './Sidebar';

const Productos = React.forwardRef((props, ref) => {
  const { productos } = props;

  const [cantidades, setCantidades] = useState({});
  const [ordenSeleccionado, setOrdenSeleccionado] = useState('created-descending');
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('all');
  const [productosFiltrados, setProductosFiltrados] = useState(productos);
  const [productosVisibles, setProductosVisibles] = useState(6);
  const [imagenZoom, setImagenZoom] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    setCantidades(productos.reduce((acc, producto) => {
      acc[producto.id] = 1; 
      return acc;
    }, {}));
  }, [productos]);

  useEffect(() => {
    const nuevosProductosFiltrados = categoriaSeleccionada === 'all'
      ? productos
      : productos.filter(producto => producto.categoria === categoriaSeleccionada);
    setProductosFiltrados(nuevosProductosFiltrados);
    setProductosVisibles(6);
  }, [categoriaSeleccionada, productos]);

  const productosOrdenados = [...productosFiltrados].sort((a, b) => {
    switch (ordenSeleccionado) {
      case 'price-ascending':
        return a.precio - b.precio;
      case 'price-descending':
        return b.precio - a.precio;
      case 'alpha-ascending':
        return a.nombre.localeCompare(b.nombre);
      case 'alpha-descending':
        return b.nombre.localeCompare(a.nombre);
      default:
        return new Date(b.fechaCreacion) - new Date(a.fechaCreacion);
    }
  });

  const mostrarMasProductos = () => {
    setProductosVisibles(prev => prev + 6);
  };

  const actualizarCantidad = (id, cantidad) => {
    setCantidades(prev => ({
      ...prev,
      [id]: cantidad === "" ? "" : Math.max(1, parseInt(cantidad) || 1),
    }));
  };

  const manejarZoom = (imagen) => {
    setImagenZoom(imagen);
    setShowModal(true);
  };

  const cerrarModal = () => {
    setShowModal(false);
    setImagenZoom(null);
  };

  const manejarCompra = (id) => {
    if (!cantidades[id] || cantidades[id] <= 0) {
      setShowAlert(true);
    } else {
      setShowAlert(false);
      const producto = productos.find(prod => prod.id === id);
      const cantidad = cantidades[id];

      // Calcular el total
      const total = (producto.precio * cantidad).toFixed(2); // Formato a dos decimales
      
      // Construir el mensaje para WhatsApp
      const mensaje = `Hola, me gustaría comprar ${cantidad} unidades de ${producto.nombre} por $${producto.precio} cada una, total: $${total}.`;
      const numeroWhatsApp = '5491136545084'; // Reemplaza esto con tu número de WhatsApp
      const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;

      // Redireccionar a WhatsApp
      window.open(urlWhatsApp, '_blank');
    }
  };

  return (
    <Container id="productos" ref={ref} className="productos-container">
      {showAlert && (
        <Alert variant="danger" onClose={() => setShowAlert(false)} dismissible>
          Por favor, seleccione la cantidad antes de comprar.
        </Alert>
      )}
      <Row>
        <Col xs={12} md={3} className="sidebar-col">
          <Sidebar 
            categoriaSeleccionada={categoriaSeleccionada} 
            setCategoriaSeleccionada={setCategoriaSeleccionada} 
          />
        </Col>
        <Col xs={12} md={9}>
          <div className="text-left sort-by-container mb-3">
            <label htmlFor="sort" className="text-label">Ordenar por:</label>
            <select
              id="sort"
              value={ordenSeleccionado}
              onChange={(e) => setOrdenSeleccionado(e.target.value)}
              className="orden-select-elegante"
            >
              <option value="price-ascending">Precio: Menor a Mayor</option>
              <option value="price-descending">Precio: Mayor a Menor</option>
            </select>
          </div>

          <Row className="productos-fila">
            {productosOrdenados.slice(0, productosVisibles).map((producto) => (
              <Col key={producto.id} xs={12} md={6} lg={4} className="producto-col">
                <Card className="producto-card">
                  <Card.Img 
                    src={producto.imagen} 
                    alt={producto.nombre} 
                    className="producto-imagen" 
                    onClick={() => manejarZoom(producto.imagen)}
                  />
                  <Card.Body>
                    <Card.Title>{producto.nombre}</Card.Title>
                    <Card.Text className="producto-descripcion">
                      {producto.descripcion}
                    </Card.Text>
                    <Card.Text className="font-weight-bold" style={{ fontSize: '1.25rem' }}>
                      <strong>${producto.precio}</strong>
                    </Card.Text>
                    <div className="cantidad-container">
                      <label htmlFor={`cantidad-${producto.id}`}>Cantidad:</label>
                      <input
                        id={`cantidad-${producto.id}`}
                        type="number"
                        className="cantidad-input"
                        value={cantidades[producto.id]}
                        onChange={(e) => actualizarCantidad(producto.id, e.target.value)}
                        onBlur={() => {
                          if (!cantidades[producto.id] || cantidades[producto.id] < 1) {
                            setCantidades(prev => ({ ...prev, [producto.id]: 1 }));
                          }
                        }}
                        min="1"
                      />
                    </div>
                    <Button 
                      className="boton-sutil" 
                      onClick={() => manejarCompra(producto.id)}
                    >
                      <FaWhatsapp style={{ color: 'white', marginRight: '5px' }} />
                      Comprar
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          {productosVisibles < productosOrdenados.length && (
            <div className="text-center my-3">
              <Button 
                className="btn-sutil" 
                onClick={mostrarMasProductos}
              >
                Mostrar más
              </Button>
            </div>
          )}
        </Col>
      </Row>

      <Modal show={showModal} onHide={cerrarModal}>
        <Modal.Header closeButton>
          <Modal.Title>Jbd-Accesorios</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img src={imagenZoom} alt="Zoom" style={{ width: '100%' }} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={cerrarModal}>Cerrar</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
});

export default Productos;
