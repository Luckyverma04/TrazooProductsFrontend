import { useState } from "react";
import { MessageCircle, Phone, MessageSquare } from "lucide-react";

const HailButton = ({ onEnquireClick }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="fixed bottom-8 right-8 z-40 flex flex-col items-end gap-3">
      {/* Side buttons - appear when expanded */}
      {isExpanded && (
        <>
          {/* Call Button */}
          <a
            href="tel:+917024804838"
            className="flex items-center justify-center gap-2 bg-white text-[#111111] px-4 py-3 rounded-full shadow-lg hover:bg-[#F36F21] hover:text-white transition-all animate-slideUp"
            title="Call Trazoo"
          >
            <Phone size={18} />
            <span className="text-sm font-semibold hidden sm:inline">Call us</span>
          </a>

          {/* WhatsApp Button */}
          <a
            href="https://wa.me/917024804838"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-white text-[#111111] px-4 py-3 rounded-full shadow-lg hover:bg-[#25D366] hover:text-white transition-all animate-slideUp"
            style={{ animationDelay: "0.1s" }}
            title="Chat on WhatsApp"
          >
            <MessageSquare size={18} />
            <span className="text-sm font-semibold hidden sm:inline">WhatsApp</span>
          </a>
        </>
      )}

      {/* Main Enquire Button */}
      <button
        onClick={() => {
          if (isExpanded) {
            onEnquireClick();
          } else {
            setIsExpanded(!isExpanded);
          }
        }}
        className={`flex items-center justify-center gap-2 px-5 py-4 rounded-full font-semibold shadow-lg transition-all transform hover:scale-110 ${
          isExpanded
            ? "bg-[#F36F21] text-white"
            : "bg-gradient-to-r from-[#F36F21] to-[#FF8C42] text-white"
        }`}
      >
        <MessageCircle size={20} />
        <span className="hidden sm:inline">
          {isExpanded ? "Enquire" : "Enquire Now"}
        </span>
      </button>

      {/* Backdrop to close */}
      {isExpanded && (
        <div
          className="fixed inset-0 z-[-1]"
          onClick={() => setIsExpanded(false)}
        ></div>
      )}

      <style>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-slideUp {
          animation: slideUp 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default HailButton;