import Image from "next/image";
import React, { useState, MouseEvent } from "react";

// Define type for image data
interface ImageData {
  url: string;
  name: string;
}

interface ProductImageGalleryProps {
  productImageData: ImageData[];
}

const ProductImageGallery: React.FC<ProductImageGalleryProps> = ({
  productImageData,
}) => {
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [isZoomed, setIsZoomed] = useState(false);
  const [mainImage, setMainImage] = useState<ImageData>(productImageData[0]); // Properly typed

  const handleThumbnailClick = (image: ImageData) => {
    setMainImage(image);
  };

  const handleImageHover = (e: MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPosition({ x, y });
  };

  return (
    <div className="w-full lg:w-1/2">
      <div
        className="relative overflow-hidden rounded-lg mb-4 cursor-zoom-in"
        onMouseMove={handleImageHover}
        onMouseEnter={() => setIsZoomed(true)}
        onMouseLeave={() => setIsZoomed(false)}
      >
        <Image
          src={mainImage.url}
          alt={mainImage.name}
          className="w-full h-auto transition-transform duration-200 ease-in-out"
          style={{
            transform: isZoomed ? "scale(2)" : "scale(1)",
            transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
          }}
          width={500}
          height={500}
          priority // Add priority to improve performance for the main image
        />
      </div>
      <div className="flex gap-2 overflow-x-auto">
        {productImageData.map((image, index) => (
          <button
            key={index}
            onClick={() => handleThumbnailClick(image)}
            className={`flex-shrink-0 w-20 h-20 rounded-md overflow-hidden ${
              mainImage.url === image.url ? "ring-2 ring-primary" : ""
            }`}
          >
            <Image
              src={image.url}
              alt={`Thumbnail ${index + 1}`}
              className="w-full h-full object-cover"
              width={500}
              height={500}
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductImageGallery;
