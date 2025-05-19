'use client';

import { useSearchParams, useRouter } from 'next/navigation';

interface GalleryFiltersProps {
  filters: {
    category: string;
    style: string;
    priceRange: string;
    sortBy: string;
  };
  onFilterChange: (key: string, value: string) => void;
}

export default function GalleryFilters({ filters, onFilterChange }: GalleryFiltersProps) {
  return (
    <div className="mb-8 bg-white rounded-lg shadow p-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <select
          value={filters.category}
          onChange={(e) => onFilterChange('category', e.target.value)}
          className="rounded-lg border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="">All Categories</option>
          <option value="painting">Paintings</option>
          <option value="sculpture">Sculptures</option>
          <option value="photography">Photography</option>
          <option value="digital">Digital Art</option>
        </select>

        <select
          value={filters.style}
          onChange={(e) => onFilterChange('style', e.target.value)}
          className="rounded-lg border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="">All Styles</option>
          <option value="abstract">Abstract</option>
          <option value="realism">Realism</option>
          <option value="impressionism">Impressionism</option>
          <option value="contemporary">Contemporary</option>
        </select>

        <select
          value={filters.priceRange}
          onChange={(e) => onFilterChange('priceRange', e.target.value)}
          className="rounded-lg border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="">All Prices</option>
          <option value="0-1000">Under $1,000</option>
          <option value="1000-5000">$1,000 - $5,000</option>
          <option value="5000-10000">$5,000 - $10,000</option>
          <option value="10000-999999">Over $10,000</option>
        </select>

        <select
          value={filters.sortBy}
          onChange={(e) => onFilterChange('sortBy', e.target.value)}
          className="rounded-lg border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
        </select>
      </div>
    </div>
  );
} 