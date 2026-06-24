import Link from "next/link";
import type { Metadata } from "next";
import {
  Search,
  ShoppingCart,
  Bike,
  Star,
  CakeSlice,
  MapPin,
  Clock,
  ShieldCheck,
  Leaf,
  RotateCcw,
  ArrowRight,
  CheckCircle2,
  Package,
  ChefHat,
  Truck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "How It Works — Sweet Treats Marketplace",
  description:
    "Discover how Sweet Treats connects you with the best local bakeries. Browse, order, and receive fresh handcrafted treats in a few simple steps.",
};

const CUSTOMER_STEPS = [
  {
    number: "01",
    icon: Search,
    title: "Browse local bakeries",
    description:
      "Search by treat type, dietary needs, or bakery. Filter by price, rating, and distance. Every listing is from a real local baker.",
    color: "bg-amber-100 text-amber-700",
    tip: "Try the Collections page for curated picks by occasion",
  },
  {
    number: "02",
    icon: ShoppingCart,
    title: "Add to cart & checkout",
    description:
      "Add your favourites to the cart. Choose a delivery address and time. Pay securely — we never store your card details.",
    color: "bg-orange-100 text-orange-700",
    tip: "Mix products from different bakeries in one order",
  },
  {
    number: "03",
    icon: ChefHat,
    title: "The baker gets to work",
    description:
      "Your order goes straight to the bakery. They confirm it and start baking — often fresh to order, not from a freezer.",
    color: "bg-rose-100 text-rose-700",
    tip: "Most bakeries confirm within 15 minutes",
  },
  {
    number: "04",
    icon: Bike,
    title: "Fast, fresh delivery",
    description:
      "A delivery partner picks up your order and brings it right to your door. You can track every step in real time.",
    color: "bg-green-100 text-green-700",
    tip: "Average delivery time: 35–60 minutes",
  },
  {
    number: "05",
    icon: Star,
    title: "Enjoy & review",
    description:
      "Enjoy your treats! Leave a review to help other customers and give the baker valuable feedback.",
    color: "bg-blue-100 text-blue-700",
    tip: "Honest reviews help local bakers grow",
  },
];

const TRUST_FEATURES = [
  {
    icon: ShieldCheck,
    title: "Secure payments",
    description: "All transactions are encrypted and PCI-compliant. We never store your card number.",
  },
  {
    icon: Leaf,
    title: "Fresh guarantee",
    description: "Every product is baked to order or on the day of delivery. No frozen, no stale treats.",
  },
  {
    icon: RotateCcw,
    title: "Hassle-free returns",
    description: "Not satisfied? Contact us within 24 hours for a full refund, no questions asked.",
  },
  {
    icon: MapPin,
    title: "Truly local",
    description: "Every bakery on Sweet Treats is a local, independent business — not a chain.",
  },
  {
    icon: Clock,
    title: "Real-time tracking",
    description: "Follow your order from the oven to your door with live status updates.",
  },
  {
    icon: Star,
    title: "Verified reviews",
    description: "All reviews are from verified purchasers. No fake reviews, ever.",
  },
];

const FAQS = [
  {
    q: "What areas do you deliver to?",
    a: "We currently operate in 5 cities. Enter your postcode at checkout to see which bakeries deliver to you.",
  },
  {
    q: "Can I order from multiple bakeries at once?",
    a: "Yes! Add products from different bakeries to your cart. Each bakery fulfils their portion and delivery is coordinated.",
  },
  {
    q: "How long does delivery take?",
    a: "Most deliveries arrive within 35–60 minutes of order confirmation. You can track your order in real time.",
  },
  {
    q: "Are the products really freshly baked?",
    a: "Yes. Bakeries on Sweet Treats bake to order or on the day. You'll see freshness guarantees on each store page.",
  },
  {
    q: "What if my order arrives wrong or damaged?",
    a: "Contact support within 24 hours of delivery. We'll arrange a replacement or full refund.",
  },
  {
    q: "Do you cater for dietary requirements?",
    a: "Many of our bakeries offer gluten-free, vegan, nut-free, and dairy-free options. Use the dietary filter when browsing.",
  },
];

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 border-b py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <Badge className="mb-5 bg-amber-100 text-amber-800 border-amber-200 hover:bg-amber-100 text-sm px-4 py-1">
            Simple. Fresh. Local.
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-5 leading-tight">
            Fresh treats, delivered<br />
            <span className="text-amber-600">in 5 easy steps</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-8">
            Sweet Treats connects you directly with the best local bakeries in your city.
            From browsing to your doorstep — here&apos;s exactly how it works.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/products">
              <Button size="lg" className="bg-amber-600 hover:bg-amber-700 text-white gap-2 px-8">
                Start browsing <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="/stores">
              <Button size="lg" variant="outline" className="px-8">
                Explore bakeries
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold mb-3">How ordering works</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              From your first tap to taking a bite — here&apos;s the full journey.
            </p>
          </div>
          <div className="space-y-12 max-w-3xl mx-auto">
            {CUSTOMER_STEPS.map(({ number, icon: Icon, title, description, color, tip }, i) => (
              <div key={number} className="flex gap-6 items-start">
                {/* Step indicator */}
                <div className="flex flex-col items-center gap-1 shrink-0">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${color}`}>
                    <Icon className="h-7 w-7" />
                  </div>
                  {i < CUSTOMER_STEPS.length - 1 && (
                    <div className="w-0.5 h-12 bg-gray-100 mt-2" />
                  )}
                </div>
                {/* Content */}
                <div className="flex-1 pt-2 pb-4">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs font-bold text-muted-foreground tracking-widest uppercase">
                      Step {number}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{title}</h3>
                  <p className="text-muted-foreground leading-relaxed mb-3">{description}</p>
                  <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-100 rounded-lg px-3 py-1.5 text-sm text-amber-800">
                    <CheckCircle2 className="h-3.5 w-3.5 text-amber-600 shrink-0" />
                    {tip}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* For sellers CTA strip */}
      <section className="bg-gradient-to-r from-amber-600 to-orange-600 text-white py-14">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h2 className="text-2xl font-bold">Own a bakery?</h2>
            <p className="text-amber-100">
              Reach thousands of local customers. Set up your store in 10 minutes.
            </p>
          </div>
          <div className="flex gap-3 shrink-0">
            <Link href="/sell">
              <Button className="bg-white text-amber-700 hover:bg-amber-50 font-semibold gap-2">
                Sell on Sweet Treats <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/business/onboarding">
              <Button variant="outline" className="border-white/40 text-white hover:bg-white/10">
                See how it works for sellers
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Trust features grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold mb-3">Why you can trust us</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Your confidence in every order matters to us.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {TRUST_FEATURES.map(({ icon: Icon, title, description }) => (
              <div key={title} className="flex gap-4 p-5 rounded-2xl border hover:shadow-sm transition-shadow">
                <div className="w-11 h-11 rounded-xl bg-amber-100 flex items-center justify-center shrink-0">
                  <Icon className="h-5 w-5 text-amber-700" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Order journey timeline visual */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold mb-3">Your order, step by step</h2>
            <p className="text-muted-foreground">A typical order from start to finish.</p>
          </div>
          <div className="max-w-3xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              {[
                { icon: ShoppingCart, label: "Order placed", time: "0 min", color: "bg-amber-500" },
                { icon: ChefHat, label: "Baker confirms", time: "~10 min", color: "bg-orange-500" },
                { icon: Package, label: "Order ready", time: "~25 min", color: "bg-rose-500" },
                { icon: Truck, label: "At your door", time: "~45 min", color: "bg-green-500" },
              ].map(({ icon: Icon, label, time, color }, i) => (
                <div key={label} className="text-center relative">
                  <div className={`mx-auto w-14 h-14 rounded-full ${color} flex items-center justify-center mb-3`}>
                    <Icon className="h-7 w-7 text-white" />
                  </div>
                  <p className="font-semibold text-sm">{label}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{time}</p>
                  {i < 3 && (
                    <div className="hidden sm:block absolute top-7 left-[55%] right-[-55%] h-0.5 bg-gray-200" />
                  )}
                </div>
              ))}
            </div>
            <p className="text-center text-xs text-muted-foreground mt-8">
              Times are estimates and vary by bakery, order size, and distance.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold mb-3">Common questions</h2>
          </div>
          <div className="space-y-4">
            {FAQS.map(({ q, a }) => (
              <div key={q} className="border rounded-xl p-5">
                <p className="font-semibold mb-2">{q}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <p className="text-muted-foreground text-sm mb-4">
              Still have questions?
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/FAQ">
                <Button variant="outline">Full FAQ</Button>
              </Link>
              <Link href="/contact">
                <Button className="bg-amber-600 hover:bg-amber-700 text-white">
                  Contact support
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 bg-gradient-to-br from-amber-600 to-orange-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <CakeSlice className="h-12 w-12 mx-auto mb-5 text-amber-200" />
          <h2 className="text-3xl font-bold mb-4">Ready for your first order?</h2>
          <p className="text-amber-100 text-lg mb-8 max-w-md mx-auto">
            Thousands of customers already discover amazing local treats every day.
          </p>
          <Link href="/products">
            <Button
              size="lg"
              className="bg-white text-amber-700 hover:bg-amber-50 font-semibold px-10 gap-2"
            >
              Browse sweet treats <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
