const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { createHmac } = require('crypto');
require('dotenv').config();

async function handleSignup(req, res) {
    const { name, email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already in use' });
        }
        const newUser = new User({ name, email, password });
        await newUser.save();
        
        // Generate JWT token
        const token = jwt.sign(
            { id: newUser._id, email: newUser.email, role: newUser.role },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );
        
        res.status(201).json({ 
            message: 'User registered successfully',
            token,
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                role: newUser.role
            }
        });
    } catch (err) {
        console.error('Signup error:', err);
        res.status(500).json({ message: 'Server error during signup' });
    }
}

async function handleLogin(req, res) {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        const hash = createHmac('sha256', user.salt).update(password).digest('hex');
        if (hash !== user.password) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        
        // Generate JWT token
        const token = jwt.sign(
            { id: user._id, email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );
        
        res.status(200).json({ 
            message: 'Login successful',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ message: 'Server error during login' });
    }
}

module.exports = {
    handleSignup,
    handleLogin
};