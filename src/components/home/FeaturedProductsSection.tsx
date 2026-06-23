"use client";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getAllProducts } from "@/utils/api";
import { useCart } from "@/context/CartContext";
import { formatCurrency } from "@/lib/currency";
import { LoadingState } from "@/components/feedback/LoadingState";
import type { Product } from "@/types";

const FeaturedProductsSection = () => {
  const { addToCart } = useCart();
  const { data, isLoading } = useQuery<Product[]>({
    queryKey: ["featured-products"],
    queryFn: () => getAllProducts(),
  });

  const products = (data ?? []).slice(0, 4);

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">
          Featured Products
        </h2>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {Array.from({ length: 4 }).map((_, i) => (
              <LoadingState key={i} rows={3} />
            ))}
          </div>
        ) : products.length === 0 ? (
          <p className="text-center text-muted-foreground">
            Featured products will appear here soon.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <Card key={product.id} className="overflow-hidden">
                <Link href={`/product/${product.id}`}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={product.images?.[0]?.url || "/placeholder.svg"}
                    alt={product.name}
                    width={200}
                    height={200}
                    className="w-full h-48 object-cover"
                  />
                </Link>
                <CardContent className="p-4">
                  <Link href={`/product/${product.id}`}>
                    <h3 className="font-semibold text-lg mb-2 hover:underline">
                      {product.name}
                    </h3>
                  </Link>
                  <p className="text-muted-foreground mb-2 line-clamp-2">
                    {product.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="font-bold">
                      {formatCurrency(Number(product.price))}
                    </span>
                    <Button
                      size="sm"
                      onClick={() => {
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
                      Add to Cart
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedProductsSection;
