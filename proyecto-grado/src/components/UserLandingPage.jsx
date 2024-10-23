// src/components/UserLandingPage.jsx
import React, { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { FaBars } from 'react-icons/fa';
import UserProfile from './UserProfile';
import Modal from './Modal';
import Comments from './Comments';
import './UserLandingPage.css';

const UserLandingPage = ({onLogout}) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [menuOpen, setMenuOpen] = useState(false);
    const [showProfile, setShowProfile] = useState(false);
    const [items, setItems] = useState([]);
    const [comments, setComments] = useState({});
    const [showComments, setShowComments] = useState(null);

    const itemsPerPage = 10;
    const menuRef = useRef(null);
    
    // Test data
    // const items = [
        //     { id: 1, title: 'Item 1', description: 'Description for item 1' },
        //     { id: 2, title: 'Item 2', description: 'Description for item 2' },
        //     { id: 3, title: 'Item 3', description: 'Description for item 3' },
        //     { id: 4, title: 'Item 4', description: 'Description for item 4' },
        //     { id: 5, title: 'Item 5', description: 'Description for item 5' },
        //     { id: 6, title: 'Item 6', description: 'Description for item 6' },
        //     { id: 7, title: 'Item 7', description: 'Description for item 7' },
        //     { id: 8, title: 'Item 8', description: 'Description for item 8' },
        //     { id: 9, title: 'Item 9', description: 'Description for item 9' },
        //     { id: 10, title: 'Item 10', description: 'Description for item 10' },
        //     { id: 11, title: 'Item 11', description: 'Description for item 11' },
        //     // Add more items as needed
        // ];
        
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

    const userName = 'User Name'; // Replace with actual user name
    const userInfo = { name: 'User Name', email: 'user@example.com', group: '7L', role: 'Student' };

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const contents = e.target.result;
                const fileUrl = URL.createObjectURL(new Blob([contents], { type: file.type }));
                setItems(prevItems => [
                    ...prevItems,
                    {
                        id: prevItems.length + 1,
                        title: file.name,
                        description: 'Description for ' + file.name,
                        timestamp: new Date().toLocaleString(),
                        fileUrl: fileUrl
                    }
                ]);
                setMenuOpen(false);
            };
            reader.readAsArrayBuffer(file);
        }
    };

    const addComment = (itemId, comment) => {
        setComments(prevComments => ({
            ...prevComments,
            [itemId]: [...(prevComments[itemId] || []), comment]
        }));
    };

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
                            {/* <button className='menu-content-item profile-button' onClick={() => {}}>Subir modelo 3D</button> */}
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
                {currentItems.map(item => (
                    <div key={item.id} className="library-item">
                        <h3 className="item-header">{item.title}</h3>
                        <p className="item-description">{item.description}</p>
                        <button onClick={() => setShowComments(item.id)}>
                            Ver comentarios
                        </button>
                        <Modal isOpen={showComments === item.id} onClose={() => setShowComments(null)}>
                            <Comments itemId={item.id} comments={comments[item.id] || []} addComment={addComment} />
                        </Modal>
                        <a href={item.fileUrl} download={item.title} className="item-download-button">
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