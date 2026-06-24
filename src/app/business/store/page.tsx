"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Star,
  ShoppingCart,
  Facebook,
  Instagram,
  Twitter,
  Camera,
  Pencil,
  Package,
  BarChart3,
  ExternalLink,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { LoadingState } from "@/components/feedback/LoadingState";
import { ErrorState } from "@/components/feedback/ErrorState";
import { EmptyState } from "@/components/feedback/EmptyState";
import { formatCurrency } from "@/lib/currency";
import { PRODUCT_CATEGORIES } from "@/config";
import { getMyStore, getMyStoreProducts } from "@/services/stores";
import type { Product, Store } from "@/types";

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={
            star <= Math.round(rating)
              ? "w-4 h-4 fill-yellow-400 text-yellow-400"
              : "w-4 h-4 text-gray-300"
          }
        />
      ))}
    </div>
  );
}

function ProductGrid({ products }: { products: Product[] }) {
  if (products.length === 0) {
    return (
      <EmptyState
        title="No products here yet"
        message="Products in this category will appear here once added."
      />
    );
  }
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <Card key={product.id} className="overflow-hidden group">
          <div className="relative">
            {product.images?.[0]?.url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={product.images[0].url}
                alt={product.name}
                className="w-full h-44 object-cover"
              />
            ) : (
              <div className="flex h-44 w-full items-center justify-center bg-gradient-to-br from-amber-50 to-orange-100 text-sm text-muted-foreground">
                <Package className="h-8 w-8 text-amber-300" />
              </div>
            )}
            {/* Quick-edit overlay */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
              <Button
                asChild
                size="sm"
                variant="secondary"
                className="h-8 text-xs"
              >
                <Link href={`/business/dashboard/products/${product.id}/edit`}>
                  <Pencil className="h-3 w-3 mr-1.5" />
                  Edit
                </Link>
              </Button>
            </div>
          </div>
          <CardContent className="p-3">
            <h3 className="font-semibold text-sm mb-1 leading-tight line-clamp-2">{product.name}</h3>
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-amber-600">
                {formatCurrency(product.price)}
              </span>
              <Badge variant="secondary" className="text-xs">{product.category}</Badge>
            </div>
          </CardContent>
          <CardFooter className="p-3 pt-0">
            <Button className="w-full h-8 text-xs" size="sm">
              <ShoppingCart className="w-3.5 h-3.5 mr-1.5" />
              Add to Cart
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

export default function BakeryStorePage() {
  const [storeIsLive, setStoreIsLive] = useState(true);

  const storeQuery = useQuery<Store | null>({
    queryKey: ["my-store"],
    queryFn: () => getMyStore(),
  });
  const productsQuery = useQuery<Product[]>({
    queryKey: ["my-store-products"],
    queryFn: () => getMyStoreProducts(),
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
          title="Couldn't load your store"
          message="We couldn't fetch your store details. Please try again."
          onRetry={() => storeQuery.refetch()}
        />
      </div>
    );
  }

  const store = storeQuery.data;
  const products = productsQuery.data ?? [];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero / Cover Section */}
      <div className="relative">
        {/* Cover image */}
        <div className="relative h-56 sm:h-72 overflow-hidden">
          {store?.coverUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={store.coverUrl}
              alt={store?.name ?? "Store cover"}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-amber-400 via-orange-400 to-yellow-300" />
          )}
          {/* Overlay gradient for readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

          {/* Edit cover button */}
          <Button
            size="sm"
            variant="secondary"
            className="absolute top-4 right-4 bg-white/90 hover:bg-white text-gray-800 shadow-sm"
          >
            <Camera className="h-3.5 w-3.5 mr-1.5" />
            Edit Cover
          </Button>

          {/* Store visibility toggle */}
          <div className={`absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm ${
            storeIsLive ? "bg-green-600 text-white" : "bg-gray-700 text-gray-200"
          }`}>
            <div className={`w-1.5 h-1.5 rounded-full ${storeIsLive ? "bg-white" : "bg-gray-400"}`} />
            {storeIsLive ? "Store is Live" : "Draft"}
          </div>
        </div>

        {/* Store identity row */}
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex items-end gap-5 -mt-12 relative z-10 pb-4">
            {/* Store logo / avatar */}
            <div className="relative flex-shrink-0">
              <div className="w-24 h-24 rounded-2xl border-4 border-white shadow-lg bg-gradient-to-br from-amber-100 to-orange-200 flex items-center justify-center overflow-hidden">
                {store?.logoUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={store.logoUrl}
                    alt="Store logo"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-3xl font-bold text-amber-600">
                    {(store?.name ?? "S").slice(0, 1).toUpperCase()}
                  </span>
                )}
              </div>
              <button className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center hover:bg-gray-50 transition-colors">
                <Camera className="h-3.5 w-3.5 text-gray-600" />
              </button>
            </div>

            {/* Store name + actions */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 flex-1 pb-1">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 leading-tight">
                  {store?.name ?? "Your Store"}
                </h1>
                <div className="flex items-center gap-2 mt-1">
                  <StarRating rating={store?.rating ?? 0} />
                  <span className="text-sm text-muted-foreground">
                    ({store?.reviewCount ?? 0} reviews)
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 mr-2">
                  <Switch
                    id="store-live"
                    checked={storeIsLive}
                    onCheckedChange={setStoreIsLive}
                  />
                  <Label htmlFor="store-live" className="text-sm font-medium">
                    {storeIsLive ? "Live" : "Draft"}
                  </Label>
                </div>
                <Button variant="outline" size="sm">
                  <Pencil className="h-3.5 w-3.5 mr-1.5" />
                  Edit Store Info
                </Button>
                <Button size="sm" asChild>
                  <Link href={`/stores/${store?.id}`} target="_blank">
                    <ExternalLink className="h-3.5 w-3.5 mr-1.5" />
                    View Public Page
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 max-w-6xl">
        {/* Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <Card className="border-l-4 border-l-amber-500">
            <CardContent className="pt-4 pb-4">
              <p className="text-xs text-muted-foreground mb-1">Rating</p>
              <div className="flex items-center gap-2">
                <p className="text-2xl font-bold text-gray-900">
                  {store?.rating?.toFixed(1) ?? "—"}
                </p>
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-green-500">
            <CardContent className="pt-4 pb-4">
              <p className="text-xs text-muted-foreground mb-1">Products</p>
              <p className="text-2xl font-bold text-gray-900">{products.length}</p>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-blue-500">
            <CardContent className="pt-4 pb-4">
              <p className="text-xs text-muted-foreground mb-1">Total Orders</p>
              <p className="text-2xl font-bold text-gray-900">—</p>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-purple-500">
            <CardContent className="pt-4 pb-4">
              <p className="text-xs text-muted-foreground mb-1">Reviews</p>
              <p className="text-2xl font-bold text-gray-900">{store?.reviewCount ?? 0}</p>
            </CardContent>
          </Card>
        </div>

        {/* Store Info + Social */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2 space-y-4">
            {store?.description && (
              <div>
                <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-2">About</h2>
                <p className="text-gray-700 text-sm leading-relaxed">{store.description}</p>
              </div>
            )}
            {(store?.address || store?.hours) && (
              <div className="grid sm:grid-cols-2 gap-4">
                {store?.address && (
                  <div>
                    <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-1">Location</h2>
                    <p className="text-sm text-gray-700">{store.address}</p>
                  </div>
                )}
                {store?.hours && (
                  <div>
                    <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-1">Hours</h2>
                    <p className="text-sm text-gray-700">{store.hours}</p>
                  </div>
                )}
              </div>
            )}
          </div>
          <div>
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">Social Links</h2>
            <div className="flex flex-wrap gap-2">
              <Button size="sm" variant="outline" className="text-xs">
                <Facebook className="w-3.5 h-3.5 mr-1.5" />
                Facebook
              </Button>
              <Button size="sm" variant="outline" className="text-xs">
                <Instagram className="w-3.5 h-3.5 mr-1.5" />
                Instagram
              </Button>
              <Button size="sm" variant="outline" className="text-xs">
                <Twitter className="w-3.5 h-3.5 mr-1.5" />
                Twitter
              </Button>
            </div>
          </div>
        </div>

        <Separator className="mb-8" />

        {/* Products Section */}
        <div className="mb-2 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Your Products</h2>
            <p className="text-sm text-muted-foreground">{products.length} product{products.length !== 1 ? "s" : ""} listed</p>
          </div>
          <div className="flex gap-2">
            <Button asChild variant="outline" size="sm">
              <Link href="/business/dashboard/products">
                <BarChart3 className="h-3.5 w-3.5 mr-1.5" />
                Manage All
              </Link>
            </Button>
            <Button asChild size="sm">
              <Link href="/business/dashboard/products/add">
                Add Product
              </Link>
            </Button>
          </div>
        </div>

        {productsQuery.isLoading ? (
          <LoadingState rows={4} />
        ) : productsQuery.isError ? (
          <ErrorState
            title="Couldn't load products"
            message="We couldn't fetch your store's products. Please try again."
            onRetry={() => productsQuery.refetch()}
          />
        ) : (
          <Tabs defaultValue="all" className="w-full mt-4">
            <TabsList className="mb-5 flex-wrap h-auto gap-1">
              <TabsTrigger value="all" className="text-xs">All ({products.length})</TabsTrigger>
              {PRODUCT_CATEGORIES.map((category) => {
                const count = products.filter((p) => p.category === category).length;
                if (count === 0) return null;
                return (
                  <TabsTrigger key={category} value={category} className="text-xs">
                    {category} ({count})
                  </TabsTrigger>
                );
              })}
            </TabsList>
            <TabsContent value="all">
              <ProductGrid products={products} />
            </TabsContent>
            {PRODUCT_CATEGORIES.map((category) => (
              <TabsContent key={category} value={category}>
                <ProductGrid
                  products={products.filter((p) => p.category === category)}
                />
              </TabsContent>
            ))}
          </Tabs>
        )}

        <Separator className="my-8" />

        {/* Customer Reviews */}
        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-4">Customer Reviews</h2>
          <EmptyState
            title="No reviews yet"
            message="Customer reviews for your store will appear here."
          />
        </section>
      </div>
    </div>
  );
}
