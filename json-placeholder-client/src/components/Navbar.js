import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-dark shadow-lg">
      <div className="container-fluid">
        <Link className="navbar-brand text-white fw-bold" to="/">
          Joannesberg API
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Alternar navegação"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink 
                className={({ isActive }) => `nav-link ${isActive ? 'text-warning fw-bold' : 'text-light'}`} 
                to="/users"
              >
                Usuários
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink 
                className={({ isActive }) => `nav-link ${isActive ? 'text-warning fw-bold' : 'text-light'}`} 
                to="/posts"
              >
                Postagens
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink 
                className={({ isActive }) => `nav-link ${isActive ? 'text-warning fw-bold' : 'text-light'}`} 
                to="/todos"
              >
                Tarefas
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink 
                className={({ isActive }) => `nav-link ${isActive ? 'text-warning fw-bold' : 'text-light'}`} 
                to="/albums"
              >
                Álbuns
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink 
                className={({ isActive }) => `nav-link ${isActive ? 'text-warning fw-bold' : 'text-light'}`} 
                to="/photos"
              >
                Fotos
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink 
                className={({ isActive }) => `nav-link ${isActive ? 'text-warning fw-bold' : 'text-light'}`} 
                to="/comments"
              >
                Comentários
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
