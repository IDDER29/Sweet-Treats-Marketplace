"use client";

import { useState } from "react";
import { User, ShoppingBag, Heart } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Mock data
const personalInfo = {
  name: "Jane Smith",
  email: "jane@example.com",
  phone: "987-654-3210",
  address: "789 Elm St, Anytown, USA",
};

const orderHistory = [
  { id: 1, date: "2023-06-15", total: 45.99, status: "Delivered" },
  { id: 2, date: "2023-06-10", total: 32.5, status: "Processing" },
];

const wishlist = [
  {
    id: 1,
    name: "Chocolate Cake",
    price: 35,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 2,
    name: "Strawberry Tart",
    price: 28,
    image: "/placeholder.svg?height=100&width=100",
  },
];

export default function Component() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Customer Profile</h1>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>Manage your personal details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="name">Name</Label>
            <Input id="name" defaultValue={personalInfo.name} />
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" defaultValue={personalInfo.email} />
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" type="tel" defaultValue={personalInfo.phone} />
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="address">Address</Label>
            <Input id="address" defaultValue={personalInfo.address} />
          </div>
        </CardContent>
        <CardFooter>
          <Button>Save Changes</Button>
        </CardFooter>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Order History</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orderHistory.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>#{order.id}</TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>${order.total.toFixed(2)}</TableCell>
                  <TableCell>{order.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Wishlist</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {wishlist.map((item) => (
              <div key={item.id} className="flex flex-col items-center">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-cover mb-2"
                />
                <h3 className="font-semibold">{item.name}</h3>
                <p>${item.price.toFixed(2)}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
