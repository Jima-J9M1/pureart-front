import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Gallery - EB Art',
  description: 'Browse our collection of contemporary artworks.',
};

export default function GalleryPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Gallery
        </h1>
        <p className="mt-4 text-lg text-gray-500">
          Explore our collection of contemporary artworks
        </p>
      </div>
      
      {/* Gallery grid will be implemented here */}
      <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {/* Artwork cards will be added here */}
      </div>
    </div>
  );
} 