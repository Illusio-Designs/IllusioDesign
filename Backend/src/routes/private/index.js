import express from 'express';
import { authenticateToken, isAdmin } from '../../middleware/auth.js';
import adminRoutes from './admin.js';
import dashboardRoutes from './dashboard.js';
import caseStudyRoutes from './caseStudy.js';
import blogRoutes from './blog.js';
import positionRoutes from './position.js';
import applicationRoutes from './application.js';
import contactRoutes from './contact.js';
import teamRoutes from './team.js';
import seoRoutes from './seo.js';

const router = express.Router();

// All private routes require authentication
router.use(authenticateToken);

// Admin-only routes
router.use('/admin', isAdmin, adminRoutes);

// Dashboard routes (authenticated users)
router.use('/dashboard', dashboardRoutes);

// Admin CRUD routes (require admin authentication)
router.use('/case-studies', isAdmin, caseStudyRoutes);
router.use('/blogs', isAdmin, blogRoutes);
router.use('/positions', isAdmin, positionRoutes);
router.use('/applications', isAdmin, applicationRoutes);
router.use('/contact-messages', isAdmin, contactRoutes);
router.use('/team', isAdmin, teamRoutes);
router.use('/seo', isAdmin, seoRoutes);

export default router;
