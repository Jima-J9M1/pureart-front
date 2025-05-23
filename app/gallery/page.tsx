import { Metadata } from 'next';
import { Suspense } from 'react';
import GalleryContent from '../components/GalleryContent';

export const metadata: Metadata = {
  title: 'Gallery - EB Art',
  description: 'Browse our collection of contemporary artworks.',
};

export default function GalleryPage() {
  return (
    <Suspense 
      fallback={
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
      }
    >
      <GalleryContent />
    </Suspense>
  );
} 