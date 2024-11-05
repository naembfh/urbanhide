"use client";

import React, { useEffect, useState } from "react";
import { useUser } from "@/context/user.provider"; // Ensure you have the useUser hook available
import { addReview, getReviewsByProductId } from "@/services/Review";

interface ProductReviewsProps {
  productId: string;
}

const Review: React.FC<ProductReviewsProps> = ({ productId }) => {
  const { user } = useUser(); // Access user data from context
  const [reviewsData, setReviewsData] = useState<any[]>([]); // State for fetched reviews data
  const [loading, setLoading] = useState(true); // State to manage loading

  // Form states
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);

  // Fetch reviews on component mount
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const { data } = await getReviewsByProductId(productId); // Expecting { data: Array } format
        setReviewsData(data); // Use the `data` field directly
      } catch (error) {
        console.error("Error fetching reviews:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [productId]);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;
    try {
      await addReview({ productId, userId: user?.id, comment, rating });
      // Refresh the reviews after adding a new review
      const { data } = await getReviewsByProductId(productId);
      setReviewsData(data);
      setComment("");
      setRating(5);
    } catch (error) {
      console.error("Error adding review:", error);
    }
  };

  if (loading) return <p>Loading reviews...</p>;

  return (
    <div className="product-reviews p-4 border border-gray-200 rounded-lg">
      {/* Review Summary Section */}
      <div className="review-summary mb-4">
        <h2 className="text-2xl font-bold">Customer Reviews</h2>
        <div className="rating-breakdown mt-4 space-y-1">
          {[5, 4, 3, 2, 1].map((star) => (
            <div key={star} className="flex items-center space-x-2">
              <span className="w-6">{star} ★</span>
              <div className="flex-1 bg-gray-200 h-2 rounded">
                <div
                  className="bg-yellow-500 h-2 rounded"
                  style={{
                    width: `${(reviewsData.filter((review) => review.rating === star).length / reviewsData.length) * 100}%`,
                  }}
                />
              </div>
              <span>{reviewsData.filter((review) => review.rating === star).length}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Review List Section */}
      <div className="review-list space-y-4 mb-4">
        {reviewsData.map((review) => (
          <div key={review._id} className="review-item p-3  rounded-lg shadow-sm">
            <div className="review-header flex justify-between items-center">
              <strong>{review.username || "Anonymous"}</strong>
              <span className="review-rating text-yellow-500">{review.rating} ★</span>
            </div>
            <p className="review-comment mt-1 text-gray-700">{review.comment}</p>
            <small className="review-date text-gray-500">
              {new Date(review.createdAt).toLocaleDateString()}
            </small>
          </div>
        ))}
      </div>

      {/* Review Form Section */}
      {user ? (
        <form className="review-form mt-4 p-4 border border-gray-200 rounded-lg" onSubmit={handleSubmit}>
          <h3 className="text-lg font-semibold">Write a Review</h3>
          <textarea
            className="w-full p-2 mt-2 border border-gray-300 rounded resize-none"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Share your thoughts..."
            required
          />
          <label className="block mt-2">
            <span className="text-sm font-medium">Rating:</span>
            <select
              className="ml-2 p-1 border border-gray-300 rounded"
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
            >
              {[1, 2, 3, 4, 5].map((star) => (
                <option key={star} value={star}>
                  {star} Star{star > 1 && "s"}
                </option>
              ))}
            </select>
          </label>
          <button
            type="submit"
            className="mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Submit Review
          </button>
        </form>
      ) : (
        <p className="mt-4 text-blue-500">Please log in to write a review.</p>
      )}
    </div>
  );
};

export default Review;
