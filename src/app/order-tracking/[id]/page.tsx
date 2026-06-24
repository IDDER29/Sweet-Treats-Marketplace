"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { MapPin, Phone, CheckCircle2, Circle, HelpCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/lib/currency";

// ── Data ──────────────────────────────────────────────────────────────────────

const STEPS = [
  { label: "Placed", done: true, active: false },
  { label: "Confirmed", done: true, active: false },
  { label: "Preparing", done: true, active: false },
  { label: "Out for Delivery", done: false, active: true },
  { label: "Delivered", done: false, active: false },
];

const ITEMS = [
  { name: "Chocolate Lava Cake", qty: 2, unitPrice: 8.5 },
  { name: "Salted Caramel Éclair", qty: 1, unitPrice: 5.0 },
  { name: "Raspberry Macaron Box (6)", qty: 1, unitPrice: 12.0 },
];

// ── Page ─────────────────────────────────────────────────────────────────────

export default function PublicOrderTrackingPage() {
  const { id } = useParams<{ id: string }>();
  const orderId = `#ORD-${id}`;
  const total = ITEMS.reduce((s, i) => s + i.qty * i.unitPrice, 0);

  return (
    <div className="min-h-screen bg-amber-50/40">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Track Your Order</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Order <span className="font-medium text-foreground">{orderId}</span> from{" "}
            <span className="font-medium text-foreground">Cake Heaven</span>
          </p>
        </div>

        {/* Status banner */}
        <div className="mb-6 flex flex-wrap items-center gap-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3">
          <Badge className="bg-orange-100 text-orange-700 border-0 text-sm px-3 py-1">
            Out for Delivery
          </Badge>
          <div className="text-sm">
            <span className="font-medium">Alex M.</span>
            <span className="text-muted-foreground"> is on the way</span>
          </div>
          <span className="ml-auto text-sm font-medium text-amber-700">
            ETA 15 – 25 min
          </span>
        </div>

        {/* 5-step progress bar */}
        <Card className="mb-6">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Order Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="relative space-y-0">
              {STEPS.map((step, i) => {
                const isLast = i === STEPS.length - 1;
                return (
                  <li key={step.label} className="flex gap-4">
                    {/* Icon + connector */}
                    <div className="flex flex-col items-center">
                      {step.active ? (
                        <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-orange-500 flex-shrink-0">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-60" />
                          <CheckCircle2 className="relative h-4 w-4 text-white" />
                        </div>
                      ) : step.done ? (
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500 flex-shrink-0">
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
                            step.done
                              ? "bg-green-400"
                              : "border-l-2 border-dashed border-muted-foreground/20"
                          }`}
                        />
                      )}
                    </div>

                    {/* Label */}
                    <div className={`pb-5 ${isLast ? "pb-0" : ""}`}>
                      <p
                        className={`text-sm font-semibold mt-1 ${
                          step.active
                            ? "text-orange-600"
                            : step.done
                            ? "text-foreground"
                            : "text-muted-foreground"
                        }`}
                      >
                        {step.label}
                        {step.active && (
                          <Badge className="ml-2 bg-orange-100 text-orange-700 border-0 text-xs py-0">
                            Active
                          </Badge>
                        )}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </CardContent>
        </Card>

        {/* Map placeholder */}
        <div className="mb-6 flex h-48 items-center justify-center rounded-xl border-2 border-dashed border-amber-300 bg-amber-50">
          <div className="text-center">
            <MapPin className="mx-auto mb-2 h-8 w-8 text-amber-400" />
            <p className="text-sm font-medium text-amber-700">Live map coming soon</p>
            <p className="text-xs text-muted-foreground mt-1">
              Real-time driver tracking will appear here
            </p>
          </div>
        </div>

        {/* Items summary */}
        <Card className="mb-6">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Your Order</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {ITEMS.map((item) => (
              <div key={item.name} className="flex items-center justify-between text-sm">
                <span>
                  <span className="font-medium">{item.qty}×</span> {item.name}
                </span>
                <span className="text-muted-foreground">
                  {formatCurrency(item.qty * item.unitPrice)}
                </span>
              </div>
            ))}
            <Separator />
            <div className="flex justify-between text-sm font-semibold">
              <span>Total</span>
              <span>{formatCurrency(total)}</span>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button
            className="flex-1 gap-2"
            variant="outline"
            disabled
            title="Call driver feature coming soon"
          >
            <Phone className="h-4 w-4" /> Call driver
          </Button>
          <Button asChild className="flex-1 gap-2 bg-amber-600 hover:bg-amber-700 text-white">
            <Link href="/contact">
              <HelpCircle className="h-4 w-4" /> Contact support
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
