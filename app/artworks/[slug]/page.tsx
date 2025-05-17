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
    <main className="min-h-screen bg-white">
      {/* Breadcrumbs */}
      <nav className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-gray-900">Home</Link>
            <span>/</span>
            <Link href="/artworks" className="hover:text-gray-900">Art</Link>
            <span>/</span>
            {artwork.category && (
              <>
                <Link href={`/artworks?category=${artwork.category.Slug}`} className="hover:text-gray-900">
                  {artwork.category.Name}
                </Link>
                <span>/</span>
              </>
            )}
            <span className="text-gray-900">{artwork.title}</span>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column - Artwork Images */}
          <div className="lg:col-span-2">
            {/* Main Image */}
            <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden mb-6">
              {artwork.mainImage && (
                <Image
                  src={heroImage}
                  alt={artwork.title}
                  fill
                  className="object-contain"
                  priority
                />
              )}
              {/* View in Room Button */}
              <button className="absolute bottom-4 right-4 bg-white text-gray-900 px-4 py-2 rounded-lg shadow-lg hover:bg-gray-50 transition">
                View in Room
              </button>
            </div>

            {/* Gallery Thumbnails */}
            {artwork.gallery && artwork.gallery.length > 0 && (
              <div className="grid grid-cols-4 gap-4">
                {artwork.gallery.map((image, index) => (
                  <div 
                    key={index}
                    className="relative aspect-square rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition"
                  >
                    <Image
                      src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${image.formats.medium.url}`}
                      alt={`${artwork.title} - View ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Social Share */}
            <div className="mt-6 flex items-center space-x-4">
              <span className="text-sm text-gray-600">Share:</span>
              <div className="flex space-x-3">
                <button className="text-gray-600 hover:text-gray-900">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4z"/>
                  </svg>
                </button>
                <button className="text-gray-600 hover:text-gray-900">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.44 4.83c-.8.37-1.5.38-2.22.02.93-.56.98-.96 1.32-2.02-.88.52-1.86.9-2.9 1.1-.82-.88-2-1.43-3.3-1.43-2.5 0-4.55 2.04-4.55 4.54 0 .36.03.7.1 1.04-3.77-.2-7.12-2-9.36-4.75-.4.67-.6 1.45-.6 2.3 0 1.56.8 2.95 2 3.77-.74-.03-1.44-.23-2.05-.57v.06c0 2.2 1.56 4.03 3.64 4.44-.67.2-1.37.2-2.06.08.58 1.8 2.26 3.12 4.25 3.16C5.78 18.1 3.37 18.74 1 18.46c2 1.3 4.4 2.04 6.97 2.04 8.35 0 12.92-6.92 12.92-12.93 0-.2 0-.4-.02-.6.9-.63 1.96-1.22 2.56-2.14z"/>
                  </svg>
                </button>
                <button className="text-gray-600 hover:text-gray-900">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Artwork Information */}
          <div className="space-y-8">
            {/* Title and Category */}
            <div>
              <h1 className="text-3xl font-bold mb-2">{artwork.title}</h1>
              {artwork.category && (
                <Link 
                  href={`/artworks?category=${artwork.category.Slug}`}
                  className="text-indigo-600 hover:text-indigo-800"
                >
                  {artwork.category.Name}
                </Link>
              )}
            </div>

            {/* Price */}
            {artwork.price && (
              <div className="text-3xl font-bold text-gray-900">
                ${artwork.price.toLocaleString()}
              </div>
            )}

            {/* Artwork Details */}
            <div className="space-y-4">
              {artwork.Year && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Year Created</h3>
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

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold mb-2">About this Artwork</h3>
              <div className="prose max-w-none">
                <p className="text-gray-700 mb-4">{artwork.shortDescription}</p>
                {artwork.description && (
                  <p className="text-gray-600">{artwork.description}</p>
                )}
              </div>
            </div>

            {/* Tags */}
            {artwork.tags && artwork.tags.length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">Subjects & Styles</h3>
                <div className="flex flex-wrap gap-2">
                  {artwork.tags.map((tag) => (
                    <Link
                      key={tag.id}
                      href={`/artworks?tag=${tag.Slug}`}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition"
                    >
                      {tag.Name}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="space-y-4">
              <button className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-indigo-700 transition">
                Add to Cart
              </button>
              <button className="w-full border-2 border-indigo-600 text-indigo-600 py-3 px-6 rounded-lg font-medium hover:bg-indigo-50 transition">
                Make an Offer
              </button>
              <button className="w-full text-gray-600 hover:text-gray-900 transition">
                <span className="flex items-center justify-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  Add to Favorites
                </span>
              </button>
            </div>

            {/* Shipping Info */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold mb-4">Shipping & Returns</h3>
              <div className="space-y-2 text-gray-600">
                <p>• Ships worldwide from our gallery</p>
                <p>• 7-Day Money-Back Guarantee</p>
                <p>• Professional packaging</p>
                <Link href="/shipping" className="text-indigo-600 hover:text-indigo-800">
                  Learn more about shipping →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 