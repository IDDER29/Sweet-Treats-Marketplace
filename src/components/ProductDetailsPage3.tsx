"use client";

import { useEffect, useState } from "react";
import { Star, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getProductById } from "@/utils/api";
import { toast } from "react-toastify";
import { useSearchParams } from "next/navigation";
import ProductImageGallery from "@/components/ProductImageGallery";
import RelatedProducts from "@/components/RelatedProducts";
import CustomerReviews from "@/components/CustomerReviews";

// Custom Hook to manage product fetching and state
const useProductDetails = (productId) => {
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const product = await getProductById(productId);
        setProduct(product);
        if (product) {
          setMainImage(product.images[0]);
          setSelectedSize(product.options[0]);
        }
      } catch (error) {
        toast.error("Failed to load product data.");
      } finally {
        setLoading(false);
      }
    };

    if (productId) fetchProductData();
  }, [productId]);

  return {
    product,
    mainImage,
    setMainImage,
    quantity,
    setQuantity,
    selectedSize,
    setSelectedSize,
    loading,
  };
};

export default function ProductDetailsPage() {
  const searchParams = useSearchParams();
  const productId = searchParams.get("id");
  const {
    product,
    mainImage,
    setMainImage,
    quantity,
    setQuantity,
    selectedSize,
    setSelectedSize,
    loading,
  } = useProductDetails(productId);

  const handleQuantityChange = (change) => {
    setQuantity((prev) => Math.max(1, prev + change));
  };

  const handleAddToCart = () => {
    console.log(`Added ${quantity} ${product.name} (${selectedSize}) to cart`);
  };

  if (loading) return <p>Loading...</p>;

  return product ? (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Product Image Gallery */}
        <ProductImageGallery
          images={product.images}
          mainImage={mainImage}
          setMainImage={setMainImage}
        />

        {/* Product Information */}
        <div className="w-full lg:w-1/2">
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <ProductRating
            rating={product.rating}
            reviewCount={product.reviewCount}
          />
          <p className="text-2xl font-bold text-primary mb-4">
            ${Number(product.price).toFixed(2)}
          </p>
          <p className="text-gray-700 mb-6">{product.description}</p>

          {/* Additional Product Details */}
          <ProductDetails details={product} />

          {/* Size Selector */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Size
            </label>
            <Select value={selectedSize} onValueChange={setSelectedSize}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select size" />
              </SelectTrigger>
              <SelectContent>
                {product.options.map((size) => (
                  <SelectItem key={size} value={size}>
                    {size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Quantity and Add to Cart */}
          <div className="flex items-center gap-4 mb-6">
            <QuantitySelector
              quantity={quantity}
              onChange={handleQuantityChange}
            />
          </div>
          <Button
            onClick={handleAddToCart}
            className="w-full py-3 text-lg transition-transform hover:scale-105"
          >
            Add to Cart
          </Button>
        </div>
      </div>

      {/**
     
      <RelatedProducts products={product.relatedProducts} />


      <CustomerReviews reviews={product.reviews} />
       **/}
    </div>
  ) : (
    <p>Product not found.</p>
  );
}

/* ProductRating Component */
const ProductRating = ({ rating, reviewCount }) => (
  <div className="flex items-center gap-2 mb-4">
    <div className="flex">
      {Array(5)
        .fill()
        .map((_, i) => (
          <Star
            key={i}
            className={`w-5 h-5 ${
              i < Math.floor(rating)
                ? "text-yellow-400 fill-current"
                : "text-gray-300"
            }`}
          />
        ))}
    </div>
    <span className="text-sm text-gray-600">({reviewCount} reviews)</span>
  </div>
);

/* ProductDetails Component */
const ProductDetails = ({ details }) => (
  <>
    <div className="mb-6">
      <h3 className="font-semibold mb-2">Ingredients:</h3>
      <p className="text-sm text-gray-600">{details.ingredients}</p>
    </div>
    <div className="mb-6">
      <h3 className="font-semibold mb-2">Allergens:</h3>
      <p className="text-sm text-gray-600">{details.allergens}</p>
    </div>
    <div className="mb-6">
      <h3 className="font-semibold mb-2">Size:</h3>
      <p className="text-sm text-gray-600">{details.size}</p>
    </div>
    <div className="mb-6">
      <h3 className="font-semibold mb-2">Availability:</h3>
      <p
        className={`text-sm ${
          details.availability === "In Stock"
            ? "text-green-600"
            : "text-red-600"
        }`}
      >
        {details.availability}
      </p>
    </div>
  </>
);

/* QuantitySelector Component */
const QuantitySelector = ({ quantity, onChange }) => (
  <div className="flex items-center">
    <Button variant="outline" size="icon" onClick={() => onChange(-1)}>
      <Minus className="h-4 w-4" />
    </Button>
    <span className="mx-4 text-lg font-semibold">{quantity}</span>
    <Button variant="outline" size="icon" onClick={() => onChange(1)}>
      <Plus className="h-4 w-4" />
    </Button>
  </div>
);
