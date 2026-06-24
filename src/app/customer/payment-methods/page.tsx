"use client";

import { useState } from "react";
import {
  CreditCard,
  Plus,
  Trash2,
  Star,
  ShieldCheck,
  Lock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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

  function handleRemove(id: string) {
    setCards((prev) => {
      const filtered = prev.filter((c) => c.id !== id);
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
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Payment Methods</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Manage your saved cards and payment options
          </p>
        </div>
      </div>

      {/* Cards list */}
      {cards.length === 0 ? (
        <EmptyState
          icon={<CreditCard className="h-10 w-10" />}
          title="No saved payment methods"
          message="Your saved cards will appear here once card payments are enabled."
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
        </div>
      )}

      {/* Stripe coming-soon notice */}
      <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-5">
        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-amber-100">
            <Lock className="h-4 w-4 text-amber-700" />
          </div>
          <div>
            <p className="text-sm font-semibold text-amber-900">
              Secure card payments coming soon
            </p>
            <p className="mt-1 text-xs text-amber-800 leading-relaxed">
              We are integrating with Stripe for PCI-DSS compliant card
              payments. Card details will be entered directly in Stripe&apos;s
              secure hosted form — we will never see or store your raw card
              number or CVV.
            </p>
          </div>
        </div>
      </div>

      {/* Security footer */}
      <div className="mt-4 flex items-start gap-3 rounded-xl bg-gray-50 border border-gray-200 p-4">
        <ShieldCheck className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
        <p className="text-xs text-muted-foreground leading-relaxed">
          Sweet Treats uses industry-standard encryption. Payments are
          processed through our secure, PCI-DSS compliant payment provider.
        </p>
      </div>

      {/* Add card button — disabled until Stripe is wired */}
      <Button
        disabled
        className="mt-6 w-full bg-amber-600 hover:bg-amber-700 text-white gap-2 opacity-50 cursor-not-allowed"
        title="Card payments coming soon"
      >
        <Plus className="h-4 w-4" />
        Add payment method (coming soon)
      </Button>
    </div>
  );
}
