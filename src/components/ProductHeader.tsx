import React from 'react';
import type { ViewMode, SortBy } from '../types/product';

interface ProductHeaderProps {
  viewMode: ViewMode;
  sortBy: SortBy;
  totalProducts: number;
  onViewModeChange: (mode: ViewMode) => void;
  onSortByChange: (sort: SortBy) => void;
}

export default function ProductHeader({ 
  viewMode, 
  sortBy, 
  totalProducts, 
  onViewModeChange, 
  onSortByChange 
}: ProductHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-6 bg-white p-4 rounded-lg shadow-sm">
      {/* Views Controls */}
      <div className="flex items-center space-x-4">
        <span className="text-gray-700 font-medium">Views</span>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => onViewModeChange('grid')}
            className={`p-2 rounded ${
              viewMode === 'grid' 
                ? 'bg-gray-900 text-white' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
            title="Vista en cuadrícula"
          >
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 4a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 12a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H4a1 1 0 01-1-1v-4zM11 4a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1V4zM11 12a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" clipRule="evenodd" />
            </svg>
          </button>
          <button
            onClick={() => onViewModeChange('list')}
            className={`p-2 rounded ${
              viewMode === 'list'
                ? 'bg-gray-900 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
            title="Vista en lista"
          >
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 4a1 1 0 000 2h14a1 1 0 100-2H3zM3 8a1 1 0 000 2h14a1 1 0 100-2H3zM3 12a1 1 0 100 2h14a1 1 0 100-2H3z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>

      {/* Products Count */}
      <div className="text-gray-600">
        <span>{totalProducts} productos encontrados</span>
      </div>

      {/* Sort By */}
      <div className="flex items-center space-x-4">
        <span className="text-gray-700 font-medium">Sort By</span>
        <select
          value={sortBy}
          onChange={(e) => onSortByChange(e.target.value as SortBy)}
          className="border border-gray-300 rounded-md px-3 py-2 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="relevance">Relevancia</option>
          <option value="price-low">Precio: Menor a Mayor</option>
          <option value="price-high">Precio: Mayor a Menor</option>
          <option value="newest">Más Nuevos</option>
        </select>
      </div>
    </div>
  );
}
