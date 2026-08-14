import {
  Menu,
  X,
  LogOut,
  LayoutDashboard,
  Home,
} from "lucide-react";

import { useState, useEffect } from "react";
import {
  useNavigate,
  useLocation,
} from "react-router-dom";

import logo from "../assets/logo.png";
import { navLinks } from "../config/navConfig";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  const isHome = location.pathname === "/";

  // ================= USER =================
  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem("user");
      }
    }
  }, []);

  // ================= SCROLL =================
  const scrollTo = (hash) => {
    const el = document.querySelector(hash);

    if (!el) {
      console.log(`Element with id ${hash} not found`);
      return;
    }

    const y =
      el.getBoundingClientRect().top +
      window.scrollY -
      100;

    window.scrollTo({
      top: y,
      behavior: "smooth",
    });
  };

  // ================= HASH NAVIGATION =================
  const goToHash = (hash) => {
    if (isHome) {
      scrollTo(hash);
    } else {
      navigate("/");

      setTimeout(() => {
        scrollTo(hash);
      }, 100);
    }
  };

  // ================= NAVIGATION =================
  const handleNavClick = (link) => {
    setIsMenuOpen(false);

    // Coming soon pages
    if (!link.ready) return;

    if (link.hash) {
      goToHash(link.hash);
    } else if (link.path) {
      navigate(link.path);
    }
  };

  // ================= HOME NAVIGATION =================
  const handleHomeClick = () => {
    setIsMenuOpen(false);
    navigate("/");
  };

  // ================= REQUIREMENT BUTTON =================
  const goToEnquiry = () => {
    setIsMenuOpen(false);
    navigate("/requirements");
  };

  // ================= LOGOUT =================
  const handleLogout = () => {
    localStorage.clear();
    setUser(null);

    navigate("/", {
      replace: true,
    });
  };

  // ================= USER ROLE =================
  const userRole = user?.role
    ? String(user.role).toLowerCase()
    : null;

  // ================= ACTIVE NAV =================
  const isActive = (link) => {
    if (link.path) {
      return location.pathname === link.path;
    }

    if (link.hash) {
      return location.pathname === "/" && window.location.hash === link.hash;
    }

    return false;
  };

  return (
    <nav className="w-full sticky top-0 z-50 backdrop-blur-md bg-white/30 border-b border-white/20">

      {/* ================= MAIN NAVBAR ================= */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-3 flex items-center justify-between">

        {/* ================= LOGO ================= */}
        <div className="flex items-center flex-shrink-0">
          <img
            src={logo}
            alt="Trazoo"
            className="w-[110px] h-auto"
          />
        </div>

        {/* ================= DESKTOP NAV ================= */}
        <ul className="hidden lg:flex gap-1 items-center">

          {/* HOME BUTTON */}
          <li>
            <button
              onClick={handleHomeClick}
              className={`
                text-sm
                font-semibold
                transition-all
                duration-300
                px-4 py-2.5 
                rounded-lg
                flex
                items-center
                gap-2

                ${
                  isHome
                    ? "text-[#DF4607] bg-orange-100/40"
                    : "text-[#222222] hover:bg-orange-100/30 hover:text-[#DF4607]"
                }
              `}
            >
              <Home size={18} strokeWidth={2.5} />
              Home
            </button>
          </li>

          {navLinks.map((link) => (
            <li key={link.name}>

              <button
                onClick={() => handleNavClick(link)}
                title={
                  link.ready
                    ? undefined
                    : "Coming soon"
                }
                className={`
                  text-sm
                  font-semibold
                  transition-all
                  duration-300
                  px-4 py-2.5
                  rounded-lg

                  ${
                    isActive(link)
                      ? "text-[#DF4607] bg-orange-100/40"
                      : link.ready
                      ? "text-[#222222] hover:bg-orange-100/30 hover:text-[#DF4607]"
                      : "text-[#A9A29D] cursor-default"
                  }
                `}
              >
                {link.name}
              </button>

            </li>
          ))}

        </ul>

        {/* ================= RIGHT SIDE ================= */}
        <div className="hidden lg:flex gap-2 items-center">

          {/* SHARE YOUR REQUIREMENT */}
          <button
            onClick={goToEnquiry}
            className="
              px-6
              py-2.5
              bg-[#DF4607]
              text-white
              font-semibold
              text-sm
              rounded-lg
              hover:bg-[#C93E05]
              transition-all
              duration-300
              hover:shadow-lg
              hover:scale-105
            "
          >
            Share Your Requirement
          </button>

          {/* ADMIN */}
          {userRole === "admin" && (
            <button
              onClick={() =>
                navigate("/admin/dashboard")
              }
              className="
                px-4
                py-2.5
                rounded-lg
                flex
                gap-2
                items-center
                text-sm
                font-semibold
                text-[#222222]
                hover:text-[#DF4607]
                hover:bg-orange-100/30
                transition-all
                duration-300
              "
            >
              <LayoutDashboard size={18} />
              Admin
            </button>
          )}

          {/* ASSOCIATE / CUSTOMER */}
          {(userRole === "associate" ||
            userRole === "customer") && (
            <button
              onClick={() =>
                navigate("/associate")
              }
              className="
                px-4
                py-2.5
                rounded-lg
                flex
                gap-2
                items-center
                text-sm
                font-semibold
                text-[#222222]
                hover:text-[#DF4607]
                hover:bg-orange-100/30
                transition-all
                duration-300
              "
            >
              <LayoutDashboard size={18} />
              Dashboard
            </button>
          )}

          {/* LOGOUT */}
          {user && (
            <button
              onClick={handleLogout}
              className="
                px-4
                py-2.5
                rounded-lg
                flex
                gap-2
                items-center
                text-sm
                font-semibold
                text-[#6E6A67]
                hover:text-[#DF4607]
                hover:bg-orange-100/30
                transition-all
                duration-300
              "
            >
              <LogOut size={18} />
              Logout
            </button>
          )}

        </div>

        {/* ================= MOBILE MENU BUTTON ================= */}
        <button
          onClick={() =>
            setIsMenuOpen(!isMenuOpen)
          }
          className="lg:hidden text-[#222222] p-2.5 hover:bg-orange-100/30 hover:text-[#DF4607] rounded-lg transition-all"
        >
          {isMenuOpen ? (
            <X size={24} />
          ) : (
            <Menu size={24} />
          )}
        </button>

      </div>

      {/* ================= MOBILE MENU ================= */}
      {isMenuOpen && (
        <div
          className="
            lg:hidden
            backdrop-blur-md
            bg-white/30
            border-t border-white/20
            px-6
            py-4
          "
        >

          <ul className="flex flex-col gap-1">

            {/* HOME BUTTON */}
            <li>
              <button
                onClick={handleHomeClick}
                className={`
                  w-full
                  text-left
                  text-sm
                  font-semibold
                  py-3
                  px-4
                  rounded-lg
                  flex
                  items-center
                  gap-2
                  transition-all
                  duration-300

                  ${
                    isHome
                      ? "text-[#DF4607] bg-orange-100/40"
                      : "text-[#222222] hover:bg-orange-100/30 hover:text-[#DF4607]"
                  }
                `}
              >
                <Home size={18} strokeWidth={2.5} />
                Home
              </button>
            </li>

            {/* NAV LINKS */}
            {navLinks.map((link) => (
              <li key={link.name}>

                <button
                  onClick={() =>
                    handleNavClick(link)
                  }
                  className={`
                    w-full
                    text-left
                    text-sm
                    font-semibold
                    py-3
                    px-4
                    rounded-lg
                    transition-all
                    duration-300

                    ${
                      link.ready
                        ? "text-[#222222] hover:bg-orange-100/30 hover:text-[#DF4607]"
                        : "text-[#A9A29D] cursor-default"
                    }
                  `}
                >
                  {link.name}
                </button>

              </li>
            ))}

            {/* SHARE YOUR REQUIREMENT */}
            <li>
              <button
                onClick={goToEnquiry}
                className="
                  w-full
                  mt-3
                  px-4
                  py-3
                  bg-[#DF4607]
                  text-white
                  font-semibold
                  text-sm
                  rounded-lg
                  transition-all
                  duration-300
                  hover:bg-[#C93E05]
                  hover:shadow-lg
                "
              >
                Share Your Requirement
              </button>
            </li>

            {/* ADMIN DASHBOARD */}
            {userRole === "admin" && (
              <li>
                <button
                  onClick={() => {
                    navigate("/admin/dashboard");
                    setIsMenuOpen(false);
                  }}
                  className="
                    w-full
                    py-3
                    px-4
                    rounded-lg
                    flex
                    items-center
                    gap-2
                    text-sm
                    font-semibold
                    text-[#222222]
                    hover:bg-orange-100/30
                    hover:text-[#DF4607]
                    transition-all
                    duration-300
                  "
                >
                  <LayoutDashboard size={18} />
                  Admin
                </button>
              </li>
            )}

            {/* ASSOCIATE / CUSTOMER DASHBOARD */}
            {(userRole === "associate" ||
              userRole === "customer") && (
              <li>
                <button
                  onClick={() => {
                    navigate("/associate");
                    setIsMenuOpen(false);
                  }}
                  className="
                    w-full
                    py-3
                    px-4
                    rounded-lg
                    flex
                    items-center
                    gap-2
                    text-sm
                    font-semibold
                    text-[#222222]
                    hover:bg-orange-100/30
                    hover:text-[#DF4607]
                    transition-all
                    duration-300
                  "
                >
                  <LayoutDashboard size={18} />
                  Dashboard
                </button>
              </li>
            )}

            {/* LOGOUT */}
            {user && (
              <li>
                <button
                  onClick={handleLogout}
                  className="
                    w-full
                    py-3
                    px-4
                    rounded-lg
                    flex
                    items-center
                    gap-2
                    text-sm
                    font-semibold
                    text-[#6E6A67]
                    hover:bg-orange-100/30
                    hover:text-[#DF4607]
                    transition-all
                    duration-300
                  "
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </li>
            )}

          </ul>

        </div>
      )}

    </nav>
  );
};

export default Navbar;