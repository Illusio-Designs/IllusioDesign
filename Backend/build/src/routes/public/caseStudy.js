import express from 'express';
import { getAllCaseStudies, getCaseStudyById } from '../../controllers/public/caseStudyController.js';

const router = express.Router();

router.get('/', getAllCaseStudies);
router.get('/:id', getCaseStudyById);

export default router;

