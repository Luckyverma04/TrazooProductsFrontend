import { useState, useEffect, useRef } from 'react';
import { Palette, Tag, Box, Sparkles, CheckCircle2 } from 'lucide-react';

const Branding = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const brandingFeatures = [
    {
      icon: Tag,
      title: "Products",
      description: "Curated as per role (joining kit, leadership kit, campus kit, event kit, etc.)",
      gradient: "from-violet-500 to-purple-500",
      bgGradient: "from-violet-50 to-purple-50"
    },
    {
      icon: Palette,
      title: "Branding",
      description: "Logo placement, colour matching, taglines, and brand language",
      gradient: "from-pink-500 to-rose-500",
      bgGradient: "from-pink-50 to-rose-50"
    },
    {
      icon: Box,
      title: "Packaging",
      description: "Boxes, sleeves, tissue wraps, inserts and handwritten-style notes",
      gradient: "from-blue-500 to-indigo-500",
      bgGradient: "from-blue-50 to-indigo-50"
    },
    {
      icon: Sparkles,
      title: "Experience",
      description: "QR codes, welcome letters, programme information and onboarding guides",
      gradient: "from-amber-500 to-orange-500",
      bgGradient: "from-amber-50 to-orange-50"
    }
  ];

  return (
    <section
      id="branding"
      ref={sectionRef}
      className="py-20 px-6 bg-gradient-to-b from-white to-purple-50 relative overflow-hidden"
    >
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-96 h-96 bg-purple-200 rounded-full filter blur-3xl opacity-20"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-pink-200 rounded-full filter blur-3xl opacity-20"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-200 rounded-full filter blur-3xl opacity-10"></div>
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Badge */}
        <div className={`flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-md mb-6 border border-purple-100 mx-auto w-fit transition-all duration-700 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <Palette className="w-4 h-4 text-purple-600" />
          <span className="text-sm font-medium text-gray-700">Customisation & Branding</span>
        </div>

        {/* Section Title */}
        <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold text-center text-gray-900 mb-6 transition-all duration-700 delay-100 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          Designed Around{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600">
            Your Brand
          </span>
          {' '}– Not Ours
        </h2>

        {/* Body Copy */}
        <p className={`text-lg text-gray-700 leading-relaxed text-center max-w-3xl mx-auto mb-12 transition-all duration-700 delay-200 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          No two organisations are the same – your kits shouldn't be either.
        </p>

        {/* Branding Features Grid */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          {brandingFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className={`group relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl border-2 border-gray-100 hover:border-transparent transition-all duration-500 hover:-translate-y-2 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'} overflow-hidden`}
                style={{ transitionDelay: `${300 + index * 100}ms` }}
              >
                {/* Background Gradient on Hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>

                {/* Content */}
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    {/* Icon */}
                    <div className={`w-14 h-14 bg-gradient-to-br ${feature.gradient} rounded-xl flex items-center justify-center shadow-lg transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    
                    {/* Check Icon */}
                    <CheckCircle2 className="w-6 h-6 text-gray-300 group-hover:text-green-500 transition-colors duration-300" />
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-pink-600 transition-all duration-300">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-700 leading-relaxed">
                    {feature.description}
                  </p>

                  {/* Animated Bottom Line */}
                  <div className={`mt-6 h-1 w-0 group-hover:w-full bg-gradient-to-r ${feature.gradient} rounded-full transition-all duration-500`}></div>
                </div>

                {/* Corner Decoration */}
                <div className={`absolute -bottom-3 -right-3 w-28 h-28 bg-gradient-to-br ${feature.gradient} opacity-5 rounded-tl-full transition-all duration-500 group-hover:scale-150`}></div>
              </div>
            );
          })}
        </div>

        {/* Final Statement */}
        <div className={`mt-12 transition-all duration-700 delay-700 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="bg-gradient-to-r from-purple-50 via-pink-50 to-blue-50 rounded-2xl p-8 border-2 border-purple-100 shadow-lg">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <Palette className="w-8 h-8 text-white" />
                </div>
              </div>
              <div className="text-center md:text-left flex-1">
                <p className="text-lg text-gray-800 leading-relaxed font-medium">
                  Whether you're an edtech company, university, startup or corporate, we ensure every kit 
                  feels like a natural extension of your brand.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Brand Type Icons */}
        <div className={`mt-12 flex flex-wrap justify-center gap-4 transition-all duration-700 delay-800 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          {['Edtech', 'University', 'Startup', 'Corporate'].map((type, index) => (
            <div
              key={index}
              className="px-6 py-3 bg-white rounded-full shadow-md border border-gray-200 hover:border-purple-300 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <span className="text-sm font-medium text-gray-700">{type}</span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Branding;