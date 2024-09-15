// ProductsPage.tsx
import React from "react";
import DashboardSidbar from "@/components/business/dashboard/DashboardSidbar";
import HeaderSection from "./HeaderSection";
import ProductTable from "./ProductTable";
import { getBusinessesProducts } from "@/utils/api";

// This will run on the server and pre-render the page
export default async function ProductsPage() {
  const businessProducts = await getBusinessesProducts(); // Fetch products on server side

  return (
    <div className="flex overflow-hidden">
      <DashboardSidbar />
      <main className="container mx-auto px-4 py-8">
        <HeaderSection />
        <ProductTable products={businessProducts} />
      </main>
    </div>
  );
}
