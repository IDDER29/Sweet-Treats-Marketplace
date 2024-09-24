"use client"; // Ensure this is a client-side component

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { ShoppingCart, X, Plus, Minus, Trash2 } from "lucide-react";
import { useCart } from "@/context/CartContext"; // Import your CartContext
import { getProductById } from "@/utils/api"; // Your API fetch utility
import { toast } from "react-toastify";
import Image from "next/image";
import AuthModals from "./AuthModals";

interface ProductDetails {
  id: string;
  name: string;
  price: number;
  images: [
    {
      key: string;
      url: string;
    }
  ];
}

export default function CartSidePanel() {
  const { cartState, toggleCart, addToCart, removeFromCart } = useCart();
  const { cart, isCartOpen } = cartState;
  const [productDetails, setProductDetails] = useState<
    Record<string, ProductDetails>
  >({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductData = async () => {
      const productIds = cart.map((item) => item.id);
      const fetchedDetails: Record<string, ProductDetails> = {};

      try {
        await Promise.all(
          productIds.map(async (id) => {
            if (!productDetails[id]) {
              const product = await getProductById(id); // Fetch product details by id
              fetchedDetails[id] = product;
            }
          })
        );
        setProductDetails((prevDetails) => ({
          ...prevDetails,
          ...fetchedDetails,
        }));
      } catch (error) {
        toast.error("Failed to load product data.");
      } finally {
        setLoading(false);
      }
    };

    fetchProductData();
  }, [cart]);

  return (
    <div
      className={`fixed inset-y-0 right-0 w-full sm:w-96 bg-background shadow-xl transform ${
        isCartOpen ? "translate-x-0" : "translate-x-full"
      } transition-transform duration-300 ease-in-out z-50`}
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Your Cart</h2>
          <Button variant="ghost" size="icon" onClick={toggleCart}>
            <X className="h-6 w-6" />
          </Button>
        </div>

        {/* Cart Items Section */}
        <ScrollArea className="flex-1 p-4">
          {cart.length > 0 ? (
            cart.map((item) => {
              const product = productDetails[item.id];
              const productImg = product?.images[0].url;

              return (
                <div key={item.id} className="flex items-center space-x-4 mb-4">
                  {product ? (
                    <>
                      <Image
                        src={productImg}
                        alt={product.name}
                        className="w-20 h-20 rounded-md object-cover"
                        height={300}
                        width={300}
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold">{product.name}</h3>
                        <p className="text-sm text-gray-500">
                          ${Number(product.price).toFixed(2)}
                        </p>
                        <div className="flex items-center mt-2">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() =>
                              addToCart({
                                id: item.id,
                                quantity: -1,
                              })
                            }
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <Input
                            type="string"
                            value={item.quantity}
                            className="w-12 mx-2 text-center"
                            readOnly
                            min="1"
                          />
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() =>
                              addToCart({
                                id: item.id,
                                quantity: 1,
                              })
                            }
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="ml-2"
                            onClick={() => removeFromCart(item.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </>
                  ) : (
                    <p>Loading product details...</p>
                  )}
                </div>
              );
            })
          ) : (
            <p className="text-center text-gray-500">Your cart is empty</p>
          )}
        </ScrollArea>

        {/* Subtotal and Checkout Section */}
        <div className="p-4 border-t">
          <div className="flex justify-between mb-2">
            <span>Subtotal:</span>
            <span>
              $
              {cart
                .reduce((total, item) => {
                  const product = productDetails[item.id];
                  return product
                    ? total + product.price * item.quantity
                    : total;
                }, 0)
                .toFixed(2)}
            </span>
          </div>
          <Separator className="my-4" />
          <Button className="w-full" onClick={() => {}}>
            <ShoppingCart className="mr-2 h-4 w-4" /> Proceed to Checkout
          </Button>
        </div>
      </div>
    </div>
  );
}
