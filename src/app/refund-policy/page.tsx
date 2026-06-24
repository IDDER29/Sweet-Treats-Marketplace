import Link from "next/link";
import type { Metadata } from "next";
import { ShieldCheck, Clock, RotateCcw, AlertCircle, CheckCircle2, Phone } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Refund & Return Policy — Sweet Treats Marketplace",
  description:
    "Our commitment to your satisfaction. Learn about our refund policy, eligibility, timelines, and how to request a return or replacement.",
};

const ELIGIBLE = [
  "Item arrived damaged or broken",
  "Item is significantly different from the description",
  "Missing items from your order",
  "Order arrived severely late (more than 2 hours past estimated time)",
  "Product is stale or clearly not fresh on arrival",
  "Allergen or dietary information was incorrectly listed",
];

const NOT_ELIGIBLE = [
  "Change of mind after order is accepted by the bakery",
  "Minor aesthetic imperfections (handmade goods vary slightly)",
  "Products consumed before raising a complaint",
  "Orders cancelled after the bakery has begun preparation",
  "Incorrect address provided at checkout",
];

const PROCESS_STEPS = [
  {
    step: "01",
    title: "Contact us within 24 hours",
    description:
      "Reach out via our contact page, email, or in-app support within 24 hours of receiving your order. Include your order number.",
    icon: Clock,
    color: "text-amber-600 bg-amber-100",
  },
  {
    step: "02",
    title: "Provide evidence",
    description:
      "Send a photo of the issue (damaged product, wrong item, etc.). This helps us resolve things faster and improve our bakeries.",
    icon: AlertCircle,
    color: "text-blue-600 bg-blue-100",
  },
  {
    step: "03",
    title: "We review and respond",
    description:
      "Our support team reviews your case, usually within 2 business hours. We may contact the bakery to understand what happened.",
    icon: ShieldCheck,
    color: "text-purple-600 bg-purple-100",
  },
  {
    step: "04",
    title: "Refund or replacement issued",
    description:
      "Approved refunds are returned to your original payment method within 3–7 business days. Replacements are dispatched the same or next day.",
    icon: RotateCcw,
    color: "text-green-600 bg-green-100",
  },
];

export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 border-b py-14 md:py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-green-100 mb-6">
            <ShieldCheck className="h-8 w-8 text-green-600" />
          </div>
          <Badge className="mb-5 bg-green-100 text-green-800 border-green-200 hover:bg-green-100 text-sm px-4 py-1">
            Your satisfaction is guaranteed
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
            Refund & Return Policy
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
            We stand behind every order. If something goes wrong, we&apos;ll make it right —
            quickly and without hassle.
          </p>
          <p className="text-sm text-muted-foreground mt-4">
            Last updated: June 2026
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-14 max-w-3xl">

        {/* Our commitment */}
        <section className="mb-14 p-6 rounded-2xl bg-amber-50 border border-amber-100">
          <h2 className="text-xl font-bold mb-3 text-amber-900">Our commitment to you</h2>
          <p className="text-amber-800 leading-relaxed">
            Sweet Treats connects you with local bakeries who take great pride in their work.
            When a product doesn&apos;t meet expectations — through no fault of your own — we
            will always offer a full refund or replacement. No lengthy disputes, no runaround.
            Just a straightforward resolution.
          </p>
        </section>

        {/* 24-hour window */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold mb-4">The 24-hour window</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            All refund and replacement requests must be submitted within <strong>24 hours</strong> of
            your order being delivered. Because our products are perishable — freshly baked food —
            we cannot accept claims for orders older than one day.
          </p>
          <div className="flex items-start gap-3 bg-blue-50 border border-blue-100 rounded-xl p-4 text-sm text-blue-800">
            <AlertCircle className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
            <p>
              If your issue is urgent (e.g. an allergen concern), please contact us immediately via
              phone or our live chat. Do not wait until the 24-hour deadline approaches.
            </p>
          </div>
        </section>

        {/* Eligible reasons */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold mb-6">What qualifies for a refund</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-green-700 flex items-center gap-2 mb-4">
                <CheckCircle2 className="h-5 w-5" />
                Eligible for refund or replacement
              </h3>
              <ul className="space-y-3">
                {ELIGIBLE.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-red-600 flex items-center gap-2 mb-4">
                <AlertCircle className="h-5 w-5" />
                Not eligible
              </h3>
              <ul className="space-y-3">
                {NOT_ELIGIBLE.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm">
                    <div className="h-4 w-4 rounded-full border-2 border-red-300 shrink-0 mt-0.5 flex items-center justify-center">
                      <div className="h-1.5 w-1.5 rounded-full bg-red-400" />
                    </div>
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold mb-8">How to request a refund</h2>
          <div className="space-y-8">
            {PROCESS_STEPS.map(({ step, title, description, icon: Icon, color }, i) => (
              <div key={step} className="flex gap-5">
                <div className="flex flex-col items-center gap-1 shrink-0">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  {i < PROCESS_STEPS.length - 1 && (
                    <div className="w-0.5 h-10 bg-gray-100 mt-1" />
                  )}
                </div>
                <div className="pt-2">
                  <p className="text-xs font-bold text-muted-foreground tracking-widest uppercase mb-1">
                    Step {step}
                  </p>
                  <h3 className="font-bold mb-1">{title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Refund timelines */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold mb-6">Refund timelines</h2>
          <div className="overflow-hidden rounded-xl border">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left p-4 font-semibold">Payment method</th>
                  <th className="text-left p-4 font-semibold">Refund timeline</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {[
                  { method: "Credit / Debit card", timeline: "3–5 business days" },
                  { method: "PayPal", timeline: "1–3 business days" },
                  { method: "Cash on delivery", timeline: "Credit applied to next order within 48 hours" },
                  { method: "Store credit / Gift card", timeline: "Immediate" },
                ].map(({ method, timeline }) => (
                  <tr key={method}>
                    <td className="p-4 text-muted-foreground">{method}</td>
                    <td className="p-4 font-medium">{timeline}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-muted-foreground mt-3">
            Timelines begin from the date your refund is approved, not the date of your request.
          </p>
        </section>

        {/* Partial refunds */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold mb-4">Partial refunds</h2>
          <p className="text-muted-foreground leading-relaxed">
            In some cases — particularly where only part of an order was affected — we may offer a
            partial refund proportional to the affected items. We will always communicate the
            refund amount clearly before processing it and will not proceed without your agreement.
          </p>
        </section>

        {/* Bakery responsibility */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold mb-4">Bakery responsibility</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            When a refund is approved, Sweet Treats processes it to you immediately. We then work
            with the bakery to understand and correct the issue. Repeated quality failures can
            result in a bakery being suspended from our platform.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Delivery-related issues (damage in transit, excessive lateness) are investigated
            with our delivery partners separately and do not affect the bakery&apos;s standing.
          </p>
        </section>

        {/* Contact */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold mb-6">Contact us about a refund</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { icon: Phone, label: "Phone", value: "+212 522-000000", note: "Mon–Sat 9am–7pm" },
              { icon: Clock, label: "Email", value: "support@sweettreats.example", note: "Reply within 2 hours" },
              { icon: ShieldCheck, label: "In-app chat", value: "Available in your account", note: "Fastest response" },
            ].map(({ icon: Icon, label, value, note }) => (
              <div key={label} className="rounded-xl border p-5 text-center">
                <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center mx-auto mb-3">
                  <Icon className="h-5 w-5 text-amber-700" />
                </div>
                <p className="font-semibold text-sm">{label}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{value}</p>
                <p className="text-xs text-amber-700 mt-1">{note}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Related links */}
        <section className="border-t pt-10">
          <h2 className="text-lg font-bold mb-4">Related policies</h2>
          <div className="flex flex-wrap gap-3">
            <Link href="/terms">
              <Button variant="outline" size="sm">Terms of Service</Button>
            </Link>
            <Link href="/privacy">
              <Button variant="outline" size="sm">Privacy Policy</Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" size="sm">Contact Support</Button>
            </Link>
            <Link href="/FAQ">
              <Button variant="outline" size="sm">FAQ</Button>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
