const Review = require('../../models/Review');

// Get all reviews
exports.getAllReviews = async (req, res) => {
    try {
        const reviews = await Review.findAll();
        res.status(200).json(reviews);
    } catch (error) {
        console.error('Error fetching reviews:', error);
        res.status(500).json({ message: 'Error fetching reviews', error });
    }
};

// Get review by ID
exports.getReviewById = async (req, res) => {
    try {
        const { id } = req.params;
        const review = await Review.findByPk(id);

        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }

        res.status(200).json(review);
    } catch (error) {
        console.error('Error fetching review:', error);
        res.status(500).json({ message: 'Error fetching review', error });
    }
};

// Approve a review
exports.approveReview = async (req, res) => {
    try {
        const { id } = req.params;
        const review = await Review.findByPk(id);

        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }

        review.approved = true;
        await review.save();

        res.status(200).json(review);
    } catch (error) {
        console.error('Error approving review:', error);
        res.status(500).json({ message: 'Error approving review', error });
    }
};

// Reject a review
exports.rejectReview = async (req, res) => {
    try {
        const { id } = req.params;
        const review = await Review.findByPk(id);

        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }

        await review.destroy(); // Delete the review or set a rejected status if needed

        res.status(204).send(); // No content
    } catch (error) {
        console.error('Error rejecting review:', error);
        res.status(500).json({ message: 'Error rejecting review', error });
    }
}; 