"use client";
import { useState } from "react";
import { UploadDropzone } from "@/utils/uploadthing";
import Link from "next/link";
import Image from "next/image";

export default function UploadThing() {
  const [images, setImages] = useState<{ url: string; name: string }[]>([]);

  // Function to delete an image from the list
  const handleDelete = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
  };

  const imageList = images.length ? (
    <div className="flex flex-wrap">
      {images.map((image, index) => (
        <div key={index} className="relative w-32 h-32 m-1">
          {/* X button to remove image */}
          <button
            className="absolute top-0 right-0 bg-red-500 text-white rounded-full px-2"
            onClick={() => handleDelete(index)}
          >
            X
          </button>
          {/* Safeguard against undefined url */}
          {image.url ? (
            <Link href={image.url} target="_blank">
              <Image
                src={image.url}
                alt={image.name || "Uploaded Image"}
                layout="fill"
                objectFit="cover"
              />
            </Link>
          ) : (
            <p>Image URL is not available</p>
          )}
        </div>
      ))}
    </div>
  ) : null;

  return (
    <main>
      <UploadDropzone
        className="bg-red-500 ut-label:text-lg ut-allowed-content:ut-uploading:text-red-300 p-5"
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          if (res) {
            // Append new uploaded images to the existing ones
            setImages((prevImages) => [...prevImages, ...res]);
            console.log("Uploaded images: ", JSON.stringify(res));
          }
          alert("Upload Completed");
        }}
        onUploadError={(error: Error) => {
          alert(`ERROR! ${error.message}`);
        }}
      />
      {imageList}
    </main>
  );
}
