"use server";

// Analytics & seller-order service.
//
// Assumed REST contract (adjust to the real backend when its spec is known):
//   GET /analytics/summary  -> DashboardSummary  (headline dashboard metrics)
//   GET /analytics/sales    -> SalesSummary      (sales overview + trend series)
//   GET /analytics/delivery -> DeliverySummary   (delivery overview + active list)
//   GET /orders/store       -> Order[]           (orders for the seller's store)
//
// Every function returns a typed, defensively-defaulted shape so the UI can
// render honest empty/zero states instead of fake numbers when the backend
// has no data yet.

import { getServerApi } from "@/lib/api-client";
import type { Order, DeliveryStatus } from "@/types";

/* ------------------------------------------------------------------ */
/* Dashboard summary                                                   */
/* ------------------------------------------------------------------ */

export interface DashboardMetric {
  /** Absolute value to display (already a number; format on render). */
  value: number;
  /** Optional period-over-period delta as a percentage, e.g. 20.1. */
  changePercent?: number;
  /** Optional human label for the change, e.g. "+12 new this month". */
  changeLabel?: string;
}

export interface SalesTrendPoint {
  /** ISO date or short label for the X axis. */
  date: string;
  revenue: number;
  orders: number;
}

export interface DashboardSummary {
  totalRevenue: DashboardMetric;
  totalOrders: DashboardMetric;
  totalProducts: DashboardMetric;
  activeDeliveries: DashboardMetric;
  /** Trend series powering the "Sales Overview" chart. */
  salesTrend: SalesTrendPoint[];
  recentOrders: Order[];
}

const EMPTY_METRIC: DashboardMetric = { value: 0 };

const EMPTY_DASHBOARD: DashboardSummary = {
  totalRevenue: EMPTY_METRIC,
  totalOrders: EMPTY_METRIC,
  totalProducts: EMPTY_METRIC,
  activeDeliveries: EMPTY_METRIC,
  salesTrend: [],
  recentOrders: [],
};

export async function getDashboardSummary(): Promise<DashboardSummary> {
  const api = await getServerApi();
  // Assumed contract: GET /analytics/summary -> Partial<DashboardSummary>
  const { data } = await api.get<Partial<DashboardSummary>>(
    "/analytics/summary"
  );
  return {
    ...EMPTY_DASHBOARD,
    ...data,
    totalRevenue: data?.totalRevenue ?? EMPTY_METRIC,
    totalOrders: data?.totalOrders ?? EMPTY_METRIC,
    totalProducts: data?.totalProducts ?? EMPTY_METRIC,
    activeDeliveries: data?.activeDeliveries ?? EMPTY_METRIC,
    salesTrend: data?.salesTrend ?? [],
    recentOrders: data?.recentOrders ?? [],
  };
}

/* ------------------------------------------------------------------ */
/* Sales summary                                                       */
/* ------------------------------------------------------------------ */

export interface SalesSummary {
  totalRevenue: number;
  totalOrders: number;
  averageOrderValue: number;
  conversionRate: number;
  trend: SalesTrendPoint[];
}

const EMPTY_SALES: SalesSummary = {
  totalRevenue: 0,
  totalOrders: 0,
  averageOrderValue: 0,
  conversionRate: 0,
  trend: [],
};

export async function getSalesSummary(): Promise<SalesSummary> {
  const api = await getServerApi();
  // Assumed contract: GET /analytics/sales -> Partial<SalesSummary>
  const { data } = await api.get<Partial<SalesSummary>>("/analytics/sales");
  return {
    ...EMPTY_SALES,
    ...data,
    trend: data?.trend ?? [],
  };
}

/* ------------------------------------------------------------------ */
/* Delivery summary                                                    */
/* ------------------------------------------------------------------ */

export interface ActiveDelivery {
  id: string;
  orderNumber?: string;
  customer?: string;
  address?: string;
  status: DeliveryStatus | string;
  eta?: string;
}

export interface DeliverySummary {
  totalDeliveries: number;
  inTransit: number;
  deliveredToday: number;
  averageDeliveryMinutes: number;
  active: ActiveDelivery[];
}

const EMPTY_DELIVERY: DeliverySummary = {
  totalDeliveries: 0,
  inTransit: 0,
  deliveredToday: 0,
  averageDeliveryMinutes: 0,
  active: [],
};

export async function getDeliverySummary(): Promise<DeliverySummary> {
  const api = await getServerApi();
  // Assumed contract: GET /analytics/delivery -> Partial<DeliverySummary>
  const { data } = await api.get<Partial<DeliverySummary>>(
    "/analytics/delivery"
  );
  return {
    ...EMPTY_DELIVERY,
    ...data,
    active: data?.active ?? [],
  };
}

/* ------------------------------------------------------------------ */
/* Seller store orders                                                 */
/* ------------------------------------------------------------------ */

export async function getStoreOrders(): Promise<Order[]> {
  const api = await getServerApi();
  // Assumed contract: GET /orders/store -> Order[] (orders for the
  // authenticated seller's store). Returns [] when none exist.
  const { data } = await api.get<Order[]>("/orders/store");
  return Array.isArray(data) ? data : [];
}
