import express from 'express';
import caseStudyRoutes from './caseStudy.js';
import blogRoutes from './blog.js';
import positionRoutes from './position.js';
import contactRoutes from './contact.js';
import teamRoutes from './team.js';
import seoRoutes from './seo.js';
import applicationRoutes from './application.js';
import privacyPolicyRoutes from './privacyPolicy.js';
import termsOfServiceRoutes from './termsOfService.js';
import reviewRoutes from './review.js';
import policyRoutes from './policy.js';
import settingRoutes from './setting.js';
import contentRoutes from './content.js';
import milestoneRoutes from './milestone.js';

const router = express.Router();

router.use('/case-studies', caseStudyRoutes);
router.use('/blogs', blogRoutes);
router.use('/positions', positionRoutes);
router.use('/contact', contactRoutes);
router.use('/team', teamRoutes);
router.use('/seo', seoRoutes);
router.use('/applications', applicationRoutes);
router.use('/privacy-policy', privacyPolicyRoutes);
router.use('/terms-of-service', termsOfServiceRoutes);
router.use('/reviews', reviewRoutes);
router.use('/policy', policyRoutes);
router.use('/settings', settingRoutes);
router.use('/content', contentRoutes);
router.use('/milestones', milestoneRoutes);

export default router;
