// components/ImageGallery.tsx
"use client";
import React, { useState } from "react";
import Image from "next/image";

interface ImageGalleryProps {
  images: string[];
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  return (
    <div className="flex flex-col md:flex-row items-center space-y-4 lg:space-y-0 lg:space-x-4">
      {/* Thumbnails */}
      <div className="w-full lg:w-1/5 flex flex-row md:flex-col items-center space-y-4 lg:space-y-0 lg:space-x-4">
        {images.map((img, index) => (
          <div
            key={index}
            className={`w-20 h-20 relative cursor-pointer rounded-md border ${
              img === selectedImage ? "border-gray-800" : "border-gray-200"
            } hover:border-gray-400`}
            onClick={() => setSelectedImage(img)}
          >
            <Image
              src={img}
              alt={`Thumbnail ${index + 1}`}
              layout="fill"
              objectFit="cover"
              className="rounded-md"
            />
          </div>
        ))}
      </div>

      {/* Main Image */}
      <div className="w-full lg:w-4/5 relative">
        <Image
          src={selectedImage}
          alt="Selected product"
          width={800} // Desired width for the main image
          height={600} // Desired height for the main image
          objectFit="cover"
          className="rounded-md shadow-lg"
        />
      </div>
    </div>
  );
};

export default ImageGallery;
