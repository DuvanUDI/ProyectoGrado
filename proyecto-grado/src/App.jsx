import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';
import Home from './components/Home';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';
export function App () {
  return (
        <>
            <header className='header'>
                <h1>Universidad de Investigación y Desarrollo - UDI</h1>
            </header>

            <body className='app-container'>
                <div className='content'>
                    <Home />
                </div>
            </body>
            <footer className='footer'>
                <p>Proyecto de Grado - UDI</p>
            </footer>
        </>
  );
}