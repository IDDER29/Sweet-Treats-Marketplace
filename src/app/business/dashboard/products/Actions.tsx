"use client"; // Ensures this component is client-side

import React from "react";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { deleteProductById } from "@/utils/api";

const Actions = ({ product }: { product: any }) => {
  const router = useRouter();

  // Handle Edit
  const handleEdit = (id: string) => {
    router.push(`/business/dashboard/products/edit?id=${id}`);
  };

  // Handle Delete
  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteProductById(id);
        router.refresh(); // Refresh the page after deletion
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

  return (
    <div className="flex space-x-2">
      <Button
        size="sm"
        variant="outline"
        onClick={() => handleEdit(product.id)}
      >
        <Edit className="h-4 w-4" />
      </Button>
      <Button
        size="sm"
        variant="outline"
        onClick={() => handleDelete(product.id)}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default Actions;
