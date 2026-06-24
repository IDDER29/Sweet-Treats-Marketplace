"use client";
import React from "react";
import {
  BarChart,
  Truck,
  Package,
  Home,
  Settings,
  ShoppingBag,
  X,
  Star,
  Tag,
  Users,
  Boxes,
  MessageSquare,
  Store,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";
import { APP_CONFIG } from "@/config";

interface DashboardSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const NAV_SECTIONS = [
  {
    label: "Overview",
    items: [
      { href: "/business/dashboard", icon: Home, label: "Dashboard" },
      { href: "/business/dashboard/sales", icon: BarChart, label: "Sales" },
    ],
  },
  {
    label: "Catalogue",
    items: [
      { href: "/business/dashboard/products", icon: Package, label: "Products" },
      { href: "/business/dashboard/inventory", icon: Boxes, label: "Inventory" },
    ],
  },
  {
    label: "Customers",
    items: [
      { href: "/business/dashboard/orders", icon: ShoppingBag, label: "Orders" },
      { href: "/business/dashboard/reviews", icon: Star, label: "Reviews" },
      { href: "/business/dashboard/messages", icon: MessageSquare, label: "Messages" },
      { href: "/business/dashboard/customers", icon: Users, label: "Customers" },
    ],
  },
  {
    label: "Growth",
    items: [
      { href: "/business/dashboard/promotions", icon: Tag, label: "Promotions" },
      { href: "/business/dashboard/delivery", icon: Truck, label: "Delivery" },
    ],
  },
  {
    label: "Store",
    items: [
      { href: "/business/store", icon: Store, label: "My Store" },
      { href: "/business/settings", icon: Settings, label: "Settings" },
    ],
  },
];

const Sidebar = ({ isOpen = false, onClose = () => {} }: DashboardSidebarProps) => {
  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={onClose}
        />
      )}
      <aside
        className={`${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-gray-900 text-white transition-transform duration-300 ease-in-out lg:static lg:translate-x-0`}
      >
        <div className="flex items-center justify-between border-b border-white/10 p-4">
          <Link href="/" className="text-lg font-bold text-white">
            {APP_CONFIG.name.replace(" Marketplace", "")}
          </Link>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-white hover:bg-white/10 lg:hidden"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
        <ScrollArea className="flex-1 px-3 py-4">
          <nav className="space-y-5">
            {NAV_SECTIONS.map(({ label, items }) => (
              <div key={label}>
                <p className="px-3 mb-1 text-[10px] font-semibold uppercase tracking-widest text-white/40">
                  {label}
                </p>
                <div className="space-y-0.5">
                  {items.map(({ href, icon: Icon, label: itemLabel }) => (
                    <Button
                      key={href}
                      variant="ghost"
                      className="w-full justify-start text-white/80 hover:bg-white/10 hover:text-white h-9"
                      asChild
                    >
                      <Link href={href}>
                        <Icon className="mr-3 h-4 w-4 shrink-0" />
                        {itemLabel}
                      </Link>
                    </Button>
                  ))}
                </div>
              </div>
            ))}
          </nav>
        </ScrollArea>
      </aside>
    </>
  );
};

export default Sidebar;
