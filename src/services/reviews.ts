"use server";

// Review service.
//
// Assumed REST contract:
//   GET  /products/:productId/reviews -> Review[]
//   POST /products/:productId/reviews -> Review

import { getServerApi, publicApi } from "@/lib/api-client";
import type { Review } from "@/types";

export async function getProductReviews(productId: string): Promise<Review[]> {
  const { data } = await publicApi.get<Review[]>(
    `/products/${productId}/reviews`
  );
  return data;
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
