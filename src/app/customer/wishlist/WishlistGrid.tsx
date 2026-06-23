"use client";

import Link from "next/link";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { Heart, ShoppingCart, Trash2 } from "lucide-react";

import { getWishlist, removeFromWishlist } from "@/services/wishlist";
import type { ID, Product } from "@/types";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { formatCurrency } from "@/lib/currency";
import { LoadingState } from "@/components/feedback/LoadingState";
import { ErrorState } from "@/components/feedback/ErrorState";
import { EmptyState } from "@/components/feedback/EmptyState";

function productImage(product: Product): string | undefined {
  return product.images?.[0]?.url;
}

export default function WishlistGrid() {
  const queryClient = useQueryClient();
  const { addToCart } = useCart();

  const {
    data: products,
    isLoading,
    isError,
    refetch,
  } = useQuery<Product[]>({
    queryKey: ["wishlist"],
    queryFn: getWishlist,
  });

  const removeMutation = useMutation<Product[], Error, ID>({
    mutationFn: (productId) => removeFromWishlist(productId),
    onSuccess: (updated) => {
      queryClient.setQueryData(["wishlist"], updated);
      toast.success("Removed from wishlist.");
    },
    onError: () => {
      toast.error("Couldn't remove this item. Please try again.");
    },
  });

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id,
      quantity: 1,
      name: product.name,
      price: product.price,
      image: productImage(product),
    });
    toast.success(`${product.name} added to cart.`);
  };

  if (isLoading) {
    return <LoadingState rows={4} />;
  }

  if (isError) {
    return (
      <ErrorState
        title="Couldn't load your wishlist"
        onRetry={() => {
          void refetch();
        }}
      />
    );
  }

  if (!products || products.length === 0) {
    return (
      <EmptyState
        icon={<Heart className="h-10 w-10" />}
        title="Your wishlist is empty"
        message="Save treats you love and find them here later."
        actionLabel="Browse products"
        actionHref="/products"
      />
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => {
        const image = productImage(product);
        return (
          <Card key={product.id} className="flex flex-col overflow-hidden">
            <Link
              href={`/product/${product.id}`}
              className="block aspect-square w-full overflow-hidden bg-muted"
            >
              {image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={image}
                  alt={product.name}
                  className="h-full w-full object-cover transition-transform hover:scale-105"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                  No image
                </div>
              )}
            </Link>

            <CardContent className="flex-1 space-y-1 p-4">
              <Link
                href={`/product/${product.id}`}
                className="line-clamp-2 font-semibold hover:underline"
              >
                {product.name}
              </Link>
              <p className="text-sm text-muted-foreground">
                {product.category}
              </p>
              <p className="font-semibold">{formatCurrency(product.price)}</p>
            </CardContent>

            <CardFooter className="flex gap-2 p-4 pt-0">
              <Button
                className="flex-1"
                onClick={() => handleAddToCart(product)}
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                Add to cart
              </Button>
              <Button
                variant="outline"
                size="icon"
                aria-label={`Remove ${product.name} from wishlist`}
                disabled={
                  removeMutation.isPending &&
                  removeMutation.variables === product.id
                }
                onClick={() => removeMutation.mutate(product.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}
