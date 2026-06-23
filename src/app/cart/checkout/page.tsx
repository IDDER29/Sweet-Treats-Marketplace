"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { CreditCard, Banknote, Loader2 } from "lucide-react";
import { toast } from "react-toastify";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { useCart } from "@/context/CartContext";
import { formatCurrency } from "@/lib/currency";
import { createOrder } from "@/services/orders";
import type { OrderItem } from "@/types";

const DELIVERY_FEE = 5.99;
const TAX_RATE = 0.1;

export default function CheckoutPage() {
  const router = useRouter();
  const { cartState, clearCart } = useCart();
  const { cart } = cartState;

  const [shippingInfo, setShippingInfo] = useState({
    name: "",
    address: "",
    city: "",
    phone: "",
    instructions: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [submitting, setSubmitting] = useState(false);

  const handleShippingInfoChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value });
  };

  const subtotal = cart.reduce(
    (acc, item) => acc + (item.price ?? 0) * item.quantity,
    0
  );
  const deliveryFee = cart.length > 0 ? DELIVERY_FEE : 0;
  const tax = subtotal * TAX_RATE;
  const total = subtotal + deliveryFee + tax;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (cart.length === 0) return;

    const items: OrderItem[] = cart.map((i) => ({
      productId: i.id,
      name: i.name ?? "Product",
      price: i.price ?? 0,
      quantity: i.quantity,
      image: i.image,
    }));

    setSubmitting(true);
    try {
      const order = await createOrder({
        items,
        shippingAddress: {
          fullName: shippingInfo.name,
          line1: shippingInfo.address,
          city: shippingInfo.city,
          phone: shippingInfo.phone,
          instructions: shippingInfo.instructions,
        },
        paymentMethod,
      });
      clearCart();
      router.push(
        `/cart/checkout/order-confirmation?orderId=${encodeURIComponent(
          order.id
        )}`
      );
    } catch {
      toast.error("We couldn't place your order. Please try again.");
      setSubmitting(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Checkout</h1>
        <p className="text-muted-foreground mb-6">
          Your cart is empty — add something before checking out.
        </p>
        <Button asChild>
          <Link href="/products">Browse products</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      <form onSubmit={handleSubmit} className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Shipping Information */}
          <Card>
            <CardHeader>
              <CardTitle>Shipping Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={shippingInfo.name}
                  onChange={handleShippingInfoChange}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="address">Address</Label>
                <Textarea
                  id="address"
                  name="address"
                  value={shippingInfo.address}
                  onChange={handleShippingInfoChange}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  name="city"
                  value={shippingInfo.city}
                  onChange={handleShippingInfoChange}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={shippingInfo.phone}
                  onChange={handleShippingInfoChange}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="instructions">
                  Delivery Instructions (Optional)
                </Label>
                <Textarea
                  id="instructions"
                  name="instructions"
                  value={shippingInfo.instructions}
                  onChange={handleShippingInfoChange}
                />
              </div>
            </CardContent>
          </Card>

          {/* Payment method. No raw card fields are collected here — online
              card payments go through a PCI-compliant provider (Stripe) as a
              hosted checkout/redirect, which is the documented next step. */}
          <Card>
            <CardHeader>
              <CardTitle>Payment Method</CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={paymentMethod}
                onValueChange={setPaymentMethod}
                className="space-y-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="cod" id="cod" />
                  <Label
                    htmlFor="cod"
                    className="flex items-center space-x-2"
                  >
                    <Banknote className="h-4 w-4" />
                    <span>Cash on Delivery</span>
                  </Label>
                </div>
                <div className="flex items-center space-x-2 opacity-60">
                  <RadioGroupItem value="card" id="card" disabled />
                  <Label
                    htmlFor="card"
                    className="flex items-center space-x-2"
                  >
                    <CreditCard className="h-4 w-4" />
                    <span>Pay by card online (coming soon)</span>
                  </Label>
                </div>
              </RadioGroup>
              <p className="mt-3 text-xs text-muted-foreground">
                Online card payments will be processed securely by our payment
                provider. We never store your card details.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Order Summary */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between">
                  <span>
                    {(item.name ?? "Product")} x {item.quantity}
                  </span>
                  <span>
                    {formatCurrency((item.price ?? 0) * item.quantity)}
                  </span>
                </div>
              ))}
              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  <span>{formatCurrency(deliveryFee)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>{formatCurrency(tax)}</span>
                </div>
              </div>
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>{formatCurrency(total)}</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full" disabled={submitting}>
                {submitting && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                {submitting ? "Placing order…" : "Place Order"}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </form>
    </div>
  );
}
