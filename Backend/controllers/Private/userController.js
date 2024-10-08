// controllers/userController.js
const User = require('../../models/User');

// Create a new user
const createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const newUser = await User.create({ name, email, password });
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Function to handle Google login success
const googleLoginSuccess = (req, res) => {
    // User is authenticated, send user info or redirect
    res.redirect('/api/users'); // Redirect to users or any other route
};

// Function to handle Google login failure
const googleLoginFailure = (req, res) => {
    res.status(401).json({ error: 'Login failed' });
};

// Function to get the current logged-in user
const getCurrentUser = (req, res) => {
    if (req.user) {
        res.json(req.user); // Send user info if logged in
    } else {
        res.status(401).json({ error: 'Not authenticated' });
    }
};

// Export the controller functions
module.exports = {
    createUser,
    getAllUsers,
    googleLoginSuccess,
    googleLoginFailure,
    getCurrentUser,
};