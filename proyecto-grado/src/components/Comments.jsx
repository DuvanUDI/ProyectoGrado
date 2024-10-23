import React, { useState, useEffect, useRef } from 'react';
import { FaBars } from 'react-icons/fa';
import './Comments.css';

const Comments = ({ itemId, comments, addComment }) => {
    const [newComment, setNewComment] = useState('');

    const handleAddComment = () => {
        if (newComment.trim()) {
            addComment(itemId, newComment);
            setNewComment('');
        }
    };

    return (
        <div className="comments-section">
            <h4>Comments</h4>
            <ul className="comment">
                {comments.map((comment, index) => (
                    <li key={index}>{comment}</li>
                ))}
            </ul>
            <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Dejar comentario"
            />
            <button onClick={handleAddComment}>Enviar</button>
        </div>
    );
};

export default Comments;