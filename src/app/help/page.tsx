import Link from "next/link";
import type { Metadata } from "next";
import {
  ShoppingBag,
  MapPin,
  RotateCcw,
  CreditCard,
  User,
  Store,
  Search,
  ChevronRight,
  MessageCircle,
  Mail,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Help Center | Sweet Treats",
  description:
    "Find answers to common questions about orders, delivery, payments, accounts, and selling on Sweet Treats.",
};

const TOPICS = [
  { icon: ShoppingBag, label: "Placing an order", href: "#orders" },
  { icon: MapPin, label: "Track my delivery", href: "#delivery" },
  { icon: RotateCcw, label: "Returns & refunds", href: "#payments" },
  { icon: CreditCard, label: "Payment issues", href: "#payments" },
  { icon: User, label: "Account & profile", href: "#accounts" },
  { icon: Store, label: "Selling on Sweet Treats", href: "#selling" },
];

const CATEGORIES = [
  {
    id: "orders",
    title: "Orders",
    articles: [
      "How to place an order",
      "Modifying an order",
      "Cancellation policy",
    ],
  },
  {
    id: "delivery",
    title: "Delivery",
    articles: [
      "Delivery areas",
      "Estimated delivery times",
      "What if my order is late?",
    ],
  },
  {
    id: "payments",
    title: "Payments",
    articles: [
      "Accepted payment methods",
      "Refund timelines",
      "Promo code issues",
    ],
  },
  {
    id: "accounts",
    title: "Accounts",
    articles: ["Reset password", "Update profile", "Delete account"],
  },
];

export default function HelpPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-br from-amber-500 to-orange-600 py-20 md:py-28">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">
            How can we help?
          </h1>
          <p className="text-amber-100 text-lg mb-8">
            Search our help center for answers
          </p>
          <div className="max-w-xl mx-auto flex items-center gap-2 bg-white rounded-xl shadow-lg px-4 py-3">
            <Search className="h-5 w-5 text-muted-foreground shrink-0" />
            <input
              type="search"
              placeholder="Search help articles…"
              className="flex-1 text-sm text-gray-900 placeholder:text-muted-foreground focus:outline-none bg-transparent"
            />
            <Button size="sm" className="bg-amber-600 hover:bg-amber-700 text-white shrink-0">
              Search
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 bg-amber-50 border-b">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-10">Popular topics</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {TOPICS.map(({ icon: Icon, label, href }) => (
              <Link
                key={label}
                href={href}
                className="flex flex-col items-center gap-3 p-6 bg-white rounded-2xl border border-transparent hover:border-amber-400 hover:shadow-md transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center group-hover:bg-amber-200 transition-colors">
                  <Icon className="h-6 w-6 text-amber-700" />
                </div>
                <span className="text-sm font-semibold text-center text-gray-800 group-hover:text-amber-700 transition-colors">
                  {label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl font-bold mb-10 text-center">Browse by category</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {CATEGORIES.map(({ id, title, articles }) => (
              <div key={id} id={id} className="border rounded-2xl p-6 hover:shadow-sm transition-shadow">
                <div className="flex items-center gap-2 mb-4">
                  <Badge className="bg-amber-100 text-amber-800 border-amber-200 hover:bg-amber-100">
                    {title}
                  </Badge>
                </div>
                <ul className="space-y-3">
                  {articles.map((article) => (
                    <li key={article}>
                      <Link
                        href="#"
                        className="flex items-center justify-between text-sm text-gray-700 hover:text-amber-700 group transition-colors"
                      >
                        <span>{article}</span>
                        <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-amber-600 transition-colors" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="selling" className="py-14 bg-gradient-to-r from-amber-600 to-orange-600 text-white">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold">Still need help?</h2>
            <p className="text-amber-100">
              Our support team is available 7 days a week, 8am–10pm.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Link href="/contact">
              <Button className="bg-white text-amber-700 hover:bg-amber-50 font-semibold gap-2">
                <MessageCircle className="h-4 w-4" />
                Contact support
              </Button>
            </Link>
            <a href="mailto:support@sweettreats.example">
              <Button variant="outline" className="border-white/40 text-white hover:bg-white/10 gap-2">
                <Mail className="h-4 w-4" />
                Email us
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
