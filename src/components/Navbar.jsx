import {
  Menu,
  X,
  LogOut,
  LayoutDashboard,
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

    if (!el) return;

    const y =
      el.getBoundingClientRect().top +
      window.scrollY -
      80;

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

  if (link.hash === "#hero") {
    return location.pathname === "/";
  }

  return false;
};

  return (
    <nav className="w-full bg-[#FFFDF9] border-b border-[#DED8D2]">

      {/* ================= MAIN NAVBAR ================= */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-4 flex items-center justify-between">

        {/* ================= LOGO ================= */}
  <button
  onClick={() => {
    setIsMenuOpen(false);
    navigate("/");
  }}
  className="flex items-center"
  aria-label="Go to Home"
>
  <img
    src={logo}
    alt="Trazoo"
    className="w-[110px] h-auto"
  />
</button>
        {/* ================= DESKTOP NAV ================= */}
        <ul className="hidden lg:flex gap-7">

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
                  font-medium
                  transition-colors
                  pb-1
                  border-b-2

                  ${
                    isActive(link)
                      ? "text-[#DF4607] border-[#DF4607]"
                      : link.ready
                      ? "text-[#222222] border-transparent hover:text-[#DF4607]"
                      : "text-[#A9A29D] border-transparent cursor-default"
                  }
                `}
              >
                {link.name}
              </button>

            </li>
          ))}

        </ul>

        {/* ================= RIGHT SIDE ================= */}
        <div className="hidden lg:flex gap-3 items-center">

          {/* SHARE YOUR REQUIREMENT */}
          <button
            onClick={goToEnquiry}
            className="
              px-6
              py-3
              bg-[#DF4607]
              text-white
              font-semibold
              text-sm
              rounded-lg
              hover:bg-[#C93E05]
              transition-colors
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
                font-medium
                text-[#222222]
                border
                border-[#DED8D2]
                hover:bg-[#F7F2EC]
                transition-colors
              "
            >
              <LayoutDashboard size={16} />
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
                font-medium
                text-[#222222]
                border
                border-[#DED8D2]
                hover:bg-[#F7F2EC]
                transition-colors
              "
            >
              <LayoutDashboard size={16} />
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
                font-medium
                text-[#6E6A67]
                hover:text-[#DF4607]
                transition-colors
              "
            >
              <LogOut size={16} />
              Logout
            </button>
          )}

        </div>

        {/* ================= MOBILE MENU BUTTON ================= */}
        <button
          onClick={() =>
            setIsMenuOpen(!isMenuOpen)
          }
          className="lg:hidden text-[#222222]"
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
            bg-[#FFFDF9]
            border-t
            border-[#DED8D2]
            px-6
            py-4
          "
        >

          <ul className="flex flex-col gap-3">

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
                    font-medium
                    py-1

                    ${
                      link.ready
                        ? "text-[#222222] hover:text-[#DF4607]"
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
                    py-2.5
                    rounded-lg
                    flex
                    items-center
                    justify-center
                    gap-2
                    text-sm
                    font-medium
                    border
                    border-[#DED8D2]
                  "
                >
                  <LayoutDashboard size={16} />
                  Admin Dashboard
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
                    py-2.5
                    rounded-lg
                    flex
                    items-center
                    justify-center
                    gap-2
                    text-sm
                    font-medium
                    border
                    border-[#DED8D2]
                  "
                >
                  <LayoutDashboard size={16} />
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
                    py-2.5
                    rounded-lg
                    flex
                    items-center
                    justify-center
                    gap-2
                    text-sm
                    font-medium
                    text-[#6E6A67]
                  "
                >
                  <LogOut size={16} />
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