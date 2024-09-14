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

// Custom Hook to manage product fetching and state
const useProductDetails = (productId: string) => {
  const [product, setProduct] = useState(null);
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
  const {
    product,
    quantity,
    setQuantity,
    selectedSize,
    setSelectedSize,
    loading,
    images,
  } = useProductDetails(productId);

  // States for zoom effect and review form
  const [newReview, setNewReview] = useState({ rating: 5, comment: "" });

  if (loading) return <p>Loading...</p>;

  if (!product) return <p>Product not found.</p>;

  const handleQuantityChange = (change) => {
    setQuantity((prevQuantity) => Math.max(1, prevQuantity + change));
  };

  const handleAddToCart = () => {
    if (product.availability === "In Stock") {
      console.log(
        `Added ${quantity} ${product.name} (${selectedSize}) to cart`
      );
      // Implement actual add to cart logic here
    } else {
      toast.error("Product is out of stock.");
    }
  };

  const handleImageHover = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPosition({ x, y });
  };

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
        <div className="w-full lg:w-1/2">
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <div className="flex items-center gap-2 mb-4">
            <div className="flex">
              {Array(5)
                .fill()
                .map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(product.rating)
                        ? "text-yellow-400 fill-current"
                        : "text-gray-300"
                    }`}
                  />
                ))}
            </div>
            <span className="text-sm text-gray-600">
              ({product.reviewCount} reviews)
            </span>
          </div>
          <p className="text-2xl font-bold text-primary mb-4">
            ${Number(product.price).toFixed(2)}
          </p>
          <p className="text-gray-700 mb-6">{product.description}</p>

          {/* Additional Information */}
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Ingredients:</h3>
            <p className="text-sm text-gray-600">
              {product.ingredients || "N/A"}
            </p>
          </div>

          <div className="mb-6">
            <h3 className="font-semibold mb-2">Allergens:</h3>
            <p className="text-sm text-gray-600">
              {product.allergens || "None"}
            </p>
          </div>

          <div className="mb-6">
            <h3 className="font-semibold mb-2">Size:</h3>
            <p className="text-sm text-gray-600">{product.size || "N/A"}</p>
          </div>

          <div className="mb-6">
            <h3 className="font-semibold mb-2">Availability:</h3>
            <p
              className={`text-sm ${
                product.availability === "In Stock"
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {product.availability || "Out of Stock"}
            </p>
          </div>

          {/* Size Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Size
            </label>
            <Select value={selectedSize} onValueChange={setSelectedSize}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select size" />
              </SelectTrigger>
              <SelectContent>
                {product.options?.map((size) => (
                  <SelectItem key={size} value={size}>
                    {size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Quantity Selection */}
          <div className="flex items-center gap-4 mb-6">
            <label className="text-sm font-medium text-gray-700">
              Quantity
            </label>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                onClick={() => handleQuantityChange(-1)}
                disabled={quantity <= 1}
              >
                <Minus />
              </Button>
              <span>{quantity}</span>
              <Button variant="outline" onClick={() => handleQuantityChange(1)}>
                <Plus />
              </Button>
            </div>
          </div>

          {/* Add to Cart Button */}
          <Button
            onClick={handleAddToCart}
            disabled={product.availability !== "In Stock"}
            className="w-full"
          >
            Add to Cart
          </Button>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Customer Reviews</h2>
        {product.reviews?.length > 0 ? (
          <ul className="space-y-4">
            {product.reviews.map((review, index) => (
              <li key={index} className="border p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex">
                    {Array(5)
                      .fill()
                      .map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < review.rating
                              ? "text-yellow-400 fill-current"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                  </div>
                  <span className="text-sm text-gray-600">
                    {review.rating} stars
                  </span>
                </div>
                <p className="text-sm text-gray-700">{review.comment}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No reviews yet. Be the first to write one!</p>
        )}

        {/* Submit Review Dialog */}
        <Dialog>
          <DialogTrigger asChild>
            <Button className="mt-4">Write a Review</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Write a Review</DialogTitle>
              <DialogDescription>
                Share your experience with this product.
              </DialogDescription>
            </DialogHeader>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Rating
              </label>
              <div className="flex gap-2">
                {Array(5)
                  .fill()
                  .map((_, i) => (
                    <button
                      key={i}
                      className={`p-1 ${
                        newReview.rating > i
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }`}
                      onClick={() =>
                        setNewReview({ ...newReview, rating: i + 1 })
                      }
                    >
                      <Star className="w-6 h-6" />
                    </button>
                  ))}
              </div>

              <label className="block text-sm font-medium text-gray-700 mt-4">
                Comment
              </label>
              <Textarea
                value={newReview.comment}
                onChange={(e) =>
                  setNewReview({ ...newReview, comment: e.target.value })
                }
                placeholder="Write your review here"
                className="mt-2"
              />

              <Button
                onClick={handleSubmitReview}
                className="mt-4"
                disabled={!newReview.comment.trim()}
              >
                Submit Review
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
