const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name : { type: String, required: true },
    lastName : { type: String, required: true },
    email : { type: String, required: true, unique: true },
    password : { type: String, required: true },
    role : { type: String, required: true, enum: ['admin', 'student', 'teacher'] },
    userId: { type: String, unique: true }
});

// Hash the password before saving the user
userSchema.pre('save', async function(next) {
    const user = this;
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 10);
    }
    next();
});

// Compare the password with the hashed password
userSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);
module.exports = User;