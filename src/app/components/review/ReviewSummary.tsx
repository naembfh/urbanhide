"use client"
import { useGetReviewsByProductIdQuery } from "@/redux/api/reviewsApi";
import React from "react";


interface ReviewSummaryProps {
  productId: string;
}

const ReviewSummary: React.FC<ReviewSummaryProps> = ({ productId }) => {
  const { data: reviewsData } = useGetReviewsByProductIdQuery(productId);

  const averageRating = reviewsData?.averageRating || 0;
  const totalReviews = reviewsData?.totalReviews || 0;

  return (
    <div>
      <h2>Customer Reviews</h2>
      <div>{averageRating} ★ based on {totalReviews} reviews</div>
      {/* Add rating breakdown and popular topics if needed */}
    </div>
  );
};

export default ReviewSummary;
