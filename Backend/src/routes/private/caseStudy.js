import express from 'express';
import {
  getAllCaseStudies,
  getCaseStudyById,
  createCaseStudy,
  updateCaseStudy,
  deleteCaseStudy
} from '../../controllers/private/caseStudyController.js';
import { upload, convertToWebP } from '../../middleware/upload.js';

const router = express.Router();

router.get('/', getAllCaseStudies);
router.get('/:id', getCaseStudyById);
router.post('/', upload.single('image'), convertToWebP, createCaseStudy);
router.put('/:id', upload.single('image'), convertToWebP, updateCaseStudy);
router.delete('/:id', deleteCaseStudy);

export default router;

