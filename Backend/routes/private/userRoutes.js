const express = require('express');
const router = express.Router();
const userController = require('../../controller/private/userController');
const upload = require('../../middleware/upload'); // Just import upload directly
const authenticate = require('../../middleware/auth'); // JWT middleware for protected routes

// User registration with image upload
router.post('/register', upload.single('image'), userController.register);

// User login
router.post('/login', userController.login);

// User logout (JWT-based)
router.post('/logout', userController.logout);

// Get list of users (Protected route - requires JWT authentication)
router.get('/list', authenticate, userController.listUsers);

// Update user by ID (Protected route - requires JWT authentication)
router.put('/update/:id', authenticate, upload.single('image'), userController.updateUserById);

// Delete user by ID (Protected route - requires JWT authentication)
router.delete('/delete/:id', authenticate, userController.deleteUserById);

// Get user by ID (Protected route - requires JWT authentication)
router.get('/:id', authenticate, userController.getUserById);

// Handle multer errors if you have a specific error handler
// router.use(handleMulterError); // Uncomment if you implement handleMulterError

module.exports = router;
