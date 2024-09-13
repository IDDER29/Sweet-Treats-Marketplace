// components/CustomerReviews.tsx
import React from "react";

interface Review {
  id: number;
  user: string;
  rating: number;
  comment: string;
}

interface CustomerReviewsProps {
  reviews: Review[];
}

const CustomerReviews: React.FC<CustomerReviewsProps> = ({ reviews }) => {
  const renderStars = (rating: number) => {
    return Array(rating)
      .fill(null)
      .map((_, i) => <span key={i}>⭐</span>);
  };

  return (
    <div className="customer-reviews">
      <h3 className="text-xl font-semibold mb-4">Customer Reviews</h3>
      {reviews.map((review) => (
        <div key={review.id} className="review border-b pb-4 mb-4">
          <p className="text-sm text-gray-600">{review.user}</p>
          <div className="rating text-yellow-500">
            {renderStars(review.rating)}
          </div>
          <p className="comment mt-2">{review.comment}</p>
        </div>
      ))}
    </div>
  );
};

export default CustomerReviews;
