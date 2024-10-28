const mongoose = require('mongoose');

const threeDModelSchema = new mongoose.Schema({
    filename: { type: String, required: true },
    originalname: { type: String, required: true },
    description: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    userid: { type: String, required: true }
});

const ThreeDModel = mongoose.model('ThreeDModel', threeDModelSchema);
module.exports = ThreeDModel;