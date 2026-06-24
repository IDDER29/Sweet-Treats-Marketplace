"use client";

import { useMemo, useState } from "react";
import { notFound, useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowLeft,
  ArrowRight,
  Cake,
  Gift,
  Heart,
  Sparkles,
  Sun,
  Leaf,
  Star,
  ShoppingCart,
  Coffee,
  Baby,
  Flower2,
  Briefcase,
  Home,
  GraduationCap,
  HeartHandshake,
} from "lucide-react";
import Link from "next/link";
import { toast } from "react-toastify";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LoadingState } from "@/components/feedback/LoadingState";
import { EmptyState } from "@/components/feedback/EmptyState";
import { formatCurrency } from "@/lib/currency";
import { getAllProducts } from "@/utils/api";
import { useCart } from "@/context/CartContext";

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

interface ProductImage {
  url: string;
}

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  description: string;
  dietary: string[];
  dietaryLabel: string[];
  rating: number;
  images: ProductImage[];
  availability?: string;
  createdAt?: string;
}

type SortOption = "default" | "price-asc" | "price-desc" | "rating" | "newest";

/* ------------------------------------------------------------------ */
/* Collection metadata                                                 */
/* ------------------------------------------------------------------ */

type CollectionMeta = {
  name: string;
  tagline: string;
  description: string;
  gradient: string;
  iconName: string;
  /** If set, filters products whose `category` matches this value. */
  categoryFilter?: string;
  /** If set, filters products whose `dietary` array includes this value. */
  dietaryFilter?: string;
  badge: string;
};

const COLLECTION_META: Record<string, CollectionMeta> = {
  birthday: {
    name: "Birthday Celebrations",
    tagline: "Make their day unforgettable",
    description:
      "Stunning custom cakes and cupcake towers from local bakeries. Perfect for milestone birthdays, surprise parties, or just because.",
    gradient: "from-pink-500 to-rose-600",
    iconName: "Cake",
    categoryFilter: "Cake",
    badge: "Most gifted",
  },
  "gift-boxes": {
    name: "Gift Boxes",
    tagline: "Beautifully boxed, lovingly made",
    description:
      "Handpicked assortments of macarons, truffles, cookies and pastries. Ready to gift — each box arrives elegantly packaged.",
    gradient: "from-amber-500 to-orange-600",
    iconName: "Gift",
    categoryFilter: "Other",
    badge: "Editor's pick",
  },
  valentines: {
    name: "Valentine's Day",
    tagline: "Sweeter than words",
    description:
      "Heart-shaped delights, chocolate truffles, and red-velvet creations for the one you love. Order early — these sell out fast.",
    gradient: "from-red-400 to-rose-600",
    iconName: "Heart",
    categoryFilter: "Cake",
    badge: "Limited edition",
  },
  "new-arrivals": {
    name: "New Arrivals",
    tagline: "Fresh from the bakeries",
    description:
      "Discover the latest treats added by our bakeries this week. New flavors, seasonal experiments, and freshly launched products.",
    gradient: "from-violet-500 to-purple-600",
    iconName: "Sparkles",
    badge: "Updated weekly",
  },
  summer: {
    name: "Summer Specials",
    tagline: "Light, fresh, and refreshing",
    description:
      "Fruit tarts, lemon glazed cakes, chilled cheesecakes, and more — our bakeries' warm-weather favourites.",
    gradient: "from-yellow-400 to-amber-500",
    iconName: "Sun",
    categoryFilter: "Pastry",
    badge: "Seasonal",
  },
  vegan: {
    name: "Vegan & Plant-Based",
    tagline: "Indulgent and entirely plant-based",
    description:
      "No compromise on flavour. Our best vegan cakes, cookies, and pastries — made with love, without any animal products.",
    gradient: "from-green-500 to-emerald-600",
    iconName: "Leaf",
    dietaryFilter: "Vegan",
    badge: "100% plant-based",
  },
  "thank-you": {
    name: "Thank You Treats",
    tagline: "Say it with something sweet",
    description:
      "A heartfelt thank you deserves a delicious treat. Browse our curated selection of beautifully packaged cookies and confections.",
    gradient: "from-teal-500 to-cyan-600",
    iconName: "HeartHandshake",
    categoryFilter: "Cookie",
    badge: "Thoughtful gifts",
  },
  "baby-shower": {
    name: "Baby Shower",
    tagline: "Sweet beginnings deserve sweet celebrations",
    description:
      "Adorable cakes, pastel cupcake towers, and delicate sugar cookies perfect for welcoming a new arrival.",
    gradient: "from-sky-400 to-blue-500",
    iconName: "Baby",
    categoryFilter: "Cake",
    badge: "New arrival",
  },
  wedding: {
    name: "Wedding Sweets",
    tagline: "Elegant treats for your special day",
    description:
      "Tiered wedding cakes, delicate petit fours, and bespoke confections. Let our bakers make your wedding sweeter.",
    gradient: "from-rose-300 to-pink-500",
    iconName: "Flower2",
    categoryFilter: "Cake",
    badge: "Bespoke",
  },
  corporate: {
    name: "Corporate Gifting",
    tagline: "Impress clients and delight your team",
    description:
      "Premium branded sweet boxes and bulk bakery orders. Custom packaging available for volume orders.",
    gradient: "from-slate-600 to-gray-700",
    iconName: "Briefcase",
    categoryFilter: "Other",
    badge: "Bulk available",
  },
  housewarming: {
    name: "Housewarming",
    tagline: "The sweetest welcome to a new home",
    description:
      "Celebrate a new chapter with warm, comforting bakes — loaves, cookies, and gift hampers perfect for new neighbours.",
    gradient: "from-orange-400 to-amber-600",
    iconName: "Home",
    categoryFilter: "Bread",
    badge: "Warm & homely",
  },
  graduation: {
    name: "Graduation Sweets",
    tagline: "Celebrate the achievement",
    description:
      "Cap-topped cupcakes, congratulations cakes, and sweet treats to mark the big milestone for your graduate.",
    gradient: "from-indigo-500 to-violet-600",
    iconName: "GraduationCap",
    categoryFilter: "Cake",
    badge: "Congrats!",
  },
  "get-well": {
    name: "Get Well Soon",
    tagline: "A little sweetness goes a long way",
    description:
      "Cheer someone up with wholesome, comforting treats. Gluten-free and sugar-free options available.",
    gradient: "from-emerald-400 to-teal-500",
    iconName: "Coffee",
    categoryFilter: "Cookie",
    badge: "Feel better",
  },
};

/* Icon lookup */
const ICON_MAP: Record<string, React.ElementType> = {
  Cake,
  Gift,
  Heart,
  Sparkles,
  Sun,
  Leaf,
  HeartHandshake,
  Baby,
  Flower2,
  Briefcase,
  Home,
  GraduationCap,
  Coffee,
};

/* Other collection slugs for "Explore more" strip */
const ALL_SLUGS = Object.keys(COLLECTION_META);

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

function renderStars(rating: number) {
  return Array.from({ length: 5 }, (_, i) => (
    <Star
      key={i}
      className={`w-3.5 h-3.5 ${
        i < Math.floor(rating)
          ? "text-yellow-400 fill-yellow-400"
          : "text-gray-200 fill-gray-200"
      }`}
    />
  ));
}

function pickOtherSlugs(current: string, count = 3): string[] {
  const others = ALL_SLUGS.filter((s) => s !== current);
  // deterministic shuffle using slug charcode sum as seed offset
  const seed = current.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  const shifted = [...others.slice(seed % others.length), ...others.slice(0, seed % others.length)];
  return shifted.slice(0, count);
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function CollectionDetailPage() {
  const params = useParams<{ slug: string }>();
  const slug = params?.slug ?? "";
  const router = useRouter();

  const meta = COLLECTION_META[slug];

  /* Redirect to notFound if slug is unknown */
  if (!meta) {
    notFound();
  }

  const Icon = ICON_MAP[meta.iconName] ?? Gift;
  const { addToCart } = useCart();
  const [sortBy, setSortBy] = useState<SortOption>("default");

  const { data: allProducts = [], isLoading } = useQuery<Product[]>({
    queryKey: ["all-products-collection"],
    queryFn: getAllProducts,
    staleTime: 5 * 60 * 1000,
  });

  /* Filter products for this collection */
  const collectionProducts = useMemo(() => {
    let filtered = allProducts;

    if (meta.dietaryFilter) {
      filtered = filtered.filter((p) =>
        (p.dietary ?? []).some(
          (d) => d.toLowerCase() === (meta.dietaryFilter ?? "").toLowerCase()
        )
      );
    } else if (meta.categoryFilter) {
      filtered = filtered.filter((p) => p.category === meta.categoryFilter);
    }

    /* For new-arrivals: sort by newest first by default, take most recent 30 */
    if (slug === "new-arrivals") {
      filtered = [...filtered]
        .sort((a, b) => (b.createdAt ?? "").localeCompare(a.createdAt ?? ""))
        .slice(0, 30);
    }

    switch (sortBy) {
      case "price-asc":
        return [...filtered].sort((a, b) => a.price - b.price);
      case "price-desc":
        return [...filtered].sort((a, b) => b.price - a.price);
      case "rating":
        return [...filtered].sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
      case "newest":
        return [...filtered].sort((a, b) =>
          (b.createdAt ?? "").localeCompare(a.createdAt ?? "")
        );
      default:
        return filtered;
    }
  }, [allProducts, meta, slug, sortBy]);

  const otherSlugs = pickOtherSlugs(slug);

  return (
    <div className="min-h-screen bg-white">
      {/* ── Hero ── */}
      <div className={`relative bg-gradient-to-br ${meta.gradient} overflow-hidden`}>
        {/* Decorative icon */}
        <div className="absolute top-0 right-0 opacity-10 translate-x-8 -translate-y-4">
          <Icon className="h-64 w-64 text-white" />
        </div>
        <div className="absolute inset-0 bg-black/10" />

        <div className="relative container mx-auto px-4 py-12 md:py-20">
          {/* Breadcrumb */}
          <Link
            href="/collections"
            className="inline-flex items-center gap-1.5 text-white/70 hover:text-white text-sm mb-6 transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Collections
          </Link>

          <div className="max-w-2xl space-y-3">
            <Badge className="bg-white/20 hover:bg-white/20 text-white border-white/30 backdrop-blur-sm text-xs">
              {meta.badge}
            </Badge>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight">
              {meta.name}
            </h1>
            <p className="text-lg text-white/80 font-medium">{meta.tagline}</p>
            <p className="text-base text-white/70 leading-relaxed max-w-lg">
              {meta.description}
            </p>
            {!isLoading && (
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 text-white text-sm font-medium mt-2">
                <span>{collectionProducts.length} treats available</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Products ── */}
      <div className="container mx-auto px-4 py-10">
        {/* Sort bar */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
          {!isLoading && (
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">
                {collectionProducts.length}
              </span>{" "}
              {collectionProducts.length === 1 ? "product" : "products"}
            </p>
          )}
          <Select
            value={sortBy}
            onValueChange={(v) => setSortBy(v as SortOption)}
          >
            <SelectTrigger className="w-48 sm:ml-auto">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default">Featured</SelectItem>
              <SelectItem value="price-asc">Price: Low to High</SelectItem>
              <SelectItem value="price-desc">Price: High to Low</SelectItem>
              <SelectItem value="rating">Top Rated</SelectItem>
              <SelectItem value="newest">Newest</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {isLoading ? (
          <LoadingState rows={6} />
        ) : collectionProducts.length === 0 ? (
          <EmptyState
            icon={<Icon className="h-12 w-12" />}
            title="No treats here yet"
            message="Our bakers are working on it! Check back soon or browse all products."
            actionLabel="Browse all products"
            actionHref="/products"
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {collectionProducts.map((product) => {
              const firstDietary =
                product.dietaryLabel?.[0] || product.dietary?.[0];
              const isOutOfStock = product.availability === "Out of Stock";

              return (
                <Card
                  key={product.id}
                  className="overflow-hidden transition-all hover:shadow-lg hover:-translate-y-0.5 cursor-pointer group"
                  onClick={() => router.push(`/product/${product.id}`)}
                >
                  <CardHeader className="p-0 relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={product.images?.[0]?.url || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                    />
                    {firstDietary && firstDietary !== "None" && (
                      <Badge className="absolute top-2 left-2 bg-emerald-600 hover:bg-emerald-600 text-white text-xs">
                        {firstDietary}
                      </Badge>
                    )}
                    <Badge
                      className={`absolute top-2 right-2 text-xs ${
                        isOutOfStock
                          ? "bg-red-100 text-red-700 hover:bg-red-100"
                          : "bg-green-100 text-green-700 hover:bg-green-100"
                      }`}
                      variant="secondary"
                    >
                      {isOutOfStock ? "Out of Stock" : "In Stock"}
                    </Badge>
                  </CardHeader>

                  <CardContent className="p-4 pb-2">
                    <h3 className="font-semibold text-base leading-tight mb-1 line-clamp-1">
                      {product.name}
                    </h3>
                    <div className="flex items-center gap-1 mb-2">
                      <div className="flex">{renderStars(product.rating ?? 0)}</div>
                      <span className="text-xs text-muted-foreground">
                        {(product.rating ?? 0).toFixed(1)}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {product.description}
                    </p>
                  </CardContent>

                  <CardFooter className="px-4 pb-4 pt-2 flex items-center justify-between gap-2">
                    <span className="font-bold text-lg text-amber-700">
                      {formatCurrency(Number(product.price))}
                    </span>
                    <Button
                      size="sm"
                      className="bg-amber-500 hover:bg-amber-600 text-white gap-1.5"
                      disabled={isOutOfStock}
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart({
                          id: product.id,
                          quantity: 1,
                          name: product.name,
                          price: Number(product.price),
                          image: product.images?.[0]?.url,
                        });
                        toast.success("Added to cart.");
                      }}
                    >
                      <ShoppingCart className="h-3.5 w-3.5" />
                      Add
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        )}
      </div>

      {/* ── Explore more collections strip ── */}
      <div className="border-t bg-gray-50">
        <div className="container mx-auto px-4 py-10">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-bold">Explore more collections</h2>
            <Link
              href="/collections"
              className="text-sm text-amber-700 hover:text-amber-800 font-medium flex items-center gap-1"
            >
              View all <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {otherSlugs.map((otherSlug) => {
              const otherMeta = COLLECTION_META[otherSlug];
              if (!otherMeta) return null;
              const OtherIcon = ICON_MAP[otherMeta.iconName] ?? Gift;
              return (
                <Link
                  key={otherSlug}
                  href={`/collections/${otherSlug}`}
                  className={`group relative overflow-hidden rounded-2xl min-h-[140px] flex flex-col justify-end p-5 text-white shadow-sm hover:shadow-md transition-shadow`}
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${otherMeta.gradient}`}
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />
                  <div className="absolute top-4 right-4 opacity-25 group-hover:opacity-40 transition-opacity">
                    <OtherIcon className="h-10 w-10" />
                  </div>
                  <div className="relative space-y-1">
                    <p className="text-xs text-white/70 font-medium">
                      {otherMeta.tagline}
                    </p>
                    <h3 className="text-lg font-bold leading-tight">
                      {otherMeta.name}
                    </h3>
                    <div className="flex items-center gap-1 text-xs font-semibold text-white/80 group-hover:text-white transition-colors pt-0.5">
                      Shop now <ArrowRight className="h-3 w-3" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
