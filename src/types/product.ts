export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  /**
   * Si se define, se usará este publicId de Cloudinary para generar la imagen.
   * Deja el campo `image` como fallback (por ejemplo, URL absoluta o ruta local).
   */
  imagePublicId?: string;
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
  showDiscountsOnly?: boolean;
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
