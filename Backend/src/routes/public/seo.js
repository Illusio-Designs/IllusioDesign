import express from 'express';
import { getSEOByPage } from '../../controllers/public/seoController.js';

const router = express.Router();

router.get('/:page', getSEOByPage);

export default router;

