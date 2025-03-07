import React, { useState } from 'react';
import '../styles/RegisterForm.css';
import axios from 'axios';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: ''
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    try {
      if (formData.password !== formData.confirm_password) {
        setError('Les mots de passe ne correspondent pas');
        return;
      }

      const response = await axios.post('http://127.0.0.1:8000/api/users/', formData);
      if (response.status === 201) {
        setSuccess(true);
        setFormData({
          username: '',
          password: '',
          email: '',
          last_name: '',
          first_name: '',
          phone_number: '',
          confirm_password: '',
        });
      }
    } catch (error) {
      // Gestion améliorée des erreurs
      if (error.response?.data) {
        // Si l'erreur est un objet avec des détails
        if (typeof error.response.data === 'object') {
          if (error.response.data.detail) {
            setError(error.response.data.detail);
          } else if (error.response.data.username) {
            setError(`Nom d'utilisateur : ${error.response.data.username.join(', ')}`);
          } else if (error.response.data.email) {
            setError(`Email : ${error.response.data.email.join(', ')}`);
          } else if (error.response.data.password) {
            setError(`Mot de passe : ${error.response.data.password.join(', ')}`);
          } else {
            setError('Une erreur est survenue lors de l\'inscription');
          }
        } else {
          setError(error.response.data);
        }
      } else {
        setError('Une erreur est survenue lors de l\'inscription');
      }
    }
  };

  return (
    <div className="register-container">
      <h2 className="register-title">S'inscrire</h2>
      {success && <p className="success-message">Inscription réussie ! Vous pouvez maintenant vous connecter.</p>}
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Nom d'utilisateur*</label>
          <input
            className="form-input"
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            placeholder="..."
          />
        </div>
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Nom</label>
            <input
              className="form-input"
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              placeholder="..."
            />
          </div>
          <div className="form-group">
            <label className="form-label">Prénom*</label>
            <input
              className="form-input"
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              required
              placeholder="..."
            />
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">Numéro de Téléphone</label>
          <input
            className="form-input"
            type="tel"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleChange}
            placeholder="..."
          />
        </div>
        <div className="form-group">
          <label className="form-label">Email*</label>
          <input
            className="form-input"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="..."
          />
        </div>
        <div className="form-group">
          <label className="form-label">Mot de passe*</label>
          <input
            className="form-input"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            placeholder="..."
          />
        </div>
        <div className="form-group">
          <label className="form-label">Confirmez le Mot de passe*</label>
          <input
            className="form-input"
            type="password"
            name="confirm_password"
            value={formData.confirm_password}
            onChange={handleChange}
            required
            placeholder="..."
          />
        </div>
        <button type="submit" className="submit-button" onClick={handleSubmit}>Envoyer</button>
      </form>
    </div>
  );
};

export default RegisterForm; 