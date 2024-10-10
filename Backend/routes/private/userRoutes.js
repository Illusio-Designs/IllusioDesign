// routes/private/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../../controllers/Private/userController');

// Registration route
router.post('/register', userController.registerUser);

// Login route
router.post('/login', userController.loginUser);

// Export the router
module.exports = router;
