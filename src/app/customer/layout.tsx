import type { ReactNode } from "react";
import CustomerSidebarNav from "@/components/customer/CustomerSidebarNav";

export default function CustomerLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="flex gap-8">
          <aside className="hidden lg:block w-56 shrink-0">
            <div className="sticky top-8">
              <h2 className="px-3 mb-4 text-xs font-semibold uppercase tracking-widest text-gray-400">
                My Account
              </h2>
              <CustomerSidebarNav />
            </div>
          </aside>

          <main className="flex-1 min-w-0">{children}</main>
        </div>
      </div>
    </div>
  );
}
