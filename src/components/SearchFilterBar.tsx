"use client"; // This is only added for the client-side components

import { useState } from "react";
//import ProductGrid from "@/components/ProductGrid";
//import Pagination from "@/components/Pagination";
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
import { Search } from "lucide-react";

export default function SearchFilterBar({ initialProducts }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState([0, 50]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [dietaryPreferences, setDietaryPreferences] = useState({
    "gluten-free": false,
    vegan: false,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;

  const filteredProducts = initialProducts.filter(
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

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  return (
    <div>
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
                  setDietaryPreferences((prev) => ({
                    ...prev,
                    vegan: checked,
                  }))
                }
              />
              <span>Vegan</span>
            </label>
          </div>
        </div>
      </div>

      {/**<ProductGrid products={currentProducts} />

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      /> */}
    </div>
  );
}
