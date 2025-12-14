import { useEffect, useRef, useState } from "react";
import { Star, Brush, Package, Award, TrendingUp } from "lucide-react";

const ValueProposition = () => {
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

  const values = [
    {
      icon: Star,
      title: "Memorable First Impressions",
      description:
        "We design kits that go beyond basic mugs and pens – every element is curated to create an emotional connect and a strong first impression.",
    },
    {
      icon: Brush,
      title: "Fully Customised for Your Brand",
      description:
        "From colours and logos to packaging and welcome notes, every touchpoint is crafted to reflect your brand identity and culture.",
    },
    {
      icon: Package,
      title: "End-to-End Execution",
      description:
        "We handle sourcing, printing, assembly, packing and pan-India delivery so your team can stay focused on what matters.",
    },
    {
      icon: Award,
      title: "Quality You Can Trust",
      description:
        "Every product goes through strict quality checks to ensure a premium experience for employees and students alike.",
    },
    {
      icon: TrendingUp,
      title: "Flexible & Scalable",
      description:
        "Whether it's 50 or 5,000 kits, we scale quickly while maintaining consistency in branding and quality.",
    },
  ];

  return (
    <section
      id="why-trazoo"
      ref={sectionRef}
      className="py-20 px-6 bg-transparent relative"
    >
      <div className="max-w-5xl mx-auto">

        {/* Section Heading */}
        <h2
          className={`text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-6 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          Why Brands Choose{" "}
          <span style={{ color: "#df4607" }}>TRAZOO</span>
        </h2>

        <p
          className={`text-center text-gray-700 text-lg max-w-2xl mx-auto mb-12 transition-all duration-700 delay-150 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          Five compelling reasons why leading brands trust us with their onboarding experience
        </p>

        {/* LIST */}
        <div className="space-y-8">
          {values.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className={`flex gap-6 items-start transition-all duration-700 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
                style={{ transitionDelay: `${200 + index * 100}ms` }}
              >
                {/* ICON */}
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
                  <Icon className="w-6 h-6" style={{ color: "#df4607" }} />
                </div>

                {/* TEXT */}
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* BOTTOM LINE */}
        <div
          className={`mt-16 text-center transition-all duration-700 delay-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <p className="text-lg md:text-xl lg:text-2xl font-semibold text-gray-900">
            Designed to Scale with{" "}
            <span style={{ color: "#df4607" }}>Your Requirements</span>
          </p>
        </div>

      </div>
    </section>
  );
};

export default ValueProposition;
