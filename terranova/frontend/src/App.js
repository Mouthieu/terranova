import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './styles/App.css';
import Navbar from './components/Navbar';
import CollectionPointList from './components/CollectionPointList';
import LoginForm from './components/LoginForm';
import AddCollectionPoint from './components/AddCollectionPoint';
import RegisterForm from './components/RegisterForm';
import GuidePratique from './components/GuidePratique';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState();

  useEffect(() => {
    if (localStorage.getItem('authenticated')) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  return (
    <div className="app-container">
      <Router>
        <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated}/>
        <main className="main-content">
          <RegisterForm />
          <LoginForm/>
          <AddCollectionPoint />
          <CollectionPointList />
          <GuidePratique />
        </main>
      </Router>
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

