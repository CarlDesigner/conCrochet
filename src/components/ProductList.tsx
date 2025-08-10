import React from 'react';
import type { Product } from '../types/product';

interface ProductListProps {
  products: Product[];
}

function ProductListItem({ product }: { product: Product }) {
  const hasDiscount = product.originalPrice && product.originalPrice > product.price;
  
  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden">
      <div className="flex">
        {/* Product Image */}
        <div className="relative w-48 h-48 flex-shrink-0 overflow-hidden bg-gray-100">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          {hasDiscount && (
            <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
              OFERTA
            </div>
          )}
        </div>
        
        {/* Product Info */}
        <div className="flex-1 p-6 flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{product.name}</h3>
            <p className="text-gray-600 mb-2">{product.brand}</p>
            {product.description && (
              <p className="text-gray-700 mb-4 line-clamp-2">{product.description}</p>
            )}
            
            {/* Tags */}
            {product.tags && product.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {product.tags.map(tag => (
                  <span 
                    key={tag}
                    className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
          
          {/* Price and Actions */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-gray-900">
                $ {product.price.toLocaleString()} COP
              </span>
              {hasDiscount && (
                <span className="text-lg text-gray-500 line-through">
                  $ {product.originalPrice?.toLocaleString()} COP
                </span>
              )}
            </div>
            
            <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-md transition-colors duration-200 font-medium">
              Agregar al Carrito
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProductList({ products }: ProductListProps) {
  if (products.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <p className="text-gray-500 text-lg mb-2">No se encontraron productos</p>
          <p className="text-gray-400">Intenta ajustar los filtros</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {products.map(product => (
        <ProductListItem key={product.id} product={product} />
      ))}
    </div>
  );
}
