//Revisar uso

import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import { CartProvider } from '../contexts/CartContext';

export default function ClientNavbar() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
     return (
      <nav className="fixed top-0 left-0 w-full bg-white border-b border-gray-100 shadow-sm z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <a
              className="flex items-center text-gray-900 hover:text-blue-600 no-underline font-bold text-2xl transition-colors duration-200"
              href="/"
            >
              ConCrochet
            </a>
            <div className="hidden lg:flex lg:items-center lg:space-x-8">
              <a href="/" className="text-gray-700 hover:text-blue-600 no-underline font-medium transition-colors duration-200">
                Inicio
              </a>
              <a href="/products" className="text-gray-700 hover:text-blue-600 no-underline font-medium transition-colors duration-200">
                Productos
              </a>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <CartProvider>
      <Navbar />
    </CartProvider>
  );
}