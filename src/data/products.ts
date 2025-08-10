import type { Product, Category, Brand } from '../types/product';

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Conejito Amigurumi Rosa',
    price: 25000,
    originalPrice: 30000,
    image: 'https://res.cloudinary.com/demo/image/upload/w_400,h_400,c_fill/rabbit_amigurumi.jpg',
    category: 'Animales',
    brand: 'Crochet Dreams',
    description: 'Adorable conejito tejido a mano en hilo de algodón suave',
    tags: ['rosa', 'conejo', 'suave']
  },
  {
    id: '2',
    name: 'Oso Panda Miniatura',
    price: 18000,
    image: 'https://res.cloudinary.com/demo/image/upload/w_400,h_400,c_fill/panda_amigurumi.jpg',
    category: 'Animales',
    brand: 'Hilos Mágicos',
    description: 'Pequeño oso panda perfecto para decoración',
    tags: ['panda', 'miniatura', 'blanco', 'negro']
  },
  {
    id: '3',
    name: 'Cactus Decorativo Verde',
    price: 15000,
    image: 'https://res.cloudinary.com/demo/image/upload/w_400,h_400,c_fill/cactus_amigurumi.jpg',
    category: 'Plantas',
    brand: 'Eco Crochet',
    description: 'Cactus que nunca necesita agua, ideal para cualquier espacio',
    tags: ['cactus', 'verde', 'decorativo']
  },
  {
    id: '4',
    name: 'Unicornio Arcoíris',
    price: 35000,
    originalPrice: 40000,
    image: 'https://res.cloudinary.com/demo/image/upload/w_400,h_400,c_fill/unicorn_amigurumi.jpg',
    category: 'Fantasía',
    brand: 'Crochet Dreams',
    description: 'Unicornio mágico con colores del arcoíris',
    tags: ['unicornio', 'arcoíris', 'mágico', 'colores']
  },
  {
    id: '5',
    name: 'Pingüino Emperador',
    price: 22000,
    image: 'https://res.cloudinary.com/demo/image/upload/w_400,h_400,c_fill/penguin_amigurumi.jpg',
    category: 'Animales',
    brand: 'Polo Norte Crafts',
    description: 'Pingüino elegante tejido con detalles precisos',
    tags: ['pingüino', 'emperador', 'elegante']
  },
  {
    id: '6',
    name: 'Dragón Bebé Azul',
    price: 28000,
    image: 'https://res.cloudinary.com/demo/image/upload/w_400,h_400,c_fill/dragon_amigurumi.jpg',
    category: 'Fantasía',
    brand: 'Hilos Mágicos',
    description: 'Pequeño dragón amigable perfecto para niños',
    tags: ['dragón', 'azul', 'bebé', 'amigable']
  }
];

export const categories: Category[] = [
  { name: 'Animales', count: 3 },
  { name: 'Plantas', count: 1 },
  { name: 'Fantasía', count: 2 },
  { name: 'Comida', count: 0 },
  { name: 'Personajes', count: 0 }
];

export const brands: Brand[] = [
  { name: 'Crochet Dreams', count: 2 },
  { name: 'Hilos Mágicos', count: 2 },
  { name: 'Eco Crochet', count: 1 },
  { name: 'Polo Norte Crafts', count: 1 },
  { name: 'Artisan Globe Lamps', count: 0 }
];
