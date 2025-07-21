import { useState, useEffect } from "react";
import '../styles/astro-ecommerce.css';

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const [visible1, setVisible1] = useState(0);


//Evaluar si mejor lo hacemos con el collapse de bootstra´
//ya que con useState cambiamos ambos estados
  


  const toggleMenu = () => {
    setVisible((prev) => !prev);
            console.log("RR")

  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 992) {
       console.log("RR")
        setVisible(false);
        
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav className="navbar navbar-expand-lg shadow position-sticky py-3 start-0 end-0">
      <div className="container px-1">
        <a className="navbar-brand fw-bold ms-lg-0" href="https://www.creative-tim.com/astro">
          Astro Ecommerce
        </a>
        <button
          className="navbar-toggler ms-2"
          type="button"
          onClick={toggleMenu}
          aria-expanded={visible}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`navbar-collapse ${visible ? "d-block" : "d-none"} d-lg-flex`} id="navigation">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a className="nav-link text-dark fw-semibold d-flex align-items-center me-2" href="/astro-ecommerce/">
                All Components
              </a>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link text-dark dropdown-toggle fw-semibold d-flex align-items-center me-2"
                href="#"
                id="pagesExample"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Pages
              </a>
              <ul className="dropdown-menu" aria-labelledby="pagesExample">
                <li><a className="dropdown-item" href="/astro-ecommerce/landing/">Landing Page</a></li>
                <li><a className="dropdown-item" href="/astro-ecommerce/product/">Product Page</a></li>
                <li><a className="dropdown-item" href="/astro-ecommerce/shopping-cart/">Shopping Cart</a></li>
              </ul>
            </li>
            <li className="nav-item">
              <a className="nav-link text-dark fw-semibold d-flex align-items-center me-2" href="https://www.creative-tim.com/learning-lab/astro/overview/astro-ecommerce">
                Documentation
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-dark fw-bold d-flex align-items-center me-2" href="https://github.com/creativetimofficial/astro-ecommerce">
                <i className="fab fa-github"></i>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-dark fw-bold d-flex align-items-center me-2" href="https://discord.com/invite/TGZqBvZB" target="_blank" rel="noreferrer">
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
