"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Printer, User, MapPin, Clock } from "lucide-react";
import { toast } from "react-toastify";

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

// ── Types & constants ─────────────────────────────────────────────────────────

type OrderStatus =
  | "Pending"
  | "Confirmed"
  | "In Preparation"
  | "Out for Delivery"
  | "Delivered";

const STATUSES: OrderStatus[] = [
  "Pending",
  "Confirmed",
  "In Preparation",
  "Out for Delivery",
  "Delivered",
];

const STATUS_BADGE: Record<OrderStatus, string> = {
  Pending: "bg-gray-100 text-gray-700",
  Confirmed: "bg-blue-100 text-blue-700",
  "In Preparation": "bg-amber-100 text-amber-700",
  "Out for Delivery": "bg-orange-100 text-orange-700",
  Delivered: "bg-green-100 text-green-700",
};

const LINE_ITEMS = [
  { name: "Chocolate Lava Cake", qty: 2, unitPrice: 8.5 },
  { name: "Salted Caramel Éclair", qty: 1, unitPrice: 5.0 },
  { name: "Raspberry Macaron Box (6)", qty: 1, unitPrice: 12.0 },
];

const TIMELINE_ENTRIES = [
  { label: "Order placed", time: "1:02 PM", note: "Customer placed the order." },
  { label: "Confirmed", time: "1:08 PM", note: "You confirmed the order." },
  { label: "In Preparation", time: "1:15 PM", note: "Marked as being prepared." },
];

// ── Page ─────────────────────────────────────────────────────────────────────

export default function BusinessOrderDetailPage() {
  const { id } = useParams<{ id: string }>();
  const orderId = `#ORD-${id}`;

  const [status, setStatus] = useState<OrderStatus>("In Preparation");
  const [selectedStatus, setSelectedStatus] = useState<OrderStatus>(status);
  const [updating, setUpdating] = useState(false);

  const subtotal = LINE_ITEMS.reduce((s, i) => s + i.qty * i.unitPrice, 0);
  const platformFee = subtotal * 0.1;
  const earnings = subtotal - platformFee;

  function handleUpdateStatus() {
    setUpdating(true);
    setTimeout(() => {
      setStatus(selectedStatus);
      setUpdating(false);
      toast.success(`Order status updated to "${selectedStatus}"`);
    }, 1000);
  }

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
          <Badge className={`${STATUS_BADGE[status]} border-0`}>{status}</Badge>
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
                SJ
              </div>
              <div className="text-sm space-y-0.5">
                <p className="font-medium text-base">Sarah Johnson</p>
                <p className="text-muted-foreground">sarah.johnson@email.com</p>
                <p className="text-muted-foreground">+1 (415) 555-0192</p>
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
                  {LINE_ITEMS.map((item) => (
                    <tr key={item.name}>
                      <td className="py-2.5 font-medium">{item.name}</td>
                      <td className="py-2.5 text-center text-muted-foreground">{item.qty}</td>
                      <td className="py-2.5 text-right text-muted-foreground">
                        {formatCurrency(item.unitPrice)}
                      </td>
                      <td className="py-2.5 text-right font-semibold">
                        {formatCurrency(item.qty * item.unitPrice)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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

          {/* Order notes */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Order Notes</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground italic">
              &ldquo;Please add extra caramel drizzle on the éclair if possible. Allergy note: no nuts.&rdquo;
            </CardContent>
          </Card>
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
                <Badge className={`${STATUS_BADGE[status]} border-0`}>{status}</Badge>
              </div>
              <Select
                value={selectedStatus}
                onValueChange={(v) => setSelectedStatus(v as OrderStatus)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {STATUSES.map((s) => (
                    <SelectItem key={s} value={s}>{s}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button
                className="w-full bg-amber-600 hover:bg-amber-700 text-white"
                onClick={handleUpdateStatus}
                disabled={updating || selectedStatus === status}
              >
                {updating ? "Updating…" : "Update status"}
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
                {TIMELINE_ENTRIES.map((entry, i) => (
                  <li key={i} className="flex gap-3 text-sm">
                    <span className="mt-0.5 h-2 w-2 rounded-full bg-amber-400 flex-shrink-0 mt-1.5" />
                    <div>
                      <p className="font-medium">{entry.label}</p>
                      <p className="text-muted-foreground text-xs">{entry.time} — {entry.note}</p>
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
