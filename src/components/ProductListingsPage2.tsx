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
import Image from "next/image";

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  description: string;
  dietary: string[];
  dietaryLabel: string[];
  rating: number;
  images: string[];
}

interface DietaryPreferences {
  "gluten-free": boolean;
  vegan: boolean;
}

const PRODUCTS_PER_PAGE = 6;
const INITIAL_PRICE_RANGE = [0, 50] as [number, number];

const ProductListingsPage: React.FC = () => {
  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [priceRange, setPriceRange] =
    useState<[number, number]>(INITIAL_PRICE_RANGE);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [dietaryPreferences, setDietaryPreferences] =
    useState<DietaryPreferences>({
      "gluten-free": false,
      vegan: false,
    });
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

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesPriceRange =
      product.price >= priceRange[0] && product.price <= priceRange[1];
    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;
    const matchesDietary =
      (!dietaryPreferences["gluten-free"] && !dietaryPreferences["vegan"]) ||
      (dietaryPreferences["gluten-free"] &&
        product.dietary.includes("gluten-free")) ||
      (dietaryPreferences["vegan"] && product.dietary.includes("vegan"));

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
        <div className="flex items-center space-x-2">
          <Search className="w-5 h-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Search for your favorite treat"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-grow"
          />
        </div>

        <div className="flex flex-wrap gap-4">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Categories</SelectItem>
              <SelectItem value="Cakes">Cakes</SelectItem>
              <SelectItem value="Pastries">Pastries</SelectItem>
              <SelectItem value="Candies">Candies</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium">
              Price Range: ${priceRange[0]} - ${priceRange[1]}
            </span>
            <Slider
              min={0}
              max={50}
              step={1}
              value={priceRange}
              onValueChange={setPriceRange}
              className="w-[200px]"
            />
          </div>

          <div className="flex items-center space-x-4">
            <label className="flex items-center space-x-2">
              <Checkbox
                checked={dietaryPreferences["gluten-free"]}
                onCheckedChange={(checked) =>
                  setDietaryPreferences((prev) => ({
                    ...prev,
                    "gluten-free": !!checked,
                  }))
                }
              />
              <span>Gluten-free</span>
            </label>
            <label className="flex items-center space-x-2">
              <Checkbox
                checked={dietaryPreferences.vegan}
                onCheckedChange={(checked) =>
                  setDietaryPreferences((prev) => ({
                    ...prev,
                    vegan: !!checked,
                  }))
                }
              />
              <span>Vegan</span>
            </label>
          </div>
        </div>
      </div>

      {/* Product Display Area */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {products.map((product) => (
          <Card
            key={product.id}
            className="overflow-hidden transition-shadow hover:shadow-lg hover:cursor-pointer"
            onClick={() => router.push(`/product?id=${product.id}`)}
          >
            <CardHeader className="p-0">
              <Image
                src={product.images[0].url}
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
                  ${Number(product.price).toFixed(2)}
                </span>
                <div className="flex">{renderStars(product.rating)}</div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Add to Cart</Button>
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
