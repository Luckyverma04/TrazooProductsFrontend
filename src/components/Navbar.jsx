import { Menu, X, Package, LogIn, User, LogOut, LayoutDashboard } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Load logged-in user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'About Us', href: '#about' },
    { name: 'Process', href: '#process' },
    { name: 'Why Choose Us', href: '#why-trazoo' },
    { name: 'Contact', href: '#footer' }
  ];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const scrollToSection = (e, href) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
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
    <nav className="fixed top-0 left-0 w-full bg-white/95 backdrop-blur-md shadow-lg z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">

          {/* Logo */}
          <a 
            href="#hero" 
            onClick={(e) => scrollToSection(e, '#hero')}
            className="flex items-center gap-2 group"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center transform group-hover:scale-110 transition-transform">
              <Package className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              TrazooProducts
            </h1>
          </a>

          {/* Desktop Nav Links */}
          <ul className="hidden md:flex gap-8 text-base font-medium">
            {navLinks.map((link, index) => (
              <li key={index}>
                <a 
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className="text-gray-700 hover:text-blue-600 transition-colors relative group"
                >
                  {link.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-300"></span>
                </a>
              </li>
            ))}
          </ul>

          {/* Desktop Right Section */}
          <div className="hidden md:flex items-center gap-4">

            {/* If NOT logged in */}
            {!user && (
              <a
                href="/auth"
                className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:shadow-lg hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all"
              >
                <LogIn className="w-4 h-4" />
                Login
              </a>
            )}

            {/* If USER logged in */}
            {user && user.role === "customer" && (
              <>
                <div className="flex items-center gap-2 text-gray-700 font-semibold">
                  <User className="w-5 h-5 text-blue-600" />
                  {user.name}
                </div>

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg font-semibold hover:shadow-lg hover:bg-red-600 transition-all"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </>
            )}

            {/* If ADMIN logged in */}
            {user && user.role === "admin" && (
              <>
                <button
                  onClick={() => navigate("/admin/dashboard")}
                  className="flex items-center gap-2 bg-purple-600 text-white px-5 py-2.5 rounded-lg font-semibold hover:shadow-lg hover:bg-purple-700 transition-all"
                >
                  <LayoutDashboard className="w-5 h-5" />
                  Dashboard
                </button>

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-600 transition-all"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-gray-700 hover:text-blue-600 transition-colors"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-gray-100 animate-fadeIn">
            <ul className="flex flex-col gap-4">

              {navLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href}
                    onClick={(e) => scrollToSection(e, link.href)}
                    className="text-gray-700 hover:text-blue-600 transition-colors font-medium py-2 px-4 rounded-lg hover:bg-blue-50 block"
                  >
                    {link.name}
                  </a>
                </li>
              ))}

              {/* Mobile Login */}
              {!user && (
                <li>
                  <a
                    href="/auth"
                    className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
                  >
                    <LogIn className="w-4 h-4" />
                    Login
                  </a>
                </li>
              )}

              {/* Mobile USER Section */}
              {user && user.role === "customer" && (
                <li className="px-4">
                  <div className="flex items-center gap-2 text-gray-800 font-semibold">
                    <User className="w-5 h-5 text-blue-600" />
                    {user.name}
                  </div>
                  <button
                    onClick={handleLogout}
                    className="mt-3 w-full bg-red-500 text-white py-2 rounded-lg font-semibold hover:bg-red-600 transition-all"
                  >
                    Logout
                  </button>
                </li>
              )}

              {/* Mobile ADMIN Section */}
              {user && user.role === "admin" && (
                <li className="px-4">
                  <button
                    onClick={() => navigate("/admin/dashboard")}
                    className="w-full flex items-center justify-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-all"
                  >
                    <LayoutDashboard className="w-5 h-5" />
                    Dashboard
                  </button>

                  <button
                    onClick={handleLogout}
                    className="mt-3 w-full bg-red-500 text-white py-2 rounded-lg font-semibold hover:bg-red-600 transition-all"
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
