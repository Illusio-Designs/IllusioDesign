import express from 'express';
import {
  getAllPrivacyPolicies,
  getPrivacyPolicyById,
  createPrivacyPolicy,
  updatePrivacyPolicy,
  deletePrivacyPolicy
} from '../../controllers/private/privacyPolicyController.js';

const router = express.Router();

router.get('/', getAllPrivacyPolicies);
router.get('/:id', getPrivacyPolicyById);
router.post('/', createPrivacyPolicy);
router.put('/:id', updatePrivacyPolicy);
router.delete('/:id', deletePrivacyPolicy);

export default router;

