'use client';

import { LuMoveDiagonal2 } from "react-icons/lu";

// Room style presets
const ROOM_STYLES = [
  {
    id: 'modern',
    name: 'Modern Living',
    background: '/Images/living-room.jpg',
    description: 'Clean lines and contemporary design'
  },
  {
    id: 'classic',
    name: 'Classic Interior',
    background: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&h=800&q=80',
    description: 'Timeless elegance and sophistication'
  },
  {
    id: 'minimalist',
    name: 'Minimalist Space',
    background: 'https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?auto=format&fit=crop&w=1200&h=800&q=80',
    description: 'Simple and uncluttered design'
  },
  {
    id: 'industrial',
    name: 'Industrial Loft',
    background: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&h=800&q=80',
    description: 'Raw and urban aesthetic'
  },
  {
    id: 'custom',
    name: 'Custom Room',
    background: '',
    description: 'Upload your own room image'
  }
];

// Wall color options
const WALL_COLORS = [
  { name: 'None', value: 'transparent' },
  { name: 'White', value: '#FFFFFF' },
  { name: 'Light Gray', value: '#F5F5F5' },
  { name: 'Beige', value: '#F5F5DC' },
  { name: 'Light Blue', value: '#E6F3FF' },
  { name: 'Sage Green', value: '#E0EDE0' }
];

interface RoomControlsProps {
  selectedRoom: typeof ROOM_STYLES[0];
  setSelectedRoom: (room: typeof ROOM_STYLES[0]) => void;
  wallColor: string;
  setWallColor: (color: string) => void;
  colorOpacity: number;
  setColorOpacity: (opacity: number) => void;
  handleCustomRoomUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function RoomControls({
  selectedRoom,
  setSelectedRoom,
  wallColor,
  setWallColor,
  colorOpacity,
  setColorOpacity,
  handleCustomRoomUpload
}: RoomControlsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Room Style Selection */}
      <div>
        <h2 className="text-lg font-semibold mb-3">Room Style</h2>
        <div className="grid grid-cols-2 gap-3">
          {ROOM_STYLES.map((room) => (
            <button
              key={room.id}
              onClick={() => setSelectedRoom(room)}
              className={`p-3 rounded-lg border transition ${
                selectedRoom.id === room.id
                  ? 'border-indigo-600 bg-indigo-50'
                  : 'border-gray-200 hover:border-indigo-300'
              }`}
            >
              <div className="text-sm font-medium">{room.name}</div>
              <div className="text-xs text-gray-500">{room.description}</div>
            </button>
          ))}
        </div>
        {/* Custom Room Upload */}
        {selectedRoom.id === 'custom' && (
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload Room Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleCustomRoomUpload}
              className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-indigo-50 file:text-indigo-700
                hover:file:bg-indigo-100"
            />
          </div>
        )}
      </div>

      {/* Customization Options */}
      <div>
        <h2 className="text-lg font-semibold mb-3">Customize</h2>
        <div className="space-y-4">
          {/* Wall Color */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Wall Color
            </label>
            <div className="flex gap-2">
              {WALL_COLORS.map((color) => (
                <button
                  key={color.name}
                  onClick={() => setWallColor(color.value)}
                  className={`w-8 h-8 rounded-full border-2 transition ${
                    wallColor === color.value
                      ? 'border-indigo-600'
                      : 'border-transparent hover:border-gray-300'
                  }`}
                  style={{ 
                    backgroundColor: color.value,
                    backgroundImage: color.value === 'transparent' ? 'linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%)' : 'none',
                    backgroundSize: '10px 10px',
                    backgroundPosition: '0 0, 0 5px, 5px -5px, -5px 0px'
                  }}
                  title={color.name}
                />
              ))}
            </div>
          </div>

          {/* Color Opacity */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Room Image Opacity
            </label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={colorOpacity}
              onChange={(e) => setColorOpacity(parseFloat(e.target.value))}
              className="w-full"
            />
          </div>

          {/* Artwork Size */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Artwork Size
            </label>
            <div className="text-sm text-gray-500 mb-2">
              Hover over the artwork; a resize handle will appear in its bottom-right corner. Drag it to resize.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 