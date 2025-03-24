import React from 'react';
import axios from 'axios';
import '../styles/MySubscription.css';
import UpdateUserInfo from './UpdateUserInfo';

const subscriptionImage = "https://placehold.co/400x300?text=Abonnement";

const MySubscription = ({ composter, user }) => {
    const [deleted, setDeleted] = React.useState(false)
    const deleteSubscription = (user, composter_id) => {
        axios.post(`http://127.0.0.1:8000/api/unsubscribe/${user.id}/${composter_id}/`)
        .then(response => {
            setDeleted(true)
            UpdateUserInfo(user)
        })
        .catch(error => {
            console.log(error)
        })
    }

    if (deleted) {
        return null
    }

    return (
        <div className="subscription-card" key={composter.id}>
            <div className="subscription-image-container">
            <img src={subscriptionImage} alt={`Composte ${composter.id}`} />
            <button className="delete-icon-button" onClick={() => deleteSubscription(user, composter.id)}>
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" fill="currentColor"/>
                </svg>
            </button>
            </div>
            <h3>Composte {composter.collection_point}</h3>
            <p>Propriétaire: {composter.owner ? composter.owner : 'Aucun propriétaire'}</p>
            <p>Numéro: {composter.id}</p>
            <p>Localisation: {composter.address}</p>
            <p>Horaires: {composter.horaires}</p>
        </div>
    );
};

export default MySubscription;
