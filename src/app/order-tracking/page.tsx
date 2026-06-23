"use client";
import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { CheckCircle2, Circle, XCircle } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LoadingState } from "@/components/feedback/LoadingState";
import { ErrorState } from "@/components/feedback/ErrorState";
import { EmptyState } from "@/components/feedback/EmptyState";
import { getOrderById } from "@/services/orders";
import type { OrderStatus } from "@/types";

const STEPS: { status: OrderStatus; label: string }[] = [
  { status: "pending", label: "Order placed" },
  { status: "confirmed", label: "Confirmed" },
  { status: "preparing", label: "Preparing" },
  { status: "out_for_delivery", label: "Out for delivery" },
  { status: "delivered", label: "Delivered" },
];

function Tracking() {
  const params = useSearchParams();
  const orderId = params.get("orderId");

  const {
    data: order,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["order", orderId],
    queryFn: () => getOrderById(orderId as string),
    enabled: !!orderId,
  });

  if (!orderId) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Track Your Order</h1>
        <EmptyState
          title="No order selected"
          message="Open a tracking link from your order confirmation or order history."
          actionLabel="View my orders"
          actionHref="/customer/orders"
        />
      </div>
    );
  }

  const currentIndex = order
    ? STEPS.findIndex((s) => s.status === order.status)
    : -1;
  const cancelled = order?.status === "cancelled";

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-2">Track Your Order</h1>
      <p className="text-muted-foreground mb-8">Order #{orderId}</p>

      <Card>
        <CardHeader>
          <CardTitle>Status</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading && <LoadingState rows={5} />}
          {isError && (
            <ErrorState
              title="Couldn't load tracking"
              message="We couldn't fetch this order's status right now."
              onRetry={() => refetch()}
            />
          )}
          {order && cancelled && (
            <div className="flex items-center gap-3 text-destructive">
              <XCircle className="h-6 w-6" />
              <span className="font-medium">This order was cancelled.</span>
            </div>
          )}
          {order && !cancelled && (
            <ol className="space-y-4">
              {STEPS.map((step, i) => {
                const done = i <= currentIndex;
                return (
                  <li key={step.status} className="flex items-center gap-3">
                    {done ? (
                      <CheckCircle2 className="h-6 w-6 text-green-500" />
                    ) : (
                      <Circle className="h-6 w-6 text-muted-foreground" />
                    )}
                    <span className={done ? "font-medium" : "text-muted-foreground"}>
                      {step.label}
                    </span>
                  </li>
                );
              })}
            </ol>
          )}
          {order?.estimatedDeliveryAt && !cancelled && (
            <p className="mt-6 text-sm text-muted-foreground">
              Estimated delivery: {order.estimatedDeliveryAt}
            </p>
          )}
        </CardContent>
      </Card>

      <div className="mt-6">
        <Button asChild variant="outline">
          <Link href="/customer/orders">Back to my orders</Link>
        </Button>
      </div>
    </div>
  );
}

export default function OrderTrackingPage() {
  return (
    <Suspense fallback={<LoadingState className="container mx-auto px-4 py-8" />}>
      <Tracking />
    </Suspense>
  );
}
