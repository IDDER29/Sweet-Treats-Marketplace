"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { ShoppingCartIcon, UserIcon } from "lucide-react";

const ShopingIcon = () => {
  const [cartCount, setCartCount] = useState<number>(0);

  useEffect(() => {
    // Get the cart from localStorage and calculate the total number of items
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      const cartItems = JSON.parse(savedCart);
      const totalItems = cartItems.reduce(
        (acc: number, item: any) => acc + item.quantity,
        0
      );
      setCartCount(totalItems);
    }
  }, []);
  return (
    <>
      <Link href="/cart" className="relative">
        <ShoppingCartIcon className="h-5 w-5" />
        {/* Display the cart count as a badge */}
        {cartCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full text-xs px-1.5 py-0.5">
            {cartCount}
          </span>
        )}
      </Link>
    </>
  );
};

export default ShopingIcon;
