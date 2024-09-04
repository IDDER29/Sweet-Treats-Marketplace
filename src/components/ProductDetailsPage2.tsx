import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, ShoppingCart, Heart } from "lucide-react";

export default function ProductDetailsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
            <img
              src="/placeholder.svg?height=600&width=600"
              alt="Main product image"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="aspect-square overflow-hidden rounded-lg bg-gray-100"
              >
                <img
                  src={`/placeholder.svg?height=150&width=150&text=Image${i}`}
                  alt={`Product image ${i}`}
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <h1 className="text-3xl font-bold">Artisanal Sourdough Bread</h1>
          <div className="flex items-center space-x-2">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className="w-5 h-5 fill-yellow-400 text-yellow-400"
                />
              ))}
            </div>
            <span className="text-sm text-gray-500">(128 reviews)</span>
          </div>
          <p className="text-3xl font-bold">$6.99</p>
          <p className="text-gray-600">
            Our signature artisanal sourdough bread, made with a 100-year-old
            starter and baked to perfection. Each loaf is hand-crafted and
            features a crispy crust and soft, tangy interior.
          </p>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <Button size="lg" className="flex-1">
                <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
              </Button>
              <Button size="lg" variant="outline">
                <Heart className="h-5 w-5" />
              </Button>
            </div>
            <Button size="lg" variant="outline" className="w-full">
              Buy Now
            </Button>
          </div>
        </div>
      </div>

      <Tabs defaultValue="description" className="mt-12">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="description">Description</TabsTrigger>
          <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
        </TabsList>
        <TabsContent value="description" className="mt-6">
          <Card>
            <CardContent className="prose max-w-none p-6">
              <h2>Product Description</h2>
              <p>
                Our Artisanal Sourdough Bread is the crown jewel of our bakery.
                Each loaf is lovingly crafted using traditional methods passed
                down through generations of master bakers.
              </p>
              <ul>
                <li>Made with a 100-year-old sourdough starter</li>
                <li>
                  Slow-fermented for 24 hours for maximum flavor development
                </li>
                <li>Baked in a stone hearth oven for the perfect crust</li>
                <li>
                  No additives or preservatives - just flour, water, and salt
                </li>
              </ul>
              <p>
                Perfect for sandwiches, toast, or simply enjoyed on its own with
                a pat of butter. Our sourdough bread stays fresh for up to 5
                days when stored properly.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="ingredients" className="mt-6">
          <Card>
            <CardContent className="prose max-w-none p-6">
              <h2>Ingredients</h2>
              <ul>
                <li>Organic wheat flour</li>
                <li>Water</li>
                <li>Sea salt</li>
                <li>Sourdough culture (wild yeast and bacteria)</li>
              </ul>
              <p>Contains: Wheat</p>
              <p>Made in a facility that also processes nuts and dairy.</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="reviews" className="mt-6">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>
              {[1, 2, 3].map((review) => (
                <div
                  key={review}
                  className="mb-4 pb-4 border-b last:border-b-0"
                >
                  <div className="flex items-center mb-2">
                    <div className="flex mr-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className="w-4 h-4 fill-yellow-400 text-yellow-400"
                        />
                      ))}
                    </div>
                    <span className="font-semibold">Delicious Bread!</span>
                  </div>
                  <p className="text-gray-600 mb-2">
                    This sourdough bread is amazing! The crust is perfectly
                    crispy and the inside is soft and flavorful. I'll definitely
                    be ordering more!
                  </p>
                  <span className="text-sm text-gray-500">
                    Jane D. - June 1, 2023
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
