import { useState, useEffect, useRef } from "react";
import { Heart, Gift, Sparkles, Users } from "lucide-react";

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setIsVisible(true),
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-20 px-6 overflow-hidden bg-gradient-to-br from-orange-50 via-white to-orange-50"
    >
      {/* 🔥 HERO STYLE BACKGROUND */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-orange-500 rounded-full blur-3xl opacity-20 animate-blob" />
        <div className="absolute top-40 right-10 w-72 h-72 bg-orange-600 rounded-full blur-3xl opacity-15 animate-blob animation-delay-2000" />
        <div className="absolute bottom-10 left-1/2 w-72 h-72 bg-orange-500 rounded-full blur-3xl opacity-20 animate-blob animation-delay-4000" />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">

        {/* SECTION HEADING */}
        <h2
          className={`text-3xl md:text-4xl lg:text-5xl font-bold text-center leading-tight mb-12 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <span className="text-gray-900">Onboarding That Feels</span>{" "}
          <span style={{ color: "#df4607" }}>
            Personal, Not Generic
          </span>
        </h2>

        {/* CONTENT CARDS */}
        <div className="grid md:grid-cols-2 gap-8">

          {/* CARD 1 */}
          <div
            className={`bg-white/80 backdrop-blur rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 border border-gray-100 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
              <Heart className="w-7 h-7 text-purple-600" />
            </div>
            <p className="text-lg text-gray-700 leading-relaxed">
              At TRAZOO, we understand that the first day sets the tone for the
              entire journey. Our welcome & joining kits are curated to make new
              employees and learners feel valued, welcomed and proud to be part
              of your organisation.
            </p>
          </div>

          {/* CARD 2 */}
          <div
            className={`bg-white/80 backdrop-blur rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 border border-gray-100 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
              <Gift className="w-7 h-7 text-blue-600" />
            </div>
            <p className="text-lg text-gray-700 leading-relaxed">
              Every kit is designed to balance utility, aesthetics and brand
              storytelling – so the gifts are not just “things in a box”, but a
              memorable experience that represents who you are as a brand.
            </p>
          </div>

        </div>

        {/* FEATURE HIGHLIGHTS */}
        <div
          className={`mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 transition-all duration-700 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div className="bg-white/80 backdrop-blur rounded-xl p-6 border border-gray-100 text-center hover:scale-105 transition-transform">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">
              Employee First
            </h4>
            <p className="text-sm text-gray-600">
              Creating memorable first impressions
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur rounded-xl p-6 border border-gray-100 text-center hover:scale-105 transition-transform">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Gift className="w-6 h-6 text-blue-600" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">
              Fully Custom
            </h4>
            <p className="text-sm text-gray-600">
              Tailored to your brand identity
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur rounded-xl p-6 border border-gray-100 text-center hover:scale-105 transition-transform">
            <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-6 h-6 text-indigo-600" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">
              Premium Quality
            </h4>
            <p className="text-sm text-gray-600">
              Utility meets aesthetics
            </p>
          </div>
        </div>

      </div>

      {/* 🔁 Animations */}
      <style>{`
        @keyframes blob {
          0%,100% { transform: translate(0,0) scale(1); }
          33% { transform: translate(30px,-50px) scale(1.1); }
          66% { transform: translate(-20px,20px) scale(0.9); }
        }
        .animate-blob { animation: blob 7s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
      `}</style>
    </section>
  );
};

export default About;
