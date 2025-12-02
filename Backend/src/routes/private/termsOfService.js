import express from 'express';
import {
  getAllTermsOfService,
  getTermsOfServiceById,
  createTermsOfService,
  updateTermsOfService,
  deleteTermsOfService
} from '../../controllers/private/termsOfServiceController.js';

const router = express.Router();

router.get('/', getAllTermsOfService);
router.get('/:id', getTermsOfServiceById);
router.post('/', createTermsOfService);
router.put('/:id', updateTermsOfService);
router.delete('/:id', deleteTermsOfService);

export default router;

