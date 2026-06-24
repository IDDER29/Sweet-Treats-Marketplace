"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import {
  Truck,
  CheckCircle,
  XCircle,
  MapPin,
  Package,
  Clock,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LoadingState } from "@/components/feedback/LoadingState";
import { EmptyState } from "@/components/feedback/EmptyState";
import { getDeliverySummary } from "@/services/analytics";

// ── Helpers ───────────────────────────────────────────────────────────────────

function getInitials(name?: string | null): string {
  if (!name) return "DR";
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function DeliveryDashboard() {
  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState("overview");
  const [isAvailable, setIsAvailable] = useState(false);

  const driverName = session?.user?.name ?? "Driver";
  const driverEmail = session?.user?.email ?? "";
  const initials = getInitials(session?.user?.name);

  const { data: summary, isLoading } = useQuery({
    queryKey: ["delivery-summary"],
    queryFn: () => getDeliverySummary(),
    refetchInterval: 30_000,
  });

  const activeDeliveries = summary?.active ?? [];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-5xl">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Avatar className="h-12 w-12 border-2 border-white shadow-sm">
              <AvatarImage src="/placeholder.svg" alt="Driver" />
              <AvatarFallback className="bg-amber-100 text-amber-700 font-bold">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-xl font-bold text-gray-900">{driverName}</h1>
              <p className="text-sm text-muted-foreground">Driver Dashboard</p>
            </div>
          </div>

          {/* Availability toggle */}
          <div className={`flex items-center gap-3 px-4 py-2.5 rounded-full border-2 transition-colors ${
            isAvailable
              ? "border-green-300 bg-green-50"
              : "border-gray-200 bg-gray-100"
          }`}>
            <Switch
              id="availability"
              checked={isAvailable}
              onCheckedChange={setIsAvailable}
            />
            <Label htmlFor="availability" className={`text-sm font-semibold cursor-pointer ${
              isAvailable ? "text-green-700" : "text-gray-500"
            }`}>
              {isAvailable ? "Available" : "Unavailable"}
            </Label>
          </div>
        </div>

        {/* Stats Row */}
        {isLoading ? (
          <LoadingState rows={3} className="mb-8" />
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            <Card className="border-l-4 border-l-green-500">
              <CardContent className="pt-4 pb-4">
                <div className="flex items-center gap-2 mb-1">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <p className="text-xs text-muted-foreground font-medium">Delivered Today</p>
                </div>
                <p className="text-2xl font-bold text-gray-900">
                  {summary?.deliveredToday ?? 0}
                </p>
              </CardContent>
            </Card>
            <Card className="border-l-4 border-l-amber-500">
              <CardContent className="pt-4 pb-4">
                <div className="flex items-center gap-2 mb-1">
                  <Truck className="h-4 w-4 text-amber-600" />
                  <p className="text-xs text-muted-foreground font-medium">In Transit</p>
                </div>
                <p className="text-2xl font-bold text-gray-900">
                  {summary?.inTransit ?? 0}
                </p>
              </CardContent>
            </Card>
            <Card className="border-l-4 border-l-blue-500">
              <CardContent className="pt-4 pb-4">
                <div className="flex items-center gap-2 mb-1">
                  <Package className="h-4 w-4 text-blue-600" />
                  <p className="text-xs text-muted-foreground font-medium">Total Deliveries</p>
                </div>
                <p className="text-2xl font-bold text-gray-900">
                  {summary?.totalDeliveries ?? 0}
                </p>
              </CardContent>
            </Card>
            <Card className="border-l-4 border-l-purple-500">
              <CardContent className="pt-4 pb-4">
                <div className="flex items-center gap-2 mb-1">
                  <Clock className="h-4 w-4 text-purple-600" />
                  <p className="text-xs text-muted-foreground font-medium">Avg. Time (min)</p>
                </div>
                <p className="text-2xl font-bold text-gray-900">
                  {summary?.averageDeliveryMinutes ?? 0}
                </p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Map Placeholder */}
        <Card className="mb-8 overflow-hidden">
          <div className="h-40 bg-gradient-to-br from-blue-50 via-blue-100 to-indigo-100 flex flex-col items-center justify-center relative">
            <div className="absolute inset-0 opacity-10">
              <div className="w-full h-full" style={{
                backgroundImage: "repeating-linear-gradient(0deg, #94a3b8 0, #94a3b8 1px, transparent 0, transparent 50%), repeating-linear-gradient(90deg, #94a3b8 0, #94a3b8 1px, transparent 0, transparent 50%)",
                backgroundSize: "40px 40px"
              }} />
            </div>
            <div className="relative text-center">
              <div className="w-12 h-12 rounded-full bg-blue-500/20 border-2 border-blue-400 flex items-center justify-center mx-auto mb-2">
                <MapPin className="h-6 w-6 text-blue-600" />
              </div>
              <p className="text-sm font-semibold text-blue-700">Live Map View</p>
              <p className="text-xs text-blue-500 mt-0.5">Real-time delivery tracking</p>
            </div>
          </div>
        </Card>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="overview" className="gap-2">
              <Truck className="h-4 w-4" />
              Active Deliveries
            </TabsTrigger>
            <TabsTrigger value="requests" className="gap-2">
              <Package className="h-4 w-4" />
              Requests
            </TabsTrigger>
            <TabsTrigger value="history" className="gap-2">
              <Clock className="h-4 w-4" />
              History
            </TabsTrigger>
          </TabsList>

          {/* Active Deliveries Tab */}
          <TabsContent value="overview">
            {isLoading ? (
              <LoadingState rows={3} />
            ) : activeDeliveries.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <Truck className="h-10 w-10 text-gray-300 mx-auto mb-3" />
                  <p className="text-sm font-medium text-gray-600 mb-1">No active deliveries</p>
                  <p className="text-xs text-muted-foreground">
                    {isAvailable
                      ? "Waiting for new delivery requests…"
                      : "Set yourself as available to receive deliveries."}
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {activeDeliveries.map((delivery) => (
                  <Card key={delivery.id} className="border-l-4 border-l-amber-400">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-base">
                          {delivery.orderNumber ? `Order #${delivery.orderNumber}` : `Delivery #${delivery.id}`}
                        </CardTitle>
                        <Badge className="bg-amber-100 text-amber-800 border-amber-200 text-xs">
                          {delivery.status}
                        </Badge>
                      </div>
                      {delivery.eta && (
                        <CardDescription>ETA: {delivery.eta}</CardDescription>
                      )}
                    </CardHeader>
                    <CardContent className="pb-3">
                      <div className="space-y-2">
                        {delivery.customer && (
                          <div className="flex items-center gap-2 text-sm">
                            <span className="text-muted-foreground">Customer:</span>
                            <span className="font-medium">{delivery.customer}</span>
                          </div>
                        )}
                        {delivery.address && (
                          <div className="flex items-start gap-3">
                            <div className="mt-0.5 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                              <MapPin className="h-2.5 w-2.5 text-green-600" />
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground">Drop-off</p>
                              <p className="text-sm font-medium">{delivery.address}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </CardContent>
                    <CardFooter className="flex gap-2 pt-0">
                      <Button
                        size="sm"
                        className="flex-1"
                        onClick={() => toast.success(`Delivery #${delivery.id} marked as complete`)}
                      >
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Mark Delivered
                      </Button>
                      <Button size="sm" variant="outline">
                        <MapPin className="h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Delivery Requests Tab */}
          <TabsContent value="requests">
            {isLoading ? (
              <LoadingState rows={3} />
            ) : activeDeliveries.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <Package className="h-10 w-10 text-gray-300 mx-auto mb-3" />
                  <p className="text-sm font-medium text-gray-600 mb-1">No pending requests</p>
                  <p className="text-xs text-muted-foreground">
                    New delivery requests will appear here.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {activeDeliveries.map((delivery) => (
                  <Card key={delivery.id}>
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-base">
                          {delivery.orderNumber
                            ? `Request #${delivery.orderNumber}`
                            : `Request #${delivery.id}`}
                        </CardTitle>
                        <Badge variant="outline" className="text-xs">
                          {delivery.status}
                        </Badge>
                      </div>
                      {delivery.eta && (
                        <CardDescription>Estimated pickup: {delivery.eta}</CardDescription>
                      )}
                    </CardHeader>
                    <CardContent className="pb-3">
                      {delivery.address && (
                        <div className="flex items-start gap-3">
                          <div className="mt-0.5 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                            <MapPin className="h-2.5 w-2.5 text-green-600" />
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Deliver to</p>
                            <p className="text-sm font-medium">{delivery.address}</p>
                          </div>
                        </div>
                      )}
                      {delivery.customer && (
                        <p className="text-sm text-muted-foreground mt-2">
                          Customer: {delivery.customer}
                        </p>
                      )}
                    </CardContent>
                    <CardFooter className="flex justify-between gap-2 pt-0">
                      <Button
                        variant="outline"
                        className="flex-1 border-red-200 text-red-600 hover:bg-red-50"
                        onClick={() => toast.info(`Request #${delivery.id} rejected`)}
                      >
                        <XCircle className="mr-2 h-4 w-4" /> Reject
                      </Button>
                      <Button
                        className="flex-1 bg-green-600 hover:bg-green-700"
                        onClick={() => toast.success(`Request #${delivery.id} accepted`)}
                      >
                        <CheckCircle className="mr-2 h-4 w-4" /> Accept
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* History Tab */}
          <TabsContent value="history">
            <EmptyState
              icon={<Truck className="h-10 w-10" />}
              title="No delivery history yet"
              message="Your completed deliveries will appear here."
            />
          </TabsContent>
        </Tabs>

        <Separator className="my-8" />

        {/* Profile Settings section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Profile &amp; Account</CardTitle>
            <CardDescription>Update your personal details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src="/placeholder.svg" alt="Profile picture" />
                <AvatarFallback className="bg-amber-100 text-amber-700 font-bold text-lg">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <Button variant="outline" size="sm">Upload Picture</Button>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="name">Name</Label>
                <Input id="name" defaultValue={driverName} />
              </div>
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" type="tel" placeholder="Your phone number" />
              </div>
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" defaultValue={driverEmail} />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={() => toast.success("Profile saved")}>Save Changes</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
