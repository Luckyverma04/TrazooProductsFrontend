import { useState, useEffect } from 'react';
import { Sparkles, Package, ArrowRight } from 'lucide-react';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-white to-orange-50 relative overflow-hidden px-6 py-20"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" style={{ backgroundColor: '#e16f30' }}></div>
        <div className="absolute top-40 right-10 w-72 h-72 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-blob animation-delay-2000" style={{ backgroundColor: '#df4607' }}></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" style={{ backgroundColor: '#e16f30' }}></div>
      </div>

     {/* Heading + Subheading Wrapper */}
<div className="max-w-3xl">

  {/* Main Heading */}
  <h1
    className="font-bold leading-tight mb-4"
    style={{ color: "#1a1a1a" }}
  >
    <span className="block text-5xl md:text-6xl lg:text-7xl mb-2">
      Welcome & Joining Kits
    </span>

<span
  className="block text-3xl md:text-4xl lg:text-5xl italic font-semibold whitespace-nowrap"
  style={{ color: "#df4607" }}
>
  That Create a Lasting First Impression
</span>

  </h1>

  {/* Sub Heading (Aligned) */}
  <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
    Thoughtfully designed, fully customised welcome kits for employees and students – 
    so every new beginning feels special from day one.
  </p>

</div>


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
        .animate-blob {
          animation: blob 7s infinite;
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