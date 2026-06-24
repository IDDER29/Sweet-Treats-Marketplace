"use client";
import React, { useState } from "react";
import Link from "next/link";
import {
  Star,
  Minus,
  Plus,
  Heart,
  CheckCircle,
  MapPin,
  RefreshCw,
  ShoppingCart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import SelectField from "../reusable-component/SelectField";
import { useCart } from "@/context/CartContext";
import { formatCurrency } from "@/lib/currency";
import { toast } from "react-toastify";

interface InfoData {
  id: string;
  name: string;
  rating: number;
  reviewCount: number;
  price: number;
  description: string;
  ingredients?: string;
  allergens?: string;
  size?: string;
  availability?: string;
  options?: string[];
  dietaryLabel?: string | string[];
}

interface ProductInformationProps {
  productInfoData: InfoData;
}

const ProductInformation: React.FC<ProductInformationProps> = ({
  productInfoData,
}) => {
  const [selectedSize, setSelectedSize] = useState<string | undefined>(
    productInfoData.options?.[0]
  );
  const [quantity, setQuantity] = useState<number>(1);
  const [wishlisted, setWishlisted] = useState(false);

  const { addToCart } = useCart();

  const handleQuantityChange = (amount: number) => {
    setQuantity((prev) => Math.max(1, prev + amount));
  };

  const handleAddToCart = () => {
    addToCart({
      id: productInfoData.id,
      quantity,
      name: productInfoData.name,
      price: Number(productInfoData.price),
    });
    toast.success("Added to cart.");
  };

  const isOutOfStock = productInfoData.availability === "Out of Stock";

  const renderStars = (rating: number) =>
    Array(5)
      .fill(null)
      .map((_, i) => (
        <Star
          key={i}
          className={`w-5 h-5 ${
            i < Math.floor(rating)
              ? "text-yellow-400 fill-yellow-400"
              : "text-gray-200 fill-gray-200"
          }`}
        />
      ));

  // Normalise dietaryLabel to an array
  const dietaryLabels: string[] = productInfoData.dietaryLabel
    ? Array.isArray(productInfoData.dietaryLabel)
      ? productInfoData.dietaryLabel
      : [productInfoData.dietaryLabel]
    : [];
  const visibleDietaryLabels = dietaryLabels.filter(
    (l) => l && l.toLowerCase() !== "none"
  );

  return (
    <div className="w-full lg:w-1/2 flex flex-col gap-0">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-1.5 text-xs text-muted-foreground mb-4">
        <Link href="/" className="hover:text-foreground transition-colors">
          Home
        </Link>
        <span>/</span>
        <Link href="/products" className="hover:text-foreground transition-colors">
          Products
        </Link>
        <span>/</span>
        <span className="text-foreground line-clamp-1">{productInfoData.name}</span>
      </nav>

      {/* Trust badges */}
      <div className="flex flex-wrap gap-2 mb-5">
        <Badge
          variant="secondary"
          className="flex items-center gap-1.5 px-3 py-1 text-xs bg-amber-50 text-amber-800 border border-amber-200"
        >
          <CheckCircle className="h-3.5 w-3.5 text-amber-600" />
          Fresh Daily
        </Badge>
        <Badge
          variant="secondary"
          className="flex items-center gap-1.5 px-3 py-1 text-xs bg-rose-50 text-rose-800 border border-rose-200"
        >
          <MapPin className="h-3.5 w-3.5 text-rose-500" />
          Local Bakery
        </Badge>
        <Badge
          variant="secondary"
          className="flex items-center gap-1.5 px-3 py-1 text-xs bg-green-50 text-green-800 border border-green-200"
        >
          <RefreshCw className="h-3.5 w-3.5 text-green-600" />
          Free Returns
        </Badge>
      </div>

      {/* Product title */}
      <h1 className="text-3xl font-bold text-gray-900 mb-3 leading-tight">
        {productInfoData.name}
      </h1>

      {/* Rating and reviews */}
      <div className="flex items-center gap-3 mb-5">
        <div className="flex">{renderStars(productInfoData.rating)}</div>
        <span className="text-sm font-medium text-gray-700">
          {(productInfoData.rating ?? 0).toFixed(1)}
        </span>
        <a
          href="#reviews"
          className="text-sm text-amber-600 underline underline-offset-2 hover:text-amber-700"
        >
          {productInfoData.reviewCount ?? 0} reviews
        </a>
      </div>

      {/* Price */}
      <div className="flex items-baseline gap-3 mb-5">
        <span className="text-3xl font-extrabold text-amber-700">
          {formatCurrency(Number(productInfoData.price))}
        </span>
        {/* Placeholder slot for original/sale price */}
        {/* <span className="text-lg text-muted-foreground line-through">{formatCurrency(originalPrice)}</span> */}
      </div>

      {/* Availability */}
      <div className="mb-5">
        <Badge
          className={
            isOutOfStock
              ? "bg-red-100 text-red-700 hover:bg-red-100 border border-red-200"
              : "bg-green-100 text-green-700 hover:bg-green-100 border border-green-200"
          }
          variant="secondary"
        >
          {isOutOfStock ? "Out of Stock" : "In Stock — Ready to Order"}
        </Badge>
      </div>

      {/* Description */}
      <p className="text-gray-600 leading-relaxed mb-5">
        {productInfoData.description}
      </p>

      {/* Dietary labels */}
      {visibleDietaryLabels.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-5">
          {visibleDietaryLabels.map((label) => (
            <Badge
              key={label}
              className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100 border border-emerald-200"
              variant="secondary"
            >
              {label}
            </Badge>
          ))}
        </div>
      )}

      {/* Size selection */}
      {productInfoData.options && productInfoData.options.length > 0 && (
        <div className="mb-5">
          <SelectField
            label="Size"
            options={productInfoData.options}
            onChange={setSelectedSize}
            value={selectedSize}
          />
        </div>
      )}

      {/* Quantity selector */}
      <div className="mb-6">
        <p className="text-sm font-semibold text-gray-700 mb-2">Quantity</p>
        <div className="flex items-center gap-0 w-fit border rounded-lg overflow-hidden">
          <button
            className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-amber-50 hover:text-amber-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            onClick={() => handleQuantityChange(-1)}
            disabled={quantity <= 1}
            aria-label="Decrease quantity"
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="w-12 h-10 flex items-center justify-center font-semibold text-base border-x select-none">
            {quantity}
          </span>
          <button
            className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-amber-50 hover:text-amber-700 transition-colors"
            onClick={() => handleQuantityChange(1)}
            aria-label="Increase quantity"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Add to cart + wishlist */}
      <div className="flex gap-3 mb-8">
        <Button
          onClick={handleAddToCart}
          disabled={isOutOfStock}
          className="flex-1 h-12 text-base bg-amber-500 hover:bg-amber-600 text-white gap-2 shadow-sm"
        >
          <ShoppingCart className="h-5 w-5" />
          {isOutOfStock ? "Out of Stock" : "Add to Cart"}
        </Button>
        <Button
          variant="outline"
          className={`h-12 w-12 p-0 flex-shrink-0 border-2 transition-colors ${
            wishlisted
              ? "border-rose-400 text-rose-500 bg-rose-50 hover:bg-rose-50"
              : "hover:border-rose-300 hover:text-rose-400"
          }`}
          onClick={() => {
            setWishlisted((v) => !v);
            toast.success(
              wishlisted ? "Removed from wishlist." : "Added to wishlist."
            );
          }}
          aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart
            className={`h-5 w-5 ${wishlisted ? "fill-rose-500 text-rose-500" : ""}`}
          />
        </Button>
      </div>

      {/* Product details accordion */}
      <Accordion type="single" collapsible className="w-full border rounded-xl overflow-hidden">
        {productInfoData.ingredients && (
          <AccordionItem value="ingredients" className="border-b last:border-b-0 px-1">
            <AccordionTrigger className="text-sm font-semibold hover:no-underline py-4">
              Ingredients
            </AccordionTrigger>
            <AccordionContent className="text-sm text-gray-600 pb-4 leading-relaxed">
              {productInfoData.ingredients}
            </AccordionContent>
          </AccordionItem>
        )}
        {productInfoData.allergens && (
          <AccordionItem value="allergens" className="border-b last:border-b-0 px-1">
            <AccordionTrigger className="text-sm font-semibold hover:no-underline py-4">
              Allergens
            </AccordionTrigger>
            <AccordionContent className="text-sm text-gray-600 pb-4 leading-relaxed">
              {productInfoData.allergens}
            </AccordionContent>
          </AccordionItem>
        )}
        {productInfoData.size && (
          <AccordionItem value="size" className="border-b last:border-b-0 px-1">
            <AccordionTrigger className="text-sm font-semibold hover:no-underline py-4">
              Size & Weight
            </AccordionTrigger>
            <AccordionContent className="text-sm text-gray-600 pb-4 leading-relaxed">
              {productInfoData.size}
            </AccordionContent>
          </AccordionItem>
        )}
        {!productInfoData.ingredients && !productInfoData.allergens && !productInfoData.size && (
          <AccordionItem value="details" className="px-1">
            <AccordionTrigger className="text-sm font-semibold hover:no-underline py-4">
              Product Details
            </AccordionTrigger>
            <AccordionContent className="text-sm text-gray-600 pb-4">
              No additional details available for this product.
            </AccordionContent>
          </AccordionItem>
        )}
      </Accordion>
    </div>
  );
};

export default ProductInformation;
