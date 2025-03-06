import React, { useEffect, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import L from 'leaflet';
import axios from 'axios';
import '../styles/CollectionPointList.css';
import SubscribeButton from './SubscribeButton';

const CollectionPointList = () => {
  const [collectionPoints, setCollectionPoints] = useState([]);
  const token = localStorage.getItem('token');

  const icon = new L.Icon({
    iconUrl: 'https://unpkg.com/leaflet/dist/images/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: 'https://unpkg.com/leaflet/dist/images/marker-shadow.png',
    shadowSize: [41, 41],
    shadowAnchor: [12, 41],
  });

  useEffect(() => {
    axios
      .get('http://127.0.0.1:8000/api/collection-points/', {})
      .then((response) => {
        setCollectionPoints(response.data);
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des points de collecte', error);
      });
  }, [token]);

  return (
    <div className="map-page-container">
      <h1 className="map-title">Carte des composteurs</h1>
      <p className="map-description">
        Découvrez les composteurs publics 📍 et les composteurs particuliers 📍 proches de chez vous.
        <br />Participez au compostage collectif dès à présent !
      </p>
      <div className="map-container">
        <MapContainer center={[48.3905, -4.4860]} zoom={13} style={{ height: "100%", width: "100%" }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {collectionPoints.map(point => (
            <Marker key={point.id} position={[point.latitude, point.longitude]} icon={icon}>
              <Popup>
                <div className="compost-info-card">
                  <h3 className="compost-info-title">
                    {point.public ? 'Composteur public' : 'Composteur particulier'}
                  </h3>
                  <div className="compost-info-list">
                    <p className="compost-info-item">Localisation : {point.address}</p>
                    <SubscribeButton collectionPoint={point} className="subscribe-button"/>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
          <div className="location-input">
            <input type="text" placeholder="Localisation" className="form-input" />
          </div>
        </MapContainer>
      </div>
    </div>
  );
};

export default CollectionPointList;
