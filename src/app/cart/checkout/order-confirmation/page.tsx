"use client";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Mock data for the order
const order = {
  id: "ORD-12345",
  items: [
    { id: 1, name: "Chocolate Cake", price: 25.99, quantity: 1 },
    { id: 2, name: "Strawberry Tart", price: 18.99, quantity: 2 },
    { id: 3, name: "Macarons Set", price: 15.99, quantity: 1 },
  ],
  subtotal: 79.96,
  deliveryFee: 5.99,
  tax: 7.99,
  total: 93.94,
  shippingAddress: "123 Main St, Anytown, AN 12345",
  estimatedDelivery: "Tomorrow, 2pm - 4pm",
};

// Mock data for recommended products
const recommendedProducts = [
  {
    id: 1,
    name: "Blueberry Muffins",
    price: 12.99,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 2,
    name: "Cinnamon Rolls",
    price: 14.99,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 3,
    name: "Lemon Tart",
    price: 16.99,
    image: "/placeholder.svg?height=100&width=100",
  },
];

export default function OrderConfirmationPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Confirmation Message */}
      <div className="text-center mb-8">
        <CheckCircle2 className="mx-auto h-16 w-16 text-green-500 mb-4" />
        <h1 className="text-3xl font-bold mb-2">Thank You for Your Order!</h1>
        <p className="text-xl text-muted-foreground">
          Your order number is <span className="font-semibold">{order.id}</span>
        </p>
      </div>

      {/* Order Details */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Order Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {order.items.map((item) => (
              <div key={item.id} className="flex justify-between">
                <span>
                  {item.name} x {item.quantity}
                </span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <div className="border-t pt-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${order.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Fee</span>
                <span>${order.deliveryFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>${order.tax.toFixed(2)}</span>
              </div>
            </div>
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>${order.total.toFixed(2)}</span>
            </div>
          </div>
          <div className="mt-6 space-y-2">
            <p>
              <span className="font-semibold">Shipping Address:</span>{" "}
              {order.shippingAddress}
            </p>
            <p>
              <span className="font-semibold">Estimated Delivery:</span>{" "}
              {order.estimatedDelivery}
            </p>
          </div>
          <div className="mt-6">
            <Link
              href="/order-tracking"
              className="text-primary hover:underline"
            >
              Track Your Order
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Next Steps and Recommendations */}
      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-bold mb-4">What's Next?</h2>
          <p className="text-muted-foreground">
            Your order will be processed and prepared for delivery. You'll
            receive an email confirmation shortly with more details about your
            order and tracking information.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-4">You Might Also Like</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {recommendedProducts.map((product) => (
              <Card key={product.id}>
                <CardContent className="p-4">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={100}
                    height={100}
                    className="rounded-md mb-2"
                  />
                  <h3 className="font-semibold">{product.name}</h3>
                  <p className="text-muted-foreground">
                    ${product.price.toFixed(2)}
                  </p>
                  <Button className="w-full mt-2">Add to Cart</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
