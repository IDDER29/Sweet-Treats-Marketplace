"use client";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { Star, Store as StoreIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { LoadingState } from "@/components/feedback/LoadingState";
import { ErrorState } from "@/components/feedback/ErrorState";
import { EmptyState } from "@/components/feedback/EmptyState";
import { formatCurrency } from "@/lib/currency";
import { getStores } from "@/services/stores";
import type { Store } from "@/types";

export default function StoresDirectory() {
  const { data, isLoading, isError, refetch } = useQuery<Store[]>({
    queryKey: ["stores"],
    queryFn: () => getStores(),
  });
  const stores = data ?? [];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Browse Stores</h1>

      {isLoading ? (
        <LoadingState rows={6} />
      ) : isError ? (
        <ErrorState
          title="Couldn't load stores"
          onRetry={() => refetch()}
        />
      ) : stores.length === 0 ? (
        <EmptyState
          icon={<StoreIcon className="h-12 w-12" />}
          title="No stores yet"
          message="Check back soon for local bakeries near you."
        />
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {stores.map((store) => (
            <Link key={store.id} href={`/stores/${store.id}`}>
              <Card className="h-full overflow-hidden transition-shadow hover:shadow-lg">
                {store.coverUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={store.coverUrl}
                    alt={store.name}
                    className="h-40 w-full object-cover"
                  />
                ) : (
                  <div className="flex h-40 w-full items-center justify-center bg-muted text-muted-foreground">
                    <StoreIcon className="h-10 w-10" />
                  </div>
                )}
                <CardContent className="p-4">
                  <h3 className="text-lg font-semibold">{store.name}</h3>
                  {store.description && (
                    <p className="mb-2 line-clamp-2 text-sm text-muted-foreground">
                      {store.description}
                    </p>
                  )}
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      {(store.rating ?? 0).toFixed(1)}
                    </span>
                    {typeof store.deliveryFee === "number" && (
                      <span className="text-muted-foreground">
                        {formatCurrency(store.deliveryFee)} delivery
                      </span>
                    )}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
