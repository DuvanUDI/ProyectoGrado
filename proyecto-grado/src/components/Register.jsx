// src/components/Register.jsx
import React, { useState } from 'react';
import './Login.css';

const Register = ({onLoginClick}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = () => {
        // Handle register logic here
        console.log('Register:', email, password);
        onLoginClick();
    };

    return (
        <div className='register-container'>
            <h2>Crea una cuenta</h2>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
            <button onClick={handleRegister}>Registrarse</button>
            <p>
                ¿Ya tienes una cuenta?{' '}
                <a href="#" onClick={(e) => { e.preventDefault(); onLoginClick(); }}>
                    Inicia sesión aquí.
                </a>
            </p>
        </div>
    );
};

export default Register;