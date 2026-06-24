"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle,
  Download,
  DollarSign,
  TrendingUp,
  Package,
  Calendar,
} from "lucide-react";
import { toast } from "react-toastify";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/lib/currency";

// ---------------------------------------------------------------------------
// Mock data
// ---------------------------------------------------------------------------

type DeliveryRecord = {
  id: string;
  date: string;
  orderNum: string;
  area: string;
  distance: string;
  earnings: number;
  tip: number;
};

const allDeliveries: DeliveryRecord[] = [
  {
    id: "1",
    date: "Mon 23 Jun 2026",
    orderNum: "#ORD-4821",
    area: "Downtown",
    distance: "3.2 km",
    earnings: 8.5,
    tip: 1.5,
  },
  {
    id: "2",
    date: "Mon 23 Jun 2026",
    orderNum: "#ORD-4817",
    area: "Agdal",
    distance: "5.1 km",
    earnings: 10.0,
    tip: 2.0,
  },
  {
    id: "3",
    date: "Sun 22 Jun 2026",
    orderNum: "#ORD-4809",
    area: "Medina",
    distance: "2.8 km",
    earnings: 7.5,
    tip: 0.0,
  },
  {
    id: "4",
    date: "Sat 21 Jun 2026",
    orderNum: "#ORD-4798",
    area: "Hay Riad",
    distance: "6.4 km",
    earnings: 12.0,
    tip: 3.0,
  },
  {
    id: "5",
    date: "Wed 11 Jun 2026",
    orderNum: "#ORD-4712",
    area: "Souissi",
    distance: "4.0 km",
    earnings: 9.0,
    tip: 2.5,
  },
];

type PayoutRecord = {
  id: string;
  date: string;
  amount: number;
  status: "paid" | "processing";
};

const payouts: PayoutRecord[] = [
  { id: "p1", date: "Mon 16 Jun 2026", amount: 98.75, status: "paid" },
  { id: "p2", date: "Mon 9 Jun 2026", amount: 115.2, status: "paid" },
  { id: "p3", date: "Mon 2 Jun 2026", amount: 87.0, status: "paid" },
];

// ---------------------------------------------------------------------------
// Period filtering helpers
// ---------------------------------------------------------------------------

type Period = "week" | "month" | "3months" | "all";

function getFilteredDeliveries(period: Period): DeliveryRecord[] {
  // For demo purposes we just show subsets of the mock data
  if (period === "week") return allDeliveries.slice(0, 4);
  if (period === "month") return allDeliveries;
  if (period === "3months") return allDeliveries;
  return allDeliveries;
}

function sumField(records: DeliveryRecord[], field: "earnings" | "tip") {
  return records.reduce((acc, r) => acc + r[field], 0);
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function EarningsPage() {
  const [period, setPeriod] = useState<Period>("week");

  const filteredDeliveries = getFilteredDeliveries(period);
  const totalEarnings = sumField(filteredDeliveries, "earnings");
  const totalTips = sumField(filteredDeliveries, "tip");
  const grandTotal = totalEarnings + totalTips;

  const weekDeliveries = getFilteredDeliveries("week");
  const monthDeliveries = getFilteredDeliveries("month");
  const weekTotal = sumField(weekDeliveries, "earnings") + sumField(weekDeliveries, "tip");
  const monthTotal = sumField(monthDeliveries, "earnings") + sumField(monthDeliveries, "tip");

  const lifetimeTotal = allDeliveries.reduce(
    (acc, r) => acc + r.earnings + r.tip,
    0
  ) + payouts.reduce((acc, p) => acc + p.amount, 0);

  function handleDownload() {
    toast.info("Coming soon — statement download will be available shortly.");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">

        {/* Back link */}
        <Link
          href="/delivery-provider/dashboard"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-gray-900 transition-colors mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Link>

        {/* Page header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Earnings</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Your complete earnings history and payout schedule
          </p>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          <Card className="border-l-4 border-l-amber-500">
            <CardContent className="pt-4 pb-4">
              <div className="flex items-center gap-2 mb-1">
                <DollarSign className="h-4 w-4 text-amber-600" />
                <p className="text-xs text-muted-foreground font-medium">This Week</p>
              </div>
              <p className="text-2xl font-bold text-gray-900">
                {formatCurrency(weekTotal)}
              </p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-green-500">
            <CardContent className="pt-4 pb-4">
              <div className="flex items-center gap-2 mb-1">
                <Calendar className="h-4 w-4 text-green-600" />
                <p className="text-xs text-muted-foreground font-medium">This Month</p>
              </div>
              <p className="text-2xl font-bold text-gray-900">
                {formatCurrency(monthTotal)}
              </p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-blue-500">
            <CardContent className="pt-4 pb-4">
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp className="h-4 w-4 text-blue-600" />
                <p className="text-xs text-muted-foreground font-medium">Lifetime</p>
              </div>
              <p className="text-2xl font-bold text-gray-900">
                {formatCurrency(lifetimeTotal)}
              </p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-orange-500">
            <CardContent className="pt-4 pb-4">
              <div className="flex items-center gap-2 mb-1">
                <Package className="h-4 w-4 text-orange-600" />
                <p className="text-xs text-muted-foreground font-medium">Deliveries</p>
              </div>
              <p className="text-2xl font-bold text-gray-900">
                {allDeliveries.length + 18}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Next payout banner */}
        <div className="flex items-center gap-3 bg-amber-50 border border-amber-200 rounded-lg px-4 py-3 mb-8">
          <CheckCircle className="h-5 w-5 text-amber-600 flex-shrink-0" />
          <p className="text-sm font-medium text-amber-800">
            Next payout: <span className="font-bold">Monday 30 June</span>
            &nbsp;&middot;&nbsp;Estimated{" "}
            <span className="font-bold">{formatCurrency(142.5)}</span>
          </p>
        </div>

        {/* Earnings breakdown with period tabs */}
        <Card className="mb-8">
          <CardHeader className="flex flex-row items-center justify-between gap-4 flex-wrap">
            <CardTitle className="text-base">Earnings Breakdown</CardTitle>
            <Button
              variant="outline"
              size="sm"
              onClick={handleDownload}
              className="gap-2 text-xs"
            >
              <Download className="h-3.5 w-3.5" />
              Download Statement
            </Button>
          </CardHeader>

          <CardContent className="px-0 pb-0">
            {/* Period tabs */}
            <div className="px-6 mb-4">
              <Tabs
                value={period}
                onValueChange={(v) => setPeriod(v as Period)}
              >
                <TabsList className="grid grid-cols-4 w-full sm:w-auto">
                  <TabsTrigger value="week" className="text-xs sm:text-sm">
                    This Week
                  </TabsTrigger>
                  <TabsTrigger value="month" className="text-xs sm:text-sm">
                    This Month
                  </TabsTrigger>
                  <TabsTrigger value="3months" className="text-xs sm:text-sm">
                    3 Months
                  </TabsTrigger>
                  <TabsTrigger value="all" className="text-xs sm:text-sm">
                    All Time
                  </TabsTrigger>
                </TabsList>

                {/* Desktop table */}
                <TabsContent value={period} className="mt-4">
                  <div className="hidden sm:block">
                    <div className="grid grid-cols-7 gap-3 px-1 pb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      <span className="col-span-2">Date</span>
                      <span>Order #</span>
                      <span>Area</span>
                      <span>Distance</span>
                      <span className="text-right">Earnings</span>
                      <span className="text-right">Tip</span>
                    </div>
                    <Separator />
                    <div className="divide-y">
                      {filteredDeliveries.map((r) => (
                        <div
                          key={r.id}
                          className="grid grid-cols-7 gap-3 py-3 px-1 text-sm items-center"
                        >
                          <span className="col-span-2 text-muted-foreground">{r.date}</span>
                          <span className="font-medium text-gray-800">{r.orderNum}</span>
                          <span className="text-gray-700">{r.area}</span>
                          <span className="text-gray-600">{r.distance}</span>
                          <span className="text-right text-gray-900">
                            {formatCurrency(r.earnings)}
                          </span>
                          <span className={`text-right font-medium ${r.tip > 0 ? "text-green-700" : "text-gray-400"}`}>
                            {r.tip > 0 ? `+${formatCurrency(r.tip)}` : "—"}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Totals row */}
                    <Separator />
                    <div className="grid grid-cols-7 gap-3 py-3 px-1 text-sm font-bold text-gray-900">
                      <span className="col-span-4">Total ({filteredDeliveries.length} deliveries)</span>
                      <span />
                      <span className="text-right">{formatCurrency(totalEarnings)}</span>
                      <span className="text-right text-green-700">+{formatCurrency(totalTips)}</span>
                    </div>
                    <div className="bg-amber-50 rounded-b-lg px-1 py-3">
                      <div className="grid grid-cols-7 gap-3 text-sm">
                        <span className="col-span-6 text-right font-semibold text-amber-800">
                          Grand Total
                        </span>
                        <span className="text-right font-bold text-amber-900 text-base">
                          {formatCurrency(grandTotal)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Mobile cards */}
                  <div className="sm:hidden divide-y">
                    {filteredDeliveries.map((r) => (
                      <div key={r.id} className="py-4 px-4">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-muted-foreground">{r.date}</span>
                          <span className="text-sm font-bold text-gray-900">
                            {formatCurrency(r.earnings + r.tip)}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-800">
                            {r.orderNum} &middot; {r.area}
                          </span>
                          {r.tip > 0 && (
                            <span className="text-xs text-green-700">
                              +{formatCurrency(r.tip)} tip
                            </span>
                          )}
                        </div>
                        <span className="text-xs text-muted-foreground">{r.distance}</span>
                      </div>
                    ))}

                    {/* Mobile total */}
                    <div className="bg-amber-50 px-4 py-3 rounded-b-lg">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-amber-800">
                          Total ({filteredDeliveries.length} deliveries)
                        </span>
                        <span className="text-base font-bold text-amber-900">
                          {formatCurrency(grandTotal)}
                        </span>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </CardContent>
        </Card>

        {/* Payout history */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Previous Payouts</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y">
              {payouts.map((p) => (
                <div
                  key={p.id}
                  className="flex items-center justify-between px-6 py-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{p.date}</p>
                      <p className="text-xs text-muted-foreground">Weekly payout</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold text-gray-900">
                      {formatCurrency(p.amount)}
                    </span>
                    {p.status === "paid" ? (
                      <Badge className="bg-green-100 text-green-800 border-green-200 text-xs">
                        Paid
                      </Badge>
                    ) : (
                      <Badge className="bg-amber-100 text-amber-800 border-amber-200 text-xs">
                        Processing
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
