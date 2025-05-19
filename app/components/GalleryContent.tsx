'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { fetchArtData } from '../actions';
import { Artwork } from '@/types/strapi';
import GalleryFilters from './GalleryFilters';
import ArtworkGrid from './ArtworkGrid';

export default function GalleryContent() {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: '',
    style: '',
    priceRange: '',
    sortBy: 'newest'
  });
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        const response = await fetchArtData();
        setArtworks(response ?? []);
      } catch (error) {
        console.error('Error fetching artworks:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchArtworks();
  }, []);

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    
    // Update URL with filters
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`/gallery?${params.toString()}`);
  };

  const filteredArtworks = artworks.filter(artwork => {
    if (filters.category && artwork.category.Name !== filters.category) return false;
    if (filters.style && artwork.tags.some(tag => tag.Name === filters.style)) return false;
    if (filters.priceRange) {
      const [min, max] = filters.priceRange.split('-').map(Number);
      if (artwork.price < min || artwork.price > max) return false;
    }
    return true;
  });

  const sortedArtworks = [...filteredArtworks].sort((a, b) => {
    switch (filters.sortBy) {
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      case 'newest':
        return b.Year - a.Year;
      case 'oldest':
        return a.Year - b.Year;
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Gallery
          </h1>
          <p className="mt-4 text-lg text-gray-500">
            Explore our collection of contemporary artworks
          </p>
        </div>

        <GalleryFilters filters={filters} onFilterChange={handleFilterChange} />
        <ArtworkGrid artworks={sortedArtworks} loading={loading} />
      </div>
    </div>
  );
} 