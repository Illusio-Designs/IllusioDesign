import express from 'express';
import { getAllPositions, getPositionById, getPositionBySlug } from '../../controllers/public/positionController.js';

const router = express.Router();

router.get('/', getAllPositions);
router.get('/slug/:slug', getPositionBySlug);
router.get('/:id', getPositionById);

export default router;

