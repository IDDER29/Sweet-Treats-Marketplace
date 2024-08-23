"use client";
import { useState } from "react";
import { User, Truck, Clock, CheckCircle, XCircle } from "lucide-react";

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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Mock data
const profileData = {
  name: "John Doe",
  email: "john@example.com",
  phone: "123-456-7890",
  available: true,
};

const deliveryRequests = [
  {
    id: 1,
    from: "123 Baker St",
    to: "456 Main St",
    time: "2:00 PM",
    distance: "3.5 miles",
  },
  {
    id: 2,
    from: "789 Oak Ave",
    to: "101 Pine Rd",
    time: "3:30 PM",
    distance: "5.2 miles",
  },
];

const deliveryHistory = [
  {
    id: 1,
    date: "2023-06-15",
    from: "123 Baker St",
    to: "456 Main St",
    status: "Completed",
  },
  {
    id: 2,
    date: "2023-06-14",
    from: "789 Oak Ave",
    to: "101 Pine Rd",
    status: "Cancelled",
  },
];

export default function Component() {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Delivery Provider Dashboard</h1>
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="requests">Delivery Requests</TabsTrigger>
          <TabsTrigger value="history">Delivery History</TabsTrigger>
        </TabsList>
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Profile Management</CardTitle>
              <CardDescription>
                Update your personal details and availability status
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src="/placeholder.svg" alt="Profile picture" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <Button>Upload Picture</Button>
              </div>
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="name">Name</Label>
                <Input id="name" defaultValue={profileData.name} />
              </div>
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  defaultValue={profileData.email}
                />
              </div>
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" type="tel" defaultValue={profileData.phone} />
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="available" defaultChecked={profileData.available} />
                <Label htmlFor="available">Available for deliveries</Label>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="requests">
          <div className="grid gap-4">
            {deliveryRequests.map((request) => (
              <Card key={request.id}>
                <CardHeader>
                  <CardTitle>Delivery Request #{request.id}</CardTitle>
                  <CardDescription>
                    Estimated time: {request.time}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    <strong>From:</strong> {request.from}
                  </p>
                  <p>
                    <strong>To:</strong> {request.to}
                  </p>
                  <p>
                    <strong>Distance:</strong> {request.distance}
                  </p>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">
                    <XCircle className="mr-2 h-4 w-4" /> Reject
                  </Button>
                  <Button>
                    <CheckCircle className="mr-2 h-4 w-4" /> Accept
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Delivery History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {deliveryHistory.map((delivery) => (
                  <div
                    key={delivery.id}
                    className="flex items-center justify-between border-b pb-2"
                  >
                    <div>
                      <p className="font-semibold">Delivery #{delivery.id}</p>
                      <p className="text-sm text-muted-foreground">
                        {delivery.date}
                      </p>
                      <p className="text-sm">From: {delivery.from}</p>
                      <p className="text-sm">To: {delivery.to}</p>
                    </div>
                    <div
                      className={`px-2 py-1 rounded-full text-sm ${
                        delivery.status === "Completed"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {delivery.status}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
