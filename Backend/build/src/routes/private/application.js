import express from 'express';
import {
  getAllApplications,
  getApplicationById,
  updateApplication,
  deleteApplication
} from '../../controllers/private/applicationController.js';

const router = express.Router();

router.get('/', getAllApplications);
router.get('/:id', getApplicationById);
router.put('/:id', updateApplication);
router.delete('/:id', deleteApplication);

export default router;

