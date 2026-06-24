"use client";
import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { CheckCircle2, Package, ChefHat, Bike, Mail, MapPin } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { LoadingState } from "@/components/feedback/LoadingState";
import { ErrorState } from "@/components/feedback/ErrorState";
import { formatCurrency } from "@/lib/currency";
import { getOrderById } from "@/services/orders";

const NEXT_STEPS = [
  {
    icon: Package,
    label: "Order received",
    description: "We've received your order and confirmed it with the store.",
  },
  {
    icon: ChefHat,
    label: "Being prepared",
    description: "The bakery is freshly preparing your items right now.",
  },
  {
    icon: Bike,
    label: "Out for delivery",
    description: "A driver will pick up your order and head your way.",
  },
];

function Confirmation() {
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

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      {/* Success hero */}
      <div className="text-center mb-10">
        <div className="flex justify-center mb-5">
          <CheckCircle2 className="h-20 w-20 text-green-500 animate-bounce" />
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold mb-2 text-gray-900">
          Order Confirmed! 🎉
        </h1>
        {order?.number || orderId ? (
          <p className="text-lg text-muted-foreground">
            Order{" "}
            <span className="font-semibold text-foreground">
              #{order?.number ?? orderId}
            </span>{" "}
            is on its way.
          </p>
        ) : (
          <p className="text-lg text-muted-foreground">
            Your order has been received.
          </p>
        )}

        {/* Estimated delivery — shown if available */}
        {order?.estimatedDeliveryAt && (
          <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-amber-50 border border-amber-200 px-4 py-2 text-sm font-medium text-amber-800">
            <Bike className="h-4 w-4" />
            Estimated delivery: {order.estimatedDeliveryAt}
          </div>
        )}
      </div>

      {/* What happens next — timeline */}
      <Card className="mb-6">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold">What happens next?</CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="relative space-y-0">
            {NEXT_STEPS.map((step, i) => {
              const Icon = step.icon;
              const isLast = i === NEXT_STEPS.length - 1;
              return (
                <li key={step.label} className="flex gap-4">
                  {/* Timeline column */}
                  <div className="flex flex-col items-center">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-100 text-amber-600 flex-shrink-0">
                      <Icon className="h-4 w-4" />
                    </div>
                    {!isLast && (
                      <div className="w-px flex-1 bg-amber-200 my-1 min-h-[1.5rem]" />
                    )}
                  </div>
                  {/* Content */}
                  <div className={`pb-5 ${isLast ? "" : ""}`}>
                    <p className="font-semibold text-sm leading-tight mt-1.5">
                      {step.label}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>
        </CardContent>
      </Card>

      {/* Order details card */}
      {orderId && (
        <Card className="mb-6">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold">Order Details</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading && <LoadingState rows={4} />}
            {isError && (
              <ErrorState
                title="Couldn't load order details"
                message="Your order was placed, but we couldn't load its details right now."
                onRetry={() => refetch()}
              />
            )}
            {order && (
              <div className="space-y-4">
                {/* Items */}
                <div className="space-y-2">
                  {order.items.map((item) => (
                    <div key={item.productId} className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        {item.name}{" "}
                        <span className="font-medium text-foreground">× {item.quantity}</span>
                      </span>
                      <span className="font-medium">
                        {formatCurrency(item.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                <Separator />

                {/* Totals */}
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>{formatCurrency(order.subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Delivery Fee</span>
                    <span>{formatCurrency(order.deliveryFee)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tax</span>
                    <span>{formatCurrency(order.tax)}</span>
                  </div>
                </div>

                <Separator />

                <div className="flex justify-between items-baseline">
                  <span className="font-bold text-base">Total</span>
                  <span className="font-extrabold text-xl text-amber-700">
                    {formatCurrency(order.total)}
                  </span>
                </div>

                {/* Shipping address */}
                {order.shippingAddress && (
                  <div className="mt-2 flex items-start gap-2 text-sm text-muted-foreground rounded-lg bg-muted/40 px-3 py-2.5">
                    <MapPin className="h-4 w-4 flex-shrink-0 mt-0.5 text-amber-600" />
                    <span>
                      {[order.shippingAddress.line1, order.shippingAddress.city]
                        .filter(Boolean)
                        .join(", ")}
                    </span>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Receipt by email note */}
      <div className="flex items-center gap-2 text-xs text-muted-foreground bg-muted/40 rounded-lg px-4 py-3 mb-6">
        <Mail className="h-4 w-4 flex-shrink-0" />
        <span>A receipt has been sent to your email address.</span>
      </div>

      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        {order?.id && (
          <Button
            className="flex-1 bg-amber-500 hover:bg-amber-600 text-white font-semibold h-11"
            asChild
          >
            <Link
              href={`/order-tracking?orderId=${encodeURIComponent(order.id)}`}
            >
              Track Order
            </Link>
          </Button>
        )}
        <Button variant="outline" className="flex-1 h-11" asChild>
          <Link href="/products">Continue Shopping</Link>
        </Button>
        <Button variant="ghost" className="flex-1 h-11" asChild>
          <Link href="/customer/orders">View My Orders</Link>
        </Button>
      </div>
    </div>
  );
}

export default function OrderConfirmationPage() {
  return (
    <Suspense fallback={<LoadingState className="container mx-auto px-4 py-8" />}>
      <Confirmation />
    </Suspense>
  );
}
