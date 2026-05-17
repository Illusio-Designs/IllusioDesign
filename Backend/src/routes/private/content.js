import express from 'express';
import {
  getAllContent,
  getContentById,
  createContent,
  updateContent,
  deleteContent
} from '../../controllers/private/contentController.js';

const router = express.Router();

router.get('/', getAllContent);
router.get('/:id', getContentById);
router.post('/', createContent);
router.put('/:id', updateContent);
router.delete('/:id', deleteContent);

export default router;
