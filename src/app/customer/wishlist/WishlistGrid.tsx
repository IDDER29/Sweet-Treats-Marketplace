"use client";

import Link from "next/link";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { Heart, ShoppingCart } from "lucide-react";

import { getWishlist, removeFromWishlist } from "@/services/wishlist";
import type { ID, Product } from "@/types";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { formatCurrency } from "@/lib/currency";
import { LoadingState } from "@/components/feedback/LoadingState";
import { ErrorState } from "@/components/feedback/ErrorState";

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
      <div className="flex flex-col items-center gap-5 py-20 text-center">
        <div className="rounded-full bg-rose-50 p-6">
          <Heart className="h-12 w-12 text-rose-300" />
        </div>
        <div className="space-y-1">
          <h3 className="text-lg font-semibold text-gray-800">
            Start saving your favourites!
          </h3>
          <p className="text-sm text-muted-foreground max-w-xs">
            Tap the heart on any product to save it here and order it later.
          </p>
        </div>
        <Button asChild className="bg-amber-600 hover:bg-amber-700 text-white">
          <Link href="/products">Browse Products</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with count */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">
          My Wishlist{" "}
          <span className="text-amber-600">({products.length} items)</span>
        </h2>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => {
          const image = productImage(product);
          const isRemoving =
            removeMutation.isPending &&
            removeMutation.variables === product.id;

          return (
            <Card
              key={product.id}
              className="flex flex-col overflow-hidden group hover:shadow-md transition-shadow duration-200"
            >
              {/* Product image */}
              <Link
                href={`/product/${product.id}`}
                className="block aspect-square w-full overflow-hidden bg-amber-50 relative"
              >
                {image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={image}
                    alt={product.name}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    <Heart className="h-10 w-10 text-amber-200" />
                  </div>
                )}
              </Link>

              {/* Product info */}
              <CardContent className="flex-1 p-3 space-y-1">
                <Link
                  href={`/product/${product.id}`}
                  className="line-clamp-2 text-sm font-semibold text-gray-800 hover:text-amber-700 leading-snug"
                >
                  {product.name}
                </Link>
                {product.category && (
                  <p className="text-xs text-muted-foreground truncate">
                    {product.category}
                  </p>
                )}
                <p className="text-sm font-bold text-amber-800">
                  {formatCurrency(product.price)}
                </p>
              </CardContent>

              {/* Action buttons */}
              <CardFooter className="flex gap-2 p-3 pt-0">
                <Button
                  size="sm"
                  className="flex-1 bg-amber-600 hover:bg-amber-700 text-white text-xs h-8"
                  onClick={() => handleAddToCart(product)}
                >
                  <ShoppingCart className="mr-1.5 h-3.5 w-3.5" />
                  Add to cart
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label={`Remove ${product.name} from wishlist`}
                  disabled={isRemoving}
                  onClick={() => removeMutation.mutate(product.id)}
                  className="h-8 w-8 text-gray-400 hover:text-rose-500 hover:bg-rose-50 shrink-0"
                >
                  <Heart
                    className={`h-4 w-4 ${isRemoving ? "opacity-50" : "fill-rose-400 text-rose-400"}`}
                  />
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
