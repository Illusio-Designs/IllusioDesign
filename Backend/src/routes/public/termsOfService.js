import express from 'express';
import { getTermsOfService } from '../../controllers/public/termsOfServiceController.js';

const router = express.Router();

router.get('/', getTermsOfService);

export default router;

