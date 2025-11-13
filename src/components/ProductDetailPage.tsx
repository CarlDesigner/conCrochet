import React from 'react';
import ProductDetail from './ProductDetail';
import { CartProvider } from '../contexts/CartContext';

interface ProductDetailPageProps {
  productId: string;
}

export default function ProductDetailPage({ productId }: ProductDetailPageProps) {
  return (
    <CartProvider>
      <ProductDetail productId={productId} />
    </CartProvider>
  );
}