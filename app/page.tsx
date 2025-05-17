import Image from 'next/image';
import Link from 'next/link';
import { getFeaturedArtworks, getGlobal, getArtworks } from '@/lib/api';
import { Artwork, StrapiGlobal } from '@/types/strapi';

export default async function Home() {
  const featuredArtworksData = await getFeaturedArtworks(3);
  const globalData = await getGlobal();
  const newArtworksData = await getArtworks({
    sort: ['createdAt:desc'],
    pagination: { limit: 6 }
  });
  
  const featuredArtworks = featuredArtworksData.data || [];
  const newArtworks = newArtworksData.data || [];
  const global = globalData.data;

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[80vh] w-full">
        {featuredArtworks[0]?.mainImage && (
          <div className="absolute inset-0">
            <Image
              src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${featuredArtworks[0].mainImage.formats.large.url}`}
              alt={featuredArtworks[0].title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black bg-opacity-30" />
          </div>
        )}
        <div className="relative h-full container mx-auto px-4 flex flex-col items-center justify-center text-center text-white">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
            {global?.siteName || 'Art Gallery'}
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mb-10 font-light">
            {global?.siteDescription || 'Discover unique and beautiful artwork from talented artists.'}
          </p>
          <div className="flex gap-4">
            <Link
              href="/artworks"
              className="bg-white text-gray-900 font-medium px-8 py-3 rounded-lg text-lg hover:bg-opacity-90 transition"
            >
              Browse Gallery
            </Link>
            <Link
              href="/artists"
              className="border-2 border-white text-white font-medium px-8 py-3 rounded-lg text-lg hover:bg-white hover:text-gray-900 transition"
            >
              Meet Artists
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Artworks */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold">Featured Artworks</h2>
            <Link
              href="/artworks?featured=true"
              className="text-gray-600 hover:text-gray-900 transition"
            >
              View All Featured →
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredArtworks.map((artwork) => (
              <Link 
                href={`/artworks/${artwork.slug}`} 
                key={artwork.id}
                className="group"
              >
                <div className="bg-white rounded-lg overflow-hidden transition-all duration-300 group-hover:shadow-xl">
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
                    <p className="text-gray-700 line-clamp-2 mb-4">
                      {artwork.shortDescription}
                    </p>
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
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold">New Arrivals</h2>
            <Link
              href="/artworks?sort=newest"
              className="text-gray-600 hover:text-gray-900 transition"
            >
              View All New →
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {newArtworks.map((artwork) => (
              <Link 
                href={`/artworks/${artwork.slug}`} 
                key={artwork.id}
                className="group"
              >
                <div className="bg-white rounded-lg overflow-hidden transition-all duration-300 group-hover:shadow-xl">
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
                    <p className="text-gray-700 line-clamp-2 mb-4">
                      {artwork.shortDescription}
                    </p>
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
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Browse by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {['Paintings', 'Photography', 'Sculptures', 'Digital Art'].map((category) => (
              <Link
                key={category}
                href={`/artworks?category=${category.toLowerCase()}`}
                className="group"
              >
                <div className="relative aspect-square rounded-lg overflow-hidden">
                  <div className="absolute inset-0 bg-gray-900 bg-opacity-40 group-hover:bg-opacity-30 transition-all duration-300" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <h3 className="text-2xl font-semibold text-white">{category}</h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-6">About Our Gallery</h2>
          <p className="text-lg text-gray-700 mb-8 leading-relaxed">
            We showcase a curated collection of exceptional artworks spanning various styles and mediums. 
            Our mission is to connect art lovers with unique pieces that inspire and transform spaces.
            Each artwork tells a story, and we're here to help you find the perfect piece for your collection.
          </p>
          <div className="flex justify-center gap-8">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">1000+</h3>
              <p className="text-gray-600">Artworks</p>
            </div>
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">200+</h3>
              <p className="text-gray-600">Artists</p>
            </div>
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">50+</h3>
              <p className="text-gray-600">Categories</p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Stay Updated</h2>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter to receive updates on new artworks, featured artists, and exclusive offers.
          </p>
          <form className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-gray-500"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-white text-gray-900 font-medium rounded-lg hover:bg-gray-100 transition"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
