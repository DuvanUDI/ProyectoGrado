import React, {useState} from 'react';

const CommentSection = () => {
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState('');

    const handleAddComment = () => {
        const newComments = [...comments, comment];
        setComments(newComments);
        setComment('');
    };

    return (
        <div>
            <h3>Comments</h3>
            <input
                type="text"
                placeholder="Add a comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
            />
            <button onClick={handleAddComment}>Add</button>

            <ul>
                {comments.map((c, index) => (
                    <li key={index}>{c}</li>
                ))}
            </ul>
        </div>
    );
};

export default CommentSection;