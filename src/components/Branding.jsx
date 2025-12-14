import { useState, useEffect, useRef } from "react";
import { Palette, Tag, Box, Sparkles, CheckCircle2 } from "lucide-react";

const Branding = () => {
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

  const brandingFeatures = [
    {
      icon: Tag,
      title: "Products",
      description:
        "Curated as per role (joining kit, leadership kit, campus kit, event kit, etc.)",
      gradient: "from-violet-500 to-purple-500",
    },
    {
      icon: Palette,
      title: "Branding",
      description:
        "Logo placement, colour matching, taglines, and brand language",
      gradient: "from-pink-500 to-rose-500",
    },
    {
      icon: Box,
      title: "Packaging",
      description:
        "Boxes, sleeves, tissue wraps, inserts and handwritten-style notes",
      gradient: "from-blue-500 to-indigo-500",
    },
    {
      icon: Sparkles,
      title: "Experience",
      description:
        "QR codes, welcome letters, programme information and onboarding guides",
      gradient: "from-amber-500 to-orange-500",
    },
  ];

  return (
    <section
      id="branding"
      ref={sectionRef}
      className="relative py-20 px-6 overflow-hidden bg-gradient-to-br from-orange-50 via-white to-orange-50"
    >
      {/* 🔥 HERO STYLE BG */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-orange-500 rounded-full blur-3xl opacity-20 animate-blob" />
        <div className="absolute top-40 right-10 w-72 h-72 bg-orange-600 rounded-full blur-3xl opacity-15 animate-blob animation-delay-2000" />
        <div className="absolute bottom-10 left-1/2 w-72 h-72 bg-orange-500 rounded-full blur-3xl opacity-20 animate-blob animation-delay-4000" />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* HEADING */}
        <h2
          className={`text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-6 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <span className="text-gray-900">Designed Around</span>{" "}
          <span style={{ color: "#df4607" }}>Your Brand</span>{" "}
          <span className="text-gray-900">– Not Ours</span>
        </h2>

        <p
          className={`text-lg text-gray-700 text-center max-w-3xl mx-auto mb-12 transition-all duration-700 delay-150 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          No two organisations are the same – your kits shouldn't be either.
        </p>

        {/* FEATURES */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {brandingFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className={`bg-white/90 backdrop-blur p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div
                    className={`w-14 h-14 bg-gradient-to-br ${feature.gradient} rounded-xl flex items-center justify-center`}
                  >
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <CheckCircle2 className="w-6 h-6 text-gray-300" />
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>

                <p className="text-gray-700 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Branding;
