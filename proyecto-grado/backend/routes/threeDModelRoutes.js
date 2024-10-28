const express = require('express');
const multer = require('multer');
const path = require('path');
const ThreeDModel = require('../models/ThreeDModel');
const router = express.Router();

// File storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage });

// Create a new 3D model
router.post('/upload', upload.single('file'), async (req, res) => {
    try {
        const threeDModel = new ThreeDModel({
            filename: req.file.filename,
            originalname: req.file.originalname,
            userid: req.body.userid,
            description: req.body.description,
        });
        await threeDModel.save();
        res.status(201).json(threeDModel);
    } catch (error) {
        console.error('Error uploading 3D model:', error);
        res.status(500).send('Server error');
    }
});

// Get a 3D model by user id
router.get('/users/:id', async (req, res) => {
    try {
        const models = await ThreeDModel.find({ userid: req.params.id });
        res.json(models);
    } catch (error) {
        console.error('Error fetching models:', error);
        res.status(500).send('Server error');
    }
});

// Get all 3D models
router.get('/library', async (req, res) => {
    try {
        const models = await ThreeDModel.find();
        res.json(models);
    } catch (error) {
        console.error('Error fetching models:', error);
        res.status(500).send('Server error');
    }
});

// Update a 3D model description
router.put('/:id', async (req, res) => {
    try {
        const { description } = req.body;
        const model = await ThreeDModel.findByIdAndUpdate(req.params.id, { description }, { new: true });
        if (!model) return res.status(404).send('Model not found');
        res.json(model);
    } catch (error) {
        console.error('Error updating model:', error);
        res.status(500).send('Server error');
    }
});

module.exports = router;