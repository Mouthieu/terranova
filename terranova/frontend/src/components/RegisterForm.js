import React, { useState } from 'react';
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
      const response = await axios.post('http://127.0.0.1:8000/api/users/', formData);
      if (response.status === 201) {
        setSuccess(true);
        setFormData({
          username: '',
          password: '',
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
    <div className="register-form">
      <h2>Inscription</h2>
      {success && <p style={{ color: 'green' }}>Inscription réussie ! Vous pouvez maintenant vous connecter.</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nom d'utilisateur :</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Nom :</label>
          <input
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Prénom :</label>
          <input
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Téléphone :</label>
          <input
            type="text"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Email :</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Mot de passe :</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Confirmation du mot de passe :</label>
          <input
            type="password"
            name="confirm_password"
            value={formData.confirm_password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">S'inscrire</button>
      </form>
    </div>
  );
};

export default RegisterForm; 