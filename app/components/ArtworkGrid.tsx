'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Artwork } from '@/types/strapi';

interface ArtworkGridProps {
  artworks: Artwork[];
  loading: boolean;
}

export default function ArtworkGrid({ artworks, loading }: ArtworkGridProps) {
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (artworks.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-gray-900">No artworks found</h3>
        <p className="mt-2 text-sm text-gray-500">
          Try adjusting your filters to find what you're looking for.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {artworks.map((artwork) => (
        <Link
          key={artwork.id}
          href={`/artworks/${artwork?.slug}`}
          className="group"
        >
          <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200">
            <Image
              src={artwork.mainImage.url}
              alt={artwork.title}
              width={500}
              height={500}
              className="h-full w-full object-cover object-center group-hover:opacity-75"
            />
          </div>
          <div className="mt-4">
            <h3 className="text-sm text-gray-700">{artwork.title}</h3>
            <p className="mt-1 text-sm text-gray-500">{artwork.category.Name}</p>
            <p className="mt-1 text-lg font-medium text-gray-900">
              ${artwork.price.toLocaleString()}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
} 