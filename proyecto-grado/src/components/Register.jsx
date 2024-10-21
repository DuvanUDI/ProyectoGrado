// src/components/Register.jsx
import React, { useState } from 'react';
import './Login.css';
import './Register.css';

const Register = ({onLoginClick}) => {
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [group, setGroup] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');

    const handleRegister = () => {
        // Handle register logic here
        console.log('Register:', email, password);
        onLoginClick();
    };

    return (
        <div className='register-container'>
            <h2>Crea una cuenta</h2>
            <input type="text" value={name} onChange={(e) => setEmail(e.target.value)} placeholder="Nombres" />
            <input type="text" value={lastName} onChange={(e) => setEmail(e.target.value)} placeholder="Apellidos" />
            <select value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="">Selecciona un rol</option>
                <option value="student">Estudiante</option>
                <option value="teacher">Docente</option>
            </select>
            <select value={group} onChange={(e) => setGroup(e.target.value)}>
                <option value="">Selecciona un grupo</option>
                <option value="group1">Grupo 1</option>
                <option value="group2">Grupo 2</option>
                <option value="group3">Grupo 3</option>
            </select>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Contraseña" />
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