import Image from 'next/image';
import Link from 'next/link';
import { getArtworks } from '@/lib/api';
import { Artwork } from '@/types/strapi';

export default async function ArtworksPage() {
  const artworksData = await getArtworks({
    populate: ['mainImage', 'category'],
    sort: ['createdAt:desc'],
  });
  
  const artworks = artworksData.data || [];

  return (
    <main className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Artwork Gallery</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {artworks.map((artwork) => (
          <Link 
            href={`/artworks/${artwork.slug}`} 
            key={artwork.id}
            className="group"
          >
            <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 group-hover:shadow-xl group-hover:-translate-y-1">
              {artwork.mainImage && (
                <div className="relative h-64 w-full">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${artwork.mainImage.formats.medium.url}`}
                    alt={artwork.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div className="p-4">
                <h2 className="text-xl font-semibold">{artwork.title}</h2>
                {artwork.category && (
                  <p className="text-sm text-gray-600 mt-1">
                    {artwork.category.Name}
                  </p>
                )}
                <p className="text-gray-700 mt-2 line-clamp-2">
                  {artwork.shortDescription}
                </p>
                {artwork.price && (
                  <p className="text-lg font-medium text-indigo-600 mt-3">
                    ${artwork.price}
                  </p>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
} 