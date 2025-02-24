"use client";

import React, { useEffect, useReducer, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import UploadThing from "@/components/upload/UploadButton";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import for toast notifications
import Section from "@/components/reusable-component/Section";
import InputField from "@/components/reusable-component/InputField";
import TextareaField from "@/components/reusable-component/TextareaField";
import SelectField from "@/components/reusable-component/SelectField";
import Tooltip from "@/components/reusable-component/Tooltip"; // Tooltip component
import { getProductById, updateProduct } from "@/utils/api";
import { useRouter, useSearchParams } from "next/navigation"; // Correct usage of useRouter from Next.js 13

interface ImageObject {
  url: string;
  name: string;
  key: string;
}

// Reducer to manage image state (add, delete)
const imageReducer = (state: ImageObject[], action: any) => {
  switch (action.type) {
    case "ADD_IMAGES":
      // Replace the current images with the new ones from the payload (avoid duplication)
      return [
        ...new Set(
          action.payload.map((img: ImageObject) => JSON.stringify(img))
        ),
      ].map((img) => JSON.parse(img));
    case "DELETE_IMAGE":
      return state.filter((img) => img.key !== action.payload);
    default:
      return state;
  }
};

export default function EditProductPage() {
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productIngredients, setProductIngredients] = useState("");
  const [productAllergens, setProductAllergens] = useState("");
  const [dietaryLabel, setDietaryLabel] = useState("");
  const [productCalories, setProductCalories] = useState("");
  const [productMacronutrients, setProductMacronutrients] = useState("");
  const [productSize, setProductSize] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productWeight, setProductWeight] = useState("");
  const [productShelfLife, setProductShelfLife] = useState("");
  const [productStorageInstructions, setProductStorageInstructions] =
    useState("");
  const [productServing, setProductServing] = useState("");
  const [productVariations, setProductVariations] = useState("");
  const [productCustomization, setProductCustomization] = useState("");
  const [seasonalAvailability, setSeasonalAvailability] = useState("");
  const [images, dispatch] = useReducer(imageReducer, []);
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const searchParams = useSearchParams();
  const productId = searchParams.get("id"); // Extract productId from the URL

  // Fetch product data when the component mounts
  useEffect(() => {
    setLoading(true);
    const fetchProductData = async () => {
      if (!productId) return;

      try {
        const product = await getProductById(productId as string);

        setProductName(product.name);
        setProductPrice(product.price);
        setProductDescription(product.description);
        setProductIngredients(product.ingredients);
        setProductAllergens(product.allergens);
        setDietaryLabel(product.dietaryLabel);
        setProductCalories(product.calories);
        setProductMacronutrients(product.macronutrients);
        setProductSize(product.size);
        setProductCategory(product.category);
        setProductWeight(product.weight);
        setProductShelfLife(product.shelfLife);
        setProductStorageInstructions(product.storageInstructions);
        setProductServing(product.servingSuggestions);
        setProductVariations(product.variations);
        setProductCustomization(product.customizationOptions);
        setSeasonalAvailability(product.seasonalAvailability);

        // Replace images with the fetched product's images
        dispatch({
          type: "ADD_IMAGES",
          payload: product.images,
        });
      } catch (error) {
        toast.error("Failed to load product data.");
      } finally {
        setLoading(false);
      }
    };

    fetchProductData();
  }, [productId]);

  const handleAddImages = (newImages: ImageObject[]) => {
    dispatch({ type: "ADD_IMAGES", payload: [...images, ...newImages] });
  };

  const handleDeleteImage = (imageKey: string) => {
    dispatch({ type: "DELETE_IMAGE", payload: imageKey });
    toast.success("Image deleted successfully!");
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const updatedProductData = {
      name: productName,
      price: Number(productPrice),
      category: productCategory,
      description: productDescription,
      ingredients: productIngredients,
      allergens: productAllergens,
      dietaryLabel: dietaryLabel,
      calories: Number(productCalories),
      macronutrients: productMacronutrients,
      size: productSize,
      weight: productWeight,
      shelfLife: productShelfLife,
      storageInstructions: productStorageInstructions,
      servingSuggestions: productServing,
      variations: productVariations,
      customizationOptions: productCustomization,
      seasonalAvailability: seasonalAvailability,
      images: images.map((img) => img),
    };

    try {
      await updateProduct(productId, updatedProductData);
      toast.success("Product updated successfully!");
      router.push("/business/dashboard/products");
    } catch (error) {
      toast.error("Failed to update product.");
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  } else {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 key={"title"} className="text-3xl font-bold mb-6">
          Edit Product
        </h1>

        <Card key={"Card"}>
          <CardHeader>
            <CardTitle>Product Information</CardTitle>
          </CardHeader>

          <CardContent>
            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Section: Basic Information */}
              <Section title="Basic Information">
                <div className="grid md:grid-cols-2 gap-6">
                  <InputField
                    id="product-name"
                    label="Product Name *"
                    placeholder="E.g., Chocolate Chip Cookies"
                    required
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    tooltip={
                      <Tooltip message="Clearly describe the item, including main ingredients and flavors." />
                    }
                  />
                  <InputField
                    id="product-price"
                    label="Price ($) *"
                    type="number"
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                    required
                    value={productPrice}
                    onChange={(e) => setProductPrice(e.target.value)}
                  />
                </div>
                <SelectField
                  id="product-category"
                  label="Category *"
                  options={["Bread", "Pastry", "Cake", "Cookie"]}
                  value={productCategory}
                  onChange={(value) => setProductCategory(value)} // Directly use value
                  required
                />
                <TextareaField
                  id="product-description"
                  label="Product Description"
                  placeholder="E.g., Soft, chewy cookies with rich chocolate chips."
                  value={productDescription}
                  onChange={(e) => setProductDescription(e.target.value)}
                  tooltip={
                    <Tooltip message="Provide details about the product's texture, taste, and characteristics." />
                  }
                />
              </Section>

              {/* Section: Ingredients and Allergens */}
              <Section title="Ingredients and Allergens">
                <TextareaField
                  id="product-ingredients"
                  label="Ingredients *"
                  placeholder="E.g., Flour, Sugar, Butter, Chocolate Chips"
                  value={productIngredients}
                  onChange={(e) => setProductIngredients(e.target.value)}
                  tooltip={
                    <Tooltip message="List all ingredients, highlighting allergens." />
                  }
                />
                <InputField
                  id="product-allergens"
                  label="Allergens"
                  placeholder="E.g., Contains Dairy, Gluten"
                  value={productAllergens}
                  onChange={(e) => setProductAllergens(e.target.value)}
                  tooltip={
                    <Tooltip message="Specify any allergens, such as nuts or gluten." />
                  }
                />
                <SelectField
                  id="dietary-label"
                  label="Dietary Labels"
                  options={["None", "Gluten-Free", "Vegan", "Sugar-Free"]}
                  value={dietaryLabel}
                  onChange={(value) => setDietaryLabel(value)} // Directly use value
                />
              </Section>

              {/* Other sections omitted for brevity */}
              {/* Section: Nutritional Information */}
              <Section title="Nutritional Information">
                <div className="grid md:grid-cols-2 gap-6">
                  <InputField
                    id="product-calories"
                    label="Calories"
                    type="number"
                    placeholder="E.g., 250"
                    value={productCalories}
                    onChange={(e) => setProductCalories(e.target.value)}
                  />
                  <InputField
                    id="product-macronutrients"
                    label="Macronutrients"
                    placeholder="E.g., 12g Fat, 20g Carbs, 5g Protein"
                    value={productMacronutrients}
                    onChange={(e) => setProductMacronutrients(e.target.value)}
                    tooltip={
                      <Tooltip message="Include a breakdown of macronutrients if available." />
                    }
                  />
                </div>
              </Section>

              {/* Section: Size, Weight, and Shelf Life */}
              <Section title="Size, Weight, and Shelf Life">
                <div className="grid md:grid-cols-3 gap-6">
                  <InputField
                    id="product-size"
                    label="Size"
                    placeholder="E.g., Medium"
                    value={productSize}
                    onChange={(e) => setProductSize(e.target.value)}
                    tooltip={
                      <Tooltip message="Specify the product size (e.g., Small, Medium, Large)." />
                    }
                  />
                  <InputField
                    id="product-weight"
                    label="Weight"
                    placeholder="E.g., 500g"
                    value={productWeight}
                    onChange={(e) => setProductWeight(e.target.value)}
                  />
                  <InputField
                    id="product-shelf-life"
                    label="Shelf Life"
                    placeholder="E.g., 1 week"
                    value={productShelfLife}
                    onChange={(e) => setProductShelfLife(e.target.value)}
                    tooltip={
                      <Tooltip message="Indicate how long the product stays fresh." />
                    }
                  />
                </div>
                <InputField
                  id="product-storage"
                  label="Storage Instructions"
                  placeholder="E.g., Keep refrigerated."
                  value={productStorageInstructions}
                  onChange={(e) =>
                    setProductStorageInstructions(e.target.value)
                  }
                />
              </Section>

              {/* Section: Serving Suggestions */}
              <Section title="Serving Suggestions">
                <TextareaField
                  id="product-serving"
                  label="Serving Suggestions"
                  placeholder="E.g., Serve warm with a glass of milk."
                  value={productServing}
                  onChange={(e) => setProductServing(e.target.value)}
                />
              </Section>

              {/* Section: Variations and Customization */}
              <Section title="Variations and Customization">
                <InputField
                  id="product-variations"
                  label="Available Variations"
                  placeholder="E.g., Different flavors or sizes."
                  value={productVariations}
                  onChange={(e) => setProductVariations(e.target.value)}
                />
                <InputField
                  id="product-customization"
                  label="Customization Options"
                  placeholder="E.g., Custom orders for birthdays."
                  value={productCustomization}
                  onChange={(e) => setProductCustomization(e.target.value)}
                />
              </Section>

              {/* Section: Seasonal Availability */}
              <Section title="Seasonal Availability">
                <SelectField
                  id="seasonal-availability"
                  label="Seasonal Availability"
                  options={["Year-round", "Seasonal"]}
                  value={seasonalAvailability}
                  onChange={(value) => setSeasonalAvailability(value)} // Directly use value
                />
              </Section>
              {/* Section: Product Images */}

              <Section title="Product Images">
                <UploadThing
                  images={images}
                  onAddImages={handleAddImages}
                  onDeleteImage={handleDeleteImage}
                />
              </Section>

              {/* Form Buttons */}
              <div className="flex justify-end space-x-4">
                <Button variant="outline">Save as Draft</Button>
                <Button type="submit">Update Product</Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <ToastContainer />
      </div>
    );
  }
}
