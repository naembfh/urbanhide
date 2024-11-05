"use client"
import { useGetReviewsByProductIdQuery } from "@/redux/api/reviewsApi";
import React from "react";


interface ReviewListProps {
  productId: string;
}

const ReviewList: React.FC<ReviewListProps> = ({ productId }) => {
  const { data: reviewsData } = useGetReviewsByProductIdQuery(productId);

  return (
    <div>
      {reviewsData?.reviews.map((review) => (
        <div key={review._id} className="review-item">
          <div>
            <strong>{review.username}</strong> - {review.rating} ★
          </div>
          <p>{review.comment}</p>
          <small>{new Date(review.createdAt).toLocaleDateString()}</small>
        </div>
      ))}
    </div>
  );
};

export default ReviewList;
