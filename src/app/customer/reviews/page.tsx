"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Star,
  StarOff,
  PenLine,
  Trash2,
  Clock,
  CheckCircle2,
  MessageSquarePlus,
} from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { LoadingState } from "@/components/feedback/LoadingState";
import { ErrorState } from "@/components/feedback/ErrorState";
import { EmptyState } from "@/components/feedback/EmptyState";
import {
  getMyReviews,
  updateMyReview,
  deleteMyReview,
  type MyReview,
} from "@/services/reviews";

// ─── Types ────────────────────────────────────────────────────────────────────

type FilterTab = "all" | "published" | "pending";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function StarRating({
  rating,
  interactive = false,
  onRate,
}: {
  rating: number;
  interactive?: boolean;
  onRate?: (r: number) => void;
}) {
  const [hovered, setHovered] = useState(0);
  const display = interactive && hovered ? hovered : rating;

  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => {
        const filled = star <= display;
        const Icon = filled ? Star : StarOff;
        return (
          <button
            key={star}
            type="button"
            disabled={!interactive}
            className={`transition-transform ${
              interactive ? "cursor-pointer hover:scale-110" : "cursor-default"
            }`}
            onMouseEnter={() => interactive && setHovered(star)}
            onMouseLeave={() => interactive && setHovered(0)}
            onClick={() => interactive && onRate?.(star)}
          >
            <Icon
              className={`h-4 w-4 ${
                filled ? "fill-amber-400 text-amber-400" : "text-gray-300"
              }`}
            />
          </button>
        );
      })}
    </div>
  );
}

function StatusBadge({ status }: { status: "published" | "pending" }) {
  if (status === "published") {
    return (
      <Badge className="bg-green-100 text-green-800 border-green-200 hover:bg-green-100 gap-1">
        <CheckCircle2 className="h-3 w-3" />
        Published
      </Badge>
    );
  }
  return (
    <Badge className="bg-amber-100 text-amber-800 border-amber-200 hover:bg-amber-100 gap-1">
      <Clock className="h-3 w-3" />
      Pending Approval
    </Badge>
  );
}

function ReviewCard({ review }: { review: MyReview }) {
  const queryClient = useQueryClient();
  const [editing, setEditing] = useState(false);
  const [editText, setEditText] = useState(review.text);
  const [editRating, setEditRating] = useState(review.rating);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const editMutation = useMutation({
    mutationFn: () => updateMyReview(review.id, editRating, editText.trim()),
    onSuccess: () => {
      toast.success("Review updated.");
      setEditing(false);
      queryClient.invalidateQueries({ queryKey: ["my-reviews"] });
    },
    onError: () => toast.error("Failed to update review."),
  });

  const deleteMutation = useMutation({
    mutationFn: () => deleteMyReview(review.id),
    onSuccess: () => {
      toast.success("Review deleted.");
      setConfirmDelete(false);
      queryClient.invalidateQueries({ queryKey: ["my-reviews"] });
    },
    onError: () => toast.error("Failed to delete review."),
  });

  function handleSave() {
    if (editText.trim().length < 10) {
      toast.error("Review must be at least 10 characters.");
      return;
    }
    editMutation.mutate();
  }

  function handleCancelEdit() {
    setEditText(review.text);
    setEditRating(review.rating);
    setEditing(false);
  }

  return (
    <>
      <Card className="overflow-hidden hover:shadow-md transition-shadow">
        <CardContent className="p-0">
          <div className="flex gap-4 p-4 sm:p-5">
            <div className="h-16 w-16 sm:h-20 sm:w-20 shrink-0 rounded-xl bg-gradient-to-br from-amber-200 to-orange-300 flex items-center justify-center">
              <Star className="h-7 w-7 text-amber-700 fill-amber-500" />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                <div>
                  <Link
                    href={`/product/${review.productId}`}
                    className="text-sm font-semibold text-gray-900 hover:text-amber-700 transition-colors leading-tight"
                  >
                    {review.productName}
                  </Link>
                  <div className="flex items-center gap-2 mt-1">
                    <StarRating rating={review.rating} />
                    <span className="text-xs text-muted-foreground">
                      {review.dateSubmitted}
                    </span>
                  </div>
                </div>
                <StatusBadge status={review.status} />
              </div>

              {editing ? (
                <div className="space-y-3 mt-2">
                  <div>
                    <p className="text-xs font-medium text-gray-600 mb-1">Your rating</p>
                    <StarRating
                      rating={editRating}
                      interactive
                      onRate={setEditRating}
                    />
                  </div>
                  <Textarea
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    rows={3}
                    className="text-sm resize-none border-amber-200 focus-visible:ring-amber-400"
                    placeholder="Share your experience..."
                  />
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      className="bg-amber-600 hover:bg-amber-700 text-white"
                      onClick={handleSave}
                      disabled={editMutation.isPending}
                    >
                      {editMutation.isPending ? "Saving…" : "Save changes"}
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-muted-foreground hover:text-gray-700"
                      onClick={handleCancelEdit}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  <p className="text-sm text-gray-600 leading-relaxed mt-1 line-clamp-3">
                    {review.text}
                  </p>
                  <div className="flex items-center gap-1 mt-3">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-7 px-2 text-xs text-muted-foreground hover:text-amber-700 hover:bg-amber-50 gap-1"
                      onClick={() => setEditing(true)}
                    >
                      <PenLine className="h-3.5 w-3.5" />
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-7 px-2 text-xs text-muted-foreground hover:text-red-600 hover:bg-red-50 gap-1"
                      onClick={() => setConfirmDelete(true)}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      Delete
                    </Button>
                  </div>
                </>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Dialog open={confirmDelete} onOpenChange={setConfirmDelete}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Delete this review?</DialogTitle>
            <DialogDescription>
              Your review of{" "}
              <span className="font-semibold text-gray-800">{review.productName}</span>{" "}
              will be permanently removed. This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              variant="outline"
              onClick={() => setConfirmDelete(false)}
            >
              Keep review
            </Button>
            <Button
              className="bg-red-600 hover:bg-red-700 text-white"
              onClick={() => deleteMutation.mutate()}
              disabled={deleteMutation.isPending}
            >
              {deleteMutation.isPending ? "Deleting…" : "Yes, delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

const EMPTY_MESSAGES: Record<FilterTab, { title: string; message: string }> = {
  all: {
    title: "No reviews yet",
    message:
      "You haven't reviewed any products yet. Order a treat and share your experience!",
  },
  published: {
    title: "No published reviews yet",
    message:
      "Reviews you've submitted will appear here once approved by the bakery.",
  },
  pending: {
    title: "No pending reviews",
    message: "All your reviews have been approved and are live.",
  },
};

export default function MyReviewsPage() {
  const [activeTab, setActiveTab] = useState<FilterTab>("all");

  const { data: reviews = [], isLoading, isError, refetch } = useQuery<MyReview[]>({
    queryKey: ["my-reviews"],
    queryFn: getMyReviews,
  });

  const publishedCount = reviews.filter((r) => r.status === "published").length;
  const pendingCount = reviews.filter((r) => r.status === "pending").length;

  const TABS: { key: FilterTab; label: string; count: number }[] = [
    { key: "all", label: "All", count: reviews.length },
    { key: "published", label: "Published", count: publishedCount },
    { key: "pending", label: "Pending approval", count: pendingCount },
  ];

  const filtered =
    activeTab === "all"
      ? reviews
      : reviews.filter((r) => r.status === activeTab);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-2xl px-4 py-8">
        <header className="mb-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">My Reviews</h1>
              <p className="text-sm text-muted-foreground mt-0.5">
                Reviews you&apos;ve submitted for products you&apos;ve ordered.
              </p>
            </div>
            <Button
              asChild
              className="shrink-0 bg-amber-600 hover:bg-amber-700 text-white gap-2"
              size="sm"
            >
              <Link href="/review-and-feedback">
                <MessageSquarePlus className="h-4 w-4" />
                Leave a review
              </Link>
            </Button>
          </div>
        </header>

        {isLoading ? (
          <LoadingState rows={3} />
        ) : isError ? (
          <ErrorState onRetry={refetch} />
        ) : (
          <>
            <div className="mb-5 flex gap-2 overflow-x-auto pb-1">
              {TABS.map(({ key, label, count }) => {
                const isActive = activeTab === key;
                return (
                  <Button
                    key={key}
                    size="sm"
                    variant={isActive ? "default" : "outline"}
                    onClick={() => setActiveTab(key)}
                    className={
                      isActive
                        ? "bg-amber-600 hover:bg-amber-700 text-white shrink-0"
                        : "shrink-0 border-gray-200 text-gray-600 hover:border-amber-300 hover:text-amber-700"
                    }
                  >
                    {label}
                    <span
                      className={`ml-1.5 rounded-full text-xs px-1.5 py-0.5 font-semibold ${
                        isActive
                          ? "bg-white/20 text-white"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {count}
                    </span>
                  </Button>
                );
              })}
            </div>

            {filtered.length === 0 ? (
              <div className="py-4">
                <EmptyState
                  icon={<Star className="h-10 w-10" />}
                  title={EMPTY_MESSAGES[activeTab].title}
                  message={EMPTY_MESSAGES[activeTab].message}
                  actionLabel="Browse products to order"
                  actionHref="/products"
                />
              </div>
            ) : (
              <div className="space-y-4">
                {filtered.map((review) => (
                  <ReviewCard key={review.id} review={review} />
                ))}
              </div>
            )}

            {filtered.length > 0 && (
              <div className="mt-8 rounded-xl border border-amber-200 bg-amber-50 p-5 text-center">
                <p className="text-sm font-semibold text-amber-900 mb-1">
                  Ordered something new recently?
                </p>
                <p className="text-xs text-amber-700 mb-3">
                  Share your experience and help other sweet-lovers decide.
                </p>
                <Button
                  asChild
                  size="sm"
                  className="bg-amber-600 hover:bg-amber-700 text-white gap-2"
                >
                  <Link href="/review-and-feedback">
                    <MessageSquarePlus className="h-4 w-4" />
                    Write a review
                  </Link>
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
