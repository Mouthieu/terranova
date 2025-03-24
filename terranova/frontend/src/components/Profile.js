import React from 'react';
import axios from 'axios';
import '../styles/Profile.css';
import MyComposter from './MyComposter.js'
import MySubscription from './MySubscription.js'

// Images temporaires
const composteurImage = "https://placehold.co/200x200?text=Composteur";

const Profile = ({ setIsAddCollectionPoint, setCheckingProfile, updateProfile }) => {
  const [userInfo, setUserInfo] = React.useState(null)

  React.useEffect(() => {
    const user_info = JSON.parse(localStorage.getItem('user_info')) || {
      owned_composters: [],
      subscribed_composters: []
    }
    setUserInfo(user_info)
  }, [])

  React.useEffect(() => {
    const handleStorageChange = () => {
      const updatedUserInfo = JSON.parse(localStorage.getItem('user_info'))
      setUserInfo(updatedUserInfo)
    }

    window.addEventListener('storage', handleStorageChange)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [])

  if (updateProfile) {
    return null
  }

  return (
    <div className="profile-container">
      <h1 className="profile-title">Mon compte</h1>

      {/* Section Données personnelles */}
      <section className="profile-section">
        <h2 className="section-title">Données personnelles</h2>
        <div className="info-grid">
          <div className="info-item">
            <span className="info-label">Nom d'utilisateur :</span>
            <span className="info-value">{userInfo && userInfo.username}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Nom :</span>
            <span className="info-value">{userInfo && userInfo.last_name}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Prénom :</span>
            <span className="info-value">{userInfo && userInfo.first_name}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Tel :</span>
            <span className="info-value">{userInfo && userInfo.phone_number}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Adresse mail :</span>
            <span className="info-value">{userInfo && userInfo.email}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Adresse :</span>
            <span className="info-value">{userInfo && userInfo.address}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Note :</span>
            <div className="stars">
              {'★'.repeat(4)}{'☆'.repeat(1)}
            </div>
          </div>
        </div>
      </section>

      {/* Section Mes composteurs */}
      <section className="profile-section">
          <h2 className="section-title">Mon composteur</h2>
        <div className="section-header">
          <div className='composteur-container prof'>
          {userInfo && userInfo.owned_composters.map((composter) => (
            <MyComposter key={composter.id} composter={composter} />
          ))}
          </div>
        </div>
        <button className="add-button" onClick={() => {setIsAddCollectionPoint(true); setCheckingProfile(false)}}>Ajouter un composteur</button>
      </section>

      {/* Section Abonnements */}
      <section className="profile-section">
        <h2 className="section-title">Abonnements</h2>
        <div className="subscriptions-grid">
          {userInfo && userInfo.subscribed_composters.map((composter) => (
            <MySubscription key={composter.id} composter={composter} user={userInfo}/>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Profile; 