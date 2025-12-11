import { useState, useEffect, useRef } from 'react';
import { Heart, Gift, Sparkles, Users } from 'lucide-react';

const About = () => {
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

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-20 px-6 bg-gradient-to-b from-white to-blue-50 relative overflow-hidden"
    >
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-10 right-10 w-64 h-64 bg-purple-100 rounded-full filter blur-3xl opacity-20"></div>
        <div className="absolute bottom-10 left-10 w-64 h-64 bg-blue-100 rounded-full filter blur-3xl opacity-20"></div>
      </div>

      <div className="max-w-5xl mx-auto relative z-10">

        {/* Badge */}
        <div className={`flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-md mb-6 border border-purple-100 mx-auto w-fit transition-all duration-700 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <Sparkles className="w-4 h-4 text-purple-600" />
          <span className="text-sm font-medium text-gray-700">About Us / Intro Section</span>
        </div>

        {/* Section Title */}
        <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 text-center leading-tight mb-12 transition-all duration-700 delay-100 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          Onboarding That Feels{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
            Personal, Not Generic
          </span>
        </h2>

        {/* Content Cards */}
        <div className="grid md:grid-cols-2 gap-8 mt-12">
          
          {/* Card 1 */}
          <div className={`bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 border border-purple-50 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'} delay-200`}>
            <div className="w-14 h-14 bg-gradient-to-br from-purple-100 to-blue-100 rounded-xl flex items-center justify-center mb-6">
              <Heart className="w-7 h-7 text-purple-600" />
            </div>
            <p className="text-lg text-gray-700 leading-relaxed">
              At TRAZOO, we understand that the first day sets the tone for the entire journey. 
              Our welcome & joining kits are curated to make new employees and learners feel valued, 
              welcomed and proud to be part of your organisation.
            </p>
          </div>

          {/* Card 2 */}
          <div className={`bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 border border-blue-50 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'} delay-300`}>
            <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl flex items-center justify-center mb-6">
              <Gift className="w-7 h-7 text-blue-600" />
            </div>
            <p className="text-lg text-gray-700 leading-relaxed">
              Every kit is designed to balance utility, aesthetics and brand storytelling – 
              so the gifts are not just "things in a box", but a memorable experience that 
              represents who you are as a brand.
            </p>
          </div>

        </div>

        {/* Feature Highlights */}
        <div className={`mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 transition-all duration-700 delay-400 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          
          <div className="bg-gradient-to-br from-purple-50 to-white rounded-xl p-6 border border-purple-100 text-center hover:scale-105 transition-transform duration-300">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Employee First</h4>
            <p className="text-sm text-gray-600">Creating memorable first impressions</p>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-6 border border-blue-100 text-center hover:scale-105 transition-transform duration-300">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Gift className="w-6 h-6 text-blue-600" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Fully Custom</h4>
            <p className="text-sm text-gray-600">Tailored to your brand identity</p>
          </div>

          <div className="bg-gradient-to-br from-indigo-50 to-white rounded-xl p-6 border border-indigo-100 text-center hover:scale-105 transition-transform duration-300">
            <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-6 h-6 text-indigo-600" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Premium Quality</h4>
            <p className="text-sm text-gray-600">Utility meets aesthetics</p>
          </div>

        </div>

      </div>
    </section>
  );
};

export default About;