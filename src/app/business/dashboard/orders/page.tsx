import React from "react";
import { requireRole } from "@/lib/auth-helpers";
import DashboardShell from "@/components/business/dashboard/DashboardShell";
import OrdersClient from "./OrdersClient";

export default async function OrdersPage() {
  await requireRole("business");
  return (
    <DashboardShell title="Orders">
      <OrdersClient />
    </DashboardShell>
  );
}
