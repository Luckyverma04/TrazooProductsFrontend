import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

import Logo from "../assets/Logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { name: "Home", path: "/" },
    { name: "Solutions", path: "/solutions" },
    { name: "Products", path: "/products" },
    { name: "Customisation", path: "/customize" },
    { name: "Fulfilment", path: "/fulfilment" },
    { name: "Our Work", path: "/our-work" },
    { name: "About", path: "/about" },
  ];

  const isActive = (path) => location.pathname === path;

  const handleNavClick = (path) => {
    navigate(path);
    setIsOpen(false);
  };

  const handleShare = () => {
    navigate("/requirements");
  };

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
              src={Logo}
              alt="Trazoo"
              className="h-10 md:h-12 w-auto"
            />
          </button>

          {/* Desktop Menu - CENTER */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8 flex-1 justify-center">
            {menuItems.map((item) => (
              <button
                key={item.path}
                onClick={() => handleNavClick(item.path)}
                className={`text-sm font-medium transition-colors whitespace-nowrap ${
                  isActive(item.path)
                    ? "text-[#DF4607]"
                    : "text-[#4A4644] hover:text-[#111111]"
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>

          {/* Share Button - RIGHT (Desktop) */}
          <div className="hidden md:block flex-shrink-0">
            <button
              onClick={handleShare}
              className="px-4 md:px-5 py-2 md:py-2.5 bg-[#DF4607] text-white text-xs md:text-sm font-semibold rounded-md hover:bg-[#C93E05] transition-colors whitespace-nowrap"
            >
              Share Your Requirement
            </button>
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
            {menuItems.map((item) => (
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
            
            <button
              onClick={handleShare}
              className="w-full mt-4 px-4 py-2.5 bg-[#DF4607] text-white text-sm font-semibold rounded-md hover:bg-[#C93E05] transition-colors"
            >
              Share Your Requirement
            </button>
          </div>
        )}

      </div>
    </nav>
  );
};

export default Navbar;