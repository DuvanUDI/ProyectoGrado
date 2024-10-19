// src/components/Home.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import UserLandingPage from './UserLandingPage';
import './Home.css';

const Home = () => {
    const [showRegister, setShowRegister] = useState(false);
    const [currentComponent, setCurrentComponent] = useState('login');
    const handleLogin = () => {
        setCurrentComponent('userLandingPage');
    };

    const handleRegisterClick = () => {
        setCurrentComponent('register');
    };

    const handleLoginClick = () => {
        setCurrentComponent('login');
    };

    const welcomeText = (<h1>Bienvenido</h1>);

    return (
            <>
                <div className='app-container'>
                    {currentComponent === 'login' && welcomeText}
                    
                    <div>
                        {currentComponent === 'login' && <Login onLogin={handleLogin} onRegisterClick={handleRegisterClick} />}
                        {currentComponent === 'register' && <Register onLoginClick={handleLoginClick} />}
                        {currentComponent === 'userLandingPage' && <UserLandingPage onLogout={handleLoginClick}/>}
                    </div>
                </div>
            </>
    );
};

export default Home;