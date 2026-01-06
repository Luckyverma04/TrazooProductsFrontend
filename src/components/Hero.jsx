import { useEffect, useMemo, useState } from "react";
import { Package, ArrowRight } from "lucide-react";

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToSection = (e, sectionId) => {
    e.preventDefault();
    document.querySelector(sectionId)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  // ✅ Reduced particles from 12 to 8 for better performance
  const particles = useMemo(
    () =>
      Array.from({ length: 8 }, () => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        delay: Math.random() * 4,
        duration: 8 + Math.random() * 6,
      })),
    []
  );

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-white to-orange-50 relative overflow-hidden px-4 py-20"
    >
      {/* ✅ Optimized background blobs with hardware acceleration */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute top-20 left-10 w-72 h-72 rounded-full opacity-20 bg-[#e16f30]"
          style={{
            filter: 'blur(80px)',
            transform: 'translateZ(0)',
            animation: 'blob 10s infinite ease-in-out'
          }}
        />
        <div 
          className="absolute top-40 right-10 w-72 h-72 rounded-full opacity-15 bg-[#df4607]"
          style={{
            filter: 'blur(80px)',
            transform: 'translateZ(0)',
            animation: 'blob 10s infinite ease-in-out',
            animationDelay: '2s'
          }}
        />
      </div>

      {/* ✅ Optimized floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((p, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-orange-300 rounded-full opacity-30"
            style={{
              left: `${p.left}%`,
              top: `${p.top}%`,
              animation: `float ${p.duration}s linear infinite`,
              animationDelay: `${p.delay}s`,
              transform: 'translateZ(0)', // Hardware acceleration
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="max-w-3xl relative z-10 text-center sm:text-left">
        <h1
          className={`font-bold leading-tight mb-4 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <span className="block text-4xl sm:text-6xl lg:text-7xl">
            Welcome & Joining
          </span>
          <span className="block text-4xl sm:text-6xl lg:text-7xl mb-2">
            Kits
          </span>
          <span className="block text-2xl sm:text-4xl italic font-semibold text-[#df4607]">
            That Create a Lasting First Impression
          </span>
        </h1>

        <p
          className={`text-base sm:text-lg text-gray-700 mb-10 transition-all duration-700 delay-150 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          Thoughtfully designed, fully customised welcome kits for employees and
          students – so every new beginning feels special from day one.
        </p>

        <div
          className={`flex gap-4 justify-center sm:justify-start transition-all duration-700 delay-300 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <button
            onClick={(e) => scrollToSection(e, "#enquiry")}
            className="px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-full shadow-lg hover:scale-105 transition-transform duration-300"
          >
            Get Started <ArrowRight className="inline w-5 h-5 ml-1" />
          </button>

          <button
            onClick={(e) => scrollToSection(e, "#products")}
            className="px-8 py-4 bg-white text-gray-800 font-semibold rounded-full border-2 border-orange-200 hover:border-orange-400 hover:scale-105 transition-transform duration-300"
          >
            <Package className="inline w-5 h-5 mr-1" />
            View Our Kits
          </button>
        </div>
      </div>

      <style>{`
        @keyframes blob {
          0%, 100% { 
            transform: translate3d(0, 0, 0) scale(1); 
          }
          50% { 
            transform: translate3d(20px, -30px, 0) scale(1.1); 
          }
        }
        @keyframes float {
          0%, 100% { 
            transform: translate3d(0, 0, 0); 
          }
          50% { 
            transform: translate3d(0, -25px, 0); 
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;