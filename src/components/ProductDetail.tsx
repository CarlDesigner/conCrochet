import React from 'react';
import { useCart } from '../contexts/CartContext';
import { mockProducts } from '../data/products';
import { preferCld } from '../utils/cloudinary';
import type { Product } from '../types/product';

interface ProductDetailProps {
  productId: string;
}

export default function ProductDetail({ productId }: ProductDetailProps) {
  console.log('ProductDetail recibió productId:', productId);
  const { addItem } = useCart();
  const product = mockProducts.find(p => p.id === productId);
  console.log('Producto encontrado:', product);

  if (!product) {
    console.log('Producto no encontrado para ID:', productId);
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-xl">Producto no encontrado</p>
      </div>
    );
  }

  const mainImage = preferCld(product.image, product.imagePublicId, { fallbackWidth: 600 });
  const discountPercentage = (product.originalPrice && product.originalPrice > product.price)
    ? Math.round((1 - product.price / product.originalPrice) * 100) 
    : 0;

  // Productos relacionados (misma categoría)
  const relatedProducts = mockProducts
    .filter(p => p.id !== product.id && p.category === product.category)
    .slice(0, 4);

  const handleAddToCart = () => {
    addItem(product);
    // Opcional: mostrar notificación de éxito
  };

  return (
    <main className="pt-20">
      {/* Breadcrumb */}
      <nav className="bg-gray-50 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ol className="flex items-center space-x-2 text-sm text-gray-600">
            <li><a href="/" className="hover:text-blue-600 transition-colors">Inicio</a></li>
            <li className="text-gray-400">/</li>
            <li><a href="/products" className="hover:text-blue-600 transition-colors">Productos</a></li>
            <li className="text-gray-400">/</li>
            <li><a href={`/products?category=${product.category}`} className="hover:text-blue-600 transition-colors">{product.category}</a></li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-900 font-medium">{product.name}</li>
          </ol>
        </div>
      </nav>

      {/* Product Details */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Images */}
            <div className="space-y-6">
              {/* Main Image */}
              <div className="aspect-square w-full">
                <img 
                  src={mainImage.src}
                  alt={product.name}
                  className="w-full h-full object-cover rounded-2xl shadow-lg"
                  loading="eager"
                />
              </div>
              
              {/* Additional Images Gallery (placeholder for future) */}
              <div className="grid grid-cols-4 gap-4">
                {[1,2,3,4].map(i => (
                  <div key={i} className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                    </svg>
                  </div>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-8">
              {/* Product Header */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                    {product.category}
                  </span>
                  <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm font-medium rounded-full">
                    {product.brand}
                  </span>
                </div>
                
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                  {product.name}
                </h1>
                
                <p className="text-lg text-gray-600 leading-relaxed">
                  {product.description || 'Hermoso amigurumi hecho a mano con materiales de alta calidad.'}
                </p>
              </div>

              {/* Price Section */}
              <div className="border-t border-b border-gray-200 py-6">
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-4xl font-bold text-gray-900">
                    ${product.price.toLocaleString()}
                  </span>
                  {discountPercentage > 0 && (
                    <>
                      <span className="text-xl text-gray-500 line-through">
                        ${product.originalPrice?.toLocaleString()}
                      </span>
                      <span className="px-3 py-1 bg-red-100 text-red-800 text-sm font-bold rounded-full">
                        -{discountPercentage}%
                      </span>
                    </>
                  )}
                </div>
                
                {discountPercentage > 0 && product.originalPrice && (
                  <p className="text-green-600 font-medium">
                    ¡Ahorra ${(product.originalPrice - product.price).toLocaleString()}!
                  </p>
                )}
              </div>

              {/* Tags */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Características</h3>
                <div className="flex flex-wrap gap-2">
                  {(product.tags || ['hecho a mano', 'único', 'calidad premium']).map(tag => (
                    <span key={tag} className="px-3 py-1.5 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-4">
                <button 
                  onClick={handleAddToCart}
                  className="w-full bg-blue-600 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:bg-blue-700 transition-colors duration-200 shadow-lg flex items-center justify-center gap-3"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shopping-cart">
                    <circle cx="8" cy="21" r="1"/>
                    <circle cx="19" cy="21" r="1"/>
                    <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>
                  </svg>
                  Añadir al carrito
                </button>
                
                <div className="grid grid-cols-2 gap-4">
                  <button className="flex items-center justify-center gap-2 py-3 px-4 border-2 border-gray-300 rounded-xl font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-200">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                    </svg>
                    Favoritos
                  </button>
                  
                  <button className="flex items-center justify-center gap-2 py-3 px-4 border-2 border-gray-300 rounded-xl font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-200">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"></path>
                    </svg>
                    Compartir
                  </button>
                </div>
              </div>

              {/* Product Details */}
              <div className="bg-gray-50 rounded-xl p-6 space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Detalles del Producto</h3>
                <div className="grid grid-cols-1 gap-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Categoría:</span>
                    <span className="font-medium">{product.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Marca:</span>
                    <span className="font-medium">{product.brand}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Material:</span>
                    <span className="font-medium">Hilo de algodón premium</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tamaño:</span>
                    <span className="font-medium">Aprox. 15-20 cm</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Cuidado:</span>
                    <span className="font-medium">Lavado a mano</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Productos Relacionados
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map(relatedProduct => {
                const relatedImage = preferCld(relatedProduct.image, relatedProduct.imagePublicId, { fallbackWidth: 400 });
                const relatedDiscount = (relatedProduct.originalPrice && relatedProduct.originalPrice > relatedProduct.price)
                  ? Math.round((1 - relatedProduct.price / relatedProduct.originalPrice) * 100) 
                  : 0;
                
                return (
                  <a key={relatedProduct.id} href={`/product/${relatedProduct.id}`} className="group">
                    <article className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
                      <div className="aspect-square overflow-hidden">
                        <img 
                          src={relatedImage.src}
                          alt={relatedProduct.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                          {relatedProduct.name}
                        </h3>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-xl font-bold text-gray-900">
                              ${relatedProduct.price.toLocaleString()}
                            </span>
                            {relatedDiscount > 0 && relatedProduct.originalPrice && (
                              <span className="text-sm text-gray-500 line-through">
                                ${relatedProduct.originalPrice.toLocaleString()}
                              </span>
                            )}
                          </div>
                          {relatedDiscount > 0 && (
                            <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full font-bold">
                              -{relatedDiscount}%
                            </span>
                          )}
                        </div>
                      </div>
                    </article>
                  </a>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}