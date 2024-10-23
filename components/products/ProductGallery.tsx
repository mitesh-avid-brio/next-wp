// ProductGallery.tsx
'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function ProductGallery({ images, name }) {
  const [currentImage, setCurrentImage] = useState(0);

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="relative">
      <div className="aspect-square relative rounded-lg overflow-hidden">
        <img
          src={images[currentImage].src}
          alt={`${name} - Image ${currentImage + 1}`}
          className="w-full h-full object-cover"
        />
        
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-lg"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-lg"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}
      </div>
      
      <div className="flex gap-2 mt-4">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setCurrentImage(index)}
            className={`w-20 h-20 rounded-md overflow-hidden border-2 ${
              currentImage === index ? 'border-blue-500' : 'border-transparent'
            }`}
          >
            <img
              src={image.src}
              alt={`${name} thumbnail ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
