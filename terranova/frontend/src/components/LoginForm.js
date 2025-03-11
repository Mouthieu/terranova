import axios from 'axios';
import React, { useState } from 'react';
import '../styles/LoginForm.css';

const LoginForm = ({ isAuthenticated, setIsAuthenticated }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();


    try {
      const response = await axios.post('http://127.0.0.1:8000/api/login/', {
        username: formData.username,
        password: formData.password,
      })
      // .then(async (response) => {
      //   const user_id = response.data.user.id
      //   const composters = await axios.get('http://127.0.0.1:8000/api/get-collection-points-owner/' + user_id)
      //   response.data.user.composters = composters.data

      //   console.log(response.data)
      //   localStorage.setItem('authenticated', true);
      //   localStorage.setItem('user_info', JSON.stringify(response.data));
        
      //   window.location.reload();
      // })
      // .catch((error) => {
      //   console.error('Erreur lors de la connexion', error);
      //   alert('Nom d\'utilisateur ou mot de passe incorrect');
      // })
      const user_id = response.data.user.id
      const composters = await axios.get('http://127.0.0.1:8000/api/get-collection-points-owner/' + user_id)
      localStorage.setItem('user_info', JSON.stringify(response.data))
      localStorage.setItem('composters', JSON.stringify(composters.data))
      localStorage.setItem('authenticated', true);
      window.location.reload();

      // Actualise l'état de l'application pour afficher les points de collecte
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
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            required
            placeholder="..."
          />
        </div>
        <div className="form-group">
          <label className="form-label">Mot de passe</label>
          <input
            className="form-input"
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
            placeholder="..."
          />
        </div>
        <button type="submit" className="submit-button" onClick={handleSubmit}>Valider</button>
        <div className="form-links">
          <a href="#" className="form-link">Mot de passe oublié ?</a>
          <a href="#" className="form-link">S'inscrire</a>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
