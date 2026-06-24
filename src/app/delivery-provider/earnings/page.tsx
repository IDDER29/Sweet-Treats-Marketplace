"use client";

import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle,
  Download,
  DollarSign,
  TrendingUp,
  Package,
  Calendar,
  Truck,
} from "lucide-react";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";

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
import { LoadingState } from "@/components/feedback/LoadingState";
import { ErrorState } from "@/components/feedback/ErrorState";
import { EmptyState } from "@/components/feedback/EmptyState";
import { formatCurrency } from "@/lib/currency";
import { getServerApi } from "@/lib/api-client";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type Period = "week" | "month" | "3months" | "all";

interface DeliveryRecord {
  id: string;
  date: string;
  orderNum: string;
  area: string;
  distance: string;
  earnings: number;
  tip: number;
}

interface PayoutRecord {
  id: string;
  date: string;
  amount: number;
  status: "paid" | "processing";
}

interface EarningsSummary {
  weekTotal: number;
  monthTotal: number;
  lifetimeTotal: number;
  totalDeliveries: number;
  nextPayoutDate?: string;
  nextPayoutAmount?: number;
  deliveries: DeliveryRecord[];
  payouts: PayoutRecord[];
}

// ---------------------------------------------------------------------------
// Service
// ---------------------------------------------------------------------------

async function getDriverEarnings(): Promise<EarningsSummary> {
  const api = await getServerApi();
  const { data } = await api.get<EarningsSummary>("/driver/earnings");
  return {
    weekTotal: data?.weekTotal ?? 0,
    monthTotal: data?.monthTotal ?? 0,
    lifetimeTotal: data?.lifetimeTotal ?? 0,
    totalDeliveries: data?.totalDeliveries ?? 0,
    nextPayoutDate: data?.nextPayoutDate,
    nextPayoutAmount: data?.nextPayoutAmount,
    deliveries: Array.isArray(data?.deliveries) ? data.deliveries : [],
    payouts: Array.isArray(data?.payouts) ? data.payouts : [],
  };
}

function filterDeliveries(deliveries: DeliveryRecord[], period: Period): DeliveryRecord[] {
  if (!deliveries.length) return [];
  const now = Date.now();
  const MS = { week: 7, month: 30, "3months": 90 };
  if (period === "all") return deliveries;
  const cutoff = now - MS[period] * 86400000;
  return deliveries.filter((d) => new Date(d.date).getTime() >= cutoff);
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function EarningsPage() {
  const { data, isLoading, isError, refetch } = useQuery<EarningsSummary>({
    queryKey: ["driver-earnings"],
    queryFn: getDriverEarnings,
  });

  function handleDownload() {
    toast.info("Coming soon — statement download will be available shortly.");
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <Link
            href="/delivery-provider/dashboard"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-gray-900 transition-colors mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 mb-8">Earnings</h1>
          <LoadingState rows={4} />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <Link
            href="/delivery-provider/dashboard"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-gray-900 transition-colors mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>
          <ErrorState onRetry={refetch} />
        </div>
      </div>
    );
  }

  const summary = data!;
  const deliveries = summary.deliveries;
  const payouts = summary.payouts;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">

        <Link
          href="/delivery-provider/dashboard"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-gray-900 transition-colors mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Link>

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
                {formatCurrency(summary.weekTotal)}
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
                {formatCurrency(summary.monthTotal)}
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
                {formatCurrency(summary.lifetimeTotal)}
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
                {summary.totalDeliveries}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Next payout banner */}
        {summary.nextPayoutDate && (
          <div className="flex items-center gap-3 bg-amber-50 border border-amber-200 rounded-lg px-4 py-3 mb-8">
            <CheckCircle className="h-5 w-5 text-amber-600 flex-shrink-0" />
            <p className="text-sm font-medium text-amber-800">
              Next payout:{" "}
              <span className="font-bold">
                {new Date(summary.nextPayoutDate).toLocaleDateString("en-US", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                })}
              </span>
              {summary.nextPayoutAmount != null && (
                <>
                  &nbsp;&middot;&nbsp;Estimated{" "}
                  <span className="font-bold">{formatCurrency(summary.nextPayoutAmount)}</span>
                </>
              )}
            </p>
          </div>
        )}

        {/* Earnings breakdown */}
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
            <div className="px-6 mb-4">
              <Tabs defaultValue="week">
                <TabsList className="grid grid-cols-4 w-full sm:w-auto">
                  <TabsTrigger value="week" className="text-xs sm:text-sm">This Week</TabsTrigger>
                  <TabsTrigger value="month" className="text-xs sm:text-sm">This Month</TabsTrigger>
                  <TabsTrigger value="3months" className="text-xs sm:text-sm">3 Months</TabsTrigger>
                  <TabsTrigger value="all" className="text-xs sm:text-sm">All Time</TabsTrigger>
                </TabsList>

                {(["week", "month", "3months", "all"] as Period[]).map((period) => {
                  const filtered = filterDeliveries(deliveries, period);
                  const totalEarnings = filtered.reduce((s, r) => s + r.earnings, 0);
                  const totalTips = filtered.reduce((s, r) => s + r.tip, 0);
                  const grandTotal = totalEarnings + totalTips;

                  return (
                    <TabsContent key={period} value={period} className="mt-4">
                      {filtered.length === 0 ? (
                        <div className="py-8">
                          <EmptyState
                            icon={<Truck className="h-8 w-8" />}
                            title="No deliveries yet"
                            message="Complete your first delivery to see your earnings here."
                          />
                        </div>
                      ) : (
                        <>
                          {/* Desktop table */}
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
                              {filtered.map((r) => (
                                <div key={r.id} className="grid grid-cols-7 gap-3 py-3 px-1 text-sm items-center">
                                  <span className="col-span-2 text-muted-foreground">{r.date}</span>
                                  <span className="font-medium text-gray-800">{r.orderNum}</span>
                                  <span className="text-gray-700">{r.area}</span>
                                  <span className="text-gray-600">{r.distance}</span>
                                  <span className="text-right text-gray-900">{formatCurrency(r.earnings)}</span>
                                  <span className={`text-right font-medium ${r.tip > 0 ? "text-green-700" : "text-gray-400"}`}>
                                    {r.tip > 0 ? `+${formatCurrency(r.tip)}` : "—"}
                                  </span>
                                </div>
                              ))}
                            </div>
                            <Separator />
                            <div className="grid grid-cols-7 gap-3 py-3 px-1 text-sm font-bold text-gray-900">
                              <span className="col-span-4">Total ({filtered.length} deliveries)</span>
                              <span />
                              <span className="text-right">{formatCurrency(totalEarnings)}</span>
                              <span className="text-right text-green-700">+{formatCurrency(totalTips)}</span>
                            </div>
                            <div className="bg-amber-50 rounded-b-lg px-1 py-3">
                              <div className="grid grid-cols-7 gap-3 text-sm">
                                <span className="col-span-6 text-right font-semibold text-amber-800">Grand Total</span>
                                <span className="text-right font-bold text-amber-900 text-base">{formatCurrency(grandTotal)}</span>
                              </div>
                            </div>
                          </div>

                          {/* Mobile cards */}
                          <div className="sm:hidden divide-y">
                            {filtered.map((r) => (
                              <div key={r.id} className="py-4 px-4">
                                <div className="flex items-center justify-between mb-1">
                                  <span className="text-xs text-muted-foreground">{r.date}</span>
                                  <span className="text-sm font-bold text-gray-900">{formatCurrency(r.earnings + r.tip)}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                  <span className="text-sm font-medium text-gray-800">{r.orderNum} &middot; {r.area}</span>
                                  {r.tip > 0 && (
                                    <span className="text-xs text-green-700">+{formatCurrency(r.tip)} tip</span>
                                  )}
                                </div>
                                <span className="text-xs text-muted-foreground">{r.distance}</span>
                              </div>
                            ))}
                            <div className="bg-amber-50 px-4 py-3 rounded-b-lg">
                              <div className="flex items-center justify-between">
                                <span className="text-sm font-semibold text-amber-800">Total ({filtered.length} deliveries)</span>
                                <span className="text-base font-bold text-amber-900">{formatCurrency(grandTotal)}</span>
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                    </TabsContent>
                  );
                })}
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
            {payouts.length === 0 ? (
              <div className="py-8">
                <EmptyState
                  icon={<DollarSign className="h-8 w-8" />}
                  title="No payouts yet"
                  message="Your payout history will appear here once you start earning."
                />
              </div>
            ) : (
              <div className="divide-y">
                {payouts.map((p) => (
                  <div key={p.id} className="flex items-center justify-between px-6 py-4">
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
                      <span className="text-sm font-bold text-gray-900">{formatCurrency(p.amount)}</span>
                      {p.status === "paid" ? (
                        <Badge className="bg-green-100 text-green-800 border-green-200 text-xs">Paid</Badge>
                      ) : (
                        <Badge className="bg-amber-100 text-amber-800 border-amber-200 text-xs">Processing</Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
