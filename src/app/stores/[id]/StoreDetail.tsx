"use client";
import { useState } from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import {
  Star,
  MapPin,
  Clock,
  Heart,
  Package,
  Truck,
  ShoppingCart,
} from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { LoadingState } from "@/components/feedback/LoadingState";
import { ErrorState } from "@/components/feedback/ErrorState";
import { EmptyState } from "@/components/feedback/EmptyState";
import { formatCurrency } from "@/lib/currency";
import { useCart } from "@/context/CartContext";
import { getStoreById, getStoreProducts } from "@/services/stores";
import type { Product, Store } from "@/types";

export default function StoreDetail({ id }: { id: string }) {
  const { addToCart } = useCart();
  const [followed, setFollowed] = useState(false);

  const storeQuery = useQuery<Store | null>({
    queryKey: ["store", id],
    queryFn: () => getStoreById(id),
    enabled: !!id,
  });
  const productsQuery = useQuery<Product[]>({
    queryKey: ["store-products", id],
    queryFn: () => getStoreProducts(id),
    enabled: !!id,
  });

  if (storeQuery.isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <LoadingState rows={6} />
      </div>
    );
  }

  if (storeQuery.isError) {
    return (
      <div className="container mx-auto px-4 py-8">
        <ErrorState
          title="Couldn't load store"
          onRetry={() => storeQuery.refetch()}
        />
      </div>
    );
  }

  const store = storeQuery.data;
  if (!store) {
    return (
      <div className="container mx-auto px-4 py-8">
        <EmptyState
          title="Store not found"
          message="This store may no longer be available."
          actionLabel="Browse stores"
          actionHref="/stores"
        />
      </div>
    );
  }

  const products = productsQuery.data ?? [];

  return (
    <div>
      {/* Store hero */}
      <div className="relative h-48 sm:h-56 w-full overflow-hidden">
        {store.coverUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={store.coverUrl}
            alt={store.name}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-amber-200 via-orange-200 to-rose-200" />
        )}
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

        {/* Store name over hero */}
        <div className="absolute bottom-4 left-4 right-4 text-white">
          <h1 className="text-2xl sm:text-3xl font-bold drop-shadow-sm leading-tight">
            {store.name}
          </h1>
        </div>
      </div>

      <div className="container mx-auto px-4">
        {/* Stats bar */}
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 py-4 border-b">
          <span className="flex items-center gap-1.5 text-sm font-medium">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            {(store.rating ?? 0).toFixed(1)}
            {store.reviewCount ? (
              <span className="text-muted-foreground font-normal">
                ({store.reviewCount} reviews)
              </span>
            ) : null}
          </span>

          {typeof store.deliveryFee === "number" && (
            <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <Truck className="h-4 w-4" />
              {store.deliveryFee === 0
                ? "Free delivery"
                : `${formatCurrency(store.deliveryFee)} delivery`}
            </span>
          )}

          {store.deliveryTime && (
            <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              {store.deliveryTime}
            </span>
          )}

          {/* Follow button — pushed to right on sm+ */}
          <Button
            variant="ghost"
            size="sm"
            className={`ml-auto flex items-center gap-1.5 border transition-colors ${
              followed
                ? "border-rose-300 text-rose-500 bg-rose-50 hover:bg-rose-50"
                : "hover:border-rose-200 hover:text-rose-400"
            }`}
            onClick={() => {
              setFollowed((v) => !v);
              toast.success(
                followed ? "Unfollowed store." : "You're now following this store!"
              );
            }}
          >
            <Heart
              className={`h-4 w-4 ${followed ? "fill-rose-500 text-rose-500" : ""}`}
            />
            {followed ? "Following" : "Follow"}
          </Button>
        </div>

        {/* Store description & info */}
        <div className="py-5">
          {store.description && (
            <p className="text-muted-foreground text-sm leading-relaxed mb-4 max-w-2xl">
              {store.description}
            </p>
          )}

          <div className="flex flex-wrap gap-3">
            {store.address && (
              <Badge
                variant="secondary"
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-muted"
              >
                <MapPin className="h-3.5 w-3.5 text-rose-500 flex-shrink-0" />
                <span className="line-clamp-1">{store.address}</span>
              </Badge>
            )}
            {store.hours && (
              <Badge
                variant="secondary"
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-muted"
              >
                <Clock className="h-3.5 w-3.5 text-amber-500 flex-shrink-0" />
                {store.hours}
              </Badge>
            )}
            {store.categories && store.categories.length > 0 &&
              store.categories.map((cat) => (
                <Badge
                  key={cat}
                  className="px-3 py-1.5 text-xs bg-amber-100 text-amber-800 hover:bg-amber-100 border border-amber-200"
                  variant="secondary"
                >
                  {cat}
                </Badge>
              ))}
          </div>
        </div>

        <Separator className="mb-6" />

        {/* Products section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-semibold text-gray-900">
              Our Products
              {products.length > 0 && (
                <span className="ml-2 text-sm font-normal text-muted-foreground">
                  ({products.length})
                </span>
              )}
            </h2>
            <Link
              href="/products"
              className="text-sm text-amber-600 hover:text-amber-700 underline underline-offset-2"
            >
              Browse all
            </Link>
          </div>

          {productsQuery.isLoading ? (
            <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <Card key={i} className="overflow-hidden animate-pulse">
                  <div className="h-40 bg-muted" />
                  <CardContent className="p-4">
                    <div className="h-4 bg-muted rounded mb-2 w-3/4" />
                    <div className="h-3 bg-muted rounded w-1/2" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : products.length === 0 ? (
            <EmptyState
              icon={<Package className="h-10 w-10" />}
              title="No products yet"
              message="This bakery hasn't listed any products yet — check back soon!"
            />
          ) : (
            <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              {products.map((p) => {
                const isOutOfStock = p.availability === "Out of Stock";
                return (
                  <Card
                    key={p.id}
                    className="overflow-hidden transition-all hover:shadow-lg hover:-translate-y-0.5 group"
                  >
                    <Link href={`/product/${p.id}`} className="block">
                      <div className="relative h-40 bg-muted overflow-hidden">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={p.images?.[0]?.url || "/placeholder.svg"}
                          alt={p.name}
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                        />
                        {isOutOfStock && (
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                            <span className="text-white text-xs font-semibold bg-black/60 px-2 py-1 rounded-full">
                              Out of Stock
                            </span>
                          </div>
                        )}
                      </div>
                    </Link>

                    <CardContent className="p-3 pb-1">
                      <Link href={`/product/${p.id}`}>
                        <h3 className="font-semibold text-sm leading-tight hover:text-amber-700 transition-colors line-clamp-1">
                          {p.name}
                        </h3>
                      </Link>
                      {p.rating !== undefined && (
                        <div className="flex items-center gap-1 mt-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-xs text-muted-foreground">
                            {p.rating.toFixed(1)}
                          </span>
                        </div>
                      )}
                    </CardContent>

                    <CardFooter className="px-3 pb-3 pt-2 flex items-center justify-between gap-2">
                      <span className="font-bold text-sm text-amber-700">
                        {formatCurrency(Number(p.price))}
                      </span>
                      <Button
                        size="sm"
                        className="h-8 px-3 text-xs bg-amber-500 hover:bg-amber-600 text-white gap-1"
                        disabled={isOutOfStock}
                        onClick={() => {
                          addToCart({
                            id: p.id,
                            quantity: 1,
                            name: p.name,
                            price: Number(p.price),
                            image: p.images?.[0]?.url,
                          });
                          toast.success("Added to cart.");
                        }}
                      >
                        <ShoppingCart className="h-3 w-3" />
                        Add
                      </Button>
                    </CardFooter>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
