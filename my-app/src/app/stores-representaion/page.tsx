import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ThumbsUp, Clock, Bike } from "lucide-react";
import Image from "next/image";

interface PastryShop {
  id: string;
  name: string;
  image: string;
  category: string;
  rating: number;
  reviewCount: number;
  deliveryTime: string;
  deliveryFee: string;
  promo?: string;
}

const pastryShops: PastryShop[] = [
  {
    id: "1",
    name: "Carrefour Market",
    image: "/placeholder.svg",
    category: "Supermarket",
    rating: 89,
    reviewCount: 500,
    deliveryTime: "15-25 min",
    deliveryFee: "14,00MAD",
    promo: "some items",
  },
  {
    id: "2",
    name: "La Petite Boulangerie",
    image: "/placeholder.svg",
    category: "Bakery",
    rating: 95,
    reviewCount: 320,
    deliveryTime: "20-30 min",
    deliveryFee: "12,00MAD",
  },
  {
    id: "3",
    name: "Sweet Delights Patisserie",
    image: "/placeholder.svg",
    category: "Pastry Shop",
    rating: 92,
    reviewCount: 450,
    deliveryTime: "25-35 min",
    deliveryFee: "15,00MAD",
    promo: "10% off on cakes",
  },
];

export default function NearbyPastryShops() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Nearby Pastry Shops</h2>
      {pastryShops.map((shop) => (
        <Card key={shop.id} className="overflow-hidden">
          <CardContent className="p-0">
            <div className="relative">
              <Image
                src={shop.image}
                alt={shop.name}
                width={400}
                height={200}
                className="w-full h-48 object-cover"
              />
              {shop.promo && (
                <Badge
                  variant="secondary"
                  className="absolute top-2 left-2 bg-yellow-400 text-yellow-900"
                >
                  Promo: {shop.promo}
                </Badge>
              )}
              <Badge
                variant="secondary"
                className="absolute bottom-2 right-2 bg-white text-black"
              >
                <ThumbsUp className="w-4 h-4 mr-1 inline" />
                {shop.rating}% ({shop.reviewCount}+)
              </Badge>
            </div>
            <div className="p-4">
              <h3 className="font-bold text-lg">{shop.name}</h3>
              <p className="text-sm text-muted-foreground">{shop.category}</p>
              <div className="flex items-center mt-2 text-sm">
                <Clock className="w-4 h-4 mr-1" />
                <span className="mr-4">{shop.deliveryTime}</span>
                <Bike className="w-4 h-4 mr-1" />
                <span>{shop.deliveryFee}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
