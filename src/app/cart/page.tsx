"use client";
import Link from "next/link";
import { Minus, Plus, Trash2, ShoppingCart, ShieldCheck, RotateCcw, Leaf } from "lucide-react";

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
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/context/CartContext";
import { formatCurrency } from "@/lib/currency";
import { EmptyState } from "@/components/feedback/EmptyState";

const DELIVERY_FEE = 5.99;
const TAX_RATE = 0.1;
const FREE_DELIVERY_THRESHOLD = 30;

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

  const itemCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const amountUntilFreeDelivery = Math.max(0, FREE_DELIVERY_THRESHOLD - subtotal);
  const freeDeliveryProgress = Math.min(100, (subtotal / FREE_DELIVERY_THRESHOLD) * 100);

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        {/* Progress bar — empty state */}
        <nav aria-label="Checkout steps" className="mb-8">
          <ol className="flex items-center justify-center gap-2 text-sm">
            <li className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-500 text-white text-xs font-bold">1</span>
              <span className="font-semibold text-amber-600">Cart</span>
            </li>
            <li className="h-px w-8 bg-muted-foreground/30" />
            <li className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-muted text-muted-foreground text-xs font-bold">2</span>
              <span className="text-muted-foreground">Shipping</span>
            </li>
            <li className="h-px w-8 bg-muted-foreground/30" />
            <li className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-muted text-muted-foreground text-xs font-bold">3</span>
              <span className="text-muted-foreground">Payment</span>
            </li>
          </ol>
        </nav>
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
      {/* Checkout progress breadcrumb */}
      <nav aria-label="Checkout steps" className="mb-8">
        <ol className="flex items-center justify-center gap-2 text-sm">
          <li className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-500 text-white text-xs font-bold">1</span>
            <span className="font-semibold text-amber-600">Cart</span>
          </li>
          <li className="h-px w-8 bg-muted-foreground/30" />
          <li className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-muted text-muted-foreground text-xs font-bold">2</span>
            <span className="text-muted-foreground">Shipping</span>
          </li>
          <li className="h-px w-8 bg-muted-foreground/30" />
          <li className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-muted text-muted-foreground text-xs font-bold">3</span>
            <span className="text-muted-foreground">Payment</span>
          </li>
        </ol>
      </nav>

      <h1 className="text-2xl md:text-3xl font-bold mb-6">
        Your Cart{" "}
        <span className="text-muted-foreground font-normal text-lg">
          ({itemCount} {itemCount === 1 ? "item" : "items"})
        </span>
      </h1>

      {/* Free delivery threshold bar */}
      {subtotal < FREE_DELIVERY_THRESHOLD && (
        <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3">
          <p className="text-sm text-amber-800 mb-2 font-medium">
            Add{" "}
            <span className="font-bold">{formatCurrency(amountUntilFreeDelivery)}</span>{" "}
            more for free delivery!
          </p>
          <div className="h-2 w-full rounded-full bg-amber-200">
            <div
              className="h-2 rounded-full bg-amber-500 transition-all duration-500"
              style={{ width: `${freeDeliveryProgress}%` }}
            />
          </div>
        </div>
      )}
      {subtotal >= FREE_DELIVERY_THRESHOLD && (
        <div className="mb-6 rounded-xl border border-green-200 bg-green-50 px-4 py-3">
          <p className="text-sm text-green-800 font-medium">
            🎉 You qualify for free delivery!
          </p>
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {/* Desktop table — hidden on mobile */}
          <div className="hidden md:block">
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
                        className="h-8 w-8 text-muted-foreground hover:text-destructive"
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

          {/* Mobile card list — hidden on desktop */}
          <div className="md:hidden space-y-4">
            {cart.map((item) => (
              <Card key={item.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex gap-4 p-4">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name || "Product"}
                      className="h-24 w-24 rounded-lg object-cover flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-base leading-tight mb-1 truncate">
                        {item.name || "Product"}
                      </p>
                      <p className="text-sm text-muted-foreground mb-3">
                        {formatCurrency(item.price ?? 0)} each
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 rounded-full"
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                          >
                            <Minus className="h-3 w-3" />
                            <span className="sr-only">Decrease quantity</span>
                          </Button>
                          <span className="w-8 text-center font-medium text-sm">
                            {item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 rounded-full"
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                          >
                            <Plus className="h-3 w-3" />
                            <span className="sr-only">Increase quantity</span>
                          </Button>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="font-bold text-amber-700">
                            {formatCurrency((item.price ?? 0) * item.quantity)}
                          </span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-muted-foreground hover:text-destructive"
                            onClick={() => removeFromCart(item.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Remove item</span>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Order summary */}
        <div>
          <Card className="border-2 border-amber-100">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal ({itemCount} items)</span>
                <span className="font-medium">{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Delivery Fee</span>
                <span className="font-medium">
                  {subtotal >= FREE_DELIVERY_THRESHOLD ? (
                    <span className="text-green-600">Free</span>
                  ) : (
                    formatCurrency(deliveryFee)
                  )}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Tax</span>
                <span className="font-medium">{formatCurrency(tax)}</span>
              </div>
              <Separator />
              <div className="flex justify-between items-baseline">
                <span className="font-bold text-lg">Total</span>
                <span className="font-extrabold text-2xl text-amber-700">
                  {formatCurrency(
                    subtotal >= FREE_DELIVERY_THRESHOLD
                      ? subtotal + tax
                      : total
                  )}
                </span>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-3 pt-0">
              <Button
                className="w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold h-12 text-base"
                asChild
              >
                <Link href="/cart/checkout">Proceed to Checkout</Link>
              </Button>

              {/* Trust signals */}
              <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground pt-1">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="h-3.5 w-3.5 text-green-600" />
                  Secure checkout
                </span>
                <span className="flex items-center gap-1">
                  <RotateCcw className="h-3.5 w-3.5 text-blue-600" />
                  30-day returns
                </span>
                <span className="flex items-center gap-1">
                  <Leaf className="h-3.5 w-3.5 text-emerald-600" />
                  Fresh guarantee
                </span>
              </div>
            </CardFooter>
          </Card>

          <p className="mt-4 text-center text-sm text-muted-foreground">
            <Link href="/products" className="underline underline-offset-2 hover:text-foreground">
              Continue shopping
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
