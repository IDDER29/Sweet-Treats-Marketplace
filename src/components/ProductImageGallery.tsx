// components/ProductImageGallery.tsx
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";

interface ProductImageGalleryProps {
  images: string[];
}

const ProductImageGallery: React.FC<ProductImageGalleryProps> = ({
  images,
}) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  console.log(images[0].url);

  return (
    <div className="product-image-gallery">
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index}>
            <Image
              src={image.url}
              alt={`Product image ${index + 1}`}
              className="w-full"
              width={800}
              height={800}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ProductImageGallery;
