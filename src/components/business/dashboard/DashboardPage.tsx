"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import {
  BarChart as BarChartIcon,
  ShoppingBag,
  Truck,
  Package,
  Menu,
  Plus,
  Settings,
  TrendingUp,
  Bell,
  FileText,
  ChevronRight,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { LoadingState } from "@/components/feedback/LoadingState";
import { ErrorState } from "@/components/feedback/ErrorState";
import { EmptyState } from "@/components/feedback/EmptyState";
import { formatCurrency } from "@/lib/currency";
import { orderStatusLabel, orderStatusVariant } from "@/lib/order-status";
import {
  getDashboardSummary,
  type DashboardMetric,
} from "@/services/analytics";
import DashboardSidbar from "./DashboardSidbar";

const ADD_PRODUCT_HREF = "/business/dashboard/products/add";
const ORDERS_HREF = "/business/dashboard/orders";

function MetricCard({
  title,
  icon,
  metric,
  format = "number",
  borderColor,
  iconBg,
}: {
  title: string;
  icon: React.ReactNode;
  metric: DashboardMetric;
  format?: "number" | "currency";
  borderColor: string;
  iconBg: string;
}) {
  const value =
    format === "currency"
      ? formatCurrency(metric.value)
      : metric.value.toLocaleString();

  const change =
    metric.changeLabel ??
    (typeof metric.changePercent === "number"
      ? `${metric.changePercent > 0 ? "+" : ""}${metric.changePercent}% from last month`
      : null);

  return (
    <Card className={`border-l-4 ${borderColor}`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <div className={`flex items-center justify-center w-9 h-9 rounded-lg ${iconBg}`}>
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold tracking-tight">{value}</div>
        {change && (
          <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
            <TrendingUp className="h-3 w-3" />
            {change}
          </p>
        )}
      </CardContent>
    </Card>
  );
}

export default function DashboardPage() {
  const [search, setSearch] = useState<string>("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifNewOrder, setNotifNewOrder] = useState(true);
  const [notifLowStock, setNotifLowStock] = useState(true);
  const [notifPromo, setNotifPromo] = useState(false);

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["dashboard-summary"],
    queryFn: () => getDashboardSummary(),
  });

  const recentOrders = useMemo(() => {
    const orders = data?.recentOrders ?? [];
    const q = search.trim().toLowerCase();
    if (!q) return orders;
    return orders.filter(
      (o) =>
        (o.number ?? o.id).toLowerCase().includes(q) ||
        o.status.toLowerCase().includes(q)
    );
  }, [data?.recentOrders, search]);

  return (
    <div className="flex h-screen overflow-hidden">
      <DashboardSidbar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      {/* Main content */}
      <main className="flex-1 overflow-y-auto bg-gray-50">
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          {/* Header */}
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Welcome back 👋</h1>
              <p className="text-sm text-muted-foreground mt-0.5">
                Here&apos;s what&apos;s happening with your store today.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="icon"
                className="lg:hidden"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="h-6 w-6" />
              </Button>
              <Input
                type="search"
                placeholder="Search recent orders..."
                className="w-56 hidden sm:block"
                value={search}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setSearch(e.target.value)
                }
              />
            </div>
          </div>

          {isLoading && <LoadingState rows={4} />}

          {isError && (
            <ErrorState
              title="Couldn't load dashboard"
              message="We couldn't fetch your store metrics. Please try again."
              onRetry={() => refetch()}
            />
          )}

          {!isLoading && !isError && data && (
            <>
              {/* Metric Cards */}
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
                <MetricCard
                  title="Total Revenue"
                  icon={<BarChartIcon className="h-4 w-4 text-amber-600" />}
                  metric={data.totalRevenue}
                  format="currency"
                  borderColor="border-l-amber-500"
                  iconBg="bg-amber-50"
                />
                <MetricCard
                  title="Orders"
                  icon={<ShoppingBag className="h-4 w-4 text-blue-600" />}
                  metric={data.totalOrders}
                  borderColor="border-l-blue-500"
                  iconBg="bg-blue-50"
                />
                <MetricCard
                  title="Products"
                  icon={<Package className="h-4 w-4 text-green-600" />}
                  metric={data.totalProducts}
                  borderColor="border-l-green-500"
                  iconBg="bg-green-50"
                />
                <MetricCard
                  title="Active Deliveries"
                  icon={<Truck className="h-4 w-4 text-orange-600" />}
                  metric={data.activeDeliveries}
                  borderColor="border-l-orange-500"
                  iconBg="bg-orange-50"
                />
              </div>

              {/* Quick Actions */}
              <div className="mb-6">
                <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
                  Quick Actions
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <Button
                    asChild
                    variant="outline"
                    className="h-auto py-4 flex-col gap-2 border-dashed hover:border-amber-400 hover:bg-amber-50 transition-colors"
                  >
                    <Link href={ADD_PRODUCT_HREF}>
                      <Plus className="h-5 w-5 text-amber-600" />
                      <span className="text-sm font-medium">Add Product</span>
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="h-auto py-4 flex-col gap-2 border-dashed hover:border-blue-400 hover:bg-blue-50 transition-colors"
                  >
                    <Link href={ORDERS_HREF}>
                      <ShoppingBag className="h-5 w-5 text-blue-600" />
                      <span className="text-sm font-medium">View Orders</span>
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="h-auto py-4 flex-col gap-2 border-dashed hover:border-green-400 hover:bg-green-50 transition-colors"
                  >
                    <Link href="/business/dashboard/sales">
                      <TrendingUp className="h-5 w-5 text-green-600" />
                      <span className="text-sm font-medium">View Sales</span>
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="h-auto py-4 flex-col gap-2 border-dashed hover:border-purple-400 hover:bg-purple-50 transition-colors"
                  >
                    <Link href="/business/settings">
                      <Settings className="h-5 w-5 text-purple-600" />
                      <span className="text-sm font-medium">Settings</span>
                    </Link>
                  </Button>
                </div>
              </div>

              {/* Tabs */}
              <div className="mb-6">
                <Tabs defaultValue="overview">
                  <TabsList className="mb-4">
                    <TabsTrigger value="overview" className="gap-2">
                      <BarChartIcon className="h-4 w-4" />
                      Overview
                    </TabsTrigger>
                    <TabsTrigger value="analytics" className="gap-2">
                      <TrendingUp className="h-4 w-4" />
                      Analytics
                    </TabsTrigger>
                    <TabsTrigger value="reports" className="gap-2">
                      <FileText className="h-4 w-4" />
                      Reports
                    </TabsTrigger>
                    <TabsTrigger value="notifications" className="gap-2">
                      <Bell className="h-4 w-4" />
                      Notifications
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview">
                    <Card>
                      <CardHeader>
                        <CardTitle>Sales Overview</CardTitle>
                      </CardHeader>
                      <CardContent>
                        {data.salesTrend.length === 0 ? (
                          <EmptyState
                            title="No sales data yet"
                            message="Once you start receiving orders, your sales trend will appear here."
                          />
                        ) : (
                          <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={data.salesTrend}>
                              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                              <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                              <YAxis tick={{ fontSize: 12 }} />
                              <Tooltip />
                              <Line
                                type="monotone"
                                dataKey="revenue"
                                stroke="#f59e0b"
                                strokeWidth={2}
                                dot={false}
                              />
                            </LineChart>
                          </ResponsiveContainer>
                        )}
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="analytics">
                    <Card>
                      <CardHeader>
                        <CardTitle>Analytics</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="mb-6 text-sm text-muted-foreground">
                          Detailed sales and conversion analytics for your store.
                        </p>
                        <div className="grid sm:grid-cols-3 gap-4 mb-6">
                          <div className="rounded-lg border bg-gray-50 p-4 text-center">
                            <p className="text-xs text-muted-foreground mb-1">Conversion Rate</p>
                            <p className="text-2xl font-bold text-gray-900">—</p>
                          </div>
                          <div className="rounded-lg border bg-gray-50 p-4 text-center">
                            <p className="text-xs text-muted-foreground mb-1">Avg. Order Value</p>
                            <p className="text-2xl font-bold text-gray-900">—</p>
                          </div>
                          <div className="rounded-lg border bg-gray-50 p-4 text-center">
                            <p className="text-xs text-muted-foreground mb-1">Repeat Customers</p>
                            <p className="text-2xl font-bold text-gray-900">—</p>
                          </div>
                        </div>
                        <Button asChild variant="outline">
                          <Link href="/business/dashboard/sales" className="flex items-center gap-2">
                            View full sales analytics
                            <ChevronRight className="h-4 w-4" />
                          </Link>
                        </Button>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="reports">
                    <Card>
                      <CardHeader>
                        <CardTitle>Reports</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="mb-6 text-sm text-muted-foreground">
                          Review delivery performance and order history.
                        </p>
                        <div className="grid sm:grid-cols-2 gap-3">
                          <Link
                            href="/business/dashboard/delivery"
                            className="flex items-center justify-between rounded-lg border p-4 hover:bg-gray-50 transition-colors group"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 rounded-lg bg-orange-50 flex items-center justify-center">
                                <Truck className="h-4 w-4 text-orange-600" />
                              </div>
                              <div>
                                <p className="text-sm font-medium">Delivery Report</p>
                                <p className="text-xs text-muted-foreground">Routes &amp; performance</p>
                              </div>
                            </div>
                            <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:translate-x-0.5 transition-transform" />
                          </Link>
                          <Link
                            href={ORDERS_HREF}
                            className="flex items-center justify-between rounded-lg border p-4 hover:bg-gray-50 transition-colors group"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center">
                                <ShoppingBag className="h-4 w-4 text-blue-600" />
                              </div>
                              <div>
                                <p className="text-sm font-medium">Orders Report</p>
                                <p className="text-xs text-muted-foreground">History &amp; trends</p>
                              </div>
                            </div>
                            <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:translate-x-0.5 transition-transform" />
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="notifications">
                    <Card>
                      <CardHeader>
                        <CardTitle>Notification Preferences</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-0">
                        <p className="text-sm text-muted-foreground mb-5">
                          Control which alerts you receive about your store activity.
                        </p>
                        <div className="space-y-1">
                          <div className="flex items-center justify-between py-4 border-b">
                            <div>
                              <Label htmlFor="notif-new-order" className="text-sm font-medium">New Order Alerts</Label>
                              <p className="text-xs text-muted-foreground mt-0.5">Get notified when a customer places an order</p>
                            </div>
                            <Switch
                              id="notif-new-order"
                              checked={notifNewOrder}
                              onCheckedChange={setNotifNewOrder}
                            />
                          </div>
                          <div className="flex items-center justify-between py-4 border-b">
                            <div>
                              <Label htmlFor="notif-low-stock" className="text-sm font-medium">Low Stock Alerts</Label>
                              <p className="text-xs text-muted-foreground mt-0.5">Alert when a product is running low on inventory</p>
                            </div>
                            <Switch
                              id="notif-low-stock"
                              checked={notifLowStock}
                              onCheckedChange={setNotifLowStock}
                            />
                          </div>
                          <div className="flex items-center justify-between py-4">
                            <div>
                              <Label htmlFor="notif-promo" className="text-sm font-medium">Promotional Emails</Label>
                              <p className="text-xs text-muted-foreground mt-0.5">Platform news and promotional opportunities</p>
                            </div>
                            <Switch
                              id="notif-promo"
                              checked={notifPromo}
                              onCheckedChange={setNotifPromo}
                            />
                          </div>
                        </div>
                        <div className="pt-4">
                          <Button asChild variant="outline" size="sm">
                            <Link href="/business/settings">
                              Manage all notification settings
                            </Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>

              {/* Bottom grid: Recent Orders + Top Selling */}
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-3">
                    <CardTitle className="text-base">Recent Orders</CardTitle>
                    <Button asChild variant="ghost" size="sm" className="text-xs text-muted-foreground h-auto py-1">
                      <Link href={ORDERS_HREF}>View all</Link>
                    </Button>
                  </CardHeader>
                  <CardContent className="pt-0">
                    {recentOrders.length === 0 ? (
                      <EmptyState
                        title="No recent orders"
                        message="New orders for your store will show up here."
                      />
                    ) : (
                      <ul className="space-y-1">
                        {recentOrders.map((order) => {
                          const orderId = order.number ?? order.id;
                          const initial = orderId.slice(0, 1).toUpperCase();
                          const isPending = order.status.toLowerCase() === "pending";
                          return (
                            <li key={order.id}>
                              <Link
                                href={`${ORDERS_HREF}/${order.id}`}
                                className={`flex items-center gap-3 rounded-lg px-2 py-2.5 hover:bg-gray-50 transition-colors group ${isPending ? "bg-amber-50/60 hover:bg-amber-50" : ""}`}
                              >
                                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-semibold text-gray-600">
                                  {initial}
                                </div>
                                <div className="min-w-0 flex-1">
                                  <p className="truncate text-sm font-medium text-gray-900">
                                    #{orderId}
                                  </p>
                                  <p className="text-xs text-muted-foreground">
                                    {formatCurrency(order.total)}
                                  </p>
                                </div>
                                <Badge variant={orderStatusVariant(order.status)} className="flex-shrink-0 text-xs">
                                  {orderStatusLabel(order.status)}
                                </Badge>
                                <ChevronRight className="h-3.5 w-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">Top Selling Products</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex flex-col items-center justify-center py-8 text-center">
                      <div className="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center mb-4">
                        <TrendingUp className="h-6 w-6 text-amber-500" />
                      </div>
                      <p className="text-sm font-medium text-gray-800 mb-1">
                        Start selling to see your best-sellers here
                      </p>
                      <p className="text-xs text-muted-foreground mb-4 max-w-[220px]">
                        Your top products by revenue will appear here as orders come in.
                      </p>
                      <Button asChild size="sm" variant="outline">
                        <Link href={ADD_PRODUCT_HREF}>
                          <Plus className="h-3.5 w-3.5 mr-1.5" />
                          Add Product
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Separator className="my-8" />

              <div className="flex justify-end gap-3">
                <Button asChild variant="outline">
                  <Link href={ORDERS_HREF}>
                    <ShoppingBag className="mr-2 h-4 w-4" />
                    View All Orders
                  </Link>
                </Button>
                <Button asChild>
                  <Link href={ADD_PRODUCT_HREF}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add New Product
                  </Link>
                </Button>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
