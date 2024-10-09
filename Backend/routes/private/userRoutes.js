const express = require('express');
const router = express.Router();
const userController = require('../../controllers/Private/userController');

// Public routes
router.post('/register', userController.registerUser); // Register a new user
router.post('/login', userController.loginUser); // Login a user

// Export the router
module.exports = router;