import Link from "next/link";
import type { Metadata } from "next";
import {
  CakeSlice,
  TrendingUp,
  Users,
  Globe,
  ShieldCheck,
  Zap,
  Star,
  ArrowRight,
  CheckCircle2,
  ChefHat,
  Package,
  BadgeDollarSign,
  BarChart3,
  Headphones,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Sell on Sweet Treats — Grow Your Bakery Online",
  description:
    "Join 200+ local bakeries already selling on Sweet Treats Marketplace. Reach thousands of customers, manage orders effortlessly, and grow your bakery business.",
};

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Create your store",
    description:
      "Sign up in minutes. Add your bakery name, logo, and story. No technical skills needed.",
    icon: ChefHat,
    color: "text-amber-600 bg-amber-100",
  },
  {
    step: "02",
    title: "List your products",
    description:
      "Upload photos, write descriptions, set prices. Our tools make it easy to showcase your treats beautifully.",
    icon: Package,
    color: "text-orange-600 bg-orange-100",
  },
  {
    step: "03",
    title: "Receive orders & get paid",
    description:
      "Customers find you, place orders, and you get notified instantly. Payouts deposited directly to your account.",
    icon: BadgeDollarSign,
    color: "text-green-600 bg-green-100",
  },
  {
    step: "04",
    title: "Grow with data",
    description:
      "See which products sell best, when peak hours are, and what customers love — all in your dashboard.",
    icon: BarChart3,
    color: "text-blue-600 bg-blue-100",
  },
];

const FEATURES = [
  {
    icon: Globe,
    title: "Your own storefront",
    description: "A dedicated store page with your branding, product gallery, and customer reviews.",
  },
  {
    icon: Zap,
    title: "Real-time order management",
    description: "Accept, prepare, and track every order from one dashboard. Get instant notifications.",
  },
  {
    icon: TrendingUp,
    title: "Sales analytics",
    description: "Revenue trends, best-sellers, and customer insights to help you make smarter decisions.",
  },
  {
    icon: Users,
    title: "Built-in customer base",
    description: "Reach thousands of local sweet-treat lovers actively browsing for bakeries like yours.",
  },
  {
    icon: ShieldCheck,
    title: "Secure & reliable",
    description: "Payments are handled safely. Your store is always live, always fast.",
  },
  {
    icon: Headphones,
    title: "Seller support",
    description: "Our team is here for you. Chat, email, or call — real humans who understand bakeries.",
  },
];

const TESTIMONIALS = [
  {
    name: "Amira K.",
    bakery: "Amira's Artisan Cakes",
    city: "Casablanca",
    rating: 5,
    quote:
      "I went from selling at a farmers market on weekends to running online orders every day. Sweet Treats changed my business completely.",
  },
  {
    name: "Thomas B.",
    bakery: "Brioche & Beyond",
    city: "Marrakech",
    rating: 5,
    quote:
      "The dashboard is so easy to use. I manage everything from my phone while I'm in the kitchen. My revenue tripled in 4 months.",
  },
  {
    name: "Lina R.",
    bakery: "Lina's Macarons",
    city: "Rabat",
    rating: 5,
    quote:
      "My customers can now find me online and order ahead. The review system helped me build trust with new customers quickly.",
  },
];

const PRICING = [
  {
    name: "Starter",
    fee: "0%",
    description: "Commission on sales",
    monthly: "Free",
    features: [
      "Up to 20 products",
      "Basic analytics",
      "Order management",
      "Customer reviews",
      "Email support",
    ],
    highlight: false,
    cta: "Start free",
  },
  {
    name: "Growth",
    fee: "5%",
    description: "Commission on sales",
    monthly: "$29/mo",
    features: [
      "Unlimited products",
      "Advanced analytics",
      "Promo code creation",
      "Priority placement",
      "Priority support",
      "Custom store banner",
    ],
    highlight: true,
    cta: "Start 14-day trial",
  },
  {
    name: "Pro",
    fee: "3%",
    description: "Commission on sales",
    monthly: "$79/mo",
    features: [
      "Everything in Growth",
      "Dedicated account manager",
      "Featured on homepage",
      "Multi-store management",
      "API access",
      "Phone support",
    ],
    highlight: false,
    cta: "Contact sales",
  },
];

export default function SellPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-amber-600 via-orange-600 to-rose-600 text-white">
        <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-10 pointer-events-none" />
        <div className="container mx-auto px-4 py-20 md:py-28 relative">
          <div className="max-w-3xl">
            <Badge className="mb-6 bg-white/20 hover:bg-white/20 text-white border-white/30 text-sm px-4 py-1">
              Join 200+ bakeries already selling
            </Badge>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-6">
              Turn your passion for baking<br />
              <span className="text-amber-200">into a thriving business</span>
            </h1>
            <p className="text-xl text-amber-100 mb-8 max-w-2xl leading-relaxed">
              Sweet Treats connects local bakeries with thousands of hungry customers.
              List your products, manage orders, and grow — all in one place.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/auth/register">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-white text-amber-700 hover:bg-amber-50 font-semibold text-base px-8 h-12 gap-2"
                >
                  Start selling for free
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="/stores">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto border-white/40 text-white hover:bg-white/10 font-semibold text-base px-8 h-12"
                >
                  Browse seller stories
                </Button>
              </Link>
            </div>
            <p className="mt-5 text-sm text-amber-200">
              Free to start · No credit card required · Setup takes 10 minutes
            </p>
          </div>
        </div>

        {/* Stats bar */}
        <div className="border-t border-white/20 bg-black/10">
          <div className="container mx-auto px-4 py-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
              {[
                { value: "200+", label: "Active bakeries" },
                { value: "50k+", label: "Orders fulfilled" },
                { value: "4.8★", label: "Average seller rating" },
                { value: "3×", label: "Average revenue growth" },
              ].map(({ value, label }) => (
                <div key={label}>
                  <p className="text-2xl font-bold">{value}</p>
                  <p className="text-sm text-amber-200">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold mb-3">How it works</h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              From zero to your first order in under an hour.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {HOW_IT_WORKS.map(({ step, title, description, icon: Icon, color }) => (
              <div key={step} className="relative text-center">
                <div className={`mx-auto mb-4 w-14 h-14 rounded-2xl flex items-center justify-center ${color}`}>
                  <Icon className="h-7 w-7" />
                </div>
                <span className="text-xs font-bold text-muted-foreground tracking-widest uppercase">
                  Step {step}
                </span>
                <h3 className="font-bold text-lg mt-1 mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold mb-3">Everything you need to succeed</h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Powerful tools designed specifically for food businesses.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {FEATURES.map(({ icon: Icon, title, description }) => (
              <div key={title} className="p-6 rounded-2xl border bg-white hover:shadow-md transition-shadow">
                <div className="w-11 h-11 rounded-xl bg-amber-100 flex items-center justify-center mb-4">
                  <Icon className="h-5 w-5 text-amber-700" />
                </div>
                <h3 className="font-semibold text-base mb-1.5">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gradient-to-br from-amber-50 to-orange-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold mb-3">Loved by local bakers</h2>
            <p className="text-muted-foreground text-lg">Real stories from real sellers.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map(({ name, bakery, city, rating, quote }) => (
              <div key={name} className="bg-white rounded-2xl p-6 shadow-sm border">
                <div className="flex mb-3">
                  {Array.from({ length: rating }, (_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 text-sm leading-relaxed mb-5 italic">
                  &ldquo;{quote}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-amber-200 flex items-center justify-center font-bold text-amber-800 text-sm">
                    {name[0]}
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{name}</p>
                    <p className="text-xs text-muted-foreground">{bakery} · {city}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold mb-3">Simple, transparent pricing</h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Start free. Upgrade as you grow. No hidden fees ever.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {PRICING.map(({ name, fee, description, monthly, features, highlight, cta }) => (
              <div
                key={name}
                className={`rounded-2xl border p-7 flex flex-col ${
                  highlight
                    ? "border-amber-400 bg-amber-50 shadow-lg ring-2 ring-amber-400 relative"
                    : "bg-white"
                }`}
              >
                {highlight && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <Badge className="bg-amber-500 hover:bg-amber-500 text-white px-4">
                      Most popular
                    </Badge>
                  </div>
                )}
                <div className="mb-6">
                  <h3 className="font-bold text-lg">{name}</h3>
                  <p className="text-3xl font-extrabold mt-2">{monthly}</p>
                  <p className="text-sm text-muted-foreground mt-1">+ {fee} {description}</p>
                </div>
                <ul className="space-y-2.5 mb-8 flex-1">
                  {features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href="/auth/register">
                  <Button
                    className={`w-full ${
                      highlight
                        ? "bg-amber-600 hover:bg-amber-700 text-white"
                        : "border-gray-300"
                    }`}
                    variant={highlight ? "default" : "outline"}
                  >
                    {cta}
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-br from-amber-600 to-orange-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <CakeSlice className="h-12 w-12 mx-auto mb-6 text-amber-200" />
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Ready to grow your bakery?
          </h2>
          <p className="text-amber-100 text-lg mb-8 max-w-xl mx-auto">
            Join hundreds of bakers already building their business on Sweet Treats.
            Your first listing is free — no credit card required.
          </p>
          <Link href="/auth/register">
            <Button
              size="lg"
              className="bg-white text-amber-700 hover:bg-amber-50 font-semibold text-base px-10 h-12 gap-2"
            >
              Create your free store
              <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
          <p className="mt-4 text-sm text-amber-200">
            Questions? Email us at{" "}
            <a href="mailto:sellers@sweettreats.example" className="underline hover:text-white">
              sellers@sweettreats.example
            </a>
          </p>
        </div>
      </section>
    </div>
  );
}
