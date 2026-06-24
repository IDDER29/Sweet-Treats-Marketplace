"use client";

import { useEffect, useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Star, Search, SlidersHorizontal, X, ShoppingCart } from "lucide-react";
import { getAllProducts } from "@/utils/api";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { formatCurrency } from "@/lib/currency";
import { toast } from "react-toastify";
import { PRODUCT_CATEGORIES, DIETARY_LABELS } from "@/config";
import { LoadingState } from "@/components/feedback/LoadingState";
import { EmptyState } from "@/components/feedback/EmptyState";
import { ErrorState } from "@/components/feedback/ErrorState";

interface ProductImage {
  url: string;
}

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  description: string;
  dietary: string[];
  dietaryLabel: string[];
  rating: number;
  images: ProductImage[];
  availability?: string;
  createdAt?: string;
}

type DietaryKey = "Gluten-Free" | "Vegan";

const DIETARY_FILTER: DietaryKey[] = ["Gluten-Free", "Vegan"];

type SortOption = "default" | "price-asc" | "price-desc" | "rating" | "newest";

const PRODUCTS_PER_PAGE = 6;
const INITIAL_PRICE_RANGE = [0, 50] as [number, number];

const ProductListingsPage: React.FC = () => {
  const router = useRouter();
  const { addToCart } = useCart();

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [priceRange, setPriceRange] =
    useState<[number, number]>(INITIAL_PRICE_RANGE);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [dietaryFilters, setDietaryFilters] = useState<Set<DietaryKey>>(
    new Set()
  );
  const [sortBy, setSortBy] = useState<SortOption>("default");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      setIsError(false);
      const response = await getAllProducts();
      setProducts(Array.isArray(response) ? response : []);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, priceRange, dietaryFilters, sortBy]);

  const filteredAndSorted = useMemo(() => {
    const filtered = products.filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesPriceRange =
        product.price >= priceRange[0] && product.price <= priceRange[1];
      const matchesCategory =
        selectedCategory === "All" || product.category === selectedCategory;
      const matchesDietary =
        dietaryFilters.size === 0 ||
        [...dietaryFilters].some((label) =>
          (product.dietary ?? []).some(
            (d) => d.toLowerCase() === label.toLowerCase()
          )
        );
      return matchesSearch && matchesPriceRange && matchesCategory && matchesDietary;
    });

    switch (sortBy) {
      case "price-asc":
        return [...filtered].sort((a, b) => a.price - b.price);
      case "price-desc":
        return [...filtered].sort((a, b) => b.price - a.price);
      case "rating":
        return [...filtered].sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
      case "newest":
        return [...filtered].sort((a, b) =>
          (b.createdAt ?? "").localeCompare(a.createdAt ?? "")
        );
      default:
        return filtered;
    }
  }, [products, searchTerm, priceRange, selectedCategory, dietaryFilters, sortBy]);

  const indexOfLastProduct = currentPage * PRODUCTS_PER_PAGE;
  const indexOfFirstProduct = indexOfLastProduct - PRODUCTS_PER_PAGE;
  const currentProducts = filteredAndSorted.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const pageNumbers = Array.from(
    { length: Math.ceil(filteredAndSorted.length / PRODUCTS_PER_PAGE) },
    (_, i) => i + 1
  );

  const renderStars = (rating: number) =>
    Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-3.5 h-3.5 ${
          i < Math.floor(rating)
            ? "text-yellow-400 fill-yellow-400"
            : "text-gray-200 fill-gray-200"
        }`}
      />
    ));

  const activeFilterCount =
    (selectedCategory !== "All" ? 1 : 0) + dietaryFilters.size;

  const filterPanel = (
    <div className="space-y-5">
      {/* Category */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Category</p>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Categories</SelectItem>
            {PRODUCT_CATEGORIES.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Price range */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
          Price range
        </p>
        <span className="text-sm text-muted-foreground block mb-3">
          {formatCurrency(priceRange[0])} – {formatCurrency(priceRange[1])}
        </span>
        <Slider
          min={0}
          max={50}
          step={1}
          value={priceRange}
          onValueChange={(value) => setPriceRange([value[0], value[1]])}
          className="w-full"
        />
      </div>

      {/* Dietary */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Dietary</p>
        <div className="flex flex-col gap-2.5">
          {DIETARY_FILTER.map((label) => (
            <label key={label} className="flex items-center gap-2 text-sm cursor-pointer">
              <Checkbox
                checked={dietaryFilters.has(label)}
                onCheckedChange={(checked) =>
                  setDietaryFilters((prev) => {
                    const next = new Set(prev);
                    if (checked) next.add(label);
                    else next.delete(label);
                    return next;
                  })
                }
              />
              {label}
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Sweet Treats</h1>
        <p className="text-muted-foreground mt-1">
          Handcrafted sweets from local bakeries, delivered to your door
        </p>
      </div>

      {/* Search + sort + mobile filters trigger */}
      <div className="mb-4 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search for your favourite treat…"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>

        <div className="flex gap-2">
          <Select value={sortBy} onValueChange={(v) => setSortBy(v as SortOption)}>
            <SelectTrigger className="w-44">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default">Featured</SelectItem>
              <SelectItem value="price-asc">Price: Low to High</SelectItem>
              <SelectItem value="price-desc">Price: High to Low</SelectItem>
              <SelectItem value="rating">Top Rated</SelectItem>
              <SelectItem value="newest">Newest</SelectItem>
            </SelectContent>
          </Select>

          {/* Mobile filters button */}
          <Button
            variant="outline"
            className="sm:hidden flex items-center gap-2"
            onClick={() => setMobileFiltersOpen((v) => !v)}
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filters
            {activeFilterCount > 0 && (
              <Badge className="h-5 w-5 p-0 flex items-center justify-center text-xs bg-amber-500 hover:bg-amber-500">
                {activeFilterCount}
              </Badge>
            )}
          </Button>
        </div>
      </div>

      {/* Mobile collapsible filter panel */}
      {mobileFiltersOpen && (
        <div className="sm:hidden mb-6 p-4 rounded-xl border bg-card shadow-sm">
          {filterPanel}
          <Button
            className="mt-4 w-full"
            onClick={() => setMobileFiltersOpen(false)}
          >
            Show {filteredAndSorted.length} results
          </Button>
        </div>
      )}

      {/* Active filter chips */}
      {activeFilterCount > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {selectedCategory !== "All" && (
            <Badge
              variant="secondary"
              className="flex items-center gap-1 px-3 py-1 text-sm cursor-pointer hover:bg-muted"
              onClick={() => setSelectedCategory("All")}
            >
              {selectedCategory}
              <X className="h-3 w-3 ml-1" />
            </Badge>
          )}
          {[...dietaryFilters].map((label) => (
            <Badge
              key={label}
              variant="secondary"
              className="flex items-center gap-1 px-3 py-1 text-sm cursor-pointer hover:bg-muted"
              onClick={() =>
                setDietaryFilters((prev) => {
                  const next = new Set(prev);
                  next.delete(label);
                  return next;
                })
              }
            >
              {label}
              <X className="h-3 w-3 ml-1" />
            </Badge>
          ))}
          <button
            className="text-xs text-muted-foreground underline underline-offset-2 hover:text-foreground"
            onClick={() => {
              setSelectedCategory("All");
              setDietaryFilters(new Set());
            }}
          >
            Clear all
          </button>
        </div>
      )}

      <div className="flex gap-8">
        {/* Desktop sidebar filters */}
        <aside className="hidden sm:block w-56 flex-shrink-0">
          <div className="sticky top-24 rounded-xl border bg-card p-5 shadow-sm">
            <p className="font-semibold mb-4">Filters</p>
            {filterPanel}
          </div>
        </aside>

        {/* Main content */}
        <div className="flex-1 min-w-0">
          {/* Results count */}
          {!isLoading && (
            <p className="text-sm text-muted-foreground mb-4">
              Showing{" "}
              <span className="font-medium text-foreground">
                {filteredAndSorted.length}
              </span>{" "}
              {filteredAndSorted.length === 1 ? "product" : "products"}
            </p>
          )}

          {isLoading ? (
            <LoadingState rows={6} />
          ) : isError ? (
            <ErrorState onRetry={fetchProducts} />
          ) : filteredAndSorted.length === 0 ? (
            <EmptyState
              icon={<Search className="h-12 w-12" />}
              title="No treats found"
              message="Try adjusting your filters or search term to discover more sweet options."
              actionLabel="Clear filters"
              onAction={() => {
                setSearchTerm("");
                setSelectedCategory("All");
                setDietaryFilters(new Set());
                setPriceRange(INITIAL_PRICE_RANGE);
              }}
            />
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
                {currentProducts.map((product) => {
                  const firstDietary =
                    product.dietaryLabel?.[0] || product.dietary?.[0];
                  const isOutOfStock =
                    product.availability === "Out of Stock";

                  return (
                    <Card
                      key={product.id}
                      className="overflow-hidden transition-all hover:shadow-lg hover:-translate-y-0.5 cursor-pointer group"
                      onClick={() => router.push(`/product/${product.id}`)}
                    >
                      <CardHeader className="p-0 relative">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={product.images?.[0]?.url || "/placeholder.svg"}
                          alt={product.name}
                          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                        />
                        {/* Dietary badge on image */}
                        {firstDietary && firstDietary !== "None" && (
                          <Badge className="absolute top-2 left-2 bg-emerald-600 hover:bg-emerald-600 text-white text-xs">
                            {firstDietary}
                          </Badge>
                        )}
                        {/* Stock indicator */}
                        <Badge
                          className={`absolute top-2 right-2 text-xs ${
                            isOutOfStock
                              ? "bg-red-100 text-red-700 hover:bg-red-100"
                              : "bg-green-100 text-green-700 hover:bg-green-100"
                          }`}
                          variant="secondary"
                        >
                          {isOutOfStock ? "Out of Stock" : "In Stock"}
                        </Badge>
                      </CardHeader>

                      <CardContent className="p-4 pb-2">
                        <h3 className="font-semibold text-base leading-tight mb-1 line-clamp-1">
                          {product.name}
                        </h3>
                        {/* Stars */}
                        <div className="flex items-center gap-1 mb-2">
                          <div className="flex">{renderStars(product.rating ?? 0)}</div>
                          <span className="text-xs text-muted-foreground">
                            {(product.rating ?? 0).toFixed(1)}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground line-clamp-2">
                          {product.description}
                        </p>
                      </CardContent>

                      <CardFooter className="px-4 pb-4 pt-2 flex items-center justify-between gap-2">
                        <span className="font-bold text-lg text-amber-700">
                          {formatCurrency(Number(product.price))}
                        </span>
                        <Button
                          size="sm"
                          className="bg-amber-500 hover:bg-amber-600 text-white gap-1.5"
                          disabled={isOutOfStock}
                          onClick={(e) => {
                            e.stopPropagation();
                            addToCart({
                              id: product.id,
                              quantity: 1,
                              name: product.name,
                              price: Number(product.price),
                              image: product.images?.[0]?.url,
                            });
                            toast.success("Added to cart.");
                          }}
                        >
                          <ShoppingCart className="h-3.5 w-3.5" />
                          Add
                        </Button>
                      </CardFooter>
                    </Card>
                  );
                })}
              </div>

              {/* Pagination */}
              {pageNumbers.length > 1 && (
                <div className="flex justify-center items-center gap-1.5">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </Button>
                  {pageNumbers.map((number) => (
                    <Button
                      key={number}
                      size="sm"
                      variant={currentPage === number ? "default" : "outline"}
                      onClick={() => setCurrentPage(number)}
                      className={
                        currentPage === number
                          ? "bg-amber-500 hover:bg-amber-600 border-amber-500"
                          : ""
                      }
                    >
                      {number}
                    </Button>
                  ))}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setCurrentPage((p) => Math.min(pageNumbers.length, p + 1))
                    }
                    disabled={currentPage === pageNumbers.length}
                  >
                    Next
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductListingsPage;
