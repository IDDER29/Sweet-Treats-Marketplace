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
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MapPin, Truck, Package, CheckCircle } from "lucide-react";
import DashboardSidbar from "@/components/business/dashboard/DashboardSidbar";
import { LoadingState } from "@/components/feedback/LoadingState";
import { ErrorState } from "@/components/feedback/ErrorState";
import { EmptyState } from "@/components/feedback/EmptyState";
import {
  deliveryStatusLabel,
  deliveryStatusVariant,
} from "@/lib/order-status";
import {
  getDeliverySummary,
  type DeliverySummary,
} from "@/services/analytics";

const STATUS_FILTERS: { value: string; label: string }[] = [
  { value: "all", label: "All Deliveries" },
  { value: "assigned", label: "Assigned" },
  { value: "in_transit", label: "In transit" },
  { value: "delivered", label: "Delivered" },
  { value: "cancelled", label: "Cancelled" },
];

export default function DeliveryPage() {
  const [search, setSearch] = useState<string>("");
  const [status, setStatus] = useState<string>("all");

  const { data, isLoading, isError, refetch } = useQuery<DeliverySummary>({
    queryKey: ["delivery-summary"],
    queryFn: () => getDeliverySummary(),
  });

  const active = useMemo(() => {
    let list = data?.active ?? [];
    if (status !== "all") {
      list = list.filter((d) => d.status === status);
    }
    const q = search.trim().toLowerCase();
    if (q) {
      list = list.filter(
        (d) =>
          (d.orderNumber ?? d.id).toLowerCase().includes(q) ||
          (d.customer ?? "").toLowerCase().includes(q) ||
          (d.address ?? "").toLowerCase().includes(q)
      );
    }
    return list;
  }, [data?.active, search, status]);

  return (
    <div className="w-full flex">
      <DashboardSidbar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Delivery Management</h1>

        {isLoading && <LoadingState rows={4} />}

        {isError && (
          <ErrorState
            title="Couldn't load deliveries"
            message="We couldn't fetch your delivery data. Please try again."
            onRetry={() => refetch()}
          />
        )}

        {!isLoading && !isError && data && (
          <>
            <div className="grid gap-6 mb-6 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Deliveries
                  </CardTitle>
                  <Truck className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {data.totalDeliveries.toLocaleString()}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    In Transit
                  </CardTitle>
                  <Package className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {data.inTransit.toLocaleString()}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Delivered Today
                  </CardTitle>
                  <CheckCircle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {data.deliveredToday.toLocaleString()}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Average Delivery Time
                  </CardTitle>
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {data.averageDeliveryMinutes} min
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Active Deliveries</h2>
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
                  placeholder="Search deliveries"
                  className="max-w-sm"
                  value={search}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setSearch(e.target.value)
                  }
                />
              </div>
            </div>

            {data.active.length === 0 ? (
              <EmptyState
                icon={<Truck className="h-10 w-10" />}
                title="No active deliveries"
                message="Deliveries for your store's orders will appear here."
              />
            ) : (
              <Card>
                <CardContent>
                  {active.length === 0 ? (
                    <EmptyState
                      icon={<Truck className="h-10 w-10" />}
                      title="No matching deliveries"
                      message="No deliveries match your filters. Try adjusting them."
                    />
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Order ID</TableHead>
                          <TableHead>Customer</TableHead>
                          <TableHead>Address</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Estimated Delivery</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {active.map((delivery) => (
                          <TableRow key={delivery.id}>
                            <TableCell>
                              #{delivery.orderNumber ?? delivery.id}
                            </TableCell>
                            <TableCell>{delivery.customer ?? "—"}</TableCell>
                            <TableCell>{delivery.address ?? "—"}</TableCell>
                            <TableCell>
                              <Badge
                                variant={deliveryStatusVariant(
                                  delivery.status
                                )}
                              >
                                {deliveryStatusLabel(delivery.status)}
                              </Badge>
                            </TableCell>
                            <TableCell>{delivery.eta ?? "—"}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                </CardContent>
              </Card>
            )}
          </>
        )}
      </main>
    </div>
  );
}
