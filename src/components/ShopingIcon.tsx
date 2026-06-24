"use client";
import React from "react";
import { ShoppingCartIcon } from "lucide-react";
import { useCart } from "@/context/CartContext";
import type { CartItem } from "@/context/CartContext";

const ShopingIcon = () => {
  const { cartState, toggleCart } = useCart();

  const cartCount = cartState.cart.reduce(
    (acc: number, item: CartItem) => acc + item.quantity,
    0
  );

  return (
    <button
      type="button"
      onClick={toggleCart}
      aria-label={`Shopping cart${cartCount > 0 ? `, ${cartCount} item${cartCount !== 1 ? "s" : ""}` : ""}`}
      className="relative"
    >
      <ShoppingCartIcon className="h-5 w-5" />
      {cartCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full text-xs px-1.5 py-0.5">
          {cartCount}
        </span>
      )}
    </button>
  );
};

export default ShopingIcon;
