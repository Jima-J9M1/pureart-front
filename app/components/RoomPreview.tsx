'use client';

import Image from 'next/image';
import { LuMoveDiagonal2 } from "react-icons/lu";
import { useRef, useState, useEffect } from 'react';

interface RoomPreviewProps {
  imageUrl: string;
  selectedRoom: {
    id: string;
    background: string;
  };
  wallColor: string;
  colorOpacity: number;
  customRoomImage: string | null;
  artworkSize: { width: number; height: number };
  setArtworkSize: (size: { width: number; height: number }) => void;
  artworkPosition: { x: number; y: number };
  setArtworkPosition: (position: { x: number; y: number }) => void;
}

export default function RoomPreview({
  imageUrl,
  selectedRoom,
  wallColor,
  colorOpacity,
  customRoomImage,
  artworkSize,
  setArtworkSize,
  artworkPosition,
  setArtworkPosition
}: RoomPreviewProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [isArtworkHovered, setIsArtworkHovered] = useState(false);
  const artworkRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Refs for drag operation
  const dragOffsetRef = useRef({ x: 0, y: 0 });
  const resizeStartPosRef = useRef({ x: 0, y: 0 });
  const startSizeRef = useRef({ width: 0, height: 0 });

  // Dragging Logic
  const handleArtworkMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    
    if (!artworkRef.current || !containerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    
    const currentArtworkCenterXViewport = containerRect.left + artworkPosition.x * containerRect.width;
    const currentArtworkCenterYViewport = containerRect.top + artworkPosition.y * containerRect.height;

    dragOffsetRef.current = {
      x: e.clientX - currentArtworkCenterXViewport,
      y: e.clientY - currentArtworkCenterYViewport,
    };
    
    setIsDragging(true);
  };

  useEffect(() => {
    if (!isDragging) return;

    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      
      const newArtworkCenterXViewport = e.clientX - dragOffsetRef.current.x;
      const newArtworkCenterYViewport = e.clientY - dragOffsetRef.current.y;

      let newX = (newArtworkCenterXViewport - containerRect.left) / containerRect.width;
      let newY = (newArtworkCenterYViewport - containerRect.top) / containerRect.height;

      newX = Math.max(0, Math.min(1, newX));
      newY = Math.max(0, Math.min(1, newY));

      setArtworkPosition({ x: newX, y: newY });
    };

    const handleGlobalMouseUp = () => {
      setIsDragging(false);
    };

    window.addEventListener('mousemove', handleGlobalMouseMove);
    window.addEventListener('mouseup', handleGlobalMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleGlobalMouseMove);
      window.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, [isDragging, setArtworkPosition]);

  // Resizing Logic
  const handleResizeStart = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    
    resizeStartPosRef.current = { x: e.clientX, y: e.clientY };
    startSizeRef.current = { ...artworkSize };
    setIsResizing(true);
  };
  
  useEffect(() => {
    if (!isResizing) return;

    const handleGlobalResizeMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      const deltaX = e.clientX - resizeStartPosRef.current.x;
      
      const scale = 0.5;
      const deltaWidthPercent = (deltaX / containerRect.width) * 100 * scale;
      
      let newWidthPercent = startSizeRef.current.width + deltaWidthPercent;
      newWidthPercent = Math.max(10, Math.min(100, newWidthPercent));

      const aspectRatio = startSizeRef.current.width / startSizeRef.current.height;
      const newHeightPercent = (aspectRatio && isFinite(aspectRatio)) ? newWidthPercent / aspectRatio : startSizeRef.current.height;
      
      setArtworkSize({ width: newWidthPercent, height: newHeightPercent });
    };

    const handleGlobalResizeMouseUp = () => {
      setIsResizing(false);
    };

    window.addEventListener('mousemove', handleGlobalResizeMouseMove);
    window.addEventListener('mouseup', handleGlobalResizeMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleGlobalResizeMouseMove);
      window.removeEventListener('mouseup', handleGlobalResizeMouseUp);
    };
  }, [isResizing, setArtworkSize]);

  return (
    <div className="relative aspect-[4/3] w-full max-w-4xl mx-auto mb-6 rounded-lg overflow-hidden">
      <div 
        ref={containerRef}
        className="relative w-full h-full"
        style={{ backgroundColor: wallColor }}
      >
        {/* Room Background */}
        <Image
          src={selectedRoom.id === 'custom' && customRoomImage ? customRoomImage : selectedRoom.background}
          alt="Room background"
          fill
          className="object-cover"
          style={{ opacity: colorOpacity }}
          priority
        />
        
        {/* Artwork */}
        <div
          ref={artworkRef}
          className="absolute cursor-move"
          style={{
            width: `${artworkSize.width}%`,
            height: `${artworkSize.height}%`,
            left: `${artworkPosition.x * 100}%`,
            top: `${artworkPosition.y * 100}%`,
            transform: 'translate(-50%, -50%)',
            touchAction: 'none',
            userSelect: 'none',
          }}
          onMouseDown={handleArtworkMouseDown}
          onMouseEnter={() => setIsArtworkHovered(true)}
          onMouseLeave={() => setIsArtworkHovered(false)}
        >
          <Image
            src={imageUrl}
            alt="Artwork in room"
            fill
            className="object-contain border-2"
            style={{ pointerEvents: 'none' }}
            priority
          />
          {/* Resize Handle */}
          {(isArtworkHovered || isResizing) && (
            <div
              className="absolute -bottom-4 -right-1 w-8 h-8 bg-indigo-600 border-2 border-white rounded-full cursor-se-resize flex items-center justify-center shadow-lg hover:bg-indigo-700"
              onMouseDown={handleResizeStart}
              title="Resize Artwork"
            >
              <LuMoveDiagonal2 className="w-4 h-4 text-white" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 