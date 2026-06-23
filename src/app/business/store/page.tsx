"use client";

import React from "react";
import Image from "next/image";
import {
  Star,
  ShoppingCart,
  Facebook,
  Instagram,
  Twitter,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { LoadingState } from "@/components/feedback/LoadingState";
import { ErrorState } from "@/components/feedback/ErrorState";
import { EmptyState } from "@/components/feedback/EmptyState";
import { formatCurrency } from "@/lib/currency";
import { PRODUCT_CATEGORIES } from "@/config";
import { getMyStore, getMyStoreProducts } from "@/services/stores";
import type { Product, Store } from "@/types";

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
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {products.map((product) => (
        <Card key={product.id}>
          <CardContent className="p-4">
            {product.images?.[0]?.url ? (
              <Image
                src={product.images[0].url}
                alt={product.name}
                width={200}
                height={200}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
            ) : (
              <div className="mb-4 flex h-48 w-full items-center justify-center rounded-md bg-muted text-sm text-muted-foreground">
                No image
              </div>
            )}
            <h3 className="font-semibold mb-1">{product.name}</h3>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">
                {formatCurrency(product.price)}
              </span>
              <Badge>{product.category}</Badge>
            </div>
          </CardContent>
          <CardFooter className="p-4">
            <Button className="w-full">
              <ShoppingCart className="w-4 h-4 mr-2" />
              Add to Cart
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

export default function BakeryStorePage() {
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
    <div className="container mx-auto px-4 py-8">
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Store Information */}
        <div>
          <h1 className="text-3xl font-bold mb-2">
            {store?.name ?? "Your Store"}
          </h1>
          <div className="flex items-center mb-4">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={
                    star <= Math.round(store?.rating ?? 0)
                      ? "w-5 h-5 fill-yellow-400 text-yellow-400"
                      : "w-5 h-5 text-gray-300"
                  }
                />
              ))}
            </div>
            <span className="ml-2 text-sm text-gray-600">
              ({store?.reviewCount ?? 0} reviews)
            </span>
          </div>
          {store?.description && (
            <p className="text-gray-600 mb-4">{store.description}</p>
          )}
          <div className="mb-4">
            <h2 className="font-semibold mb-2">Location</h2>
            <p>{store?.address ?? "No address on file"}</p>
          </div>
          <div className="mb-4">
            <h2 className="font-semibold mb-2">Hours</h2>
            <p>{store?.hours ?? "Hours not set"}</p>
          </div>
          <div className="flex space-x-4 mb-6">
            <Button size="sm" variant="outline">
              <Facebook className="w-4 h-4 mr-2" />
              Facebook
            </Button>
            <Button size="sm" variant="outline">
              <Instagram className="w-4 h-4 mr-2" />
              Instagram
            </Button>
            <Button size="sm" variant="outline">
              <Twitter className="w-4 h-4 mr-2" />
              Twitter
            </Button>
          </div>
        </div>

        {/* Store Image */}
        <div className="relative overflow-hidden rounded-lg">
          <div className="aspect-w-16 aspect-h-9">
            {store?.coverUrl ? (
              <Image
                src={store.coverUrl}
                alt={store.name}
                width={800}
                height={400}
                className="object-cover"
              />
            ) : (
              <div className="flex h-64 w-full items-center justify-center bg-muted text-sm text-muted-foreground">
                No cover image
              </div>
            )}
          </div>
          <Button
            size="icon"
            variant="outline"
            className="absolute left-2 top-1/2 transform -translate-y-1/2"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            variant="outline"
            className="absolute right-2 top-1/2 transform -translate-y-1/2"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Separator className="my-8" />

      {/* Product Categories */}
      {productsQuery.isLoading ? (
        <LoadingState rows={4} />
      ) : productsQuery.isError ? (
        <ErrorState
          title="Couldn't load products"
          message="We couldn't fetch your store's products. Please try again."
          onRetry={() => productsQuery.refetch()}
        />
      ) : (
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="all">All Products</TabsTrigger>
            {PRODUCT_CATEGORIES.map((category) => (
              <TabsTrigger key={category} value={category}>
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
          <TabsContent value="all" className="space-y-4">
            <ProductGrid products={products} />
          </TabsContent>
          {PRODUCT_CATEGORIES.map((category) => (
            <TabsContent key={category} value={category} className="space-y-4">
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
        <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>
        <EmptyState
          title="No reviews yet"
          message="Customer reviews for your store will appear here."
        />
      </section>
    </div>
  );
}
