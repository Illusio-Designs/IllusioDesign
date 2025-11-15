import express from 'express';
import authRoutes from './auth.js';
import contentRoutes from './content.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/content', contentRoutes);

export default router;
