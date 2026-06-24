"use server";

// Store service.
//
// Assumed REST contract (adjust to the real backend when its spec is known):
//   GET /stores       -> Store[]
//   GET /stores/:id    -> Store
//   GET /stores/:id/products -> Product[]  (products belonging to a store)

import { getServerApi, publicApi } from "@/lib/api-client";
import type { Product, Store } from "@/types";

export async function getStores(): Promise<Store[]> {
  // Assumed contract: GET /stores -> Store[] (public listing)
  const { data } = await publicApi.get<Store[]>("/stores");
  return Array.isArray(data) ? data : [];
}

export async function getStoreById(id: string): Promise<Store | null> {
  // Assumed contract: GET /stores/:id -> Store
  const { data } = await publicApi.get<Store | null>(`/stores/${id}`);
  return data ?? null;
}

export async function getStoreProducts(storeId: string): Promise<Product[]> {
  // Assumed contract: GET /stores/:id/products -> Product[]
  const { data } = await publicApi.get<Product[]>(
    `/stores/${storeId}/products`
  );
  return Array.isArray(data) ? data : [];
}

/**
 * The store managed by the currently-authenticated seller. Used by the
 * seller-facing /business/store page.
 *
 * Assumed contract: GET /business/store -> Store
 */
export async function getMyStore(): Promise<Store | null> {
  const api = await getServerApi();
  const { data } = await api.get<Store | null>("/business/store");
  return data ?? null;
}

/**
 * Products for the seller's own store. Falls back to the generic
 * store-products endpoint when a store id is known.
 *
 * Assumed contract: GET /business/store/products -> Product[]
 */
export async function getMyStoreProducts(): Promise<Product[]> {
  const api = await getServerApi();
  const { data } = await api.get<Product[]>("/business/store/products");
  return Array.isArray(data) ? data : [];
}
