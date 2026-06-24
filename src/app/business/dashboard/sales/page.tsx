"use client";

import React, { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import DashboardSidbar from "@/components/business/dashboard/DashboardSidbar";
import { LoadingState } from "@/components/feedback/LoadingState";
import { ErrorState } from "@/components/feedback/ErrorState";
import { EmptyState } from "@/components/feedback/EmptyState";
import { formatCurrency } from "@/lib/currency";
import { orderStatusLabel, orderStatusVariant } from "@/lib/order-status";
import {
  getSalesSummary,
  getStoreOrders,
  type SalesSummary,
} from "@/services/analytics";
import type { Order, OrderStatus } from "@/types";

const STATUS_FILTERS: { value: string; label: string }[] = [
  { value: "all", label: "All Orders" },
  { value: "pending", label: "Pending" },
  { value: "confirmed", label: "Confirmed" },
  { value: "preparing", label: "Preparing" },
  { value: "out_for_delivery", label: "Out for delivery" },
  { value: "delivered", label: "Delivered" },
  { value: "cancelled", label: "Cancelled" },
];

function formatDate(value?: string): string {
  if (!value) return "—";
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? value : d.toLocaleDateString();
}

export default function SalesPage() {
  const [search, setSearch] = useState<string>("");
  const [status, setStatus] = useState<string>("all");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const summaryQuery = useQuery<SalesSummary>({
    queryKey: ["sales-summary"],
    queryFn: () => getSalesSummary(),
  });

  const ordersQuery = useQuery<Order[]>({
    queryKey: ["store-orders"],
    queryFn: () => getStoreOrders(),
  });

  const summary = summaryQuery.data;

  const orders = useMemo<Order[]>(() => {
    let list = ordersQuery.data ?? [];
    if (status !== "all") {
      list = list.filter((o) => o.status === (status as OrderStatus));
    }
    const q = search.trim().toLowerCase();
    if (q) {
      list = list.filter(
        (o) =>
          (o.number ?? o.id).toLowerCase().includes(q) ||
          o.items.some((item) => item.name.toLowerCase().includes(q))
      );
    }
    return list;
  }, [ordersQuery.data, search, status]);

  return (
    <div className="w-full flex h-screen overflow-hidden">
      <DashboardSidbar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <main className="flex-1 overflow-y-auto bg-gray-100">
        <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Sales Overview</h1>

        {summaryQuery.isLoading && <LoadingState rows={4} />}

        {summaryQuery.isError && (
          <ErrorState
            title="Couldn't load sales metrics"
            message="We couldn't fetch your sales data. Please try again."
            onRetry={() => summaryQuery.refetch()}
          />
        )}

        {!summaryQuery.isLoading && !summaryQuery.isError && summary && (
          <>
            <div className="grid gap-6 mb-6 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Revenue
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {formatCurrency(summary.totalRevenue)}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Orders
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {summary.totalOrders.toLocaleString()}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Average Order Value
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {formatCurrency(summary.averageOrderValue)}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Conversion Rate
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {summary.conversionRate}%
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Sales Trend</CardTitle>
              </CardHeader>
              <CardContent>
                {summary.trend.length === 0 ? (
                  <EmptyState
                    title="No sales trend yet"
                    message="Your revenue and order trend will appear here once you have sales."
                  />
                ) : (
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={summary.trend}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis yAxisId="left" />
                      <YAxis yAxisId="right" orientation="right" />
                      <Tooltip />
                      <Legend />
                      <Line
                        yAxisId="left"
                        type="monotone"
                        dataKey="revenue"
                        stroke="#8884d8"
                      />
                      <Line
                        yAxisId="right"
                        type="monotone"
                        dataKey="orders"
                        stroke="#82ca9d"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                )}
              </CardContent>
            </Card>
          </>
        )}

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Recent Orders</h2>
          <div className="flex items-center space-x-2">
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                {STATUS_FILTERS.map((f) => (
                  <SelectItem key={f.value} value={f.value}>
                    {f.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              type="text"
              placeholder="Search orders"
              className="max-w-sm"
              value={search}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSearch(e.target.value)
              }
            />
          </div>
        </div>

        {ordersQuery.isLoading && <LoadingState rows={5} />}

        {ordersQuery.isError && (
          <ErrorState
            title="Couldn't load orders"
            message="We couldn't fetch your recent orders. Please try again."
            onRetry={() => ordersQuery.refetch()}
          />
        )}

        {!ordersQuery.isLoading &&
          !ordersQuery.isError &&
          (ordersQuery.data ?? []).length === 0 && (
            <EmptyState
              title="No orders yet"
              message="Orders placed for your store will appear here."
            />
          )}

        {!ordersQuery.isLoading &&
          !ordersQuery.isError &&
          (ordersQuery.data ?? []).length > 0 && (
            <Card>
              <CardContent>
                {orders.length === 0 ? (
                  <EmptyState
                    title="No matching orders"
                    message="No orders match your filters. Try adjusting them."
                  />
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Order ID</TableHead>
                        <TableHead>Items</TableHead>
                        <TableHead>Total Amount</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Date</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {orders.map((order) => (
                        <TableRow key={order.id}>
                          <TableCell>#{order.number ?? order.id}</TableCell>
                          <TableCell>
                            {order.items.reduce(
                              (sum, item) => sum + item.quantity,
                              0
                            )}{" "}
                            item(s)
                          </TableCell>
                          <TableCell>{formatCurrency(order.total)}</TableCell>
                          <TableCell>
                            <Badge variant={orderStatusVariant(order.status)}>
                              {orderStatusLabel(order.status)}
                            </Badge>
                          </TableCell>
                          <TableCell>{formatDate(order.createdAt)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
}
