// src/components/UserLandingPage.jsx
import React, { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { FaBars } from 'react-icons/fa';
import UserProfile from './UserProfile';
import Modal from './Modal';
import Comments from './Comments';
import './UserLandingPage.css';
import UploadForm from './UploadForm';

const UserLandingPage = ({onLogout}) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [uploadFormOpen, setUploadFormOpen] = useState(false);
    const [items, setItems] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [comments, setComments] = useState({});
    const [showComments, setShowComments] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [showProfile, setShowProfile] = useState(false);
    const [showUploadForm, setShowUploadForm] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);

    const itemsPerPage = 10;
    const menuRef = useRef(null);
    
        
    const filteredItems = items?.filter(item => 
        item.filename.toLowerCase().includes(searchQuery.toLowerCase())
    );
        
    const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

    useEffect(() => {
        const fetchCurrentUser = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) return;

                const response = await fetch('http://localhost:5000/users/me', {
                    headers: {
                        'Authorization': token,
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch current user');
                }

                const data = await response.json();
                setCurrentUser(data);
            } catch (error) {
                console.error('Error fetching current user:', error);
            }
        };

        fetchCurrentUser();
    }, []);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleFileUpload = async (file, description) => {
        if (file) {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('fileid', file._id);
            formData.append('description', description);
            formData.append('userid', currentUser.userId);
            try {
            const response = await fetch('http://localhost:5000/models/upload', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                console.error('Error uploading file:', response.statusText);
                return;
            }

            const data = await response.json();
                setItems(prevItems => [
                    ...prevItems,
                    {
                        id: data._id,
                        filename: data.originalname,
                        description: data.description,
                        fileUrl: 'http://localhost:5000/uploads/' + data.filename,
                    }
                ]);
                console.log(currentUser.userId);
                setShowUploadForm(false);
            } catch (error) {
                console.error('Error uploading file:', error);
            }
        } else {
            console.error('No file selected');
        }
    };

    const addComment = async (itemId, comment) => {
        const response = await fetch('http://localhost:5000/comments', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ fileId: itemId, text: comment })
        });

        if (!response.ok) {
            console.error('Error adding comment:', response.statusText);
            return;
        }

        const data = await response.json();
        setComments(prevComments => ({
            ...prevComments,
            [itemId]: [...(prevComments[itemId] || []), data.text]
        }));
    };

    const fetchFiles = async () => {
        try {
            const response = await fetch(`http://localhost:5000/models/library`);
            if (!response.ok) {
            console.error('Error fetching files:', response.statusText);
            return;
            }
            const data = await response.json();
            setItems(data.map(file => ({
                id: file._id,
                filename: file.originalname,
                description: file.description,
                fileUrl: 'http://localhost:5000/uploads/' + file.filename,
            })));
        } catch (error) {
                console.error('Error fetching files:', error);
        }
    };

    const handleDownload = (fileUrl) => {
        const link = document.createElement('a');
        link.href = fileUrl;
        link.download = fileUrl.split('/').pop();
        link.click(); 
        document.body.removeChild(link);
    };

    useEffect(() => {
            fetchFiles();
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMenuOpen(false);
                setUploadFormOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [menuRef]);

    return (
        <div className="user-landing-page">
            <header className="header">
                <h2>Bienvenido {currentUser ? currentUser.name + ' ' + currentUser.lastName : 'Invitado'}</h2>
                <button className="upload-button" onClick={() => setShowUploadForm(true)}>Subir modelo</button>
                <div className='burger-menu' ref={menuRef}>
                    <FaBars onClick={() => setMenuOpen(!menuOpen)} />
                    {menuOpen && (
                        <div className='menu-content'>
                            <button className='menu-content-item profile-button' onClick={() => setShowProfile(true)}>Mi cuenta</button>
                            <button onClick={onLogout} className='menu-content-item logout-button'>Cerrar sesión</button>
                        </div>
                    )}
                </div>
            </header>
            <div className="search-bar">
                <input 
                    type="text" 
                    value={searchQuery} 
                    onChange={(e) => setSearchQuery(e.target.value)} 
                    placeholder="Buscar..." 
                />
            </div>
            <div className="library">
                {items.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map(item => (
                    <div key={item.id} className="library-item">
                        <h3 className="item-header">{item.filename}</h3>
                        <p className="item-description">{item.description}</p>
                        <button onClick={() => setShowComments(item.id)}>
                            Ver comentarios
                        </button>
                        <Modal isOpen={showComments === item.id} onClose={() => setShowComments(null)}>
                            <Comments itemId={item.id} comments={comments[item.id] || []} addComment={addComment} />
                        </Modal>
                        <a href={item.fileUrl} target="_blank" rel="noopener noreferrer">
                            
                        </a>
                        <button className="item-download-button" onClick={() => handleDownload(item.fileUrl)}><FontAwesomeIcon icon={faDownload} /></button>
                    </div>
                ))}
            </div>
            <div className="pagination">
                <button onClick={handlePreviousPage} disabled={currentPage === 1}>
                    Atrás
                </button>
                <span>Página {currentPage} de {totalPages}</span>
                <button onClick={handleNextPage} disabled={currentPage === totalPages}>
                    Siguiente
                </button>
            </div>
            {showUploadForm && <UploadForm onUploadSuccess={handleFileUpload} />}
            {showProfile && <UserProfile user={currentUser} onClose={() => setShowProfile(false)} />}
        </div>
    );
};

export default UserLandingPage;