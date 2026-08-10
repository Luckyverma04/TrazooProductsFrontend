import { Mail, Phone, MapPin, Linkedin, Instagram, LogIn } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { footerColumns } from "../config/navConfig";

// Gmail vs default mail client
const getMailHref = () => {
  const isChrome =
    typeof navigator !== "undefined" && navigator.userAgent.includes("Chrome");
  return isChrome
    ? "https://mail.google.com/mail/?view=cm&fs=1&to=contact@trazooglobal.com"
    : "mailto:contact@trazooglobal.com";
};

const Footer = () => {
  const navigate = useNavigate();

  /**
   * Ek hi handler:
   *  - hash wala link  → us section pe scroll
   *  - path wala link  → us route pe navigate
   *  - ready:false     → abhi kuch nahi (page bana hi nahi)
   *
   * Page ban jaaye to navConfig.js mein `ready: true` kar dena — bas.
   */
  const handleClick = (link) => {
    if (!link.ready) return;

    if (link.hash) {
      const el = document.querySelector(link.hash);
      el?.scrollIntoView({ behavior: "smooth", block: "start" });
    } else if (link.path) {
      navigate(link.path);
    }
  };

  return (
    <footer
      id="footer"
      className="bg-[#F7F2EC] border-t border-[#DED8D2] text-[#222222]"
    >
      <div className="max-w-7xl mx-auto px-6 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* ---------- BRAND ---------- */}
          <div>
            <img
              src={logo}
              alt="Trazoo Global"
              className="h-10 object-contain mb-5"
            />

            <p className="text-[#4A4644] leading-relaxed mb-6 max-w-xs">
              Corporate gifting. Without the vendor chaos.
            </p>

            {/* CONTACT */}
            <div className="space-y-3 text-sm">
              <a
                href={getMailHref()}
                className="flex items-center gap-2 text-[#4A4644] hover:text-[#DF4607] transition-colors"
              >
                <Mail size={15} />
                <span>contact@trazooglobal.com</span>
              </a>

              <div className="flex items-center gap-2 text-[#4A4644]">
                <Phone size={15} />
                <span>+91 7024804838</span>
              </div>

              <div className="flex items-center gap-2 text-[#4A4644]">
                <MapPin size={15} />
                <span>India</span>
              </div>
            </div>

            {/* SOCIAL ICONS */}
            <div className="flex gap-3 mt-6">
              <a
                href="https://www.linkedin.com/company/trazoo-global-llp/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Trazoo Global LLP LinkedIn"
                className="p-2 rounded-full border border-[#DED8D2] text-[#4A4644] hover:border-[#DF4607] hover:text-[#DF4607] transition-colors"
              >
                <Linkedin size={18} />
              </a>

              <a
                href="https://www.instagram.com/trazooglobal/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Trazoo Global Instagram"
                className="p-2 rounded-full border border-[#DED8D2] text-[#4A4644] hover:border-[#DF4607] hover:text-[#DF4607] transition-colors"
              >
                <Instagram size={18} />
              </a>
            </div>
          </div>

          {/* ---------- LINK COLUMNS ---------- */}
          {footerColumns.map((col) => (
            <div key={col.title}>
              <h5 className="text-sm font-bold text-[#111111] mb-5">
                {col.title}
              </h5>
              <ul className="space-y-3">
                {col.links.map((l) => (
                  <li key={l.name}>
                    <button
                      onClick={() => handleClick(l)}
                      title={l.ready ? undefined : "Coming soon"}
                      className={`text-left transition-colors ${
                        l.ready
                          ? "text-[#4A4644] hover:text-[#DF4607]"
                          : "text-[#A9A29D] cursor-default"
                      }`}
                    >
                      {l.name}
                    </button>
                  </li>
                ))}
              </ul>

              {/* Login button sirf Company column ke neeche */}
              {col.title === "Company" && (
                <Link
                  to="/auth"
                  className="inline-flex items-center gap-2 mt-6 px-5 py-2.5 bg-[#DF4607] hover:bg-[#C93E05] text-white font-semibold text-sm rounded-lg transition-colors"
                >
                  <LogIn size={16} /> Login
                </Link>
              )}
            </div>
          ))}
        </div>

        {/* ---------- COPYRIGHT ---------- */}
        <div className="mt-14 pt-6 border-t border-[#DED8D2]">
          <p className="text-sm text-[#6E6A67]">
            © {new Date().getFullYear()} Trazoo Global. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;