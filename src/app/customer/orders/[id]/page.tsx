"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowLeft,
  CheckCircle2,
  Circle,
  MapPin,
  CreditCard,
  HelpCircle,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/currency";
import { LoadingState } from "@/components/feedback/LoadingState";
import { ErrorState } from "@/components/feedback/ErrorState";
import { getOrderById } from "@/services/orders";
import type { OrderStatus } from "@/types";

// ── Status helpers ────────────────────────────────────────────────────────────

const STATUS_DISPLAY: Record<OrderStatus, string> = {
  pending: "Pending",
  confirmed: "Confirmed",
  preparing: "Preparing",
  out_for_delivery: "Out for Delivery",
  delivered: "Delivered",
  cancelled: "Cancelled",
};

const STATUS_BADGE: Record<OrderStatus, string> = {
  pending: "bg-gray-100 text-gray-700",
  confirmed: "bg-blue-100 text-blue-700",
  preparing: "bg-amber-100 text-amber-700",
  out_for_delivery: "bg-orange-100 text-orange-700",
  delivered: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
};

const TIMELINE_STEPS: { label: string; status: OrderStatus }[] = [
  { label: "Placed", status: "pending" },
  { label: "Confirmed", status: "confirmed" },
  { label: "Preparing", status: "preparing" },
  { label: "Out for Delivery", status: "out_for_delivery" },
  { label: "Delivered", status: "delivered" },
];

const STATUS_ORDER: OrderStatus[] = [
  "pending",
  "confirmed",
  "preparing",
  "out_for_delivery",
  "delivered",
];

function statusIndex(s: OrderStatus) {
  return STATUS_ORDER.indexOf(s);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function CustomerOrderDetailPage() {
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

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <LoadingState rows={4} />
      </div>
    );
  }

  if (isError || !order) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <ErrorState onRetry={refetch} />
      </div>
    );
  }

  const isCancelled = order.status === "cancelled";
  const currentStep = isCancelled ? -1 : statusIndex(order.status);
  const canCancel = order.status === "pending" || order.status === "confirmed";
  const orderLabel = order.number ?? order.id;
  const estimatedDelivery = order.estimatedDeliveryAt
    ? new Date(order.estimatedDeliveryAt).toLocaleString()
    : null;

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Back + header */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <Button asChild variant="ghost" size="sm" className="text-muted-foreground -ml-2">
          <Link href="/customer/orders">
            <ArrowLeft className="mr-1 h-4 w-4" /> My Orders
          </Link>
        </Button>
        <a
          href="mailto:support@sweettreats.com"
          className="flex items-center gap-1 text-sm text-amber-600 hover:underline"
        >
          <HelpCircle className="h-4 w-4" /> Need help?
        </a>
      </div>

      {/* Title row */}
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <h1 className="text-2xl font-bold">Order #{orderLabel}</h1>
        <Badge className={`${STATUS_BADGE[order.status]} border-0`}>
          {STATUS_DISPLAY[order.status]}
        </Badge>
        <span className="text-sm text-muted-foreground ml-auto">
          Placed {new Date(order.createdAt).toLocaleString()}
        </span>
      </div>

      {/* Two-column layout */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* ── Left column (2/3) ── */}
        <div className="space-y-6 lg:col-span-2">
          {/* Order items */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Items Ordered</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {order.items.map((item) => (
                <div key={item.productId} className="flex items-center justify-between text-sm">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-muted-foreground">
                      {item.quantity} × {formatCurrency(item.price)}
                    </p>
                  </div>
                  <span className="font-semibold">
                    {formatCurrency(item.quantity * item.price)}
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Timeline */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Order Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              {isCancelled ? (
                <p className="text-sm text-red-600 font-medium">This order was cancelled.</p>
              ) : (
                <ol className="space-y-0">
                  {TIMELINE_STEPS.map((step, i) => {
                    const done = i <= currentStep;
                    const isCurrent = i === currentStep;
                    const isLast = i === TIMELINE_STEPS.length - 1;
                    return (
                      <li key={step.label} className="flex gap-4">
                        <div className="flex flex-col items-center">
                          {done ? (
                            <div
                              className={`flex h-8 w-8 items-center justify-center rounded-full flex-shrink-0 ${
                                isCurrent
                                  ? "bg-amber-500 ring-4 ring-amber-100 scale-110 shadow-md"
                                  : "bg-green-500"
                              }`}
                            >
                              <CheckCircle2 className="h-4 w-4 text-white" />
                            </div>
                          ) : (
                            <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-dashed border-muted-foreground/30 flex-shrink-0">
                              <Circle className="h-3.5 w-3.5 text-muted-foreground/40" />
                            </div>
                          )}
                          {!isLast && (
                            <div
                              className={`w-px my-1 min-h-[1.5rem] flex-1 ${
                                done && i < currentStep
                                  ? "bg-green-400"
                                  : "border-l-2 border-dashed border-muted-foreground/20"
                              }`}
                            />
                          )}
                        </div>
                        <div className={`pb-5 ${isLast ? "pb-0" : ""}`}>
                          <p
                            className={`text-sm font-semibold mt-1 ${
                              isCurrent
                                ? "text-amber-700"
                                : done
                                ? "text-foreground"
                                : "text-muted-foreground"
                            }`}
                          >
                            {step.label}
                            {isCurrent && (
                              <Badge className="ml-2 bg-amber-100 text-amber-800 border-0 text-xs py-0">
                                Now
                              </Badge>
                            )}
                          </p>
                        </div>
                      </li>
                    );
                  })}
                </ol>
              )}
            </CardContent>
          </Card>
        </div>

        {/* ── Right column (1/3) ── */}
        <div className="space-y-4">
          {/* Price summary */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Price Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>{formatCurrency(order.subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Delivery fee</span>
                <span>{formatCurrency(order.deliveryFee)}</span>
              </div>
              {order.tax > 0 && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax</span>
                  <span>{formatCurrency(order.tax)}</span>
                </div>
              )}
              <Separator />
              <div className="flex justify-between font-semibold text-base">
                <span>Total</span>
                <span>{formatCurrency(order.total)}</span>
              </div>
            </CardContent>
          </Card>

          {/* Delivery address */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <MapPin className="h-4 w-4 text-amber-600" /> Delivery Address
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-0.5">
              {order.shippingAddress ? (
                <>
                  {order.shippingAddress.fullName && (
                    <p className="font-medium text-foreground">
                      {order.shippingAddress.fullName}
                    </p>
                  )}
                  <p>{order.shippingAddress.line1}</p>
                  {order.shippingAddress.line2 && <p>{order.shippingAddress.line2}</p>}
                  <p>
                    {[
                      order.shippingAddress.city,
                      order.shippingAddress.state,
                      order.shippingAddress.postalCode,
                    ]
                      .filter(Boolean)
                      .join(", ")}
                  </p>
                  {order.shippingAddress.country && (
                    <p>{order.shippingAddress.country}</p>
                  )}
                </>
              ) : (
                <p className="italic">No delivery address</p>
              )}
            </CardContent>
          </Card>

          {/* Payment */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <CreditCard className="h-4 w-4 text-amber-600" /> Payment
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm">
              <p>{order.paymentMethod ?? "N/A"}</p>
              {estimatedDelivery && (
                <p className="text-muted-foreground mt-0.5">
                  Estimated delivery: {estimatedDelivery}
                </p>
              )}
            </CardContent>
          </Card>

          {/* CTA buttons */}
          <div className="flex flex-col gap-2">
            <Button asChild className="bg-amber-600 hover:bg-amber-700 text-white">
              <Link href={`/order-tracking?orderId=${order.id}`}>Track order</Link>
            </Button>

            {order.status === "delivered" && (
              <Button asChild variant="outline">
                <Link href="/review-and-feedback">Leave a review</Link>
              </Button>
            )}

            {canCancel && (
              <Button variant="destructive">Cancel order</Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
