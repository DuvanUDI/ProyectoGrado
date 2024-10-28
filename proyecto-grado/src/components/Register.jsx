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
    const [error, setError] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/users/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, lastName, group, email, password, role }),
            });
            
            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message);
            }

            const data = await response.json();
            setName('');
            setLastName('');
            setGroup('');
            setEmail('');
            setPassword('');
            setRole('');
            onLoginClick();
        } catch (error) {
            console.error('Error registering user:', error);
            setError('Server error: ' + error.message);
        }
    };

    return (
        <div className='register-container'>
            <form onSubmit={handleRegister}>
                <h2>Crea una cuenta</h2>
                {error && <p className='error'>{error}</p>}
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nombres" />
                <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Apellidos" />
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
                <button type='submit'>Registrarse</button>
            </form>
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