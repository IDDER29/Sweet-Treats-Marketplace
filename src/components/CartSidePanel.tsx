"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { ShoppingCart, X, Plus, Minus, Trash2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatCurrency } from "@/lib/currency";
import { useRouter } from "next/navigation";

export default function CartSidePanel() {
  const router = useRouter();
  const { cartState, toggleCart, updateQuantity, removeFromCart } = useCart();
  const { cart, isCartOpen } = cartState;

  const subtotal = cart.reduce(
    (total, item) => total + (item.price ?? 0) * item.quantity,
    0
  );

  return (
    <>
      {/* Backdrop */}
      {isCartOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40"
          onClick={toggleCart}
        />
      )}

      <div
        className={`fixed inset-y-0 right-0 z-50 flex w-full flex-col bg-background shadow-xl transition-transform duration-300 ease-in-out sm:w-96 ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b p-4">
          <h2 className="text-lg font-semibold">Your Cart</h2>
          <Button variant="ghost" size="icon" onClick={toggleCart}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <ScrollArea className="flex-1 p-4">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center text-muted-foreground">
              <ShoppingCart className="mb-4 h-12 w-12 opacity-30" />
              <p>Your cart is empty</p>
            </div>
          ) : (
            <ul className="space-y-4">
              {cart.map((item) => (
                <li key={item.id} className="flex items-start gap-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.name || "Product"}
                    className="h-16 w-16 flex-shrink-0 rounded-md object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold">
                      {item.name || "Product"}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {formatCurrency(item.price ?? 0)}
                    </p>
                    <div className="mt-2 flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-6 text-center text-sm">
                        {item.quantity}
                      </span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="ml-auto h-7 w-7 text-muted-foreground hover:text-destructive"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </ScrollArea>

        <div className="border-t p-4 space-y-4">
          <div className="flex justify-between font-semibold">
            <span>Subtotal</span>
            <span>{formatCurrency(subtotal)}</span>
          </div>
          <Separator />
          <Button
            className="w-full"
            disabled={cart.length === 0}
            onClick={() => {
              toggleCart();
              router.push("/cart/checkout");
            }}
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            Proceed to Checkout
          </Button>
          <Button
            variant="outline"
            className="w-full"
            onClick={() => {
              toggleCart();
              router.push("/cart");
            }}
          >
            View full cart
          </Button>
        </div>
      </div>
    </>
  );
}
