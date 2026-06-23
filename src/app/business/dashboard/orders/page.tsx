import React from "react";
import DashboardSidbar from "@/components/business/dashboard/DashboardSidbar";
import { requireRole } from "@/lib/auth-helpers";
import OrdersClient from "./OrdersClient";

// Seller's store orders. Data fetched client-side (React Query) so the
// status filter / search can filter the list and loading/error/empty states
// render per-query.
export default async function OrdersPage() {
  await requireRole("business");
  return (
    <div className="flex overflow-hidden">
      <DashboardSidbar />
      <main className="container mx-auto px-4 py-8">
        <OrdersClient />
      </main>
    </div>
  );
}
