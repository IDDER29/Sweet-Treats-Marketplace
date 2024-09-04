import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const featuredProducts = [
  {
    id: 1,
    name: "Chocolate Cake",
    description: "Rich and moist chocolate cake",
    price: "$25.99",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 2,
    name: "Strawberry Tart",
    description: "Fresh strawberries on a creamy base",
    price: "$18.99",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 3,
    name: "Macarons Set",
    description: "Assorted flavors of French macarons",
    price: "$15.99",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 4,
    name: "Cinnamon Rolls",
    description: "Soft and gooey cinnamon rolls",
    price: "$12.99",
    image: "/placeholder.svg?height=200&width=200",
  },
];

const FeaturedProductsSection = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">
          Featured Products
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product) => (
            <Card key={product.id} className="overflow-hidden">
              <Image
                src={product.image}
                alt={product.name}
                width={200}
                height={200}
                className="w-full h-48 object-cover"
              />
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                <p className="text-muted-foreground mb-2">
                  {product.description}
                </p>
                <div className="flex justify-between items-center">
                  <span className="font-bold">{product.price}</span>
                  <Button size="sm">Add to Cart</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProductsSection;
