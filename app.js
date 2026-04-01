require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const app = express();

// Security middleware
app.use(helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false
}));

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
});
app.use('/api/', limiter);

// Body parsing
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/gismac');
        console.log('MongoDB Connected');
    } catch (err) {
        console.error('MongoDB Error:', err.message);
    }
};
connectDB();

// Import Models
const User = require('./models/User');

// ========== API ROUTES ==========

// Health check
app.get('/api/v1/health', (req, res) => {
    res.json({
        success: true,
        data: {
            status: 'healthy',
            database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
            version: '3.0.0',
            timestamp: new Date().toISOString()
        }
    });
});

// Auth routes
app.post('/api/v1/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                error: 'Email and password required'
            });
        }

        const user = await User.findOne({ email: email.toLowerCase() });

        if (!user) {
            return res.status(401).json({
                success: false,
                error: 'Invalid credentials'
            });
        }

        const bcrypt = require('bcryptjs');
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                error: 'Invalid credentials'
            });
        }

        const jwt = require('jsonwebtoken');
        const token = jwt.sign(
            { id: user._id, email: user.email, role: user.role, tier: user.tier },
            process.env.JWT_SECRET || 'fallback-secret-key-min-32-characters-long',
            { expiresIn: '24h' }
        );

        res.json({
            success: true,
            data: {
                user: {
                    id: user._id,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    role: user.role,
                    tier: user.tier
                },
                tokens: { accessToken: token }
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ success: false, error: 'Server error' });
    }
});

// Users routes
app.get('/api/v1/users', async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.json({ success: true, count: users.length, data: users });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Records routes
app.get('/api/v1/records', (req, res) => {
    res.json({ success: true, count: 0, data: [] });
});

// ========== SERVE FRONTEND ==========
app.use(express.static(path.join(__dirname, 'frontend')));

// Handle SPA routing - serve index.html for all non-API routes
app.get('*', (req, res) => {
    if (!req.path.startsWith('/api')) {
        res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
    }
});

// Error handler
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({ success: false, error: 'Internal server error' });
});

// For cPanel - use PORT from environment or default
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log('========================================');
    console.log('Gismac MS Server Running');
    console.log(`Port: ${PORT}`);
    console.log(`Mode: ${process.env.NODE_ENV || 'development'}`);
    console.log('========================================');
});

module.exports = app;
