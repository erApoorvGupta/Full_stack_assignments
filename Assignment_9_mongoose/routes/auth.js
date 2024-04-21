// routes/auth.js

const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Login route
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username, password });
        if (user) {
            res.json({ success: true, message: `Hello, ${username}! Login successful` });
        } else {
            res.status(401).json({ success: false, message: 'Incorrect username or password. Please try again.' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

// Signup route
router.post('/signup', async (req, res) => {
    const { username, password } = req.body;
    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'Username already exists. Please choose a different username.' });
        }
        const newUser = new User({ username, password });
        await newUser.save();
        res.status(201).json({ success: true, message: 'Signup successful' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

module.exports = router;

