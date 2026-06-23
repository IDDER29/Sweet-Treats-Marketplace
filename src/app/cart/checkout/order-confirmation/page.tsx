"use client";
import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LoadingState } from "@/components/feedback/LoadingState";
import { ErrorState } from "@/components/feedback/ErrorState";
import { formatCurrency } from "@/lib/currency";
import { getOrderById } from "@/services/orders";

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
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <CheckCircle2 className="mx-auto h-16 w-16 text-green-500 mb-4" />
        <h1 className="text-3xl font-bold mb-2">Thank You for Your Order!</h1>
        {order?.number || orderId ? (
          <p className="text-xl text-muted-foreground">
            Your order number is{" "}
            <span className="font-semibold">{order?.number ?? orderId}</span>
          </p>
        ) : (
          <p className="text-xl text-muted-foreground">
            Your order has been received.
          </p>
        )}
      </div>

      {orderId && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Order Details</CardTitle>
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
              <>
                <div className="space-y-4">
                  {order.items.map((item) => (
                    <div key={item.productId} className="flex justify-between">
                      <span>
                        {item.name} x {item.quantity}
                      </span>
                      <span>{formatCurrency(item.price * item.quantity)}</span>
                    </div>
                  ))}
                  <div className="border-t pt-4 space-y-2">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>{formatCurrency(order.subtotal)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Delivery Fee</span>
                      <span>{formatCurrency(order.deliveryFee)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tax</span>
                      <span>{formatCurrency(order.tax)}</span>
                    </div>
                  </div>
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>{formatCurrency(order.total)}</span>
                  </div>
                </div>
                {order.shippingAddress && (
                  <div className="mt-6 space-y-2 text-sm">
                    <p>
                      <span className="font-semibold">Shipping to:</span>{" "}
                      {[
                        order.shippingAddress.line1,
                        order.shippingAddress.city,
                      ]
                        .filter(Boolean)
                        .join(", ")}
                    </p>
                  </div>
                )}
                <div className="mt-6">
                  <Link
                    href={`/order-tracking?orderId=${encodeURIComponent(
                      order.id
                    )}`}
                    className="text-primary hover:underline"
                  >
                    Track Your Order
                  </Link>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      )}

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">What&apos;s Next?</h2>
        <p className="text-muted-foreground">
          Your order will be prepared for delivery. You can track its progress
          any time from your orders.
        </p>
        <div className="flex gap-3">
          <Button asChild variant="outline">
            <Link href="/products">Continue Shopping</Link>
          </Button>
          <Button asChild>
            <Link href="/customer/orders">View My Orders</Link>
          </Button>
        </div>
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
