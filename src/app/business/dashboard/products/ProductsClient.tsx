"use client";

import React, { useMemo, useState } from "react";
import { Package } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import HeaderSection from "./HeaderSection";
import ProductTable from "./ProductTable";
import { LoadingState } from "@/components/feedback/LoadingState";
import { ErrorState } from "@/components/feedback/ErrorState";
import { EmptyState } from "@/components/feedback/EmptyState";
import { getBusinessesProducts } from "@/utils/api";
import type { Product } from "@/types";

/**
 * Client wrapper for the seller's products list. Owns the search box state
 * (so it can filter the table client-side) plus loading / error / empty
 * rendering via React Query.
 */
export default function ProductsClient() {
  const [search, setSearch] = useState<string>("");

  const { data, isLoading, isError, refetch } = useQuery<Product[]>({
    queryKey: ["business-products"],
    queryFn: async () => {
      const result = await getBusinessesProducts();
      return Array.isArray(result) ? (result as Product[]) : [];
    },
  });

  const products = useMemo<Product[]>(() => {
    const list = data ?? [];
    const q = search.trim().toLowerCase();
    if (!q) return list;
    return list.filter(
      (p) =>
        p.name?.toLowerCase().includes(q) ||
        p.category?.toLowerCase().includes(q)
    );
  }, [data, search]);

  return (
    <>
      <HeaderSection search={search} onSearchChange={setSearch} />

      {isLoading && <LoadingState rows={5} />}

      {isError && (
        <ErrorState
          title="Couldn't load products"
          message="We couldn't fetch your products right now. Please try again."
          onRetry={() => refetch()}
        />
      )}

      {!isLoading && !isError && (data ?? []).length === 0 && (
        <EmptyState
          icon={<Package className="h-10 w-10" />}
          title="No products yet"
          message="Add your first product to start selling."
          actionLabel="Add Product"
          actionHref="/business/dashboard/products/add"
        />
      )}

      {!isLoading && !isError && (data ?? []).length > 0 && (
        <>
          {products.length === 0 ? (
            <EmptyState
              icon={<Package className="h-10 w-10" />}
              title="No matching products"
              message={`No products match "${search}". Try a different search.`}
            />
          ) : (
            <ProductTable products={products} onChanged={() => refetch()} />
          )}
        </>
      )}
    </>
  );
}
