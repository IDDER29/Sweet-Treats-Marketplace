// components/RelatedProducts.tsx
import React from "react";

interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
}

interface RelatedProductsProps {
  products: Product[];
}

const RelatedProducts: React.FC<RelatedProductsProps> = ({ products }) => {
  return (
    <div className="related-products grid grid-cols-1 md:grid-cols-3 gap-4">
      {products.map((product) => (
        <div
          key={product.id}
          className="product-card p-4 border rounded shadow"
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 object-cover mb-2"
          />
          <h3 className="text-lg font-semibold">{product.name}</h3>
          <p className="text-gray-700">{product.price}</p>
        </div>
      ))}
    </div>
  );
};

export default RelatedProducts;
