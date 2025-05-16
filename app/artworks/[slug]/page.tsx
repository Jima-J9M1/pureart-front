import Image from 'next/image';
import Link from 'next/link';
import { getArtwork } from '@/lib/api';
import { notFound } from 'next/navigation';
import { Artwork, ArtworkResponse } from '@/types/strapi';

export default async function ArtworkDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const slug = (await params).slug;
  const artworkData = await getArtwork(slug) as ArtworkResponse;

  if (!artworkData.data) {
    notFound();
  }

  const artwork: Artwork = artworkData.data[0];
  const heroImage = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${artwork?.mainImage?.formats?.large?.url}`;
  const galleryImages = artwork.gallery?.map((image) => `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${image.formats.medium.url}`);

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section with Artwork Image */}
      <section className="relative h-[70vh] w-full bg-black">
        {artwork.mainImage && (
          <Image
            src={heroImage}
            alt={artwork.title}
            fill
            className="object-contain"
            priority
          />
        )}
      </section>

      {/* Gallery Section */}
      {artwork.gallery && artwork.gallery.length > 0 && (
        <section className="container mx-auto px-4 py-8">
          <h2 className="text-2xl font-bold mb-6">Gallery</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {artwork.gallery.map((image, index) => (
              <div 
                key={index}
                className="relative aspect-square rounded-lg overflow-hidden group cursor-pointer hover:opacity-90 transition"
              >
                <Image
                  src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${image.formats.medium.url}`}
                  alt={`${artwork.title} - View ${index + 1}`}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300" />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Artwork Details Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h1 className="text-4xl font-bold mb-4">{artwork.title}</h1>
              
              {artwork.category && (
                <div className="mb-6">
                  <span className="inline-block bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium">
                    {artwork.category.Name}
                  </span>
                </div>
              )}

              <div className="prose max-w-none mb-8">
                <p className="text-xl text-gray-700 mb-6">{artwork.shortDescription}</p>
                {artwork.description && (
                  <div className="text-gray-600 space-y-4">
                    {artwork.description}
                  </div>
                )}
              </div>

              {/* Artwork Details */}
              <div className="grid grid-cols-2 gap-6 mb-8">
                {artwork.Year && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Year</h3>
                    <p className="text-lg">{artwork.Year}</p>
                  </div>
                )}
                {artwork.Medium && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Medium</h3>
                    <p className="text-lg">{artwork.Medium}</p>
                  </div>
                )}
                {artwork.dimensions && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Dimensions</h3>
                    <p className="text-lg">{artwork.dimensions}</p>
                  </div>
                )}
              </div>

              {artwork.price && (
                <div className="border-t pt-6">
                  <p className="text-3xl font-bold text-indigo-600">${artwork.price}</p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Contact/Inquiry Section */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-4">Interested in this artwork?</h2>
              <p className="text-gray-600 mb-6">
                Contact us for more information about this piece or to arrange a viewing.
              </p>
              <Link
                href="/contact"
                className="block w-full bg-indigo-600 text-white text-center py-3 px-6 rounded-lg font-medium hover:bg-indigo-700 transition"
              >
                Contact Gallery
              </Link>
            </div>

            {/* Navigation */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <Link
                href="/artworks"
                className="flex items-center text-indigo-600 hover:text-indigo-800 transition"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                Back to Gallery
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
} 