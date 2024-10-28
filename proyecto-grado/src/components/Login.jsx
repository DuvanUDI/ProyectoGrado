// src/components/Login.jsx
import React, { useState } from 'react';
import './Login.css';

const Login = ({onLogin, onRegisterClick}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/users/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });
            
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message);
            }

            localStorage.setItem('token', data.token);
            onLogin(data.user);
        } catch (error) {
            console.error('Error logging in:', error);
            setError('Error al iniciar sesión. Por favor, inténtelo de nuevo.');
        }
    };

    return (
        <div className='login-container'>
            <form onSubmit={handleLogin}>
                <h2>Iniciar sesión</h2>
                {error && <p className='error'>{error}</p>}
                <input type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    placeholder="Email" required/>
                <input type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        placeholder="Password" required/>
                <button type='submit' >Iniciar sesión</button>
            </form>
                <p>
                    ¿Aún no tienes una cuenta?{' '}
                    <a href="#" onClick={(e) => { e.preventDefault(); onRegisterClick(); }}>
                        Regístrate aquí.
                    </a>
                </p>
        </div>
    );
};

export default Login;