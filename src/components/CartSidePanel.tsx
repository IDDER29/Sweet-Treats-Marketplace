"use client"; // Ensure this is a client-side component

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { ShoppingCart, X, Plus, Minus, Trash2 } from "lucide-react";
import { useCart } from "@/context/CartContext"; // Import your CartContext

export default function CartSidePanel() {
  const { cartState, toggleCart, addToCart, removeFromCart } = useCart();
  const { cart, isCartOpen } = cartState;

  return (
    <div
      className={`fixed inset-y-0 right-0 w-full sm:w-96 bg-background shadow-xl transform ${
        isCartOpen ? "translate-x-0" : "translate-x-full"
      } transition-transform duration-300 ease-in-out z-50`}
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Your Cart</h2>
          <Button variant="ghost" size="icon" onClick={toggleCart}>
            <X className="h-6 w-6" />
          </Button>
        </div>

        {/* Cart Items Section */}
        <ScrollArea className="flex-1 p-4">
          {cart.length > 0 ? (
            cart.map((item) => (
              <div key={item.id} className="flex items-center space-x-4 mb-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 rounded-md object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-sm text-gray-500">
                    ${Number(item.price).toFixed(2)}
                  </p>
                  <div className="flex items-center mt-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() =>
                        addToCart({ ...item, quantity: item.quantity - 1 })
                      }
                      disabled={item.quantity <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <Input
                      type="number"
                      value={item.quantity}
                      className="w-12 mx-2 text-center"
                      readOnly
                      min="1"
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() =>
                        addToCart({ ...item, quantity: item.quantity + 1 })
                      }
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="ml-2"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">Your cart is empty</p>
          )}
        </ScrollArea>

        {/* Subtotal and Checkout Section */}
        <div className="p-4 border-t">
          <div className="flex justify-between mb-2">
            <span>Subtotal:</span>
            <span>
              $
              {cart
                .reduce((total, item) => total + item.price * item.quantity, 0)
                .toFixed(2)}
            </span>
          </div>
          <Separator className="my-4" />
          <Button className="w-full">
            <ShoppingCart className="mr-2 h-4 w-4" /> Proceed to Checkout
          </Button>
        </div>
      </div>
    </div>
  );
}
