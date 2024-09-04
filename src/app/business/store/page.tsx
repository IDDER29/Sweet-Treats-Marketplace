import React from "react";
import {
  Star,
  ShoppingCart,
  Facebook,
  Instagram,
  Twitter,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function BakeryStorePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Store Information */}
        <div>
          <h1 className="text-3xl font-bold mb-2">Sweet Delights Bakery</h1>
          <div className="flex items-center mb-4">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className="w-5 h-5 fill-yellow-400 text-yellow-400"
                />
              ))}
            </div>
            <span className="ml-2 text-sm text-gray-600">(128 reviews)</span>
          </div>
          <p className="text-gray-600 mb-4">
            Indulge in our handcrafted pastries and artisanal breads, baked
            fresh daily with the finest ingredients.
          </p>
          <div className="mb-4">
            <h2 className="font-semibold mb-2">Location</h2>
            <p>123 Bakery Lane, Sweetville, CA 90210</p>
          </div>
          <div className="mb-4">
            <h2 className="font-semibold mb-2">Hours</h2>
            <p>Mon-Fri: 7AM - 7PM</p>
            <p>Sat-Sun: 8AM - 6PM</p>
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

        {/* Store Image Carousel */}
        <div className="relative overflow-hidden rounded-lg">
          <div className="aspect-w-16 aspect-h-9">
            <img
              src="/placeholder.svg?height=400&width=800"
              alt="Sweet Delights Bakery"
              className="object-cover"
            />
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
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="all">All Products</TabsTrigger>
          <TabsTrigger value="bread">Bread</TabsTrigger>
          <TabsTrigger value="pastries">Pastries</TabsTrigger>
          <TabsTrigger value="cakes">Cakes</TabsTrigger>
          <TabsTrigger value="cookies">Cookies</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="space-y-4">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                name: "Sourdough Bread",
                price: "$5.99",
                category: "Bread",
                image: "/placeholder.svg?height=200&width=200",
              },
              {
                name: "Chocolate Croissant",
                price: "$3.50",
                category: "Pastries",
                image: "/placeholder.svg?height=200&width=200",
              },
              {
                name: "Red Velvet Cake",
                price: "$28.99",
                category: "Cakes",
                image: "/placeholder.svg?height=200&width=200",
              },
              {
                name: "Chocolate Chip Cookies",
                price: "$1.50",
                category: "Cookies",
                image: "/placeholder.svg?height=200&width=200",
              },
              {
                name: "Baguette",
                price: "$3.99",
                category: "Bread",
                image: "/placeholder.svg?height=200&width=200",
              },
              {
                name: "Apple Turnover",
                price: "$2.99",
                category: "Pastries",
                image: "/placeholder.svg?height=200&width=200",
              },
              {
                name: "Carrot Cake",
                price: "$24.99",
                category: "Cakes",
                image: "/placeholder.svg?height=200&width=200",
              },
              {
                name: "Oatmeal Raisin Cookies",
                price: "$1.50",
                category: "Cookies",
                image: "/placeholder.svg?height=200&width=200",
              },
            ].map((product, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-md mb-4"
                  />
                  <h3 className="font-semibold mb-1">{product.name}</h3>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">
                      {product.price}
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
        </TabsContent>
        {/* Add similar TabsContent for other categories */}
      </Tabs>

      <Separator className="my-8" />

      {/* Customer Reviews */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((review) => (
            <Card key={review}>
              <CardContent className="p-4">
                <div className="flex items-center mb-2">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className="w-4 h-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-gray-600">5.0</span>
                </div>
                <p className="text-sm mb-2">
                  "Absolutely delicious! The croissants are perfectly flaky and
                  the sourdough bread is to die for. This is now my go-to
                  bakery!"
                </p>
                <p className="text-sm font-semibold">- Happy Customer</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="text-center mt-6">
          <Button variant="outline">Read More Reviews</Button>
        </div>
      </section>
    </div>
  );
}
