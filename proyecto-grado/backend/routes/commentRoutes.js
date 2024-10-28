const express = require('express');
const Comment = require('../models/Comment');
const router = express.Router();

// Create a new comment
router.post('/', async (req, res) => {
    try {
        const { modelId, text } = req.body;
        const comment = new Comment({ modelId, text });
        await comment.save();
        res.status(201).json(comment);
    } catch (error) {
        console.error('Error creating comment:', error);
        res.status(500).send('Server error');
    }
});

// Get all comments for a model
router.get('/:modelId', async (req, res) => {
    try {
        const { modelId } = req.params;
        const comments = await Comment.find({ modelId });
        res.json(comments);
    } catch (error) {
        console.error('Error fetching comments:', error);
        res.status(500).send('Server error');
    }
});

module.exports = router;