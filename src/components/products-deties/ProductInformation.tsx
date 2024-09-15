import React, { useEffect, useState } from "react";
import { Star, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import SelectField from "../reusable-component/SelectField";

interface InfoData {
  name: string;
  rating: number;
  reviewCount: number;
  price: number;
  description: string;
  ingredients?: string;
  allergens?: string;
  size?: string;
  availability?: string;
  options?: string[]; // For size selection
}

interface ProductInformationProps {
  productInfoData: InfoData;
}

const ProductInformation: React.FC<ProductInformationProps> = ({
  productInfoData,
}) => {
  const [selectedSize, setSelectedSize] = useState<string | undefined>(
    productInfoData.options?.[0]
  );
  const [quantity, setQuantity] = useState<number>(1);

  const handleQuantityChange = (amount: number) => {
    setQuantity((prev) => Math.max(1, prev + amount));
  };
  const [cart, setCart] = useState<any[]>([]);

  useEffect(() => {
    // Check if there's a saved cart in localStorage when the component mounts
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);
  const handleAddToCart = () => {
    const cartItem = {
      size: selectedSize,
      quantity,
    };

    if (false) {
      console.log("Add to Cart (Logged In):", cartItem);
      // Logic to add the item to the cart for logged-in users
    } else {
      console.log("Add to Cart (Unregistered):", cartItem);

      let updatedCart = [...cart, cartItem];
      setCart(updatedCart);

      // Save the updated cart in localStorage
      localStorage.setItem("cart", JSON.stringify(updatedCart));

      alert(
        "Item added to the cart! You can continue shopping or proceed to checkout later."
      );
    }
  };

  const renderStars = (rating: number) => {
    return Array(5)
      .fill(null)
      .map((_, i) => (
        <Star
          key={i}
          className={`w-5 h-5 ${
            i < Math.floor(rating)
              ? "text-yellow-400 fill-current"
              : "text-gray-300"
          }`}
        />
      ));
  };

  return (
    <div className="w-full lg:w-1/2">
      {/* Product Title */}
      <h1 className="text-3xl font-bold mb-4">{productInfoData.name}</h1>

      {/* Rating and Reviews */}
      <div className="flex items-center gap-2 mb-4">
        <div className="flex">{renderStars(productInfoData.rating)}</div>
        <span className="text-sm text-gray-600">
          ({productInfoData.reviewCount} reviews)
        </span>
      </div>

      {/* Price */}
      <p className="text-2xl font-bold text-primary mb-4">
        ${Number(productInfoData.price).toFixed(2)}
      </p>

      {/* Description */}
      <p className="text-gray-700 mb-6">{productInfoData.description}</p>

      {/* Additional Information */}
      <div className="mb-6">
        <h3 className="font-semibold mb-2">Ingredients:</h3>
        <p className="text-sm text-gray-600">
          {productInfoData.ingredients || "N/A"}
        </p>
      </div>

      <div className="mb-6">
        <h3 className="font-semibold mb-2">Allergens:</h3>
        <p className="text-sm text-gray-600">
          {productInfoData.allergens || "None"}
        </p>
      </div>

      <div className="mb-6">
        <h3 className="font-semibold mb-2">Size:</h3>
        <p className="text-sm text-gray-600">{productInfoData.size || "N/A"}</p>
      </div>

      <div className="mb-6">
        <h3 className="font-semibold mb-2">Availability:</h3>
        <p
          className={`text-sm ${
            productInfoData.availability !== "Out of Stock"
              ? "text-green-600"
              : "text-red-600"
          }`}
        >
          {productInfoData.availability || "Out of Stock"}
        </p>
      </div>

      {/* Size Selection */}
      {productInfoData.options && productInfoData.options.length > 0 && (
        <div className="mb-6">
          <SelectField
            label={"Size"}
            options={productInfoData.options}
            onChange={setSelectedSize}
            value={selectedSize}
          />
        </div>
      )}

      {/* Quantity Selection */}
      <div className="flex items-center gap-4 mb-6">
        <label className="text-sm font-medium text-gray-700">Quantity</label>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={() => handleQuantityChange(-1)}
            disabled={quantity <= 1}
          >
            <Minus />
          </Button>
          <span>{quantity}</span>
          <Button variant="outline" onClick={() => handleQuantityChange(1)}>
            <Plus />
          </Button>
        </div>
      </div>

      {/* Add to Cart Button */}
      <Button
        onClick={handleAddToCart}
        disabled={productInfoData.availability == "Out of Stock"}
        className="w-full"
      >
        Add to Cart
      </Button>
    </div>
  );
};

export default ProductInformation;
