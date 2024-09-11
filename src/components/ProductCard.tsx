"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ProductCard({ product }) {
  const renderStars = (rating) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${
            i < Math.floor(rating)
              ? "text-yellow-400 fill-yellow-400"
              : "text-gray-300"
          }`}
        />
      ));
  };

  return (
    <Card className="overflow-hidden transition-shadow hover:shadow-lg">
      <CardHeader className="p-0">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
      </CardHeader>
      <CardContent className="p-4">
        <CardTitle className="text-xl mb-2">{product.name}</CardTitle>
        <p className="text-sm text-gray-600 mb-2">{product.description}</p>
        <div className="flex justify-between items-center mb-2">
          <span className="font-bold text-lg">${product.price.toFixed(2)}</span>
          <div className="flex">{renderStars(product.rating)}</div>
        </div>
        <div className="flex space-x-2">
          {product.dietary.includes("gluten-free") && (
            <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
              Gluten-free
            </span>
          )}
          {product.dietary.includes("vegan") && (
            <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded">
              Vegan
            </span>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Add to Cart</Button>
      </CardFooter>
    </Card>
  );
}
