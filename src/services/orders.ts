"use server";

// Order service.
//
// Assumed REST contract (adjust to the real backend when its spec is known):
//   POST /orders        -> Order        (create from cart + shipping/payment)
//   GET  /orders/mine   -> Order[]      (current customer's orders)
//   GET  /orders/:id    -> Order        (single order, used by tracking)

import { getServerApi } from "@/lib/api-client";
import type { Address, Order, OrderItem } from "@/types";

export interface CreateOrderInput {
  items: OrderItem[];
  shippingAddress?: Address;
  paymentMethod?: string;
  storeId?: string;
}

export async function createOrder(input: CreateOrderInput): Promise<Order> {
  const api = await getServerApi();
  const { data } = await api.post<Order>("/orders", input);
  return data;
}

export async function getMyOrders(): Promise<Order[]> {
  const api = await getServerApi();
  const { data } = await api.get<Order[]>("/orders/mine");
  return data;
}

export async function getOrderById(id: string): Promise<Order> {
  const api = await getServerApi();
  const { data } = await api.get<Order>(`/orders/${id}`);
  return data;
}
