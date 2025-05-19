'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import RoomPreview from './RoomPreview';
import RoomControls from './RoomControls';

export default function RoomViewContent() {
  const searchParams = useSearchParams();
  const imageUrl = searchParams.get('image');

  const [selectedRoom, setSelectedRoom] = useState({
    id: 'modern',
    name: 'Modern Living',
    background: '/Images/living-room.jpg',
    description: 'Clean lines and contemporary design'
  });
  const [wallColor, setWallColor] = useState('transparent');
  const [artworkSize, setArtworkSize] = useState({ width: 30, height: 30 });
  const [artworkPosition, setArtworkPosition] = useState({ x: 0.5, y: 0.5 });
  const [customRoomImage, setCustomRoomImage] = useState<string | null>(null);
  const [colorOpacity, setColorOpacity] = useState(0.5);

  const handleCustomRoomUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setCustomRoomImage(event.target?.result as string);
        setSelectedRoom({
          id: 'custom',
          name: 'Custom Room',
          background: '',
          description: 'Upload your own room image'
        });
      };
      reader.readAsDataURL(file);
    }
  };

  if (!imageUrl) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">No image selected</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">View in Room</h1>
            <button
              onClick={() => window.close()}
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition"
            >
              Close Preview
            </button>
          </div>

          <RoomPreview
            imageUrl={imageUrl}
            selectedRoom={selectedRoom}
            wallColor={wallColor}
            colorOpacity={colorOpacity}
            customRoomImage={customRoomImage}
            artworkSize={artworkSize}
            setArtworkSize={setArtworkSize}
            artworkPosition={artworkPosition}
            setArtworkPosition={setArtworkPosition}
          />

          <RoomControls
            selectedRoom={selectedRoom}
            setSelectedRoom={setSelectedRoom}
            wallColor={wallColor}
            setWallColor={setWallColor}
            colorOpacity={colorOpacity}
            setColorOpacity={setColorOpacity}
            handleCustomRoomUpload={handleCustomRoomUpload}
          />

          {/* Instructions */}
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Drag the artwork to position it in the room. Use the resize handle to adjust the size.
              {selectedRoom.id === 'custom' && ' Upload your own room image to see how the artwork looks in your space.'}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
} 