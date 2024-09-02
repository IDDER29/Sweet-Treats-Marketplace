"use client";
import React from "react";
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
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
//import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import {
  BarChart,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Bar,
} from "recharts";
import DashboardSidbar from "@/components/business/dashboard/DashboardSidbar";

const salesData = [
  { date: "2023-06-01", revenue: 1200, orders: 45 },
  { date: "2023-06-02", revenue: 1500, orders: 55 },
  { date: "2023-06-03", revenue: 1000, orders: 40 },
  { date: "2023-06-04", revenue: 1800, orders: 60 },
  { date: "2023-06-05", revenue: 2000, orders: 75 },
  { date: "2023-06-06", revenue: 1600, orders: 50 },
  { date: "2023-06-07", revenue: 1400, orders: 48 },
];

export default function SalesPage() {
  return (
    <div className=" w-full flex ">
      <DashboardSidbar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Sales Overview</h1>

        <div className="grid gap-6 mb-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Revenue
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$10,500</div>
              <p className="text-xs text-muted-foreground">
                +15% from last week
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Orders
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">373</div>
              <p className="text-xs text-muted-foreground">
                +8% from last week
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Average Order Value
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$28.15</div>
              <p className="text-xs text-muted-foreground">
                +5% from last week
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Conversion Rate
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3.8%</div>
              <p className="text-xs text-muted-foreground">
                +0.5% from last week
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Sales Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={salesData}>
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
          </CardContent>
        </Card>

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Recent Orders</h2>
          <div className="flex items-center space-x-2">
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Orders</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
            <Input
              type="text"
              placeholder="Search orders"
              className="max-w-sm"
            />
          </div>
        </div>

        <Card>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Products</TableHead>
                  <TableHead>Total Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[
                  {
                    id: "#1234",
                    customer: "John Doe",
                    products: "Sourdough Bread, Croissant",
                    amount: "$12.99",
                    status: "Completed",
                    date: "2023-06-07",
                  },
                  {
                    id: "#1235",
                    customer: "Jane Smith",
                    products: "Chocolate Cake",
                    amount: "$24.99",
                    status: "Processing",
                    date: "2023-06-07",
                  },
                  {
                    id: "#1236",
                    customer: "Bob Johnson",
                    products: "Baguette, Ciabatta",
                    amount: "$8.50",
                    status: "Completed",
                    date: "2023-06-06",
                  },
                  {
                    id: "#1237",
                    customer: "Alice Brown",
                    products: "Cinnamon Roll, Coffee",
                    amount: "$7.25",
                    status: "Cancelled",
                    date: "2023-06-06",
                  },
                  {
                    id: "#1238",
                    customer: "Charlie Wilson",
                    products: "Birthday Cake",
                    amount: "$35.00",
                    status: "Processing",
                    date: "2023-06-05",
                  },
                ].map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>{order.id}</TableCell>
                    <TableCell>{order.customer}</TableCell>
                    <TableCell>{order.products}</TableCell>
                    <TableCell>{order.amount}</TableCell>
                    <TableCell>{order.status}</TableCell>
                    <TableCell>{order.date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
