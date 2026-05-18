import express from 'express';
import { getPublicMilestones } from '../../controllers/public/milestoneController.js';

const router = express.Router();

router.get('/', getPublicMilestones);

export default router;
