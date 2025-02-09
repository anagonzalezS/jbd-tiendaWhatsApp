import React, { useState, useRef } from 'react';
import Navbar from './components/Navbar.jsx';
import Home from './components/Home.jsx';
import Productos from './components/Productos.jsx';
import Ubicacion from './components/Ubicacion.jsx';
import Footer from './components/Footer.jsx';
import productos from './data/productos';

function App() {
  const [productosList, setProductosList] = useState(productos);
  const productosRef = useRef(null);

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
