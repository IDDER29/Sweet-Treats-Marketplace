import type { Metadata } from "next";
import Link from "next/link";
import { Accessibility } from "lucide-react";
import { Button } from "@/components/ui/button";
import { APP_CONFIG } from "@/config";

export const metadata: Metadata = {
  title: "Accessibility Statement — Sweet Treats Marketplace",
  description:
    "Our commitment to making Sweet Treats Marketplace accessible to everyone, including our WCAG 2.1 AA conformance goal and known limitations.",
};

export default function AccessibilityPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 border-b py-14 md:py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-amber-200 mb-6">
            <Accessibility className="h-8 w-8 text-amber-700" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
            Accessibility Statement
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
            {APP_CONFIG.name} is committed to ensuring our platform is accessible and usable
            by everyone, regardless of ability or assistive technology.
          </p>
          <p className="text-sm text-muted-foreground mt-4">Last updated: June 2026</p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-14 max-w-3xl">

        {/* Our commitment */}
        <section className="mb-12">
          <h2 className="text-xl font-bold mb-1 border-l-4 border-amber-400 pl-4 text-gray-900">
            Our commitment
          </h2>
          <div className="pl-5 mt-4 text-muted-foreground leading-relaxed space-y-4">
            <p>
              We aim to conform to the{" "}
              <strong className="text-gray-800">
                Web Content Accessibility Guidelines (WCAG) 2.1 Level AA
              </strong>
              . These guidelines explain how to make web content more accessible to people with
              disabilities, including visual, auditory, motor, and cognitive impairments.
            </p>
            <p>
              Accessibility is an ongoing effort. We conduct regular audits, act on user
              feedback, and include accessibility considerations in all new feature development.
            </p>
          </div>
        </section>

        {/* What we've done */}
        <section className="mb-12">
          <h2 className="text-xl font-bold mb-1 border-l-4 border-amber-400 pl-4 text-gray-900">
            What we&apos;ve done
          </h2>
          <p className="pl-5 mt-4 text-muted-foreground leading-relaxed mb-5">
            The following accessibility features have been implemented across the platform:
          </p>
          <ul className="pl-5 space-y-3">
            {[
              "Keyboard navigation support throughout all interactive elements",
              "Screen reader compatible markup with meaningful ARIA labels and roles",
              "Sufficient colour contrast ratios meeting WCAG 2.1 AA requirements",
              "Descriptive alt text on all product and store images",
              "Resizable text up to 200 % without loss of content or functionality",
              "Skip-to-content link available at the top of every page",
              "Visible focus indicators on all interactive elements",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
                <span className="mt-1 h-2 w-2 rounded-full bg-amber-400 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </section>

        {/* Known limitations */}
        <section className="mb-12">
          <h2 className="text-xl font-bold mb-1 border-l-4 border-amber-400 pl-4 text-gray-900">
            Known limitations
          </h2>
          <p className="pl-5 mt-4 text-muted-foreground leading-relaxed mb-5">
            We are transparent about areas we are actively working to improve:
          </p>
          <ul className="pl-5 space-y-3">
            {[
              "Some downloadable PDF documents (e.g. invoices, receipts) may not be fully accessible to screen readers — we are transitioning to accessible HTML alternatives.",
              "Live map features on the order-tracking page have limited screen reader support; a text-based status summary is provided as a fallback.",
              "A small number of third-party embedded widgets (payment and review components) are outside our direct control; we are working with those providers.",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
                <span className="mt-1 h-2 w-2 rounded-full border-2 border-amber-400 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </section>

        {/* Feedback */}
        <section className="mb-12 p-6 rounded-2xl bg-amber-50 border border-amber-100">
          <h2 className="text-xl font-bold mb-3 text-amber-900 border-l-4 border-amber-400 pl-4">
            Feedback &amp; reporting issues
          </h2>
          <p className="text-amber-800 leading-relaxed mb-4">
            If you experience any accessibility barriers on our platform, please let us know. Your
            feedback directly informs our improvement roadmap.
          </p>
          <div className="space-y-2 text-sm text-amber-900">
            <p>
              <strong>Email:</strong>{" "}
              <a
                href="mailto:contact@sweettreats.example"
                className="underline underline-offset-2 hover:text-amber-700 transition-colors"
              >
                contact@sweettreats.example
              </a>
            </p>
            <p>
              <strong>Phone:</strong>{" "}
              <a
                href={`tel:${APP_CONFIG.supportPhone.replace(/\s/g, "")}`}
                className="underline underline-offset-2 hover:text-amber-700 transition-colors"
              >
                {APP_CONFIG.supportPhone}
              </a>
            </p>
            <p className="mt-3 text-amber-700">
              We aim to acknowledge all accessibility feedback within{" "}
              <strong>2 business days</strong> and provide a substantive response within{" "}
              <strong>10 business days</strong>.
            </p>
          </div>
        </section>

        {/* Technical specification */}
        <section className="mb-12">
          <h2 className="text-xl font-bold mb-1 border-l-4 border-amber-400 pl-4 text-gray-900">
            Technical specification
          </h2>
          <div className="pl-5 mt-4 overflow-hidden rounded-xl border">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left p-4 font-semibold text-gray-700">Attribute</th>
                  <th className="text-left p-4 font-semibold text-gray-700">Detail</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {[
                  { attr: "Standard", detail: "WCAG 2.1 Level AA" },
                  { attr: "Primary test environment", detail: "NVDA + Google Chrome (Windows)" },
                  { attr: "Secondary test environment", detail: "VoiceOver + Safari (macOS / iOS)" },
                  { attr: "Technology", detail: "HTML5, ARIA, Next.js 14" },
                ].map(({ attr, detail }) => (
                  <tr key={attr}>
                    <td className="p-4 font-medium text-gray-800">{attr}</td>
                    <td className="p-4 text-muted-foreground">{detail}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Related links */}
        <section className="border-t pt-10">
          <h2 className="text-lg font-bold mb-4">Related links</h2>
          <div className="flex flex-wrap gap-3">
            <Button variant="outline" size="sm" asChild>
              <Link href="/privacy">Privacy Policy</Link>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link href="/terms">Terms of Service</Link>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}
