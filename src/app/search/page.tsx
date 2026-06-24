"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { Search, X, Star, ShoppingCart } from "lucide-react";
import { toast } from "react-toastify";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { PRODUCT_CATEGORIES } from "@/config";

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

/* ------------------------------------------------------------------ */
/* Page component                                                      */
/* ------------------------------------------------------------------ */

export default function SearchPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const qParam = searchParams.get("q") ?? "";
  const categoryParam = searchParams.get("category") ?? "All";

  const [inputValue, setInputValue] = useState(qParam);
  const [sortBy, setSortBy] = useState<SortOption>("default");

  const { addToCart } = useCart();

  /* Sync input field when URL param changes externally */
  useEffect(() => {
    setInputValue(qParam);
  }, [qParam]);

  /* Dynamic page title */
  useEffect(() => {
    if (qParam) {
      document.title = `Search: "${qParam}" — Sweet Treats Marketplace`;
    } else if (categoryParam && categoryParam !== "All") {
      document.title = `${categoryParam} — Sweet Treats Marketplace`;
    } else {
      document.title = "Search — Sweet Treats Marketplace";
    }
  }, [qParam, categoryParam]);

  /* Fetch all products once */
  const { data: products = [], isLoading } = useQuery<Product[]>({
    queryKey: ["all-products-search"],
    queryFn: getAllProducts,
    staleTime: 5 * 60 * 1000,
  });

  /* URL helpers */
  function pushSearch(q: string, category: string) {
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (category && category !== "All") params.set("category", category);
    router.push(`/search?${params.toString()}`);
  }

  function handleSearchSubmit(e: React.FormEvent) {
    e.preventDefault();
    pushSearch(inputValue.trim(), categoryParam);
  }

  function handleClearSearch() {
    setInputValue("");
    pushSearch("", categoryParam);
  }

  function handleCategoryChange(cat: string) {
    pushSearch(qParam, cat);
  }

  /* Filter + sort */
  const results = useMemo(() => {
    const q = qParam.toLowerCase();
    const filtered = products.filter((p) => {
      const matchesQ =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.description?.toLowerCase().includes(q) ||
        p.category?.toLowerCase().includes(q);
      const matchesCategory =
        categoryParam === "All" || p.category === categoryParam;
      return matchesQ && matchesCategory;
    });

    switch (sortBy) {
      case "price-asc":
        return [...filtered].sort((a, b) => a.price - b.price);
      case "price-desc":
        return [...filtered].sort((a, b) => b.price - a.price);
      case "rating":
        return [...filtered].sort(
          (a, b) => (b.rating ?? 0) - (a.rating ?? 0)
        );
      case "newest":
        return [...filtered].sort((a, b) =>
          (b.createdAt ?? "").localeCompare(a.createdAt ?? "")
        );
      default:
        return filtered;
    }
  }, [products, qParam, categoryParam, sortBy]);

  /* Results count label */
  const countLabel = useMemo(() => {
    const n = results.length;
    if (qParam && categoryParam !== "All") {
      return `${n} ${n === 1 ? "result" : "results"} for "${qParam}" in ${categoryParam}`;
    }
    if (qParam) {
      return `${n} ${n === 1 ? "result" : "results"} for "${qParam}"`;
    }
    if (categoryParam !== "All") {
      return `${n} ${n === 1 ? "product" : "products"} in ${categoryParam}`;
    }
    return `${n} ${n === 1 ? "product" : "products"} found`;
  }, [results.length, qParam, categoryParam]);

  const ALL_PILLS = ["All", ...PRODUCT_CATEGORIES] as const;

  return (
    <div className="min-h-screen bg-white">
      {/* ── Search hero ── */}
      <div className="bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 border-b py-10 px-4">
        <div className="container mx-auto max-w-2xl">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-6 text-center">
            Find your perfect treat
          </h1>
          <form onSubmit={handleSearchSubmit} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
              <Input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Search cakes, cookies, pastries…"
                className="pl-9 pr-9 h-11 text-base bg-white border-amber-200 focus-visible:ring-amber-400"
              />
              {inputValue && (
                <button
                  type="button"
                  onClick={handleClearSearch}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  aria-label="Clear search"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
            <Button
              type="submit"
              className="h-11 px-5 bg-amber-500 hover:bg-amber-600 text-white font-semibold"
            >
              Search
            </Button>
          </form>

          {/* Category pills — horizontally scrollable on mobile */}
          <div className="mt-4 flex gap-2 overflow-x-auto pb-1 no-scrollbar">
            {ALL_PILLS.map((cat) => {
              const active = cat === categoryParam || (cat === "All" && categoryParam === "All");
              return (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={`flex-shrink-0 rounded-full px-4 py-1.5 text-sm font-medium transition-colors whitespace-nowrap border ${
                    active
                      ? "bg-amber-500 text-white border-amber-500 shadow-sm"
                      : "bg-white text-gray-700 border-gray-200 hover:border-amber-300 hover:text-amber-700"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Results area ── */}
      <div className="container mx-auto px-4 py-8">
        {/* Sort + results count row */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
          {!isLoading && (
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">
                {results.length}
              </span>{" "}
              {countLabel.replace(/^\d+ /, "")}
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
        ) : results.length === 0 ? (
          <EmptyState
            icon={<Search className="h-12 w-12" />}
            title={qParam ? `No results for "${qParam}"` : "No products found"}
            message={
              qParam
                ? "Try different keywords, check your spelling, or browse a category."
                : "Try searching for something or select a different category."
            }
            actionLabel={
              qParam || categoryParam !== "All"
                ? "Clear search & filters"
                : undefined
            }
            onAction={
              qParam || categoryParam !== "All"
                ? () => router.push("/search")
                : undefined
            }
          />
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {results.map((product) => {
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
                      className="w-full h-44 object-cover transition-transform duration-300 group-hover:scale-[1.02]"
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

        {/* Browse all link */}
        {!isLoading && results.length > 0 && (
          <div className="mt-10 text-center">
            <p className="text-sm text-muted-foreground mb-3">
              Not finding what you need?
            </p>
            <Link href="/products">
              <Button variant="outline" className="border-amber-300 text-amber-700 hover:bg-amber-50">
                Browse all products
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
