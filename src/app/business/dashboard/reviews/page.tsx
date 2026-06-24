"use client";

import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Star,
  MessageSquare,
  TrendingUp,
  ThumbsUp,
  Filter,
  Search,
  Reply,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { LoadingState } from "@/components/feedback/LoadingState";
import { EmptyState } from "@/components/feedback/EmptyState";
import { ErrorState } from "@/components/feedback/ErrorState";
import DashboardShell from "@/components/business/dashboard/DashboardShell";
import {
  getBusinessReviews,
  replyToBusinessReview,
  type StoreReview,
} from "@/services/reviews";
import { toast } from "react-toastify";

function StarRow({ rating, size = "sm" }: { rating: number; size?: "sm" | "md" }) {
  const sz = size === "md" ? "h-4 w-4" : "h-3.5 w-3.5";
  return (
    <div className="flex">
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={`${sz} ${
            i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-200 fill-gray-200"
          }`}
        />
      ))}
    </div>
  );
}

function RatingDistributionBar({ reviews }: { reviews: StoreReview[] }) {
  const counts = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: reviews.filter((r) => Math.round(r.rating) === star).length,
  }));
  const max = Math.max(...counts.map((c) => c.count), 1);
  const avg = reviews.length
    ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length
    : 0;

  return (
    <div className="flex gap-8 items-center">
      <div className="text-center">
        <p className="text-5xl font-bold text-amber-700">{avg.toFixed(1)}</p>
        <StarRow rating={Math.round(avg)} size="md" />
        <p className="text-xs text-muted-foreground mt-1">{reviews.length} reviews</p>
      </div>
      <div className="flex-1 space-y-1.5">
        {counts.map(({ star, count }) => (
          <div key={star} className="flex items-center gap-2 text-sm">
            <span className="w-3 text-right text-muted-foreground">{star}</span>
            <Star className="h-3 w-3 text-yellow-400 fill-yellow-400 shrink-0" />
            <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-amber-400 rounded-full"
                style={{ width: `${(count / max) * 100}%` }}
              />
            </div>
            <span className="w-5 text-muted-foreground">{count}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ReviewCard({ review }: { review: StoreReview }) {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState(review.reply ?? "");

  const mutation = useMutation({
    mutationFn: () => replyToBusinessReview(review.id, draft),
    onSuccess: () => {
      toast.success("Reply posted.");
      setOpen(false);
      queryClient.invalidateQueries({ queryKey: ["store-reviews"] });
    },
    onError: () => toast.error("Failed to post reply."),
  });

  const initials = review.author
    .split(" ")
    .map((p) => p[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-5 space-y-4">
        {/* Header row */}
        <div className="flex items-start gap-3">
          <Avatar className="h-9 w-9 shrink-0">
            <AvatarFallback className="bg-amber-100 text-amber-800 text-xs font-semibold">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <p className="font-semibold text-sm">{review.author}</p>
              <time className="text-xs text-muted-foreground">
                {new Date(review.createdAt).toLocaleDateString(undefined, {
                  year: "numeric", month: "short", day: "numeric",
                })}
              </time>
            </div>
            <StarRow rating={review.rating} />
          </div>
        </div>

        {/* Product tag */}
        <Badge variant="secondary" className="text-xs">
          {review.productName}
        </Badge>

        {/* Review text */}
        <p className="text-sm text-gray-700 leading-relaxed">{review.comment}</p>

        {/* Existing reply */}
        {review.reply && (
          <div className="rounded-lg bg-amber-50 border border-amber-100 p-3 space-y-1">
            <p className="text-xs font-semibold text-amber-800 flex items-center gap-1">
              <Reply className="h-3.5 w-3.5" /> Your reply
            </p>
            <p className="text-sm text-amber-900">{review.reply}</p>
          </div>
        )}

        {/* Reply toggle */}
        <div>
          <Button
            variant="ghost"
            size="sm"
            className="text-amber-700 hover:text-amber-800 hover:bg-amber-50 px-0 gap-1.5"
            onClick={() => setOpen((v) => !v)}
          >
            <Reply className="h-4 w-4" />
            {review.reply ? "Edit reply" : "Reply to review"}
            {open ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
          </Button>

          {open && (
            <div className="mt-2 space-y-2">
              <Textarea
                rows={3}
                placeholder="Thank the customer, address concerns, or share more details…"
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                className="text-sm resize-none"
              />
              <div className="flex gap-2">
                <Button
                  size="sm"
                  className="bg-amber-600 hover:bg-amber-700 text-white"
                  disabled={mutation.isPending || draft.trim().length === 0}
                  onClick={() => mutation.mutate()}
                >
                  {mutation.isPending ? "Posting…" : "Post reply"}
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => { setOpen(false); setDraft(review.reply ?? ""); }}
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default function ReviewsDashboardPage() {
  const [search, setSearch] = useState("");
  const [ratingFilter, setRatingFilter] = useState<string>("all");
  const [replyFilter, setReplyFilter] = useState<string>("all");

  const { data: reviews = [], isLoading, isError, refetch } = useQuery<StoreReview[]>({
    queryKey: ["store-reviews"],
    queryFn: getBusinessReviews,
  });

  const filtered = reviews.filter((r) => {
    const matchesSearch =
      r.author.toLowerCase().includes(search.toLowerCase()) ||
      r.comment.toLowerCase().includes(search.toLowerCase()) ||
      r.productName.toLowerCase().includes(search.toLowerCase());
    const matchesRating =
      ratingFilter === "all" || Math.round(r.rating) === Number(ratingFilter);
    const matchesReply =
      replyFilter === "all" ||
      (replyFilter === "replied" && r.reply) ||
      (replyFilter === "pending" && !r.reply);
    return matchesSearch && matchesRating && matchesReply;
  });

  const pendingCount = reviews.filter((r) => !r.reply).length;
  const avgRating = reviews.length
    ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length
    : 0;

  return (
    <DashboardShell title="Reviews">
      {/* Summary cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total reviews", value: reviews.length, icon: MessageSquare, color: "border-l-amber-400" },
          { label: "Average rating", value: avgRating.toFixed(1), icon: Star, color: "border-l-yellow-400" },
          { label: "Awaiting reply", value: pendingCount, icon: Reply, color: "border-l-blue-400" },
          {
            label: "5-star reviews",
            value: reviews.filter((r) => Math.round(r.rating) === 5).length,
            icon: ThumbsUp,
            color: "border-l-green-400",
          },
        ].map(({ label, value, icon: Icon, color }) => (
          <Card key={label} className={`border-l-4 ${color}`}>
            <CardContent className="p-4 flex items-center gap-3">
              <div className="rounded-lg bg-gray-100 p-2">
                <Icon className="h-4 w-4 text-gray-600" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">{label}</p>
                <p className="text-xl font-bold">{value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Rating breakdown */}
      {reviews.length > 0 && (
        <Card className="mb-6">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-amber-600" />
              Rating breakdown
            </CardTitle>
          </CardHeader>
          <CardContent>
            <RatingDistributionBar reviews={reviews} />
          </CardContent>
        </Card>
      )}

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search reviews, products, customers…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={ratingFilter} onValueChange={setRatingFilter}>
          <SelectTrigger className="w-40">
            <Filter className="h-4 w-4 mr-2 text-muted-foreground" />
            <SelectValue placeholder="Rating" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All ratings</SelectItem>
            {[5, 4, 3, 2, 1].map((s) => (
              <SelectItem key={s} value={String(s)}>
                {s} star{s !== 1 ? "s" : ""}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={replyFilter} onValueChange={setReplyFilter}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Reply status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="pending">Needs reply</SelectItem>
            <SelectItem value="replied">Replied</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Review list */}
      {isLoading ? (
        <LoadingState rows={4} />
      ) : isError ? (
        <ErrorState onRetry={refetch} />
      ) : filtered.length === 0 ? (
        <EmptyState
          icon={<MessageSquare className="h-10 w-10" />}
          title="No reviews yet"
          message={
            reviews.length === 0
              ? "Once customers leave reviews on your products they will appear here. Deliver great treats and the reviews will follow!"
              : "No reviews match your current filters."
          }
        />
      ) : (
        <div className="space-y-4">
          {pendingCount > 0 && (
            <p className="text-sm text-blue-700 bg-blue-50 border border-blue-100 rounded-lg px-4 py-2">
              You have <strong>{pendingCount}</strong> review{pendingCount !== 1 ? "s" : ""} waiting for a reply.
              Responding within 24 hours builds customer trust.
            </p>
          )}
          {filtered.map((r) => (
            <ReviewCard key={r.id} review={r} />
          ))}
        </div>
      )}
    </DashboardShell>
  );
}
