"use client";
import Link from "next/link";
import { ArrowRight, Plus, Star } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getAllProducts } from "@/utils/api";
import { useCart } from "@/context/CartContext";
import { formatCurrency } from "@/lib/currency";
import { LoadingState } from "@/components/feedback/LoadingState";
import type { Product } from "@/types";

const DIETARY_BADGE_COLORS: Record<string, string> = {
  "Gluten-Free": "bg-green-100 text-green-800 border-green-200",
  Vegan: "bg-emerald-100 text-emerald-800 border-emerald-200",
  "Sugar-Free": "bg-blue-100 text-blue-800 border-blue-200",
  "Dairy-Free": "bg-purple-100 text-purple-800 border-purple-200",
  "Nut-Free": "bg-yellow-100 text-yellow-800 border-yellow-200",
};

const FeaturedProductsSection = () => {
  const { addToCart } = useCart();
  const { data, isLoading } = useQuery<Product[]>({
    queryKey: ["featured-products"],
    queryFn: () => getAllProducts(),
  });

  const products = (data ?? []).slice(0, 8);

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id,
      quantity: 1,
      name: product.name,
      price: Number(product.price),
      image: product.images?.[0]?.url,
    });
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div>
            <p className="text-amber-600 font-semibold text-sm uppercase tracking-widest mb-2">
              Handpicked for You
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Featured Products
            </h2>
            <p className="mt-2 text-gray-500 max-w-md">
              Freshly baked and ready to order from local artisan bakeries near you.
            </p>
          </div>
          <Link
            href="/products"
            className="inline-flex items-center gap-1.5 text-amber-600 hover:text-amber-800 font-semibold text-sm whitespace-nowrap"
          >
            View all products <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <LoadingState key={i} rows={3} />
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <p className="text-lg">Featured products will appear here soon.</p>
            <Button asChild className="mt-4 bg-amber-500 hover:bg-amber-600 text-white">
              <Link href="/stores">Browse Stores</Link>
            </Button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {products.map((product) => {
                const dietaryLabel =
                  product.dietaryLabel && product.dietaryLabel !== "None"
                    ? product.dietaryLabel
                    : null;
                const badgeClass =
                  dietaryLabel
                    ? (DIETARY_BADGE_COLORS[dietaryLabel] ?? "bg-amber-100 text-amber-800 border-amber-200")
                    : null;

                return (
                  <Card
                    key={product.id}
                    className="group overflow-hidden border border-gray-100 hover:border-amber-200 hover:shadow-lg transition-all duration-300 rounded-2xl"
                  >
                    {/* Product image */}
                    <div className="relative overflow-hidden bg-amber-50 aspect-square">
                      <Link href={`/product/${product.id}`} className="block h-full">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={product.images?.[0]?.url || "/placeholder.svg"}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </Link>

                      {/* Dietary badge */}
                      {dietaryLabel && badgeClass && (
                        <span
                          className={`absolute top-2 left-2 text-xs font-semibold px-2 py-0.5 rounded-full border ${badgeClass}`}
                        >
                          {dietaryLabel}
                        </span>
                      )}

                      {/* Quick add button — visible on hover */}
                      <button
                        onClick={() => handleAddToCart(product)}
                        aria-label={`Quick add ${product.name} to cart`}
                        className="absolute bottom-2 right-2 w-9 h-9 rounded-full bg-amber-500 hover:bg-amber-600 text-white flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-200"
                      >
                        <Plus className="w-4 h-4" strokeWidth={2.5} />
                      </button>
                    </div>

                    <CardContent className="p-3 md:p-4">
                      {/* Category */}
                      {product.category && (
                        <p className="text-xs text-amber-600 font-medium uppercase tracking-wide mb-1">
                          {product.category}
                        </p>
                      )}

                      {/* Name */}
                      <Link href={`/product/${product.id}`}>
                        <h3 className="font-semibold text-sm md:text-base text-gray-900 leading-snug line-clamp-2 hover:text-amber-700 transition-colors">
                          {product.name}
                        </h3>
                      </Link>

                      {/* Rating row */}
                      {product.rating != null && (
                        <div className="flex items-center gap-1 mt-1">
                          <Star className="w-3.5 h-3.5 text-amber-400" fill="currentColor" />
                          <span className="text-xs text-gray-500">
                            {product.rating.toFixed(1)}
                            {product.reviewCount != null && (
                              <span className="ml-1">({product.reviewCount})</span>
                            )}
                          </span>
                        </div>
                      )}

                      {/* Price + CTA */}
                      <div className="flex items-center justify-between mt-3">
                        <span className="font-bold text-gray-900 text-sm md:text-base">
                          {formatCurrency(Number(product.price))}
                        </span>
                        <Button
                          size="sm"
                          onClick={() => handleAddToCart(product)}
                          className="h-8 px-3 text-xs bg-amber-500 hover:bg-amber-600 text-white rounded-full"
                        >
                          Add to Cart
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Bottom CTA */}
            <div className="mt-12 text-center">
              <Button
                size="lg"
                asChild
                variant="outline"
                className="border-amber-300 text-amber-700 hover:bg-amber-50 px-10 rounded-full font-semibold"
              >
                <Link href="/products">
                  View All Products <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default FeaturedProductsSection;
