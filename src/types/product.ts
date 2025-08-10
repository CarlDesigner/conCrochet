export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  brand: string;
  description?: string;
  tags?: string[];
}

export interface FilterState {
  priceRange: {
    min: number;
    max: number;
  };
  selectedCategories: string[];
  selectedBrands: string[];
  selectedTags: string[];
}

export interface Category {
  name: string;
  count: number;
}

export interface Brand {
  name: string;
  count: number;
}

export type ViewMode = 'grid' | 'list';
export type SortBy = 'relevance' | 'price-low' | 'price-high' | 'newest';
