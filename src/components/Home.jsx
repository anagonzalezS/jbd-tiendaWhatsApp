// src/components/Home.js
import React, { useState, useRef } from 'react';
import { Container, Row } from 'react-bootstrap';
import productosData from '../data/productos'; // Importar productos
import Productos from './Productos';
import Paginacion from './Paginacion'; // Asegúrate de importar el componente de paginación

const ITEMS_PER_PAGE = 12;

const Home = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const productosRef = useRef(null); // Crear referencia para la sección de productos

  // Productos para la página actual
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentProductos = productosData.slice(indexOfFirstItem, indexOfLastItem);

  // Función para cambiar la página y desplazar la vista
  const changePage = (page) => {
    setCurrentPage(page);
    if (productosRef.current) {
      productosRef.current.scrollIntoView({ behavior: 'smooth' }); // Desplazarse suavemente a la sección de productos
    }
  };

  return (
    <Container>
      <Row ref={productosRef}> {/* Referencia para la sección de productos */}
        <Productos productos={currentProductos} />
      </Row>

      <Paginacion
        currentPage={currentPage}
        setCurrentPage={changePage} // Cambiar la función de setCurrentPage
        totalItems={productosData.length}
        itemsPerPage={ITEMS_PER_PAGE}
      />
    </Container>
  );
};

export default Home;
