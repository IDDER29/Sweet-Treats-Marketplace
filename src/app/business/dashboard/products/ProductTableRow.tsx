"use client"; // Marks this component as client-side

import React from "react";
import { TableRow, TableCell } from "@/components/ui/table";
import Image from "next/image";
import Actions from "./Actions";
import { formatCurrency } from "@/lib/currency";
import type { Product } from "@/types";

interface ProductTableRowProps {
  product: Product;
  onChanged?: () => void;
}

const ProductTableRow = ({ product, onChanged }: ProductTableRowProps) => {
  const imageUrl = product.images?.[0]?.url;

  return (
    <TableRow id={product.id}>
      <TableCell>
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={product.name}
            width={64}
            height={64}
            className="h-16 w-16 rounded object-cover"
          />
        ) : (
          <div className="flex h-16 w-16 items-center justify-center rounded bg-muted text-xs text-muted-foreground">
            No image
          </div>
        )}
      </TableCell>
      <TableCell>{product.name}</TableCell>
      <TableCell>{product.category}</TableCell>
      <TableCell>{formatCurrency(product.price)}</TableCell>
      <TableCell>{product.availability ?? "—"}</TableCell>
      <TableCell>
        <Actions product={product} onChanged={onChanged} />
      </TableCell>
    </TableRow>
  );
};

export default ProductTableRow;
