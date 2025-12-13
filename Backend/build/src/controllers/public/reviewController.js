import Review from '../../models/Review.js';

// Submit a new review (public endpoint)
export const submitReview = async (req, res) => {
  try {
    const { rating, quote, client } = req.body;

    // Validation
    if (!rating || !quote || !client) {
      return res.status(400).json({ error: 'Rating, quote, and client name are required' });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({ error: 'Rating must be between 1 and 5' });
    }

    const review = await Review.create({
      rating: parseInt(rating),
      quote: quote.trim(),
      client: client.trim(),
      status: 'pending'
    });

    res.status(201).json({ 
      success: true, 
      message: 'Review submitted successfully. It will be reviewed before being published.',
      data: review 
    });
  } catch (error) {
    console.error('Error submitting review:', error);
    res.status(500).json({ error: error.message });
  }
};

// Get all approved reviews (public endpoint)
export const getApprovedReviews = async (req, res) => {
  try {
    const reviews = await Review.findAll({
      where: { status: 'approved' },
      order: [['createdAt', 'DESC']]
    });

    res.json({ data: reviews });
  } catch (error) {
    console.error('Error fetching approved reviews:', error);
    res.status(500).json({ error: error.message });
  }
};

