import React from "react";
import { requireRole } from "@/lib/auth-helpers";
import DashboardShell from "@/components/business/dashboard/DashboardShell";
import ProductsClient from "./ProductsClient";

export default async function ProductsPage() {
  await requireRole("business");
  return (
    <DashboardShell title="Products">
      <ProductsClient />
    </DashboardShell>
  );
}
