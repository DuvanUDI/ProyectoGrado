import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';
import Home from './components/Home';
export function App () {
  return (
        <>
            <header className='header'>
                <img src='https://web.udi.edu.co/files/img/logo-udi-web.png' alt='UDI' />
                <h1></h1>
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