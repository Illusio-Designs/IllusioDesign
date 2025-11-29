import express from 'express';
import { createContactMessage } from '../../controllers/public/contactController.js';

const router = express.Router();

router.post('/', createContactMessage);

export default router;

