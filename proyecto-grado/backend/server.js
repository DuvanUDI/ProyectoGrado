const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Connect to MongoDB
 mongoose.connect('mongodb://localhost:27017/test', {
     //useNewUrlParser: true,
     //useUnifiedTopology: true,
});

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

// Routes
const userRoutes = require('./routes/userRoutes');
const model3DRoutes = require('./routes/threeDModelRoutes');
const commentRoutes = require('./routes/commentRoutes');

app.use('/users', userRoutes);
app.use('/models', model3DRoutes);
app.use('/comments', commentRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});