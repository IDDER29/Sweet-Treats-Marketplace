import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Star } from "lucide-react";
import { toast } from "react-toastify";

interface Review {
  rating: number;
  comment: string;
}

interface ProductReview {
  name: string;
  rating: number;
  comment: string;
}

interface ProductReviewsProps {
  productReviewsData: ProductReview[];
}

const ReviewsSection: React.FC<ProductReviewsProps> = ({
  productReviewsData,
}) => {
  const [newReview, setNewReview] = useState<Review>({
    rating: 5,
    comment: "",
  });

  const handleRatingClick = (rating: number) => {
    console.log(rating);
    setNewReview((prev) => ({ ...prev, rating }));
  };

  const handleSubmitReview = () => {
    console.log("adfsdf");
    if (newReview.comment.trim().length < 10) {
      toast.error("Review comment must be at least 10 characters long.");
      return;
    }

    console.log("Submitted review:", newReview);
    // Implement the actual review submission logic here
    setNewReview({ rating: 5, comment: "" });
    toast.success("Review submitted successfully.");
  };

  const renderStars = (rating: number) => {
    return Array(5)
      .fill(null)
      .map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${
            i < rating ? "text-yellow-400 fill-current" : "text-gray-300"
          }`}
        />
      ));
  };

  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-4">Customer Reviews</h2>

      {productReviewsData.length > 0 ? (
        <ul className="space-y-4">
          {productReviewsData.map((review, index) => (
            <li key={index} className="border p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <div className="flex">{renderStars(review.rating)}</div>
                <span className="text-sm text-gray-600">
                  {review.rating} stars
                </span>
              </div>
              <p className="text-sm text-gray-700">{review.comment}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No reviews yet. Be the first to write one!</p>
      )}

      {/* Submit Review Dialog */}
      <Dialog>
        <DialogTrigger asChild>
          <Button className="mt-4">Write a Review</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Write a Review</DialogTitle>
            <DialogDescription>
              Share your experience with this product.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4">
            {/* Rating Input */}
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Rating
            </label>
            <div className="flex gap-2">
              {Array(5)
                .fill(null)
                .map((_, i) => (
                  <button
                    key={i}
                    className={`p-1 ${
                      newReview.rating > i ? "text-yellow-400" : "text-gray-300"
                    }`}
                    onClick={() => handleRatingClick(i + 1)}
                  >
                    <Star className="w-6 h-6" />
                  </button>
                ))}
            </div>

            {/* Comment Input */}
            <label className="block text-sm font-medium text-gray-700 mt-4">
              Comment
            </label>
            <Textarea
              value={newReview.comment}
              onChange={(e) =>
                setNewReview((prev) => ({ ...prev, comment: e.target.value }))
              }
              placeholder="Write your review here"
              className="mt-2"
            />

            <Button
              onClick={handleSubmitReview}
              className="mt-4"
              disabled={!newReview.comment.trim()}
            >
              Submit Review
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ReviewsSection;
