// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const passport = require('passport');

// Public routes
router.post('/users', userController.createUser); // Create a new user
router.get('/users', userController.getAllUsers); // Get all users

// Google authentication routes
router.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email'],
}));

router.get('/auth/google/callback', 
    passport.authenticate('google', { failureRedirect: '/login' }),
    userController.googleLoginSuccess // Redirect on success
);

// Route to get the current logged-in user
router.get('/current_user', userController.getCurrentUser); // Get current user

// Private route (you can implement authentication middleware)
router.get('/users/:id', authenticate, userController.getUserById); // Get a user by ID

module.exports = router;