'use client';

import Image from 'next/image';
import { useState } from 'react';
import { StrapiImage } from '@/types/strapi';
import { imageConstant } from '@/lib/constant/image-constant';

interface ImageGalleryProps {
  mainImage: StrapiImage;
  gallery: StrapiImage[] | null;
  title: string;
}

export default function ImageGallery({ mainImage, gallery, title }: ImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<string>(
    `${mainImage?.formats?.large?.url ?? imageConstant}`
  );

  const handleThumbnailClick = (image: StrapiImage) => {
    setSelectedImage(`${image?.formats?.large?.url ?? imageConstant}`);
  };

  const handleViewInRoom = () => {
    window.open(`/room-view?image=${encodeURIComponent(selectedImage)}`, '_blank');
  };

  return (
    <div className="lg:col-span-2">
      {/* Main Image */}
      <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden mb-6">
        <Image
          src={selectedImage}
          alt={title}
          fill
          className="object-contain"
          priority
        />
        {/* View in Room Button */}
        <button 
          onClick={handleViewInRoom}
          className="absolute bottom-4 right-4 bg-white text-gray-900 px-4 py-2 rounded-lg shadow-lg hover:bg-gray-50 transition"
        >
          View in Room
        </button>
      </div>

      {/* Gallery Thumbnails */}
      {gallery && gallery.length > 0 && (
        <div className="grid grid-cols-4 gap-4">
          {/* Main image thumbnail */}
          <button
            onClick={() => handleThumbnailClick(mainImage)}
            className={`relative aspect-square rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition ${
              selectedImage === `${mainImage?.formats?.large?.url ?? imageConstant}` ? 'ring-2 ring-indigo-600' : ''
            }`}
          >
            <Image
              src={`${mainImage?.formats?.medium?.url ?? imageConstant}`}
              alt={`${title} - Main View`}
              fill
              className="object-cover"
            />
          </button>
          
          {/* Gallery thumbnails */}
          {gallery.map((image, index) => (
            <button
              key={index}
              onClick={() => handleThumbnailClick(image)}
              className={`relative aspect-square rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition ${
                selectedImage === `${image?.formats?.large?.url ?? imageConstant}` ? 'ring-2 ring-indigo-600' : ''
              }`}
            >
              <Image
                src={`${image?.formats?.medium?.url ?? imageConstant}`}
                alt={`${title} - View ${index + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
} 