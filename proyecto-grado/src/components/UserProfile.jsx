// src/components/UserProfile.jsx
import React from 'react';
import './UserProfile.css';

const UserProfile = ({ user, onClose }) => {
    return (
        <div className="user-profile">
            <div className="user-profile-content">
                <h2>User Profile</h2>
                <p><strong>Name:</strong> {user.name}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Role:</strong> {user.role}</p>
                <p><strong>Group:</strong> {user.group}</p>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default UserProfile;