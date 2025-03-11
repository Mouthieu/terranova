import React from 'react';
import '../styles/Profile.css';
import MyComposter from './MyComposter.js'

// Images temporaires
const composteurImage = "https://placehold.co/200x200?text=Composteur";
const abonnementImage = "https://placehold.co/400x300?text=Abonnement";

const Profile = ({ setIsAddCollectionPoint, setCheckingProfile }) => {
  const [data, setData] = React.useState(null)
  const [composters, setComposters] = React.useState(null)
  const [refresh, setRefresh] = React.useState(0)

  React.useEffect(() => {
    const user_info = localStorage.getItem('user_info')
    const compo = localStorage.getItem('composters')
    try {
      setData(JSON.parse(user_info).user)
      setComposters(JSON.parse(compo))
    } catch (e) {}
  }, [refresh])

  const handleComposterUpdate = () => {
    setRefresh(prev => prev + 1)
  }

  console.log(composters)

  return (
    <div className="profile-container">
      <h1 className="profile-title">Mon compte</h1>

      {/* Section Données personnelles */}
      <section className="profile-section">
        <h2 className="section-title">Données personnelles</h2>
        <div className="info-grid">
          <div className="info-item">
            <span className="info-label">Nom d'utilisateur :</span>
            <span className="info-value">{data && data.username}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Nom :</span>
            <span className="info-value">{data && data.last_name}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Prénom :</span>
            <span className="info-value">{data && data.first_name}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Tel :</span>
            <span className="info-value">{data && data.phone_number}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Adresse mail :</span>
            <span className="info-value">{data && data.email}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Adresse :</span>
            <span className="info-value">{data && data.address}</span>
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
          {composters && composters.map((composter) => (
            <MyComposter key={composter.id} composter={composter} setCheckingProfile={setCheckingProfile} onUpdate={handleComposterUpdate} />
          ))}
          </div>
        </div>
        <button className="add-button" onClick={() => {setIsAddCollectionPoint(true); setCheckingProfile(false)}}>Ajouter un composteur</button>
      </section>

      {/* Section Abonnements */}
      <section className="profile-section">
        <h2 className="section-title">Abonnements</h2>
        <div className="subscriptions-grid">
          {[1, 2, 3, 4].map((num) => (
            <div key={num} className="subscription-card">
              <div className="subscription-image-container">
                <img src={abonnementImage} alt={`Composte ${num}`} />
                <button className="delete-icon-button">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" fill="currentColor"/>
                  </svg>
                </button>
              </div>
              <h3>Composte {num}</h3>
              <p>Propriétaire</p>
              <p>Numéro</p>
              <p>Localisation</p>
              <p>Horaires</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Profile; 