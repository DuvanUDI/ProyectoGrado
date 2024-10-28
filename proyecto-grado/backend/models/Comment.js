const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    modelId: { type: mongoose.Schema.Types.ObjectId, ref: 'ThreeDModel', required: false },
    text: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
});

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;