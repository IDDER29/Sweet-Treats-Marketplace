import Link from "next/link";
import type { Metadata } from "next";
import {
  Gift,
  Heart,
  Baby,
  Briefcase,
  Home,
  GraduationCap,
  Cake,
  ArrowRight,
  Star,
  ShieldCheck,
  Truck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Sweet Gift Guide — Perfect Treats for Every Occasion",
  description:
    "Find the perfect edible gift. Curated sweet treat recommendations for birthdays, weddings, thank-yous, and every celebration in between.",
};

const OCCASIONS = [
  {
    slug: "birthday",
    icon: Cake,
    title: "Birthday",
    tagline: "Cakes they'll never forget",
    gradient: "from-pink-400 to-rose-500",
    picks: [
      { name: "Custom layer cake", price: "From $45", badge: "Best seller" },
      { name: "Cupcake tower (24pc)", price: "From $38", badge: "Popular" },
      { name: "Chocolate fondant box", price: "From $22", badge: "Fan favourite" },
    ],
  },
  {
    slug: "thank-you",
    icon: Heart,
    title: "Thank You",
    tagline: "Say it with something sweet",
    gradient: "from-amber-400 to-orange-500",
    picks: [
      { name: "Macaron assortment (12pc)", price: "From $18", badge: "Elegant" },
      { name: "Handcrafted brownie box", price: "From $14", badge: "Crowd pleaser" },
      { name: "Premium cookie tin", price: "From $20", badge: "Gift-ready" },
    ],
  },
  {
    slug: "baby-shower",
    icon: Baby,
    title: "Baby Shower",
    tagline: "Celebrate the new arrival",
    gradient: "from-blue-300 to-cyan-400",
    picks: [
      { name: "Gender reveal cake", price: "From $55", badge: "Trending" },
      { name: "Pastel macaron tower", price: "From $42", badge: "Instagram-worthy" },
      { name: "Fondant baby cookies", price: "From $28", badge: "Adorable" },
    ],
  },
  {
    slug: "wedding",
    icon: Heart,
    title: "Wedding",
    tagline: "The sweetest day deserves the sweetest treats",
    gradient: "from-rose-300 to-pink-500",
    picks: [
      { name: "Wedding cake (3-tier)", price: "From $180", badge: "Custom" },
      { name: "Favour boxes (50pc)", price: "From $120", badge: "Bespoke" },
      { name: "Dessert table setup", price: "From $300", badge: "Full service" },
    ],
  },
  {
    slug: "corporate",
    icon: Briefcase,
    title: "Corporate",
    tagline: "Impress clients and teams",
    gradient: "from-slate-400 to-gray-600",
    picks: [
      { name: "Branded cookie boxes", price: "From $35", badge: "Customisable" },
      { name: "Office party platter", price: "From $60", badge: "Feeds 20" },
      { name: "Meeting-room pastry box", price: "From $25", badge: "Morning fave" },
    ],
  },
  {
    slug: "housewarming",
    icon: Home,
    title: "Housewarming",
    tagline: "Welcome to their new home",
    gradient: "from-green-400 to-emerald-500",
    picks: [
      { name: "Home-themed cake", price: "From $38", badge: "Personalised" },
      { name: "Bread & pastry basket", price: "From $30", badge: "Artisan" },
      { name: "Welcome sweet hamper", price: "From $45", badge: "Thoughtful" },
    ],
  },
  {
    slug: "graduation",
    icon: GraduationCap,
    title: "Graduation",
    tagline: "Celebrate the achievement",
    gradient: "from-purple-400 to-violet-600",
    picks: [
      { name: "Graduation cake", price: "From $42", badge: "Custom" },
      { name: "Celebration cupcake set", price: "From $28", badge: "Festive" },
      { name: "Treat gift hamper", price: "From $35", badge: "Mixed selection" },
    ],
  },
  {
    slug: "get-well",
    icon: Heart,
    title: "Get Well Soon",
    tagline: "A little sweetness for tough days",
    gradient: "from-yellow-300 to-amber-400",
    picks: [
      { name: "Comfort cookie selection", price: "From $16", badge: "Wholesome" },
      { name: "Herbal tea & cake box", price: "From $22", badge: "Soothing" },
      { name: "Vegan treat bundle", price: "From $20", badge: "Dietary-friendly" },
    ],
  },
];

const BUDGET_GUIDES = [
  {
    range: "Under $20",
    description: "Small but thoughtful. Cookie boxes, brownie sets, macaron pairs.",
    color: "border-l-green-400",
  },
  {
    range: "$20–$50",
    description: "The sweet spot. Cupcake towers, custom cakes, gift hampers.",
    color: "border-l-amber-400",
  },
  {
    range: "$50–$100",
    description: "Premium treats. Tiered cakes, large assortments, artisan collections.",
    color: "border-l-orange-400",
  },
  {
    range: "$100+",
    description: "Go all out. Wedding cakes, bespoke orders, full dessert tables.",
    color: "border-l-rose-400",
  },
];

export default function GiftGuidePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-rose-50 via-pink-50 to-amber-50 border-b py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-rose-100 mb-6">
            <Gift className="h-8 w-8 text-rose-600" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-5 leading-tight">
            The Sweet Gift Guide
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-8">
            Whatever the occasion, the right treat makes it unforgettable.
            Discover handpicked sweet gift ideas from local bakeries — all delivered fresh to the door.
          </p>
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {OCCASIONS.map((o) => (
              <a
                key={o.slug}
                href={`#${o.slug}`}
                className="px-4 py-1.5 rounded-full border text-sm font-medium hover:bg-amber-50 hover:border-amber-300 transition-colors"
              >
                {o.title}
              </a>
            ))}
          </div>
          <div className="flex justify-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Truck className="h-4 w-4 text-green-500" /> Fresh delivery
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-blue-500" /> Satisfaction guaranteed
            </span>
            <span className="flex items-center gap-1.5">
              <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" /> Verified bakeries
            </span>
          </div>
        </div>
      </section>

      {/* Budget guide */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-xl font-bold mb-5 text-center">Shop by budget</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {BUDGET_GUIDES.map(({ range, description, color }) => (
              <Link key={range} href="/products">
                <Card className={`border-l-4 ${color} hover:shadow-md transition-shadow cursor-pointer h-full`}>
                  <CardContent className="p-4">
                    <p className="font-bold text-lg mb-1">{range}</p>
                    <p className="text-sm text-muted-foreground">{description}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Occasion sections */}
      <section className="py-16">
        <div className="container mx-auto px-4 space-y-20">
          {OCCASIONS.map(({ slug, icon: Icon, title, tagline, gradient, picks }) => (
            <div key={slug} id={slug} className="scroll-mt-20">
              {/* Section header */}
              <div className="flex items-center gap-4 mb-8">
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center shrink-0`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">{title}</h2>
                  <p className="text-muted-foreground text-sm">{tagline}</p>
                </div>
              </div>

              {/* Product picks */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-5">
                {picks.map(({ name, price, badge }) => (
                  <Link key={name} href="/products">
                    <div className="group rounded-2xl border hover:shadow-md transition-shadow cursor-pointer overflow-hidden">
                      {/* Placeholder image */}
                      <div className={`h-40 bg-gradient-to-br ${gradient} opacity-80 relative flex items-center justify-center`}>
                        <Icon className="h-12 w-12 text-white/60" />
                        <Badge className="absolute top-3 left-3 bg-white/90 text-gray-700 hover:bg-white/90 text-xs border-0">
                          {badge}
                        </Badge>
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-sm mb-1 group-hover:text-amber-700 transition-colors">
                          {name}
                        </h3>
                        <p className="text-amber-700 font-bold text-sm">{price}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              <Link href={`/collections/${slug}`}>
                <Button variant="outline" className="gap-2 hover:border-amber-400 hover:text-amber-700">
                  See all {title.toLowerCase()} treats
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Gift cards teaser */}
      <section className="py-16 bg-gradient-to-br from-amber-50 to-orange-50 border-y">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-lg mx-auto">
            <Gift className="h-12 w-12 text-amber-600 mx-auto mb-5" />
            <h2 className="text-2xl font-bold mb-3">Not sure what to get?</h2>
            <p className="text-muted-foreground mb-6">
              Let them choose their own treats. A Sweet Treats gift card is always the right flavour.
            </p>
            <Button className="bg-amber-600 hover:bg-amber-700 text-white gap-2" size="lg">
              Coming soon — Gift cards
            </Button>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 bg-gradient-to-br from-amber-600 to-orange-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to make someone&apos;s day?</h2>
          <p className="text-amber-100 text-lg mb-8 max-w-md mx-auto">
            Browse our full range of treats from local bakeries and find the perfect gift today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/products">
              <Button size="lg" className="bg-white text-amber-700 hover:bg-amber-50 font-semibold gap-2 px-8">
                Shop all treats <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="/collections">
              <Button size="lg" variant="outline" className="border-white/40 text-white hover:bg-white/10 px-8">
                Browse collections
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
