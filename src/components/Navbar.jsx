import { useState } from "react";
import { Menu, X, LogOut } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import storageUtils from "../utils/storageUtils";

import logo from "../assets/logo.png";
import { navLinks } from "../config/navConfig";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ Check if user is logged in
  const token = storageUtils.getItem("token");
  const rawUser = storageUtils.getItem("user");
  const isLoggedIn = !!(token && rawUser);

  // ✅ Get user role for dashboard redirect
  let userRole = null;
  if (rawUser) {
    try {
      const user = JSON.parse(rawUser);
      userRole = user.role?.toLowerCase();
    } catch (err) {
      console.error("Error parsing user:", err);
    }
  }

  const isActive = (path) => location.pathname === path;

  const handleNavClick = (path) => {
    // ✅ Special handling for Dashboard link
    if (path === "/dashboard") {
      if (userRole === "admin") {
        navigate("/admin/dashboard");
      } else if (userRole === "associate") {
        navigate("/associate");
      } else {
        navigate("/"); // Fallback
      }
    } else {
      navigate(path);
    }
    setIsOpen(false);
  };

  const handleShare = () => {
    navigate("/requirements");
  };

  // ✅ LOGOUT FUNCTION - Go to HOME
  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      storageUtils.clear();
      navigate("/", { replace: true }); // ✅ HOME PAGE, NOT /auth
    }
  };

  // ✅ Filter navLinks - hide Dashboard if not logged in
  const filteredNavLinks = navLinks.filter((item) => {
    if (item.requiresAuth && !isLoggedIn) {
      return false; // Hide if requires auth and user not logged in
    }
    return true;
  });

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white border-b border-[#DED8D2] z-50">
      <div className="px-6 md:px-10 lg:px-14 xl:px-20 py-3 md:py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-8">

          {/* Logo - LEFT */}
          <button
            onClick={() => handleNavClick("/")}
            className="flex-shrink-0 hover:opacity-80 transition-opacity"
          >
            <img
              src={logo}
              alt="Trazoo"
              className="h-10 md:h-12 w-auto"
            />
          </button>

          {/* Desktop Menu - CENTER */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8 flex-1 justify-center">
            {filteredNavLinks.map((item) => (
              <button
                key={item.path}
                onClick={() => handleNavClick(item.path)}
                className={`text-sm font-medium transition-colors whitespace-nowrap ${
                  item.path === "/dashboard"
                    ? "text-[#DF4607]" // Highlight dashboard
                    : isActive(item.path)
                    ? "text-[#DF4607]"
                    : "text-[#4A4644] hover:text-[#111111]"
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>

          {/* RIGHT SIDE - Desktop */}
          <div className="hidden md:flex items-center gap-3 flex-shrink-0">
            {isLoggedIn ? (
              // ✅ LOGOUT BUTTON - Show when logged in
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-[#DF4607] border border-[#DF4607] rounded-md hover:bg-[#FFF5EF] font-semibold text-xs md:text-sm transition-colors flex items-center gap-2 whitespace-nowrap"
              >
                <LogOut size={16} />
                Logout
              </button>
            ) : (
              // ✅ SHARE BUTTON - Show when not logged in
              <button
                onClick={handleShare}
                className="px-4 md:px-5 py-2 md:py-2.5 bg-[#DF4607] text-white text-xs md:text-sm font-semibold rounded-md hover:bg-[#C93E05] transition-colors whitespace-nowrap"
              >
                Share Your Requirement
              </button>
            )}
          </div>

          {/* Mobile Menu Button - RIGHT */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 hover:bg-[#F7F2EC] rounded-lg transition-colors"
          >
            {isOpen ? (
              <X size={24} className="text-[#111111]" />
            ) : (
              <Menu size={24} className="text-[#111111]" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-2 border-t border-[#DED8D2] pt-4">
            {filteredNavLinks.map((item) => (
              <button
                key={item.path}
                onClick={() => handleNavClick(item.path)}
                className={`block w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive(item.path)
                    ? "bg-[#FDEDE7] text-[#DF4607]"
                    : "text-[#4A4644] hover:bg-[#F7F2EC]"
                }`}
              >
                {item.name}
              </button>
            ))}
            
            {isLoggedIn ? (
              // ✅ LOGOUT BUTTON - Mobile
              <button
                onClick={handleLogout}
                className="w-full mt-4 px-4 py-2.5 text-[#DF4607] border border-[#DF4607] rounded-md hover:bg-[#FFF5EF] font-semibold text-sm transition-colors flex items-center justify-center gap-2"
              >
                <LogOut size={16} />
                Logout
              </button>
            ) : (
              // ✅ SHARE BUTTON - Mobile
              <button
                onClick={handleShare}
                className="w-full mt-4 px-4 py-2.5 bg-[#DF4607] text-white text-sm font-semibold rounded-md hover:bg-[#C93E05] transition-colors"
              >
                Share Your Requirement
              </button>
            )}
          </div>
        )}

      </div>
    </nav>
  );
};

export default Navbar;