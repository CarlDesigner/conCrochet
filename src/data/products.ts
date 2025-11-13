import type { Product, Category, Brand } from '../types/product';

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Ositos Tiernos',
    price: 50000,
    originalPrice: 80000,
    image: '',
    imagePublicId: 'masco1_a8ahiw',
    category: 'Animales',
    brand: 'Crochet Dreams',
    description: 'Adorables ositos tejidos a mano en diferentes colores',
    tags: ['ositos', 'tiernos', 'colores']
  },
  {
    id: '2',
    name: 'Cactus Verde',
    price: 60000,
    originalPrice: 60000,
    image: '',
    imagePublicId: 'planta1_es3xla',
    category: 'Plantas',
    brand: 'Crochet Dreams',
    description: 'Adorables cactus tejidos a mano en diferentes colores',
    tags: ['cactus', 'verde', 'plantas']
  },
  {
    id: '3',
    name: 'Black Panter',
    price: 90000,
    originalPrice: 120000,
    image: '',
    imagePublicId: 'fanta1_nvdwyo',
    category: 'Fantasía',
    brand: 'Crochet Dreams',
    description: 'Adorables panteras negras tejidas a mano en diferentes colores',
    tags: ['pantera', 'negra', 'fantasía']
  },
  {
    id: '4',
    name: 'Capitán América',
    price: 250000,
    originalPrice: 310000,
    image: '',
    imagePublicId: 'fanta2_zedrgj',
    category: 'Fantasía',
    brand: 'Crochet Dreams',
    description: 'Adorables capitanes américa tejidos a mano en diferentes colores',
    tags: ['capitán', 'américa', 'fantasía', 'personaje']
  },
  {
    id: '5',
    name: 'Fresita Dulce',
    price: 45000,
    originalPrice: 45000,
    image: '',
    imagePublicId: 'comi1_w5pzy4',
    category: 'Comida',
    brand: 'Crochet Dreams',
    description: 'Adorables fresitas dulces tejidos a mano en diferentes colores',
    tags: ['fresita', 'dulce', 'fantasía']
  },
  {
    id: '6',
    name: 'El Grinch',
    price: 45000,
    originalPrice: 45000,
    image: '',
    imagePublicId: 'person2_dgw7d0',
    category: 'Personajes',
    brand: 'Crochet Dreams',
    description: 'Adorables personajes tejidos a mano en diferentes colores',
    tags: ['personaje', 'dulce', 'fantasía']
  },
  {
    id: '7',
    name: 'Dragon Feroz',
    price: 70000,
    originalPrice: 70000,
    image: '',
    imagePublicId: 'fanta3_nly2dw',
    category: 'Fantasía',
    brand: 'hilos Mágicos',
    description: 'Adorables personajes tejidos a mano en diferentes colores',
    tags: ['fantasía', 'dragón', 'feroz']
  },
];

// Función que calcula automáticamente el conteo de productos por categoría
function calculateCategoryCount(categoryName: string): number {
  return mockProducts.filter(product => product.category === categoryName).length;
}

// Función que calcula automáticamente el conteo de productos por marca
function calculateBrandCount(brandName: string): number {
  return mockProducts.filter(product => product.brand === brandName).length;
}

// Función que obtiene todas las marcas únicas automáticamente
function getAllBrands(): Brand[] {
  const brandMap = new Map<string, number>();
  
  // Contar productos por marca
  mockProducts.forEach(product => {
    const currentCount = brandMap.get(product.brand) || 0;
    brandMap.set(product.brand, currentCount + 1);
  });
  
  // Convertir a array de Brand objects
  return Array.from(brandMap.entries()).map(([brandName, count]) => ({
    name: brandName,
    count: count
  }));
}

// Función que obtiene todas las tags únicas automáticamente
function getAllTags(): { name: string; count: number }[] {
  const tagMap = new Map<string, number>();
  
  // Contar productos por tag
  mockProducts.forEach(product => {
    product.tags?.forEach(tag => {
      const currentCount = tagMap.get(tag) || 0;
      tagMap.set(tag, currentCount + 1);
    });
  });
  
  // Convertir a array y ordenar por popularidad
  return Array.from(tagMap.entries())
    .map(([tagName, count]) => ({
      name: tagName,
      count: count
    }))
    .sort((a, b) => b.count - a.count); // Ordenar por cantidad descendente
}

export const categories: Category[] = [
  { name: 'Animales', count: calculateCategoryCount('Animales') },
  { name: 'Plantas', count: calculateCategoryCount('Plantas') },
  { name: 'Fantasía', count: calculateCategoryCount('Fantasía') },
  { name: 'Comida', count: calculateCategoryCount('Comida') },
  { name: 'Personajes', count: calculateCategoryCount('Personajes') }
];

export const brands: Brand[] = getAllBrands();

export const tags: { name: string; count: number }[] = getAllTags();
