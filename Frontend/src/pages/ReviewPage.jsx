import React, { useEffect, useState } from 'react';
import { getAllPublicReviews } from '../utils/api';
import ReviewForm from '../components/ReviewForm';

const ReviewPage = () => {
    const [reviews, setReviews] = useState([]);

    const fetchReviews = async () => {
        try {
            const fetchedReviews = await getAllPublicReviews();
            // Filter to show only approved reviews
            const approvedReviews = fetchedReviews.filter(review => review.approved);
            setReviews(approvedReviews);
        } catch (error) {
            console.error('Error fetching reviews:', error);
            alert('Failed to fetch reviews. Please try again later.');
        }
    };

    useEffect(() => {
        fetchReviews();
    }, []);

    const handleReviewSubmitted = (newReview) => {
        setReviews((prevReviews) => [...prevReviews, newReview]); // Update the reviews list with the new review
    };

    return (
        <div>
            <h1>Client Reviews</h1>
            <ReviewForm onReviewSubmitted={handleReviewSubmitted} />
            <h2>All Approved Reviews</h2>
            <ul>
                {reviews.map((review) => (
                    <li key={review.id}>
                        <strong>{review.clientName}</strong> ({review.clientDesignation}): {review.reviewContent} - {review.rating} Star{review.rating > 1 ? 's' : ''}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ReviewPage; 