import axios from 'axios';
import React, { useState } from 'react';
import '../styles/LoginForm.css';

const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/login/', {
        username,
        password,
      });

      // Stocke le token dans localStorage
      localStorage.setItem('token', response.data.access);

      // Actualise l'état de l'application pour afficher les points de collecte
      window.location.reload();
    } catch (error) {
      console.error('Erreur lors de la connexion', error);
      alert('Nom d\'utilisateur ou mot de passe incorrect');
    }
  };

  return (
    <div className="login-container">
      <h1 className="login-title">Se connecter</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Nom d'utilisateur</label>
          <input
            className="form-input"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            placeholder="Value"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Mot de passe</label>
          <input
            className="form-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Value"
          />
        </div>
        <button type="submit" className="submit-button">Valider</button>
        <div className="form-links">
          <a href="#" className="form-link">Mot de passe oublié ?</a>
          <a href="#" className="form-link">S'inscrire</a>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
