"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
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
  CardTitle,
} from "@/components/ui/card";
import { Star, Search } from "lucide-react";
import { getAllProducts } from "@/utils/api";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { formatCurrency } from "@/lib/currency";
import { toast } from "react-toastify";
import { PRODUCT_CATEGORIES, DIETARY_LABELS } from "@/config";

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
}

type DietaryKey = "Gluten-Free" | "Vegan";

const DIETARY_FILTER: DietaryKey[] = ["Gluten-Free", "Vegan"];

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
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getAllProducts();
        setProducts(response);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  // Reset to the first page whenever filters change so you can't get stuck
  // on a now-empty page.
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, priceRange, dietaryFilters]);

  const filteredProducts = products.filter((product) => {
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
        product.dietary.some(
          (d) => d.toLowerCase() === label.toLowerCase()
        )
      );

    return (
      matchesSearch && matchesPriceRange && matchesCategory && matchesDietary
    );
  });

  const indexOfLastProduct = currentPage * PRODUCTS_PER_PAGE;
  const indexOfFirstProduct = indexOfLastProduct - PRODUCTS_PER_PAGE;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const pageNumbers = Array.from(
    { length: Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE) },
    (_, i) => i + 1
  );

  const renderStars = (rating: number) =>
    Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating)
            ? "text-yellow-400 fill-yellow-400"
            : "text-gray-300"
        }`}
      />
    ));

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Sweet Treats</h1>

      {/* Search and Filter Bar */}
      <div className="mb-8 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search for your favourite treat…"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-44">
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

          <div className="flex flex-col gap-1">
            <span className="text-xs text-muted-foreground">
              Price: {formatCurrency(priceRange[0])} –{" "}
              {formatCurrency(priceRange[1])}
            </span>
            <Slider
              min={0}
              max={50}
              step={1}
              value={priceRange}
              onValueChange={(value) => setPriceRange([value[0], value[1]])}
              className="w-48"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {DIETARY_FILTER.map((label) => (
              <label key={label} className="flex items-center gap-2 text-sm">
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

      {/* Product Display Area */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {currentProducts.map((product) => (
          <Card
            key={product.id}
            className="overflow-hidden transition-shadow hover:shadow-lg hover:cursor-pointer"
            onClick={() => router.push(`/product/${product.id}`)}
          >
            <CardHeader className="p-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={product.images?.[0]?.url || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-48 object-cover"
                width={500}
                height={500}
              />
            </CardHeader>
            <CardContent className="p-4">
              <CardTitle className="text-xl mb-2">{product.name}</CardTitle>
              <p className="text-sm text-gray-600 mb-2">
                {product.description}
              </p>
              <div className="flex justify-between items-center mb-2">
                <span className="font-bold text-lg">
                  {formatCurrency(Number(product.price))}
                </span>
                <div className="flex">{renderStars(product.rating)}</div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
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
                Add to Cart
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center space-x-2">
        {pageNumbers.map((number) => (
          <Button
            key={number}
            variant={currentPage === number ? "default" : "outline"}
            onClick={() => setCurrentPage(number)}
          >
            {number}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default ProductListingsPage;
