"use client";

import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { getProductById } from "@/utils/api";
import { useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import ProductImageGallery from "./products-deties/ProductImageGallery";
import ProductInformation from "./products-deties/ProductInformation";
import ReviewsSection from "./products-deties/ReviewsSection";

// Custom Hook to manage product fetching and state
const useProductDetails = (productId: string) => {
  const [product, setProduct] = useState();
  const [mainImage, setMainImage] = useState("");
  const [images, setImages] = useState();
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const product = await getProductById(productId);
        if (product) {
          setProduct(product);
          console.log(product);
          setMainImage(product.images?.[0].url || ""); // Ensure images exist
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

export default function ProductDetailsPage() {
  const searchParams = useSearchParams();
  const productId = searchParams.get("id");
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
  const [options, setOptions] = useState([]);

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
  console.log;
  // States for zoom effect and review form
  const [newReview, setNewReview] = useState({ rating: 5, comment: "" });

  if (loading) return <p>Loading...</p>;

  if (!product) return <p>Product not found.</p>;

  const handleSubmitReview = () => {
    if (newReview.comment.trim().length < 10) {
      toast.error("Review comment must be at least 10 characters long.");
      return;
    }
    console.log("Submitted review:", newReview);
    // Implement actual review submission logic here
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
            id: productId,
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
      <ReviewsSection
        productReviewsData={[{ name: "idder", rating: 5, comment: "sadfsfd" }]}
      />
    </div>
  );
}
