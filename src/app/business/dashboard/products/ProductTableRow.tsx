"use client"; // Marks this component as client-side

import React from "react";
import { TableRow, TableCell } from "@/components/ui/table";
import Image from "next/image";
import Actions from "./Actions";

const ProductTableRow = ({ product }: { product: any }) => {
  return (
    <TableRow key={product.id} id={product.id}>
      <TableCell>
        <Image
          src={product.images[0].url}
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
        <Actions product={product} />
      </TableCell>
    </TableRow>
  );
};

export default ProductTableRow;
