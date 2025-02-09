import React, { useState, useRef } from 'react';
import Navbar from '../client/components/Navbar.js';
import Home from '../client/components/Home.js';
import Productos from '../client/components/Productos.jsx';
import Ubicacion from '../client/components/Ubicacion.jsx';
import Footer from '../client/components/Footer.js';
import productos from '../client/data/productos.jsx'; // Asegúrate de importar correctamente

function App() {
  const [productosList, setProductosList] = useState(productos); // Inicializa el estado con los productos
  const productosRef = useRef(null); // Crea una referencia para el componente Productos

  return (
    <div>
      <Navbar productosRef={productosRef} />
      <section id="home">
        <Home />
      </section>
      <section id="productos-list" ref={productosRef}>
        <Productos productos={productosList} setProductos={setProductosList} />
      </section>
      <section id="ubicacion">
        <Ubicacion />
      </section>
      
      <Footer />
    </div>
  );
}

export default App;
