"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ThumbsUp, Clock, Bike, Search, Store as StoreIcon } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { LoadingState } from "@/components/feedback/LoadingState";
import { ErrorState } from "@/components/feedback/ErrorState";
import { EmptyState } from "@/components/feedback/EmptyState";
import { formatCurrency } from "@/lib/currency";
import { getStores } from "@/services/stores";
import type { Store } from "@/types";

export default function StoresPage() {
  const [search, setSearch] = useState<string>("");

  const { data, isLoading, isError, refetch } = useQuery<Store[]>({
    queryKey: ["stores"],
    queryFn: () => getStores(),
  });

  const stores = useMemo<Store[]>(() => {
    const list = data ?? [];
    const q = search.trim().toLowerCase();
    if (!q) return list;
    return list.filter(
      (s) =>
        s.name?.toLowerCase().includes(q) ||
        s.address?.toLowerCase().includes(q)
    );
  }, [data, search]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 flex items-center justify-between gap-2">
        <h1 className="text-3xl font-bold">Stores</h1>
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search stores"
            className="pl-9"
            value={search}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSearch(e.target.value)
            }
          />
        </div>
      </div>

      {isLoading && <LoadingState rows={5} />}

      {isError && (
        <ErrorState
          title="Couldn't load stores"
          message="We couldn't fetch the stores right now. Please try again."
          onRetry={() => refetch()}
        />
      )}

      {!isLoading && !isError && (data ?? []).length === 0 && (
        <EmptyState
          icon={<StoreIcon className="h-10 w-10" />}
          title="No stores found"
          message="There are no stores to show yet."
        />
      )}

      {!isLoading && !isError && (data ?? []).length > 0 && (
        <>
          {stores.length === 0 ? (
            <EmptyState
              icon={<StoreIcon className="h-10 w-10" />}
              title="No matching stores"
              message={`No stores match "${search}". Try a different search.`}
            />
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {stores.map((store) => (
                <Link key={store.id} href={`/business/stores/${store.id}`}>
                  <Card className="h-full transition-shadow hover:shadow-md">
                    <CardContent className="p-6">
                      <div className="mb-4 flex items-center gap-4">
                        {store.logoUrl ? (
                          <Image
                            src={store.logoUrl}
                            alt={store.name}
                            width={64}
                            height={64}
                            className="h-16 w-16 rounded-full object-cover"
                          />
                        ) : (
                          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                            <StoreIcon className="h-6 w-6 text-muted-foreground" />
                          </div>
                        )}
                        <div className="min-w-0">
                          <h2 className="truncate text-xl font-bold">
                            {store.name}
                          </h2>
                          {store.address && (
                            <p className="truncate text-sm text-muted-foreground">
                              {store.address}
                            </p>
                          )}
                        </div>
                      </div>

                      {store.description && (
                        <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">
                          {store.description}
                        </p>
                      )}

                      <div className="flex flex-wrap gap-4 text-sm">
                        {typeof store.rating === "number" && (
                          <div className="flex items-center gap-2">
                            <ThumbsUp className="h-4 w-4" />
                            <span>{store.rating.toFixed(1)}</span>
                          </div>
                        )}
                        {store.deliveryTime && (
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            <span>{store.deliveryTime}</span>
                          </div>
                        )}
                        {typeof store.deliveryFee === "number" && (
                          <div className="flex items-center gap-2">
                            <Bike className="h-4 w-4" />
                            <span>
                              {formatCurrency(store.deliveryFee)} delivery
                            </span>
                          </div>
                        )}
                      </div>

                      {store.categories && store.categories.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-2">
                          {store.categories.map((category) => (
                            <Badge key={category} variant="secondary">
                              {category}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
