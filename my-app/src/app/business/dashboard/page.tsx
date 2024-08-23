"use client";
import { useState } from "react";
import {
  DollarSign,
  Package,
  ShoppingCart,
  Star,
  Edit,
  Trash2,
  Plus,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

// Mock data
const overviewData = {
  totalSales: 15000,
  totalOrders: 150,
  bestSeller: "Chocolate Cake",
};

const products = [
  {
    id: 1,
    name: "Chocolate Cake",
    price: 35,
    stock: 10,
    image: "/placeholder.svg?height=50&width=50",
  },
  {
    id: 2,
    name: "Strawberry Tart",
    price: 28,
    stock: 15,
    image: "/placeholder.svg?height=50&width=50",
  },
  {
    id: 3,
    name: "Macarons",
    price: 18,
    stock: 20,
    image: "/placeholder.svg?height=50&width=50",
  },
];

const orders = [
  { id: 1, customer: "John Doe", total: 70, status: "Completed" },
  { id: 2, customer: "Jane Smith", total: 56, status: "Processing" },
  { id: 3, customer: "Bob Johnson", total: 35, status: "Shipped" },
];

const subscriptionData = {
  plan: "Pro",
  nextBilling: "2023-07-01",
  amount: 49.99,
};

export default function Component() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Business Dashboard</h1>
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="subscription">Subscription</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Sales
                </CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  ${overviewData.totalSales}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Orders
                </CardTitle>
                <ShoppingCart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {overviewData.totalOrders}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Best Seller
                </CardTitle>
                <Star className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {overviewData.bestSeller}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="products">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Product Management</CardTitle>
                <Button>
                  <Plus className="mr-2 h-4 w-4" /> New Product
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Image</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Stock</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-12 h-12 object-cover rounded"
                        />
                      </TableCell>
                      <TableCell>{product.name}</TableCell>
                      <TableCell>${product.price}</TableCell>
                      <TableCell>{product.stock}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="orders">
          <Card>
            <CardHeader>
              <CardTitle>Order Management</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell>#{order.id}</TableCell>
                      <TableCell>{order.customer}</TableCell>
                      <TableCell>${order.total}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            order.status === "Completed"
                              ? "default"
                              : "secondary"
                          }
                        >
                          {order.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="subscription">
          <Card>
            <CardHeader>
              <CardTitle>Subscription and Billing</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold">Current Plan</h3>
                  <p>{subscriptionData.plan}</p>
                </div>
                <div>
                  <h3 className="font-semibold">Next Billing Date</h3>
                  <p>{subscriptionData.nextBilling}</p>
                </div>
                <div>
                  <h3 className="font-semibold">Monthly Amount</h3>
                  <p>${subscriptionData.amount}</p>
                </div>
                <Button>Upgrade Plan</Button>
                <Button variant="outline">Update Payment Method</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
