import express from 'express';
import {
  getAllContactMessages,
  getContactMessageById,
  updateContactMessage,
  deleteContactMessage
} from '../../controllers/private/contactController.js';

const router = express.Router();

router.get('/', getAllContactMessages);
router.get('/:id', getContactMessageById);
router.put('/:id', updateContactMessage);
router.delete('/:id', deleteContactMessage);

export default router;

