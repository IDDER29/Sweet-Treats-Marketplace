"use server";

// Customer profile service.
//
// Assumed REST contract (adjust to the real backend when its spec is known):
//   GET /customers/me -> Customer   (the authenticated customer's profile)
//   PUT /customers/me -> Customer   (update name, phone, addresses)
//
// The customer is resolved server-side from the bearer token attached by
// `getServerApi()`, so no id is passed in the path.

import { getServerApi } from "@/lib/api-client";
import type { Address, Customer } from "@/types";

export async function getMyProfile(): Promise<Customer> {
  const api = await getServerApi();
  const { data } = await api.get<Customer>("/customers/me");
  return data;
}

export interface UpdateProfileInput {
  name?: string;
  phone?: string;
  addresses?: Address[];
}

export async function updateMyProfile(
  input: UpdateProfileInput
): Promise<Customer> {
  const api = await getServerApi();
  const { data } = await api.put<Customer>("/customers/me", input);
  return data;
}
