import React, { useState } from 'react';
import { createPublicReview } from '../utils/api';

const ReviewForm = ({ onReviewSubmitted }) => {
    const [clientName, setClientName] = useState('');
    const [clientDesignation, setClientDesignation] = useState('');
    const [reviewContent, setReviewContent] = useState('');
    const [rating, setRating] = useState(1);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const newReview = await createPublicReview({ clientName, clientDesignation, reviewContent, rating });
            onReviewSubmitted(newReview);
            setClientName('');
            setClientDesignation('');
            setReviewContent('');
            setRating(1);
        } catch (error) {
            console.error('Error submitting review:', error);
            alert('Failed to submit review. Please try again.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder="Your Name"
                required
            />
            <input
                type="text"
                value={clientDesignation}
                onChange={(e) => setClientDesignation(e.target.value)}
                placeholder="Your Designation"
            />
            <textarea
                value={reviewContent}
                onChange={(e) => setReviewContent(e.target.value)}
                placeholder="Your Review"
                required
            />
            <div>
                <label>Rating:</label>
                <select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
                    {[1, 2, 3, 4, 5].map((star) => (
                        <option key={star} value={star}>{star} Star{star > 1 ? 's' : ''}</option>
                    ))}
                </select>
            </div>
            <button type="submit">Submit Review</button>
        </form>
    );
};

export default ReviewForm; 