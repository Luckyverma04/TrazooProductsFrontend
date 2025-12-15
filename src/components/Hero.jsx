import { useState, useEffect } from "react";
import { Sparkles, Package, ArrowRight, Star } from "lucide-react";

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToSection = (e, sectionId) => {
    e.preventDefault();
    const element = document.querySelector(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-white to-orange-50 relative overflow-hidden px-4 sm:px-6 py-20"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-20 left-10 w-72 h-72 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"
          style={{ backgroundColor: "#e16f30" }}
        />
        <div
          className="absolute top-40 right-10 w-72 h-72 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-blob animation-delay-2000"
          style={{ backgroundColor: "#df4607" }}
        />
        <div
          className="absolute -bottom-8 left-1/2 w-72 h-72 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"
          style={{ backgroundColor: "#e16f30" }}
        />
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-orange-300 rounded-full animate-float opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 10}s`,
            }}
          />
        ))}
      </div>

      {/* Parallax Effect (Disabled on Mobile by default CSS) */}
      <div
        className="absolute inset-0 pointer-events-none transition-transform duration-1000 ease-out hidden md:block"
        style={{
          transform: `translate(${mousePosition.x * 0.01}px, ${
            mousePosition.y * 0.01
          }px)`,
        }}
      >
        <div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl opacity-10"
          style={{ backgroundColor: "#e16f30" }}
        />
      </div>

      {/* Main Content */}
      <div className="max-w-3xl relative z-10 text-center sm:text-left">
        <h1
          className={`font-bold leading-tight mb-4 transition-all duration-1000 delay-200 ${
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-6"
          }`}
          style={{ color: "#1a1a1a" }}
        >
          <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl hover:scale-105 transition-transform duration-500">
            Welcome & Joining
          </span>

          <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-2 hover:scale-105 transition-transform duration-500">
            Kits
          </span>

          {/* 🔥 FIXED MOBILE TEXT CUTTING HERE */}
          <span
            className="block text-2xl sm:text-3xl md:text-4xl lg:text-5xl 
                       italic font-semibold break-words"
            style={{ color: "#df4607" }}
          >
            That Create a Lasting First Impression
          </span>
        </h1>

        {/* Sub Heading */}
        <p
          className={`text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed mb-10 transition-all duration-1000 delay-400 ${
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-6"
          }`}
        >
          Thoughtfully designed, fully customised welcome kits for employees and
          students – so every new beginning feels special from day one.
        </p>

        {/* CTA Buttons */}
        <div
          className={`flex flex-wrap gap-4 justify-center sm:justify-start transition-all duration-1000 delay-600 ${
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-6"
          }`}
        >
          <button
            onClick={(e) => scrollToSection(e, "#enquiry")}
            className="group relative px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              Get Started
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>

          <button
            onClick={(e) => scrollToSection(e, "#products")}
            className="group px-8 py-4 bg-white/80 backdrop-blur-sm text-gray-800 font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 border-2 border-orange-200 hover:border-orange-400"
          >
            <span className="flex items-center gap-2">
              <Package className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              View Our Kits
            </span>
          </button>
        </div>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes blob {
          0%, 100% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
          }
          25% {
            transform: translateY(-20px) translateX(10px);
          }
          50% {
            transform: translateY(-40px) translateX(-10px);
          }
          75% {
            transform: translateY(-20px) translateX(10px);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animate-float {
          animation: float linear infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </section>
  );
};

export default Hero;
