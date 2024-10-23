// Modal.jsx
import React from 'react';
import './Modal.css'; // Ensure you have appropriate styles for the modal

const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="modal-close-button" onClick={onClose}>X</button>
                {children}
            </div>
        </div>
    );
};

export default Modal;