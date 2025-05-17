import Image from 'next/image';
import Link from 'next/link';
import { getArtist } from '@/lib/api';
import { notFound } from 'next/navigation';
import { Artist, ArtistResponse } from '@/types/strapi';

export default async function ArtistDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const slug = (await params).slug;
  const artistData = await getArtist(slug) as ArtistResponse;
  console.log("artistData", artistData.data);
  if (!artistData.data) {
    notFound();
  }

  const artist: Artist = artistData.data[0];

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[60vh] w-full">
        {artist.featuredImage && (
          <div className="absolute inset-0">
            <Image
              src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${artist.featuredImage.formats.large.url}`}
              alt={artist.name}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black bg-opacity-40" />
          </div>
        )}
        <div className="relative h-full container mx-auto px-4 flex items-end pb-12">
          <div className="text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{artist.name}</h1>
            <p className="text-xl text-gray-200">{artist.location}</p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* About Section */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6">About the Artist</h2>
              <div className="prose max-w-none">
                <p className="text-gray-700 mb-6">{artist.bio}</p>
                {artist.statement && (
                  <div className="mt-8">
                    <h3 className="text-xl font-semibold mb-4">Artist Statement</h3>
                    <p className="text-gray-700">{artist.statement}</p>
                  </div>
                )}
              </div>
            </section>

            {/* Artworks Section */}
            <section>
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold">Artworks</h2>
                <span className="text-gray-600">{artist.artworks?.length || 0} pieces</span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {artist.artworks?.map((artwork) => (
                  <Link
                    key={artwork.id}
                    href={`/artworks/${artwork.slug}`}
                    className="group"
                  >
                    <div className="bg-white rounded-lg overflow-hidden shadow-lg transition-all duration-300 group-hover:shadow-xl">
                      {artwork.mainImage && (
                        <div className="relative aspect-[4/3] w-full overflow-hidden">
                          <Image
                            src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${artwork.mainImage.formats.medium.url}`}
                            alt={artwork.title}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        </div>
                      )}
                      <div className="p-6">
                        <h3 className="text-xl font-semibold mb-2">{artwork.title}</h3>
                        {artwork.category && (
                          <p className="text-sm text-gray-600 mb-2">
                            {artwork.category.Name}
                          </p>
                        )}
                        {artwork.price && (
                          <p className="text-lg font-medium text-gray-900">
                            ${artwork.price.toLocaleString()}
                          </p>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Profile Image */}
            <div className="bg-white rounded-lg overflow-hidden shadow-lg">
              {artist.profileImage && (
                <div className="relative aspect-square w-full">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${artist.profileImage.formats.medium.url}`}
                    alt={artist.name}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
            </div>

            {/* Contact Information */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Contact & Social</h3>
              <div className="space-y-4">
                {artist.email && (
                  <a
                    href={`mailto:${artist.email}`}
                    className="flex items-center text-gray-600 hover:text-gray-900"
                  >
                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    {artist.email}
                  </a>
                )}
                {artist.website && (
                  <a
                    href={artist.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-gray-600 hover:text-gray-900"
                  >
                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                    </svg>
                    Visit Website
                  </a>
                )}
                {artist.instagram && (
                  <a
                    href={`https://instagram.com/${artist.instagram}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-gray-600 hover:text-gray-900"
                  >
                    <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                    @{artist.instagram}
                  </a>
                )}
                {artist.facebook && (
                  <a
                    href={`https://facebook.com/${artist.facebook}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-gray-600 hover:text-gray-900"
                  >
                    <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4z"/>
                    </svg>
                    {artist.facebook}
                  </a>
                )}
                {artist.twitter && (
                  <a
                    href={`https://twitter.com/${artist.twitter}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-gray-600 hover:text-gray-900"
                  >
                    <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.44 4.83c-.8.37-1.5.38-2.22.02.93-.56.98-.96 1.32-2.02-.88.52-1.86.9-2.9 1.1-.82-.88-2-1.43-3.3-1.43-2.5 0-4.55 2.04-4.55 4.54 0 .36.03.7.1 1.04-3.77-.2-7.12-2-9.36-4.75-.4.67-.6 1.45-.6 2.3 0 1.56.8 2.95 2 3.77-.74-.03-1.44-.23-2.05-.57v.06c0 2.2 1.56 4.03 3.64 4.44-.67.2-1.37.2-2.06.08.58 1.8 2.26 3.12 4.25 3.16C5.78 18.1 3.37 18.74 1 18.46c2 1.3 4.4 2.04 6.97 2.04 8.35 0 12.92-6.92 12.92-12.93 0-.2 0-.4-.02-.6.9-.63 1.96-1.22 2.56-2.14z"/>
                    </svg>
                    @{artist.twitter}
                  </a>
                )}
              </div>
            </div>

            {/* Contact Gallery */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Contact Gallery</h3>
              <p className="text-gray-600 mb-6">
                Interested in this artist's work? Contact us for more information or to arrange a viewing.
              </p>
              <Link
                href="/contact"
                className="block w-full bg-indigo-600 text-white text-center py-3 px-6 rounded-lg font-medium hover:bg-indigo-700 transition"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 