import axios from 'axios';
import React, { useState } from 'react';
import '../styles/LoginForm.css';

const LoginForm = ({ isAuthenticated, setIsAuthenticated }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();


    try {
      const temp_subs = []
      // Requête pour se connecter: Accès à la table des utilisateurs
      const response = await axios.post('http://127.0.0.1:8000/api/login/', {
        username: formData.username,
        password: formData.password,
      })

      const user_id = response.data.user.id

      // Requête pour récupérer les points de collecte de l'utilisateur
      const composters = await axios.get('http://127.0.0.1:8000/api/get-collection-points-owner/' + user_id)
      
      // Requête pour récupérer les abonnements de l'utilisateur
      const subscriptions = await axios.get('http://127.0.0.1:8000/api/get-subscriptions/' + user_id)
      
      subscriptions.data.map(async (subscription) => {
        const collection_point = await axios.get('http://127.0.0.1:8000/api/get-collection-points/' + subscription.collection_point)
        .then((compo_data) => {
          temp_subs.push(compo_data.data)
          localStorage.setItem('subscriptions', JSON.stringify(temp_subs))
        })
      })
    
      localStorage.setItem('user_info', JSON.stringify(response.data.user))
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
