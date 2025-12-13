import express from 'express';
import { 
  getAllReviews, 
  getReviewById, 
  approveReview, 
  declineReview, 
  deleteReview 
} from '../../controllers/private/reviewController.js';

const router = express.Router();

router.get('/', getAllReviews);
router.get('/:id', getReviewById);
router.put('/:id/approve', approveReview);
router.put('/:id/decline', declineReview);
router.delete('/:id', deleteReview);

export default router;

