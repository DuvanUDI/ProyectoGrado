// src/components/UserProfile.jsx
import React from 'react';
import './UserProfile.css';

const UserProfile = ({ user, onClose }) => {
    return (
        <div className="user-profile">
            <div className="user-profile-content">
                <h2>Perfil</h2>
                <p><strong>Nombre:</strong> {user.name + " " + user.lastName}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Rol:</strong> {user.role}</p>
                <p><strong>Grupo:</strong> {user.group}</p>
                <button onClick={onClose}>Cerrar</button>
            </div>
        </div>
    );
};

export default UserProfile;