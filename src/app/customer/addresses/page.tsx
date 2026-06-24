"use client";

import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  MapPin,
  Plus,
  Pencil,
  Trash2,
  Home,
  Building2,
  Star,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { LoadingState } from "@/components/feedback/LoadingState";
import { ErrorState } from "@/components/feedback/ErrorState";
import { EmptyState } from "@/components/feedback/EmptyState";
import { getMyProfile, updateMyProfile } from "@/services/customers";
import type { Address, Customer } from "@/types";
import { toast } from "react-toastify";

function emptyAddress(): Address {
  return {
    fullName: "",
    line1: "",
    line2: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
    phone: "",
    instructions: "",
  };
}

const ADDRESS_TYPES = [
  { label: "Home", icon: Home },
  { label: "Work", icon: Building2 },
  { label: "Other", icon: MapPin },
];

function AddressForm({
  initial,
  onSave,
  onCancel,
  saving,
}: {
  initial: Address;
  onSave: (addr: Address) => void;
  onCancel: () => void;
  saving: boolean;
}) {
  const [form, setForm] = useState<Address>(initial);
  const [type, setType] = useState("Home");

  const set = (k: keyof Address) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((prev) => ({ ...prev, [k]: e.target.value }));

  return (
    <div className="space-y-5">
      {/* Address type */}
      <div>
        <Label className="mb-2 block">Address type</Label>
        <div className="flex gap-2">
          {ADDRESS_TYPES.map(({ label, icon: Icon }) => (
            <button
              key={label}
              type="button"
              onClick={() => setType(label)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-sm font-medium transition-colors ${
                type === label
                  ? "border-amber-500 bg-amber-50 text-amber-700"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <Icon className="h-3.5 w-3.5" />
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="sm:col-span-2">
          <Label htmlFor="fullName">Full name</Label>
          <Input id="fullName" className="mt-1" value={form.fullName ?? ""} onChange={set("fullName")} placeholder="Jane Smith" />
        </div>
        <div className="sm:col-span-2">
          <Label htmlFor="line1">Street address *</Label>
          <Input id="line1" required className="mt-1" value={form.line1} onChange={set("line1")} placeholder="123 Maple Street" />
        </div>
        <div className="sm:col-span-2">
          <Label htmlFor="line2">Apt, suite, unit (optional)</Label>
          <Input id="line2" className="mt-1" value={form.line2 ?? ""} onChange={set("line2")} placeholder="Apt 4B" />
        </div>
        <div>
          <Label htmlFor="city">City *</Label>
          <Input id="city" required className="mt-1" value={form.city} onChange={set("city")} placeholder="New York" />
        </div>
        <div>
          <Label htmlFor="state">State / Province</Label>
          <Input id="state" className="mt-1" value={form.state ?? ""} onChange={set("state")} placeholder="NY" />
        </div>
        <div>
          <Label htmlFor="postalCode">Postal code</Label>
          <Input id="postalCode" className="mt-1" value={form.postalCode ?? ""} onChange={set("postalCode")} placeholder="10001" />
        </div>
        <div>
          <Label htmlFor="country">Country</Label>
          <Input id="country" className="mt-1" value={form.country ?? ""} onChange={set("country")} placeholder="United States" />
        </div>
        <div className="sm:col-span-2">
          <Label htmlFor="phone">Phone number (for delivery)</Label>
          <Input id="phone" type="tel" className="mt-1" value={form.phone ?? ""} onChange={set("phone")} placeholder="+1 555 000 0000" />
        </div>
        <div className="sm:col-span-2">
          <Label htmlFor="instructions">Delivery instructions (optional)</Label>
          <Input id="instructions" className="mt-1" value={form.instructions ?? ""} onChange={set("instructions")} placeholder="Leave at door, ring bell twice…" />
        </div>
      </div>

      <DialogFooter>
        <Button variant="outline" onClick={onCancel}>Cancel</Button>
        <Button
          disabled={saving || !form.line1.trim() || !form.city.trim()}
          className="bg-amber-600 hover:bg-amber-700 text-white"
          onClick={() => onSave({ ...form, fullName: form.fullName || type })}
        >
          {saving ? "Saving…" : "Save address"}
        </Button>
      </DialogFooter>
    </div>
  );
}

function AddressCard({
  address,
  index,
  isDefault,
  onEdit,
  onDelete,
  onSetDefault,
}: {
  address: Address;
  index: number;
  isDefault: boolean;
  onEdit: () => void;
  onDelete: () => void;
  onSetDefault: () => void;
}) {
  return (
    <Card className={`relative ${isDefault ? "ring-2 ring-amber-400" : ""}`}>
      <CardContent className="p-4 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="rounded-full bg-amber-100 p-1.5">
              <MapPin className="h-3.5 w-3.5 text-amber-700" />
            </div>
            <p className="font-semibold text-sm">
              {address.fullName || `Address ${index + 1}`}
            </p>
            {isDefault && (
              <Badge className="bg-amber-500 hover:bg-amber-500 text-white text-xs py-0">
                Default
              </Badge>
            )}
          </div>
          <div className="flex gap-1">
            <Button variant="ghost" size="icon" className="h-7 w-7" onClick={onEdit} aria-label="Edit">
              <Pencil className="h-3.5 w-3.5" />
            </Button>
            <Button variant="ghost" size="icon" className="h-7 w-7 hover:text-red-600 hover:bg-red-50" onClick={onDelete} aria-label="Delete">
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>

        <div className="text-sm text-muted-foreground leading-relaxed">
          {address.line1}
          {address.line2 && `, ${address.line2}`}
          <br />
          {[address.city, address.state, address.postalCode].filter(Boolean).join(", ")}
          {address.country && `, ${address.country}`}
          {address.phone && (
            <><br />{address.phone}</>
          )}
          {address.instructions && (
            <p className="mt-1 text-xs italic">{address.instructions}</p>
          )}
        </div>

        {!isDefault && (
          <button
            onClick={onSetDefault}
            className="text-xs text-amber-700 hover:text-amber-800 font-medium flex items-center gap-1"
          >
            <Star className="h-3 w-3" />
            Set as default
          </button>
        )}
      </CardContent>
    </Card>
  );
}

export default function AddressesPage() {
  const queryClient = useQueryClient();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [defaultIndex, setDefaultIndex] = useState(0);

  const { data: profile, isLoading, isError, refetch } = useQuery<Customer>({
    queryKey: ["customer-profile"],
    queryFn: getMyProfile,
  });

  const mutation = useMutation({
    mutationFn: (addresses: Address[]) => updateMyProfile({ addresses }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customer-profile"] });
      setDialogOpen(false);
      toast.success("Addresses saved.");
    },
    onError: () => toast.error("Failed to save. Please try again."),
  });

  const addresses: Address[] = profile?.addresses ?? [];

  function handleSave(addr: Address) {
    const updated = [...addresses];
    if (editIndex !== null) {
      updated[editIndex] = addr;
    } else {
      updated.push(addr);
    }
    mutation.mutate(updated);
  }

  function handleDelete(index: number) {
    const updated = addresses.filter((_, i) => i !== index);
    if (defaultIndex >= updated.length) setDefaultIndex(Math.max(0, updated.length - 1));
    mutation.mutate(updated);
  }

  function openAdd() {
    setEditIndex(null);
    setDialogOpen(true);
  }

  function openEdit(index: number) {
    setEditIndex(index);
    setDialogOpen(true);
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Delivery addresses</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Manage your saved delivery addresses for faster checkout.
          </p>
        </div>
        <Button
          className="bg-amber-600 hover:bg-amber-700 text-white gap-2"
          onClick={openAdd}
        >
          <Plus className="h-4 w-4" />
          Add address
        </Button>
      </div>

      {isLoading ? (
        <LoadingState rows={3} />
      ) : isError ? (
        <ErrorState onRetry={refetch} />
      ) : addresses.length === 0 ? (
        <EmptyState
          icon={<MapPin className="h-10 w-10" />}
          title="No saved addresses"
          message="Add a delivery address to speed up checkout on future orders."
          actionLabel="Add your first address"
          onAction={openAdd}
        />
      ) : (
        <div className="space-y-4">
          {addresses.map((addr, i) => (
            <AddressCard
              key={i}
              address={addr}
              index={i}
              isDefault={i === defaultIndex}
              onEdit={() => openEdit(i)}
              onDelete={() => handleDelete(i)}
              onSetDefault={() => setDefaultIndex(i)}
            />
          ))}
          <button
            onClick={openAdd}
            className="w-full border-2 border-dashed border-gray-200 rounded-xl p-4 text-sm text-muted-foreground hover:border-amber-300 hover:text-amber-700 transition-colors flex items-center justify-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Add another address
          </button>
        </div>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {editIndex !== null ? "Edit address" : "Add new address"}
            </DialogTitle>
          </DialogHeader>
          <AddressForm
            initial={editIndex !== null ? addresses[editIndex] : emptyAddress()}
            onSave={handleSave}
            onCancel={() => setDialogOpen(false)}
            saving={mutation.isPending}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
