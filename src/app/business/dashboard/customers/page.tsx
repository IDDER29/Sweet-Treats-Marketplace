"use client";

import React, { useState, useMemo } from "react";
import { Users, Search, TrendingUp, UserPlus, CreditCard, ShoppingBag } from "lucide-react";
import DashboardShell from "@/components/business/dashboard/DashboardShell";
import { EmptyState } from "@/components/feedback/EmptyState";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatCurrency } from "@/lib/currency";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface Customer {
  id: number;
  name: string;
  email: string;
  totalOrders: number;
  totalSpent: number;
  lastOrderDate: string;
  customerSince: string;
  isRepeat: boolean;
  isNewThisMonth: boolean;
}

type FilterValue = "all" | "new" | "repeat" | "top";

// ---------------------------------------------------------------------------
// Mock data
// ---------------------------------------------------------------------------

const MOCK_CUSTOMERS: Customer[] = [
  {
    id: 1,
    name: "Amelia Johnson",
    email: "amelia.j@example.com",
    totalOrders: 12,
    totalSpent: 284.5,
    lastOrderDate: "2026-06-20",
    customerSince: "2025-11-03",
    isRepeat: true,
    isNewThisMonth: false,
  },
  {
    id: 2,
    name: "Ben Okafor",
    email: "ben.okafor@example.com",
    totalOrders: 1,
    totalSpent: 34.0,
    lastOrderDate: "2026-06-22",
    customerSince: "2026-06-22",
    isRepeat: false,
    isNewThisMonth: true,
  },
  {
    id: 3,
    name: "Clara Nguyen",
    email: "clara.n@example.com",
    totalOrders: 7,
    totalSpent: 198.75,
    lastOrderDate: "2026-06-18",
    customerSince: "2026-01-14",
    isRepeat: true,
    isNewThisMonth: false,
  },
];

const FILTERS: { value: FilterValue; label: string }[] = [
  { value: "all", label: "All Customers" },
  { value: "new", label: "New (last 30 days)" },
  { value: "repeat", label: "Repeat Buyers" },
  { value: "top", label: "Top Spenders" },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

function CustomerAvatar({ name }: { name: string }) {
  const initials = getInitials(name);
  return (
    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-500 text-sm font-bold text-white shadow-sm">
      {initials}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function CustomersPage() {
  const [customers] = useState<Customer[]>(MOCK_CUSTOMERS);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<FilterValue>("all");

  // ---------- Summary stats ----------
  const totalCustomers = customers.length;
  const repeatCount = customers.filter((c) => c.isRepeat).length;
  const repeatPct = totalCustomers > 0 ? Math.round((repeatCount / totalCustomers) * 100) : 0;
  const newThisMonth = customers.filter((c) => c.isNewThisMonth).length;
  const avgOrderValue =
    totalCustomers > 0
      ? customers.reduce((sum, c) => sum + c.totalSpent / (c.totalOrders || 1), 0) / totalCustomers
      : 0;

  // ---------- Filtered list ----------
  const filtered = useMemo(() => {
    let result = customers;

    // text search
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (c) => c.name.toLowerCase().includes(q) || c.email.toLowerCase().includes(q)
      );
    }

    // segment filter
    if (filter === "new") result = result.filter((c) => c.isNewThisMonth);
    if (filter === "repeat") result = result.filter((c) => c.isRepeat);
    if (filter === "top") result = [...result].sort((a, b) => b.totalSpent - a.totalSpent);

    return result;
  }, [customers, search, filter]);

  return (
    <DashboardShell title="Customers">
      {/* ------------------------------------------------------------------ */}
      {/* Summary cards                                                       */}
      {/* ------------------------------------------------------------------ */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="border-l-4 border-l-amber-500 shadow-sm">
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-amber-100">
              <Users className="h-5 w-5 text-amber-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Customers</p>
              <p className="text-2xl font-bold text-amber-600">{totalCustomers}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500 shadow-sm">
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-100">
              <TrendingUp className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Repeat Customers</p>
              <p className="text-2xl font-bold text-blue-600">{repeatPct}%</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500 shadow-sm">
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-green-100">
              <UserPlus className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">New This Month</p>
              <p className="text-2xl font-bold text-green-600">{newThisMonth}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500 shadow-sm">
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-orange-100">
              <CreditCard className="h-5 w-5 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Avg Order Value</p>
              <p className="text-2xl font-bold text-orange-600">{formatCurrency(avgOrderValue)}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Search + filter row                                                 */}
      {/* ------------------------------------------------------------------ */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 sm:max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by name or email…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>

        <Select value={filter} onValueChange={(v) => setFilter(v as FilterValue)}>
          <SelectTrigger className="w-full sm:w-52">
            <SelectValue placeholder="Filter customers" />
          </SelectTrigger>
          <SelectContent>
            {FILTERS.map((f) => (
              <SelectItem key={f.value} value={f.value}>
                {f.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Customer list                                                       */}
      {/* ------------------------------------------------------------------ */}
      {filtered.length === 0 ? (
        search || filter !== "all" ? (
          <EmptyState
            icon={<Search className="h-12 w-12" />}
            title="No customers found"
            message="Try adjusting your search or filter to find what you're looking for."
          />
        ) : (
          <EmptyState
            icon={<Users className="h-12 w-12" />}
            title="No customers yet"
            message="Your customers will appear here once they place their first order with your store."
          />
        )
      ) : (
        <>
          {/* Desktop table */}
          <div className="hidden overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm lg:block">
            <table className="w-full text-sm">
              <thead className="border-b border-gray-100 bg-gray-50 text-xs uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="px-5 py-3.5 text-left">Customer</th>
                  <th className="px-5 py-3.5 text-left">Orders</th>
                  <th className="px-5 py-3.5 text-left">Total Spent</th>
                  <th className="px-5 py-3.5 text-left">Last Order</th>
                  <th className="px-5 py-3.5 text-left">Customer Since</th>
                  <th className="px-5 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.map((customer) => (
                  <tr key={customer.id} className="transition-colors hover:bg-amber-50/40">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <CustomerAvatar name={customer.name} />
                        <div>
                          <p className="font-semibold text-gray-900">{customer.name}</p>
                          <p className="text-xs text-muted-foreground">{customer.email}</p>
                        </div>
                        {customer.isNewThisMonth && (
                          <Badge className="bg-green-100 text-green-700 hover:bg-green-100 text-xs">
                            New
                          </Badge>
                        )}
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <Badge
                        variant="secondary"
                        className="gap-1 border border-amber-200 bg-amber-50 text-amber-700"
                      >
                        <ShoppingBag className="h-3 w-3" />
                        {customer.totalOrders}
                      </Badge>
                    </td>
                    <td className="px-5 py-4 font-semibold text-gray-900">
                      {formatCurrency(customer.totalSpent)}
                    </td>
                    <td className="px-5 py-4 text-gray-600">{formatDate(customer.lastOrderDate)}</td>
                    <td className="px-5 py-4 text-gray-600">{formatDate(customer.customerSince)}</td>
                    <td className="px-5 py-4 text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-xs text-amber-600 hover:bg-amber-50 hover:text-amber-700"
                      >
                        View orders
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="flex flex-col gap-4 lg:hidden">
            {filtered.map((customer) => (
              <Card key={customer.id} className="border border-gray-200 shadow-sm">
                <CardContent className="p-5">
                  {/* Header */}
                  <div className="mb-4 flex items-start gap-3">
                    <CustomerAvatar name={customer.name} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="font-semibold text-gray-900">{customer.name}</p>
                        {customer.isNewThisMonth && (
                          <Badge className="bg-green-100 text-green-700 hover:bg-green-100 text-xs">
                            New
                          </Badge>
                        )}
                      </div>
                      <p className="truncate text-xs text-muted-foreground">{customer.email}</p>
                    </div>
                  </div>

                  {/* Stats grid */}
                  <div className="mb-4 grid grid-cols-2 gap-y-3 text-sm">
                    <div>
                      <p className="text-xs text-muted-foreground">Total Orders</p>
                      <div className="mt-0.5 flex items-center gap-1">
                        <ShoppingBag className="h-3.5 w-3.5 text-amber-500" />
                        <span className="font-semibold">{customer.totalOrders}</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Total Spent</p>
                      <p className="mt-0.5 font-semibold text-amber-700">
                        {formatCurrency(customer.totalSpent)}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Last Order</p>
                      <p className="mt-0.5 text-gray-700">{formatDate(customer.lastOrderDate)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Customer Since</p>
                      <p className="mt-0.5 text-gray-700">{formatDate(customer.customerSince)}</p>
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full text-xs text-amber-600 hover:bg-amber-50 hover:text-amber-700"
                  >
                    View orders
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      )}
    </DashboardShell>
  );
}
