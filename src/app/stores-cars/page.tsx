"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  ThumbsUp,
  Clock,
  Bike,
  ShoppingBag,
  Plus,
  Minus,
  X,
} from "lucide-react";
import Image from "next/image";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

export default function StoreCart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { id: 1, name: "Croissant", price: 2.5, quantity: 2 },
    { id: 2, name: "Baguette", price: 3.0, quantity: 1 },
    { id: 3, name: "Éclair", price: 2.75, quantity: 3 },
  ]);

  const updateQuantity = (id: number, newQuantity: number) => {
    setCartItems((items) =>
      items
        .map((item) =>
          item.id === id
            ? { ...item, quantity: Math.max(0, newQuantity) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const deliveryFee = 2.5;
  const total = subtotal + deliveryFee;

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader className="pb-3">
        <div className="flex items-center space-x-4">
          <Image
            src="/placeholder.svg"
            alt="Store logo"
            width={64}
            height={64}
            className="rounded-full"
          />
          <div>
            <CardTitle className="text-xl">monquotidien Café</CardTitle>
            <p className="text-sm text-muted-foreground">Bakery and Pastry</p>
          </div>
        </div>
        <div className="flex items-center mt-2 text-sm">
          <ThumbsUp className="w-4 h-4 mr-1 text-blue-500" />
          <span className="font-medium mr-4">94% (500+)</span>
          <Clock className="w-4 h-4 mr-1" />
          <span className="mr-4">25-35 min</span>
          <Bike className="w-4 h-4 mr-1" />
          <span>15,00MAD</span>
        </div>
      </CardHeader>
      <CardContent>
        <h3 className="font-semibold mb-2 flex items-center">
          <ShoppingBag className="w-5 h-5 mr-2" />
          Your Order
        </h3>
        {cartItems.map((item) => (
          <div key={item.id} className="flex items-center justify-between py-2">
            <div className="flex items-center">
              <Input
                type="number"
                value={item.quantity}
                onChange={(e) =>
                  updateQuantity(item.id, parseInt(e.target.value))
                }
                className="w-16 mr-2"
              />
              <span>{item.name}</span>
            </div>
            <div className="flex items-center">
              <span className="mr-2">
                {(item.price * item.quantity).toFixed(2)} MAD
              </span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
              >
                <Plus className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => updateQuantity(item.id, 0)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
        <Separator className="my-4" />
        <div className="space-y-1.5">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>{subtotal.toFixed(2)} MAD</span>
          </div>
          <div className="flex justify-between">
            <span>Delivery Fee</span>
            <span>{deliveryFee.toFixed(2)} MAD</span>
          </div>
          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span>{total.toFixed(2)} MAD</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">
          Checkout ({totalItems} {totalItems === 1 ? "item" : "items"})
        </Button>
      </CardFooter>
    </Card>
  );
}
