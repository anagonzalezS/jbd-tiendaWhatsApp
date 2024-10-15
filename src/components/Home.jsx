// src/components/Home.js
import React, { useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import productosData from '../data/productos'; // Importar productos
import Productos from './Productos';
import Paginacion from './Paginacion'; // Asegúrate de importar el componente de paginación

const ITEMS_PER_PAGE = 11;

const Home = () => {
  const [currentPage, setCurrentPage] = useState(1);

  // Productos para la página actual
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentProductos = productosData.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <Container>
      <Row>
        <Productos productos={currentProductos} />
      </Row>

      <Paginacion
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalItems={productosData.length}
        itemsPerPage={ITEMS_PER_PAGE}
      />
    </Container>
  );
};

export default Home;
