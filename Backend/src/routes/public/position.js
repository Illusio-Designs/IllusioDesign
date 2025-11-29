import express from 'express';
import { getAllPositions, getPositionById } from '../../controllers/public/positionController.js';

const router = express.Router();

router.get('/', getAllPositions);
router.get('/:id', getPositionById);

export default router;

