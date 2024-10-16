import React, { useState } from 'react';

import Navbar from './components/Navbar.jsx';
import Home from './components/Home.jsx';
import Productos from './components/Productos.jsx';
import Ubicacion from './components/Ubicacion.jsx';
import Contacto from './components/Contacto.jsx';
import Footer from './components/Footer.jsx'; // Importa el componente Footer

function App() {
  const [productos, setProductos] = useState([]); // Aquí estás definiendo el estado de productos

  return (
    <div>
      {/* Barra de navegación */}
      <Navbar />

      {/* Secciones de la página */}
      <section id="productos">
        <Home productos={productos} setProductos={setProductos} /> {/* Pasar las props */}
      </section>
      <section id="productos">
        <Productos productos={productos} setProductos={setProductos} /> {/* Asegúrate de que se usen las props */}
      </section>

      <section id="ubicacion">
        <Ubicacion />
      </section>

      <section id="contacto">
        <Contacto />
      </section>

      {/* Footer al final de la página */}
      <Footer /> {/* Aquí se incluye el footer */}
    </div>
  );
}

export default App;
