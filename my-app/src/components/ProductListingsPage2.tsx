"use client";
import { useState } from "react";
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
import { Star, Search, CakeSlice, Croissant, Candy } from "lucide-react";

// Mock data for products
const products = [
  {
    id: 1,
    name: "Chocolate Fudge Cake",
    description: "Rich, moist chocolate cake",
    price: 35.99,
    rating: 4.5,
    category: "Cakes",
    image: "/placeholder.svg?height=200&width=200&text=Chocolate+Cake",
    dietary: ["gluten-free"],
  },
  {
    id: 2,
    name: "Strawberry Cheesecake",
    description: "Creamy cheesecake with fresh strawberries",
    price: 40.99,
    rating: 4.7,
    category: "Cakes",
    image: "/placeholder.svg?height=200&width=200&text=Strawberry+Cheesecake",
    dietary: [],
  },
  {
    id: 3,
    name: "Blueberry Muffins",
    description: "Fluffy muffins packed with blueberries",
    price: 12.99,
    rating: 4.2,
    category: "Pastries",
    image: "/placeholder.svg?height=200&width=200&text=Blueberry+Muffins",
    dietary: ["vegan"],
  },
  {
    id: 4,
    name: "Assorted Macarons",
    description: "Delicate French macarons in various flavors",
    price: 18.99,
    rating: 4.8,
    category: "Pastries",
    image: "/placeholder.svg?height=200&width=200&text=Assorted+Macarons",
    dietary: ["gluten-free"],
  },
  {
    id: 5,
    name: "Gourmet Chocolate Truffles",
    description: "Handcrafted chocolate truffles",
    price: 25.99,
    rating: 4.6,
    category: "Candies",
    image: "/placeholder.svg?height=200&width=200&text=Chocolate+Truffles",
    dietary: [],
  },
  {
    id: 6,
    name: "Fruit Tart",
    description: "Buttery tart shell filled with custard and fresh fruits",
    price: 32.99,
    rating: 4.4,
    category: "Pastries",
    image: "/placeholder.svg?height=200&width=200&text=Fruit+Tart",
    dietary: [],
  },
  // Add more products as needed
];

export default function ProductListingsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState([0, 50]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [dietaryPreferences, setDietaryPreferences] = useState({
    "gluten-free": false,
    vegan: false,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      product.price >= priceRange[0] &&
      product.price <= priceRange[1] &&
      (selectedCategory === "All" || product.category === selectedCategory) &&
      ((!dietaryPreferences["gluten-free"] && !dietaryPreferences["vegan"]) ||
        (dietaryPreferences["gluten-free"] &&
          product.dietary.includes("gluten-free")) ||
        (dietaryPreferences["vegan"] && product.dietary.includes("vegan")))
  );

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const pageNumbers = [];
  for (
    let i = 1;
    i <= Math.ceil(filteredProducts.length / productsPerPage);
    i++
  ) {
    pageNumbers.push(i);
  }

  const renderStars = (rating) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${
            i < Math.floor(rating)
              ? "text-yellow-400 fill-yellow-400"
              : "text-gray-300"
          }`}
        />
      ));
  };

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
                    "gluten-free": checked,
                  }))
                }
              />
              <span>Gluten-free</span>
            </label>
            <label className="flex items-center space-x-2">
              <Checkbox
                checked={dietaryPreferences["vegan"]}
                onCheckedChange={(checked) =>
                  setDietaryPreferences((prev) => ({ ...prev, vegan: checked }))
                }
              />
              <span>Vegan</span>
            </label>
          </div>
        </div>
      </div>

      {/* Product Display Area */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {currentProducts.map((product) => (
          <Card
            key={product.id}
            className="overflow-hidden transition-shadow hover:shadow-lg"
          >
            <CardHeader className="p-0">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
            </CardHeader>
            <CardContent className="p-4">
              <CardTitle className="text-xl mb-2">{product.name}</CardTitle>
              <p className="text-sm text-gray-600 mb-2">
                {product.description}
              </p>
              <div className="flex justify-between items-center mb-2">
                <span className="font-bold text-lg">
                  ${product.price.toFixed(2)}
                </span>
                <div className="flex">{renderStars(product.rating)}</div>
              </div>
              <div className="flex space-x-2">
                {product.dietary.includes("gluten-free") && (
                  <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                    Gluten-free
                  </span>
                )}
                {product.dietary.includes("vegan") && (
                  <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                    Vegan
                  </span>
                )}
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
}
