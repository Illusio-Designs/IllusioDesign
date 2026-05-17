import express from 'express';
import {
  getAllPolicies,
  getPolicyByType,
  upsertPolicy,
  deletePolicy
} from '../../controllers/private/policyController.js';

const router = express.Router();

router.get('/', getAllPolicies);
router.get('/:type', getPolicyByType);
router.put('/:type', upsertPolicy);
router.delete('/:type', deletePolicy);

export default router;
