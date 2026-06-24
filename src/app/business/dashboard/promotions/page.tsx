"use client";

import React, { useState } from "react";
import { Tags, Plus, Trash2, PauseCircle, PlayCircle, Percent, DollarSign } from "lucide-react";
import { toast } from "react-toastify";
import DashboardShell from "@/components/business/dashboard/DashboardShell";
import { EmptyState } from "@/components/feedback/EmptyState";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { formatCurrency } from "@/lib/currency";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type DiscountType = "percentage" | "fixed";
type PromoStatus = "active" | "paused" | "expired";

interface Promotion {
  id: number;
  name: string;
  code: string;
  type: DiscountType;
  value: number;
  minOrder: number | null;
  maxUses: number | null;
  uses: number;
  expiry: string;
  status: PromoStatus;
}

// ---------------------------------------------------------------------------
// Mock data
// ---------------------------------------------------------------------------

const INITIAL_PROMOS: Promotion[] = [
  {
    id: 1,
    name: "Summer Launch Special",
    code: "SUMMER20",
    type: "percentage",
    value: 20,
    minOrder: 25,
    maxUses: 100,
    uses: 42,
    expiry: "2026-08-31",
    status: "active",
  },
  {
    id: 2,
    name: "Loyalty Reward",
    code: "LOYAL5",
    type: "fixed",
    value: 5,
    minOrder: null,
    maxUses: null,
    uses: 89,
    expiry: "2026-06-28",
    status: "expired",
  },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function statusBadge(status: PromoStatus) {
  const variants: Record<PromoStatus, { label: string; classes: string }> = {
    active: { label: "Active", classes: "bg-green-100 text-green-700 border-green-200" },
    paused: { label: "Paused", classes: "bg-gray-100 text-gray-600 border-gray-200" },
    expired: { label: "Expired", classes: "bg-red-100 text-red-600 border-red-200" },
  };
  const v = variants[status];
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${v.classes}`}
    >
      {v.label}
    </span>
  );
}

function formatValue(promo: Promotion): string {
  if (promo.type === "percentage") return `${promo.value}%`;
  return formatCurrency(promo.value);
}

function formatExpiry(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

// ---------------------------------------------------------------------------
// Empty form state
// ---------------------------------------------------------------------------

const EMPTY_FORM = {
  name: "",
  code: "",
  type: "percentage" as DiscountType,
  value: "",
  minOrder: "",
  maxUses: "",
  expiry: "",
};

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function PromotionsPage() {
  const [promos, setPromos] = useState<Promotion[]>(INITIAL_PROMOS);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);

  // ---------- Summary stats ----------
  const activeCount = promos.filter((p) => p.status === "active").length;
  const totalDiscountGiven = promos.reduce((sum, p) => {
    if (p.type === "fixed") return sum + p.value * p.uses;
    return sum; // percentage totals need order amounts; approximate with 0 for now
  }, 0);
  const redemptionsThisMonth = promos.reduce((sum, p) => sum + p.uses, 0);

  // ---------- Form handlers ----------
  function handleFormChange(field: keyof typeof EMPTY_FORM, value: string) {
    setForm((prev) => ({
      ...prev,
      [field]: field === "code" ? value.toUpperCase() : value,
    }));
  }

  function handleCreate() {
    if (!form.name.trim() || !form.code.trim() || !form.value || !form.expiry) {
      toast.error("Please fill in all required fields.");
      return;
    }

    const newPromo: Promotion = {
      id: Date.now(),
      name: form.name.trim(),
      code: form.code.trim(),
      type: form.type,
      value: parseFloat(form.value) || 0,
      minOrder: form.minOrder ? parseFloat(form.minOrder) : null,
      maxUses: form.maxUses ? parseInt(form.maxUses) : null,
      uses: 0,
      expiry: form.expiry,
      status: "active",
    };

    setPromos((prev) => [newPromo, ...prev]);
    setForm(EMPTY_FORM);
    setDialogOpen(false);
    toast.success(`Promotion "${newPromo.code}" created!`);
  }

  function toggleStatus(id: number) {
    setPromos((prev) =>
      prev.map((p) => {
        if (p.id !== id) return p;
        const next: PromoStatus = p.status === "active" ? "paused" : "active";
        toast.success(`Promotion ${next === "active" ? "resumed" : "paused"}.`);
        return { ...p, status: next };
      })
    );
  }

  function deletePromo(id: number) {
    setPromos((prev) => prev.filter((p) => p.id !== id));
    toast.success("Promotion deleted.");
  }

  return (
    <DashboardShell title="Promotions">
      {/* ------------------------------------------------------------------ */}
      {/* Summary cards                                                       */}
      {/* ------------------------------------------------------------------ */}
      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        <Card className="border-l-4 border-l-amber-500 shadow-sm">
          <CardContent className="p-5">
            <p className="text-sm text-muted-foreground">Active Promotions</p>
            <p className="mt-1 text-3xl font-bold text-amber-600">{activeCount}</p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-blue-500 shadow-sm">
          <CardContent className="p-5">
            <p className="text-sm text-muted-foreground">Total Discount Given</p>
            <p className="mt-1 text-3xl font-bold text-blue-600">
              {formatCurrency(totalDiscountGiven)}
            </p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-green-500 shadow-sm">
          <CardContent className="p-5">
            <p className="text-sm text-muted-foreground">Redemptions This Month</p>
            <p className="mt-1 text-3xl font-bold text-green-600">{redemptionsThisMonth}</p>
          </CardContent>
        </Card>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Heading row with "Create" button                                    */}
      {/* ------------------------------------------------------------------ */}
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-800">Your Promotions</h2>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2 bg-amber-500 text-white hover:bg-amber-600">
              <Plus className="h-4 w-4" />
              Create Promotion
            </Button>
          </DialogTrigger>

          <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Create a New Promotion</DialogTitle>
            </DialogHeader>

            <div className="grid gap-4 py-2">
              {/* Promo name */}
              <div className="grid gap-1.5">
                <Label htmlFor="promo-name">
                  Promotion Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="promo-name"
                  placeholder="e.g. Summer Sale"
                  value={form.name}
                  onChange={(e) => handleFormChange("name", e.target.value)}
                />
              </div>

              {/* Code */}
              <div className="grid gap-1.5">
                <Label htmlFor="promo-code">
                  Promo Code <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="promo-code"
                  placeholder="e.g. SUMMER20"
                  value={form.code}
                  onChange={(e) => handleFormChange("code", e.target.value)}
                  className="font-mono tracking-widest"
                />
              </div>

              {/* Discount type */}
              <div className="grid gap-1.5">
                <Label>Discount Type</Label>
                <RadioGroup
                  value={form.type}
                  onValueChange={(v) => handleFormChange("type", v)}
                  className="flex gap-6"
                >
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="percentage" id="type-pct" />
                    <Label htmlFor="type-pct" className="flex cursor-pointer items-center gap-1">
                      <Percent className="h-4 w-4 text-amber-500" />
                      Percentage
                    </Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="fixed" id="type-fixed" />
                    <Label htmlFor="type-fixed" className="flex cursor-pointer items-center gap-1">
                      <DollarSign className="h-4 w-4 text-blue-500" />
                      Fixed Amount
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Discount value */}
              <div className="grid gap-1.5">
                <Label htmlFor="promo-value">
                  {form.type === "percentage" ? "Discount %" : "Discount Amount ($)"}{" "}
                  <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="promo-value"
                  type="number"
                  min={0}
                  placeholder={form.type === "percentage" ? "e.g. 15" : "e.g. 5.00"}
                  value={form.value}
                  onChange={(e) => handleFormChange("value", e.target.value)}
                />
              </div>

              {/* Min order */}
              <div className="grid gap-1.5">
                <Label htmlFor="promo-min">Minimum Order Value ($) — optional</Label>
                <Input
                  id="promo-min"
                  type="number"
                  min={0}
                  placeholder="e.g. 25"
                  value={form.minOrder}
                  onChange={(e) => handleFormChange("minOrder", e.target.value)}
                />
              </div>

              {/* Max uses */}
              <div className="grid gap-1.5">
                <Label htmlFor="promo-max-uses">Max Uses — optional</Label>
                <Input
                  id="promo-max-uses"
                  type="number"
                  min={1}
                  placeholder="e.g. 100 (leave blank for unlimited)"
                  value={form.maxUses}
                  onChange={(e) => handleFormChange("maxUses", e.target.value)}
                />
              </div>

              {/* Expiry date */}
              <div className="grid gap-1.5">
                <Label htmlFor="promo-expiry">
                  Expiry Date <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="promo-expiry"
                  type="date"
                  value={form.expiry}
                  onChange={(e) => handleFormChange("expiry", e.target.value)}
                />
              </div>
            </div>

            <DialogFooter className="gap-2">
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button
                className="bg-amber-500 text-white hover:bg-amber-600"
                onClick={handleCreate}
              >
                Create Promotion
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Promotions list / empty state                                       */}
      {/* ------------------------------------------------------------------ */}
      {promos.length === 0 ? (
        <EmptyState
          icon={<Tags className="h-12 w-12" />}
          title="No promotions yet"
          message="Create your first promotion to start attracting customers with discounts and promo codes."
          actionLabel="Create your first promotion"
          onAction={() => setDialogOpen(true)}
        />
      ) : (
        <>
          {/* Desktop table */}
          <div className="hidden overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm md:block">
            <table className="w-full text-sm">
              <thead className="border-b border-gray-100 bg-gray-50 text-xs uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="px-5 py-3.5 text-left">Code</th>
                  <th className="px-5 py-3.5 text-left">Name</th>
                  <th className="px-5 py-3.5 text-left">Type</th>
                  <th className="px-5 py-3.5 text-left">Value</th>
                  <th className="px-5 py-3.5 text-left">Uses</th>
                  <th className="px-5 py-3.5 text-left">Expires</th>
                  <th className="px-5 py-3.5 text-left">Status</th>
                  <th className="px-5 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {promos.map((promo) => (
                  <tr key={promo.id} className="transition-colors hover:bg-amber-50/40">
                    <td className="px-5 py-4">
                      <span className="rounded bg-amber-100 px-2 py-1 font-mono text-xs font-semibold text-amber-800">
                        {promo.code}
                      </span>
                    </td>
                    <td className="px-5 py-4 font-medium text-gray-900">{promo.name}</td>
                    <td className="px-5 py-4 capitalize text-gray-600">{promo.type}</td>
                    <td className="px-5 py-4 font-semibold text-amber-700">{formatValue(promo)}</td>
                    <td className="px-5 py-4">
                      <Badge variant="secondary" className="text-xs">
                        {promo.uses}
                        {promo.maxUses ? ` / ${promo.maxUses}` : ""}
                      </Badge>
                    </td>
                    <td className="px-5 py-4 text-gray-600">{formatExpiry(promo.expiry)}</td>
                    <td className="px-5 py-4">{statusBadge(promo.status)}</td>
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-2">
                        {promo.status !== "expired" && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="gap-1 text-xs text-gray-600 hover:text-amber-700"
                            onClick={() => toggleStatus(promo.id)}
                          >
                            {promo.status === "active" ? (
                              <>
                                <PauseCircle className="h-4 w-4" />
                                Pause
                              </>
                            ) : (
                              <>
                                <PlayCircle className="h-4 w-4" />
                                Resume
                              </>
                            )}
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          className="gap-1 text-xs text-red-500 hover:bg-red-50 hover:text-red-600"
                          onClick={() => deletePromo(promo.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                          Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="flex flex-col gap-4 md:hidden">
            {promos.map((promo) => (
              <Card key={promo.id} className="border border-gray-200 shadow-sm">
                <CardContent className="p-5">
                  <div className="mb-3 flex items-start justify-between">
                    <div>
                      <span className="rounded bg-amber-100 px-2 py-1 font-mono text-sm font-bold text-amber-800">
                        {promo.code}
                      </span>
                      <p className="mt-2 font-semibold text-gray-900">{promo.name}</p>
                    </div>
                    {statusBadge(promo.status)}
                  </div>

                  <div className="mb-4 grid grid-cols-2 gap-y-2 text-sm">
                    <span className="text-muted-foreground">Type</span>
                    <span className="capitalize">{promo.type}</span>
                    <span className="text-muted-foreground">Value</span>
                    <span className="font-semibold text-amber-700">{formatValue(promo)}</span>
                    <span className="text-muted-foreground">Uses</span>
                    <span>
                      {promo.uses}
                      {promo.maxUses ? ` / ${promo.maxUses}` : ""}
                    </span>
                    <span className="text-muted-foreground">Expires</span>
                    <span>{formatExpiry(promo.expiry)}</span>
                  </div>

                  <div className="flex gap-2">
                    {promo.status !== "expired" && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 gap-1 text-xs"
                        onClick={() => toggleStatus(promo.id)}
                      >
                        {promo.status === "active" ? (
                          <>
                            <PauseCircle className="h-4 w-4" />
                            Pause
                          </>
                        ) : (
                          <>
                            <PlayCircle className="h-4 w-4" />
                            Resume
                          </>
                        )}
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-1 text-xs text-red-500 hover:bg-red-50 hover:text-red-600"
                      onClick={() => deletePromo(promo.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      )}
    </DashboardShell>
  );
}
