"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { CheckCircle2, Circle, XCircle, RefreshCw, MapPin } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LoadingState } from "@/components/feedback/LoadingState";
import { ErrorState } from "@/components/feedback/ErrorState";
import { getOrderById } from "@/services/orders";
import type { OrderStatus } from "@/types";

const STEPS: {
  status: OrderStatus;
  label: string;
  description: string;
  estimate?: string;
}[] = [
  {
    status: "pending",
    label: "Order placed",
    description: "Your order has been received and is awaiting confirmation.",
  },
  {
    status: "confirmed",
    label: "Confirmed",
    description: "We've confirmed your order with the store.",
  },
  {
    status: "preparing",
    label: "Being prepared",
    description: "The bakery is freshly preparing your sweet treats.",
    estimate: "~15–30 min",
  },
  {
    status: "out_for_delivery",
    label: "Out for delivery",
    description: "A driver has picked up your order and is on the way.",
    estimate: "~10–20 min away",
  },
  {
    status: "delivered",
    label: "Delivered",
    description: "Your order has been delivered. Enjoy!",
  },
];

function Tracking() {
  const { id } = useParams<{ id: string }>();

  const {
    data: order,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["order", id],
    queryFn: () => getOrderById(id),
    enabled: !!id,
  });

  const currentIndex = order
    ? STEPS.findIndex((s) => s.status === order.status)
    : -1;
  const cancelled = order?.status === "cancelled";

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      {/* Header */}
      <div className="flex items-start justify-between mb-2">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Track Your Order</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Order <span className="font-medium text-foreground">#{id}</span>
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-2 mt-1"
          onClick={() => refetch()}
          disabled={isLoading}
        >
          <RefreshCw className={`h-3.5 w-3.5 ${isLoading ? "animate-spin" : ""}`} />
          Refresh
        </Button>
      </div>

      {/* Estimated delivery */}
      {order?.estimatedDeliveryAt && !cancelled && (
        <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-amber-50 border border-amber-200 px-4 py-2 text-sm font-medium text-amber-800">
          Estimated delivery: {order.estimatedDeliveryAt}
        </div>
      )}

      <Card className="mb-6">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold">Order Status</CardTitle>
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

          {/* Cancelled state */}
          {order && cancelled && (
            <div className="flex items-center gap-3 rounded-xl border border-destructive/30 bg-destructive/5 px-4 py-4 text-destructive">
              <XCircle className="h-6 w-6 flex-shrink-0" />
              <div>
                <p className="font-semibold">Order Cancelled</p>
                <p className="text-sm text-muted-foreground mt-0.5">
                  This order has been cancelled. Contact support if you have questions.
                </p>
              </div>
            </div>
          )}

          {/* Visual timeline */}
          {order && !cancelled && (
            <ol className="relative space-y-0">
              {STEPS.map((step, i) => {
                const done = i <= currentIndex;
                const isCurrent = i === currentIndex;
                const isLast = i === STEPS.length - 1;

                return (
                  <li key={step.status} className="flex gap-4">
                    {/* Timeline connector column */}
                    <div className="flex flex-col items-center">
                      {/* Step icon */}
                      {done ? (
                        <div
                          className={`flex h-9 w-9 items-center justify-center rounded-full flex-shrink-0 transition-all ${
                            isCurrent
                              ? "bg-amber-500 shadow-lg shadow-amber-200 ring-4 ring-amber-100 scale-110"
                              : "bg-green-500"
                          }`}
                        >
                          <CheckCircle2 className="h-5 w-5 text-white" />
                        </div>
                      ) : (
                        <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-dashed border-muted-foreground/30 flex-shrink-0">
                          <Circle className="h-4 w-4 text-muted-foreground/40" />
                        </div>
                      )}

                      {/* Connecting line */}
                      {!isLast && (
                        <div
                          className={`w-px flex-1 my-1 min-h-[1.75rem] ${
                            done && i < currentIndex
                              ? "bg-green-400"
                              : "border-l-2 border-dashed border-muted-foreground/20"
                          }`}
                        />
                      )}
                    </div>

                    {/* Step content */}
                    <div className={`pb-6 ${isLast ? "pb-0" : ""}`}>
                      <div className="flex items-center gap-2 mt-1.5 mb-0.5">
                        <p
                          className={`font-semibold text-sm ${
                            isCurrent
                              ? "text-amber-700"
                              : done
                              ? "text-foreground"
                              : "text-muted-foreground"
                          }`}
                        >
                          {step.label}
                        </p>
                        {isCurrent && (
                          <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100 text-xs py-0">
                            Current
                          </Badge>
                        )}
                      </div>
                      <p
                        className={`text-xs leading-relaxed ${
                          done ? "text-muted-foreground" : "text-muted-foreground/60"
                        }`}
                      >
                        {step.description}
                      </p>
                      {isCurrent && step.estimate && (
                        <p className="text-xs font-medium text-amber-600 mt-1">
                          {step.estimate}
                        </p>
                      )}
                    </div>
                  </li>
                );
              })}
            </ol>
          )}
        </CardContent>
      </Card>

      {/* Map placeholder button */}
      <div className="mb-6">
        <Button
          variant="outline"
          className="w-full h-11 border-dashed text-muted-foreground gap-2"
          disabled
        >
          <MapPin className="h-4 w-4" />
          Track on map
          <Badge variant="secondary" className="text-xs ml-1">Coming soon</Badge>
        </Button>
      </div>

      {/* Back link */}
      <Button asChild variant="ghost" className="text-muted-foreground">
        <Link href="/customer/orders">Back to my orders</Link>
      </Button>
    </div>
  );
}

export default function PublicOrderTrackingByIdPage() {
  return (
    <Suspense fallback={<LoadingState className="container mx-auto px-4 py-8" />}>
      <Tracking />
    </Suspense>
  );
}
