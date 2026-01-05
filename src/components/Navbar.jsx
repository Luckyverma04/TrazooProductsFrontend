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

  const navLinks = [
    { name: "Home", id: "#hero" },
    { name: "Our Products", id: "#products" },
    { name: "About Us", id: "#about" },
    { name: "Why Choose Us", id: "#why-trazoo" },
    { name: "Contact", id: "#footer" },
  ];

  const scrollToSection = (e, id) => {
    e.preventDefault();
    const el = document.querySelector(id);
    if (!el) return;

    const offset = 80;
    const y = el.getBoundingClientRect().top + window.scrollY - offset;

    window.scrollTo({ top: y, behavior: "smooth" });
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
    navigate("/", { replace: true });
  };

  // Get normalized role
  const userRole = user?.role ? String(user.role).toLowerCase() : null;

  return (
    <nav className="fixed top-0 left-0 w-full bg-white/95 backdrop-blur-md shadow z-50 border-b">
      <div className="max-w-7xl mx-auto px-6 py-2 flex justify-between items-center">

        {/* LOGO (NO href) */}
        <button
          onClick={(e) => scrollToSection(e, "#hero")}
          className="flex items-center"
        >
          <img src={logo} alt="Trazoo Logo" className="w-14 h-14 object-contain" />
        </button>

        {/* DESKTOP NAV */}
        <ul className="hidden md:flex gap-8">
          {navLinks.map((l) => (
            <li key={l.name}>
              <button
                onClick={(e) => scrollToSection(e, l.id)}
                className="text-gray-700 hover:text-orange-600"
              >
                {l.name}
              </button>
            </li>
          ))}
        </ul>

        {/* RIGHT */}
        <div className="hidden md:flex gap-4 items-center">
          <button
            onClick={(e) => scrollToSection(e, "#enquiry")}
            className="flex items-center gap-2 px-5 py-2 rounded-lg text-white font-semibold"
            style={{ backgroundImage: "linear-gradient(to right,#df4607,#e16f30)" }}
          >
            <Package size={16} /> Enquire Now
          </button>

          {/* ADMIN DASHBOARD */}
          {userRole === "admin" && (
            <button
              onClick={() => navigate("/admin/dashboard")}
              className="bg-purple-600 text-white px-4 py-2 rounded-lg flex gap-2 hover:bg-purple-700 transition-colors"
            >
              <LayoutDashboard size={16} /> Admin Dashboard
            </button>
          )}

          {/* ASSOCIATE/CUSTOMER DASHBOARD */}
          {(userRole === "associate" || userRole === "customer") && (
            <button
              onClick={() => navigate("/associate")}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg flex gap-2 hover:bg-blue-700 transition-colors"
            >
              <LayoutDashboard size={16} /> Dashboard
            </button>
          )}

          {user && (
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-lg flex gap-2 hover:bg-red-600 transition-colors"
            >
              <LogOut size={16} /> Logout
            </button>
          )}
        </div>

        {/* MOBILE MENU BUTTON */}
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden">
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {isMenuOpen && (
        <div className="md:hidden px-6 py-4 border-t">
          <ul className="flex flex-col gap-3">
            {navLinks.map((l) => (
              <li key={l.name}>
                <button
                  onClick={(e) => scrollToSection(e, l.id)}
                  className="w-full text-left text-gray-700"
                >
                  {l.name}
                </button>
              </li>
            ))}
            
            {/* ADMIN DASHBOARD - Mobile */}
            {userRole === "admin" && (
              <button
                onClick={() => {
                  navigate("/admin/dashboard");
                  setIsMenuOpen(false);
                }}
                className="bg-purple-600 text-white py-2 rounded flex items-center justify-center gap-2"
              >
                <LayoutDashboard size={16} /> Admin Dashboard
              </button>
            )}

            {/* ASSOCIATE/CUSTOMER DASHBOARD - Mobile */}
            {(userRole === "associate" || userRole === "customer") && (
              <button
                onClick={() => {
                  navigate("/associate");
                  setIsMenuOpen(false);
                }}
                className="bg-blue-600 text-white py-2 rounded flex items-center justify-center gap-2"
              >
                <LayoutDashboard size={16} /> Dashboard
              </button>
            )}

            {user && (
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white py-2 rounded flex items-center justify-center gap-2"
              >
                <LogOut size={16} /> Logout
              </button>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;