// src/components/Login.jsx
import React, { useState } from 'react';
import './Login.css';

const Login = ({onRegisterClick}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        // Handle login logic here
        console.log('Login:', email, password);
    };

    return (
        <div className='login-container'>
            <h2>Iniciar sesión</h2>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
            <button onClick={handleLogin}>Iniciar sesión</button>
            <p>
                Don't have an account?{' '}
                <a href="#" onClick={(e) => { e.preventDefault(); onRegisterClick(); }}>
                    Register here
                </a>
            </p>
        </div>
    );
};

export default Login;