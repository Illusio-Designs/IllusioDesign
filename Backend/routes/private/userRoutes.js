const express = require('express');
const userController = require('../../controllers/Private/userController');
const { uploadUserImage } = require('../../config/multer'); // Import multer configuration for user image upload
const authenticate = require('../../middleware/authenticate'); // JWT authentication middleware

const router = express.Router();

// Create a new user (no authentication required)
router.post('/create', uploadUserImage.single('userImage'), userController.createUser);

// Login user (no authentication required)
router.post('/login', userController.loginUser);

// Logout user (requires authentication)
router.post('/logout', authenticate, userController.logoutUser);

module.exports = router;
