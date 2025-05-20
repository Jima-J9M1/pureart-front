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

// Helper to get clientX/clientY from both MouseEvent and TouchEvent
const getEventCoordinates = (e: MouseEvent | TouchEvent | React.MouseEvent | React.TouchEvent) => {
  if ('touches' in e && e.touches.length > 0) {
    return { x: e.touches[0].clientX, y: e.touches[0].clientY };
  }
  if ('changedTouches' in e && e.changedTouches.length > 0) { // For touchend
    return { x: e.changedTouches[0].clientX, y: e.changedTouches[0].clientY };
  }
  return { x: (e as MouseEvent).clientX, y: (e as MouseEvent).clientY };
};


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
  const [isArtworkHovered, setIsArtworkHovered] = useState(false); // Hover is mouse-specific
  const artworkRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const dragOffsetRef = useRef({ x: 0, y: 0 });
  const resizeStartPosRef = useRef({ x: 0, y: 0 });
  const startSizeRef = useRef({ width: 0, height: 0 });

  // Dragging Logic
  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    // For touch, prevent default scroll/zoom
    if (e.type === 'touchstart') {
      e.preventDefault();
    } else {
        // For mouse, prevent default image drag behavior
        (e as React.MouseEvent).preventDefault();
    }


    if (!artworkRef.current || !containerRef.current) return;

    const coords = getEventCoordinates(e);
    const containerRect = containerRef.current.getBoundingClientRect();

    const currentArtworkCenterXViewport = containerRect.left + artworkPosition.x * containerRect.width;
    const currentArtworkCenterYViewport = containerRect.top + artworkPosition.y * containerRect.height;

    dragOffsetRef.current = {
      x: coords.x - currentArtworkCenterXViewport,
      y: coords.y - currentArtworkCenterYViewport,
    };

    setIsDragging(true);
  };

  useEffect(() => {
    if (!isDragging) return;

    const handleGlobalMove = (e: MouseEvent | TouchEvent) => {
      if (e.type === 'touchmove') {
        // e.preventDefault(); // Potentially prevent scroll during move, if needed
      }
      if (!containerRef.current) return;

      const coords = getEventCoordinates(e);
      const containerRect = containerRef.current.getBoundingClientRect();

      const newArtworkCenterXViewport = coords.x - dragOffsetRef.current.x;
      const newArtworkCenterYViewport = coords.y - dragOffsetRef.current.y;

      let newX = (newArtworkCenterXViewport - containerRect.left) / containerRect.width;
      let newY = (newArtworkCenterYViewport - containerRect.top) / containerRect.height;

      // Clamp values between 0 and 1 (0% and 100%)
      newX = Math.max(0, Math.min(1, newX));
      newY = Math.max(0, Math.min(1, newY));

      setArtworkPosition({ x: newX, y: newY });
    };

    const handleGlobalEnd = () => {
      setIsDragging(false);
    };

    window.addEventListener('mousemove', handleGlobalMove);
    window.addEventListener('mouseup', handleGlobalEnd);
    // Add touch event listeners
    // Use { passive: false } for touchmove if you intend to call e.preventDefault() inside handleGlobalMove
    window.addEventListener('touchmove', handleGlobalMove, { passive: false });
    window.addEventListener('touchend', handleGlobalEnd);
    window.addEventListener('touchcancel', handleGlobalEnd);


    return () => {
      window.removeEventListener('mousemove', handleGlobalMove);
      window.removeEventListener('mouseup', handleGlobalEnd);
      window.removeEventListener('touchmove', handleGlobalMove);
      window.removeEventListener('touchend', handleGlobalEnd);
      window.removeEventListener('touchcancel', handleGlobalEnd);
    };
  }, [isDragging, setArtworkPosition]);

  // Resizing Logic
  const handleResizeInteractionStart = (e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation(); // Prevent drag start
    if (e.type === 'touchstart') {
      e.preventDefault();
    } else {
        (e as React.MouseEvent).preventDefault();
    }


    const coords = getEventCoordinates(e);
    resizeStartPosRef.current = { x: coords.x, y: coords.y };
    startSizeRef.current = { ...artworkSize };
    setIsResizing(true);
  };

  useEffect(() => {
    if (!isResizing) return;

    const handleGlobalResizeMove = (e: MouseEvent | TouchEvent) => {
      if (e.type === 'touchmove') {
        // e.preventDefault(); // Potentially prevent scroll during move
      }
      if (!containerRef.current) return;

      const coords = getEventCoordinates(e);
      const containerRect = containerRef.current.getBoundingClientRect();
      const deltaX = coords.x - resizeStartPosRef.current.x;

      const scale = 0.5; // Sensitivity for resizing
      const deltaWidthPercent = (deltaX / containerRect.width) * 100 * scale;

      let newWidthPercent = startSizeRef.current.width + deltaWidthPercent;
      newWidthPercent = Math.max(10, Math.min(100, newWidthPercent)); // Min 10%, Max 100%

      // Maintain aspect ratio
      // Ensure startSizeRef.current.height is not zero to prevent division by zero
      const aspectRatio = startSizeRef.current.height !== 0 ? startSizeRef.current.width / startSizeRef.current.height : 1;
      const newHeightPercent = (aspectRatio && isFinite(aspectRatio)) ? newWidthPercent / aspectRatio : startSizeRef.current.height;

      setArtworkSize({ width: newWidthPercent, height: newHeightPercent });
    };

    const handleGlobalResizeEnd = () => {
      setIsResizing(false);
    };

    window.addEventListener('mousemove', handleGlobalResizeMove);
    window.addEventListener('mouseup', handleGlobalResizeEnd);
    // Add touch event listeners
    window.addEventListener('touchmove', handleGlobalResizeMove, { passive: false });
    window.addEventListener('touchend', handleGlobalResizeEnd);
    window.addEventListener('touchcancel', handleGlobalResizeEnd);

    return () => {
      window.removeEventListener('mousemove', handleGlobalResizeMove);
      window.removeEventListener('mouseup', handleGlobalResizeEnd);
      window.removeEventListener('touchmove', handleGlobalResizeMove);
      window.removeEventListener('touchend', handleGlobalResizeEnd);
      window.removeEventListener('touchcancel', handleGlobalResizeEnd);
    };
  }, [isResizing, setArtworkSize, artworkSize.height]); // Added artworkSize.height to dependencies for aspect ratio calc

  // For touch devices, the resize handle might not appear with hover.
  // You might want to always show it, or show it if the artwork is "active" (e.g., during drag or resize)
  const showResizeHandle = isArtworkHovered || isResizing || isDragging;


  return (
    <div className="relative aspect-[4/3] w-full max-w-4xl mx-auto mb-6 rounded-lg overflow-hidden select-none"> {/* Added select-none */}
      <div
        ref={containerRef}
        className="relative w-full h-full"
        style={{ backgroundColor: wallColor }}
      >
        <Image
          src={selectedRoom.id === 'custom' && customRoomImage ? customRoomImage : selectedRoom.background}
          alt="Room background"
          fill
          className="object-cover"
          style={{ opacity: colorOpacity }}
          priority
          draggable="false" // Prevent default image drag
        />

        <div
          ref={artworkRef}
          className="absolute cursor-move"
          style={{
            width: `${artworkSize.width}%`,
            height: `${artworkSize.height}%`,
            left: `${artworkPosition.x * 100}%`,
            top: `${artworkPosition.y * 100}%`,
            transform: 'translate(-50%, -50%)',
            touchAction: 'none', // Important for touch interactions
            // userSelect: 'none', // Moved to parent for broader effect
          }}
          onMouseDown={handleDragStart}
          onTouchStart={handleDragStart} // Add touch start for dragging
          onMouseEnter={() => setIsArtworkHovered(true)}
          onMouseLeave={() => setIsArtworkHovered(false)}
        >
          <Image
            src={imageUrl}
            alt="Artwork in room"
            fill
            className="object-contain border-2"
            style={{ pointerEvents: 'none', opacity: colorOpacity }} // pointerEvents: none so it doesn't interfere
            priority
            draggable="false" // Prevent default image drag
          />
          {showResizeHandle && (
            <div
              className="absolute -bottom-4 -right-1 w-8 h-8 bg-indigo-600 border-2 border-white rounded-full cursor-se-resize flex items-center justify-center shadow-lg hover:bg-indigo-700"
              onMouseDown={handleResizeInteractionStart}
              onTouchStart={handleResizeInteractionStart} // Add touch start for resizing
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