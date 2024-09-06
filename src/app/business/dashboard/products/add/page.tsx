"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import UploadThing from "@/components/upload/UploadButton";
import Image from "next/image";

export default function ProductDataEntryPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Add New Product</h1>
      <Card>
        <CardHeader>
          <CardTitle>Product Information</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="product-name">Product Title</Label>
                <Input id="product-name" placeholder="Enter product name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="product-price">Price</Label>
                <Input
                  id="product-price"
                  type="number"
                  placeholder="0.00"
                  step="0.01"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="product-description">Product Description</Label>
              <Textarea
                id="product-description"
                placeholder="Describe your product"
                rows={5}
              />
            </div>

            <div className="grid  gap-6">
              <div className="space-y-2">
                <Label htmlFor="product-category">Category</Label>
                <Select>
                  <SelectTrigger id="product-category">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bread">Bread</SelectItem>
                    <SelectItem value="pastry">Pastry</SelectItem>
                    <SelectItem value="cake">Cake</SelectItem>
                    <SelectItem value="cookie">Cookie</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Product Images</Label>
              <div key="Drag and drop flex ">
                <UploadThing />
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <Image
                    key={i}
                    alt="Product Image"
                    src={
                      "https://utfs.io/f/bba23788-074a-4a68-94e4-233456157c27-f3r1i.jpg"
                    }
                    width={500}
                    height={500}
                  ></Image>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <Label>Product Attributes</Label>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Switch id="gluten-free" />
                  <Label htmlFor="gluten-free">Gluten-Free</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="vegan" />
                  <Label htmlFor="vegan">Vegan</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="organic" />
                  <Label htmlFor="organic">Organic</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="featured" />
                  <Label htmlFor="featured">Featured Product</Label>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="product-ingredients">Ingredients</Label>
              <Textarea
                id="product-ingredients"
                placeholder="List the ingredients"
                rows={3}
              />
            </div>

            <div className="flex justify-end space-x-4">
              <Button variant="outline">Save as Draft</Button>
              <Button type="submit">Publish Product</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
