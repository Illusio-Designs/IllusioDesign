import express from 'express';
import { authenticateToken, isAdmin } from '../../middleware/auth.js';
import adminRoutes from './admin.js';
import dashboardRoutes from './dashboard.js';

const router = express.Router();

// All private routes require authentication
router.use(authenticateToken);

// Admin-only routes
router.use('/admin', isAdmin, adminRoutes);

// Dashboard routes (authenticated users)
router.use('/dashboard', dashboardRoutes);

export default router;
