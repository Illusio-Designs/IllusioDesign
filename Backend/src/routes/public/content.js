import express from 'express';
import { getAllPublicContent, getPublicContentById } from '../../controllers/public/contentController.js';

const router = express.Router();

router.get('/', getAllPublicContent);
router.get('/:id', getPublicContentById);

export default router;
