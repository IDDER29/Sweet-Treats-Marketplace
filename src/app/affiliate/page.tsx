import type { Metadata } from "next";
import Link from "next/link";
import { Share2, DollarSign, TrendingUp, Users, ChevronRight, Copy, BarChart3, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Affiliate Program — Earn by Sharing Sweet Treats",
  description:
    "Join our affiliate program and earn a commission for every order placed through your referral link.",
};

const STEPS = [
  { step: "01", icon: Share2, title: "Apply & get your link", desc: "Sign up in minutes and receive a unique referral link and custom discount code." },
  { step: "02", icon: Users, title: "Share with your audience", desc: "Post on social media, your blog, newsletter, or anywhere your audience hangs out." },
  { step: "03", icon: DollarSign, title: "Earn for every order", desc: "Get 8% commission on every first order placed through your link. Paid monthly." },
];

const TIERS = [
  { name: "Starter", badge: "", minSales: 0, commission: "8%", cookie: "30 days", payout: "Monthly", perks: ["Custom link", "Real-time dashboard", "Marketing assets"] },
  { name: "Partner", badge: "Most popular", minSales: 20, commission: "10%", cookie: "45 days", payout: "Bi-weekly", perks: ["Everything in Starter", "Priority support", "Exclusive codes", "Co-marketing opportunities"] },
  { name: "Elite", badge: "Top earners", minSales: 100, commission: "12%", cookie: "60 days", payout: "Weekly", perks: ["Everything in Partner", "Dedicated account manager", "Early product access", "Performance bonuses"] },
];

const FAQS = [
  { q: "Who can join?", a: "Anyone — food bloggers, influencers, newsletter writers, or just someone who loves sharing good finds. No minimum audience required to apply." },
  { q: "How and when am I paid?", a: "Commissions are paid via bank transfer or PayPal. Starter tier pays monthly on the 5th; higher tiers pay bi-weekly or weekly." },
  { q: "How long does the cookie last?", a: "Your referral cookie lasts 30 days (Starter), 45 days (Partner), or 60 days (Elite). If a visitor orders within that window, you get credit." },
  { q: "Can I use my own link to order?", a: "Self-referrals are not eligible for commission — but you get the discount code to share with your audience." },
];

export default function AffiliatePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-amber-900 via-orange-800 to-rose-900 py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-amber-400/10" />
        <div className="container mx-auto px-4 relative z-10 text-center text-white">
          <Badge className="bg-amber-400/20 border-amber-300/30 text-amber-200 mb-6">Affiliate Program</Badge>
          <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
            Earn while you share<br />the sweetest deals
          </h1>
          <p className="text-lg text-white/70 max-w-xl mx-auto mb-8">
            Join our affiliate program and earn up to 12% commission on every order
            placed through your unique referral link. No minimums, no caps.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button size="lg" className="bg-amber-400 hover:bg-amber-300 text-amber-900 font-bold px-10 rounded-full shadow-lg" asChild>
              <Link href="/auth/register">Apply now <ChevronRight className="ml-1 h-4 w-4" /></Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 px-10 rounded-full" asChild>
              <Link href="#tiers">See commission rates</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-amber-50 border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-amber-200">
            {[
              { value: "8–12%", label: "Commission rate" },
              { value: "30–60 days", label: "Cookie duration" },
              { value: "500+", label: "Active affiliates" },
              { value: "$0", label: "Cost to join" },
            ].map(({ value, label }) => (
              <div key={label} className="text-center py-8 px-4">
                <p className="text-3xl font-black text-amber-800">{value}</p>
                <p className="text-sm text-amber-600 font-medium mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <p className="text-amber-600 font-semibold text-sm uppercase tracking-widest mb-2">Simple process</p>
            <h2 className="text-3xl md:text-4xl font-bold">How it works</h2>
          </div>
          <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            {STEPS.map(({ step, icon: Icon, title, desc }) => (
              <div key={step} className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-amber-100 flex items-center justify-center mx-auto mb-4">
                  <Icon className="h-7 w-7 text-amber-700" />
                </div>
                <p className="text-xs font-bold text-amber-500 uppercase tracking-widest mb-2">{step}</p>
                <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dashboard preview */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-amber-600 font-semibold text-sm uppercase tracking-widest mb-3">Real-time tracking</p>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">See your earnings grow</h2>
              <p className="text-gray-500 leading-relaxed mb-6">
                Your affiliate dashboard shows clicks, conversions, revenue, and payouts
                in real time. Know exactly what&apos;s working and when you&apos;ll get paid.
              </p>
              <ul className="space-y-3">
                {["Click and conversion tracking", "Order-level commission breakdown", "Payout history and status", "Custom link generator"].map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-gray-700">
                    <CheckCircle className="h-4 w-4 text-amber-600 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            <Card className="border-amber-100 shadow-lg rounded-2xl overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <BarChart3 className="h-5 w-5 text-amber-600" />
                  <span className="font-bold text-sm">Affiliate Dashboard</span>
                  <Badge className="ml-auto bg-green-100 text-green-700 text-xs">Live</Badge>
                </div>
                <div className="grid grid-cols-3 gap-3 mb-6">
                  {[{ label: "Clicks", value: "1,284" }, { label: "Orders", value: "93" }, { label: "Earned", value: "$748" }].map(({ label, value }) => (
                    <div key={label} className="bg-amber-50 rounded-xl p-3 text-center">
                      <p className="text-xl font-black text-amber-800">{value}</p>
                      <p className="text-xs text-amber-600">{label}</p>
                    </div>
                  ))}
                </div>
                <div className="bg-gray-50 rounded-xl p-4 font-mono text-xs break-all text-gray-500 flex items-center gap-2">
                  <span className="flex-1">sweettreats.com/r/your-code</span>
                  <Copy className="h-3.5 w-3.5 text-amber-500 shrink-0 cursor-pointer" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Tiers */}
      <section id="tiers" className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <p className="text-amber-600 font-semibold text-sm uppercase tracking-widest mb-2">Commission tiers</p>
            <h2 className="text-3xl md:text-4xl font-bold">Earn more as you grow</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {TIERS.map((tier, i) => (
              <Card key={tier.name} className={`rounded-2xl border ${i === 1 ? "border-amber-300 shadow-lg shadow-amber-100" : "border-gray-100"}`}>
                <CardContent className={`p-6 ${i === 1 ? "bg-gradient-to-br from-amber-50 to-orange-50" : ""}`}>
                  {tier.badge && (
                    <Badge className="bg-amber-600 text-white text-xs mb-3">{tier.badge}</Badge>
                  )}
                  {!tier.badge && <div className="h-6 mb-3" />}
                  <h3 className="text-xl font-bold mb-1">{tier.name}</h3>
                  <p className="text-xs text-muted-foreground mb-4">{tier.minSales === 0 ? "Starting tier" : `${tier.minSales}+ sales/month`}</p>
                  <p className="text-4xl font-black text-amber-700 mb-1">{tier.commission}</p>
                  <p className="text-xs text-muted-foreground mb-6">commission per order</p>
                  <div className="space-y-2 mb-6">
                    <p className="text-xs text-muted-foreground">Cookie: {tier.cookie}</p>
                    <p className="text-xs text-muted-foreground">Payout: {tier.payout}</p>
                  </div>
                  <ul className="space-y-2">
                    {tier.perks.map((p) => (
                      <li key={p} className="flex items-start gap-2 text-xs text-gray-600">
                        <CheckCircle className="h-3.5 w-3.5 text-amber-500 shrink-0 mt-0.5" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-24 bg-amber-50">
        <div className="container mx-auto px-4 max-w-2xl">
          <h2 className="text-3xl font-bold text-center mb-10">Questions</h2>
          <div className="space-y-4">
            {FAQS.map(({ q, a }) => (
              <details key={q} className="group bg-white rounded-xl border border-amber-100 p-5">
                <summary className="font-semibold text-gray-900 cursor-pointer list-none flex justify-between items-center text-sm">
                  {q}
                  <ChevronRight className="h-4 w-4 text-amber-500 group-open:rotate-90 transition-transform shrink-0 ml-3" />
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
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to start earning?</h2>
          <p className="text-white/70 mb-8 max-w-md mx-auto">
            It only takes a few minutes to apply. Start sharing your link today.
          </p>
          <Button size="lg" className="bg-amber-400 hover:bg-amber-300 text-amber-900 font-bold px-10 rounded-full shadow-xl" asChild>
            <Link href="/auth/register">Join the program</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
