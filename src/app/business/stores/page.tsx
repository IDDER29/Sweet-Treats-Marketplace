import React from "react";
import {
  ThumbsUp,
  Clock,
  Bike,
  Award,
  Search,
  Plus,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function BakeryStorePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-sm breadcrumbs mb-4">
        <ul>
          <li>
            <a href="#">Sweetville</a>
          </li>
          <li>
            <a href="#">Bakeries</a>
          </li>
          <li>Sweet Delights Bakery</li>
        </ul>
      </div>

      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <img
              src="/placeholder.svg?height=80&width=80"
              alt="Sweet Delights Bakery Logo"
              className="w-20 h-20 rounded-full"
            />
            <div>
              <h1 className="text-3xl font-bold">Sweet Delights Bakery</h1>
              <p className="text-sm text-muted-foreground">
                Indulge in our handcrafted pastries and artisanal breads, baked
                fresh daily.
              </p>
            </div>
            <Button variant="outline" className="ml-auto">
              Translate
            </Button>
          </div>

          <Badge variant="secondary" className="mb-4">
            20% off selected items
          </Badge>

          <div className="flex gap-8 text-sm">
            <div className="flex items-center gap-2">
              <ThumbsUp className="w-5 h-5" />
              <span>95%</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              <span>20-30 min</span>
            </div>
            <div className="flex items-center gap-2">
              <Bike className="w-5 h-5" />
              <span>$2.50 delivery</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5" />
              <span>Premium</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-4 gap-8">
        <div className="col-span-1">
          <h2 className="text-lg font-semibold mb-4">Sections</h2>
          <ul className="space-y-2">
            <li>
              <a href="#promotions" className="text-primary hover:underline">
                Promotions
              </a>
            </li>
            <li>
              <a href="#top-sellers" className="hover:underline">
                Top sellers
              </a>
            </li>
            <li>
              <a href="#breads" className="hover:underline">
                Breads
              </a>
            </li>
            <li>
              <a href="#pastries" className="hover:underline">
                Pastries
              </a>
            </li>
            <li>
              <a href="#cakes" className="hover:underline">
                Cakes
              </a>
            </li>
            <li>
              <a href="#combo-deals" className="hover:underline">
                Combo Deals
              </a>
            </li>
          </ul>
        </div>

        <div className="col-span-3">
          <div className="mb-6">
            <Input
              type="search"
              placeholder="Search in Sweet Delights Bakery"
              className="w-full"
            />
          </div>

          <section id="promotions" className="mb-8">
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <img
                src="/placeholder.svg?height=24&width=24"
                alt=""
                className="w-6 h-6 mr-2"
              />
              Promotions
            </h2>
            <Card>
              <CardContent className="p-0">
                <div className="relative">
                  <img
                    src="/placeholder.svg?height=200&width=400"
                    alt="Assorted pastries"
                    className="w-full h-48 object-cover"
                  />
                  <Badge className="absolute top-2 left-2 bg-red-500 text-white">
                    -30%
                  </Badge>
                  <Button
                    size="icon"
                    className="absolute bottom-2 right-2 rounded-full"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold">
                    Family Box: 12 Assorted Pastries
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    A delightful mix of our best-selling pastries
                  </p>
                  <div className="mt-2">
                    <span className="text-lg font-bold">$24.99</span>
                    <span className="text-sm text-muted-foreground line-through ml-2">
                      $35.70
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          <section id="top-sellers" className="mb-8">
            <h2 className="text-2xl font-bold mb-4 flex items-center justify-between">
              <span className="flex items-center">
                <img
                  src="/placeholder.svg?height=24&width=24"
                  alt=""
                  className="w-6 h-6 mr-2"
                />
                Top sellers
              </span>
              <Button variant="ghost" size="sm">
                See all
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {[
                {
                  name: "Sourdough Bread",
                  price: "$5.99",
                  image: "/placeholder.svg?height=100&width=200",
                },
                {
                  name: "Chocolate Croissant",
                  price: "$3.50",
                  image: "/placeholder.svg?height=100&width=200",
                },
                {
                  name: "Cinnamon Roll",
                  price: "$4.25",
                  image: "/placeholder.svg?height=100&width=200",
                },
                {
                  name: "Blueberry Muffin",
                  price: "$2.75",
                  image: "/placeholder.svg?height=100&width=200",
                },
              ].map((product, index) => (
                <Card key={index}>
                  <CardContent className="p-4 flex items-center gap-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-20 h-20 object-cover rounded"
                    />
                    <div>
                      <h3 className="font-semibold">{product.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {product.price}
                      </p>
                    </div>
                    <Button size="icon" className="ml-auto rounded-full">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Additional sections (Breads, Pastries, etc.) would be added here, following a similar structure */}
        </div>
      </div>
    </div>
  );
}
