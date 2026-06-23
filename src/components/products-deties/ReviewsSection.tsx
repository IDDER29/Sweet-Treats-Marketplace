"use client";
import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
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
import { getProductReviews, createReview } from "@/services/reviews";
import { LoadingState } from "@/components/feedback/LoadingState";

interface ProductReviewsProps {
  productId?: string;
}

const ReviewsSection: React.FC<ProductReviewsProps> = ({ productId }) => {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [newReview, setNewReview] = useState({ rating: 5, comment: "" });

  const { data: reviews = [], isLoading } = useQuery({
    queryKey: ["reviews", productId],
    queryFn: () => getProductReviews(productId as string),
    enabled: !!productId,
  });

  const mutation = useMutation({
    mutationFn: () =>
      createReview({
        productId: productId as string,
        rating: newReview.rating,
        comment: newReview.comment,
      }),
    onSuccess: () => {
      toast.success("Review submitted successfully.");
      setNewReview({ rating: 5, comment: "" });
      setOpen(false);
      queryClient.invalidateQueries({ queryKey: ["reviews", productId] });
    },
    onError: () =>
      toast.error("Could not submit your review. Please try again."),
  });

  const handleSubmitReview = () => {
    if (newReview.comment.trim().length < 10) {
      toast.error("Review comment must be at least 10 characters long.");
      return;
    }
    if (!productId) return;
    mutation.mutate();
  };

  const renderStars = (rating: number) =>
    Array(5)
      .fill(null)
      .map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${
            i < rating ? "text-yellow-400 fill-current" : "text-gray-300"
          }`}
        />
      ));

  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-4">Customer Reviews</h2>

      {isLoading ? (
        <LoadingState rows={2} />
      ) : reviews.length > 0 ? (
        <ul className="space-y-4">
          {reviews.map((review, index) => (
            <li key={review.id ?? index} className="border p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <div className="flex">{renderStars(review.rating)}</div>
                <span className="text-sm text-gray-600">
                  {review.author ?? review.name ?? "Anonymous"}
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
      <Dialog open={open} onOpenChange={setOpen}>
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
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Rating
            </label>
            <div className="flex gap-2">
              {Array(5)
                .fill(null)
                .map((_, i) => (
                  <button
                    type="button"
                    key={i}
                    className={`p-1 ${
                      newReview.rating > i ? "text-yellow-400" : "text-gray-300"
                    }`}
                    onClick={() =>
                      setNewReview((prev) => ({ ...prev, rating: i + 1 }))
                    }
                  >
                    <Star className="w-6 h-6" />
                  </button>
                ))}
            </div>

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
              disabled={!newReview.comment.trim() || mutation.isPending}
            >
              {mutation.isPending ? "Submitting…" : "Submit Review"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ReviewsSection;
