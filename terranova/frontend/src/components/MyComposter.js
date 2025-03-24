import React from 'react';
import axios from 'axios';
import '../styles/MyComposter.css';
import UpdateUserInfo from './UpdateUserInfo';

const MyComposter = ({ composter }) => {
  const [deleted, setDeleted] = React.useState(false)
  const deleteComposter = (composter_id) => {
    axios.delete(`http://127.0.0.1:8000/api/delete-collection-point/${composter_id}/`)
    .then(response => {
      const user = JSON.parse(localStorage.getItem('user_info'))

      user.owned_composters = user.owned_composters.filter(composter => composter.id !== composter_id)
      
      UpdateUserInfo(user)
      setDeleted(true)
    })
    .catch(error => {
      console.log(error)
    })
  }

  if (deleted) {
    return null
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
