import React from 'react';
import type { FilterState, Category, Brand } from '../types/product';

interface ProductFiltersProps {
  filters: FilterState;
  categories: Category[];
  brands: Brand[];
  onFiltersChange: (filters: FilterState) => void;
}

export default function ProductFilters({ filters, categories, brands, onFiltersChange }: ProductFiltersProps) {
  const handlePriceRangeChange = (field: 'min' | 'max', value: number) => {
    onFiltersChange({
      ...filters,
      priceRange: {
        ...filters.priceRange,
        [field]: value
      }
    });
  };

  const handleCategoryToggle = (category: string) => {
    const isSelected = filters.selectedCategories.includes(category);
    const newCategories = isSelected
      ? filters.selectedCategories.filter(c => c !== category)
      : [...filters.selectedCategories, category];
    
    onFiltersChange({
      ...filters,
      selectedCategories: newCategories
    });
  };

  const handleBrandToggle = (brand: string) => {
    const isSelected = filters.selectedBrands.includes(brand);
    const newBrands = isSelected
      ? filters.selectedBrands.filter(b => b !== brand)
      : [...filters.selectedBrands, brand];
    
    onFiltersChange({
      ...filters,
      selectedBrands: newBrands
    });
  };

  return (
    <div className="w-80 bg-white p-6 border-r border-gray-200 h-screen sticky top-20 overflow-y-auto">
      {/* Price Range */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Price Range</h3>
        <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
          <span>${filters.priceRange.min.toLocaleString()} COP</span>
          <span>${filters.priceRange.max.toLocaleString()} COP</span>
        </div>
        
        {/* Range Slider */}
        <div className="relative">
          <input
            type="range"
            min="0"
            max="50000"
            step="1000"
            value={filters.priceRange.min}
            onChange={(e) => handlePriceRangeChange('min', parseInt(e.target.value))}
            className="absolute w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <input
            type="range"
            min="0"
            max="50000"
            step="1000"
            value={filters.priceRange.max}
            onChange={(e) => handlePriceRangeChange('max', parseInt(e.target.value))}
            className="absolute w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>
      </div>

      {/* Product Categories */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Product Categories</h3>
        <div className="space-y-3">
          {categories.map(category => (
            <label key={category.name} className="flex items-center justify-between cursor-pointer p-2 hover:bg-gray-50 rounded">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.selectedCategories.includes(category.name)}
                  onChange={() => handleCategoryToggle(category.name)}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="ml-3 text-gray-700">{category.name}</span>
              </div>
              <span className="text-gray-400 text-sm">({category.count})</span>
            </label>
          ))}
        </div>
      </div>

      {/* Brands */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Brands</h3>
        <div className="space-y-3">
          {brands.map(brand => (
            <label key={brand.name} className="flex items-center justify-between cursor-pointer p-2 hover:bg-gray-50 rounded">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.selectedBrands.includes(brand.name)}
                  onChange={() => handleBrandToggle(brand.name)}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="ml-3 text-gray-700">{brand.name}</span>
              </div>
              <span className="text-gray-400 text-sm">({brand.count})</span>
            </label>
          ))}
        </div>
      </div>

      {/* Tags */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Tags</h3>
        <p className="text-gray-500 text-sm">No tags available</p>
      </div>
    </div>
  );
}
