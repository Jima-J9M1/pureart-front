import Link from 'next/link';
import { getArtwork } from '@/lib/api';
import { notFound } from 'next/navigation';
import { Artwork } from '@/types/strapi';
import ImageGallery from '@/components/artwork/ImageGallery';
import InquiryForm from '@/app/components/InquiryForm';

export default async function ArtworkDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const slug = (await params).slug;
  const artworkData = await getArtwork(slug);

  if (!artworkData.data) {
    notFound();
  }

  const artwork: Artwork = artworkData.data.data[0];

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
          <ImageGallery 
            mainImage={artwork.mainImage}
            gallery={artwork.gallery}
            title={artwork.title}
          />

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
            {/* <div>
              <InquiryForm 
                artworkId={artwork.id.toString()}
                artworkTitle={artwork.title}
                artistName={"John Doe"}
                onClose={() => {}}
              />
            </div> */}
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