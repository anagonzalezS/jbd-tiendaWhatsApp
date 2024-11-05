import React, { useState } from 'react';
import { ListGroup } from 'react-bootstrap';
import './Sidebar.css'; // Asegúrate de que este archivo tenga los estilos personalizados

const Sidebar = ({ categoriaSeleccionada, setCategoriaSeleccionada }) => {
  const [showCategorias, setShowCategorias] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false); // Estado para mostrar/ocultar la barra lateral

  const categorias = [
    { value: 'all', label: 'Categorías' },
    { value: 'Bicicletas', label: 'Bicicletas' },
    { value: 'Auto', label: 'Auto' },
    { value: 'Equipo de mate', label: 'Equipo de mate' },
    { value: 'Moto', label: 'Moto' },
    { value: 'Herramientas', label: 'Herramientas' },
    { value: 'Iluminación', label: 'Iluminación' },
    { value: 'Seguridad', label: 'Seguridad' },
    { value: 'Camping', label: 'Camping' },
    { value: 'Accesorios', label: 'Accesorios' },
    { value: 'Audio', label: 'Audio' },
  ];

  return (
    <>
      <button 
        className="btn btn-primary d-md-none" // Solo visible en móviles
        onClick={() => setShowSidebar(!showSidebar)}
      >
        {showSidebar ? 'Cerrar' : 'Abrir'} Categorías
      </button>
      
      <div className={`sidebar ${showSidebar ? 'show' : ''}`}>
        <ListGroup className="sidebar-list">
          <ListGroup.Item 
            className="sidebar-item" 
            onClick={() => setShowCategorias(!showCategorias)} 
            style={{ cursor: 'pointer', fontWeight: 'bold' }}
          >
            {categorias[0].label}
          </ListGroup.Item>

          {(showCategorias || window.innerWidth > 769) && (
            <ListGroup>
              {categorias.slice(1).map(categoria => (
                <ListGroup.Item 
                  key={categoria.value} 
                  active={categoriaSeleccionada === categoria.value} 
                  onClick={() => setCategoriaSeleccionada(categoria.value)}
                  className="sidebar-item"
                >
                  {categoria.label}
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </ListGroup>
      </div>
    </>
  );
};

export default Sidebar; // Asegúrate de que esta línea esté presente
