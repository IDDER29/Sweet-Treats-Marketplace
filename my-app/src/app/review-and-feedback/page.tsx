"use client";
import { useState } from "react";
import { Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

// Mock data
const purchasedProducts = [
  {
    id: 1,
    name: "Chocolate Cake",
    date: "2023-06-15",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 2,
    name: "Strawberry Tart",
    date: "2023-06-10",
    image: "/placeholder.svg?height=100&width=100",
  },
];

export default function Component() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  const handleSubmitReview = () => {
    console.log("Submitting review:", {
      productId: selectedProduct.id,
      rating,
      review,
    });
    // Here you would typically send this data to your backend
    setSelectedProduct(null);
    setRating(0);
    setReview("");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Review and Feedback</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {purchasedProducts.map((product) => (
          <Card key={product.id}>
            <CardHeader>
              <CardTitle>{product.name}</CardTitle>
              <CardDescription>Purchased on {product.date}</CardDescription>
            </CardHeader>
            <CardContent>
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover mb-4"
              />
            </CardContent>
            <CardFooter>
              <Dialog>
                <DialogTrigger asChild>
                  <Button onClick={() => setSelectedProduct(product)}>
                    Write a Review
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Review {selectedProduct?.name}</DialogTitle>
                    <DialogDescription>
                      Share your thoughts about this product.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="flex items-center space-x-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-6 w-6 cursor-pointer ${
                            star <= rating
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-gray-300"
                          }`}
                          onClick={() => setRating(star)}
                        />
                      ))}
                    </div>
                    <Textarea
                      placeholder="Write your review here..."
                      value={review}
                      onChange={(e) => setReview(e.target.value)}
                    />
                  </div>
                  <DialogFooter>
                    <Button onClick={handleSubmitReview}>Submit Review</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
