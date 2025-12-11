const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        trim: true,
        minlength: [3, 'Username must be at least 3 characters long']
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: [13, 'Email must be at least 13 characters long']
    },
    password: {
        type: String,
        required: true,
        minlength: [6, 'Password must be at least 6 characters long'],
        trim: true,
    }
});

const user = mongoose.model('User', userSchema);
module.exports = user;