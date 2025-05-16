'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface ArtworkCardProps {
  id: string;
  title: string;
  imageUrl: string;
  category: string;
  year: number;
  slug: string;
}

export function ArtworkCard({
  id,
  title,
  imageUrl,
  category,
  year,
  slug,
}: ArtworkCardProps) {
  console.log(id);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="group relative">
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200">
        <Link href={`/artwork/${slug}`}>
          <Image
            src={imageUrl}
            alt={title}
            width={500}
            height={500}
            className={cn(
              'h-full w-full object-cover object-center transition-opacity duration-300',
              isLoading ? 'opacity-0' : 'opacity-100'
            )}
            onLoadingComplete={() => setIsLoading(false)}
          />
        </Link>
      </div>
      <div className="mt-4 flex justify-between">
        <div>
          <h3 className="text-sm text-gray-700">
            <Link href={`/artwork/${slug}`}>
              <span aria-hidden="true" className="absolute inset-0" />
              {title}
            </Link>
          </h3>
          <p className="mt-1 text-sm text-gray-500">{category}</p>
        </div>
        <p className="text-sm font-medium text-gray-900">{year}</p>
      </div>
    </div>
  );
} 