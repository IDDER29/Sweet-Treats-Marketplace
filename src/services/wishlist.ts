"use server";

// Wishlist (saved products) service.
//
// Assumed REST contract (adjust to the real backend when its spec is known):
//   GET    /customers/me/wishlist             -> Product[]
//   POST   /customers/me/wishlist             -> Product[]   body: { productId }
//   DELETE /customers/me/wishlist/:productId  -> Product[]
//
// Each mutation returns the updated wishlist so callers can refresh without a
// second round-trip. The customer is resolved server-side from the bearer
// token attached by `getServerApi()`.

import { getServerApi } from "@/lib/api-client";
import type { ID, Product } from "@/types";

export async function getWishlist(): Promise<Product[]> {
  const api = await getServerApi();
  const { data } = await api.get<Product[]>("/customers/me/wishlist");
  return data;
}

export async function addToWishlist(productId: ID): Promise<Product[]> {
  const api = await getServerApi();
  const { data } = await api.post<Product[]>("/customers/me/wishlist", {
    productId,
  });
  return data;
}

export async function removeFromWishlist(productId: ID): Promise<Product[]> {
  const api = await getServerApi();
  const { data } = await api.delete<Product[]>(
    `/customers/me/wishlist/${productId}`
  );
  return data;
}
