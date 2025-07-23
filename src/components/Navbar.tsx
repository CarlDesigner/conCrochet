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
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow py-1 z-50">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
        <a
           className="!text-gray-700 hover:!text-gray-900 !no-underline font-bold"
          href="https://www.creative-tim.com/astro"
        >
          Inicio
        </a>

        <button
          className="lg:hidden p-2 text-gray-700"
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
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        <div
          className={`${
            visible ? "block" : "hidden"
          } lg:flex lg:items-center w-full lg:w-auto mt-4 lg:mt-0`}
        >
          <ul className="flex flex-col lg:flex-row lg:space-x-6 text-gray-700 font-medium">
            <li>
              <a href="/astro-ecommerce/" className="!text-gray-700 hover:!text-gray-900 !no-underline">
                All Components
              </a>
            </li>
            <li className="relative group">
              <button className="flex items-center hover:text-gray-900">
                Pages
                <svg
                  className="ml-1 w-4 h-4"
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
              <ul className="absolute hidden group-hover:block bg-white shadow mt-2 py-2 w-48 text-sm">
                <li>
                  <a
                    className="block px-4 py-2 hover:bg-gray-100"
                    href="/astro-ecommerce/landing/"
                  >
                    Landing Page
                  </a>
                </li>
                <li>
                  <a
                    className="block px-4 py-2 hover:bg-gray-100"
                    href="/astro-ecommerce/product/"
                  >
                    Product Page
                  </a>
                </li>
                <li>
                  <a
                    className="block px-4 py-2 hover:bg-gray-100"
                    href="/astro-ecommerce/shopping-cart/"
                  >
                    Shopping Cart
                  </a>
                </li>
              </ul>
            </li>
            <li>
              <a
                href="https://www.creative-tim.com/learning-lab/astro/overview/astro-ecommerce"
                className="!text-gray-700 hover:!text-gray-900 !no-underline"
              >
                Documentation
              </a>
            </li>
            <li>
              <a
                href="https://github.com/creativetimofficial/astro-ecommerce"
                className="text-red-900 hover:text-gray-900"
              >
                <i className="fab fa-github"></i>
              </a>
            </li>
            <li>
              <a
                href="https://discord.com/invite/TGZqBvZB"
                target="_blank"
                rel="noreferrer"
                className="hover:text-gray-900"
              >
                <i className="fab fa-discord"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
