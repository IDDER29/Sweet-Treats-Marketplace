"use client";

import { useState } from "react";
import { Gift, Mail, Printer, CakeSlice, CheckCircle2, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/lib/currency";
import { toast } from "react-toastify";

const PRESET_AMOUNTS = [25, 50, 100, 150, 200];

const HOW_IT_WORKS = [
  { step: 1, title: "Choose an amount", desc: "Pick from our presets or enter a custom value between $10 and $500." },
  { step: 2, title: "Add recipient details", desc: "Enter their name, email, a personal note, and your preferred send date." },
  { step: 3, title: "They receive & redeem", desc: "Your recipient gets an email with a unique code to use at checkout." },
];

const FAQS = [
  {
    q: "Do gift cards expire?",
    a: "Never. Sweet Treats gift cards have no expiry date — they can be used whenever your recipient is ready.",
  },
  {
    q: "Can I use a gift card with other discounts?",
    a: "Yes! Gift cards can be combined with promo codes and other offers at checkout.",
  },
  {
    q: "What if the recipient has already placed an order?",
    a: "No problem — the gift card balance stays on their account and can be applied to any future order.",
  },
];

export default function GiftCardsPage() {
  const [selectedAmount, setSelectedAmount] = useState<number>(50);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [delivery, setDelivery] = useState<"email" | "print">("email");
  const [recipientName, setRecipientName] = useState("");
  const [recipientEmail, setRecipientEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sendDate, setSendDate] = useState(new Date().toISOString().split("T")[0]);
  const [loading, setLoading] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const resolvedAmount = customAmount !== "" ? Number(customAmount) : selectedAmount;

  function handleCustomAmountChange(val: string) {
    setCustomAmount(val);
    if (val !== "") setSelectedAmount(0);
  }

  function handlePresetSelect(amount: number) {
    setSelectedAmount(amount);
    setCustomAmount("");
  }

  function handlePurchase() {
    if (!recipientName.trim() || !recipientEmail.trim()) {
      toast.error("Please fill in the recipient's name and email.");
      return;
    }
    if (resolvedAmount < 10 || resolvedAmount > 500) {
      toast.error("Please choose an amount between $10 and $500.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Gift card sent!");
    }, 1000);
  }

  return (
    <main className="min-h-screen bg-amber-50">
      <section className="relative overflow-hidden bg-gradient-to-br from-amber-500 via-orange-500 to-orange-600 px-4 py-20 text-white">
        <div className="pointer-events-none absolute -left-16 -top-16 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-12 -right-12 h-56 w-56 rounded-full bg-white/10 blur-3xl" />
        <div className="relative mx-auto max-w-4xl text-center">
          <h1 className="mb-4 text-4xl font-extrabold leading-tight sm:text-5xl">
            Give the gift of sweetness
          </h1>
          <p className="mb-10 text-lg text-amber-100 sm:text-xl">
            Perfect for any occasion — let them choose their own treats
          </p>
          <div className="mx-auto w-72 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-600 p-6 shadow-2xl ring-4 ring-white/20">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-lg font-extrabold tracking-tight text-white">Sweet Treats</span>
              <CakeSlice className="h-7 w-7 text-white/80" />
            </div>
            <p className="mb-6 text-sm font-semibold uppercase tracking-widest text-amber-100">
              Gift Card
            </p>
            <div className="flex items-center justify-between">
              <span className="font-mono text-sm tracking-widest text-white/70">★★★★★ ••••</span>
              <Gift className="h-5 w-5 text-white/60" />
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-3xl space-y-10 px-4 py-12">
        <section>
          <h2 className="mb-5 text-xl font-bold text-gray-900">Select an amount</h2>
          <div className="mb-4 grid grid-cols-5 gap-3">
            {PRESET_AMOUNTS.map((amt) => (
              <button
                key={amt}
                onClick={() => handlePresetSelect(amt)}
                className={`rounded-xl border-2 px-3 py-4 text-center font-bold transition-all ${
                  selectedAmount === amt && customAmount === ""
                    ? "border-amber-500 bg-amber-50 text-amber-700"
                    : "border-gray-200 bg-white text-gray-700 hover:border-amber-300"
                }`}
              >
                {formatCurrency(amt)}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <Label htmlFor="custom-amount" className="mb-1.5 block text-sm text-gray-600">
                Custom amount ($10–$500)
              </Label>
              <Input
                id="custom-amount"
                type="number"
                min={10}
                max={500}
                placeholder="Enter amount"
                value={customAmount}
                onChange={(e) => handleCustomAmountChange(e.target.value)}
                className="border-gray-200 bg-white"
              />
            </div>
            <div className="rounded-xl bg-amber-500 px-6 py-3 text-center">
              <p className="text-xs font-medium text-amber-100">Total</p>
              <p className="text-2xl font-extrabold text-white">
                {formatCurrency(resolvedAmount || 0)}
              </p>
            </div>
          </div>
        </section>

        <Separator />

        <section>
          <h2 className="mb-5 text-xl font-bold text-gray-900">Delivery method</h2>
          <div className="grid grid-cols-2 gap-4">
            {(
              [
                { key: "email", icon: Mail, label: "Email delivery", desc: "Send instantly by email" },
                { key: "print", icon: Printer, label: "Print at home", desc: "Print and gift in person" },
              ] as const
            ).map(({ key, icon: Icon, label, desc }) => (
              <button
                key={key}
                onClick={() => setDelivery(key)}
                className={`flex items-center gap-4 rounded-xl border-2 p-5 text-left transition-all ${
                  delivery === key
                    ? "border-amber-500 bg-amber-50"
                    : "border-gray-200 bg-white hover:border-amber-300"
                }`}
              >
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
                    delivery === key ? "bg-amber-500 text-white" : "bg-gray-100 text-gray-500"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{label}</p>
                  <p className="text-sm text-gray-500">{desc}</p>
                </div>
              </button>
            ))}
          </div>
        </section>

        <Separator />

        <section>
          <h2 className="mb-5 text-xl font-bold text-gray-900">Recipient details</h2>
          <div className="space-y-4">
            <div>
              <Label htmlFor="r-name" className="mb-1.5 block">Recipient&apos;s name</Label>
              <Input
                id="r-name"
                placeholder="e.g. Sarah Johnson"
                value={recipientName}
                onChange={(e) => setRecipientName(e.target.value)}
                className="bg-white"
              />
            </div>
            <div>
              <Label htmlFor="r-email" className="mb-1.5 block">Recipient&apos;s email</Label>
              <Input
                id="r-email"
                type="email"
                placeholder="sarah@example.com"
                value={recipientEmail}
                onChange={(e) => setRecipientEmail(e.target.value)}
                className="bg-white"
              />
            </div>
            <div>
              <Label htmlFor="r-message" className="mb-1.5 block">
                Personal message <span className="text-gray-400">(optional)</span>
              </Label>
              <textarea
                id="r-message"
                rows={3}
                placeholder="Write a short note..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full rounded-md border border-input bg-white px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              />
            </div>
            <div>
              <Label htmlFor="r-date" className="mb-1.5 block">Send date</Label>
              <Input
                id="r-date"
                type="date"
                value={sendDate}
                onChange={(e) => setSendDate(e.target.value)}
                className="bg-white"
              />
              <p className="mt-1 text-xs text-gray-500">Leave as today to send immediately</p>
            </div>
          </div>
        </section>

        <Button
          onClick={handlePurchase}
          disabled={loading}
          className="h-12 w-full bg-amber-600 text-base font-semibold text-white hover:bg-amber-700 disabled:opacity-70"
        >
          {loading ? "Processing..." : `Purchase gift card — ${formatCurrency(resolvedAmount || 0)}`}
        </Button>

        <Separator />

        <section>
          <h2 className="mb-6 text-xl font-bold text-gray-900">How it works</h2>
          <div className="grid gap-5 sm:grid-cols-3">
            {HOW_IT_WORKS.map(({ step, title, desc }) => (
              <div key={step} className="flex gap-4">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-amber-500 text-sm font-bold text-white">
                  {step}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{title}</p>
                  <p className="mt-1 text-sm text-gray-500">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <Separator />

        <section>
          <h2 className="mb-5 text-xl font-bold text-gray-900">Frequently asked questions</h2>
          <div className="space-y-3">
            {FAQS.map(({ q, a }, i) => (
              <Card key={i} className="border border-gray-100 shadow-sm">
                <button
                  className="flex w-full items-center justify-between p-5 text-left"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="font-semibold text-gray-900">{q}</span>
                  {openFaq === i ? (
                    <ChevronUp className="h-4 w-4 shrink-0 text-amber-500" />
                  ) : (
                    <ChevronDown className="h-4 w-4 shrink-0 text-gray-400" />
                  )}
                </button>
                {openFaq === i && (
                  <CardContent className="border-t border-gray-100 px-5 pb-5 pt-4">
                    <div className="flex gap-3 text-sm text-gray-600">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
                      {a}
                    </div>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
