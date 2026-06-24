"use client";

import React, { useState, useMemo } from "react";
import {
  Package,
  Search,
  AlertTriangle,
  TrendingDown,
  CheckCircle2,
  XCircle,
  Boxes,
} from "lucide-react";
import { toast } from "react-toastify";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import DashboardShell from "@/components/business/dashboard/DashboardShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { LoadingState } from "@/components/feedback/LoadingState";
import { ErrorState } from "@/components/feedback/ErrorState";
import { EmptyState } from "@/components/feedback/EmptyState";
import { getMyStoreProducts } from "@/services/stores";
import { updateProduct } from "@/utils/api";
import { formatCurrency } from "@/lib/currency";
import type { Product, AvailabilityStatus } from "@/types";

const AVAILABILITY_OPTIONS: AvailabilityStatus[] = [
  "In Stock",
  "Out of Stock",
  "Limited",
];

const CATEGORY_ALL = "All Categories";

function StatusBadge({ status }: { status: string }) {
  if (status === "In Stock") {
    return (
      <Badge className="bg-green-100 text-green-800 border-green-200 hover:bg-green-100">
        <CheckCircle2 className="mr-1 h-3 w-3" />
        In Stock
      </Badge>
    );
  }
  if (status === "Limited") {
    return (
      <Badge className="bg-amber-100 text-amber-800 border-amber-200 hover:bg-amber-100">
        <TrendingDown className="mr-1 h-3 w-3" />
        Limited
      </Badge>
    );
  }
  return (
    <Badge className="bg-red-100 text-red-800 border-red-200 hover:bg-red-100">
      <XCircle className="mr-1 h-3 w-3" />
      {status || "Out of Stock"}
    </Badge>
  );
}

function QuickStatusCell({
  product,
  onStatusChange,
  isPending,
}: {
  product: Product;
  onStatusChange: (id: string, availability: AvailabilityStatus) => void;
  isPending: boolean;
}) {
  return (
    <Select
      value={product.availability ?? "In Stock"}
      onValueChange={(val) =>
        onStatusChange(product.id, val as AvailabilityStatus)
      }
      disabled={isPending}
    >
      <SelectTrigger className="h-8 w-36 text-xs">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {AVAILABILITY_OPTIONS.map((opt) => (
          <SelectItem key={opt} value={opt}>
            {opt}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

function BulkUpdateDialog({
  productCount,
  onBulkUpdate,
  isPending,
}: {
  productCount: number;
  onBulkUpdate: (availability: AvailabilityStatus) => void;
  isPending: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [bulkStatus, setBulkStatus] = useState<AvailabilityStatus>("In Stock");

  function handleApply() {
    onBulkUpdate(bulkStatus);
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="border-amber-300 text-amber-800 hover:bg-amber-50"
          disabled={productCount === 0}
        >
          Bulk Update
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Bulk Update Availability</DialogTitle>
          <DialogDescription>
            Set all {productCount} product{productCount !== 1 ? "s" : ""} to the
            same availability status at once.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 space-y-3">
          <label className="text-sm font-medium text-gray-700">
            New status for all products
          </label>
          <Select
            value={bulkStatus}
            onValueChange={(val) => setBulkStatus(val as AvailabilityStatus)}
          >
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {AVAILABILITY_OPTIONS.map((opt) => (
                <SelectItem key={opt} value={opt}>
                  {opt}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-xs text-muted-foreground">
            This will update the availability label for every product in your
            inventory.
          </p>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            className="bg-amber-600 hover:bg-amber-700 text-white"
            onClick={handleApply}
            disabled={isPending}
          >
            {isPending ? "Updating…" : "Apply to All"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default function InventoryPage() {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState(CATEGORY_ALL);
  const [stockFilter, setStockFilter] = useState("all");
  const [pendingIds, setPendingIds] = useState<Set<string>>(new Set());
  const [isBulkPending, setIsBulkPending] = useState(false);

  const {
    data: products = [],
    isLoading,
    isError,
    refetch,
  } = useQuery<Product[]>({
    queryKey: ["my-products"],
    queryFn: getMyStoreProducts,
  });

  // Derive dynamic category list from real products
  const categories = useMemo(() => {
    const cats = Array.from(new Set(products.map((p) => p.category).filter(Boolean)));
    return [CATEGORY_ALL, ...cats];
  }, [products]);

  const inStockCount = products.filter(
    (p) => p.availability === "In Stock"
  ).length;
  const lowStockCount = products.filter(
    (p) => p.availability === "Limited"
  ).length;
  const outOfStockCount = products.filter(
    (p) => p.availability === "Out of Stock"
  ).length;

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const q = search.trim().toLowerCase();
      const matchesSearch =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q);
      const matchesCategory =
        categoryFilter === CATEGORY_ALL || p.category === categoryFilter;
      const matchesStock =
        stockFilter === "all" ||
        (stockFilter === "In Stock" && p.availability === "In Stock") ||
        (stockFilter === "Limited" && p.availability === "Limited") ||
        (stockFilter === "Out of Stock" && p.availability === "Out of Stock");
      return matchesSearch && matchesCategory && matchesStock;
    });
  }, [products, search, categoryFilter, stockFilter]);

  async function handleStatusChange(id: string, availability: AvailabilityStatus) {
    setPendingIds((prev) => new Set(prev).add(id));
    try {
      await updateProduct(id, { availability });
      await queryClient.invalidateQueries({ queryKey: ["my-products"] });
      toast.success(`Updated to "${availability}".`);
    } catch {
      toast.error("Failed to update availability. Please try again.");
    } finally {
      setPendingIds((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    }
  }

  async function handleBulkUpdate(availability: AvailabilityStatus) {
    if (products.length === 0) return;
    setIsBulkPending(true);
    try {
      await Promise.all(
        products.map((p) => updateProduct(p.id, { availability }))
      );
      await queryClient.invalidateQueries({ queryKey: ["my-products"] });
      toast.success(
        `All products set to "${availability}".`
      );
    } catch {
      toast.error("Bulk update failed. Some products may not have been updated.");
    } finally {
      setIsBulkPending(false);
    }
  }

  function clearFilters() {
    setSearch("");
    setCategoryFilter(CATEGORY_ALL);
    setStockFilter("all");
  }

  return (
    <DashboardShell title="Inventory">
      {/* Out of stock alert banner */}
      {!isLoading && !isError && outOfStockCount > 0 && (
        <div className="mb-6 flex items-start gap-3 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3">
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
          <div>
            <p className="text-sm font-semibold text-amber-900">
              {outOfStockCount} product{outOfStockCount > 1 ? "s are" : " is"}{" "}
              out of stock
            </p>
            <p className="text-xs text-amber-700 mt-0.5">
              Customers cannot order out-of-stock items. Change their
              availability status to make them orderable again.
            </p>
          </div>
        </div>
      )}

      {/* Summary cards */}
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <Card className="border-l-4 border-l-amber-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Package className="h-4 w-4" />
              Total Products
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-gray-900">
              {isLoading ? "—" : products.length}
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-amber-400">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <TrendingDown className="h-4 w-4 text-amber-600" />
              Low Stock
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-amber-700">
              {isLoading ? "—" : lowStockCount}
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              Limited availability
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-red-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <XCircle className="h-4 w-4 text-red-600" />
              Out of Stock
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-red-700">
              {isLoading ? "—" : outOfStockCount}
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              Unavailable to customers
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Loading / error states */}
      {isLoading ? (
        <LoadingState rows={5} />
      ) : isError ? (
        <ErrorState onRetry={refetch} />
      ) : products.length === 0 ? (
        <EmptyState
          icon={<Boxes className="h-10 w-10" />}
          title="No products yet"
          message="Add your first product to start managing inventory."
          actionLabel="Add product"
          actionHref="/business/dashboard/products/add"
        />
      ) : (
        <>
          {/* Filters row */}
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-1 flex-col gap-2 sm:flex-row sm:items-center">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search products..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9"
                />
              </div>

              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full sm:w-44">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={stockFilter} onValueChange={setStockFilter}>
                <SelectTrigger className="w-full sm:w-44">
                  <SelectValue placeholder="Stock status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  {AVAILABILITY_OPTIONS.map((opt) => (
                    <SelectItem key={opt} value={opt}>
                      {opt}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <BulkUpdateDialog
              productCount={products.length}
              onBulkUpdate={handleBulkUpdate}
              isPending={isBulkPending}
            />
          </div>

          {/* Inventory table */}
          {filtered.length === 0 ? (
            <EmptyState
              icon={<Package className="h-10 w-10" />}
              title="No products match your filters"
              message="Try adjusting your search or filter criteria to find products."
              actionLabel="Clear filters"
              onAction={clearFilters}
            />
          ) : (
            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-gray-50">
                        <TableHead className="font-semibold text-gray-700">
                          Product
                        </TableHead>
                        <TableHead className="font-semibold text-gray-700 hidden sm:table-cell">
                          Category
                        </TableHead>
                        <TableHead className="font-semibold text-gray-700 hidden md:table-cell">
                          Price
                        </TableHead>
                        <TableHead className="font-semibold text-gray-700">
                          Status
                        </TableHead>
                        <TableHead className="font-semibold text-gray-700">
                          Quick Update
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filtered.map((product) => (
                        <TableRow
                          key={product.id}
                          className="hover:bg-amber-50/40 transition-colors"
                        >
                          <TableCell>
                            <div className="flex items-center gap-3">
                              {product.images?.[0]?.url ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img
                                  src={product.images[0].url}
                                  alt={product.name}
                                  className="h-10 w-10 rounded-lg object-cover shrink-0"
                                />
                              ) : (
                                <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-amber-200 to-orange-300 shrink-0 flex items-center justify-center">
                                  <Package className="h-4 w-4 text-amber-800" />
                                </div>
                              )}
                              <span className="font-medium text-gray-900 text-sm leading-tight">
                                {product.name}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">
                            <span className="text-sm text-muted-foreground">
                              {product.category}
                            </span>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            <span className="text-sm font-medium text-gray-900">
                              {formatCurrency(product.price)}
                            </span>
                          </TableCell>
                          <TableCell>
                            <StatusBadge
                              status={product.availability ?? "In Stock"}
                            />
                          </TableCell>
                          <TableCell>
                            <QuickStatusCell
                              product={product}
                              onStatusChange={handleStatusChange}
                              isPending={
                                pendingIds.has(product.id) || isBulkPending
                              }
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          )}
        </>
      )}
    </DashboardShell>
  );
}
