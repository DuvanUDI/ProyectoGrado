const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

// Register a new user
router.post('/register', async (req, res) => {
    try {
        const { name, lastName, email, password, role } = req.body;
        const user = new User({ name, lastName, email, password, role });
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

module.exports = router;