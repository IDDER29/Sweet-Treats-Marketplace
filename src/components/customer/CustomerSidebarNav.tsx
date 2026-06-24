"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { User, Package, Heart, MapPin, Bell, Star, CreditCard, Gift } from "lucide-react";

const NAV_LINKS = [
  { href: "/customer/profile", label: "Profile", icon: User },
  { href: "/customer/orders", label: "My Orders", icon: Package },
  { href: "/customer/wishlist", label: "Wishlist", icon: Heart },
  { href: "/customer/addresses", label: "Addresses", icon: MapPin },
  { href: "/customer/notifications", label: "Notifications", icon: Bell },
  { href: "/customer/reviews", label: "My Reviews", icon: Star },
  { href: "/customer/payment-methods", label: "Payment Methods", icon: CreditCard },
  { href: "/customer/loyalty", label: "Rewards", icon: Gift },
];

export default function CustomerSidebarNav() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-0.5">
      {NAV_LINKS.map(({ href, label, icon: Icon }) => {
        const isActive = pathname === href || pathname.startsWith(href + "/");
        return (
          <Link
            key={href}
            href={href}
            className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
              isActive
                ? "bg-amber-50 text-amber-600"
                : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
            }`}
          >
            <Icon
              className={`h-4 w-4 shrink-0 ${
                isActive ? "text-amber-600" : "text-gray-400"
              }`}
            />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
