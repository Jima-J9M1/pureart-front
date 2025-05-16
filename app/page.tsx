import Image from 'next/image';
import Link from 'next/link';
import { getFeaturedArtworks, getGlobal } from '@/lib/api';
import { Artwork, StrapiGlobal } from '@/types/strapi';

export default async function Home() {
  const featuredArtworksData = await getFeaturedArtworks(3);
  const globalData = await getGlobal();
  
  const featuredArtworks = featuredArtworksData.data || [];
  const global = globalData.data;

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      {/* Hero Section */}
      <section className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
        <div className="container mx-auto px-4 py-24 flex flex-col items-center text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            {global?.siteName || 'Art Gallery'}
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mb-10">
            {global?.siteDescription || 'Discover unique and beautiful artwork from talented artists.'}
          </p>
          <Link
            href="/artworks"
            className="bg-white text-indigo-600 font-medium px-8 py-3 rounded-lg text-lg hover:bg-opacity-90 transition"
          >
            Browse Gallery
          </Link>
        </div>
      </section>

      {/* Featured Artworks */}
      <section className="w-full py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Featured Artworks</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredArtworks.map((artwork) => (
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
                    <h3 className="text-xl font-semibold">{artwork.title}</h3>
                    {artwork.category && (
                      <p className="text-sm text-gray-600 mt-1">
                        {artwork.category.Name}
                      </p>
                    )}
                    <p className="text-gray-700 mt-2 line-clamp-2">
                      {artwork.shortDescription}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Link
              href="/artworks"
              className="inline-block border-2 border-indigo-600 text-indigo-600 font-medium px-6 py-2 rounded-lg hover:bg-indigo-600 hover:text-white transition"
            >
              View All Artworks
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="w-full py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-6">About Our Gallery</h2>
          <p className="text-lg text-gray-700 mb-8">
            We showcase a curated collection of exceptional artworks spanning various styles and mediums. 
            Our mission is to connect art lovers with unique pieces that inspire and transform spaces.
          </p>
          <Link
            href="/about"
            className="text-indigo-600 font-medium hover:underline"
          >
            Learn more about us →
          </Link>
        </div>
      </section>
    </main>
  );
}
