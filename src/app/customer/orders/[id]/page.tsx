"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  CheckCircle2,
  Circle,
  MapPin,
  Store,
  CreditCard,
  HelpCircle,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/currency";

// ── Status helpers ────────────────────────────────────────────────────────────

type OrderStatus =
  | "Pending"
  | "Confirmed"
  | "In Preparation"
  | "Out for Delivery"
  | "Delivered"
  | "Cancelled";

const STATUS_BADGE: Record<OrderStatus, string> = {
  Pending: "bg-gray-100 text-gray-700",
  Confirmed: "bg-blue-100 text-blue-700",
  "In Preparation": "bg-amber-100 text-amber-700",
  "Out for Delivery": "bg-orange-100 text-orange-700",
  Delivered: "bg-green-100 text-green-700",
  Cancelled: "bg-red-100 text-red-700",
};

const TIMELINE_STEPS: { label: string; status: OrderStatus }[] = [
  { label: "Placed", status: "Pending" },
  { label: "Confirmed", status: "Confirmed" },
  { label: "Preparing", status: "In Preparation" },
  { label: "Out for Delivery", status: "Out for Delivery" },
  { label: "Delivered", status: "Delivered" },
];

const STATUS_ORDER: OrderStatus[] = [
  "Pending",
  "Confirmed",
  "In Preparation",
  "Out for Delivery",
  "Delivered",
];

function statusIndex(s: OrderStatus) {
  return STATUS_ORDER.indexOf(s);
}

// ── Mock data ─────────────────────────────────────────────────────────────────

const MOCK_STATUS: OrderStatus = "In Preparation";
const PLACED_DATE = new Date(Date.now() - 40 * 60 * 1000); // 40 min ago

const LINE_ITEMS = [
  { name: "Chocolate Lava Cake", qty: 2, unitPrice: 8.5 },
  { name: "Salted Caramel Éclair", qty: 1, unitPrice: 5.0 },
  { name: "Raspberry Macaron Box (6)", qty: 1, unitPrice: 12.0 },
];

// ── Page ─────────────────────────────────────────────────────────────────────

export default function CustomerOrderDetailPage() {
  const { id } = useParams<{ id: string }>();
  const orderId = `#ORD-${id}`;
  const status: OrderStatus = MOCK_STATUS;

  const subtotal = LINE_ITEMS.reduce((s, i) => s + i.qty * i.unitPrice, 0);
  const deliveryFee = 2.5;
  const discount = 2.0;
  const total = subtotal + deliveryFee - discount;

  const currentStep = statusIndex(status);
  const isCancelled = status === "Cancelled";
  const canCancel = status === "Pending" || status === "Confirmed";
  // 40 min old — past the 30-min window
  const pastCancellationWindow = Date.now() - PLACED_DATE.getTime() > 30 * 60 * 1000;

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
        <h1 className="text-2xl font-bold">Order {orderId}</h1>
        <Badge className={`${STATUS_BADGE[status]} border-0`}>{status}</Badge>
        <span className="text-sm text-muted-foreground ml-auto">
          Placed {PLACED_DATE.toLocaleString()}
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
              {LINE_ITEMS.map((item) => (
                <div key={item.name} className="flex items-center justify-between text-sm">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-muted-foreground">
                      {item.qty} × {formatCurrency(item.unitPrice)}
                    </p>
                  </div>
                  <span className="font-semibold">
                    {formatCurrency(item.qty * item.unitPrice)}
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
                                done && i < currentStep ? "bg-green-400" : "border-l-2 border-dashed border-muted-foreground/20"
                              }`}
                            />
                          )}
                        </div>
                        <div className={`pb-5 ${isLast ? "pb-0" : ""}`}>
                          <p
                            className={`text-sm font-semibold mt-1 ${
                              isCurrent ? "text-amber-700" : done ? "text-foreground" : "text-muted-foreground"
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

          {/* Store info */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Store</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100 text-amber-700 font-bold text-sm flex-shrink-0">
                CH
              </div>
              <div>
                <p className="font-medium">Cake Heaven</p>
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <Store className="h-3.5 w-3.5" /> Sweet treats &amp; pastries
                </p>
              </div>
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
                <span>{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Delivery fee</span>
                <span>{formatCurrency(deliveryFee)}</span>
              </div>
              <div className="flex justify-between text-green-600">
                <span>Discount</span>
                <span>−{formatCurrency(discount)}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-semibold text-base">
                <span>Total</span>
                <span>{formatCurrency(total)}</span>
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
              <p className="font-medium text-foreground">Sarah Johnson</p>
              <p>42 Maple Street, Apt 3B</p>
              <p>San Francisco, CA 94102</p>
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
              <p>Visa ••••4242</p>
              <p className="text-muted-foreground mt-0.5">
                Estimated delivery: Today, 2:30 – 3:00 PM
              </p>
            </CardContent>
          </Card>

          {/* CTA buttons */}
          <div className="flex flex-col gap-2">
            <Button asChild className="bg-amber-600 hover:bg-amber-700 text-white">
              <Link href={`/order-tracking?order=${id}`}>Track order</Link>
            </Button>

            {status === "Delivered" && (
              <Button asChild variant="outline">
                <Link href="/review-and-feedback">Leave a review</Link>
              </Button>
            )}

            {canCancel && (
              <Button
                variant="destructive"
                disabled={pastCancellationWindow}
                title={pastCancellationWindow ? "Past cancellation window" : undefined}
              >
                Cancel order
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
