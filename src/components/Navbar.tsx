import { useState, useEffect } from "react";

const Navbar = () => {
  const [visible, setVisible] = useState(false);

  const toggleMenu = () => {
    setVisible((prev) => !prev);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setVisible(false);
      }
    };

    window.addEventListener("resize", handleResize);
    
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full bg-white border-b border-gray-100 shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <a
            className="flex items-center text-gray-900 hover:text-blue-600 no-underline font-bold text-2xl transition-colors duration-200"
            href="/"
          >
            ConCrochet
          </a>

          {/* Desktop Menu */}
          <div className="hidden lg:flex lg:items-center lg:space-x-8">
            <a 
              href="/" 
              className="text-gray-700 hover:text-blue-600 no-underline font-medium transition-colors duration-200"
            >
              Inicio
            </a>
            
            <a 
              href="/products" 
              className="text-gray-700 hover:text-blue-600 no-underline font-medium transition-colors duration-200"
            >
              Productos
            </a>
            
            <div className="relative group">
              <button 
                className="flex items-center text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
              >
                Categorías
                <svg
                  className="ml-1 w-4 h-4 transition-transform duration-200 group-hover:rotate-180"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              <ul className="absolute opacity-0 invisible group-hover:opacity-100 group-hover:visible bg-white shadow-lg rounded-lg mt-2 py-2 w-48 border border-gray-100 z-10 transition-all duration-200 transform scale-95 group-hover:scale-100"
                  onMouseEnter={(e) => e.currentTarget.style.pointerEvents = 'auto'}
                  onMouseLeave={(e) => e.currentTarget.style.pointerEvents = 'none'}>
                <li>
                  <a
                    className="flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 no-underline transition-colors duration-200"
                    href="/products?category=animals"
                  >
                    <span className="mr-3">🐾</span>
                    Animalitos
                  </a>
                </li>
                <li>
                  <a
                    className="flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 no-underline transition-colors duration-200"
                    href="/products?category=plants"
                  >
                    <span className="mr-3">🌱</span>
                    Plantitas
                  </a>
                </li>
                <li>
                  <a
                    className="flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 no-underline transition-colors duration-200"
                    href="/products?category=fantasy"
                  >
                    <span className="mr-3">✨</span>
                    Anime y Fantasía ✨
                  </a>
                </li>
                <li>
                  <a
                    className="flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 no-underline transition-colors duration-200"
                    href="/products?category=food"
                  >
                    <span className="mr-3">🎁</span>
                    Descuentitos
                  </a>
                </li>
              </ul>
            </div>

            <a
              href="/about"
              className="text-gray-700 hover:text-blue-600 no-underline font-medium transition-colors duration-200"
            >
              Nosotros
            </a>
            
            <a
              href="/contact"
              className="text-gray-700 hover:text-blue-600 no-underline font-medium transition-colors duration-200"
            >
              Contacto
            </a>
          </div>

          {/* Right side actions */}
          <div className="hidden lg:flex lg:items-center lg:space-x-4">
            {/* Search */}
            <button className="p-2 text-gray-700 hover:text-blue-600 hover:bg-gray-100 rounded-lg transition-colors duration-200">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            {/* Cart */}
            <a
              href="/cart"
              className="flex items-center text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-medium transition-colors duration-200"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5L21 18M7 13v8a2 2 0 002 2h8a2 2 0 002-2v-8" />
              </svg>
              Carrito
              <span className="ml-1 bg-blue-800 text-white text-xs px-2 py-1 rounded-full">0</span>
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 text-gray-700 hover:text-blue-600 hover:bg-gray-100 rounded-lg transition-colors duration-200"
            onClick={toggleMenu}
            aria-expanded={visible}
            aria-label="Toggle navigation"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {visible ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`${
            visible ? "block" : "hidden"
          } lg:hidden border-t border-gray-100 py-4`}
        >
          <div className="space-y-2">
            <a 
              href="/" 
              className="block px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 no-underline font-medium rounded-lg transition-colors duration-200"
            >
              Inicio
            </a>
            <a 
              href="/products" 
              className="block px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 no-underline font-medium rounded-lg transition-colors duration-200"
            >
              Productos
            </a>
            
            {/* Mobile Categories */}
            <div className="px-4 py-2">
              <p className="text-sm font-semibold text-gray-600 mb-2">Categorías</p>
              <div className="space-y-1 ml-4">
                <a
                  className="flex items-center py-2 text-gray-700 hover:text-blue-600 no-underline transition-colors duration-200"
                  href="/products?category=animals"
                >
                  <span className="mr-3">🐾</span>
                  Animales
                </a>
                <a
                  className="flex items-center py-2 text-gray-700 hover:text-blue-600 no-underline transition-colors duration-200"
                  href="/products?category=plants"
                >
                  <span className="mr-3">🌱</span>
                  Plantas
                </a>
                <a
                  className="flex items-center py-2 text-gray-700 hover:text-blue-600 no-underline transition-colors duration-200"
                  href="/products?category=fantasy"
                >
                  <span className="mr-3">✨</span>
                  Fantasía
                </a>
                <a
                  className="flex items-center py-2 text-gray-700 hover:text-blue-600 no-underline transition-colors duration-200"
                  href="/products?category=food"
                >
                  <span className="mr-3">🍎</span>
                  Comida
                </a>
              </div>
            </div>

            <a
              href="/about"
              className="block px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 no-underline font-medium rounded-lg transition-colors duration-200"
            >
              Nosotros
            </a>
            <a
              href="/contact"
              className="block px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 no-underline font-medium rounded-lg transition-colors duration-200"
            >
              Contacto
            </a>

            {/* Mobile Cart */}
            <div className="px-4 pt-4 border-t border-gray-100">
              <a
                href="/cart"
                className="flex items-center justify-center w-full text-white bg-blue-600 hover:bg-blue-700 px-4 py-3 rounded-lg font-medium transition-colors duration-200"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5L21 18M7 13v8a2 2 0 002 2h8a2 2 0 002-2v-8" />
                </svg>
                Carrito (0)
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
