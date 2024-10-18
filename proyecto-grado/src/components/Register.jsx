// src/components/Register.jsx
import React, { useState } from 'react';

const Register = ({onLoginClick}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = () => {
        // Handle register logic here
        console.log('Register:', email, password);
    };

    return (
        <div className='register-container'>
            <h2>Register</h2>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
            <button onClick={handleRegister}>Register</button>
            <p>
                Already have an account?{' '}
                <a href="#" onClick={(e) => { e.preventDefault(); onLoginClick(); }}>
                    Login here
                </a>
            </p>
        </div>
    );
};

export default Register;