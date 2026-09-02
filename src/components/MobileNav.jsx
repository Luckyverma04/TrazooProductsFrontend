import { X } from "lucide-react";

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
    } else {
      window.location.href = href;
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40 lg:hidden"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed left-0 top-0 h-screen w-64 bg-white z-50 shadow-2xl overflow-y-auto transform transition-transform duration-300">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#E8E8E8]">
          <img
            src="/assets/images/branding/logo-sm.webp"
            alt="Trazoo"
            className="h-8"
          />

          <button
            onClick={onClose}
            className="text-[#6B6B6B] hover:text-[#111111] transition-colors"
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="p-6 space-y-2">
          {navLinks.map((link) => (
            <button
              key={link.label}
              type="button"
              onClick={() => handleNavClick(link.href)}
              className="w-full text-left block py-3 px-4 text-[15px] font-semibold text-[#111111] border-b border-[#E8E8E8] hover:text-[#F36F21] transition-colors"
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* CTA Button */}
        <div className="p-6 border-t border-[#E8E8E8]">
          <button
            onClick={() => {
              onEnquireClick();
              onClose();
            }}
            className="w-full py-3 bg-gradient-to-r from-[#F36F21] to-[#FF8C42] text-white font-semibold rounded-lg hover:shadow-lg transition-all flex items-center justify-center gap-2"
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
            >
              <path d="M4.5 12h15M13 5.5 19.5 12 13 18.5" />
            </svg>
          </button>
        </div>

        {/* Contact Info */}
        <div className="p-6 border-t border-[#E8E8E8] space-y-4">
          <a
            href="tel:+917024804838"
            className="flex items-center gap-3 text-sm text-[#6B6B6B] hover:text-[#F36F21] transition-colors"
            onClick={onClose}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
            >
              <path d="M7.2 3.6h3.1l1.5 3.9-2 1.3a11.5 11.5 0 0 0 5.4 5.4l1.3-2 3.9 1.5v3.1a2 2 0 0 1-2.2 2A16.8 16.8 0 0 1 5.2 5.8a2 2 0 0 1 2-2.2Z" />
            </svg>

            +91 70248 04838
          </a>

          <a
            href="mailto:contact@trazooglobal.com"
            className="flex items-center gap-3 text-sm text-[#6B6B6B] hover:text-[#F36F21] transition-colors"
            onClick={onClose}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
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