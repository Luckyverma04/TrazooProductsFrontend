import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Instagram,
  LogIn,
} from "lucide-react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import footer from "../assets/footer.png";

// Gmail vs default mail client
const getMailHref = () => {
  const isChrome =
    typeof navigator !== "undefined" &&
    navigator.userAgent.includes("Chrome");

  return isChrome
    ? "https://mail.google.com/mail/?view=cm&fs=1&to=contact@trazooglobal.com"
    : "mailto:contact@trazooglobal.com";
};

// Footer links
const footerColumns = [
  {
    title: "Company",
    links: [
      {
        name: "About Us",
        path: "/about",
      },
      {
        name: "Contact Us",
        path: "/requirements",
      },
      {
        name: "Enterprise FAQ",
        path: "/faq",
      },
    ],
  },

  {
    title: "Services",
    links: [
      {
        name: "Products",
        path: "/products",
      },
      {
        name: "Customisation",
        path: "/customisation",
      },
      {
        name: "Fulfilment",
        path: "/fulfilment",
      },
      {
        name: "Our Work",
        path: "/our-work",
      },
    ],
  },

  {
    title: "Legal",
    links: [
      {
        name: "Terms of Service",
        path: "/terms",
      },
      {
        name: "Privacy Policy",
        path: "/privacy",
      },
    ],
  },
];

const Footer = () => {
  return (
    <footer
      id="footer"
      className="bg-[#FFFDF9] border-t border-[#DED8D2] relative overflow-hidden"
      style={{
        backgroundImage: `url(${footer})`,
        backgroundPosition: "right center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
        backgroundAttachment: "scroll",
      }}
    >
      {/* ================= OVERLAY FOR READABILITY ================= */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#FFFDF9] via-[#FFFDF9] to-transparent pointer-events-none"></div>

      {/* ================= FOOTER CONTENT ================= */}
      <div className="max-w-7xl mx-auto px-6 py-14 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* ================= BRAND ================= */}
          <div>
            <Link to="/">
              <img
                src={logo}
                alt="Trazoo Global"
                className="w-[120px] h-auto mb-5"
              />
            </Link>

            <p className="text-[#4A4644] leading-relaxed mb-6 max-w-xs">
              Corporate gifting. Without the vendor chaos.
            </p>

            {/* ================= CONTACT ================= */}
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

            {/* ================= SOCIAL ================= */}
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

          {/* ================= FOOTER COLUMNS ================= */}
          {footerColumns.map((col) => (
            <div key={col.title}>

              <h5 className="text-sm font-bold text-[#111111] mb-5">
                {col.title}
              </h5>

              <ul className="space-y-3">

                {col.links.map((link) => (
                  <li key={link.name}>

                    <Link
                      to={link.path}
                      className="text-[#4A4644] hover:text-[#DF4607] transition-colors"
                    >
                      {link.name}
                    </Link>

                  </li>
                ))}

              </ul>

              {/* ================= LOGIN ================= */}
              {col.title === "Company" && (
                <Link
                  to="/auth"
                  className="inline-flex items-center gap-2 mt-6 px-5 py-2.5 bg-[#DF4607] hover:bg-[#C93E05] text-white font-semibold text-sm rounded-lg transition-colors"
                >
                  <LogIn size={16} />
                  Login
                </Link>
              )}

            </div>
          ))}

        </div>

        {/* ================= COPYRIGHT ================= */}
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