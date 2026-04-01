const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['Administrator', 'HR Manager', 'Finance Officer', 'Site Supervisor', 'Security Guard'],
        default: 'Security Guard'
    },
    tier: {
        type: Number,
        enum: [1, 2, 3, 4, 5],
        default: 5
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);
