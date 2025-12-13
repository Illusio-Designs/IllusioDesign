import express from 'express';
import { getPrivacyPolicy } from '../../controllers/public/privacyPolicyController.js';

const router = express.Router();

router.get('/', getPrivacyPolicy);

export default router;

