"use client";
import Link from "next/link";
import React from "react";
import { ShoppingCartIcon } from "lucide-react";
import { useCart } from "@/context/CartContext";

const ShopingIcon = () => {
  const { cartState, toggleCart } = useCart();

  // Calculate the total number of items in the cart
  const cartCount = cartState.cart.reduce(
    (acc: number, item: any) => acc + item.quantity,
    0
  );

  // Handle cart click to toggle cart's visibility
  const handleCartClick = () => {
    toggleCart();
  };

  return (
    <>
      <div className="relative" onClick={handleCartClick}>
        <ShoppingCartIcon className="h-5 w-5" />
        {/* Display the cart count as a badge */}
        {cartCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full text-xs px-1.5 py-0.5">
            {cartCount}
          </span>
        )}
      </div>
    </>
  );
};

export default ShopingIcon;
