"use client";

import { useEffect, useState } from "react";
import { getProductById } from "@/utils/api";
import { useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import { LoadingState } from "@/components/feedback/LoadingState";
import { EmptyState } from "@/components/feedback/EmptyState";
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

// Custom Hook to manage product fetching and state
const useProductDetails = (productId: string | null) => {
  const [product, setProduct] = useState<ProductDetails>();
  const [mainImage, setMainImage] = useState("");
  const [images, setImages] = useState<ProductImage[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductData = async () => {
      if (!productId) return;
      try {
        const product = await getProductById(productId);
        if (product) {
          setProduct(product);
          setMainImage(product.images?.[0]?.url || ""); // Ensure images exist
          setImages(product.images);
          setSelectedSize(product.options?.[0] || ""); // Ensure options exist
        } else {
          throw new Error("Product not found");
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
    images,
  };
};

export default function ProductDetailsPage({ id }: { id?: string }) {
  const searchParams = useSearchParams();
  const productId = id ?? searchParams.get("id");
  const { product, loading, images } = useProductDetails(productId);
  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);
  const [reviewCount, setReviewCount] = useState(0);
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [allergens, setAllergens] = useState("");
  const [size, setSize] = useState("");
  const [availability, setAvailability] = useState("");
  const [options, setOptions] = useState<string[]>([]);

  useEffect(() => {
    if (product) {
      const {
        name,
        rating,
        reviewCount,
        price,
        description,
        ingredients,
        allergens,
        size,
        availability,
        options,
      } = product;
      setName(name);
      setRating(rating);
      setReviewCount(reviewCount);
      setPrice(price);
      setDescription(description);
      setIngredients(ingredients);
      setAllergens(allergens);
      setSize(size);
      setAvailability(availability);
      setOptions(options);
    }
  }, [product]);

  // States for zoom effect and review form
  const [newReview, setNewReview] = useState({ rating: 5, comment: "" });

  if (loading)
    return (
      <div className="container mx-auto px-4 py-8">
        <LoadingState rows={6} />
      </div>
    );

  if (!product)
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

  const handleSubmitReview = () => {
    if (newReview.comment.trim().length < 10) {
      toast.error("Review comment must be at least 10 characters long.");
      return;
    }
    // TODO(Phase 4): submit the review to the reviews API.
    setNewReview({ rating: 5, comment: "" });
    toast.success("Review submitted successfully.");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Product Image Gallery */}
        <ProductImageGallery productImageData={images} />

        {/* Product Information */}
        <ProductInformation
          productInfoData={{
            id: productId ?? "",
            name,
            rating,
            reviewCount,
            price,
            description,
            ingredients,
            allergens,
            size,
            availability,
            options,
          }}
        />
      </div>

      {/* Reviews Section */}
      <ReviewsSection productId={productId ?? undefined} />
    </div>
  );
}
