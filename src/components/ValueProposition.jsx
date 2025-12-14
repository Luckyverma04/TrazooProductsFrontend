import { useState, useEffect, useRef } from 'react';
import { Star, Brush, Package, Award, ArrowRight, TrendingUp } from 'lucide-react';

const ValueProposition = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
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

  const values = [
    {
      icon: Star,
      title: "Memorable First Impressions",
      description: "We design kits that go beyond basic mugs and pens – every element is curated to create an emotional connect and a strong first impression.",
      gradient: "from-yellow-400 to-orange-500",
      bgGradient: "from-yellow-50 to-orange-50",
      borderColor: "border-yellow-200"
    },
    {
      icon: Brush,
      title: "Fully Customised for Your Brand",
      description: "We work closely with your HR, marketing or admissions team to understand your brand identity, values and culture. From colours and logos to packaging and welcome notes, every touchpoint is crafted to reflect your story.",
      gradient: "from-pink-400 to-purple-500",
      bgGradient: "from-pink-50 to-purple-50",
      borderColor: "border-pink-200"
    },
    {
      icon: Package,
      title: "End-to-End Execution",
      description: "We handle everything – sourcing, printing, assembly, packing and dispatch. Your team simply shares the brief; we take care of the rest, including pan-India and multi-location deliveries.",
      gradient: "from-blue-400 to-indigo-500",
      bgGradient: "from-blue-50 to-indigo-50",
      borderColor: "border-blue-200"
    },
    {
      icon: Award,
      title: "Quality You Can Trust",
      description: "We work only with trusted manufacturers and suppliers. Each product goes through checks so that what lands in your employees' or students' hands truly feels premium.",
      gradient: "from-green-400 to-emerald-500",
      bgGradient: "from-green-50 to-emerald-50",
      borderColor: "border-green-200"
    },
    {
      icon: TrendingUp,
      title: "Flexible & Scalable",
      description: "Whether you're onboarding 50 interns, 500 employees or 5,000 students, we can scale quickly while maintaining consistency in branding and quality.",
      gradient: "from-cyan-400 to-teal-500",
      bgGradient: "from-cyan-50 to-teal-50",
      borderColor: "border-cyan-200"
    }
  ];

  return (
    <section
      id="why-trazoo"
      ref={sectionRef}
      className="py-20 px-6 bg-gradient-to-b from-white via-purple-50 to-blue-50 relative overflow-hidden"
    >
      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-200 rounded-full filter blur-3xl opacity-20 pointer-events-none"></div>
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-blue-200 rounded-full filter blur-3xl opacity-20 pointer-events-none"></div>

      <div className="max-w-6xl mx-auto relative z-10">

        {/* Badge */}
        {/* <div className={`flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-md mb-6 border border-purple-100 mx-auto w-fit transition-all duration-700 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <Award className="w-4 h-4 text-purple-600" />
          <span className="text-sm font-medium text-gray-700">Why Brands Choose TRAZOO (Value Proposition)</span>
        </div> */}

        {/* Section Title */}
        <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold text-center text-gray-900 mb-6 transition-all duration-700 delay-100 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          Why Brands Choose{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600">
            TRAZOO
          </span>
        </h2>

        <p className={`text-center text-gray-600 text-lg mb-12 max-w-2xl mx-auto transition-all duration-700 delay-200 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          Five compelling reasons why leading companies trust us with their onboarding experience
        </p>

        {/* Points Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <div
                key={index}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
                className={`group relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl border-2 ${value.borderColor} transition-all duration-500 hover:-translate-y-2 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'} overflow-hidden`}
                style={{ transitionDelay: `${300 + index * 100}ms` }}
              >
                {/* Animated Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${value.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>

                {/* Content */}
                <div className="relative z-10">
                  {/* Icon Container */}
                  <div className="flex items-start justify-between mb-6">
                    <div className={`w-14 h-14 bg-gradient-to-br ${value.gradient} rounded-xl flex items-center justify-center shadow-lg transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    
                    {/* Arrow indicator */}
                    <ArrowRight className={`w-6 h-6 text-gray-400 transform transition-all duration-300 ${hoveredCard === index ? 'translate-x-2 text-purple-600' : ''}`} />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-blue-600 transition-all duration-300">
                    {value.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-700 leading-relaxed text-base">
                    {value.description}
                  </p>

                  {/* Bottom decorative line */}
                  <div className={`mt-6 h-1 w-0 group-hover:w-full bg-gradient-to-r ${value.gradient} rounded-full transition-all duration-500`}></div>
                </div>

                {/* Corner accent */}
                <div className={`absolute -bottom-2 -right-2 w-24 h-24 bg-gradient-to-br ${value.gradient} opacity-5 rounded-tl-full transition-all duration-500 group-hover:scale-150`}></div>
              </div>
            );
          })}
        </div>

        {/* Bottom Trust Badge */}
        <div className={`mt-16 text-center transition-all duration-700 delay-700 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="inline-flex flex-col md:flex-row items-center gap-3 px-8 py-4 bg-white rounded-2xl border-2 border-purple-100 shadow-lg">
            <div className="flex -space-x-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 border-2 border-white flex items-center justify-center">
                <Star className="w-5 h-5 text-white" />
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 border-2 border-white flex items-center justify-center">
                <Brush className="w-5 h-5 text-white" />
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 border-2 border-white flex items-center justify-center">
                <Package className="w-5 h-5 text-white" />
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-teal-500 border-2 border-white flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
            </div>
            <span className="text-gray-700 font-semibold">Trusted by 500+ brands across India</span>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ValueProposition;