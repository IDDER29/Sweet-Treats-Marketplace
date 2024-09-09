"use client"; // This directive makes the component run on the client side

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Edit, Trash2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import DashboardSidbar from "@/components/business/dashboard/DashboardSidbar";
import { getBusinessesProducts, deleteProductById } from "@/utils/api";
import { useRouter } from "next/navigation";

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]); // Initialize state to hold products
  const [loading, setLoading] = useState(true); // State to handle loading status
  const router = useRouter();

  // Fetch the products when the component mounts
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetchedProducts = await getBusinessesProducts();
        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false); // Stop loading spinner once data is fetched
      }
    };

    fetchProducts();
  }, []); // Empty dependency array to run once on mount

  // Handle Delete
  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteProductById(id);
        setProducts(products.filter((product: any) => product.id !== id)); // Update the state after deletion
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

  // Handle Edit (Navigate to edit page)
  const handleEdit = (id: string) => {
    router.push(`/business/dashboard/products/edit/${id}`);
  };

  if (loading) {
    return <div>Loading...</div>; // Show loading indicator while fetching data
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <DashboardSidbar />
      <main className="container mx-auto px-4 py-8">
        {/* First section */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Products</h1>
          <div className="flex items-center space-x-2">
            <Input
              type="text"
              placeholder="Search products"
              className="max-w-sm"
            />
            <Link href="/business/dashboard/products/add">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Product
              </Button>
            </Link>
          </div>
        </div>

        {/* The table section */}
        <Card>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Image</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product: any) => (
                  <TableRow key={product.id} id={product.id}>
                    <TableCell>
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        width={100}
                        height={100}
                        className="w-100 h-100"
                      />
                    </TableCell>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>{product.price} DH</TableCell>
                    <TableCell>{product.availability}</TableCell>
                    <TableCell>
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
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
