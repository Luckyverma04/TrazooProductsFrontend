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
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden px-6 py-20"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      <div className={`max-w-4xl mx-auto relative z-10 transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-md mb-6 border border-blue-100">
          <Sparkles className="w-4 h-4 text-blue-600" />
          <span className="text-sm font-medium text-gray-700">Hero Section</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
          Welcome & Joining Kits That Make a{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
            Lasting First Impression
          </span>
        </h1>

        {/* Sub-headline */}
        <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-4 max-w-3xl mx-auto">
          Thoughtfully designed, fully customised welcome kits for employees and students –
          so every new beginning feels special from day one.
        </p>

        {/* Supporting Line */}
        <p className="text-base md:text-lg text-gray-600 mb-10 max-w-2xl mx-auto">
          From fast-growing startups to leading institutes, TRAZOO delivers premium onboarding 
          and gifting experiences across India.
        </p>

        {/* CTA Section */}
       <div className="flex flex-col items-center gap-4">
  <button
    onClick={(e) => {
      e.preventDefault();
      const element = document.querySelector("#enquiry");
      if (element) {
        const offset = 80; // same navbar offset
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    }}
    className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold text-lg rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 flex items-center gap-2"
  >
    <Package className="w-5 h-5" />
    Enquire Now
    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
  </button>

  {/* CTA Sub-text */}
  <p className="text-sm text-gray-600 max-w-md text-center">
    Share your requirements – we'll respond within 24 hours with ideas & pricing.
  </p>
</div>


        {/* Trust Indicators */}
        <div className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-1">500+</div>
            <div className="text-sm text-gray-600">Happy Clients</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-1">24hr</div>
            <div className="text-sm text-gray-600">Quick Response</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-indigo-600 mb-1">100%</div>
            <div className="text-sm text-gray-600">Custom Made</div>
          </div>
        </div>

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