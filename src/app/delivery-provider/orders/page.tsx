"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  MapPin,
  Package,
  Clock,
  ChevronDown,
  ChevronUp,
  CheckCircle,
  Truck,
} from "lucide-react";
import { toast } from "react-toastify";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/lib/currency";

type DeliveryStatus = "Pending Pickup" | "Picked Up" | "Delivered";

type ActiveDelivery = {
  id: string;
  customerName: string;
  storeName: string;
  storeArea: string;
  storeFullAddress: string;
  dropoffArea: string;
  dropoffFullAddress: string;
  distance: string;
  estimatedTime: string;
  itemCount: number;
  orderValue: number;
  status: DeliveryStatus;
};

type CompletedDelivery = {
  id: string;
  customerName: string;
  storeName: string;
  storeArea: string;
  dropoffArea: string;
  distance: string;
  itemCount: number;
  orderValue: number;
  completedAt: string;
};

const INITIAL_ACTIVE: ActiveDelivery[] = [
  {
    id: "ORD-4821",
    customerName: "Sarah Martinez",
    storeName: "Sugar Bloom Bakery",
    storeArea: "City Centre",
    storeFullAddress: "14 Avenue Hassan II, City Centre",
    dropoffArea: "North District",
    dropoffFullAddress: "27 Rue Al Amir, Appt 3B, North District",
    distance: "2.4 km",
    estimatedTime: "12 min",
    itemCount: 3,
    orderValue: 38.5,
    status: "Pending Pickup",
  },
  {
    id: "ORD-4819",
    customerName: "Omar Benali",
    storeName: "The Candy Lab",
    storeArea: "West Bay",
    storeFullAddress: "88 Boulevard Zerktouni, West Bay",
    dropoffArea: "South Side",
    dropoffFullAddress: "5 Résidence Les Orangers, South Side",
    distance: "4.1 km",
    estimatedTime: "18 min",
    itemCount: 5,
    orderValue: 67.0,
    status: "Picked Up",
  },
  {
    id: "ORD-4815",
    customerName: "Leila Fassi",
    storeName: "Petit Gâteau",
    storeArea: "East End",
    storeFullAddress: "3 Rue des Fleurs, East End",
    dropoffArea: "Airport Area",
    dropoffFullAddress: "Villa 12, Lotissement Al Fath, Airport Area",
    distance: "6.7 km",
    estimatedTime: "24 min",
    itemCount: 2,
    orderValue: 22.0,
    status: "Pending Pickup",
  },
];

const COMPLETED: CompletedDelivery[] = [
  {
    id: "ORD-4809",
    customerName: "Youssef Tahiri",
    storeName: "Macaron Dreams",
    storeArea: "Agdal",
    dropoffArea: "Hay Riad",
    distance: "3.2 km",
    itemCount: 4,
    orderValue: 55.0,
    completedAt: "Today, 11:42 AM",
  },
  {
    id: "ORD-4801",
    customerName: "Nadia Cherkaoui",
    storeName: "Sugar Bloom Bakery",
    storeArea: "City Centre",
    dropoffArea: "Agdal",
    distance: "1.9 km",
    itemCount: 1,
    orderValue: 14.5,
    completedAt: "Today, 09:18 AM",
  },
];

const STATUS_CONFIG: Record<
  DeliveryStatus,
  { label: string; className: string }
> = {
  "Pending Pickup": {
    label: "Pending Pickup",
    className: "bg-amber-100 text-amber-800 border-amber-200",
  },
  "Picked Up": {
    label: "Picked Up",
    className: "bg-blue-100 text-blue-800 border-blue-200",
  },
  Delivered: {
    label: "Delivered",
    className: "bg-green-100 text-green-800 border-green-200",
  },
};

function ActiveDeliveryCard({
  delivery,
  onStatusChange,
}: {
  delivery: ActiveDelivery;
  onStatusChange: (id: string, status: DeliveryStatus) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const statusCfg = STATUS_CONFIG[delivery.status];

  return (
    <Card className="border-l-4 border-l-amber-400 overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div>
            <CardTitle className="text-base">#{delivery.id}</CardTitle>
            <CardDescription className="mt-0.5">
              {delivery.customerName}
            </CardDescription>
          </div>
          <Badge variant="outline" className={`text-xs shrink-0 ${statusCfg.className}`}>
            {statusCfg.label}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="pb-3 space-y-4">
        <div className="space-y-2">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
              <div className="w-2 h-2 rounded-full bg-blue-500" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Pickup</p>
              <p className="text-sm font-medium">{delivery.storeName}</p>
              <p className="text-xs text-muted-foreground">{delivery.storeArea}</p>
            </div>
          </div>
          <div className="ml-2.5 border-l-2 border-dashed border-gray-200 h-3" />
          <div className="flex items-start gap-3">
            <div className="mt-0.5 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center shrink-0">
              <MapPin className="h-2.5 w-2.5 text-green-600" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Drop-off</p>
              <p className="text-sm font-medium">{delivery.customerName}</p>
              <p className="text-xs text-muted-foreground">{delivery.dropoffArea}</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <MapPin className="h-3 w-3" />
            {delivery.distance}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {delivery.estimatedTime}
          </span>
          <span className="flex items-center gap-1">
            <Package className="h-3 w-3" />
            {delivery.itemCount} {delivery.itemCount === 1 ? "item" : "items"}
          </span>
          <span className="font-semibold text-gray-700 ml-auto">
            {formatCurrency(delivery.orderValue)}
          </span>
        </div>

        <div className="flex gap-2">
          {delivery.status === "Pending Pickup" && (
            <Button
              size="sm"
              className="flex-1 bg-amber-500 hover:bg-amber-600 text-white"
              onClick={() => {
                onStatusChange(delivery.id, "Picked Up");
                toast.success(`Order ${delivery.id} marked as picked up`);
              }}
            >
              <Truck className="mr-2 h-4 w-4" />
              Mark as Picked Up
            </Button>
          )}
          {delivery.status === "Picked Up" && (
            <Button
              size="sm"
              className="flex-1 bg-green-600 hover:bg-green-700 text-white"
              onClick={() => {
                onStatusChange(delivery.id, "Delivered");
                toast.success(`Order ${delivery.id} marked as delivered`);
              }}
            >
              <CheckCircle className="mr-2 h-4 w-4" />
              Mark as Delivered
            </Button>
          )}
          {delivery.status === "Delivered" && (
            <div className="flex-1 flex items-center justify-center gap-2 text-sm text-green-700 font-medium py-1">
              <CheckCircle className="h-4 w-4" />
              Delivered
            </div>
          )}
          <Button
            size="sm"
            variant="outline"
            onClick={() => setExpanded((p) => !p)}
            aria-label={expanded ? "Collapse details" : "Expand details"}
          >
            {expanded ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </Button>
        </div>

        {expanded && (
          <div className="rounded-lg bg-gray-50 border border-gray-100 px-4 py-3 space-y-2 text-xs">
            <Separator className="mb-2" />
            <div className="flex gap-2">
              <span className="w-20 text-muted-foreground shrink-0">Pickup</span>
              <span className="font-medium text-gray-800">
                {delivery.storeFullAddress}
              </span>
            </div>
            <div className="flex gap-2">
              <span className="w-20 text-muted-foreground shrink-0">Drop-off</span>
              <span className="font-medium text-gray-800">
                {delivery.dropoffFullAddress}
              </span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default function DeliveryOrdersPage() {
  const [deliveries, setDeliveries] = useState<ActiveDelivery[]>(INITIAL_ACTIVE);
  const [activeTab, setActiveTab] = useState("active");

  const activeDeliveries = deliveries.filter((d) => d.status !== "Delivered");
  const completedActive = deliveries.filter((d) => d.status === "Delivered");

  function handleStatusChange(id: string, status: DeliveryStatus) {
    setDeliveries((prev) =>
      prev.map((d) => (d.id === id ? { ...d, status } : d))
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <Link
          href="/delivery-provider/dashboard"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-gray-900 transition-colors mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Link>

        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Active Deliveries</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage and track your current delivery assignments.
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full grid grid-cols-2 mb-6">
            <TabsTrigger value="active" className="gap-2">
              <Truck className="h-4 w-4" />
              Active ({activeDeliveries.length})
            </TabsTrigger>
            <TabsTrigger value="completed" className="gap-2">
              <CheckCircle className="h-4 w-4" />
              Completed ({COMPLETED.length + completedActive.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="active">
            {activeDeliveries.length === 0 ? (
              <Card>
                <CardContent className="py-16 text-center">
                  <Truck className="h-10 w-10 text-gray-300 mx-auto mb-3" />
                  <p className="text-sm font-medium text-gray-600 mb-1">
                    No active deliveries
                  </p>
                  <p className="text-xs text-muted-foreground">
                    All deliveries have been completed.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {activeDeliveries.map((delivery) => (
                  <ActiveDeliveryCard
                    key={delivery.id}
                    delivery={delivery}
                    onStatusChange={handleStatusChange}
                  />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="completed">
            <Card>
              <CardContent className="p-0">
                <div className="divide-y">
                  {[...completedActive, ...COMPLETED].map((d, i) => {
                    const isActive = "status" in d;
                    const id = d.id;
                    const customerName = d.customerName;
                    const storeArea = d.storeArea;
                    const dropoffArea = d.dropoffArea;
                    const distance = d.distance;
                    const itemCount = d.itemCount;
                    const orderValue = d.orderValue;
                    const completedAt = isActive
                      ? "Just now"
                      : (d as CompletedDelivery).completedAt;

                    return (
                      <div key={`${id}-${i}`} className="px-5 py-4">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-start gap-3">
                            <div className="mt-0.5 w-8 h-8 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                              <CheckCircle className="h-4 w-4 text-green-600" />
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-gray-900">
                                #{id}
                              </p>
                              <p className="text-xs text-muted-foreground mt-0.5">
                                {customerName}
                              </p>
                              <p className="text-xs text-gray-600 mt-1">
                                {storeArea} &rarr; {dropoffArea} &middot;{" "}
                                {distance} &middot; {itemCount}{" "}
                                {itemCount === 1 ? "item" : "items"}
                              </p>
                              <p className="text-xs text-muted-foreground mt-0.5">
                                {completedAt}
                              </p>
                            </div>
                          </div>
                          <div className="shrink-0 text-right">
                            <p className="text-sm font-semibold text-gray-900">
                              {formatCurrency(orderValue)}
                            </p>
                            <Badge
                              variant="outline"
                              className="text-xs mt-1 bg-green-100 text-green-800 border-green-200"
                            >
                              Delivered
                            </Badge>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
