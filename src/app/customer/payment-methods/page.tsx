"use client";

import { useState } from "react";
import {
  CreditCard,
  Plus,
  Trash2,
  Star,
  ShieldCheck,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { EmptyState } from "@/components/feedback/EmptyState";
import { toast } from "react-toastify";

interface PaymentMethod {
  id: string;
  brand: "VISA" | "MC";
  last4: string;
  cardholderName: string;
  expiry: string;
  isDefault: boolean;
}

const MOCK_CARDS: PaymentMethod[] = [
  {
    id: "pm_1",
    brand: "VISA",
    last4: "4242",
    cardholderName: "Jane Smith",
    expiry: "08/27",
    isDefault: true,
  },
  {
    id: "pm_2",
    brand: "MC",
    last4: "8353",
    cardholderName: "Jane Smith",
    expiry: "03/26",
    isDefault: false,
  },
];

function BrandChip({ brand }: { brand: "VISA" | "MC" }) {
  if (brand === "VISA") {
    return (
      <div className="flex items-center justify-center w-12 h-8 rounded bg-blue-700 text-white text-xs font-extrabold tracking-widest select-none">
        VISA
      </div>
    );
  }
  return (
    <div className="flex items-center justify-center w-12 h-8 rounded bg-red-600 text-white text-xs font-extrabold tracking-tight select-none">
      MC
    </div>
  );
}

function AddCardDialog({
  open,
  onOpenChange,
  onSave,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (card: Omit<PaymentMethod, "id">) => void;
}) {
  const [cardNumber, setCardNumber] = useState("");
  const [cardholderName, setCardholderName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [setAsDefault, setSetAsDefault] = useState(false);
  const [saving, setSaving] = useState(false);

  function formatCardNumber(value: string) {
    const digits = value.replace(/\D/g, "").slice(0, 16);
    return digits.replace(/(.{4})/g, "$1 ").trim();
  }

  function formatExpiry(value: string) {
    const digits = value.replace(/\D/g, "").slice(0, 4);
    if (digits.length >= 3) {
      return `${digits.slice(0, 2)}/${digits.slice(2)}`;
    }
    return digits;
  }

  async function handleSave() {
    if (!cardNumber || !cardholderName || !expiry) {
      toast.error("Please fill in all required fields.");
      return;
    }
    setSaving(true);
    // Simulate network delay
    await new Promise((r) => setTimeout(r, 800));
    const last4 = cardNumber.replace(/\s/g, "").slice(-4);
    const brand: "VISA" | "MC" = cardNumber.startsWith("4") ? "VISA" : "MC";
    onSave({
      brand,
      last4,
      cardholderName,
      expiry,
      isDefault: setAsDefault,
    });
    setSaving(false);
    // Reset form
    setCardNumber("");
    setCardholderName("");
    setExpiry("");
    setCvv("");
    setSetAsDefault(false);
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add payment method</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label htmlFor="cardNumber">Card number</Label>
            <Input
              id="cardNumber"
              className="mt-1 font-mono tracking-widest"
              placeholder="XXXX XXXX XXXX XXXX"
              value={cardNumber}
              onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
              maxLength={19}
              inputMode="numeric"
            />
          </div>

          <div>
            <Label htmlFor="cardholderName">Cardholder name</Label>
            <Input
              id="cardholderName"
              className="mt-1"
              placeholder="Jane Smith"
              value={cardholderName}
              onChange={(e) => setCardholderName(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="expiry">Expiry date</Label>
              <Input
                id="expiry"
                className="mt-1"
                placeholder="MM/YY"
                value={expiry}
                onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                maxLength={5}
                inputMode="numeric"
              />
            </div>
            <div>
              <Label htmlFor="cvv">CVV</Label>
              <Input
                id="cvv"
                className="mt-1"
                placeholder="•••"
                type="password"
                value={cvv}
                onChange={(e) => setCvv(e.target.value.replace(/\D/g, "").slice(0, 4))}
                maxLength={4}
                inputMode="numeric"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Checkbox
              id="setDefault"
              checked={setAsDefault}
              onCheckedChange={(checked) => setSetAsDefault(checked === true)}
            />
            <Label htmlFor="setDefault" className="font-normal cursor-pointer text-sm">
              Set as default payment method
            </Label>
          </div>

          <div className="flex items-start gap-2.5 rounded-lg bg-amber-50 border border-amber-200 px-3 py-2.5">
            <ShieldCheck className="h-4 w-4 text-amber-600 mt-0.5 shrink-0" />
            <p className="text-xs text-amber-800 leading-relaxed">
              Your card details are encrypted and processed securely. We never
              store your full card number.
            </p>
          </div>
        </div>

        <DialogFooter className="mt-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            className="bg-amber-600 hover:bg-amber-700 text-white"
            disabled={saving}
            onClick={handleSave}
          >
            {saving ? "Saving…" : "Save card"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function PaymentCard({
  card,
  onRemove,
  onSetDefault,
}: {
  card: PaymentMethod;
  onRemove: (id: string) => void;
  onSetDefault: (id: string) => void;
}) {
  return (
    <Card className={`relative ${card.isDefault ? "ring-2 ring-amber-400" : ""}`}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <BrandChip brand={card.brand} />
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-mono text-sm font-medium text-gray-900 tracking-wider">
                  •••• •••• •••• {card.last4}
                </span>
                {card.isDefault && (
                  <Badge className="bg-amber-500 hover:bg-amber-500 text-white text-xs py-0">
                    Default
                  </Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground mt-0.5">
                {card.cardholderName}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Expires {card.expiry}
              </p>
            </div>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 hover:text-red-600 hover:bg-red-50 shrink-0"
            onClick={() => onRemove(card.id)}
            aria-label="Remove card"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
        </div>

        {!card.isDefault && (
          <button
            onClick={() => onSetDefault(card.id)}
            className="mt-3 text-xs text-amber-700 hover:text-amber-800 font-medium flex items-center gap-1"
          >
            <Star className="h-3 w-3" />
            Set as default
          </button>
        )}
      </CardContent>
    </Card>
  );
}

export default function PaymentMethodsPage() {
  const [cards, setCards] = useState<PaymentMethod[]>(MOCK_CARDS);
  const [dialogOpen, setDialogOpen] = useState(false);

  function handleAddCard(card: Omit<PaymentMethod, "id">) {
    const newCard: PaymentMethod = {
      ...card,
      id: `pm_${Date.now()}`,
    };
    setCards((prev) => {
      const updated = card.isDefault
        ? prev.map((c) => ({ ...c, isDefault: false }))
        : [...prev];
      return [...updated, newCard];
    });
    toast.success("Card added successfully.");
  }

  function handleRemove(id: string) {
    setCards((prev) => {
      const filtered = prev.filter((c) => c.id !== id);
      // If removed card was default, make first remaining the default
      if (prev.find((c) => c.id === id)?.isDefault && filtered.length > 0) {
        filtered[0] = { ...filtered[0], isDefault: true };
      }
      return filtered;
    });
    toast.success("Card removed.");
  }

  function handleSetDefault(id: string) {
    setCards((prev) =>
      prev.map((c) => ({ ...c, isDefault: c.id === id }))
    );
    toast.success("Default payment method updated.");
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      {/* Page header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Payment Methods</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Manage your saved cards and payment options
          </p>
        </div>
        <Button
          className="bg-amber-600 hover:bg-amber-700 text-white gap-2"
          onClick={() => setDialogOpen(true)}
        >
          <Plus className="h-4 w-4" />
          Add payment method
        </Button>
      </div>

      {/* Cards list */}
      {cards.length === 0 ? (
        <EmptyState
          icon={<CreditCard className="h-10 w-10" />}
          title="No saved payment methods"
          message="Add a card to speed up checkout on future orders."
          actionLabel="Add your first card"
          onAction={() => setDialogOpen(true)}
        />
      ) : (
        <div className="space-y-4">
          {cards.map((card) => (
            <PaymentCard
              key={card.id}
              card={card}
              onRemove={handleRemove}
              onSetDefault={handleSetDefault}
            />
          ))}

          <button
            onClick={() => setDialogOpen(true)}
            className="w-full border-2 border-dashed border-gray-200 rounded-xl p-4 text-sm text-muted-foreground hover:border-amber-300 hover:text-amber-700 transition-colors flex items-center justify-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Add another card
          </button>
        </div>
      )}

      {/* Security note */}
      <div className="mt-8 flex items-start gap-3 rounded-xl bg-gray-50 border border-gray-200 p-4">
        <ShieldCheck className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
        <p className="text-xs text-muted-foreground leading-relaxed">
          Sweet Treats uses industry-standard PCI-DSS compliant payment
          processing. We never store your full card number or CVV. Payments are
          processed through our secure payment provider.
        </p>
      </div>

      <AddCardDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSave={handleAddCard}
      />
    </div>
  );
}
