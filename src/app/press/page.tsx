import Link from "next/link";
import type { Metadata } from "next";
import {
  Download,
  ExternalLink,
  ImageIcon,
  FileText,
  Mail,
  Building2,
  Users,
  Store,
  MapPin,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Press & Media | Sweet Treats",
  description:
    "Press resources, brand assets, company facts, and media contact information for Sweet Treats Marketplace.",
};

const BRAND_ASSETS = [
  { icon: ImageIcon, label: "Logo — SVG (light)", hint: "For light backgrounds" },
  { icon: ImageIcon, label: "Logo — SVG (dark)", hint: "For dark backgrounds" },
  { icon: ImageIcon, label: "Logo — PNG", hint: "High-resolution 2x" },
  { icon: FileText, label: "Brand guidelines", hint: "Colours, typography, usage" },
];

const STATS = [
  { icon: Building2, value: "2024", label: "Founded" },
  { icon: Store, value: "500+", label: "Stores" },
  { icon: Users, value: "50k+", label: "Customers" },
  { icon: MapPin, value: "20+", label: "Cities" },
];

const COVERAGE = [
  {
    publication: "TechCrunch",
    headline: "Sweet Treats raises seed round to help local bakeries go digital",
    date: "2026-05-14",
  },
  {
    publication: "Forbes",
    headline: "The startup turning neighbourhood bakeries into thriving businesses",
    date: "2026-04-02",
  },
  {
    publication: "BBC Food",
    headline: "Why ordering from local bakeries is easier than ever",
    date: "2026-03-18",
  },
  {
    publication: "The Guardian",
    headline: "Sweet Treats and the rise of the independent patisserie",
    date: "2026-02-27",
  },
];

export default function PressPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-br from-amber-500 to-orange-600 py-20 md:py-28">
        <div className="container mx-auto px-4 text-center">
          <Badge className="mb-5 bg-white/20 text-white border-white/30 hover:bg-white/20 text-sm px-4 py-1 backdrop-blur-sm">
            Press & Media
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">
            Press & Media
          </h1>
          <p className="text-amber-100 text-lg max-w-xl mx-auto">
            Resources, assets, and contacts for journalists and media professionals
            covering Sweet Treats.
          </p>
        </div>
      </section>

      <section className="py-16 border-b">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl font-bold mb-8">Brand assets</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {BRAND_ASSETS.map(({ icon: Icon, label, hint }) => (
              <div
                key={label}
                className="rounded-2xl border p-5 flex flex-col items-center text-center gap-3 hover:shadow-sm hover:border-amber-300 transition-all group"
              >
                <div className="w-14 h-14 rounded-xl bg-amber-50 flex items-center justify-center group-hover:bg-amber-100 transition-colors">
                  <Icon className="h-7 w-7 text-amber-600" />
                </div>
                <div>
                  <p className="font-semibold text-sm">{label}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{hint}</p>
                </div>
                <a href="#">
                  <Button size="sm" variant="outline" className="gap-1.5 text-xs mt-1 hover:border-amber-400 hover:text-amber-700">
                    <Download className="h-3.5 w-3.5" />
                    Download
                  </Button>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 bg-amber-50 border-b">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl font-bold mb-8 text-center">Company at a glance</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {STATS.map(({ icon: Icon, value, label }) => (
              <div key={label} className="text-center">
                <div className="mx-auto w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center mb-3">
                  <Icon className="h-6 w-6 text-amber-700" />
                </div>
                <p className="text-3xl font-extrabold text-amber-600">{value}</p>
                <p className="text-sm text-muted-foreground mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 border-b">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-2xl font-bold mb-8">Recent coverage</h2>
          <div className="space-y-4">
            {COVERAGE.map(({ publication, headline, date }) => (
              <Link
                key={headline}
                href="#"
                className="flex items-start justify-between gap-4 rounded-xl border p-5 hover:border-amber-400 hover:shadow-sm transition-all group"
              >
                <div className="flex-1">
                  <Badge className="mb-2 bg-amber-100 text-amber-800 border-amber-200 hover:bg-amber-100 text-xs">
                    {publication}
                  </Badge>
                  <p className="font-semibold text-gray-900 group-hover:text-amber-700 transition-colors leading-snug">
                    {headline}
                  </p>
                  <time
                    dateTime={date}
                    className="text-xs text-muted-foreground mt-1 block"
                  >
                    {new Date(date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                </div>
                <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-amber-600 transition-colors mt-1 shrink-0" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="rounded-2xl bg-gradient-to-br from-amber-600 to-orange-700 text-white p-8 md:p-10 text-center mb-12">
            <h2 className="text-2xl font-bold mb-2">Media contact</h2>
            <p className="text-amber-100 mb-6">
              For press enquiries, interview requests, and media partnerships.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href="mailto:press@sweettreats.com">
                <Button className="bg-white text-amber-700 hover:bg-amber-50 font-semibold gap-2">
                  <Mail className="h-4 w-4" />
                  press@sweettreats.com
                </Button>
              </a>
              <a href="#">
                <Button variant="outline" className="border-white/40 text-white hover:bg-white/10 gap-2">
                  <Download className="h-4 w-4" />
                  Download press kit
                </Button>
              </a>
            </div>
          </div>

          <div className="rounded-xl border p-6 bg-gray-50">
            <h3 className="font-bold mb-3 text-sm uppercase tracking-wide text-muted-foreground">
              About Sweet Treats
            </h3>
            <p className="text-sm text-gray-700 leading-relaxed">
              Sweet Treats Marketplace is an online platform that connects consumers with
              local, independent bakeries. Founded in 2024, the company enables home bakers
              and professional patisseries to list their products, manage orders, and reach
              new customers through a seamless digital storefront. Sweet Treats currently
              operates across 20+ cities and serves over 50,000 customers, with a mission to
              help artisan food businesses grow sustainably in the digital age.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
