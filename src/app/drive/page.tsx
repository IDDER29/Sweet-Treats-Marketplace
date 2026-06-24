import type { Metadata } from "next";
import Link from "next/link";
import { Truck, DollarSign, Clock, MapPin, Shield, Star, ChevronRight, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Deliver with Sweet Treats — Earn on Your Schedule",
  description:
    "Join our delivery network. Earn competitive pay delivering sweet treats from local bakeries to customers in your city.",
};

const BENEFITS = [
  {
    icon: DollarSign,
    title: "Competitive pay",
    desc: "Earn a base rate per delivery plus 100% of tips. Weekly payouts directly to your bank.",
  },
  {
    icon: Clock,
    title: "Your schedule",
    desc: "Go online when you want. No shifts, no minimums — deliver mornings, evenings, or weekends.",
  },
  {
    icon: MapPin,
    title: "Local deliveries",
    desc: "Short distance routes within your neighbourhood. Less time driving, more deliveries per hour.",
  },
  {
    icon: Shield,
    title: "Insured & supported",
    desc: "24/7 driver support and on-trip insurance included at no cost while you're on a delivery.",
  },
];

const STEPS = [
  { step: "01", title: "Apply online", desc: "Fill in a short form with your details and vehicle type." },
  { step: "02", title: "Background check", desc: "Quick identity and background verification — usually under 48 hours." },
  { step: "03", title: "Go live", desc: "Download the app, go online, and start earning from your first delivery." },
];

const STATS = [
  { value: "£12–18/hr", label: "Average earnings" },
  { value: "48 hrs", label: "Approval time" },
  { value: "5 km", label: "Avg. delivery radius" },
  { value: "100%", label: "Tips kept by drivers" },
];

const FAQ = [
  {
    q: "What vehicle do I need?",
    a: "Bicycle, scooter, motorcycle, or car — all are welcome. The app shows orders suited to your vehicle type.",
  },
  {
    q: "When do I get paid?",
    a: "Earnings are transferred every Monday for the previous week. You can also cash out early once per week.",
  },
  {
    q: "Is there a minimum number of deliveries?",
    a: "No minimums. Deliver as much or as little as you like. Your account stays active regardless.",
  },
  {
    q: "What areas do you operate in?",
    a: "We currently operate in major cities and are expanding rapidly. Enter your postcode during signup to check coverage.",
  },
];

export default function DrivePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-amber-900 via-orange-800 to-rose-900 py-24 md:py-36 overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-amber-400/10 translate-x-1/3 -translate-y-1/3" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-amber-400/20 border border-amber-300/30 text-amber-200 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
              <Zap className="h-3.5 w-3.5" />
              Now accepting drivers in your city
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white leading-tight mb-6">
              Deliver sweet treats.<br />Earn great money.
            </h1>
            <p className="text-lg text-white/75 mb-8 leading-relaxed max-w-xl">
              Join our growing network of delivery drivers. Set your own hours, earn competitive pay,
              and help connect your community with the best local bakeries.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                size="lg"
                asChild
                className="bg-amber-400 hover:bg-amber-300 text-amber-900 font-bold px-8 rounded-full shadow-lg"
              >
                <Link href="/auth/register">Apply to drive</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="border-white/30 text-white hover:bg-white/10 px-8 rounded-full"
              >
                <Link href="#how-it-works">How it works</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-amber-50 border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-amber-200">
            {STATS.map(({ value, label }) => (
              <div key={label} className="text-center py-8 px-4">
                <p className="text-3xl font-black text-amber-800">{value}</p>
                <p className="text-sm text-amber-600 font-medium mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <p className="text-amber-600 font-semibold text-sm uppercase tracking-widest mb-2">Why drive with us</p>
            <h2 className="text-3xl md:text-4xl font-bold">Everything you need to thrive</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {BENEFITS.map(({ icon: Icon, title, desc }) => (
              <Card key={title} className="border-amber-100 hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center mb-4">
                    <Icon className="h-6 w-6 text-amber-700" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <p className="text-amber-600 font-semibold text-sm uppercase tracking-widest mb-2">Getting started</p>
            <h2 className="text-3xl md:text-4xl font-bold">Start earning in 3 steps</h2>
          </div>
          <div className="max-w-3xl mx-auto space-y-6">
            {STEPS.map(({ step, title, desc }, i) => (
              <div key={step} className="flex gap-6 items-start">
                <div className="w-14 h-14 rounded-2xl bg-amber-100 flex items-center justify-center shrink-0">
                  <span className="text-xl font-black text-amber-700">{step}</span>
                </div>
                <div className="pt-2">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">{title}</h3>
                  <p className="text-gray-500">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="flex justify-center gap-1 mb-6">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <blockquote className="text-2xl font-bold text-gray-900 mb-6 leading-snug">
              &ldquo;I deliver for 3 hours in the morning before my other job.
              The pay is consistent and the orders are always close to home.&rdquo;
            </blockquote>
            <p className="text-sm text-muted-foreground">
              <strong>Marcus T.</strong> — Cyclist driver, London
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-24 bg-amber-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Common questions</h2>
          </div>
          <div className="max-w-2xl mx-auto space-y-4">
            {FAQ.map(({ q, a }) => (
              <details key={q} className="group bg-white rounded-xl border border-amber-100 p-5">
                <summary className="font-semibold text-gray-900 cursor-pointer list-none flex justify-between items-center">
                  {q}
                  <ChevronRight className="h-4 w-4 text-amber-500 group-open:rotate-90 transition-transform" />
                </summary>
                <p className="mt-3 text-sm text-gray-500 leading-relaxed">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-amber-900 via-orange-800 to-rose-900">
        <div className="container mx-auto px-4 text-center text-white">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/10 mb-6">
            <Truck className="h-8 w-8 text-amber-300" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to start earning?</h2>
          <p className="text-white/70 text-lg mb-8 max-w-md mx-auto">
            Join thousands of drivers already delivering joy across the city.
          </p>
          <Button
            size="lg"
            asChild
            className="bg-amber-400 hover:bg-amber-300 text-amber-900 font-bold px-10 rounded-full shadow-xl"
          >
            <Link href="/auth/register">Apply now <ChevronRight className="ml-1 h-5 w-5" /></Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
