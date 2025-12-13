import express from 'express';
import { register, login, logout } from '../../controllers/private/authController.js';

const router = express.Router();

// Login and register don't require authentication (users don't have tokens yet)
// These routes are placed BEFORE the authenticateToken middleware in private/index.js
router.post('/register', register);
router.post('/login', login);

// Logout works with or without token (stateless JWT - client removes token)
router.post('/logout', logout);

export default router;

