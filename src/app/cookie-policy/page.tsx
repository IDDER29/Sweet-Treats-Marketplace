import type { Metadata } from "next";
import Link from "next/link";
import { CookingPot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { APP_CONFIG } from "@/config";

export const metadata: Metadata = {
  title: "Cookie Policy — Sweet Treats Marketplace",
  description:
    "How and why Sweet Treats Marketplace uses cookies, and how you can manage your preferences.",
};

const COOKIE_TYPES = [
  {
    type: "Strictly Necessary",
    purpose: "Session management, authentication, shopping cart",
    control: "Cannot be disabled",
    duration: "Session",
    controlClass: "text-red-600 font-medium",
  },
  {
    type: "Functional",
    purpose: "Language preference, currency selection",
    control: "Can be disabled",
    duration: "1 year",
    controlClass: "text-amber-700 font-medium",
  },
  {
    type: "Analytics",
    purpose: "Page views, feature usage (anonymised)",
    control: "Can be disabled",
    duration: "13 months",
    controlClass: "text-amber-700 font-medium",
  },
  {
    type: "Marketing",
    purpose: "Personalised deal recommendations",
    control: "Can be disabled",
    duration: "6 months",
    controlClass: "text-amber-700 font-medium",
  },
];

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 border-b py-14 md:py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-amber-200 mb-6">
            <CookingPot className="h-8 w-8 text-amber-700" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
            Cookie Policy
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
            How and why we use cookies on {APP_CONFIG.name}.
          </p>
          <p className="text-sm text-muted-foreground mt-4">Last updated: June 2026</p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-14 max-w-3xl">

        {/* What are cookies */}
        <section className="mb-12">
          <h2 className="text-xl font-bold mb-1 border-l-4 border-amber-400 pl-4 text-gray-900">
            What are cookies?
          </h2>
          <div className="pl-5 mt-4 text-muted-foreground leading-relaxed space-y-4">
            <p>
              Cookies are small text files that a website saves on your device when you visit.
              They allow the site to remember your actions and preferences (such as login status,
              language, or currency) over a period of time, so you don&apos;t have to keep re-entering
              them whenever you return or browse between pages.
            </p>
            <p>
              Cookies can be <strong className="text-gray-800">session cookies</strong> (deleted
              when you close your browser) or{" "}
              <strong className="text-gray-800">persistent cookies</strong> (remain on your device
              until they expire or you delete them).
            </p>
          </div>
        </section>

        {/* Cookie types table */}
        <section className="mb-12">
          <h2 className="text-xl font-bold mb-1 border-l-4 border-amber-400 pl-4 text-gray-900">
            Cookies we use
          </h2>
          <p className="pl-5 mt-4 text-muted-foreground leading-relaxed mb-6">
            We use four categories of cookies. The table below explains what each one does and
            whether you can opt out.
          </p>
          <div className="overflow-x-auto rounded-xl border">
            <table className="w-full text-sm">
              <thead className="bg-amber-50">
                <tr>
                  <th className="text-left p-4 font-semibold text-gray-700">Type</th>
                  <th className="text-left p-4 font-semibold text-gray-700">Purpose</th>
                  <th className="text-left p-4 font-semibold text-gray-700">Control</th>
                  <th className="text-left p-4 font-semibold text-gray-700">Duration</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {COOKIE_TYPES.map(({ type, purpose, control, duration, controlClass }) => (
                  <tr key={type} className="hover:bg-gray-50/60 transition-colors">
                    <td className="p-4 font-semibold text-gray-800 align-top whitespace-nowrap">
                      {type}
                    </td>
                    <td className="p-4 text-muted-foreground align-top">{purpose}</td>
                    <td className={`p-4 align-top whitespace-nowrap ${controlClass}`}>{control}</td>
                    <td className="p-4 text-muted-foreground align-top whitespace-nowrap">
                      {duration}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Managing cookies */}
        <section className="mb-12">
          <h2 className="text-xl font-bold mb-1 border-l-4 border-amber-400 pl-4 text-gray-900">
            Managing cookies
          </h2>
          <div className="pl-5 mt-4 text-muted-foreground leading-relaxed space-y-4">
            <p>
              You can control and delete cookies at any time through your browser settings.
              Disabling non-essential cookies will not prevent you from using the core features
              of {APP_CONFIG.name}, but some functionality (such as saved language preferences or
              personalised recommendations) may be unavailable.
            </p>
            <p>
              Each browser handles cookies differently. Refer to your browser&apos;s help
              documentation for instructions:
            </p>
            <ul className="space-y-1.5 pl-2">
              {[
                "Chrome: Settings → Privacy and security → Cookies and other site data",
                "Firefox: Preferences → Privacy & Security → Cookies and Site Data",
                "Safari: Preferences → Privacy → Manage Website Data",
                "Edge: Settings → Cookies and site permissions → Cookies and data stored",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-400 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Third-party cookies */}
        <section className="mb-12">
          <h2 className="text-xl font-bold mb-1 border-l-4 border-amber-400 pl-4 text-gray-900">
            Third-party cookies
          </h2>
          <div className="pl-5 mt-4 text-muted-foreground leading-relaxed space-y-4">
            <p>
              Some pages on our site embed content or functionality from third-party services.
              These providers may set their own cookies independently of us:
            </p>
            <ul className="space-y-3">
              {[
                {
                  name: "Analytics provider (e.g. Plausible / Google Analytics)",
                  desc: "Collects anonymised data about page views and feature usage to help us improve the platform.",
                },
                {
                  name: "Payment processor",
                  desc: "Used during checkout to facilitate secure card transactions. These cookies are strictly necessary for payment flow and cannot be disabled.",
                },
              ].map(({ name, desc }) => (
                <li key={name} className="flex items-start gap-3 text-sm">
                  <span className="mt-1 h-2 w-2 rounded-full bg-amber-300 shrink-0" />
                  <span>
                    <strong className="text-gray-800">{name} — </strong>
                    {desc}
                  </span>
                </li>
              ))}
            </ul>
            <p className="text-sm">
              We do not control third-party cookies. Refer to each provider&apos;s privacy policy
              for details on how they handle your data.
            </p>
          </div>
        </section>

        {/* Updates */}
        <section className="mb-12 p-6 rounded-2xl bg-amber-50 border border-amber-100">
          <h2 className="text-xl font-bold mb-3 text-amber-900 border-l-4 border-amber-400 pl-4">
            Updates to this policy
          </h2>
          <p className="text-amber-800 leading-relaxed">
            We may update this Cookie Policy from time to time to reflect changes in technology,
            regulation, or our practices. When we make material changes, we will notify you by
            email and display a prominent banner on the site for 30 days after the update takes
            effect. The &quot;last updated&quot; date at the top of this page will always reflect the most
            recent revision.
          </p>
        </section>

        {/* Contact */}
        <section className="mb-12">
          <h2 className="text-xl font-bold mb-1 border-l-4 border-amber-400 pl-4 text-gray-900">
            Contact us
          </h2>
          <div className="pl-5 mt-4 text-muted-foreground leading-relaxed space-y-2">
            <p>If you have questions about our use of cookies, please contact us:</p>
            <p>
              <strong className="text-gray-800">Email:</strong>{" "}
              <a
                href={`mailto:${APP_CONFIG.supportEmail}`}
                className="text-amber-700 underline underline-offset-2 hover:text-amber-600 transition-colors"
              >
                {APP_CONFIG.supportEmail}
              </a>
            </p>
            <p>
              <strong className="text-gray-800">Phone:</strong>{" "}
              <a
                href={`tel:${APP_CONFIG.supportPhone.replace(/\s/g, "")}`}
                className="text-amber-700 underline underline-offset-2 hover:text-amber-600 transition-colors"
              >
                {APP_CONFIG.supportPhone}
              </a>
            </p>
          </div>
        </section>

        {/* Related links */}
        <section className="border-t pt-10">
          <h2 className="text-lg font-bold mb-4">Related policies</h2>
          <div className="flex flex-wrap gap-3">
            <Button variant="outline" size="sm" asChild>
              <Link href="/privacy">Privacy Policy</Link>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link href="/terms">Terms of Service</Link>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link href="/contact">Contact Support</Link>
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}
