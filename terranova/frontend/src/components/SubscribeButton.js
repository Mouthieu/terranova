import axios from 'axios';
import React, { useState } from 'react';

const SubscribeButton = ({ collectionPoint }) => {
  const [subscribed, setSubscribed] = useState(false);
  const token = localStorage.getItem('token');

  const handleSubscribe = async () => {
    if (!token) {
      alert('Vous devez être connecté pour vous abonner.');
      return;
    }

    try {
      let state = subscribed ? 'unsubscribe' : 'subscribe';
      const response = await axios.post(
        `http://127.0.0.1:8000/api/${state}/${collectionPoint.id}/`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        setSubscribed(true);
        alert('Vous êtes maintenant abonné à ce point de collecte!');
      }
      if (response.status === 200) {
        setSubscribed(false);
        alert('Vous êtes désabonné de ce point de collecte.');
      }
    } catch (error) {
      console.error('Erreur lors de l\'abonnement', error);
      alert('Une erreur est survenue lors de l\'abonnement');
    }
  };

  return (
    <button onClick={handleSubscribe}>
      {subscribed ? 'Se désabonner' : 'S\'abonner'}
    </button>
  );
};

export default SubscribeButton;
