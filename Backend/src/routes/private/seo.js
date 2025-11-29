import express from 'express';
import {
  getAllSEO,
  getSEOByPage,
  createSEO,
  updateSEO,
  deleteSEO
} from '../../controllers/private/seoController.js';
import { upload, convertToWebP } from '../../middleware/upload.js';

const router = express.Router();

router.get('/', getAllSEO);
router.get('/page/:page', getSEOByPage);
router.post('/', upload.single('ogImage'), convertToWebP, createSEO);
router.put('/page/:page', upload.single('ogImage'), convertToWebP, updateSEO);
router.delete('/:id', deleteSEO);

export default router;

