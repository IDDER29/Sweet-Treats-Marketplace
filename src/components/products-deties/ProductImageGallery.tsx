"use client";

import React, { useState, MouseEvent } from "react";

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
  const hasImages = productImageData && productImageData.length > 0;

  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [isZoomed, setIsZoomed] = useState(false);
  const [mainImage, setMainImage] = useState<ImageData | null>(
    hasImages ? productImageData[0] : null
  );
  const [mainIndex, setMainIndex] = useState(0);

  const handleThumbnailClick = (image: ImageData, index: number) => {
    setMainImage(image);
    setMainIndex(index);
    setIsZoomed(false);
  };

  const handleImageHover = (e: MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPosition({ x, y });
  };

  // Placeholder when no images provided
  if (!hasImages || !mainImage) {
    return (
      <div className="w-full lg:w-1/2">
        <div className="relative rounded-2xl overflow-hidden mb-4 bg-gradient-to-br from-amber-100 via-orange-100 to-rose-100 flex flex-col items-center justify-center h-80 sm:h-96 select-none">
          <span className="text-8xl mb-3" role="img" aria-label="cake">
            🎂
          </span>
          <p className="text-sm text-amber-700 font-medium opacity-70">
            No images available
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full lg:w-1/2">
      {/* Main image */}
      <div
        className="relative overflow-hidden rounded-2xl mb-3 cursor-zoom-in bg-muted shadow-sm"
        onMouseMove={handleImageHover}
        onMouseEnter={() => setIsZoomed(true)}
        onMouseLeave={() => setIsZoomed(false)}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={mainImage.url}
          alt={mainImage.name}
          className="w-full h-80 sm:h-[420px] object-cover transition-transform duration-200 ease-in-out"
          style={{
            transform: isZoomed ? "scale(2)" : "scale(1)",
            transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
          }}
        />

        {/* "Tap to zoom" hint — visible on mobile, hidden on hover */}
        <div
          className={`absolute bottom-3 left-1/2 -translate-x-1/2 pointer-events-none transition-opacity duration-200 ${
            isZoomed ? "opacity-0" : "opacity-100 md:opacity-0"
          }`}
        >
          <span className="bg-black/50 text-white text-xs px-3 py-1.5 rounded-full backdrop-blur-sm">
            Tap to zoom
          </span>
        </div>

        {/* Image counter (mobile) */}
        {productImageData.length > 1 && (
          <div className="absolute top-3 right-3 md:hidden">
            <span className="bg-black/50 text-white text-xs px-2.5 py-1 rounded-full backdrop-blur-sm font-medium">
              {mainIndex + 1}/{productImageData.length}
            </span>
          </div>
        )}
      </div>

      {/* Thumbnails — horizontal scroll on mobile */}
      {productImageData.length > 1 && (
        <div className="flex gap-2.5 overflow-x-auto pb-1 snap-x snap-mandatory scrollbar-hide">
          {productImageData.map((image, index) => (
            <button
              key={index}
              onClick={() => handleThumbnailClick(image, index)}
              className={`flex-shrink-0 snap-start w-20 h-20 rounded-xl overflow-hidden transition-all duration-150 ${
                mainImage.url === image.url
                  ? "ring-2 ring-amber-500 ring-offset-2 shadow-md"
                  : "ring-1 ring-gray-200 hover:ring-amber-300 hover:shadow-sm opacity-70 hover:opacity-100"
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={image.url}
                alt={`${image.name} — view ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductImageGallery;
