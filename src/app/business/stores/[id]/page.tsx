"use client";

import React from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { ShoppingCart, Store as StoreIcon, Star } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { LoadingState } from "@/components/feedback/LoadingState";
import { ErrorState } from "@/components/feedback/ErrorState";
import { EmptyState } from "@/components/feedback/EmptyState";
import { formatCurrency } from "@/lib/currency";
import { getStoreById, getStoreProducts } from "@/services/stores";
import type { Product, Store } from "@/types";

export default function StoreDetailPage() {
  const params = useParams<{ id: string }>();
  const id = params?.id ?? "";

  const storeQuery = useQuery<Store | null>({
    queryKey: ["store", id],
    queryFn: () => getStoreById(id),
    enabled: Boolean(id),
  });
  const productsQuery = useQuery<Product[]>({
    queryKey: ["store-products", id],
    queryFn: () => getStoreProducts(id),
    enabled: Boolean(id),
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
          message="We couldn't fetch this store's details. Please try again."
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
          icon={<StoreIcon className="h-10 w-10" />}
          title="Store not found"
          message="We couldn't find the store you're looking for."
          actionLabel="Back to stores"
          actionHref="/business/stores"
        />
      </div>
    );
  }

  const products = productsQuery.data ?? [];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex items-center gap-4">
        {store.logoUrl ? (
          <Image
            src={store.logoUrl}
            alt={store.name}
            width={80}
            height={80}
            className="h-20 w-20 rounded-full object-cover"
          />
        ) : (
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
            <StoreIcon className="h-8 w-8 text-muted-foreground" />
          </div>
        )}
        <div>
          <h1 className="text-3xl font-bold">{store.name}</h1>
          {store.description && (
            <p className="text-sm text-muted-foreground">{store.description}</p>
          )}
          <div className="mt-2 flex flex-wrap items-center gap-4 text-sm">
            {typeof store.rating === "number" && (
              <span className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                {store.rating.toFixed(1)} ({store.reviewCount ?? 0})
              </span>
            )}
            {store.deliveryTime && <span>{store.deliveryTime}</span>}
            {typeof store.deliveryFee === "number" && (
              <span>{formatCurrency(store.deliveryFee)} delivery</span>
            )}
          </div>
        </div>
      </div>

      <Separator className="my-8" />

      <h2 className="mb-4 text-2xl font-bold">Products</h2>

      {productsQuery.isLoading ? (
        <LoadingState rows={4} />
      ) : productsQuery.isError ? (
        <ErrorState
          title="Couldn't load products"
          message="We couldn't fetch this store's products. Please try again."
          onRetry={() => productsQuery.refetch()}
        />
      ) : products.length === 0 ? (
        <EmptyState
          title="No products yet"
          message="This store hasn't listed any products yet."
        />
      ) : (
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
                    className="mb-4 h-48 w-full rounded-md object-cover"
                  />
                ) : (
                  <div className="mb-4 flex h-48 w-full items-center justify-center rounded-md bg-muted text-sm text-muted-foreground">
                    No image
                  </div>
                )}
                <h3 className="mb-1 font-semibold">{product.name}</h3>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">
                    {formatCurrency(product.price)}
                  </span>
                  <Badge>{product.category}</Badge>
                </div>
              </CardContent>
              <CardFooter className="p-4">
                <Button className="w-full">
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Add to Cart
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
