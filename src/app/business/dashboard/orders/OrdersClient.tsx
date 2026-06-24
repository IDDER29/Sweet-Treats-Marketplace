"use client";

import React, { useMemo, useState } from "react";
import { ShoppingBag } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LoadingState } from "@/components/feedback/LoadingState";
import { ErrorState } from "@/components/feedback/ErrorState";
import { EmptyState } from "@/components/feedback/EmptyState";
import { formatCurrency } from "@/lib/currency";
import { orderStatusLabel, orderStatusVariant } from "@/lib/order-status";
import { getStoreOrders } from "@/services/analytics";
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

export default function OrdersClient() {
  const [search, setSearch] = useState<string>("");
  const [status, setStatus] = useState<string>("all");

  const { data, isLoading, isError, refetch } = useQuery<Order[]>({
    queryKey: ["store-orders"],
    queryFn: () => getStoreOrders(),
  });

  const orders = useMemo<Order[]>(() => {
    let list = data ?? [];
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
  }, [data, search, status]);

  return (
    <>
      <div className="mb-6 flex items-center justify-between gap-2">
        <h1 className="text-3xl font-bold">Orders</h1>
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

      {isLoading && <LoadingState rows={6} />}

      {isError && (
        <ErrorState
          title="Couldn't load orders"
          message="We couldn't fetch your store orders right now. Please try again."
          onRetry={() => refetch()}
        />
      )}

      {!isLoading && !isError && (data ?? []).length === 0 && (
        <EmptyState
          icon={<ShoppingBag className="h-10 w-10" />}
          title="No orders yet"
          message="Orders placed for your store will appear here."
        />
      )}

      {!isLoading && !isError && (data ?? []).length > 0 && (
        <Card>
          <CardContent>
            {orders.length === 0 ? (
              <EmptyState
                icon={<ShoppingBag className="h-10 w-10" />}
                title="No matching orders"
                message="No orders match your filters. Try adjusting them."
              />
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Items</TableHead>
                    <TableHead>Total</TableHead>
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
    </>
  );
}
