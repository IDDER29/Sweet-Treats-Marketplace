"use server";

import { getServerApi } from "@/lib/api-client";
import type { ID, Product } from "@/types";

export async function getWishlist(): Promise<Product[]> {
  const api = await getServerApi();
  const { data } = await api.get<Product[]>("/customers/me/wishlist");
  return Array.isArray(data) ? data : [];
}

export async function addToWishlist(productId: ID): Promise<Product[]> {
  const api = await getServerApi();
  const { data } = await api.post<Product[]>("/customers/me/wishlist", {
    productId,
  });
  return Array.isArray(data) ? data : [];
}

export async function removeFromWishlist(productId: ID): Promise<Product[]> {
  const api = await getServerApi();
  const { data } = await api.delete<Product[]>(
    `/customers/me/wishlist/${productId}`
  );
  return Array.isArray(data) ? data : [];
}
