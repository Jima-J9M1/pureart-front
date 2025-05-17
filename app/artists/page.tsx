import Image from 'next/image';
import Link from 'next/link';
import { getArtists } from '@/lib/api';
import { Artist } from '@/types/strapi';

export default async function ArtistsPage() {
  const artistsData = await getArtists();
  const artists = artistsData.data || [];

  console.log("artists", artists);

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gray-900 text-white py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Artists</h1>
          <p className="text-xl text-gray-300 max-w-3xl">
            Discover the talented artists behind our curated collection of exceptional artworks.
            Each artist brings their unique vision and expertise to create pieces that inspire and transform spaces.
          </p>
        </div>
      </section>

      {/* Artists Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {artists.map((artist) => (
              <Link
                key={artist.id}
                href={`/artists/${artist.slug}`}
                className="group"
              >
                <div className="bg-white rounded-lg overflow-hidden shadow-lg transition-all duration-300 group-hover:shadow-xl">
                  {/* Artist Image */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden">
                    {artist.FeaturedImage ? (
                      <Image
                        src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${artist.FeaturedImage.formats.medium.url}`}
                        alt={artist.Name}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-400">No image available</span>
                      </div>
                    )}
                  </div>

                  {/* Artist Info */}
                  <div className="p-6">
                    <h2 className="text-2xl font-bold mb-2">{artist.Name}</h2>
                    <p className="text-gray-600 mb-4">{artist.Location}</p>
                    <p className="text-gray-700 line-clamp-3 mb-4">
                      {artist.Bio}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">
                        {artist.artworks?.length || 0} Artworks
                      </span>
                      <span className="text-indigo-600 group-hover:text-indigo-800 transition">
                        View Profile →
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Are You an Artist?</h2>
          <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
            Join our community of talented artists and showcase your work to art lovers worldwide.
            We provide a platform for artists to connect with collectors and art enthusiasts.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-indigo-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-indigo-700 transition"
          >
            Contact Us to Join
          </Link>
        </div>
      </section>
    </main>
  );
} 