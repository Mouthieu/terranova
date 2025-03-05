import React, { useEffect, useState } from 'react';
import CollectionPointList from './components/CollectionPointList';
import LoginForm from './components/LoginForm';
import AddCollectionPoint from './components/AddCollectionPoint';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [mapInstance, setMapInstance] = useState(null);
  const [viewInstance, setViewInstance] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  return (
    <div>
      <h1>Bienvenue sur notre site de collecte de déchets</h1>
      <CollectionPointList />

      <AddCollectionPoint />
      
    </div>
  );
};

export default App;
