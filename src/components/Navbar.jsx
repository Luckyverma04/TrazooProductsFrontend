import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { navLinks } from "../config/navigation";
import logoImage from "../assets/branding/logo.webp";

const Ticker = () => {
  const tickerItems = [
    {
      normal: "30,000+ kits shipped in the last 12 months · ",
      highlight: "12,000+ PIN codes",
      end: " reached",
    },
    {
      normal: "Same-day dispatch in ",
      highlight: "40+ cities",
      end: " · 22 delivery hubs across India",
    },
    {
      normal: "Requirement to first shortlist in ",
      highlight: "1 working day",
      end: "",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => {
        let next;

        do {
          next = Math.floor(Math.random() * tickerItems.length);
        } while (next === prev && tickerItems.length > 1);

        return next;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const item = tickerItems[activeIndex];

  return (
    <div className="w-full bg-[#1A1A1A] py-[9px] text-white">
      <div className="flex min-h-[20px] w-full items-center justify-center overflow-hidden px-4">
        <span
          key={activeIndex}
          className="whitespace-nowrap text-center font-manrope text-[12px] font-normal text-white/90 animate-ticker-fade md:text-[14px]"
        >
          {item.normal}

          <span className="font-semibold text-[#F36F21]">
            {item.highlight}
          </span>

          {item.end}
        </span>
      </div>

      <style>{`
        @keyframes tickerFade {
          0% {
            opacity: 0;
            transform: translateY(5px);
          }

          15% {
            opacity: 1;
            transform: translateY(0);
          }

          85% {
            opacity: 1;
            transform: translateY(0);
          }

          100% {
            opacity: 0;
            transform: translateY(-5px);
          }
        }

        .animate-ticker-fade {
          animation: tickerFade 5s ease-in-out;
        }
      `}</style>
    </div>
  );
};

const Navbar = ({ onMobileNavOpen }) => {
  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isLoggedIn = !!localStorage.getItem("authToken");
  const userRole = localStorage.getItem("userRole");

  const filteredNavLinks = navLinks.filter((link) => {
    if (link.requiresAuth && !isLoggedIn) return false;
    if (link.adminOnly && userRole !== "admin") return false;

    return true;
  });

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userRole");
    localStorage.removeItem("user");

    setIsMenuOpen(false);
    navigate("/auth");
  };

  const closeMobileMenu = () => {
    setIsMenuOpen(false);
  };

  const handleMobileMenuToggle = () => {
    const nextState = !isMenuOpen;

    setIsMenuOpen(nextState);

    if (nextState && onMobileNavOpen) {
      onMobileNavOpen();
    }
  };

  const handleNavClick = (path) => {
    closeMobileMenu();

    if (path.startsWith("/#")) {
      const hash = path.substring(1);

      if (window.location.pathname === "/") {
        setTimeout(() => {
          const element = document.querySelector(hash);

          if (element) {
            element.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }
        }, 50);
      }
    }
  };

  return (
    <>
      {/* TOP TICKER */}
      <Ticker />

      {/* NAVBAR */}
      <header className="sticky top-0 z-50 w-full border-b border-[#E8E8E8] bg-white">
        <nav className="mx-auto w-full max-w-[1400px] px-5 sm:px-6 md:px-8 lg:px-10 xl:px-12">

          {/* NAVBAR INNER */}
          <div className="flex h-[56px] items-center justify-between gap-3 md:h-[62px] lg:gap-8">

            {/* LOGO */}
            <Link
              to="/"
              onClick={closeMobileMenu}
              className="-ml-2 flex shrink-0 items-center md:-ml-3"
            >
              <img
                src={logoImage}
                alt="Trazoo"
                className="block h-[31px] w-auto object-contain md:h-[36px]"
              />
            </Link>

            {/* DESKTOP NAVIGATION */}
            <div className="ml-auto hidden items-center gap-7 lg:flex">
              {filteredNavLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => handleNavClick(link.path)}
                  className="whitespace-nowrap font-manrope text-[15px] font-medium text-[#161616] transition-colors duration-200 hover:text-[#F36F21]"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* MOBILE MENU BUTTON */}
            <button
              type="button"
              onClick={handleMobileMenuToggle}
              className="flex h-[38px] w-[38px] items-center justify-center rounded-[9px] border border-[#E5E5E5] text-[#161616] transition-colors hover:border-[#F36F21] hover:text-[#F36F21] lg:hidden"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? (
                <X size={19} strokeWidth={2} />
              ) : (
                <Menu size={19} strokeWidth={2} />
              )}
            </button>
          </div>

          {/* MOBILE NAVIGATION */}
          {isMenuOpen && (
            <div className="border-t border-[#E8E8E8] py-4 lg:hidden">
              <div className="flex flex-col">

                {filteredNavLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={() => handleNavClick(link.path)}
                    className="border-b border-[#F0F0F0] px-2 py-3 font-manrope text-[15px] font-medium text-[#161616] transition-colors hover:text-[#F36F21]"
                  >
                    {link.name}
                  </Link>
                ))}

                {/* LOGOUT */}
                {isLoggedIn && (
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="mt-3 w-full rounded-[11px] border border-[#E5E5E5] px-4 py-3 text-left font-manrope text-[15px] font-medium text-[#555] hover:border-[#F36F21] hover:text-[#F36F21]"
                  >
                    Logout
                  </button>
                )}
              </div>
            </div>
          )}
        </nav>
      </header>
    </>
  );
};

export default Navbar;