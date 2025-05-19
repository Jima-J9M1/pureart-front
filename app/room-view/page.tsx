import { Metadata } from 'next';
import { Suspense } from 'react';
import RoomViewContent from '../components/RoomViewContent';

export const metadata: Metadata = {
  title: 'View in Room - EB Art',
  description: 'See how artwork looks in your space with our room viewer.',
};

export default function RoomViewPage() {
  return (
    <Suspense 
      fallback={
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
      }
    >
      <RoomViewContent />
    </Suspense>
  );
}