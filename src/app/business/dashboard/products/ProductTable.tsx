// ProductTable.tsx
"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ProductTableRow from "./ProductTableRow";
import type { Product } from "@/types";

interface ProductTableProps {
  products: Product[];
  onChanged?: () => void;
}

const ProductTable = ({ products, onChanged }: ProductTableProps) => {
  return (
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
            {products.map((product) => (
              <ProductTableRow
                key={product.id}
                product={product}
                onChanged={onChanged}
              />
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default ProductTable;
