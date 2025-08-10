import React, { useState, useMemo } from 'react';
import Navbar from './Navbar';
import ProductFilters from './ProductFilters';
import ProductHeader from './ProductHeader';
import ProductGrid from './ProductGrid';
import ProductList from './ProductList';
import { mockProducts, categories, brands } from '../data/products';
import type { FilterState, ViewMode, SortBy, Product } from '../types/product';

export default function ProductsPage() {
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [sortBy, setSortBy] = useState<SortBy>('relevance');
  const [filters, setFilters] = useState<FilterState>({
    priceRange: { min: 0, max: 50000 },
    selectedCategories: [],
    selectedBrands: [],
    selectedTags: []
  });

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = mockProducts.filter(product => {
      // Price filter
      const priceInRange = product.price >= filters.priceRange.min && 
                           product.price <= filters.priceRange.max;
      
      // Category filter
      const categoryMatch = filters.selectedCategories.length === 0 || 
                           filters.selectedCategories.includes(product.category);
      
      // Brand filter
      const brandMatch = filters.selectedBrands.length === 0 || 
                        filters.selectedBrands.includes(product.brand);
      
      return priceInRange && categoryMatch && brandMatch;
    });

    // Sort products
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        // For now, just reverse the array (assuming newer products are at the end)
        filtered.reverse();
        break;
      case 'relevance':
      default:
        // Keep original order for relevance
        break;
    }

    return filtered;
  }, [filters, sortBy]);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-7xl mx-auto flex">
          {/* Sidebar Filters */}
          <ProductFilters
            filters={filters}
            categories={categories}
            brands={brands}
            onFiltersChange={setFilters}
          />
          
          {/* Main Content */}
          <div className="flex-1 p-6">
            <ProductHeader
              viewMode={viewMode}
              sortBy={sortBy}
              totalProducts={filteredAndSortedProducts.length}
              onViewModeChange={setViewMode}
              onSortByChange={setSortBy}
            />
            
            {/* Products Display */}
            {viewMode === 'grid' ? (
              <ProductGrid products={filteredAndSortedProducts} />
            ) : (
              <ProductList products={filteredAndSortedProducts} />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
