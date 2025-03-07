import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';
import logo from '../imgs/logo.png';

const Navbar = ({ isAuthenticated, setIsAuthenticated }) => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="logo-link">
          <img src={logo} alt="TerraNova Logo" className="logo" />
          <span className="logo-text">TerraNova</span>
        </Link>
      </div>
      <div className="navbar-right">
        {!isAuthenticated && <Link to="/register" className="signup-button">
          S'inscrire
        </Link>}


        {!isAuthenticated && <Link to="/login" className="signup-button invert">
          Se connecter
        </Link>}

        {isAuthenticated && <Link className="logout-button" onClick={() => {localStorage.removeItem('authenticated'); setIsAuthenticated(false)}}>
          Se déconnecter
        </Link>}

        {isAuthenticated &&<Link to="/profile" className="profile-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z" fill="currentColor"/>
          </svg>
        </Link>}
      </div>
    </nav>
  );
};

export default Navbar; 