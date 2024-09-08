"use client";
import { useState } from "react";
import { UploadDropzone } from "@/utils/uploadthing";
import Link from "next/link";
import Image from "next/image";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify"; // Importing toast

export default function UploadThing({
  images,
  onAddImages,
  onDeleteImage,
}: {
  images: any[];
  onAddImages: (images: any[]) => void;
  onDeleteImage: (key: string) => void;
}) {
  const [isUploading, setIsUploading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async (fileId: string) => {
    setIsDeleting(true);
    try {
      const result = await fetch("/api/deleteFile", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fileId }),
      }).then((res) => res.json());

      if (result.success) {
        onDeleteImage(fileId); // Using the onDeleteImage prop
        toast.success("File deleted successfully");
      } else {
        toast.error("Failed to delete file");
      }
    } catch (error) {
      toast.error("Error deleting file");
    } finally {
      setIsDeleting(false);
    }
  };

  const ImageItem = ({
    image,
  }: {
    image: { url: string; name: string; key: string };
  }) => (
    <div className="relative w-full h-40 sm:h-48 md:h-64 transition-transform hover:scale-105">
      {image.url ? (
        <Link href={image.url} target="_blank">
          <Image
            src={image.url}
            alt={image.name || "Uploaded Image"}
            layout="fill"
            objectFit="cover"
            className="rounded-lg shadow-md"
          />
        </Link>
      ) : (
        <div className="flex items-center justify-center w-full h-full bg-gray-200 text-gray-500 rounded-lg">
          Image URL not available
        </div>
      )}
      <button
        className={`absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-red-300 ${
          isDeleting ? "opacity-50 pointer-events-none" : ""
        }`}
        onClick={() => handleDelete(image.key)}
        aria-label="Delete image"
      >
        X
      </button>
    </div>
  );

  return (
    <main className="max-w-6xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Image Upload
      </h1>

      <UploadDropzone
        appearance={{
          button:
            "bg-blue-600 text-white font-semibold hover:bg-blue-700 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 w-full sm:w-1/2 mx-auto py-2 px-4 rounded-lg transition-colors",
          container: "border-4 border-dashed border-blue-500 p-8 rounded-lg",
        }}
        className="border-4 border-dashed border-gray-300 hover:border-blue-500 p-8 text-center transition-colors rounded-lg cursor-pointer bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mb-8"
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          setIsUploading(false); // Stop spinner
          if (res) {
            const newImages = res.map((image) => ({
              url: image.url,
              name: image.name,
              key: image.key,
            }));
            onAddImages(newImages); // Using onAddImages prop
            toast.success("Images uploaded successfully");
          }
        }}
        onUploadError={(error: Error) => {
          setIsUploading(false);
          toast.error(`Upload error: ${error.message}`);
        }}
        onUploadBegin={() => setIsUploading(true)}
      />

      {isUploading && (
        <div className="text-center mb-4">
          <ClipLoader size={35} color="#3498db" />
          <p className="text-gray-600 mt-2">Uploading...</p>
        </div>
      )}

      {images.length ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {images.map((image) => (
            <ImageItem key={image.key} image={image} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center">No images uploaded yet.</p>
      )}
    </main>
  );
}
