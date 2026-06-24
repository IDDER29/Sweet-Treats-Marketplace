"use client";

import { useState } from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { MapPin, Package, RefreshCcw, ShoppingBag } from "lucide-react";

import { getMyOrders } from "@/services/orders";
import type { Order, OrderStatus } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/lib/currency";
import { orderStatusLabel, orderStatusVariant } from "@/lib/order-status";
import { LoadingState } from "@/components/feedback/LoadingState";
import { ErrorState } from "@/components/feedback/ErrorState";
import { EmptyState } from "@/components/feedback/EmptyState";

type FilterTab = "all" | "pending" | "delivered" | "cancelled";

const FILTER_TABS: { key: FilterTab; label: string }[] = [
  { key: "all", label: "All" },
  { key: "pending", label: "Pending" },
  { key: "delivered", label: "Delivered" },
  { key: "cancelled", label: "Cancelled" },
];

const ACTIVE_STATUSES: OrderStatus[] = [
  "pending",
  "confirmed",
  "preparing",
  "out_for_delivery",
];

function isActiveOrder(status: OrderStatus): boolean {
  return ACTIVE_STATUSES.includes(status);
}

function matchesFilter(order: Order, filter: FilterTab): boolean {
  if (filter === "all") return true;
  if (filter === "pending") return isActiveOrder(order.status);
  if (filter === "delivered") return order.status === "delivered";
  if (filter === "cancelled") return order.status === "cancelled";
  return true;
}

function formatDate(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function EmptyFilterState({ filter }: { filter: FilterTab }) {
  const messages: Record<FilterTab, { title: string; message: string }> = {
    all: {
      title: "No orders yet",
      message: "When you place an order, it will show up here.",
    },
    pending: {
      title: "No active orders",
      message: "You have no pending or in-progress orders right now.",
    },
    delivered: {
      title: "No delivered orders",
      message: "Orders you receive will appear here.",
    },
    cancelled: {
      title: "No cancelled orders",
      message: "Any cancelled orders will appear here.",
    },
  };
  const { title, message } = messages[filter];
  return (
    <EmptyState
      title={title}
      message={message}
      actionLabel="Browse products"
      actionHref="/products"
    />
  );
}

function OrderCard({ order }: { order: Order }) {
  const isActive = isActiveOrder(order.status);
  const isDelivered = order.status === "delivered";
  const itemsWithImages = order.items.filter((item) => !!item.image);
  const remainingCount = order.items.length - itemsWithImages.slice(0, 3).length;

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div className="min-w-0">
            <CardTitle className="text-base font-semibold truncate">
              Order {order.number ?? `#${order.id}`}
            </CardTitle>
            <p className="text-xs text-muted-foreground mt-0.5">
              Placed {formatDate(order.createdAt)}
            </p>
          </div>
          <Badge variant={orderStatusVariant(order.status)} className="shrink-0">
            {orderStatusLabel(order.status)}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4 pt-0">
        {/* Product image thumbnails */}
        {itemsWithImages.length > 0 && (
          <div className="flex items-center gap-2">
            {itemsWithImages.slice(0, 3).map((item, i) => (
              <div
                key={`${item.productId}-${i}`}
                className="h-12 w-12 rounded-md overflow-hidden bg-muted shrink-0 border border-gray-100"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
            {remainingCount > 0 && (
              <div className="h-12 w-12 rounded-md bg-amber-50 border border-amber-100 flex items-center justify-center shrink-0">
                <span className="text-xs font-semibold text-amber-700">
                  +{remainingCount}
                </span>
              </div>
            )}
          </div>
        )}

        {/* Items list */}
        <ul className="space-y-1.5">
          {order.items.map((item, index) => (
            <li
              key={`${item.productId}-${index}`}
              className="flex items-center justify-between gap-4 text-sm"
            >
              <span className="truncate text-gray-600">
                {item.quantity} &times; {item.name}
              </span>
              <span className="shrink-0 text-muted-foreground text-xs">
                {formatCurrency(item.price * item.quantity)}
              </span>
            </li>
          ))}
        </ul>

        <Separator />

        <div className="flex items-center justify-between">
          <span className="font-semibold text-sm">Order total</span>
          <span className="font-bold text-base text-amber-800">
            {formatCurrency(order.total)}
          </span>
        </div>

        {order.estimatedDeliveryAt && order.status !== "delivered" && (
          <p className="text-xs text-muted-foreground">
            Estimated delivery: {formatDate(order.estimatedDeliveryAt)}
          </p>
        )}

        {/* Action buttons */}
        <div className="flex gap-2 pt-1">
          {isActive && (
            <Button
              asChild
              size="sm"
              className="flex-1 bg-amber-600 hover:bg-amber-700 text-white"
            >
              <Link href={`/order-tracking/${order.id}`}>
                <MapPin className="mr-2 h-4 w-4" />
                Track Order
              </Link>
            </Button>
          )}
          {isDelivered && (
            <Button
              asChild
              size="sm"
              variant="outline"
              className="flex-1 border-amber-200 text-amber-700 hover:bg-amber-50"
            >
              <Link href="/products">
                <RefreshCcw className="mr-2 h-4 w-4" />
                Reorder
              </Link>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default function OrdersList() {
  const [activeFilter, setActiveFilter] = useState<FilterTab>("all");

  const {
    data: orders,
    isLoading,
    isError,
    refetch,
  } = useQuery<Order[]>({
    queryKey: ["orders", "mine"],
    queryFn: getMyOrders,
  });

  if (isLoading) {
    return <LoadingState rows={4} />;
  }

  if (isError) {
    return (
      <ErrorState
        title="Couldn't load your orders"
        onRetry={() => {
          void refetch();
        }}
      />
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <EmptyState
        title="No orders yet"
        message="When you place an order, it will show up here."
        actionLabel="Browse products"
        actionHref="/products"
      />
    );
  }

  const filtered = orders.filter((order) => matchesFilter(order, activeFilter));

  return (
    <div className="space-y-5">
      {/* Filter tab bar */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
        {FILTER_TABS.map(({ key, label }) => {
          const count =
            key === "all"
              ? orders.length
              : orders.filter((o) => matchesFilter(o, key)).length;
          const isActive = activeFilter === key;
          return (
            <Button
              key={key}
              size="sm"
              variant={isActive ? "default" : "outline"}
              onClick={() => setActiveFilter(key)}
              className={
                isActive
                  ? "bg-amber-600 hover:bg-amber-700 text-white shrink-0"
                  : "shrink-0 border-gray-200 text-gray-600"
              }
            >
              {label}
              {count > 0 && (
                <span
                  className={`ml-1.5 rounded-full text-xs px-1.5 py-0.5 font-semibold ${
                    isActive
                      ? "bg-white/20 text-white"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {count}
                </span>
              )}
            </Button>
          );
        })}
      </div>

      {/* Orders list or empty state */}
      {filtered.length === 0 ? (
        <EmptyFilterState filter={activeFilter} />
      ) : (
        <>
          <div className="space-y-4">
            {filtered.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
          <p className="text-center text-sm text-muted-foreground pt-2">
            Need help with an order?{" "}
            <Link href="/contact" className="underline text-amber-700">
              Contact support
            </Link>
            .
          </p>
        </>
      )}
    </div>
  );
}
