"use client";

import React, { useReducer, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import UploadThing from "@/components/upload/UploadButton";
import { toast } from "react-toastify";
import Section from "@/components/reusable-component/Section";
import InputField from "@/components/reusable-component/InputField";
import TextareaField from "@/components/reusable-component/TextareaField";
import SelectField from "@/components/reusable-component/SelectField";
import Tooltip from "@/components/reusable-component/Tooltip";
import { createNewProduct } from "@/utils/api";
import {
  PRODUCT_CATEGORIES,
  DIETARY_LABELS,
  AVAILABILITY_OPTIONS,
} from "@/config";
import { useRouter } from "next/navigation";
import { formatCurrency } from "@/lib/currency";
import {
  ChevronRight,
  ImageIcon,
  Package,
  Tag,
  Layers,
} from "lucide-react";

interface ImageObject {
  url: string;
  name: string;
  key: string;
}

// Reducer to manage image state (add, delete)
const imageReducer = (state: ImageObject[], action: any) => {
  switch (action.type) {
    case "ADD_IMAGES":
      return [...state, ...action.payload];
    case "DELETE_IMAGE":
      return state.filter((img) => img.key !== action.payload);
    default:
      return state;
  }
};

export default function ProductDataEntryPage() {
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
  const [availabilityStatus, setAvailabilityStatus] = useState("In Stock");
  const [images, dispatch] = useReducer(imageReducer, []);

  const handleAddImages = (newImages: ImageObject[]) => {
    dispatch({ type: "ADD_IMAGES", payload: newImages });
  };

  const handleDeleteImage = (imageKey: string) => {
    dispatch({ type: "DELETE_IMAGE", payload: imageKey });
    toast.success("Image deleted successfully!");
  };

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const productData = {
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
      seasonalAvailability: seasonalAvailability,
      servingSuggestions: productServing,
      variations: productVariations,
      customizationOptions: productCustomization,
      availability: availabilityStatus,
      images: images.map((img) => img),
    };

    try {
      await createNewProduct(productData);
      toast.success("Product submitted successfully!");
      router.push("/business/dashboard/products");
    } catch (error) {
      toast.error("Failed to submit product. Please try again.");
    }
  };

  const previewPrice = productPrice ? Number(productPrice) : null;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-sm text-muted-foreground mb-6">
          <Link href="/business/dashboard" className="hover:text-gray-900 transition-colors">
            Dashboard
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <Link href="/business/dashboard/products" className="hover:text-gray-900 transition-colors">
            Products
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-gray-900 font-medium">Add New Product</span>
        </nav>

        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Add New Product</h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Fill in the details below to list your product on the marketplace.
            </p>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Form — takes up 2/3 on desktop */}
          <div className="lg:col-span-2">
            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Basic Information */}
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center">
                      <Tag className="h-4 w-4 text-amber-600" />
                    </div>
                    <CardTitle className="text-base">Basic Information</CardTitle>
                  </div>
                </CardHeader>
                <Separator />
                <CardContent className="pt-5 space-y-5">
                  <Section title="">
                    <div className="grid md:grid-cols-2 gap-6">
                      <InputField
                        id="product-name"
                        label="Product Name *"
                        placeholder="E.g., Chocolate Chip Cookies"
                        required
                        value={productName}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setProductName(e.target.value)
                        }
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
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setProductPrice(e.target.value)
                        }
                      />
                    </div>
                    <SelectField
                      id="product-category"
                      label="Category *"
                      options={[...PRODUCT_CATEGORIES]}
                      value={productCategory}
                      onChange={(value) => setProductCategory(value)}
                      required
                    />
                    <TextareaField
                      id="product-description"
                      label="Product Description *"
                      placeholder="E.g., Soft, chewy cookies with rich chocolate chips."
                      value={productDescription}
                      required
                      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                        setProductDescription(e.target.value)
                      }
                      tooltip={
                        <Tooltip message="Provide details about the product's texture, taste, and characteristics." />
                      }
                    />
                  </Section>
                </CardContent>
              </Card>

              {/* Ingredients and Allergens */}
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center">
                      <Layers className="h-4 w-4 text-green-600" />
                    </div>
                    <CardTitle className="text-base">Ingredients &amp; Allergens</CardTitle>
                  </div>
                </CardHeader>
                <Separator />
                <CardContent className="pt-5">
                  <Section title="">
                    <TextareaField
                      id="product-ingredients"
                      label="Ingredients *"
                      placeholder="E.g., Flour, Sugar, Butter, Chocolate Chips"
                      value={productIngredients}
                      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                        setProductIngredients(e.target.value)
                      }
                      required
                      tooltip={
                        <Tooltip message="List all ingredients, highlighting allergens." />
                      }
                    />
                    <InputField
                      id="product-allergens"
                      label="Allergens"
                      placeholder="E.g., Contains Dairy, Gluten"
                      value={productAllergens}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setProductAllergens(e.target.value)
                      }
                      tooltip={
                        <Tooltip message="Specify any allergens, such as nuts or gluten." />
                      }
                    />
                    <SelectField
                      id="dietary-label"
                      label="Dietary Labels *"
                      options={[...DIETARY_LABELS]}
                      value={dietaryLabel}
                      required
                      onChange={(value) => setDietaryLabel(value)}
                    />
                  </Section>
                </CardContent>
              </Card>

              {/* Pricing & Inventory */}
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                      <Package className="h-4 w-4 text-blue-600" />
                    </div>
                    <CardTitle className="text-base">Pricing &amp; Inventory</CardTitle>
                  </div>
                </CardHeader>
                <Separator />
                <CardContent className="pt-5 space-y-5">
                  <Section title="">
                    <div className="grid md:grid-cols-2 gap-6">
                      <InputField
                        id="product-calories"
                        label="Calories"
                        type="number"
                        placeholder="E.g., 250"
                        value={productCalories}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setProductCalories(e.target.value)
                        }
                      />
                      <InputField
                        id="product-macronutrients"
                        label="Macronutrients"
                        placeholder="E.g., 12g Fat, 20g Carbs, 5g Protein"
                        value={productMacronutrients}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setProductMacronutrients(e.target.value)
                        }
                        tooltip={
                          <Tooltip message="Include a breakdown of macronutrients if available." />
                        }
                      />
                    </div>
                  </Section>

                  <Section title="">
                    <div className="grid md:grid-cols-3 gap-6">
                      <InputField
                        id="product-size"
                        label="Size"
                        placeholder="E.g., Medium"
                        value={productSize}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setProductSize(e.target.value)
                        }
                        tooltip={
                          <Tooltip message="Specify the product size (e.g., Small, Medium, Large)." />
                        }
                      />
                      <InputField
                        id="product-weight"
                        label="Weight"
                        placeholder="E.g., 500g"
                        value={productWeight}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setProductWeight(e.target.value)
                        }
                      />
                      <InputField
                        id="product-shelf-life"
                        label="Shelf Life"
                        placeholder="E.g., 1 week"
                        value={productShelfLife}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setProductShelfLife(e.target.value)
                        }
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
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setProductStorageInstructions(e.target.value)
                      }
                    />
                  </Section>

                  <Section title="">
                    <TextareaField
                      id="product-serving"
                      label="Serving Suggestions"
                      placeholder="E.g., Serve warm with a glass of milk."
                      value={productServing}
                      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                        setProductServing(e.target.value)
                      }
                    />
                    <InputField
                      id="product-variations"
                      label="Available Variations"
                      placeholder="E.g., Different flavors or sizes."
                      value={productVariations}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setProductVariations(e.target.value)
                      }
                    />
                    <InputField
                      id="product-customization"
                      label="Customization Options"
                      placeholder="E.g., Custom orders for birthdays."
                      value={productCustomization}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setProductCustomization(e.target.value)
                      }
                    />
                    <SelectField
                      id="seasonal-availability"
                      label="Seasonal Availability"
                      options={["Year-round", "Seasonal"]}
                      value={seasonalAvailability}
                      onChange={(value) => setSeasonalAvailability(value)}
                    />
                    <SelectField
                      id="availability"
                      label="Availability Status"
                      options={[...AVAILABILITY_OPTIONS]}
                      value={availabilityStatus}
                      onChange={(value) => setAvailabilityStatus(value)}
                    />
                  </Section>
                </CardContent>
              </Card>

              {/* Media */}
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center">
                      <ImageIcon className="h-4 w-4 text-purple-600" />
                    </div>
                    <CardTitle className="text-base">Media</CardTitle>
                  </div>
                </CardHeader>
                <Separator />
                <CardContent className="pt-5">
                  <div className="rounded-lg border-2 border-dashed border-gray-200 bg-gray-50 p-6 text-center hover:border-amber-300 hover:bg-amber-50/30 transition-colors">
                    <ImageIcon className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm font-medium text-gray-700 mb-1">
                      Drag &amp; drop or click to upload
                    </p>
                    <p className="text-xs text-muted-foreground mb-4">
                      PNG, JPG, WEBP up to 8MB each
                    </p>
                    <UploadThing
                      images={images}
                      onAddImages={handleAddImages}
                      onDeleteImage={handleDeleteImage}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Form Actions */}
              <div className="flex items-center justify-between pt-2 pb-8">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => router.push("/business/dashboard/products")}
                >
                  Cancel
                </Button>
                <div className="flex gap-3">
                  <Button variant="outline" type="button">Save as Draft</Button>
                  <Button type="submit">Publish Product</Button>
                </div>
              </div>
            </form>
          </div>

          {/* Preview Card — sticky on desktop */}
          <div className="lg:col-span-1">
            <div className="sticky top-6 space-y-4">
              <Card className="overflow-hidden">
                <CardHeader className="pb-2 bg-gray-50 border-b">
                  <CardTitle className="text-sm text-muted-foreground font-medium uppercase tracking-wide">
                    Live Preview
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  {/* Image placeholder */}
                  <div className="w-full h-44 bg-gradient-to-br from-amber-50 to-orange-100 flex items-center justify-center">
                    {images[0]?.url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={images[0].url}
                        alt="Product preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-center">
                        <ImageIcon className="h-10 w-10 text-amber-300 mx-auto mb-2" />
                        <p className="text-xs text-amber-400">No image yet</p>
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="font-semibold text-gray-900 leading-tight">
                        {productName || <span className="text-gray-400 font-normal">Product name</span>}
                      </h3>
                      {previewPrice !== null && previewPrice > 0 && (
                        <span className="text-amber-600 font-bold text-sm flex-shrink-0">
                          {formatCurrency(previewPrice)}
                        </span>
                      )}
                    </div>
                    {productCategory && (
                      <Badge variant="secondary" className="text-xs mb-2">
                        {productCategory}
                      </Badge>
                    )}
                    {productDescription ? (
                      <p className="text-xs text-muted-foreground line-clamp-3 mt-2">
                        {productDescription}
                      </p>
                    ) : (
                      <p className="text-xs text-gray-300 mt-2">Description will appear here…</p>
                    )}
                    {dietaryLabel && (
                      <div className="mt-3 pt-3 border-t">
                        <Badge variant="outline" className="text-xs">
                          {dietaryLabel}
                        </Badge>
                      </div>
                    )}
                    {availabilityStatus && (
                      <div className="mt-2">
                        <Badge
                          variant={availabilityStatus === "In Stock" ? "default" : "secondary"}
                          className="text-xs"
                        >
                          {availabilityStatus}
                        </Badge>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-amber-50 border-amber-200">
                <CardContent className="p-4">
                  <p className="text-xs text-amber-800 leading-relaxed">
                    <strong>Tips:</strong> High-quality images and detailed descriptions help customers make confident purchase decisions.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
