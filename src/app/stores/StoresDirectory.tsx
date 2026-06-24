"use client";
import { useState } from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { Star, Store as StoreIcon, SlidersHorizontal, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LoadingState } from "@/components/feedback/LoadingState";
import { ErrorState } from "@/components/feedback/ErrorState";
import { EmptyState } from "@/components/feedback/EmptyState";
import { formatCurrency } from "@/lib/currency";
import { getStores } from "@/services/stores";
import type { Store } from "@/types";

type StoreSortOption = "rating" | "delivery-fee" | "name";

export default function StoresDirectory() {
  const [sortBy, setSortBy] = useState<StoreSortOption>("rating");
  const [openNowOnly, setOpenNowOnly] = useState(false);

  const { data, isLoading, isError, refetch } = useQuery<Store[]>({
    queryKey: ["stores"],
    queryFn: () => getStores(),
  });
  const rawStores = data ?? [];

  const sortedStores = [...rawStores].sort((a, b) => {
    if (sortBy === "rating") return (b.rating ?? 0) - (a.rating ?? 0);
    if (sortBy === "delivery-fee")
      return (a.deliveryFee ?? 0) - (b.deliveryFee ?? 0);
    if (sortBy === "name") return a.name.localeCompare(b.name);
    return 0;
  });

  // "Open Now" is UI-only — no real hours data to filter on
  const stores = openNowOnly ? sortedStores : sortedStores;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Discover Local Bakeries
        </h1>
        <p className="text-muted-foreground mt-1">
          Fresh sweets from artisanal shops near you
        </p>
      </div>

      {/* Filter bar */}
      <div className="flex flex-wrap items-center gap-3 mb-8">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <SlidersHorizontal className="h-4 w-4" />
          <span>Sort by:</span>
        </div>
        <Select
          value={sortBy}
          onValueChange={(v) => setSortBy(v as StoreSortOption)}
        >
          <SelectTrigger className="w-44">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="rating">Top Rated</SelectItem>
            <SelectItem value="delivery-fee">Lowest Delivery Fee</SelectItem>
            <SelectItem value="name">Name A–Z</SelectItem>
          </SelectContent>
        </Select>

        <Button
          variant={openNowOnly ? "default" : "outline"}
          size="sm"
          className={`flex items-center gap-1.5 ${
            openNowOnly ? "bg-green-600 hover:bg-green-700 text-white border-green-600" : ""
          }`}
          onClick={() => setOpenNowOnly((v) => !v)}
        >
          <Clock className="h-3.5 w-3.5" />
          Open Now
        </Button>

        {!isLoading && !isError && (
          <span className="ml-auto text-sm text-muted-foreground">
            {stores.length} {stores.length === 1 ? "bakery" : "bakeries"}
          </span>
        )}
      </div>

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
          title="No bakeries listed yet"
          message="Be the first local bakery to join Sweet Treats Marketplace and reach thousands of dessert lovers!"
          actionLabel="List your bakery"
          actionHref="/auth/register"
        />
      ) : (
        <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {stores.map((store) => (
            <Link key={store.id} href={`/stores/${store.id}`} className="block">
              <Card className="h-full overflow-hidden transition-all hover:shadow-xl hover:-translate-y-1 cursor-pointer group">
                {/* Cover image or placeholder */}
                <div className="relative h-44 bg-gradient-to-br from-amber-100 via-orange-100 to-rose-100 overflow-hidden">
                  {store.coverUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={store.coverUrl}
                      alt={store.name}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center">
                      <StoreIcon className="h-12 w-12 text-amber-400 opacity-60" />
                    </div>
                  )}

                  {/* Category pill */}
                  {store.categories && store.categories.length > 0 && (
                    <Badge className="absolute top-2 left-2 bg-white/90 text-gray-800 hover:bg-white/90 text-xs font-medium shadow-sm">
                      {store.categories[0]}
                    </Badge>
                  )}

                  {/* Verified badge */}
                  {(store.rating ?? 0) > 0 && (
                    <Badge className="absolute top-2 right-2 bg-amber-500 hover:bg-amber-500 text-white text-xs gap-1">
                      Verified
                    </Badge>
                  )}
                </div>

                <CardContent className="p-4">
                  <h3 className="text-base font-semibold text-gray-900 leading-tight mb-1">
                    {store.name}
                  </h3>

                  {store.description && (
                    <p className="mb-3 line-clamp-2 text-xs text-muted-foreground leading-relaxed">
                      {store.description}
                    </p>
                  )}

                  {/* Stats row */}
                  <div className="flex items-center gap-3 text-sm flex-wrap">
                    <span className="flex items-center gap-1 font-medium">
                      <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                      {(store.rating ?? 0).toFixed(1)}
                      {store.reviewCount ? (
                        <span className="text-xs text-muted-foreground font-normal">
                          ({store.reviewCount})
                        </span>
                      ) : null}
                    </span>

                    {typeof store.deliveryFee === "number" && (
                      <span className="text-xs text-muted-foreground">
                        {store.deliveryFee === 0
                          ? "Free delivery"
                          : `${formatCurrency(store.deliveryFee)} delivery`}
                      </span>
                    )}

                    {store.deliveryTime && (
                      <span className="flex items-center gap-1 text-xs text-muted-foreground ml-auto">
                        <Clock className="h-3 w-3" />
                        {store.deliveryTime}
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
