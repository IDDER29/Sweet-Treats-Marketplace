"use client";

import { useState, useEffect, useCallback } from "react";
import { Star, Grid, List, Search, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// Mock product data
const allProducts = Array(50)
  .fill(null)
  .map((_, i) => ({
    id: i + 1,
    name: `Product ${i + 1}`,
    description: `This is a description for Product ${
      i + 1
    }. It's a great product with many features.`,
    price: Math.floor(Math.random() * 100) + 10,
    rating: Math.floor(Math.random() * 5) + 1,
    image: `/placeholder.svg?height=200&width=200&text=Product+${i + 1}`,
    category: ["Electronics", "Clothing", "Books", "Home"][
      Math.floor(Math.random() * 4)
    ],
    brand: ["Apple", "Samsung", "Sony", "LG", "Nike", "Adidas"][
      Math.floor(Math.random() * 6)
    ],
  }));

export default function Component() {
  const [products, setProducts] = useState(allProducts);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [minRating, setMinRating] = useState(0);
  const [sortOption, setSortOption] = useState("featured");
  const [currentPage, setCurrentPage] = useState(1);
  const [isGridView, setIsGridView] = useState(true);
  const [isInfiniteScroll, setIsInfiniteScroll] = useState(false);
  const productsPerPage = 12;

  const applyFilters = useCallback(() => {
    let result = products.filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        product.price >= priceRange[0] &&
        product.price <= priceRange[1] &&
        product.rating >= minRating &&
        (selectedCategories.length === 0 ||
          selectedCategories.includes(product.category)) &&
        (selectedBrands.length === 0 || selectedBrands.includes(product.brand))
    );

    switch (sortOption) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        result.sort((a, b) => b.id - a.id);
        break;
    }

    setFilteredProducts(result);
    setCurrentPage(1);
  }, [
    products,
    searchTerm,
    priceRange,
    minRating,
    selectedCategories,
    selectedBrands,
    sortOption,
  ]);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleBrandChange = (brand) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const addToCart = (productId) => {
    console.log(`Added product ${productId} to cart`);
    // Implement actual add to cart logic here
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(0, indexOfLastProduct);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const loadMore = () => {
    if (indexOfLastProduct < filteredProducts.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  useEffect(() => {
    if (isInfiniteScroll) {
      const handleScroll = () => {
        if (
          window.innerHeight + document.documentElement.scrollTop ===
          document.documentElement.offsetHeight
        ) {
          loadMore();
        }
      };

      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [isInfiniteScroll, loadMore]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex flex-wrap gap-4 items-center justify-between">
          <Input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-64"
          />
          <div className="flex gap-4">
            <Select value={sortOption} onValueChange={setSortOption}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                <SelectItem value="price-desc">Price: High to Low</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              onClick={() => setIsGridView(!isGridView)}
            >
              {isGridView ? (
                <List className="w-4 h-4" />
              ) : (
                <Grid className="w-4 h-4" />
              )}
            </Button>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Filters */}
        <div className="w-full md:w-1/4 space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">Price Range</h3>
            <Slider
              defaultValue={[0, 100]}
              max={100}
              step={1}
              onValueChange={setPriceRange}
            />
            <div className="flex justify-between mt-2">
              <span>${priceRange[0]}</span>
              <span>${priceRange[1]}</span>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Category</h3>
            {["Electronics", "Clothing", "Books", "Home"].map((category) => (
              <div key={category} className="flex items-center space-x-2">
                <Checkbox
                  id={category}
                  checked={selectedCategories.includes(category)}
                  onCheckedChange={() => handleCategoryChange(category)}
                />
                <label
                  htmlFor={category}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {category}
                </label>
              </div>
            ))}
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Brand</h3>
            {["Apple", "Samsung", "Sony", "LG", "Nike", "Adidas"].map(
              (brand) => (
                <div key={brand} className="flex items-center space-x-2">
                  <Checkbox
                    id={brand}
                    checked={selectedBrands.includes(brand)}
                    onCheckedChange={() => handleBrandChange(brand)}
                  />
                  <label
                    htmlFor={brand}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {brand}
                  </label>
                </div>
              )
            )}
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Minimum Rating</h3>
            <Select
              value={minRating.toString()}
              onValueChange={(value) => setMinRating(Number(value))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select minimum rating" />
              </SelectTrigger>
              <SelectContent>
                {[0, 1, 2, 3, 4, 5].map((rating) => (
                  <SelectItem key={rating} value={rating.toString()}>
                    {rating} {rating === 1 ? "star" : "stars"} & up
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button onClick={applyFilters}>Apply Filters</Button>
        </div>

        {/* Product Grid/List */}
        <div className="w-full md:w-3/4">
          <div
            className={`grid gap-6 ${
              isGridView
                ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                : "grid-cols-1"
            }`}
          >
            {currentProducts.map((product) => (
              <Dialog key={product.id}>
                <DialogTrigger asChild>
                  <div
                    className={`border rounded-lg overflow-hidden shadow-lg cursor-pointer ${
                      isGridView ? "" : "flex"
                    }`}
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className={`${
                        isGridView ? "w-full h-48" : "w-48 h-48"
                      } object-cover`}
                    />
                    <div className="p-4 flex-1">
                      <h3 className="font-semibold text-lg mb-2">
                        {product.name}
                      </h3>
                      {!isGridView && (
                        <p className="text-gray-600 mb-2">
                          {product.description}
                        </p>
                      )}
                      <p className="text-gray-600 mb-2">${product.price}</p>
                      <div className="flex items-center mb-2">
                        {Array(5)
                          .fill()
                          .map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < product.rating
                                  ? "text-yellow-400 fill-current"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                      </div>
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart(product.id);
                        }}
                        className="w-full"
                      >
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{product.name}</DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-64 object-cover rounded-lg"
                    />
                    <p>{product.description}</p>
                    <p className="font-bold">${product.price}</p>
                    <div className="flex items-center">
                      {Array(5)
                        .fill()
                        .map((_, i) => (
                          <Star
                            key={i}
                            className={`w-5 h-5 ${
                              i < product.rating
                                ? "text-yellow-400 fill-current"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                    </div>
                    <Button onClick={() => addToCart(product.id)}>
                      Add to Cart
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            ))}
          </div>

          {/* Pagination or Load More */}
          {!isInfiniteScroll && (
            <div className="mt-8 flex justify-center">
              <nav className="inline-flex rounded-md shadow">
                <Button
                  variant="outline"
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <ChevronUp className="h-4 w-4" />
                </Button>
                {Array(Math.ceil(filteredProducts.length / productsPerPage))
                  .fill()
                  .map((_, i) => (
                    <Button
                      key={i}
                      variant={currentPage === i + 1 ? "default" : "outline"}
                      onClick={() => paginate(i + 1)}
                    >
                      {i + 1}
                    </Button>
                  ))}
                <Button
                  variant="outline"
                  onClick={() => paginate(currentPage + 1)}
                  disabled={
                    currentPage ===
                    Math.ceil(filteredProducts.length / productsPerPage)
                  }
                >
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </nav>
            </div>
          )}
          {isInfiniteScroll && indexOfLastProduct < filteredProducts.length && (
            <div className="mt-8 flex justify-center">
              <Button onClick={loadMore}>Load More</Button>
            </div>
          )}
        </div>
      </div>
      <div className="mt-8 flex justify-end">
        <Button
          variant="outline"
          onClick={() => setIsInfiniteScroll(!isInfiniteScroll)}
        >
          {isInfiniteScroll
            ? "Switch to Pagination"
            : "Switch to Infinite Scroll"}
        </Button>
      </div>
    </div>
  );
}
