import React from 'react';
import axios from 'axios';
import '../styles/MyComposter.css';

const MyComposter = ({ composter, setCheckingProfile, onUpdate }) => {
  const deleteComposter = (composter_id) => {
    axios.delete(`http://127.0.0.1:8000/api/delete-collection-point/${composter_id}/`)
    .then(response => {
      console.log(response)
      let composters = JSON.parse(localStorage.getItem('composters'))
      composters = composters.filter(composter => composter.id !== composter_id)
      localStorage.setItem('composters', JSON.stringify(composters))
      onUpdate()
    })
    .catch(error => {
      console.log(error)
    })
  }
  return (
    <div>
        <button className="delete-button" onClick={() => deleteComposter(composter.id)}>Supprimer</button>
        <div className="composteur-container">
          <div className="composteur-info">
            <div className="info-item">
              <span className="info-label">Localisation :</span>
              <span className="info-value">{composter.address}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Capacité max (personnes) :</span>
              <span className="info-value">{composter.capacity}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Nombre d'abonnés (variable) :</span>
              <span className="info-value">{composter.subscribers.length}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Horaires :</span>
              <span className="info-value">{composter.opening_hours ? composter.opening_hours : "..."}</span>
            </div>
          </div>
          <img src={composter.image ? composter.image : "https://placehold.co/200x200?text=Composteur"} alt="Composteur" className="composteur-image" />
        </div>
    </div>
    )
}

export default MyComposter;
