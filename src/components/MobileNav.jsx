import { X } from "lucide-react";
import { Link } from "react-router-dom";

const MobileNav = ({ isOpen, onClose, onEnquireClick }) => {
  if (!isOpen) return null;

  const navLinks = [
    { label: "Why Us", href: "#why" },
    { label: "About Us", href: "#about" },
    { label: "How We Work", href: "#process" },
    { label: "Product", href: "/products" },
  ];

  const handleNavClick = (href) => {
    onClose();

    // Small delay ensures the drawer closes before navigation/scroll
    if (href.startsWith("#")) {
      setTimeout(() => {
        const element = document.querySelector(href);

        if (element) {
          element.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }, 50);
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/50 lg:hidden"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        className="fixed left-0 top-0 z-50 h-screen w-64 transform overflow-y-auto bg-white shadow-2xl transition-transform duration-300"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#E8E8E8] p-6">
          <Link to="/" onClick={onClose} aria-label="Trazoo Home">
            <img
              src="/assets/images/branding/logo-sm.webp"
              alt="Trazoo"
              className="h-8"
            />
          </Link>

          <button
            type="button"
            onClick={onClose}
            className="text-[#6B6B6B] transition-colors hover:text-[#111111]"
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="space-y-2 p-6" aria-label="Mobile navigation">
          {navLinks.map((link) =>
            link.href.startsWith("#") ? (
              <button
                key={link.label}
                type="button"
                onClick={() => handleNavClick(link.href)}
                className="block w-full border-b border-[#E8E8E8] px-4 py-3 text-left text-[15px] font-semibold text-[#111111] transition-colors hover:text-[#F36F21]"
              >
                {link.label}
              </button>
            ) : (
              <Link
                key={link.label}
                to={link.href}
                onClick={onClose}
                className="block w-full border-b border-[#E8E8E8] px-4 py-3 text-[15px] font-semibold text-[#111111] transition-colors hover:text-[#F36F21]"
              >
                {link.label}
              </Link>
            )
          )}
        </nav>

        {/* CTA Button */}
        <div className="border-t border-[#E8E8E8] p-6">
          <button
            type="button"
            onClick={() => {
              onEnquireClick();
              onClose();
            }}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#F36F21] to-[#FF8C42] py-3 font-semibold text-white transition-all hover:shadow-lg"
          >
            Request a Proposal

            <svg
              width="17"
              height="17"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M4.5 12h15M13 5.5 19.5 12 13 18.5" />
            </svg>
          </button>
        </div>

        {/* Contact Info */}
        <div className="space-y-4 border-t border-[#E8E8E8] p-6">
          {/* Phone */}
          <a
            href="tel:+917024804838"
            className="flex items-center gap-3 text-sm text-[#6B6B6B] transition-colors hover:text-[#F36F21]"
            onClick={onClose}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              aria-hidden="true"
            >
              <path d="M7.2 3.6h3.1l1.5 3.9-2 1.3a11.5 11.5 0 0 0 5.4 5.4l1.3-2 3.9 1.5v3.1a2 2 0 0 1-2.2 2A16.8 16.8 0 0 1 5.2 5.8a2 2 0 0 1 2-2.2Z" />
            </svg>

            +91 70248 04838
          </a>

          {/* Email */}
          <a
            href="mailto:contact@trazooglobal.com"
            className="flex items-center gap-3 text-sm text-[#6B6B6B] transition-colors hover:text-[#F36F21]"
            onClick={onClose}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              aria-hidden="true"
            >
              <rect x="3.2" y="5" width="17.6" height="14" rx="3" />
              <path d="m3.6 7.4 8.4 5.4 8.4-5.4" />
            </svg>

            contact@trazooglobal.com
          </a>
        </div>
      </div>
    </>
  );
};

export default MobileNav;