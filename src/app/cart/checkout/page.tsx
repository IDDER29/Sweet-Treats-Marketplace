"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { CreditCard, Banknote, Loader2, CheckCircle2 } from "lucide-react";
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
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
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
    state: "",
    zip: "",
    country: "",
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
      {/* Step indicator */}
      <nav aria-label="Checkout steps" className="mb-8">
        <ol className="flex items-center justify-center gap-2 text-sm">
          <li className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-green-500 text-white text-xs">
              <CheckCircle2 className="h-4 w-4" />
            </span>
            <span className="text-muted-foreground">Cart</span>
          </li>
          <li className="h-px w-8 bg-amber-400" />
          <li className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-500 text-white text-xs font-bold">2</span>
            <span className="font-semibold text-amber-600">Shipping</span>
          </li>
          <li className="h-px w-8 bg-muted-foreground/30" />
          <li className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-muted text-muted-foreground text-xs font-bold">3</span>
            <span className="text-muted-foreground">Payment</span>
          </li>
        </ol>
      </nav>

      <h1 className="text-2xl md:text-3xl font-bold mb-8">Checkout</h1>

      <form onSubmit={handleSubmit} className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Section 1 — Shipping Information */}
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-3">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-amber-500 text-white text-sm font-bold flex-shrink-0">
                  1
                </span>
                Shipping Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Jane Smith"
                  value={shippingInfo.name}
                  onChange={handleShippingInfoChange}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="address">Street Address</Label>
                <Textarea
                  id="address"
                  name="address"
                  placeholder="123 Maple Street, Apt 4B"
                  value={shippingInfo.address}
                  onChange={handleShippingInfoChange}
                  required
                  rows={2}
                />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    name="city"
                    placeholder="New York"
                    value={shippingInfo.city}
                    onChange={handleShippingInfoChange}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="state">State / Province</Label>
                  <Input
                    id="state"
                    name="state"
                    placeholder="NY"
                    value={shippingInfo.state}
                    onChange={handleShippingInfoChange}
                  />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="zip">ZIP / Postal Code</Label>
                  <Input
                    id="zip"
                    name="zip"
                    placeholder="10001"
                    value={shippingInfo.zip}
                    onChange={handleShippingInfoChange}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="country">Country</Label>
                  <Input
                    id="country"
                    name="country"
                    placeholder="United States"
                    value={shippingInfo.country}
                    onChange={handleShippingInfoChange}
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  value={shippingInfo.phone}
                  onChange={handleShippingInfoChange}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="instructions">
                  Delivery Instructions{" "}
                  <span className="text-muted-foreground font-normal">(Optional)</span>
                </Label>
                <Textarea
                  id="instructions"
                  name="instructions"
                  placeholder="Leave at the door, ring doorbell twice…"
                  value={shippingInfo.instructions}
                  onChange={handleShippingInfoChange}
                  rows={2}
                />
              </div>
            </CardContent>
          </Card>

          {/* Section 2 — Payment Method */}
          {/* No raw card fields are collected here — online card payments go
              through a PCI-compliant provider (Stripe) as a hosted checkout/redirect,
              which is the documented next step. */}
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-3">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-amber-500 text-white text-sm font-bold flex-shrink-0">
                  2
                </span>
                Payment Method
              </CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={paymentMethod}
                onValueChange={setPaymentMethod}
                className="space-y-3"
              >
                {/* Cash on Delivery option */}
                <label
                  htmlFor="cod"
                  className={`flex items-start gap-4 rounded-xl border-2 p-4 cursor-pointer transition-colors ${
                    paymentMethod === "cod"
                      ? "border-green-500 bg-green-50"
                      : "border-muted hover:border-muted-foreground/40"
                  }`}
                >
                  <RadioGroupItem value="cod" id="cod" className="mt-0.5" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Banknote className="h-4 w-4 text-green-700" />
                      <span className="font-semibold text-sm">Cash on Delivery</span>
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100 text-xs">
                        Available now
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Pay with cash when your order arrives. No card needed — just have
                      the exact amount ready for the driver.
                    </p>
                  </div>
                </label>

                {/* Card online option — coming soon */}
                <label
                  htmlFor="card"
                  className="flex items-start gap-4 rounded-xl border-2 border-muted p-4 opacity-50 cursor-not-allowed"
                >
                  <RadioGroupItem value="card" id="card" disabled className="mt-0.5" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <CreditCard className="h-4 w-4" />
                      <span className="font-semibold text-sm">Pay by card online</span>
                      <Badge variant="secondary" className="text-xs">Coming soon</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Secure card payments via our payment provider. We never store your
                      card details.
                    </p>
                  </div>
                </label>
              </RadioGroup>
            </CardContent>
          </Card>
        </div>

        {/* Order Summary — sticky on desktop */}
        <div className="lg:self-start lg:sticky lg:top-24">
          <Card className="border-2 border-amber-100">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    {item.name ?? "Product"}{" "}
                    <span className="font-medium text-foreground">× {item.quantity}</span>
                  </span>
                  <span className="font-medium">
                    {formatCurrency((item.price ?? 0) * item.quantity)}
                  </span>
                </div>
              ))}
              <Separator />
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Delivery Fee</span>
                  <span>{formatCurrency(deliveryFee)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax</span>
                  <span>{formatCurrency(tax)}</span>
                </div>
              </div>
              <Separator />
              <div className="flex justify-between items-baseline pt-1">
                <span className="font-bold text-lg">Total</span>
                <span className="font-extrabold text-2xl text-amber-700">
                  {formatCurrency(total)}
                </span>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-2 pt-0">
              <Button
                type="submit"
                className="w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold h-12 text-base"
                disabled={submitting}
              >
                {submitting && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                {submitting ? "Placing order…" : "Place Order"}
              </Button>
              <p className="text-xs text-muted-foreground text-center leading-relaxed pt-1">
                By placing your order, you agree to our{" "}
                <Link href="/terms" className="underline underline-offset-2 hover:text-foreground">
                  Terms of Service
                </Link>
                .
              </p>
            </CardFooter>
          </Card>
        </div>
      </form>
    </div>
  );
}
