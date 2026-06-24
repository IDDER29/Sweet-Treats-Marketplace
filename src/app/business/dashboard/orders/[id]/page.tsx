"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Printer, User, MapPin, Clock } from "lucide-react";
import { toast } from "react-toastify";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import DashboardShell from "@/components/business/dashboard/DashboardShell";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatCurrency } from "@/lib/currency";
import { LoadingState } from "@/components/feedback/LoadingState";
import { ErrorState } from "@/components/feedback/ErrorState";
import { getOrderById, updateOrderStatus } from "@/services/orders";
import type { OrderStatus } from "@/types";

// ── Constants ─────────────────────────────────────────────────────────────────

const STATUS_DISPLAY: Record<string, string> = {
  pending: "Pending",
  confirmed: "Confirmed",
  preparing: "Preparing",
  out_for_delivery: "Out for Delivery",
  delivered: "Delivered",
  cancelled: "Cancelled",
};

const DISPLAY_STATUSES = [
  "pending",
  "confirmed",
  "preparing",
  "out_for_delivery",
  "delivered",
];

const STATUS_BADGE: Record<string, string> = {
  pending: "bg-gray-100 text-gray-700",
  confirmed: "bg-blue-100 text-blue-700",
  preparing: "bg-amber-100 text-amber-700",
  out_for_delivery: "bg-orange-100 text-orange-700",
  delivered: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
};

// ── Timeline helpers ──────────────────────────────────────────────────────────

const STATUS_ORDER = [
  "pending",
  "confirmed",
  "preparing",
  "out_for_delivery",
  "delivered",
];

function buildTimeline(createdAt: string, currentStatus: string) {
  const createdDate = new Date(createdAt);
  const statusIndex = STATUS_ORDER.indexOf(currentStatus);

  return STATUS_ORDER.slice(0, Math.max(statusIndex + 1, 1)).map(
    (status, i) => {
      const offsetMinutes = [0, 6, 13, 30, 60][i] ?? i * 10;
      const time = new Date(createdDate.getTime() + offsetMinutes * 60_000);
      const label = STATUS_DISPLAY[status] ?? status;

      const notes: Record<string, string> = {
        pending: "Customer placed the order.",
        confirmed: "You confirmed the order.",
        preparing: "Marked as being prepared.",
        out_for_delivery: "Handed off to delivery.",
        delivered: "Order delivered successfully.",
      };

      return {
        label,
        time: time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        note: notes[status] ?? "",
      };
    }
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function BusinessOrderDetailPage() {
  const { id } = useParams<{ id: string }>();
  const queryClient = useQueryClient();

  const {
    data: order,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["business-order", id],
    queryFn: () => getOrderById(id),
    enabled: !!id,
  });

  const [selectedStatus, setSelectedStatus] = useState<string>("");

  // Keep selectedStatus in sync with loaded order status (only on first load)
  const currentStatus = order?.status ?? "pending";
  const effectiveSelected = selectedStatus || currentStatus;

  const updateMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      updateOrderStatus(id, status as OrderStatus),
    onSuccess: (updatedOrder) => {
      queryClient.setQueryData(["business-order", id], updatedOrder);
      toast.success("Order status updated");
    },
    onError: () => toast.error("Failed to update status"),
  });

  const orderId = order?.number ? `#${order.number}` : `#ORD-${id}`;

  if (isLoading) {
    return (
      <DashboardShell title="Order Details">
        <LoadingState rows={4} />
      </DashboardShell>
    );
  }

  if (isError || !order) {
    return (
      <DashboardShell title="Order Details">
        <ErrorState onRetry={refetch} />
      </DashboardShell>
    );
  }

  const subtotal = order.subtotal;
  const platformFee = subtotal * 0.1;
  const earnings = subtotal - platformFee;
  const timeline = buildTimeline(order.createdAt, currentStatus);
  const addr = order.shippingAddress;

  return (
    <DashboardShell title={`Order ${orderId}`}>
      {/* Header actions */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Button asChild variant="ghost" size="sm" className="text-muted-foreground -ml-2">
            <Link href="/business/dashboard/orders">
              <ArrowLeft className="mr-1 h-4 w-4" /> Back to orders
            </Link>
          </Button>
          <Badge className={`${STATUS_BADGE[currentStatus] ?? "bg-gray-100 text-gray-700"} border-0`}>
            {STATUS_DISPLAY[currentStatus] ?? currentStatus}
          </Badge>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => window.print()}
          className="gap-2"
        >
          <Printer className="h-4 w-4" /> Print order
        </Button>
      </div>

      {/* Two-column layout */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* ── Left column (2/3) ── */}
        <div className="space-y-6 lg:col-span-2">
          {/* Customer info */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <User className="h-4 w-4 text-amber-600" /> Customer
              </CardTitle>
            </CardHeader>
            <CardContent className="flex items-start gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100 text-amber-700 font-bold text-sm flex-shrink-0">
                {order.customerId ? order.customerId.slice(-2).toUpperCase() : "?"}
              </div>
              <div className="text-sm space-y-0.5">
                <p className="font-medium text-base">
                  Customer #{order.customerId?.slice(-6) ?? "—"}
                </p>
                <p className="text-muted-foreground text-xs italic">
                  Contact via support for customer details
                </p>
                {order.shippingAddress?.phone && (
                  <p className="text-muted-foreground">{order.shippingAddress.phone}</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Items table */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Order Items</CardTitle>
            </CardHeader>
            <CardContent>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-muted-foreground">
                    <th className="pb-2 text-left font-medium">Product</th>
                    <th className="pb-2 text-center font-medium">Qty</th>
                    <th className="pb-2 text-right font-medium">Unit price</th>
                    <th className="pb-2 text-right font-medium">Subtotal</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {order.items.map((item) => (
                    <tr key={item.productId}>
                      <td className="py-2.5 font-medium">{item.name}</td>
                      <td className="py-2.5 text-center text-muted-foreground">{item.quantity}</td>
                      <td className="py-2.5 text-right text-muted-foreground">
                        {formatCurrency(item.price)}
                      </td>
                      <td className="py-2.5 text-right font-semibold">
                        {formatCurrency(item.price * item.quantity)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Order totals */}
              <div className="mt-4 border-t pt-4 space-y-1.5 text-sm">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span>{formatCurrency(order.subtotal)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Delivery fee</span>
                  <span>{formatCurrency(order.deliveryFee)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Tax</span>
                  <span>{formatCurrency(order.tax)}</span>
                </div>
                <Separator className="my-1" />
                <div className="flex justify-between font-semibold text-base">
                  <span>Total</span>
                  <span>{formatCurrency(order.total)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Delivery address */}
          {addr && (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-amber-600" /> Delivery Address
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-0.5">
                {addr.fullName && (
                  <p className="font-medium text-foreground">{addr.fullName}</p>
                )}
                <p>{addr.line1}</p>
                {addr.line2 && <p>{addr.line2}</p>}
                <p>
                  {[addr.city, addr.state, addr.postalCode]
                    .filter(Boolean)
                    .join(", ")}
                </p>
                {addr.country && <p>{addr.country}</p>}
                {addr.instructions && (
                  <p className="mt-1 italic text-xs">&ldquo;{addr.instructions}&rdquo;</p>
                )}
              </CardContent>
            </Card>
          )}

          {/* Payment method */}
          {order.paymentMethod && (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Payment</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground capitalize">
                {order.paymentMethod}
              </CardContent>
            </Card>
          )}
        </div>

        {/* ── Right column (1/3) ── */}
        <div className="space-y-4">
          {/* Status update */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Update Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <span className="text-muted-foreground">Current:</span>
                <Badge className={`${STATUS_BADGE[currentStatus] ?? "bg-gray-100 text-gray-700"} border-0`}>
                  {STATUS_DISPLAY[currentStatus] ?? currentStatus}
                </Badge>
              </div>
              <Select
                value={effectiveSelected}
                onValueChange={setSelectedStatus}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {DISPLAY_STATUSES.map((s) => (
                    <SelectItem key={s} value={s}>
                      {STATUS_DISPLAY[s]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button
                className="w-full bg-amber-600 hover:bg-amber-700 text-white"
                onClick={() =>
                  updateMutation.mutate({ id, status: effectiveSelected })
                }
                disabled={
                  updateMutation.isPending || effectiveSelected === currentStatus
                }
              >
                {updateMutation.isPending ? "Updating…" : "Update status"}
              </Button>
            </CardContent>
          </Card>

          {/* Revenue card */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Revenue</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Order subtotal</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex justify-between text-red-500">
                <span>Platform fee (10%)</span>
                <span>−{formatCurrency(platformFee)}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-semibold text-green-700">
                <span>Your earnings</span>
                <span>{formatCurrency(earnings)}</span>
              </div>
            </CardContent>
          </Card>

          {/* Status timeline */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Clock className="h-4 w-4 text-amber-600" /> Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="space-y-3">
                {timeline.map((entry, i) => (
                  <li key={i} className="flex gap-3 text-sm">
                    <span className="mt-1.5 h-2 w-2 rounded-full bg-amber-400 flex-shrink-0" />
                    <div>
                      <p className="font-medium">{entry.label}</p>
                      <p className="text-muted-foreground text-xs">
                        {entry.time} — {entry.note}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardShell>
  );
}
