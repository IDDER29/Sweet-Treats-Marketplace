"use server";

// Review service.
//
// Assumed REST contract:
//   GET    /products/:productId/reviews      -> Review[]
//   POST   /products/:productId/reviews      -> Review
//   GET    /customers/me/reviews             -> MyReview[]  (authenticated)
//   PATCH  /customers/me/reviews/:id         -> MyReview
//   DELETE /customers/me/reviews/:id         -> void
//   GET    /business/reviews                 -> StoreReview[]
//   POST   /business/reviews/:id/reply       -> void

import { getServerApi, publicApi } from "@/lib/api-client";
import type { Review } from "@/types";

export async function getProductReviews(productId: string): Promise<Review[]> {
  const { data } = await publicApi.get<Review[]>(
    `/products/${productId}/reviews`
  );
  return Array.isArray(data) ? data : [];
}

export interface CreateReviewInput {
  productId: string;
  rating: number;
  comment: string;
}

export async function createReview(input: CreateReviewInput): Promise<Review> {
  const api = await getServerApi();
  const { data } = await api.post<Review>(
    `/products/${input.productId}/reviews`,
    { rating: input.rating, comment: input.comment }
  );
  return data;
}

// ── Customer: my reviews ─────────────────────────────────────────────────────

export interface MyReview {
  id: string;
  productId: string;
  productName: string;
  rating: number;
  text: string;
  dateSubmitted: string;
  status: "published" | "pending";
}

export async function getMyReviews(): Promise<MyReview[]> {
  const api = await getServerApi();
  const { data } = await api.get<MyReview[]>("/customers/me/reviews");
  return Array.isArray(data) ? data : [];
}

export async function updateMyReview(
  id: string,
  rating: number,
  text: string
): Promise<MyReview> {
  const api = await getServerApi();
  const { data } = await api.patch<MyReview>(`/customers/me/reviews/${id}`, {
    rating,
    comment: text,
  });
  return data;
}

export async function deleteMyReview(id: string): Promise<void> {
  const api = await getServerApi();
  await api.delete(`/customers/me/reviews/${id}`);
}

// ── Business: store reviews ───────────────────────────────────────────────────

export interface StoreReview {
  id: string;
  productId: string;
  productName: string;
  productImage?: string;
  author: string;
  rating: number;
  comment: string;
  createdAt: string;
  reply?: string;
  repliedAt?: string;
}

export async function getBusinessReviews(): Promise<StoreReview[]> {
  const api = await getServerApi();
  const { data } = await api.get<StoreReview[]>("/business/reviews");
  return Array.isArray(data) ? data : [];
}

export async function replyToBusinessReview(
  reviewId: string,
  reply: string
): Promise<void> {
  const api = await getServerApi();
  await api.post(`/business/reviews/${reviewId}/reply`, { reply });
}
