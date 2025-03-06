import React, { useEffect, useState } from 'react';
import CollectionPointList from './components/CollectionPointList';
import LoginForm from './components/LoginForm';
import AddCollectionPoint from './components/AddCollectionPoint';
import RegisterForm from './components/RegisterForm';
import GuidePratique from './components/GuidePratique';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [mapInstance, setMapInstance] = useState(null);
  const [viewInstance, setViewInstance] = useState(null);
  const [showRegister, setShowRegister] = useState(false);

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
      <CollectionPointList />
      <GuidePratique />
    </div>
    // <div>
    //   <h1>Bienvenue sur notre site de collecte de déchets</h1>
    //   <RegisterForm />
    //   {!isAuthenticated ? (
    //     <div>
    //       <LoginForm />
    //       <button 
    //         onClick={() => setShowRegister(!showRegister)}
    //         style={{ margin: '20px', padding: '10px 20px', backgroundColor: '#3498db', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
    //       >
    //         {showRegister ? 'Se connecter' : 'S\'inscrire'}
    //       </button>
    //       {/* {showRegister && <RegisterForm />} */}
    //     </div>
    //   ) : (
    //     <div>
    //       <CollectionPointList />
    //       <AddCollectionPoint />
    //     </div>
    //   )}
    // </div>
  );
};

export default App;
