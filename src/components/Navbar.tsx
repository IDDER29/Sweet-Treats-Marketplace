import React from "react";
import Link from "next/link";
import { SearchIcon, ShoppingCartIcon, UserIcon } from "lucide-react";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <Link href="/" className="flex items-center space-x-2">
          <span className="font-bold text-xl">LocalEats</span>
        </Link>
        <nav className="flex items-center space-x-6 text-sm font-medium ml-auto">
          <Link href="/">Home</Link>
          <Link href="/products">Products</Link>
          <Link href="/about">About Us</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/login">
            <UserIcon className="h-5 w-5" />
          </Link>
          <Link href="/cart">
            <ShoppingCartIcon className="h-5 w-5" />
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
