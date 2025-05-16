import { Metadata } from 'next';
import Image from 'next/image';
import { ArtworkInquiryForm } from '@/components/inquiry/artwork-inquiry-form';

export const metadata: Metadata = {
  title: 'Artwork Details - EB Art',
  description: 'View artwork details and inquire about this piece.',
};

interface ArtworkPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default function ArtworkPage({ params }: ArtworkPageProps) {
  // This will be replaced with actual data fetching from Strapi
  console.log(params);
  const artwork = {
    id: '1',
    title: 'Sample Artwork',
    description: 'A beautiful piece of art that captures the essence of contemporary expression.',
    imageUrl: '/placeholder.jpg',
    category: 'Painting',
    year: 2024,
    dimensions: '100 x 100 cm',
    medium: 'Oil on canvas',
    status: 'Available for Inquiry',
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="lg:grid lg:grid-cols-2 lg:gap-x-8">
        {/* Image gallery */}
        <div className="lg:max-w-lg lg:self-end">
          <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg">
            <Image
              src={artwork.imageUrl}
              alt={artwork.title}
              width={800}
              height={800}
              className="h-full w-full object-cover object-center"
            />
          </div>
        </div>

        {/* Artwork details */}
        <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            {artwork.title}
          </h1>
          
          <div className="mt-6">
            <h3 className="sr-only">Description</h3>
            <p className="text-base text-gray-700">{artwork.description}</p>
          </div>

          <div className="mt-6">
            <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
              <div>
                <dt className="text-sm font-medium text-gray-500">Category</dt>
                <dd className="mt-1 text-sm text-gray-900">{artwork.category}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Year</dt>
                <dd className="mt-1 text-sm text-gray-900">{artwork.year}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Dimensions</dt>
                <dd className="mt-1 text-sm text-gray-900">{artwork.dimensions}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Medium</dt>
                <dd className="mt-1 text-sm text-gray-900">{artwork.medium}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Status</dt>
                <dd className="mt-1 text-sm text-gray-900">{artwork.status}</dd>
              </div>
            </dl>
          </div>

          {/* Inquiry form */}
          <div className="mt-10">
            <ArtworkInquiryForm artworkId={artwork.id} artworkTitle={artwork.title} />
          </div>
        </div>
      </div>
    </div>
  );
} 