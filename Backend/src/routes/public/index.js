import express from 'express';
import authRoutes from './auth.js';
import contentRoutes from './content.js';
import caseStudyRoutes from './caseStudy.js';
import blogRoutes from './blog.js';
import positionRoutes from './position.js';
import contactRoutes from './contact.js';
import teamRoutes from './team.js';
import seoRoutes from './seo.js';
import applicationRoutes from './application.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/content', contentRoutes);
router.use('/case-studies', caseStudyRoutes);
router.use('/blogs', blogRoutes);
router.use('/positions', positionRoutes);
router.use('/contact', contactRoutes);
router.use('/team', teamRoutes);
router.use('/seo', seoRoutes);
router.use('/applications', applicationRoutes);

export default router;
