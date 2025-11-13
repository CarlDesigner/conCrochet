import React from 'react';
import type { FilterState, Category, Brand } from '../types/product';

interface ProductFiltersProps {
  filters: FilterState;
  categories: Category[];
  brands: Brand[];
  tags: { name: string; count: number }[];
  maxPrice: number;
  onFiltersChange: (filters: FilterState) => void;
}

export default function ProductFilters({ filters, categories, brands, tags, maxPrice, onFiltersChange }: ProductFiltersProps) {
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

  const handleTagToggle = (tag: string) => {
    const isSelected = filters.selectedTags.includes(tag);
    const newTags = isSelected
      ? filters.selectedTags.filter(t => t !== tag)
      : [...filters.selectedTags, tag];
    
    onFiltersChange({
      ...filters,
      selectedTags: newTags
    });
  };

  return (
    <div className="w-80 bg-white p-6 border-r border-gray-200 h-screen sticky top-20 overflow-y-auto">
      {/* Price Range */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Rango de Precios</h3>
        <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
          <span>${filters.priceRange.min.toLocaleString()} COP</span>
          <span>${filters.priceRange.max.toLocaleString()} COP</span>
        </div>
        
        {/* Range Slider Simple */}
        <div className="relative mb-4">
          <div className="relative h-6 flex items-center">
            {/* Track de fondo */}
            <div className="absolute w-full h-2 bg-gray-200 rounded-lg"></div>
            
            {/* Track activo (rango seleccionado) */}
            <div 
              className="absolute h-2 bg-blue-500 rounded-lg"
              style={{
                left: `${(filters.priceRange.min / maxPrice) * 100}%`,
                width: `${((filters.priceRange.max - filters.priceRange.min) / maxPrice) * 100}%`
              }}
            ></div>
            
            {/* Círculo del precio mínimo */}
            <div
              className="absolute w-4 h-4 bg-blue-600 border-2 border-white rounded-full shadow-lg cursor-pointer z-30 transform -translate-y-1/2 -translate-x-1/2"
              style={{
                left: `${(filters.priceRange.min / maxPrice) * 100}%`,
                top: '50%'
              }}
              onMouseDown={(e) => {
                const slider = e.currentTarget.parentElement;
                const rect = slider!.getBoundingClientRect();
                
                const handleMouseMove = (event: MouseEvent) => {
                  const x = event.clientX - rect.left;
                  const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
                  const newValue = Math.round((percentage / 100) * maxPrice / 1000) * 1000;
                  
                  if (newValue <= filters.priceRange.max) {
                    handlePriceRangeChange('min', newValue);
                  }
                };
                
                const handleMouseUp = () => {
                  document.removeEventListener('mousemove', handleMouseMove);
                  document.removeEventListener('mouseup', handleMouseUp);
                };
                
                document.addEventListener('mousemove', handleMouseMove);
                document.addEventListener('mouseup', handleMouseUp);
                e.preventDefault();
              }}
            ></div>
            
            {/* Círculo del precio máximo */}
            <div
              className="absolute w-4 h-4 bg-blue-600 border-2 border-white rounded-full shadow-lg cursor-pointer z-30 transform -translate-y-1/2 -translate-x-1/2"
              style={{
                left: `${(filters.priceRange.max / maxPrice) * 100}%`,
                top: '50%'
              }}
              onMouseDown={(e) => {
                const slider = e.currentTarget.parentElement;
                const rect = slider!.getBoundingClientRect();
                
                const handleMouseMove = (event: MouseEvent) => {
                  const x = event.clientX - rect.left;
                  const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
                  const newValue = Math.round((percentage / 100) * maxPrice / 1000) * 1000;
                  
                  if (newValue >= filters.priceRange.min) {
                    handlePriceRangeChange('max', newValue);
                  }
                };
                
                const handleMouseUp = () => {
                  document.removeEventListener('mousemove', handleMouseMove);
                  document.removeEventListener('mouseup', handleMouseUp);
                };
                
                document.addEventListener('mousemove', handleMouseMove);
                document.addEventListener('mouseup', handleMouseUp);
                e.preventDefault();
              }}
            ></div>
          </div>
        </div>
      </div>

      {/* Ofertas */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Ofertas</h3>
        <div className="space-y-3">
          <label className="flex items-center cursor-pointer p-2 hover:bg-gray-50 rounded">
            <input
              type="checkbox"
              checked={filters.showDiscountsOnly || false}
              onChange={(e) => onFiltersChange({
                ...filters,
                showDiscountsOnly: e.target.checked
              })}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="ml-3 text-gray-700">Solo productos en oferta</span>
          </label>
        </div>
      </div>

      {/* Product Categories */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Categorias Productos</h3>
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
        <div className="flex flex-wrap gap-2">
          {brands.map(brand => (
            <button
              key={brand.name}
              onClick={() => handleBrandToggle(brand.name)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors duration-200 ${
                filters.selectedBrands.includes(brand.name)
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {brand.name} ({brand.count})
            </button>
          ))}
        </div>
      </div>

      {/* Tags */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Etiquetas</h3>
        {tags.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {tags.map(tag => (
              <button
                key={tag.name}
                onClick={() => handleTagToggle(tag.name)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors duration-200 ${
                  filters.selectedTags.includes(tag.name)
                    ? 'bg-green-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {tag.name} ({tag.count})
              </button>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-sm">No hay etiquetas disponibles</p>
        )}
      </div>
    </div>
  );
}
