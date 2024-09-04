"use client";
import React, { useState } from "react";
import { BarChart, Truck, Package, Home, Settings, X } from "lucide-react";
import { Button } from "@/components/ui/button";

import { ScrollArea } from "@/components/ui/scroll-area";

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
            <a href="/dashboard">
              <Home className="mr-2 h-4 w-4" />
              Dashboard
            </a>
          </Button>
          <Button variant="ghost" className="w-full justify-start" asChild>
            <a href="/dashboard/sales">
              <BarChart className="mr-2 h-4 w-4" />
              Sales
            </a>
          </Button>
          <Button variant="ghost" className="w-full justify-start" asChild>
            <a href="/dashboard/delivery">
              <Truck className="mr-2 h-4 w-4" />
              Delivery
            </a>
          </Button>
          <Button variant="ghost" className="w-full justify-start" asChild>
            <a href="/dashboard/products">
              <Package className="mr-2 h-4 w-4" />
              Products
            </a>
          </Button>
          <Button variant="ghost" className="w-full justify-start" asChild>
            <a href="/dashboard/settings">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </a>
          </Button>
        </nav>
      </ScrollArea>
    </aside>
  );
};

export default Sidebar;
