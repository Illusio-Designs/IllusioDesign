import express from 'express';
import { getProfile, updateProfile, getStats } from '../../controllers/private/dashboardController.js';

const router = express.Router();

router.get('/profile', getProfile);
router.put('/profile', updateProfile);
router.get('/stats', getStats);

export default router;
