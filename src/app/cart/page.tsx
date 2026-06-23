"use client";
import Link from "next/link";
import { Minus, Plus, Trash2, ShoppingCart } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useCart } from "@/context/CartContext";
import { formatCurrency } from "@/lib/currency";
import { EmptyState } from "@/components/feedback/EmptyState";

const DELIVERY_FEE = 5.99;
const TAX_RATE = 0.1;

export default function CartPage() {
  const { cartState, updateQuantity, removeFromCart } = useCart();
  const { cart } = cartState;

  const subtotal = cart.reduce(
    (acc, item) => acc + (item.price ?? 0) * item.quantity,
    0
  );
  const deliveryFee = cart.length > 0 ? DELIVERY_FEE : 0;
  const tax = subtotal * TAX_RATE;
  const total = subtotal + deliveryFee + tax;

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
        <EmptyState
          icon={<ShoppingCart className="h-12 w-12" />}
          title="Your cart is empty"
          message="Browse our treats and add something sweet to get started."
          actionLabel="Browse products"
          actionHref="/products"
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Product</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead className="text-right">Total</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cart.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name || "Product"}
                      width={80}
                      height={80}
                      className="rounded-md object-cover h-20 w-20"
                    />
                  </TableCell>
                  <TableCell className="font-medium">
                    {item.name || "Product"}
                  </TableCell>
                  <TableCell>{formatCurrency(item.price ?? 0)}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 rounded-full"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                      >
                        <Minus className="h-4 w-4" />
                        <span className="sr-only">Decrease quantity</span>
                      </Button>
                      <Input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) =>
                          updateQuantity(item.id, Number(e.target.value))
                        }
                        className="w-16 text-center"
                      />
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 rounded-full"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                      >
                        <Plus className="h-4 w-4" />
                        <span className="sr-only">Increase quantity</span>
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    {formatCurrency((item.price ?? 0) * item.quantity)}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Remove item</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
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
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>{formatCurrency(total)}</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" asChild>
                <Link href="/cart/checkout">Proceed to Checkout</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
