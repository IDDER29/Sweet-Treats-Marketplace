"use client";
import { useState } from "react";
import { CreditCard, PlayIcon } from "lucide-react";

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

// Mock data for cart items (you would typically get this from a cart state or API)
const cartItems = [
  { id: 1, name: "Chocolate Cake", price: 25.99, quantity: 1 },
  { id: 2, name: "Strawberry Tart", price: 18.99, quantity: 2 },
  { id: 3, name: "Macarons Set", price: 15.99, quantity: 1 },
];

export default function CheckoutPage() {
  const [shippingInfo, setShippingInfo] = useState({
    name: "",
    address: "",
    phone: "",
    instructions: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("credit-card");

  const handleShippingInfoChange = (e) => {
    setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the order data to your backend
    console.log("Order submitted", { shippingInfo, paymentMethod });
    // Then redirect to the order confirmation page
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const deliveryFee = 5.99;
  const tax = subtotal * 0.1; // Assuming 10% tax
  const total = subtotal + deliveryFee + tax;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      <form onSubmit={handleSubmit} className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Shipping Information Form */}
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

          {/* Payment Information Section */}
          <Card>
            <CardHeader>
              <CardTitle>Payment Information</CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={paymentMethod}
                onValueChange={setPaymentMethod}
                className="space-y-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="credit-card" id="credit-card" />
                  <Label
                    htmlFor="credit-card"
                    className="flex items-center space-x-2"
                  >
                    <CreditCard className="h-4 w-4" />
                    <span>Credit Card</span>
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="paypal" id="paypal" />
                  <Label
                    htmlFor="paypal"
                    className="flex items-center space-x-2"
                  >
                    <PlayIcon className="h-4 w-4" />
                    <span>PayPal</span>
                  </Label>
                </div>
              </RadioGroup>
              {paymentMethod === "credit-card" && (
                <div className="mt-4 space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="card-number">Card Number</Label>
                    <Input
                      id="card-number"
                      placeholder="1234 5678 9012 3456"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="expiry-date">Expiry Date</Label>
                      <Input id="expiry-date" placeholder="MM/YY" required />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="cvv">CVV</Label>
                      <Input id="cvv" placeholder="123" required />
                    </div>
                  </div>
                </div>
              )}
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
              {cartItems.map((item) => (
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
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  <span>${deliveryFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
              </div>
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full">
                Place Order
              </Button>
            </CardFooter>
          </Card>
        </div>
      </form>
    </div>
  );
}
