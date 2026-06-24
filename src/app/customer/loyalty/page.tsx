"use client";

import { useState } from "react";
import Link from "next/link";
import { Gift, Star, Zap, Crown, ArrowRight, History, Copy, CheckCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/lib/currency";
import { toast } from "react-toastify";

const TIERS = [
  {
    name: "Sweet Starter",
    icon: Star,
    minPoints: 0,
    maxPoints: 499,
    color: "text-gray-600",
    bg: "bg-gray-100",
    border: "border-gray-200",
    perks: ["1 point per $1 spent", "Birthday bonus points"],
  },
  {
    name: "Sugar Rush",
    icon: Zap,
    minPoints: 500,
    maxPoints: 1499,
    color: "text-amber-600",
    bg: "bg-amber-100",
    border: "border-amber-200",
    perks: ["1.5x points on orders", "Early access to deals", "Free delivery once/month"],
  },
  {
    name: "Cake Royalty",
    icon: Crown,
    minPoints: 1500,
    maxPoints: Infinity,
    color: "text-purple-600",
    bg: "bg-purple-100",
    border: "border-purple-200",
    perks: ["2x points on orders", "Exclusive member deals", "Priority support", "Free delivery every order"],
  },
];

const MOCK_HISTORY = [
  { id: 1, label: "Order #ORD-2841", points: +120, date: "Jun 18, 2026", type: "earn" },
  { id: 2, label: "Redeemed — $5 off", points: -500, date: "Jun 10, 2026", type: "redeem" },
  { id: 3, label: "Order #ORD-2789", points: +85, date: "Jun 5, 2026", type: "earn" },
  { id: 4, label: "Birthday bonus", points: +200, date: "May 30, 2026", type: "earn" },
  { id: 5, label: "Order #ORD-2701", points: +60, date: "May 22, 2026", type: "earn" },
];

const REWARDS = [
  { id: 1, label: "$5 off your order", cost: 500, icon: "🎁" },
  { id: 2, label: "$10 off your order", cost: 900, icon: "🎁" },
  { id: 3, label: "Free delivery", cost: 300, icon: "🛵" },
  { id: 4, label: "15% off entire order", cost: 1200, icon: "⭐" },
];

const REFERRAL_CODE = "SWEET-X7K29";

export default function LoyaltyPage() {
  const currentPoints = 740;
  const [copied, setCopied] = useState(false);

  const currentTier = TIERS.find(
    (t) => currentPoints >= t.minPoints && currentPoints <= t.maxPoints
  ) ?? TIERS[0];
  const nextTier = TIERS[TIERS.indexOf(currentTier) + 1];
  const progressToNext = nextTier
    ? ((currentPoints - currentTier.minPoints) / (nextTier.minPoints - currentTier.minPoints)) * 100
    : 100;

  function copyCode() {
    navigator.clipboard.writeText(REFERRAL_CODE).catch(() => {});
    setCopied(true);
    toast.success("Referral code copied!");
    setTimeout(() => setCopied(false), 2500);
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8 px-4 py-8">
      <div>
        <h1 className="text-2xl font-bold">Rewards & Loyalty</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Earn points on every order and redeem them for sweet rewards.
        </p>
      </div>

      {/* Points summary */}
      <Card className="border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50 overflow-hidden">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="text-sm text-amber-700 font-medium">Your balance</p>
              <p className="text-5xl font-black text-amber-800">{currentPoints.toLocaleString()}</p>
              <p className="text-sm text-amber-600">points</p>
            </div>
            <div className="text-right">
              <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full ${currentTier.bg} ${currentTier.border} border text-sm font-semibold ${currentTier.color}`}>
                <currentTier.icon className="h-4 w-4" />
                {currentTier.name}
              </div>
              {nextTier && (
                <p className="text-xs text-muted-foreground mt-2">
                  {nextTier.minPoints - currentPoints} pts to {nextTier.name}
                </p>
              )}
            </div>
          </div>
          {nextTier && (
            <div className="mt-5">
              <div className="h-2 w-full bg-amber-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-amber-600 rounded-full transition-all duration-500"
                  style={{ width: `${progressToNext}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-amber-700 mt-1">
                <span>{currentTier.minPoints}</span>
                <span>{nextTier.minPoints}</span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Redeem rewards */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Gift className="h-4 w-4 text-amber-600" /> Redeem Points
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {REWARDS.map((r) => {
            const canRedeem = currentPoints >= r.cost;
            return (
              <div
                key={r.id}
                className={`flex items-center justify-between p-4 rounded-xl border ${
                  canRedeem ? "border-amber-200 bg-amber-50" : "border-gray-100 bg-gray-50 opacity-60"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{r.icon}</span>
                  <div>
                    <p className="text-sm font-medium">{r.label}</p>
                    <p className="text-xs text-muted-foreground">{r.cost.toLocaleString()} pts</p>
                  </div>
                </div>
                <Button
                  size="sm"
                  disabled={!canRedeem}
                  className="bg-amber-600 hover:bg-amber-700 text-white text-xs"
                  onClick={() => toast.success(`Redeemed: ${r.label}`)}
                >
                  Redeem
                </Button>
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Tiers */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Membership Tiers</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {TIERS.map((tier, i) => {
            const isCurrent = tier.name === currentTier.name;
            return (
              <div
                key={tier.name}
                className={`p-4 rounded-xl border ${isCurrent ? `${tier.border} ${tier.bg}` : "border-gray-100"}`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className={`w-8 h-8 rounded-full ${tier.bg} flex items-center justify-center`}>
                    <tier.icon className={`h-4 w-4 ${tier.color}`} />
                  </div>
                  <span className={`font-semibold text-sm ${isCurrent ? tier.color : "text-gray-700"}`}>
                    {tier.name}
                  </span>
                  {isCurrent && <Badge className="bg-amber-600 text-white text-xs">Current</Badge>}
                  <span className="ml-auto text-xs text-muted-foreground">
                    {tier.maxPoints === Infinity ? `${tier.minPoints}+` : `${tier.minPoints}–${tier.maxPoints}`} pts
                  </span>
                </div>
                <ul className="space-y-1">
                  {tier.perks.map((p) => (
                    <li key={p} className="text-xs text-muted-foreground flex items-center gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Referrals */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Refer a Friend — Earn 250 pts each</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Share your referral code. When a friend places their first order, you both earn 250 points.
          </p>
          <div className="flex items-center gap-2">
            <div className="flex-1 font-mono text-sm bg-gray-50 border rounded-lg px-4 py-2.5 tracking-widest">
              {REFERRAL_CODE}
            </div>
            <Button variant="outline" size="sm" onClick={copyCode} className="gap-1.5 shrink-0">
              {copied ? <CheckCheck className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
              {copied ? "Copied" : "Copy"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* History */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <History className="h-4 w-4 text-amber-600" /> Points History
          </CardTitle>
        </CardHeader>
        <CardContent className="divide-y">
          {MOCK_HISTORY.map((entry) => (
            <div key={entry.id} className="flex items-center justify-between py-3">
              <div>
                <p className="text-sm font-medium">{entry.label}</p>
                <p className="text-xs text-muted-foreground">{entry.date}</p>
              </div>
              <span
                className={`text-sm font-bold ${
                  entry.type === "earn" ? "text-green-600" : "text-red-500"
                }`}
              >
                {entry.type === "earn" ? "+" : ""}{entry.points.toLocaleString()} pts
              </span>
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="text-center">
        <Link href="/customer/orders">
          <Button variant="outline" className="gap-2">
            View My Orders <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
