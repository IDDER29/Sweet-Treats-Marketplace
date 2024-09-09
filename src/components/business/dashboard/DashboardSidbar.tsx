"use client";
import React, { useState } from "react";
import { BarChart, Truck, Package, Home, Settings, X } from "lucide-react";
import { Button } from "@/components/ui/button";

import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";

const Sidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <aside
      className={`${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      } fixed inset-y-0 left-0 z-50 w-64 bg-gray-800 text-white transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}
    >
      <div className="flex items-center justify-between p-4">
        <h1 className="text-2xl font-bold">Sweet Delights</h1>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setSidebarOpen(false)}
          className="lg:hidden"
        >
          <X className="h-6 w-6" />
        </Button>
      </div>
      <ScrollArea className="flex-grow">
        <nav className="space-y-2 p-4">
          <Button variant="ghost" className="w-full justify-start" asChild>
            <Link href="/business/dashboard">
              <Home className="mr-2 h-4 w-4" />
              Dashboard
            </Link>
          </Button>
          <Button variant="ghost" className="w-full justify-start" asChild>
            <Link href="/business/dashboard/sales">
              <BarChart className="mr-2 h-4 w-4" />
              Sales
            </Link>
          </Button>
          <Button variant="ghost" className="w-full justify-start" asChild>
            <Link href="/business/dashboard/delivery">
              <Truck className="mr-2 h-4 w-4" />
              Delivery
            </Link>
          </Button>
          <Button variant="ghost" className="w-full justify-start" asChild>
            <Link href="/business/dashboard/products">
              <Package className="mr-2 h-4 w-4" />
              Products
            </Link>
          </Button>
          <Button variant="ghost" className="w-full justify-start" asChild>
            <Link href="/business/settings">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Link>
          </Button>
        </nav>
      </ScrollArea>
    </aside>
  );
};

export default Sidebar;
