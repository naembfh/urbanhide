"use client"
import { useAddReviewMutation } from "@/redux/api/reviewsApi";
import React, { useState } from "react";


interface ReviewFormProps {
  productId: string;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ productId }) => {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);
  const [addReview] = useAddReviewMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addReview({ productId, comment, rating });
    setComment("");
    setRating(5);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Write a Review</h3>
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Share your thoughts..."
      />
      <select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
        {[1, 2, 3, 4, 5].map((star) => (
          <option key={star} value={star}>
            {star} Star{star > 1 && "s"}
          </option>
        ))}
      </select>
      <button type="submit">Submit Review</button>
    </form>
  );
};

export default ReviewForm;
