import axios from 'axios';
// import * as React from 'react';
import L from 'leaflet';
import React, { useEffect, useState } from 'react';

import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import SubscribeButton from './SubscribeButton';
 
const CollectionPointList = () => {
  const [collectionPoints, setCollectionPoints] = useState([]);
  const token = localStorage.getItem('token');

  const icon = new L.Icon({
    iconUrl: 'https://unpkg.com/leaflet/dist/images/marker-icon.png', // chemin vers l'icône par défaut
    iconSize: [25, 41], // dimensions de l'icône
    iconAnchor: [12, 41], // point d'ancrage du marqueur
    popupAnchor: [1, -34], // point d'ancrage du popup
    shadowUrl: 'https://unpkg.com/leaflet/dist/images/marker-shadow.png', // ombre du marqueur
    shadowSize: [41, 41], // taille de l'ombre
    shadowAnchor: [12, 41], // point d'ancrage de l'ombre
  });

  useEffect(() => {
    axios
      .get('http://127.0.0.1:8000/api/collection-points/', {})
      .then((response) => {
        console.log("Données reçues:", response.data);
        setCollectionPoints(response.data);
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des points de collecte', error);
      });
  }, [token]);

  return (
    <div>
      <h2>Points de collecte</h2>
      <MapContainer center={[48.8566, 2.3522]} zoom={12} style={{ height: "500px", width: "50%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {collectionPoints.map(point => (
          <Marker key={point.id} position={[point.latitude, point.longitude]} icon={icon}>
            <Popup>
              {point.name} <br /> {point.address}
              <SubscribeButton collectionPoint={point}/>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
  
  
};

export default CollectionPointList;
