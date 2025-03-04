import React, { useEffect, useState } from 'react';
import CollectionPointList from './components/CollectionPointList';
import LoginForm from './components/LoginForm';
import AddCollectionPoint from './components/AddCollectionPoint';
import AddressForm from './components/AdressForm';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true); // Si le token existe, l'utilisateur est authentifié
    } else {
      setIsAuthenticated(false); // Sinon, il n'est pas authentifié
    }
  }, []);

  return (
    <div>

      <h1>Bienvenue sur notre site de collecte de déchets</h1>
        <CollectionPointList />
        {/* <LoginForm /> */}
        <AddressForm />
    </div>
  );
};

export default App;
