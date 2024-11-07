import React, { useEffect, useState } from 'react';
import { getAllReviews, approveReview, rejectReview } from '../services/reviewApi';

const ReviewList = () => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch reviews from the API
    const fetchReviews = async () => {
        setLoading(true);
        setError(null); // Reset error state before fetching
        try {
            const fetchedReviews = await getAllReviews();
            setReviews(fetchedReviews);
        } catch (error) {
            console.error('Error fetching reviews:', error);
            setError('Failed to fetch reviews. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    // Approve a review
    const handleApprove = async (id) => {
        try {
            await approveReview(id);
            fetchReviews(); // Refresh the list after approval
        } catch (error) {
            console.error('Error approving review:', error);
            setError('Failed to approve review. Please try again.');
        }
    };

    // Reject a review
    const handleReject = async (id) => {
        try {
            await rejectReview(id);
            fetchReviews(); // Refresh the list after rejection
        } catch (error) {
            console.error('Error rejecting review:', error);
            setError('Failed to reject review. Please try again.');
        }
    };

    useEffect(() => {
        fetchReviews();
    }, []);

    return (
        <div>
            <h1>Reviews</h1>
            {loading && <p>Loading reviews...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <ul>
                {reviews.map(review => (
                    <li key={review.id}>
                        <strong>{review.clientName}</strong>: {review.reviewContent} - {review.rating} Stars
                        <div>
                            <button onClick={() => handleApprove(review.id)}>Approve</button>
                            <button onClick={() => handleReject(review.id)}>Reject</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ReviewList; 