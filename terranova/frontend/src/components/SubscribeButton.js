import axios from 'axios';
import React, { useState } from 'react';
import UpdateUserInfo from './UpdateUserInfo';

const SubscribeButton = ({ collectionPoint, isAuthenticated }) => {
  const [subscribed, setSubscribed] = useState(false);

  const user_info = localStorage.getItem('user_info')
  const userInfo = JSON.parse(user_info)
  
  React.useEffect(() => {
    try {
      const user_ids = collectionPoint.subscribers.map(subscriber => subscriber.id);
      setSubscribed(user_ids.includes(userInfo.id));
    } catch (e) {}
  }, []);

  const handleSubscribe = async () => {
    if (!isAuthenticated) {
      alert('Vous devez être connecté pour vous abonner.');
      return;
    }
    const user = userInfo;

    try {
      let state = subscribed ? 'unsubscribe' : 'subscribe';
      const response = await axios.post(
        `http://127.0.0.1:8000/api/${state}/${user.id}/${collectionPoint.id}/`,
      );

      // Abonnement réussi
      if (response.status === 201) {
        setSubscribed(true);
        alert('Vous êtes maintenant abonné à ce point de collecte!');
      }

      // Désabonnement réussi
      if (response.status === 200) {
        setSubscribed(false);
        alert('Vous êtes désabonné de ce point de collecte.');
      }
    } catch (error) {
      console.error('Erreur lors de l\'abonnement', error);
      alert('Une erreur est survenue lors de l\'abonnement');
    }
    UpdateUserInfo(user.id)
  };

  return (
    <div>
      {isAuthenticated && <button onClick={handleSubscribe}>
        {subscribed ? 'Se désabonner' : 'S\'abonner'}
      </button>}
    </div>
  );
};

export default SubscribeButton;
