"use client";

import { useEffect, useState } from "react";
import { getProductById } from "@/utils/api";
import { useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import { LoadingState } from "@/components/feedback/LoadingState";
import { EmptyState } from "@/components/feedback/EmptyState";
import { ErrorState } from "@/components/feedback/ErrorState";
import ProductImageGallery from "./products-deties/ProductImageGallery";
import ProductInformation from "./products-deties/ProductInformation";
import ReviewsSection from "./products-deties/ReviewsSection";

interface ProductImage {
  url: string;
  name: string;
}

interface ProductDetails {
  name: string;
  rating: number;
  reviewCount: number;
  price: number;
  description: string;
  ingredients: string;
  allergens: string;
  size: string;
  availability: string;
  options: string[];
  images: ProductImage[];
}

const useProductDetails = (productId: string | null) => {
  const [product, setProduct] = useState<ProductDetails | null>(null);
  const [mainImage, setMainImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");
  const [loading, setLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (!productId) {
      setLoading(false);
      return;
    }
    const fetchProductData = async () => {
      try {
        setLoading(true);
        setIsError(false);
        const fetched = await getProductById(productId);
        if (fetched) {
          setProduct(fetched);
          setMainImage(fetched.images?.[0]?.url || "");
          setSelectedSize(fetched.options?.[0] || "");
        } else {
          setProduct(null);
        }
      } catch {
        setIsError(true);
        toast.error("Failed to load product data.");
      } finally {
        setLoading(false);
      }
    };
    fetchProductData();
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
    isError,
  };
};

export default function ProductDetailsPage({ id }: { id?: string }) {
  const searchParams = useSearchParams();
  const productId = id ?? searchParams.get("id");
  const { product, loading, isError } = useProductDetails(productId);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <LoadingState rows={6} />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container mx-auto px-4 py-8">
        <ErrorState onRetry={() => window.location.reload()} />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <EmptyState
          title="Product not found"
          message="This product may no longer be available."
          actionLabel="Browse products"
          actionHref="/products"
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        <ProductImageGallery productImageData={product.images ?? []} />
        <ProductInformation
          productInfoData={{
            id: productId ?? "",
            name: product.name,
            rating: product.rating,
            reviewCount: product.reviewCount,
            price: product.price,
            description: product.description,
            ingredients: product.ingredients,
            allergens: product.allergens,
            size: product.size,
            availability: product.availability,
            options: product.options,
          }}
        />
      </div>
      <ReviewsSection productId={productId ?? undefined} />
    </div>
  );
}
