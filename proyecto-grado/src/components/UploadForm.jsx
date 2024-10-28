import React, { useState } from 'react';
import Modal from './Modal';

import './UserProfile.css';

const UploadForm = ({ onUploadSuccess }) => {
    const [file, setFile] = useState(null);
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) {
            setError('Please select a file to upload.');
            return;
        }

        try {
            onUploadSuccess(file, description);
            setFile(null);
            setDescription('');
            setError('');
        } catch (error) {
            console.error('Error uploading file:', error);
            setError('Error al subir el archivo. Por favor, inténtelo de nuevo.');
        }
    };


    return (
        <div className='user-profile'>
            <div className='user-profile-content'>
            <h2>Subir Modelo 3D</h2>
            <form onSubmit={handleSubmit}>
                <input 
                    type="file"
                    accept=".stl,.obj,.fbx"
                    id="file-upload"
                    onChange={handleFileChange}
                />
                <input
                    type="text"
                    value={description}
                    onChange={handleDescriptionChange}
                    placeholder="Descripción"
                />
                <button type="submit">Subir</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    </div>
    );
};

export default UploadForm;