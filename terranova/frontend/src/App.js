import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './styles/App.css';
import Navbar from './components/Navbar';
import CollectionPointList from './components/CollectionPointList';
import LoginForm from './components/LoginForm';
import AddCollectionPoint from './components/AddCollectionPoint';
import RegisterForm from './components/RegisterForm';
import GuidePratique from './components/GuidePratique';
import Profile from './components/Profile';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState();
  const [isRegistered, setIsRegistered] = useState()
  const [isAddCollectionPoint, setIsAddCollectionPoint] = useState()
  const [connecting, setConnecting] = useState()
  const [registering, setRegistering] = useState()
  const [checkingProfile, setCheckingProfile] = useState()

  const [compostersData, setCompostersData] = useState()

  const handleCondition = (string) => {
    if (string === "collectionPointList") {
      return !registering && !connecting && !isAddCollectionPoint && !checkingProfile
    } else if (string === "guide") {
      return !registering && !connecting && !isAddCollectionPoint && !checkingProfile
    } else if (string === "registering") {
      return registering && !connecting && !isAddCollectionPoint && !isAuthenticated && !isRegistered && !checkingProfile
    } else if (string === "connecting") {
      return !registering && connecting && !isAddCollectionPoint && !isAuthenticated && !isRegistered && !checkingProfile
    } else if (string === "addCollectionPoint") {
      return !registering && !connecting && isAddCollectionPoint && !checkingProfile
    } else if (string === "profile") {
      return !registering && !connecting && !isAddCollectionPoint && checkingProfile
    }
  }

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
        <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} setIsRegistered={setIsRegistered} setConnecting={setConnecting} setRegistering={setRegistering} setCheckingProfile={setCheckingProfile} setIsAddCollectionPoint={setIsAddCollectionPoint}/>
        <main className="main-content">
          {handleCondition("collectionPointList") && <CollectionPointList />}
          {handleCondition("guide")               && <GuidePratique />}
          {handleCondition("registering")         && <RegisterForm        setIsRegistered={setIsRegistered} setIsAuthenticated={setIsAuthenticated} setRegistering={setRegistering}/>}
          {handleCondition("connecting")          && <LoginForm setCompostersData={setCompostersData}/>}
          {handleCondition("addCollectionPoint")  && <AddCollectionPoint  setIsAddCollectionPoint={setIsAddCollectionPoint}/>}
          {handleCondition("profile")             && <Profile             setIsAddCollectionPoint={setIsAddCollectionPoint} setCheckingProfile={setCheckingProfile} compostersData={compostersData}/>}
        </main>
      </Router>
    </div>
  );
};

export default App;

