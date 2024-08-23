"use client";

import { useState } from "react";
import {
  Star,
  ChevronLeft,
  ChevronRight,
  Minus,
  Plus,
  Check,
} from "lucide-react";
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

// Mock product data
const product = {
  id: 1,
  name: "Chocolate Truffle Delight Cake",
  price: 39.99,
  description:
    "Indulge in the rich, velvety goodness of our Chocolate Truffle Delight Cake. This decadent dessert features layers of moist chocolate sponge, generously filled with smooth chocolate ganache, and adorned with a cascade of hand-crafted chocolate truffles.",
  ingredients:
    "Chocolate sponge (wheat flour, cocoa powder, eggs, sugar, vegetable oil), chocolate ganache (dark chocolate, heavy cream), chocolate truffles (cocoa powder, cream, butter), decorative chocolate shavings.",
  allergens: "Contains: Wheat, Eggs, Milk. May contain traces of nuts.",
  size: "8 inches (serves 10-12)",
  availability: "In Stock",
  rating: 4.8,
  reviewCount: 24,
  images: [
    "/placeholder.svg?height=400&width=400&text=Chocolate+Cake",
    "/placeholder.svg?height=400&width=400&text=Cake+Slice",
    "/placeholder.svg?height=400&width=400&text=Cake+Box",
    "/placeholder.svg?height=400&width=400&text=Cake+Close-up",
  ],
  options: ["8 inches", "10 inches", "12 inches"],
  reviews: [
    {
      id: 1,
      user: "Cake Lover",
      rating: 5,
      comment:
        "Absolutely divine! The chocolate truffles on top are a game-changer.",
      date: "2023-06-15",
      verified: true,
    },
    {
      id: 2,
      user: "Sweet Tooth",
      rating: 4,
      comment:
        "Delicious cake, but a bit too rich for my taste. Still enjoyed it!",
      date: "2023-06-10",
      verified: true,
    },
    {
      id: 3,
      user: "Dessert Enthusiast",
      rating: 5,
      comment: "Perfect for special occasions. Everyone at the party loved it!",
      date: "2023-06-05",
      verified: false,
    },
  ],
  relatedProducts: [
    {
      id: 2,
      name: "Vanilla Bean Dream Cake",
      price: 34.99,
      image: "/placeholder.svg?height=200&width=200&text=Vanilla+Cake",
    },
    {
      id: 3,
      name: "Red Velvet Bliss",
      price: 37.99,
      image: "/placeholder.svg?height=200&width=200&text=Red+Velvet",
    },
    {
      id: 4,
      name: "Lemon Zest Delight",
      price: 32.99,
      image: "/placeholder.svg?height=200&width=200&text=Lemon+Cake",
    },
  ],
};

export default function ProductDetailsPage() {
  const [mainImage, setMainImage] = useState(product.images[0]);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(product.options[0]);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [isZoomed, setIsZoomed] = useState(false);
  const [newReview, setNewReview] = useState({ rating: 5, comment: "" });

  const handleThumbnailClick = (image) => {
    setMainImage(image);
  };

  const handleQuantityChange = (change) => {
    setQuantity(Math.max(1, quantity + change));
  };

  const handleAddToCart = () => {
    console.log(`Added ${quantity} ${product.name} (${selectedSize}) to cart`);
    // Implement actual add to cart logic here
  };

  const handleImageHover = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPosition({ x, y });
  };

  const handleSubmitReview = () => {
    console.log("Submitted review:", newReview);
    // Implement actual review submission logic here
    setNewReview({ rating: 5, comment: "" });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Product Image Gallery */}
        <div className="w-full lg:w-1/2">
          <div
            className="relative overflow-hidden rounded-lg mb-4 cursor-zoom-in"
            onMouseMove={handleImageHover}
            onMouseEnter={() => setIsZoomed(true)}
            onMouseLeave={() => setIsZoomed(false)}
          >
            <img
              src={mainImage}
              alt={product.name}
              className="w-full h-auto transition-transform duration-200 ease-in-out"
              style={{
                transform: isZoomed ? "scale(2)" : "scale(1)",
                transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
              }}
            />
          </div>
          <div className="flex gap-2 overflow-x-auto">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => handleThumbnailClick(image)}
                className={`flex-shrink-0 w-20 h-20 rounded-md overflow-hidden ${
                  mainImage === image ? "ring-2 ring-primary" : ""
                }`}
              >
                <img
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

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
            ${product.price.toFixed(2)}
          </p>
          <p className="text-gray-700 mb-6">{product.description}</p>

          <div className="mb-6">
            <h3 className="font-semibold mb-2">Ingredients:</h3>
            <p className="text-sm text-gray-600">{product.ingredients}</p>
          </div>

          <div className="mb-6">
            <h3 className="font-semibold mb-2">Allergens:</h3>
            <p className="text-sm text-gray-600">{product.allergens}</p>
          </div>

          <div className="mb-6">
            <h3 className="font-semibold mb-2">Size:</h3>
            <p className="text-sm text-gray-600">{product.size}</p>
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
              {product.availability}
            </p>
          </div>

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

          <div className="flex items-center gap-4 mb-6">
            <label className="text-sm font-medium text-gray-700">
              Quantity
            </label>
            <div className="flex items-center">
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleQuantityChange(-1)}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="mx-4 text-lg font-semibold">{quantity}</span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleQuantityChange(1)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <Button
            onClick={handleAddToCart}
            className="w-full py-3 text-lg transition-transform hover:scale-105"
          >
            Add to Cart
          </Button>
        </div>
      </div>

      {/* Related Products */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">You Might Also Like</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {product.relatedProducts.map((relatedProduct) => (
            <div key={relatedProduct.id} className="border rounded-lg p-4">
              <img
                src={relatedProduct.image}
                alt={relatedProduct.name}
                className="w-full h-40 object-cover rounded-md mb-2"
              />
              <h3 className="font-semibold">{relatedProduct.name}</h3>
              <p className="text-primary font-bold">
                ${relatedProduct.price.toFixed(2)}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Customer Reviews */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>
        <div className="space-y-4 mb-8">
          {product.reviews.map((review) => (
            <div key={review.id} className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="font-semibold">{review.user}</span>
                  {review.verified && (
                    <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                      Verified Purchase
                    </span>
                  )}
                </div>
                <span className="text-sm text-gray-500">{review.date}</span>
              </div>
              <div className="flex items-center mb-2">
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
              <p className="text-gray-700">{review.comment}</p>
            </div>
          ))}
        </div>

        {/* Leave a Review */}
        <Dialog>
          <DialogTrigger asChild>
            <Button>Leave a Review</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Leave a Review</DialogTitle>
              <DialogDescription>
                Share your thoughts about this product
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rating
                </label>
                <div className="flex">
                  {Array(5)
                    .fill()
                    .map((_, i) => (
                      <button
                        key={i}
                        onClick={() =>
                          setNewReview({ ...newReview, rating: i + 1 })
                        }
                        className="focus:outline-none"
                      >
                        <Star
                          className={`w-6 h-6 ${
                            i < newReview.rating
                              ? "text-yellow-400 fill-current"
                              : "text-gray-300"
                          }`}
                        />
                      </button>
                    ))}
                </div>
              </div>
              <div>
                <label
                  htmlFor="comment"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Your Review
                </label>
                <Textarea
                  id="comment"
                  value={newReview.comment}
                  onChange={(e) =>
                    setNewReview({ ...newReview, comment: e.target.value })
                  }
                  rows={4}
                  placeholder="Write your review here..."
                />
              </div>
              <Button onClick={handleSubmitReview}>Submit Review</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
