// src/components/UserLandingPage.jsx
import React, { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { FaBars } from 'react-icons/fa';
import UserProfile from './UserProfile';
import Modal from './Modal';
import Comments from './Comments';
import './UserLandingPage.css';

const UserLandingPage = ({onLogout, user}) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [items, setItems] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [comments, setComments] = useState({});
    const [showComments, setShowComments] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [showProfile, setShowProfile] = useState(false);

    const itemsPerPage = 10;
    const menuRef = useRef(null);
    
        
    const filteredItems = items.filter(item => 
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
        
    const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);


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

    const handleFileUpload = async (event) => {
        const file = event.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('description', 'Description for ' + file.name);

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
                        title: data.originalname,
                        description: data.description,
                        timestamp: new Date().toLocaleString(),
                        fileUrl: 'http://localhost:5000/uploads/' + data.filename,
                    }
                ]);
                setMenuOpen(false);
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
        const response = await fetch('http://localhost:5000/models');
        if (!response.ok) {
          console.error('Error fetching files:', response.statusText);
          return;
        }
        const data = await response.json();
        setItems(data.map(file => ({
            id: file._id,
            title: file.originalname,
            description: file.description,
            fileUrl: 'http://localhost:5000/uploads/' + file.filename,
        })));
      }  
      catch (error) {
        console.error('Error fetching files:', error);
      }
    };

    useEffect(() => {
        fetchFiles();
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [menuRef]);

    return (
        <div className="user-landing-page">
            <header className="header">
                <h2>Bienvenido {user ? user.name + ' ' + user.lastName : 'Invitado'}</h2>
                <div className='burger-menu' ref={menuRef}>
                    <FaBars onClick={() => setMenuOpen(!menuOpen)} />
                    {menuOpen && (
                        <div className='menu-content'>
                            <button className='menu-content-item profile-button' onClick={() => setShowProfile(true)}>Mi cuenta</button>
                            <input 
                                type="file"
                                accept=".stl,.obj,.fbx"
                                style={{ display: 'none' }}
                                id="file-upload"
                                onChange={handleFileUpload}
                            />
                            <label htmlFor="file-upload" className='menu-content-item upload-button'>Subir modelo 3D</label>
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
                        <h3 className="item-header">{item.title}</h3>
                        <p className="item-description">{item.description}</p>
                        <button onClick={() => setShowComments(item.id)}>
                            Ver comentarios
                        </button>
                        <Modal isOpen={showComments === item.id} onClose={() => setShowComments(null)}>
                            <Comments itemId={item.id} comments={comments[item.id] || []} addComment={addComment} />
                        </Modal>
                        <a href={`http://localhost:5000/download/${item.id}`} className="item-download-button">
                            <FontAwesomeIcon icon={faDownload} />
                        </a>
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
            {showProfile && <UserProfile user={userInfo} onClose={() => setShowProfile(false)} />}
        </div>
    );
};

export default UserLandingPage;