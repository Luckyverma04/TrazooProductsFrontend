import { Menu, X, LogOut, LayoutDashboard, Package } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  /* ✅ CUSTOMER NAV ORDER */
  const navLinks = [
    { name: "Home", href: "#hero" },

    { name: "Our Products", href: "#products" },

    { name: "About Us", href: "#about" },

    {
      name: "Why Choose Us",
      href: "#why-trazoo", // parent anchor (you can keep this or point to first section)
    },

    { name: "Contact", href: "#footer" },
  ];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const scrollToSection = (e, href) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      const offset = 80; // navbar height
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-white/95 backdrop-blur-md shadow z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-2">
        <div className="flex justify-between items-center">

          {/* LOGO */}
          <a
            href="#hero"
            onClick={(e) => scrollToSection(e, "#hero")}
            className="flex items-center"
          >
            <img
              src={logo}
              alt="Trazoo Logo"
              className="w-14 h-14 md:w-16 md:h-16 object-contain"
            />
          </a>

          {/* DESKTOP NAV */}
          <ul className="hidden md:flex gap-8 text-base font-medium">
            {navLinks.map((link, index) => (
              <li key={index}>
                <a
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className="text-gray-700 hover:text-orange-600 relative group"
                >
                  {link.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-600 group-hover:w-full transition-all duration-300" />
                </a>
              </li>
            ))}
          </ul>

          {/* DESKTOP RIGHT */}
          <div className="hidden md:flex items-center gap-4">

            {/* ENQUIRE NOW */}
            <button
              onClick={(e) => scrollToSection(e, "#enquiry")}
              className="flex items-center gap-2 px-5 py-2 rounded-lg text-white font-semibold shadow hover:shadow-lg transition-all"
              style={{
                backgroundImage: "linear-gradient(to right, #df4607, #e16f30)",
              }}
            >
              <Package className="w-4 h-4" />
              Enquire Now
            </button>

            {/* ADMIN */}
            {user?.role === "admin" && (
              <>
                <button
                  onClick={() => navigate("/admin/dashboard")}
                  className="flex items-center gap-2 bg-purple-600 text-white px-5 py-2 rounded-lg font-semibold"
                >
                  <LayoutDashboard className="w-5 h-5" />
                  Dashboard
                </button>

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg font-semibold"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </>
            )}
          </div>

          {/* MOBILE BUTTON */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-gray-700"
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* MOBILE MENU */}
        {isMenuOpen && (
          <div className="md:hidden mt-3 py-3 border-t border-gray-100">
            <ul className="flex flex-col gap-3">
              {navLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    onClick={(e) => scrollToSection(e, link.href)}
                    className="block px-4 py-2 rounded-lg text-gray-700 hover:bg-orange-50"
                  >
                    {link.name}
                  </a>
                </li>
              ))}

              <li className="px-4">
                <button
                  onClick={(e) => scrollToSection(e, "#enquiry")}
                  className="w-full py-2 rounded-lg text-white font-semibold"
                  style={{
                    backgroundImage:
                      "linear-gradient(to right, #df4607, #e16f30)",
                  }}
                >
                  Enquire Now
                </button>
              </li>

              {user && (
                <li className="px-4">
                  <button
                    onClick={handleLogout}
                    className="w-full bg-red-500 text-white py-2 rounded-lg font-semibold"
                  >
                    Logout
                  </button>
                </li>
              )}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
