"use client";

import { useMemo, useState, type ChangeEvent } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Star } from "lucide-react";
import { toast } from "react-toastify";

import { getMyOrders } from "@/services/orders";
import { createReview } from "@/services/reviews";
import type { ID, Order, Review } from "@/types";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { LoadingState } from "@/components/feedback/LoadingState";
import { ErrorState } from "@/components/feedback/ErrorState";
import { EmptyState } from "@/components/feedback/EmptyState";

/** A product the customer received and can therefore review. */
interface ReviewableProduct {
  productId: ID;
  name: string;
  image?: string;
  /** ISO date of the most recent delivered order containing this product. */
  purchasedAt?: string;
}

const MIN_COMMENT_LENGTH = 10;

function formatDate(value?: string): string | undefined {
  if (!value) return undefined;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

/**
 * Reduce the customer's delivered orders to a deduplicated list of products
 * they can review (most recent purchase date wins per product).
 */
function deriveReviewableProducts(orders: Order[]): ReviewableProduct[] {
  const byProduct = new Map<ID, ReviewableProduct>();

  for (const order of orders) {
    if (order.status !== "delivered") continue;
    for (const item of order.items) {
      const existing = byProduct.get(item.productId);
      if (
        !existing ||
        (order.createdAt &&
          existing.purchasedAt &&
          order.createdAt > existing.purchasedAt)
      ) {
        byProduct.set(item.productId, {
          productId: item.productId,
          name: item.name,
          image: item.image,
          purchasedAt: order.createdAt,
        });
      }
    }
  }

  return Array.from(byProduct.values());
}

export default function ReviewAndFeedbackPage() {
  const {
    data: orders,
    isLoading,
    isError,
    refetch,
  } = useQuery<Order[]>({
    queryKey: ["orders", "mine"],
    queryFn: getMyOrders,
  });

  const reviewable = useMemo<ReviewableProduct[]>(
    () => (orders ? deriveReviewableProducts(orders) : []),
    [orders]
  );

  const [selectedProduct, setSelectedProduct] =
    useState<ReviewableProduct | null>(null);
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>("");

  const mutation = useMutation<
    Review,
    Error,
    { productId: ID; rating: number; comment: string }
  >({
    mutationFn: (input) => createReview(input),
    onSuccess: () => {
      toast.success("Thanks! Your review has been submitted.");
      closeDialog();
    },
    onError: () => {
      toast.error("Couldn't submit your review. Please try again.");
    },
  });

  const openDialog = (product: ReviewableProduct) => {
    setSelectedProduct(product);
    setRating(0);
    setComment("");
  };

  const closeDialog = () => {
    setSelectedProduct(null);
    setRating(0);
    setComment("");
  };

  const handleSubmitReview = () => {
    if (!selectedProduct) return;
    if (rating < 1) {
      toast.error("Please select a star rating.");
      return;
    }
    if (comment.trim().length < MIN_COMMENT_LENGTH) {
      toast.error(
        `Review comment must be at least ${MIN_COMMENT_LENGTH} characters long.`
      );
      return;
    }
    mutation.mutate({
      productId: selectedProduct.productId,
      rating,
      comment: comment.trim(),
    });
  };

  const handleCommentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-6">
        <h1 className="text-3xl font-bold">Review and Feedback</h1>
        <p className="mt-1 text-muted-foreground">
          Share your thoughts on the treats you&apos;ve received.
        </p>
      </header>

      {isLoading && <LoadingState rows={4} />}

      {isError && (
        <ErrorState
          title="Couldn't load your purchases"
          onRetry={() => {
            void refetch();
          }}
        />
      )}

      {!isLoading && !isError && reviewable.length === 0 && (
        <EmptyState
          title="Nothing to review yet"
          message="Once an order is delivered, the products in it will appear here for you to review."
          actionLabel="Browse products"
          actionHref="/products"
        />
      )}

      {!isLoading && !isError && reviewable.length > 0 && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {reviewable.map((product) => {
            const purchasedOn = formatDate(product.purchasedAt);
            return (
              <Card key={product.productId} className="flex flex-col">
                <CardHeader>
                  <CardTitle className="text-lg">{product.name}</CardTitle>
                  {purchasedOn && (
                    <CardDescription>
                      Purchased on {purchasedOn}
                    </CardDescription>
                  )}
                </CardHeader>
                <CardContent className="flex-1">
                  {product.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={product.image}
                      alt={product.name}
                      className="mb-4 h-48 w-full rounded-md object-cover"
                    />
                  ) : (
                    <div className="mb-4 flex h-48 w-full items-center justify-center rounded-md bg-muted text-muted-foreground">
                      No image
                    </div>
                  )}
                </CardContent>
                <CardFooter>
                  <Button onClick={() => openDialog(product)}>
                    Write a Review
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      )}

      <Dialog
        open={selectedProduct !== null}
        onOpenChange={(open) => {
          if (!open) closeDialog();
        }}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Review {selectedProduct?.name}</DialogTitle>
            <DialogDescription>
              Share your thoughts about this product.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div
              className="flex items-center space-x-2"
              role="radiogroup"
              aria-label="Star rating"
            >
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  aria-label={`${star} star${star > 1 ? "s" : ""}`}
                  aria-pressed={star <= rating}
                  onClick={() => setRating(star)}
                >
                  <Star
                    className={`h-6 w-6 cursor-pointer ${
                      star <= rating
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                </button>
              ))}
            </div>
            <Textarea
              placeholder="Write your review here..."
              value={comment}
              onChange={handleCommentChange}
            />
          </div>
          <DialogFooter>
            <Button
              onClick={handleSubmitReview}
              disabled={mutation.isPending}
            >
              {mutation.isPending ? "Submitting…" : "Submit Review"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
