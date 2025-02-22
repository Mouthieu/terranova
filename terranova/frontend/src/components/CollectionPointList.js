import axios from 'axios';
import React, { useEffect, useState } from 'react';
import SubscribeButton from './SubscribeButton';

const CollectionPointList = () => {
  const [points, setPoints] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      axios
        .get('http://127.0.0.1:8000/api/collection-points/', {})
        .then((response) => {
          setPoints(response.data);
        })
        .catch((error) => {
          console.error('Erreur lors de la récupération des points de collecte', error);
        });
    }
  }, [token]);

  return (
    <div>
      <h2>Liste des points de collecte</h2>
      <ul>
        {points.length ? (
          points.map((point, index) => (
            <li key={index}>
              {point.name} - {point.adress} - {point.latitude}, {point.longitude} <span></span>
              <SubscribeButton collectionPoint={point} />
            </li>
          ))
        ) : (
          <p>Aucun point de collecte trouvé.</p>
        )}
      </ul>
    </div>
  );
};

export default CollectionPointList;
