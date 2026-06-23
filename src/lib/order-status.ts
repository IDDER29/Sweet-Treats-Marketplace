// Presentation helpers for order/delivery status values.
//
// Keeps the mapping from status -> Badge variant + human label in one place
// so the dashboard, orders, sales, and delivery views stay consistent.

import type { OrderStatus, DeliveryStatus } from "@/types";

export type BadgeVariant =
  | "default"
  | "secondary"
  | "destructive"
  | "success"
  | "outline";

const ORDER_STATUS_VARIANT: Record<OrderStatus, BadgeVariant> = {
  pending: "secondary",
  confirmed: "default",
  preparing: "default",
  out_for_delivery: "default",
  delivered: "success",
  cancelled: "destructive",
};

const ORDER_STATUS_LABEL: Record<OrderStatus, string> = {
  pending: "Pending",
  confirmed: "Confirmed",
  preparing: "Preparing",
  out_for_delivery: "Out for delivery",
  delivered: "Delivered",
  cancelled: "Cancelled",
};

export function orderStatusVariant(status: string): BadgeVariant {
  return ORDER_STATUS_VARIANT[status as OrderStatus] ?? "default";
}

export function orderStatusLabel(status: string): string {
  return ORDER_STATUS_LABEL[status as OrderStatus] ?? status;
}

const DELIVERY_STATUS_VARIANT: Record<DeliveryStatus, BadgeVariant> = {
  assigned: "secondary",
  in_transit: "default",
  delivered: "success",
  cancelled: "destructive",
};

const DELIVERY_STATUS_LABEL: Record<DeliveryStatus, string> = {
  assigned: "Assigned",
  in_transit: "In transit",
  delivered: "Delivered",
  cancelled: "Cancelled",
};

export function deliveryStatusVariant(status: string): BadgeVariant {
  return DELIVERY_STATUS_VARIANT[status as DeliveryStatus] ?? "default";
}

export function deliveryStatusLabel(status: string): string {
  return DELIVERY_STATUS_LABEL[status as DeliveryStatus] ?? status;
}
