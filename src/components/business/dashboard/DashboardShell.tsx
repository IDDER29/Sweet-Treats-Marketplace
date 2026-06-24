"use client";

import React, { useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import DashboardSidbar from "./DashboardSidbar";

interface DashboardShellProps {
  title: string;
  children: React.ReactNode;
}

export default function DashboardShell({ title, children }: DashboardShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      <DashboardSidbar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <main className="flex-1 overflow-y-auto bg-gray-100">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-6 flex items-center gap-4">
            <Button
              variant="outline"
              size="icon"
              className="lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>
            <h1 className="text-3xl font-bold">{title}</h1>
          </div>
          {children}
        </div>
      </main>
    </div>
  );
}
