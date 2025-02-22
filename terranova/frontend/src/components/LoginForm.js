import axios from 'axios';
import React, { useState } from 'react';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/token/', {
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
    <div>
      <h1>Se connecter</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nom d'utilisateur</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Mot de passe</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Se connecter</button>
      </form>
    </div>
  );
};

export default LoginForm;
