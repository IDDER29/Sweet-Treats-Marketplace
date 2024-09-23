"use client";
import { createContext, useContext, useState, useEffect } from "react";

// Define initial cart context types
interface CartItem {
  id: string;
  quantity: number;
}

interface CartContextType {
  cartState: {
    cart: CartItem[];
    isCartOpen: boolean;
  };
  addToCart: (item: CartItem) => void;
  toggleCart: () => void;
  removeFromCart: (id: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Assuming you have a function that checks if the user is logged in
  const isUserRegistered = false; // You can replace this with actual logic

  // Load cart from localStorage on component mount if user is not registered
  useEffect(() => {
    if (!isUserRegistered) {
      const savedCart = localStorage.getItem("cart");
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
    }
  }, [isUserRegistered]);

  // Function to toggle cart visibility
  const toggleCart = () => {
    setIsCartOpen((prevState) => !prevState);
  };

  // Add an item to the cart
  const addToCart = (itemToAdd: CartItem) => {
    setCart((prevCart) => {
      // Check if the item already exists in the cart
      const existingItem = prevCart.find((item) => item.id === itemToAdd.id);

      let updatedCart;

      if (existingItem) {
        // Update the quantity of the existing item
        updatedCart = prevCart.map((item) =>
          item.id === itemToAdd.id
            ? { ...item, quantity: item.quantity + itemToAdd.quantity }
            : item
        );
      } else {
        // Add new item to cart if it doesn't exist
        updatedCart = [...prevCart, itemToAdd];
      }

      // Persist the updated cart to localStorage inside the setCart function
      localStorage.setItem("cart", JSON.stringify(updatedCart));

      return updatedCart; // Return the updated cart
    });
  };

  // Remove an item from the cart
  const removeFromCart = (id: string) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.filter((item) => item.id !== id);

      if (!isUserRegistered) {
        localStorage.setItem("cart", JSON.stringify(updatedCart));
      } else {
        // Call API to update the database
      }

      return updatedCart;
    });
  };

  return (
    <CartContext.Provider
      value={{
        cartState: { cart, isCartOpen },
        addToCart,
        toggleCart,
        removeFromCart,
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
