"use client";
import { createContext, useContext, useState, useEffect } from "react";

// Cart items keep a stable id + quantity, plus optional cached display
// fields so the cart/checkout UIs can render without an extra fetch.
export interface CartItem {
  id: string;
  quantity: number;
  name?: string;
  price?: number;
  image?: string;
}

interface CartContextType {
  cartState: {
    cart: CartItem[];
    isCartOpen: boolean;
  };
  addToCart: (item: CartItem) => void;
  toggleCart: () => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const STORAGE_KEY = "cart";

const persist = (cart: CartItem[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  }
};

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Load cart from localStorage on mount.
  useEffect(() => {
    const saved =
      typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null;
    if (saved) {
      try {
        setCart(JSON.parse(saved));
      } catch {
        // Ignore malformed storage.
      }
    }
  }, []);

  const toggleCart = () => setIsCartOpen((prev) => !prev);

  const addToCart = (itemToAdd: CartItem) => {
    setCart((prevCart) => {
      const existing = prevCart.find((i) => i.id === itemToAdd.id);
      const next = existing
        ? prevCart.map((i) =>
            i.id === itemToAdd.id
              ? { ...i, ...itemToAdd, quantity: i.quantity + itemToAdd.quantity }
              : i
          )
        : [...prevCart, itemToAdd];
      persist(next);
      return next;
    });
  };

  const updateQuantity = (id: string, quantity: number) => {
    setCart((prevCart) => {
      const next =
        quantity <= 0
          ? prevCart.filter((i) => i.id !== id)
          : prevCart.map((i) => (i.id === id ? { ...i, quantity } : i));
      persist(next);
      return next;
    });
  };

  const removeFromCart = (id: string) => {
    setCart((prevCart) => {
      const next = prevCart.filter((i) => i.id !== id);
      persist(next);
      return next;
    });
  };

  const clearCart = () => {
    setCart([]);
    persist([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartState: { cart, isCartOpen },
        addToCart,
        toggleCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
