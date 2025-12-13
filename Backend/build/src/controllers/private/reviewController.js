import Review from '../../models/Review.js';

// Get all reviews (admin endpoint)
export const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.findAll({
      order: [['createdAt', 'DESC']]
    });

    res.json({ data: reviews });
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ error: error.message });
  }
};

// Get review by ID (admin endpoint)
export const getReviewById = async (req, res) => {
  try {
    const review = await Review.findByPk(req.params.id);
    
    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }
    
    res.json({ data: review });
  } catch (error) {
    console.error('Error fetching review:', error);
    res.status(500).json({ error: error.message });
  }
};

// Approve a review (admin endpoint)
export const approveReview = async (req, res) => {
  try {
    const review = await Review.findByPk(req.params.id);
    
    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }

    review.status = 'approved';
    await review.save();

    res.json({ 
      success: true, 
      message: 'Review approved successfully',
      data: review 
    });
  } catch (error) {
    console.error('Error approving review:', error);
    res.status(500).json({ error: error.message });
  }
};

// Decline a review (admin endpoint)
export const declineReview = async (req, res) => {
  try {
    const review = await Review.findByPk(req.params.id);
    
    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }

    review.status = 'declined';
    await review.save();

    res.json({ 
      success: true, 
      message: 'Review declined successfully',
      data: review 
    });
  } catch (error) {
    console.error('Error declining review:', error);
    res.status(500).json({ error: error.message });
  }
};

// Delete a review (admin endpoint)
export const deleteReview = async (req, res) => {
  try {
    const review = await Review.findByPk(req.params.id);
    
    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }

    await review.destroy();

    res.json({ 
      success: true, 
      message: 'Review deleted successfully' 
    });
  } catch (error) {
    console.error('Error deleting review:', error);
    res.status(500).json({ error: error.message });
  }
};

