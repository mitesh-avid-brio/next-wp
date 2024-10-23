"use client"
import { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ImageType {
  id: number;
  src: string; // Image URL
  alt: string; // Alternative text
  // Include any additional properties if needed
}

interface ProductGalleryProps {
  images: ImageType[]; // Update this to be an array of ImageType
  name: string;
}

export default function ProductGallery({ images, name }: ProductGalleryProps) {
  const [currentImage, setCurrentImage] = useState(0);

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  const currentImageData = images[currentImage];

  return (
    <div className="aspect-square relative rounded-lg overflow-hidden">
      <h2>{name}</h2>
      <Image
        src={currentImageData.src}
        alt={currentImageData.alt || `${name} - Image ${currentImage + 1}`}
        layout="fill" // Use 'fill' for covering the container
        objectFit="cover" // Adjust as necessary
        quality={100} // Adjust image quality if needed
      />
      <button onClick={prevImage}>
        <ChevronLeft />
      </button>
      <button onClick={nextImage}>
        <ChevronRight />
      </button>
    </div>
  );
}
