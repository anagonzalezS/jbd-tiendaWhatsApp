import React from 'react';
import Navbar from './components/Navbar.jsx'; // Asegúrate de que coincida con el nombre del archivo
import Home from './components/Home';
import Productos from './components/Productos.jsx';
import Ubicacion from './components/Ubicacion.jsx';
import Contacto from './components/Contacto'; 
function App() {
  return (
    <div>
      <Navbar /> {/* Usa Nav_bar si este es el nombre correcto */}
      <Home />
      <Productos />
      <Ubicacion />
      <Contacto />

    </div>
  );
}

export default App;
