import type { Metadata } from "next";
import CateringForm from "./CateringForm";
import {
  Tag,
  Package,
  Calendar,
  FileText,
  Users,
  PartyPopper,
  Gift,
  Rocket,
  Building2,
  Heart,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Catering & Corporate Orders | Sweet Treats",
  description:
    "Premium bulk sweet treat orders for corporate events, team celebrations, client gifting, and weddings. Volume discounts, custom branding, and dedicated support.",
};

const STATS = [
  { value: "50+", label: "Minimum items" },
  { value: "48hr", label: "Lead time" },
  { value: "Custom", label: "Branding available" },
  { value: "Dedicated", label: "Account manager" },
];

const BENEFITS = [
  {
    icon: Tag,
    title: "Volume discounts",
    desc: "Save up to 20% on orders of 50 items or more. Larger orders unlock deeper savings.",
  },
  {
    icon: Package,
    title: "Custom packaging",
    desc: "Brand every box with your logo, colours, and a personalised message.",
  },
  {
    icon: Calendar,
    title: "Scheduled delivery",
    desc: "Lock in your delivery slot weeks in advance. We coordinate around your event.",
  },
  {
    icon: FileText,
    title: "Invoice payment",
    desc: "Pay by invoice — ideal for businesses with purchase order workflows.",
  },
];

const OCCASIONS = [
  { icon: Users, title: "Office meetings", desc: "Morning pastry boxes and afternoon sweet trays to keep teams fuelled." },
  { icon: PartyPopper, title: "Team celebrations", desc: "Custom cakes and treat platters for birthdays, work anniversaries, and milestones." },
  { icon: Gift, title: "Client gifting", desc: "Branded sweet hampers that leave a lasting impression on every recipient." },
  { icon: Rocket, title: "Product launches", desc: "Themed confectionery that matches your brand palette and launch energy." },
  { icon: Building2, title: "Corporate events", desc: "Dessert stations, bulk trays, and catering packs for conferences and summits." },
  { icon: Heart, title: "Weddings", desc: "Elegant wedding favours, tiered cakes, and full dessert table services." },
];

const TRUSTED_BY = ["TechCorp Ltd", "Green Valley Co", "Sunrise Events"];

export default function CateringPage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="relative overflow-hidden bg-gradient-to-br from-amber-700 via-amber-600 to-orange-600 px-4 py-24 text-white">
        <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 -right-16 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
        <div className="relative mx-auto max-w-3xl text-center">
          <Badge className="mb-5 bg-white/20 text-white hover:bg-white/20 backdrop-blur-sm">
            Corporate &amp; Catering
          </Badge>
          <h1 className="mb-5 text-4xl font-extrabold leading-tight sm:text-5xl">
            Corporate &amp; Catering Orders
          </h1>
          <p className="text-lg text-amber-100 sm:text-xl">
            Feed your team, wow your clients, celebrate your milestones with premium sweet treats
            delivered at scale
          </p>
        </div>
      </section>

      <section className="border-y border-amber-100 bg-amber-50 px-4 py-10">
        <div className="mx-auto grid max-w-4xl grid-cols-2 gap-6 sm:grid-cols-4">
          {STATS.map(({ value, label }) => (
            <div key={label} className="text-center">
              <p className="text-3xl font-extrabold text-amber-600">{value}</p>
              <p className="mt-1 text-sm font-medium text-gray-600">{label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="mb-8 flex items-center gap-3">
          <div className="h-8 w-1.5 rounded-full bg-amber-500" />
          <h2 className="text-2xl font-bold text-gray-900">Why choose us for catering</h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {BENEFITS.map(({ icon: Icon, title, desc }) => (
            <Card key={title} className="border border-amber-100 shadow-sm transition-shadow hover:shadow-md">
              <CardContent className="p-6">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-amber-100">
                  <Icon className="h-5 w-5 text-amber-600" />
                </div>
                <h3 className="mb-2 font-semibold text-gray-900">{title}</h3>
                <p className="text-sm text-gray-500">{desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="bg-amber-50 px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 flex items-center gap-3">
            <div className="h-8 w-1.5 rounded-full bg-orange-500" />
            <h2 className="text-2xl font-bold text-gray-900">Popular for</h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {OCCASIONS.map(({ icon: Icon, title, desc }) => (
              <Card
                key={title}
                className="border-0 bg-white shadow-sm transition-shadow hover:shadow-md"
              >
                <CardContent className="flex gap-4 p-5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-amber-400 to-orange-500">
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{title}</h3>
                    <p className="mt-0.5 text-sm text-gray-500">{desc}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-2xl px-4 py-16">
        <div className="mb-8 flex items-center gap-3">
          <div className="h-8 w-1.5 rounded-full bg-amber-500" />
          <h2 className="text-2xl font-bold text-gray-900">Request a catering quote</h2>
        </div>
        <CateringForm />
      </section>

      <section className="border-t border-gray-100 bg-gray-50 px-4 py-12">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mb-6 text-sm font-semibold uppercase tracking-wider text-gray-400">
            Trusted by leading organisations
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6">
            {TRUSTED_BY.map((name) => (
              <div
                key={name}
                className="rounded-lg border border-gray-200 bg-white px-8 py-4 text-sm font-semibold text-gray-500 shadow-sm"
              >
                {name}
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
