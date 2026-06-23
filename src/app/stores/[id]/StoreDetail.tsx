"use client";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { Star } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-2 text-3xl font-bold">{store.name}</h1>
      <div className="mb-4 flex items-center gap-2">
        <span className="flex items-center gap-1 text-sm">
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          {(store.rating ?? 0).toFixed(1)}
        </span>
        <span className="text-sm text-muted-foreground">
          ({store.reviewCount ?? 0} reviews)
        </span>
      </div>
      {store.description && (
        <p className="mb-4 text-muted-foreground">{store.description}</p>
      )}
      {store.address && (
        <p className="text-sm">
          <span className="font-semibold">Location:</span> {store.address}
        </p>
      )}
      {store.hours && (
        <p className="text-sm">
          <span className="font-semibold">Hours:</span> {store.hours}
        </p>
      )}

      <Separator className="my-6" />

      <h2 className="mb-4 text-2xl font-semibold">Products</h2>
      {productsQuery.isLoading ? (
        <LoadingState rows={4} />
      ) : products.length === 0 ? (
        <EmptyState
          title="No products yet"
          message="This store has not listed any products yet."
        />
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((p) => (
            <Card key={p.id} className="overflow-hidden">
              <Link href={`/product/${p.id}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.images?.[0]?.url || "/placeholder.svg"}
                  alt={p.name}
                  className="h-40 w-full object-cover"
                />
              </Link>
              <CardContent className="p-4">
                <Link href={`/product/${p.id}`}>
                  <h3 className="font-semibold hover:underline">{p.name}</h3>
                </Link>
                <span className="font-bold">
                  {formatCurrency(Number(p.price))}
                </span>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Button
                  className="w-full"
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
