import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Plus } from "lucide-react";
import Image from "next/image";

export default function ProductCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Bacon Pupcake Card */}
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <Image
            src="/placeholder.svg"
            alt="Bacon Pupcake"
            width={300}
            height={200}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg">Bacon Pupcake</CardTitle>
              <span className="font-bold">$4.00</span>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Grain free flour, bacon, Cheddar egg, non fat milk, baking powder,
              and topped with whipped cream cheese.
            </p>
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <Button variant="outline" className="w-full">
            <Plus className="h-4 w-4 mr-2" /> Add to Cart
          </Button>
        </CardFooter>
      </Card>

      {/* Bagged Treat Card */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center space-x-4">
            <Image
              src="/placeholder.svg"
              alt="Bagged Treat"
              width={100}
              height={100}
              className="rounded-md"
            />
            <div>
              <CardTitle className="text-lg">
                Bagged Treat: Cattledog Cookie Company
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Choices: pb bacon bones or pawperroni bones.
              </p>
              <p className="font-bold mt-2">$15.00</p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <Button variant="outline" className="w-full">
            <Plus className="h-4 w-4 mr-2" /> Add to Cart
          </Button>
        </CardFooter>
      </Card>

      {/* High Street Pizza & Pour House Card */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center space-x-4">
            <Image
              src="/placeholder.svg"
              alt="High Street Pizza"
              width={100}
              height={100}
              className="rounded-md"
            />
            <div>
              <CardTitle className="text-lg">
                1. High Street Pizza & Pour House
              </CardTitle>
              <div className="flex items-center mt-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < 4 ? "text-yellow-400 fill-current" : "text-gray-300"
                    }`}
                  />
                ))}
                <span className="ml-2 text-sm text-muted-foreground">
                  4.6 (164 reviews)
                </span>
              </div>
              <div className="flex items-center space-x-2 mt-2">
                <Badge variant="secondary">Pizza</Badge>
                <Badge variant="secondary">Wine Bars</Badge>
                <Badge variant="secondary">Cocktail Bars</Badge>
                <Badge variant="secondary">$$</Badge>
              </div>
              <p className="text-sm text-green-600 mt-2">Open until 10:00 PM</p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <Button className="w-full">Find a Table</Button>
        </CardFooter>
      </Card>

      {/* Macrina Bakery Card */}
      <Card>
        <CardContent className="p-0">
          <Image
            src="/placeholder.svg"
            alt="Macrina Bakery"
            width={300}
            height={200}
            className="w-full h-48 object-cover rounded-t-lg"
          />
          <div className="p-4">
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg">Macrina Bakery</CardTitle>
              <Badge variant="secondary" className="font-bold">
                $0 delivery fee
              </Badge>
            </div>
            <div className="flex items-center mt-2">
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <span className="ml-1 text-sm">4.8 (2k+) • 0.9 mi • 21 min</span>
            </div>
            <p className="text-sm text-muted-foreground mt-2">Popular Items</p>
          </div>
        </CardContent>
      </Card>

      {/* Simple Bacon Pupcake Card */}
      <Card className="overflow-hidden">
        <CardContent className="p-0 relative">
          <Image
            src="/placeholder.svg"
            alt="Bacon Pupcake"
            width={300}
            height={200}
            className="w-full h-48 object-cover"
          />
          <Button
            size="icon"
            variant="secondary"
            className="absolute top-2 right-2 rounded-full"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </CardContent>
        <CardFooter className="p-4">
          <div>
            <CardTitle className="text-lg">Bacon Pupcake</CardTitle>
            <p className="font-bold mt-1">$4.00</p>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
