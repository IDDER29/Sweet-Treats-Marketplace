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
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
}: {
  title: string;
  icon: React.ReactNode;
  metric: DashboardMetric;
  format?: "number" | "currency";
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
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {change && <p className="text-xs text-muted-foreground">{change}</p>}
      </CardContent>
    </Card>
  );
}

export default function DashboardPage() {
  const [search, setSearch] = useState<string>("");

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
      <DashboardSidbar />
      {/* Main content */}
      <main className="flex-1 overflow-y-auto bg-gray-100">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="icon" className="lg:hidden">
                <Menu className="h-6 w-6" />
              </Button>
              <Input
                type="search"
                placeholder="Search recent orders..."
                className="w-64"
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
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <MetricCard
                  title="Total Revenue"
                  icon={
                    <BarChartIcon className="h-4 w-4 text-muted-foreground" />
                  }
                  metric={data.totalRevenue}
                  format="currency"
                />
                <MetricCard
                  title="Orders"
                  icon={
                    <ShoppingBag className="h-4 w-4 text-muted-foreground" />
                  }
                  metric={data.totalOrders}
                />
                <MetricCard
                  title="Products"
                  icon={<Package className="h-4 w-4 text-muted-foreground" />}
                  metric={data.totalProducts}
                />
                <MetricCard
                  title="Active Deliveries"
                  icon={<Truck className="h-4 w-4 text-muted-foreground" />}
                  metric={data.activeDeliveries}
                />
              </div>

              <div className="mt-6">
                <Tabs defaultValue="overview">
                  <TabsList>
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="analytics">Analytics</TabsTrigger>
                    <TabsTrigger value="reports">Reports</TabsTrigger>
                    <TabsTrigger value="notifications">
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
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="date" />
                              <YAxis />
                              <Tooltip />
                              <Line
                                type="monotone"
                                dataKey="revenue"
                                stroke="#8884d8"
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
                        <p className="mb-4 text-sm text-muted-foreground">
                          Detailed sales and conversion analytics for your
                          store.
                        </p>
                        <Button asChild variant="outline">
                          <Link href="/business/dashboard/sales">
                            View full sales analytics
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
                        <p className="mb-4 text-sm text-muted-foreground">
                          Review delivery performance and order history.
                        </p>
                        <div className="flex gap-3">
                          <Button asChild variant="outline">
                            <Link href="/business/dashboard/delivery">
                              Delivery report
                            </Link>
                          </Button>
                          <Button asChild variant="outline">
                            <Link href={ORDERS_HREF}>Orders report</Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  <TabsContent value="notifications">
                    <Card>
                      <CardHeader>
                        <CardTitle>Notifications</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="mb-4 text-sm text-muted-foreground">
                          Manage which alerts you receive about orders and
                          stock.
                        </p>
                        <Button asChild variant="outline">
                          <Link href="/business/settings">
                            Notification settings
                          </Link>
                        </Button>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>

              <div className="mt-6 grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Orders</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {recentOrders.length === 0 ? (
                      <EmptyState
                        title="No recent orders"
                        message="New orders for your store will show up here."
                      />
                    ) : (
                      <ul className="space-y-3">
                        {recentOrders.map((order) => (
                          <li
                            key={order.id}
                            className="flex items-center justify-between gap-2"
                          >
                            <div className="min-w-0">
                              <p className="truncate text-sm font-medium">
                                #{order.number ?? order.id}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {formatCurrency(order.total)}
                              </p>
                            </div>
                            <Badge variant={orderStatusVariant(order.status)}>
                              {orderStatusLabel(order.status)}
                            </Badge>
                          </li>
                        ))}
                      </ul>
                    )}
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Top Selling Products</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <EmptyState
                      title="No data yet"
                      message="Your best-selling products will appear here as orders come in."
                    />
                  </CardContent>
                </Card>
              </div>
            </>
          )}

          <div className="mt-6 flex justify-end space-x-4">
            <Button asChild>
              <Link href={ADD_PRODUCT_HREF}>
                <Plus className="mr-2 h-4 w-4" />
                Add New Product
              </Link>
            </Button>
            <Button asChild>
              <Link href={ORDERS_HREF}>
                <ShoppingBag className="mr-2 h-4 w-4" />
                View All Orders
              </Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
