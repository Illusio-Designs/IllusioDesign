import express from 'express';
import { submitReview, getApprovedReviews } from '../../controllers/public/reviewController.js';

const router = express.Router();

router.post('/', submitReview);
router.get('/', getApprovedReviews);

export default router;

