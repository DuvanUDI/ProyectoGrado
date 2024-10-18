// src/components/Home.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import './Home.css';

const Home = () => {
    const [showRegister, setShowRegister] = useState(false);
    return (
            <>
                <div className='app-container'>
                    <h1>Bienvenido</h1>
                    <div>
                        { showRegister ? (
                            <Register onLoginClick={ () => setShowRegister(false)}/> 
                        ):(
                            <Login onRegisterClick={ () => setShowRegister(true)}/>
                        )}
                    </div>
                </div>
            </>
    );
};

export default Home;