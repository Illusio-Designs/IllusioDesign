import express from 'express';
import {
  getAllCaseStudies,
  getCaseStudyById,
  createCaseStudy,
  updateCaseStudy,
  deleteCaseStudy
} from '../../controllers/private/caseStudyController.js';
import { upload, convertToWebP, convertMultipleToWebP } from '../../middleware/upload.js';

const router = express.Router();

router.get('/', getAllCaseStudies);
router.get('/:id', getCaseStudyById);
router.post('/', upload.fields([
  { name: 'image', maxCount: 1 },
  { name: 'additionalImages', maxCount: 10 }
]), convertToWebP, convertMultipleToWebP, createCaseStudy);
router.put('/:id', upload.fields([
  { name: 'image', maxCount: 1 },
  { name: 'additionalImages', maxCount: 10 }
]), convertToWebP, convertMultipleToWebP, updateCaseStudy);
router.delete('/:id', deleteCaseStudy);

export default router;

