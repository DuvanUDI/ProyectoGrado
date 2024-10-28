const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

// Register a new user
router.post('/register', async (req, res) => {
    try {
        const { name, lastName, email, password, role } = req.body;
        const userId = uuidv4();
        const user = new User({ name, lastName, email, password, role, userId });
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).send('Server error');
    }
});

// Login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(401).send('Invalid credentials');
        const isMatch = await user.comparePassword(password);
        if (!isMatch) return res.status(401).send('Invalid credentials');
        const token = jwt.sign({ userId : user._id }, 'SECRET', { expiresIn: '7d' });
        res.json({ user, token });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).send('Server error');
    }
});

// Middleware to verify the token
router.use((req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(401).send('Access denied');
    jwt.verify(token, 'SECRET', (error, user) => {
        if (error) return res.status(401).send('Access denied');
        req.user = user;
        next();
    });
});

// Get the current user
router.get('/me', async (req, res) => {
    try {
        const user = await User.findById(req.user.userId);
        res.json(user);
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).send('Server error');
    }
});

module.exports = router;