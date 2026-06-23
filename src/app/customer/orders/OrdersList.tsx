"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";

import { getMyOrders } from "@/services/orders";
import type { Order } from "@/types";
import { Badge } from "@/components/ui/badge";
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

function formatDate(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function OrderCard({ order }: { order: Order }) {
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <CardTitle className="text-lg">
              Order {order.number ?? `#${order.id}`}
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Placed {formatDate(order.createdAt)}
            </p>
          </div>
          <Badge variant={orderStatusVariant(order.status)}>
            {orderStatusLabel(order.status)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <ul className="space-y-2">
          {order.items.map((item, index) => (
            <li
              key={`${item.productId}-${index}`}
              className="flex items-center justify-between gap-4 text-sm"
            >
              <span className="truncate">
                {item.quantity} &times; {item.name}
              </span>
              <span className="shrink-0 text-muted-foreground">
                {formatCurrency(item.price * item.quantity)}
              </span>
            </li>
          ))}
        </ul>

        <Separator />

        <div className="flex items-center justify-between">
          <span className="font-semibold">Total</span>
          <span className="font-semibold">{formatCurrency(order.total)}</span>
        </div>

        {order.estimatedDeliveryAt && order.status !== "delivered" && (
          <p className="text-sm text-muted-foreground">
            Estimated delivery: {formatDate(order.estimatedDeliveryAt)}
          </p>
        )}
      </CardContent>
    </Card>
  );
}

export default function OrdersList() {
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

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <OrderCard key={order.id} order={order} />
      ))}
      <p className="text-center text-sm text-muted-foreground">
        Need help with an order?{" "}
        <Link href="/contact" className="underline">
          Contact support
        </Link>
        .
      </p>
    </div>
  );
}
