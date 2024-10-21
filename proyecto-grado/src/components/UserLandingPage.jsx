// src/components/UserLandingPage.jsx
import React, { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { FaBars } from 'react-icons/fa';
import UserProfile from './UserProfile';
import './UserLandingPage.css';

const UserLandingPage = ({onLogout}) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [menuOpen, setMenuOpen] = useState(false);
    const [showProfile, setShowProfile] = useState(false);
    const itemsPerPage = 10;
    const menuRef = useRef(null);

    // Test data
    const items = [
        { id: 1, title: 'Item 1', description: 'Description for item 1' },
        { id: 2, title: 'Item 2', description: 'Description for item 2' },
        { id: 3, title: 'Item 3', description: 'Description for item 3' },
        { id: 4, title: 'Item 4', description: 'Description for item 4' },
        { id: 5, title: 'Item 5', description: 'Description for item 5' },
        { id: 6, title: 'Item 6', description: 'Description for item 6' },
        { id: 7, title: 'Item 7', description: 'Description for item 7' },
        { id: 8, title: 'Item 8', description: 'Description for item 8' },
        { id: 9, title: 'Item 9', description: 'Description for item 9' },
        { id: 10, title: 'Item 10', description: 'Description for item 10' },
        { id: 11, title: 'Item 11', description: 'Description for item 11' },
        // Add more items as needed
    ];

    const filteredItems = items.filter(item => 
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

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

    const userName = 'User Name'; // Replace with actual user name
    const userInfo = { name: 'User Name', email: 'user@example.com', group: '7L', role: 'Student' };

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
                <h2>Bienvenido {userName}</h2>
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
                {currentItems.map(item => (
                    <div key={item.id} className="library-item">
                        <div className="item-header">
                            <span className="item-title">{item.title}</span>
                            <span className="item-timestamp">{item.timestamp}</span>
                        </div>
                        <div className="item-description">{item.description}</div>
                        <button className="item-download-button">
                            <FontAwesomeIcon icon={faDownload} />
                        </button>
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