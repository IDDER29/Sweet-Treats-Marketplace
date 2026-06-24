"use client";

import React, { useState, useMemo } from "react";
import {
  Package,
  Search,
  AlertTriangle,
  TrendingDown,
  CheckCircle2,
  XCircle,
  ChevronDown,
  Edit2,
  Check,
  X,
} from "lucide-react";
import { toast } from "react-toastify";

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
import { EmptyState } from "@/components/feedback/EmptyState";

type StockStatus = "in_stock" | "limited" | "out_of_stock";

interface InventoryProduct {
  id: string;
  name: string;
  category: string;
  status: StockStatus;
  stock: number;
  lastUpdated: string;
}

const MOCK_PRODUCTS: InventoryProduct[] = [
  {
    id: "1",
    name: "Chocolate Lava Cake",
    category: "Cakes",
    status: "in_stock",
    stock: 48,
    lastUpdated: "2026-06-23T14:30:00Z",
  },
  {
    id: "2",
    name: "Strawberry Macarons (Box of 6)",
    category: "Macarons",
    status: "limited",
    stock: 6,
    lastUpdated: "2026-06-24T08:15:00Z",
  },
  {
    id: "3",
    name: "Honey Baklava Roll",
    category: "Pastries",
    status: "out_of_stock",
    stock: 0,
    lastUpdated: "2026-06-22T18:00:00Z",
  },
  {
    id: "4",
    name: "Almond Croissant",
    category: "Pastries",
    status: "in_stock",
    stock: 32,
    lastUpdated: "2026-06-24T07:00:00Z",
  },
  {
    id: "5",
    name: "Vanilla Bean Cheesecake",
    category: "Cakes",
    status: "limited",
    stock: 3,
    lastUpdated: "2026-06-23T20:45:00Z",
  },
];

const CATEGORIES = ["All Categories", "Cakes", "Macarons", "Pastries", "Cookies", "Drinks"];

function statusLabel(status: StockStatus): string {
  switch (status) {
    case "in_stock":
      return "In Stock";
    case "limited":
      return "Limited";
    case "out_of_stock":
      return "Out of Stock";
  }
}

function StatusBadge({ status }: { status: StockStatus }) {
  if (status === "in_stock") {
    return (
      <Badge className="bg-green-100 text-green-800 border-green-200 hover:bg-green-100">
        <CheckCircle2 className="mr-1 h-3 w-3" />
        In Stock
      </Badge>
    );
  }
  if (status === "limited") {
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
      Out of Stock
    </Badge>
  );
}

function formatRelativeDate(isoString: string): string {
  const date = new Date(isoString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  if (diffHours < 1) return "Just now";
  if (diffHours < 24) return `${diffHours}h ago`;
  const diffDays = Math.floor(diffHours / 24);
  if (diffDays === 1) return "Yesterday";
  return `${diffDays} days ago`;
}

function StockEditCell({
  product,
  onSave,
}: {
  product: InventoryProduct;
  onSave: (id: string, stock: number) => void;
}) {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(String(product.stock));

  function handleSave() {
    const parsed = parseInt(value, 10);
    if (isNaN(parsed) || parsed < 0 || parsed > 9999) {
      toast.error("Please enter a valid stock number (0–9999).");
      return;
    }
    onSave(product.id, parsed);
    setEditing(false);
  }

  function handleCancel() {
    setValue(String(product.stock));
    setEditing(false);
  }

  if (!editing) {
    return (
      <div className="flex items-center gap-2">
        <span className="font-medium tabular-nums">{product.stock}</span>
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6 text-muted-foreground hover:text-amber-700"
          onClick={() => setEditing(true)}
        >
          <Edit2 className="h-3.5 w-3.5" />
        </Button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-1.5">
      <Input
        type="number"
        min={0}
        max={9999}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="h-8 w-20 text-sm"
        autoFocus
        onKeyDown={(e) => {
          if (e.key === "Enter") handleSave();
          if (e.key === "Escape") handleCancel();
        }}
      />
      <Button
        size="icon"
        className="h-7 w-7 bg-green-600 hover:bg-green-700 text-white"
        onClick={handleSave}
      >
        <Check className="h-3.5 w-3.5" />
      </Button>
      <Button
        size="icon"
        variant="ghost"
        className="h-7 w-7 text-muted-foreground hover:text-red-600"
        onClick={handleCancel}
      >
        <X className="h-3.5 w-3.5" />
      </Button>
    </div>
  );
}

function QuickStatusCell({
  product,
  onStatusChange,
}: {
  product: InventoryProduct;
  onStatusChange: (id: string, status: StockStatus) => void;
}) {
  return (
    <Select
      value={product.status}
      onValueChange={(val) => onStatusChange(product.id, val as StockStatus)}
    >
      <SelectTrigger className="h-8 w-36 text-xs">
        <SelectValue />
        <ChevronDown className="h-3 w-3 ml-1 opacity-50" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="in_stock">In Stock</SelectItem>
        <SelectItem value="limited">Limited</SelectItem>
        <SelectItem value="out_of_stock">Out of Stock</SelectItem>
      </SelectContent>
    </Select>
  );
}

function BulkUpdateDialog({
  selectedIds,
  onBulkUpdate,
}: {
  selectedIds: string[];
  onBulkUpdate: (status: StockStatus) => void;
}) {
  const [open, setOpen] = useState(false);
  const [bulkStatus, setBulkStatus] = useState<StockStatus>("in_stock");

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
        >
          Bulk Update
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Bulk Update Stock Status</DialogTitle>
          <DialogDescription>
            Set all {MOCK_PRODUCTS.length} products to the same availability status at once.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 space-y-3">
          <label className="text-sm font-medium text-gray-700">
            New status for all products
          </label>
          <Select
            value={bulkStatus}
            onValueChange={(val) => setBulkStatus(val as StockStatus)}
          >
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="in_stock">In Stock</SelectItem>
              <SelectItem value="limited">Limited</SelectItem>
              <SelectItem value="out_of_stock">Out of Stock</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-xs text-muted-foreground">
            This will update the availability label for every product in your inventory. Individual stock numbers are not changed.
          </p>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            className="bg-amber-600 hover:bg-amber-700 text-white"
            onClick={handleApply}
          >
            Apply to All
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default function InventoryPage() {
  const [products, setProducts] = useState<InventoryProduct[]>(MOCK_PRODUCTS);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");
  const [stockFilter, setStockFilter] = useState("all");

  const totalProducts = products.length;
  const lowStockCount = products.filter((p) => p.status === "limited").length;
  const outOfStockCount = products.filter((p) => p.status === "out_of_stock").length;

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const q = search.trim().toLowerCase();
      const matchesSearch =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q);
      const matchesCategory =
        categoryFilter === "All Categories" || p.category === categoryFilter;
      const matchesStock =
        stockFilter === "all" ||
        (stockFilter === "in_stock" && p.status === "in_stock") ||
        (stockFilter === "limited" && p.status === "limited") ||
        (stockFilter === "out_of_stock" && p.status === "out_of_stock");
      return matchesSearch && matchesCategory && matchesStock;
    });
  }, [products, search, categoryFilter, stockFilter]);

  function handleStockSave(id: string, stock: number) {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id !== id) return p;
        const newStatus: StockStatus =
          stock === 0 ? "out_of_stock" : stock <= 5 ? "limited" : p.status === "out_of_stock" ? "in_stock" : p.status;
        return {
          ...p,
          stock,
          status: newStatus,
          lastUpdated: new Date().toISOString(),
        };
      })
    );
    toast.success("Stock updated successfully.");
  }

  function handleStatusChange(id: string, status: StockStatus) {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, status, lastUpdated: new Date().toISOString() }
          : p
      )
    );
    toast.success(`Status updated to ${statusLabel(status)}.`);
  }

  function handleBulkUpdate(status: StockStatus) {
    setProducts((prev) =>
      prev.map((p) => ({ ...p, status, lastUpdated: new Date().toISOString() }))
    );
    toast.success(`All products set to ${statusLabel(status)}.`);
  }

  return (
    <DashboardShell title="Inventory">
      {/* Out of stock alert banner */}
      {outOfStockCount > 0 && (
        <div className="mb-6 flex items-start gap-3 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3">
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
          <div>
            <p className="text-sm font-semibold text-amber-900">
              {outOfStockCount} product{outOfStockCount > 1 ? "s are" : " is"} out of stock
            </p>
            <p className="text-xs text-amber-700 mt-0.5">
              Customers cannot order out-of-stock items. Update their stock levels or change their availability status.
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
            <p className="text-3xl font-bold text-gray-900">{totalProducts}</p>
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
            <p className="text-3xl font-bold text-amber-700">{lowStockCount}</p>
            <p className="text-xs text-muted-foreground mt-0.5">Limited availability</p>
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
            <p className="text-3xl font-bold text-red-700">{outOfStockCount}</p>
            <p className="text-xs text-muted-foreground mt-0.5">Unavailable to customers</p>
          </CardContent>
        </Card>
      </div>

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
              {CATEGORIES.map((cat) => (
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
              <SelectItem value="in_stock">In Stock</SelectItem>
              <SelectItem value="limited">Low Stock</SelectItem>
              <SelectItem value="out_of_stock">Out of Stock</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <BulkUpdateDialog selectedIds={[]} onBulkUpdate={handleBulkUpdate} />
      </div>

      {/* Inventory table */}
      {filtered.length === 0 ? (
        <EmptyState
          icon={<Package className="h-10 w-10" />}
          title="No products match your filters"
          message="Try adjusting your search or filter criteria to find products."
          onAction={() => {
            setSearch("");
            setCategoryFilter("All Categories");
            setStockFilter("all");
          }}
          actionLabel="Clear filters"
        />
      ) : (
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead className="font-semibold text-gray-700">Product</TableHead>
                    <TableHead className="font-semibold text-gray-700 hidden sm:table-cell">Category</TableHead>
                    <TableHead className="font-semibold text-gray-700">Status</TableHead>
                    <TableHead className="font-semibold text-gray-700">Stock Level</TableHead>
                    <TableHead className="font-semibold text-gray-700 hidden md:table-cell">Last Updated</TableHead>
                    <TableHead className="font-semibold text-gray-700">Quick Update</TableHead>
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
                          <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-amber-200 to-orange-300 shrink-0 flex items-center justify-center">
                            <Package className="h-4 w-4 text-amber-800" />
                          </div>
                          <span className="font-medium text-gray-900 text-sm leading-tight">
                            {product.name}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        <span className="text-sm text-muted-foreground">{product.category}</span>
                      </TableCell>
                      <TableCell>
                        <StatusBadge status={product.status} />
                      </TableCell>
                      <TableCell>
                        <StockEditCell product={product} onSave={handleStockSave} />
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <span className="text-xs text-muted-foreground">
                          {formatRelativeDate(product.lastUpdated)}
                        </span>
                      </TableCell>
                      <TableCell>
                        <QuickStatusCell
                          product={product}
                          onStatusChange={handleStatusChange}
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
    </DashboardShell>
  );
}
