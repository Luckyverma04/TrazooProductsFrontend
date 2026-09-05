import {
  Mail,
  Phone,
  Clock,
  Facebook,
  Instagram,
  Linkedin,
  Globe,
} from "lucide-react";
import { Link } from "react-router-dom";
import logoImage from "../assets/branding/logo.webp";

const GIFTING_EVENTS = [
  "Employee Onboarding",
  "Festive Gifting",
  "Rewards & Recognition",
  "Events & Conferences",
  "Client & Partner Gifting",
  "Institutional Gifting",
];

const PRODUCTS = [
  "Apparel & Wearables",
  "Drinkware",
  "Bags & Travel",
  "Stationery & Desk",
  "Tech & Accessories",
  "Gourmet & Packaging",
];

const SOCIAL_LINKS = [
  {
    href: "https://www.linkedin.com/company/trazoo-global-llp",
    label: "Trazoo on LinkedIn",
    Icon: Linkedin,
  },
  {
    href: "https://www.instagram.com/trazooglobal",
    label: "Trazoo on Instagram",
    Icon: Instagram,
  },
  {
    href: "https://www.facebook.com/trazooglobal",
    label: "Trazoo on Facebook",
    Icon: Facebook,
  },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#111111] text-white">
      {/* ================= MAIN FOOTER ================= */}
      <div className="border-b border-white/10">
        <div className="mx-auto max-w-[1400px] px-5 py-12 sm:px-6 md:px-8 lg:px-10 xl:px-12">
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-4 md:gap-7 lg:gap-10">

            {/* ================= BRAND ================= */}
            <div className="flex flex-col">
              <Link
                to="/"
                aria-label="Trazoo Home"
                className="inline-flex w-fit"
              >
                <img
                  src={logoImage}
                  alt="Trazoo, joining with style"
                  className="mb-4 h-auto w-[155px] object-contain"
                  width="155"
                  height="42"
                  decoding="async"
                />
              </Link>

              <p className="mb-5 max-w-[280px] text-[13px] leading-relaxed text-white/80">
                Corporate gifting, executed end to end.
              </p>

              {/* Social Icons */}
              <div className="flex gap-3">
                {SOCIAL_LINKS.map(({ href, label, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-[#2A1E17] text-[#F36F21] transition-[background-color,color] duration-200 hover:bg-[#B84D0D] hover:text-white"
                  >
                    <Icon
                      size={15}
                      strokeWidth={1.8}
                      aria-hidden="true"
                    />
                  </a>
                ))}
              </div>
            </div>

            {/* ================= GIFTING EVENTS ================= */}
            <nav
              className="flex flex-col"
              aria-label="Gifting Events"
            >
              <p
                className="mb-4 text-[11px] font-bold uppercase tracking-[0.22em] text-[#B84D0D]"
              >
                Gifting Events
              </p>

              <ul className="space-y-2.5">
                {GIFTING_EVENTS.map((item) => (
                  <li key={item}>
                    <Link
                      to="/"
                      className="text-[13px] font-medium text-white/80 transition-colors duration-200 hover:text-white"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* ================= PRODUCTS ================= */}
            <nav
              className="flex flex-col"
              aria-label="Products"
            >
              <p
                className="mb-4 text-[11px] font-bold uppercase tracking-[0.22em] text-[#B84D0D]"
              >
                Products
              </p>

              <ul className="space-y-2.5">
                {PRODUCTS.map((item) => (
                  <li key={item}>
                    <Link
                      to="/products"
                      className="text-[13px] font-medium text-white/80 transition-colors duration-200 hover:text-white"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* ================= GET IN TOUCH ================= */}
            <div className="flex flex-col">
              <p
                className="mb-4 text-[11px] font-bold uppercase tracking-[0.22em] text-[#B84D0D]"
              >
                Get in Touch
              </p>

              <ul className="space-y-3">
                {/* Phone */}
                <li className="flex items-center gap-3">
                  <Phone
                    size={14}
                    strokeWidth={1.8}
                    className="shrink-0 text-[#F36F21]"
                    aria-hidden="true"
                  />

                  <a
                    href="tel:+917024804838"
                    aria-label="Call Trazoo at +91 70248 04838"
                    className="text-[13px] font-medium text-white/80 transition-colors duration-200 hover:text-white"
                  >
                    +91 70248 04838
                  </a>
                </li>

                {/* Email */}
                <li className="flex items-center gap-3">
                  <Mail
                    size={14}
                    strokeWidth={1.8}
                    className="shrink-0 text-[#F36F21]"
                    aria-hidden="true"
                  />

                  <a
                    href="mailto:contact@trazooglobal.com"
                    className="break-all text-[13px] font-medium text-white/80 transition-colors duration-200 hover:text-white"
                  >
                    contact@trazooglobal.com
                  </a>
                </li>

                {/* Website */}
                <li className="flex items-center gap-3">
                  <Globe
                    size={14}
                    strokeWidth={1.8}
                    className="shrink-0 text-[#F36F21]"
                    aria-hidden="true"
                  />

                  <a
                    href="https://www.trazooglobal.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[13px] font-medium text-white/80 transition-colors duration-200 hover:text-white"
                  >
                    www.trazooglobal.com
                  </a>
                </li>

                {/* Working Hours */}
                <li className="flex items-start gap-3">
                  <Clock
                    size={14}
                    strokeWidth={1.8}
                    className="mt-0.5 shrink-0 text-[#F36F21]"
                    aria-hidden="true"
                  />

                  <span className="text-[13px] font-medium leading-relaxed text-white/80">
                    Mon to Sat · 10:00 AM to 6:00 PM IST
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* ================= FOOTER BAR ================= */}
      <div>
        <div className="mx-auto max-w-[1400px] px-5 py-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">

            {/* Copyright */}
            <p className="text-[11px] text-white/70">
              © {currentYear} Trazoo Global LLP
            </p>

            {/* Legal Links */}
            <div className="flex flex-wrap items-center gap-2.5 text-[11px] text-white/70">
              <Link
                to="/#about"
                className="transition-colors duration-200 hover:text-white"
              >
                About
              </Link>

              <span aria-hidden="true">·</span>

              <Link
                to="/#process"
                className="transition-colors duration-200 hover:text-white"
              >
                How We Work
              </Link>

              <span aria-hidden="true">·</span>

              <Link
                to="/privacy"
                className="transition-colors duration-200 hover:text-white"
              >
                Privacy
              </Link>

              <span aria-hidden="true">·</span>

              <Link
                to="/terms"
                className="transition-colors duration-200 hover:text-white"
              >
                Terms
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;