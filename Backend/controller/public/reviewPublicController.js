const Review = require('../../models/Review');

// Create a new review
exports.createReview = async (req, res) => {
    try {
        const { clientName, clientDesignation, reviewContent, rating } = req.body;

        const newReview = await Review.create({
            clientName,
            clientDesignation,
            reviewContent,
            rating,
            approved: false, // Set to false by default
        });

        res.status(201).json(newReview);
    } catch (error) {
        console.error('Error creating review:', error);
        res.status(500).json({ message: 'Error creating review', error });
    }
}; 

exports.getAllReviews = async (req, res) => {
    try {
        const reviews = await Review.findAll();
        res.status(200).json(reviews);
    } catch (error) {
        console.error('Error fetching reviews:', error);
        res.status(500).json({ message: 'Error fetching reviews', error });
    }
};