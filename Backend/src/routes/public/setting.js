import express from 'express';
import { getPublicSettings } from '../../controllers/public/settingController.js';

const router = express.Router();

router.get('/', getPublicSettings);

export default router;
