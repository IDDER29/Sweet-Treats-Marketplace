import Link from "next/link";
import { Cake, Cookie, IceCream, Croissant, Clock, Tag, ArrowRight, Copy } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Deals & Promotions | Sweet Treats Marketplace",
  description: "Limited-time offers and exclusive promo codes from local bakeries. Save big on your favourite sweet treats.",
};

// ---------------------------------------------------------------------------
// Static placeholder data — replace with backend calls when the API is ready
// ---------------------------------------------------------------------------

const flashDeals = [
  {
    id: 1,
    name: "Chocolate Fudge Cake",
    bakery: "Sugar & Spice Bakery",
    originalPrice: 32.0,
    salePrice: 24.0,
    discountPct: 25,
    endsIn: "2h 30m",
    icon: Cake,
  },
  {
    id: 2,
    name: "Assorted Macarons (12 pcs)",
    bakery: "La Petite Pâtisserie",
    originalPrice: 28.0,
    salePrice: 18.2,
    discountPct: 35,
    endsIn: "4h 15m",
    icon: Cookie,
  },
  {
    id: 3,
    name: "Artisan Ice Cream Tub",
    bakery: "Chill & Churn",
    originalPrice: 18.0,
    salePrice: 12.6,
    discountPct: 30,
    endsIn: "1h 45m",
    icon: IceCream,
  },
  {
    id: 4,
    name: "Buttery Croissant Bundle",
    bakery: "Morning Glory Bakes",
    originalPrice: 22.0,
    salePrice: 15.4,
    discountPct: 30,
    endsIn: "3h 00m",
    icon: Croissant,
  },
];

const weeklySpecials = [
  {
    id: 1,
    bakery: "Sugar & Spice Bakery",
    special: "Buy any cake, get a free slice of our daily special",
    description: "Choose from over 20 signature cakes. Valid Monday–Sunday while stocks last.",
    savings: "Up to $8 value",
    icon: Cake,
  },
  {
    id: 2,
    bakery: "La Petite Pâtisserie",
    special: "20% off all French pastry boxes",
    description: "Our curated pastry boxes make the perfect gift. Mix and match your favourites.",
    savings: "Save up to $12",
    icon: Cookie,
  },
  {
    id: 3,
    bakery: "Morning Glory Bakes",
    special: "Free coffee with any breakfast pastry order over $15",
    description: "Start your morning right. Enjoy a hot drink on us with your pastry order.",
    savings: "Worth $5",
    icon: Croissant,
  },
];

const promoCodes = [
  {
    id: 1,
    code: "SWEET15",
    description: "15% off your first order",
    detail: "New customers only. No minimum spend.",
    expiry: "31 Jul 2026",
  },
  {
    id: 2,
    code: "FREEDEL20",
    description: "Free delivery on orders over $20",
    detail: "Valid at participating bakeries. Excludes express slots.",
    expiry: "30 Jun 2026",
  },
  {
    id: 3,
    code: "BAKEFAN10",
    description: "10% off sitewide — loyal customer reward",
    detail: "Applies to all products. Cannot be combined with other offers.",
    expiry: "31 Aug 2026",
  },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function formatPrice(amount: number): string {
  return `$${amount.toFixed(2)}`;
}

// ---------------------------------------------------------------------------
// Page (Server Component)
// ---------------------------------------------------------------------------

export default function DealsPage() {
  return (
    <main className="min-h-screen bg-amber-50">
      {/* ------------------------------------------------------------------ */}
      {/* Hero                                                                */}
      {/* ------------------------------------------------------------------ */}
      <section className="relative overflow-hidden bg-gradient-to-br from-amber-500 via-orange-500 to-orange-600 px-4 py-20 text-white">
        {/* decorative blobs */}
        <div className="pointer-events-none absolute -left-16 -top-16 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-12 -right-12 h-56 w-56 rounded-full bg-white/10 blur-3xl" />

        <div className="relative mx-auto max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-1.5 text-sm font-medium backdrop-blur-sm">
            <Tag className="h-4 w-4" />
            Limited-time offers
          </div>

          <h1 className="mb-4 text-4xl font-extrabold leading-tight sm:text-5xl md:text-6xl">
            Today&apos;s Sweet Deals
          </h1>
          <p className="mb-8 text-lg text-amber-100 sm:text-xl">
            Exclusive offers from local bakeries — freshly picked every day.
          </p>

          {/* Static countdown visual */}
          <div className="inline-flex items-center gap-3 rounded-2xl bg-white/20 px-6 py-4 backdrop-blur-sm">
            <Clock className="h-5 w-5 shrink-0 text-amber-100" />
            <span className="text-sm font-medium text-amber-100">
              Deals refreshed daily at midnight
            </span>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Flash Deals                                                         */}
      {/* ------------------------------------------------------------------ */}
      <section className="mx-auto max-w-7xl px-4 py-14">
        <div className="mb-8 flex items-center gap-3">
          <div className="h-8 w-1.5 rounded-full bg-amber-500" />
          <h2 className="text-2xl font-bold text-gray-900">Flash Deals</h2>
          <Badge className="bg-red-500 text-white hover:bg-red-600">Limited time</Badge>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {flashDeals.map((deal) => {
            const Icon = deal.icon;
            return (
              <Card
                key={deal.id}
                className="group relative overflow-hidden border-0 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                {/* Discount badge */}
                <div className="absolute right-3 top-3 z-10">
                  <Badge className="bg-red-500 font-bold text-white hover:bg-red-600">
                    {deal.discountPct}% off
                  </Badge>
                </div>

                {/* Product image placeholder */}
                <div className="flex aspect-video items-center justify-center bg-gradient-to-br from-amber-200 to-orange-300">
                  <Icon className="h-16 w-16 text-amber-700 opacity-80 transition-transform duration-300 group-hover:scale-110" />
                </div>

                <CardContent className="p-4">
                  <p className="mb-0.5 text-xs font-medium text-amber-600">{deal.bakery}</p>
                  <h3 className="mb-3 font-semibold text-gray-900 leading-snug">{deal.name}</h3>

                  {/* Pricing */}
                  <div className="mb-3 flex items-baseline gap-2">
                    <span className="text-xl font-bold text-amber-600">
                      {formatPrice(deal.salePrice)}
                    </span>
                    <span className="text-sm text-muted-foreground line-through">
                      {formatPrice(deal.originalPrice)}
                    </span>
                  </div>

                  {/* Time remaining */}
                  <div className="mb-4 flex items-center gap-1.5 text-xs text-gray-500">
                    <Clock className="h-3.5 w-3.5 text-orange-500" />
                    <span>Ends in {deal.endsIn}</span>
                  </div>

                  <Button
                    className="w-full bg-amber-500 text-white hover:bg-amber-600"
                    size="sm"
                  >
                    Add to cart
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Weekly Specials                                                     */}
      {/* ------------------------------------------------------------------ */}
      <section className="bg-white px-4 py-14">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex items-center gap-3">
            <div className="h-8 w-1.5 rounded-full bg-orange-500" />
            <h2 className="text-2xl font-bold text-gray-900">Weekly Specials</h2>
          </div>

          <div className="flex flex-col gap-5">
            {weeklySpecials.map((special) => {
              const Icon = special.icon;
              return (
                <Card
                  key={special.id}
                  className="overflow-hidden border-0 shadow-sm transition-shadow hover:shadow-md"
                >
                  <CardContent className="flex flex-col gap-4 p-0 sm:flex-row">
                    {/* Left image area */}
                    <div className="flex h-36 w-full shrink-0 items-center justify-center bg-gradient-to-br from-orange-100 to-amber-200 sm:h-auto sm:w-40">
                      <Icon className="h-14 w-14 text-orange-600 opacity-80" />
                    </div>

                    {/* Content */}
                    <div className="flex flex-1 flex-col justify-center gap-1.5 p-5">
                      <p className="text-xs font-semibold uppercase tracking-wider text-amber-600">
                        {special.bakery}
                      </p>
                      <h3 className="text-lg font-bold text-gray-900">{special.special}</h3>
                      <p className="text-sm text-muted-foreground">{special.description}</p>
                      <div className="mt-2 flex items-center justify-between">
                        <Badge
                          variant="secondary"
                          className="border border-amber-200 bg-amber-50 text-amber-700"
                        >
                          {special.savings}
                        </Badge>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-amber-600 hover:text-amber-700"
                          asChild
                        >
                          <Link href="/products">
                            Shop now
                            <ArrowRight className="ml-1 h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Promo Codes                                                         */}
      {/* ------------------------------------------------------------------ */}
      <section className="mx-auto max-w-7xl px-4 py-14">
        <div className="mb-8 flex items-center gap-3">
          <div className="h-8 w-1.5 rounded-full bg-amber-500" />
          <h2 className="text-2xl font-bold text-gray-900">Promo Codes</h2>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {promoCodes.map((promo) => (
            <Card
              key={promo.id}
              className="border border-amber-100 bg-gradient-to-br from-amber-50 to-orange-50 shadow-sm"
            >
              <CardContent className="p-6">
                {/* Code badge */}
                <div className="mb-4 flex items-center justify-between">
                  <span className="rounded-lg bg-amber-500 px-4 py-2 font-mono text-lg font-bold tracking-widest text-white shadow-inner">
                    {promo.code}
                  </span>
                  <Copy className="h-4 w-4 text-amber-400" />
                </div>

                <h3 className="mb-1 font-semibold text-gray-900">{promo.description}</h3>
                <p className="mb-4 text-sm text-muted-foreground">{promo.detail}</p>

                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1 text-xs text-gray-500">
                    <Clock className="h-3.5 w-3.5" />
                    Expires {promo.expiry}
                  </span>
                  {/* Copy button — interaction handled client-side via JS; rendered as outline only in SSR */}
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-amber-300 text-amber-700 hover:bg-amber-100"
                  >
                    Copy code
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Bottom CTA                                                          */}
      {/* ------------------------------------------------------------------ */}
      <section className="bg-gradient-to-r from-amber-500 to-orange-500 px-4 py-16">
        <div className="mx-auto max-w-2xl text-center text-white">
          <h2 className="mb-3 text-3xl font-bold">Don&apos;t miss a deal</h2>
          <p className="mb-8 text-amber-100">
            Fresh offers from local bakeries drop every day at midnight. Check back often so
            you&apos;re always first in line for the sweetest savings.
          </p>
          <Button
            size="lg"
            className="bg-white font-semibold text-amber-600 hover:bg-amber-50"
            asChild
          >
            <Link href="/products">
              Browse all products
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
