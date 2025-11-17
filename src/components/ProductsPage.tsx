import React, { useState, useMemo, useEffect } from 'react';
import ProductFilters from './ProductFilters';
import ProductHeader from './ProductHeader';
import ProductGrid from './ProductGrid';
import ProductList from './ProductList';
import { mockProducts, categories, brands, tags } from '../data/products';
import type { FilterState, ViewMode, SortBy, Product } from '../types/product';

export default function ProductsPage() {
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [sortBy, setSortBy] = useState<SortBy>('relevance');
   // Calcular el precio máximo automáticamente
  const maxPrice = useMemo(() => {
    return Math.max(...mockProducts.map(product => product.price));
  }, []);
  
  const [filters, setFilters] = useState<FilterState>({
    priceRange: { min: 0, max: 100000 }, // Temporal, se actualizará abajo
    selectedCategories: [],
    selectedBrands: [],
    selectedTags: []
  });

  // Leer parámetro de categoría desde la URL (solo en el cliente)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const categoryFromUrl = urlParams.get('category');
      const discountFromUrl = urlParams.get('discount');
      
      if (categoryFromUrl) {
        setFilters(prev => ({
          ...prev,
          selectedCategories: [categoryFromUrl]
        }));
      }
      
      if (discountFromUrl === 'true') {
        // Aplicar filtro de descuentos - esto se manejará en el filtrado de productos
        setFilters(prev => ({
          ...prev,
          showDiscountsOnly: true
        }));
      }
    }
  }, []);

  // Actualizar el filtro cuando se calcule el maxPrice
  useEffect(() => {
    setFilters(prev => ({
      ...prev,
      priceRange: { min: 0, max: maxPrice }
    }));
  }, [maxPrice]);

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
      
      // Tag filter
      const tagMatch = filters.selectedTags.length === 0 ||
                      filters.selectedTags.some(selectedTag => 
                        product.tags?.includes(selectedTag)
                      );
      
      // Discount filter - solo productos con originalPrice (en oferta)
      const discountMatch = !filters.showDiscountsOnly || 
                           (product.originalPrice && product.originalPrice > product.price);
      
      return priceInRange && categoryMatch && brandMatch && tagMatch && discountMatch;
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
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto flex">
          {/* Sidebar Filters */}
          <ProductFilters
            filters={filters}
            categories={categories}
            brands={brands}
            tags={tags}
            maxPrice={maxPrice}
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
  );
}
