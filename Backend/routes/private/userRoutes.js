const express = require('express');
const router = express.Router();
const userController = require('../../controllers/Private/userController');

// Registration route
router.post('/register', userController.registerUser);

// Login route
router.post('/login', userController.loginUser);

// Logout route
router.post('/logout', userController.logoutUser);

// Get current user route
router.get('/current_user', userController.getCurrentUser); // Add this route

// Export the router
module.exports = router;
