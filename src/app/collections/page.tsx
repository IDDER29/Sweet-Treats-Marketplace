import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, Gift, Heart, Sparkles, Cake, Sun, Leaf } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Sweet Collections — Curated Treat Gifts & Bundles",
  description:
    "Shop curated collections of the finest handcrafted sweets — birthday cakes, gift boxes, seasonal specials, and more from local bakeries.",
};

const COLLECTIONS = [
  {
    slug: "birthday",
    name: "Birthday Celebrations",
    tagline: "Make their day unforgettable",
    description:
      "Stunning custom cakes and cupcake towers from local bakeries. Perfect for milestone birthdays, surprise parties, or just because.",
    icon: Cake,
    gradient: "from-pink-500 to-rose-600",
    lightBg: "bg-pink-50",
    accent: "text-pink-700",
    badge: "Most gifted",
    productCount: 48,
    startingFrom: 24,
  },
  {
    slug: "gift-boxes",
    name: "Gift Boxes",
    tagline: "Beautifully boxed, lovingly made",
    description:
      "Handpicked assortments of macarons, truffles, cookies and pastries. Ready to gift — each box arrives elegantly packaged.",
    icon: Gift,
    gradient: "from-amber-500 to-orange-600",
    lightBg: "bg-amber-50",
    accent: "text-amber-700",
    badge: "Editor's pick",
    productCount: 32,
    startingFrom: 18,
  },
  {
    slug: "valentines",
    name: "Valentine's Day",
    tagline: "Sweeter than words",
    description:
      "Heart-shaped delights, chocolate truffles, and red-velvet creations for the one you love. Order early — these sell out fast.",
    icon: Heart,
    gradient: "from-red-400 to-rose-600",
    lightBg: "bg-red-50",
    accent: "text-red-700",
    badge: "Limited edition",
    productCount: 24,
    startingFrom: 15,
  },
  {
    slug: "new-arrivals",
    name: "New Arrivals",
    tagline: "Fresh from the bakeries",
    description:
      "Discover the latest treats added by our bakeries this week. New flavors, seasonal experiments, and freshly launched products.",
    icon: Sparkles,
    gradient: "from-violet-500 to-purple-600",
    lightBg: "bg-violet-50",
    accent: "text-violet-700",
    badge: "Updated weekly",
    productCount: 67,
    startingFrom: 8,
  },
  {
    slug: "summer",
    name: "Summer Specials",
    tagline: "Light, fresh, and refreshing",
    description:
      "Fruit tarts, lemon glazed cakes, chilled cheesecakes, and more — our bakeries' warm-weather favourites.",
    icon: Sun,
    gradient: "from-yellow-400 to-amber-500",
    lightBg: "bg-yellow-50",
    accent: "text-yellow-700",
    badge: "Seasonal",
    productCount: 29,
    startingFrom: 10,
  },
  {
    slug: "vegan",
    name: "Vegan & Plant-Based",
    tagline: "Indulgent and entirely plant-based",
    description:
      "No compromise on flavour. Our best vegan cakes, cookies, and pastries — made with love, without any animal products.",
    icon: Leaf,
    gradient: "from-green-500 to-emerald-600",
    lightBg: "bg-green-50",
    accent: "text-green-700",
    badge: "100% plant-based",
    productCount: 41,
    startingFrom: 9,
  },
];

function CollectionHero({ collection }: { collection: (typeof COLLECTIONS)[number] }) {
  const Icon = collection.icon;
  return (
    <Link
      href={`/collections/${collection.slug}`}
      className="group relative overflow-hidden rounded-2xl flex flex-col justify-end min-h-[280px] p-6 text-white shadow-md hover:shadow-xl transition-shadow"
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${collection.gradient}`} />
      <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />
      <div className="absolute top-5 left-5">
        <Badge className="bg-white/20 hover:bg-white/20 text-white border-white/30 backdrop-blur-sm text-xs">
          {collection.badge}
        </Badge>
      </div>
      <div className="absolute top-5 right-5 opacity-30 group-hover:opacity-50 transition-opacity">
        <Icon className="h-14 w-14" />
      </div>
      <div className="relative space-y-1.5">
        <p className="text-sm font-medium text-white/80">{collection.tagline}</p>
        <h3 className="text-2xl font-bold leading-tight">{collection.name}</h3>
        <p className="text-sm text-white/70 line-clamp-2 leading-relaxed">{collection.description}</p>
        <div className="flex items-center justify-between pt-2">
          <span className="text-sm text-white/80">
            {collection.productCount} treats · from ${collection.startingFrom}
          </span>
          <div className="flex items-center gap-1 text-sm font-semibold group-hover:gap-2 transition-all">
            Shop now <ArrowRight className="h-4 w-4" />
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function CollectionsPage() {
  const [featured, ...rest] = COLLECTIONS;

  return (
    <div className="min-h-screen bg-white">
      {/* Hero banner */}
      <section className="bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 border-b">
        <div className="container mx-auto px-4 py-14 md:py-20 text-center">
          <Badge className="mb-5 bg-amber-100 text-amber-800 border-amber-200 text-sm px-4 py-1 hover:bg-amber-100">
            Handpicked by our team
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
            Sweet Collections
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Curated selections of the finest treats for every occasion, mood, and taste.
            Discover what our local bakeries do best.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {/* Featured collection — large card */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Featured collection</h2>
          </div>
          <Link
            href={`/collections/${featured.slug}`}
            className={`group relative overflow-hidden rounded-2xl flex flex-col md:flex-row min-h-[220px] shadow-sm hover:shadow-lg transition-shadow border`}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${featured.gradient}`} />
            <div className="absolute inset-0 bg-black/5 group-hover:bg-black/10 transition-colors" />
            <div className="relative flex-1 p-8 md:p-10 text-white flex flex-col justify-center space-y-3">
              <Badge className="w-fit bg-white/20 hover:bg-white/20 text-white border-white/30 text-xs">
                {featured.badge}
              </Badge>
              <h3 className="text-3xl sm:text-4xl font-extrabold leading-tight">{featured.name}</h3>
              <p className="text-base text-white/80 max-w-md leading-relaxed">{featured.description}</p>
              <div className="flex items-center gap-4 pt-2">
                <Button className="bg-white text-amber-700 hover:bg-amber-50 font-semibold gap-2">
                  Shop collection <ArrowRight className="h-4 w-4" />
                </Button>
                <span className="text-sm text-white/70">
                  {featured.productCount} products · from ${featured.startingFrom}
                </span>
              </div>
            </div>
            <div className="hidden md:flex md:w-56 items-center justify-center opacity-20">
              <featured.icon className="h-32 w-32 text-white" />
            </div>
          </Link>
        </div>

        {/* Grid of remaining collections */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">All collections</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {rest.map((collection) => (
              <CollectionHero key={collection.slug} collection={collection} />
            ))}
          </div>
        </div>

        {/* "Don't see what you need" CTA */}
        <div className="rounded-2xl bg-gradient-to-r from-gray-50 to-amber-50 border p-7 text-center">
          <h3 className="font-bold text-lg mb-2">Looking for something specific?</h3>
          <p className="text-muted-foreground text-sm mb-4">
            Browse all products from all our local bakeries, with full filtering by category,
            dietary needs, and price.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/products">
              <Button className="bg-amber-600 hover:bg-amber-700 text-white gap-2">
                Browse all treats
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/stores">
              <Button variant="outline" className="gap-2">
                Explore bakeries
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
