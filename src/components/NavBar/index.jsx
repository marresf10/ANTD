import React from 'react';
import './NavBar.css'; // Importamos el archivo CSS para los estilos

const NavBar = () => {
  return (
    <div className="home-container">
      <nav className="navbar">
        <div className="navbar-brand">Mi página</div>
        <ul className="navbar-menu">
          <li className="navbar-item"><a href="#productos">Productos</a></li>
          <li className="navbar-item"><a href="#perfil">Perfil</a></li>
        </ul>
      </nav>
      <main className="home-content">
        <h1>Bienvenido</h1>
        <p>Esta es tu página de inicio. Accede al CRUD de productos y gestiona tu perfil.</p>
      </main>
    </div>
  );
};

export default NavBar;
