import { useState, useEffect, useRef } from "react";
import { Shield, Palette, DollarSign, CheckCircle } from "lucide-react";

const USPs = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  const usps = [
    {
      icon: DollarSign,
      title: "Zero Upfront Payment",
      description:
        "Get started without any financial risk. We share concepts, kit ideas and proposals with no upfront payment, so you only commit when you're confident and ready to move ahead.",
      color: "from-green-500 to-emerald-500",
      bgColor: "from-green-50 to-emerald-50",
    },
    {
      icon: Shield,
      title: "Quality Assurance You Can Rely On",
      description:
        "Every product, print and package goes through strict quality checks for finish, durability and consistency. If it doesn't meet the agreed standard, it doesn't leave our facility.",
      color: "from-blue-500 to-cyan-500",
      bgColor: "from-blue-50 to-cyan-50",
    },
    {
      icon: Palette,
      title: "Fully Custom Products for Your Brand",
      description:
        "Nothing is off-the-shelf. From bottles, T-shirts and hoodies to diaries, pens, bags and packaging – every element is customised to your brand colours, logo, tone and audience.",
      color: "from-purple-500 to-pink-500",
      bgColor: "from-purple-50 to-pink-50",
    },
    {
      icon: CheckCircle,
      title: "Lowest-Price Promise in the Industry",
      description:
        "We operate with lean margins and strong vendor partnerships to offer high-impact kits at the most competitive prices in the industry – without cutting corners on quality or experience.",
      color: "from-orange-500 to-red-500",
      bgColor: "from-orange-50 to-red-50",
    },
  ];

  return (
    <section
      id="usps"
      ref={sectionRef}
      className="py-20 px-6 bg-transparent relative overflow-hidden"
    >
      <div className="max-w-6xl mx-auto relative z-10">

        {/* Section Title */}
        <h2
          className={`text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-4 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          What Makes Us{" "}
          <span style={{ color: "#df4607" }}>Unique</span>
        </h2>

        <p
          className={`text-center text-gray-600 text-lg mb-12 max-w-2xl mx-auto transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          Four key advantages that set us apart in the industry
        </p>

        {/* USP Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          {usps.map((usp, index) => {
            const Icon = usp.icon;

            return (
              <div
                key={index}
                className={`bg-white/80 backdrop-blur p-8 rounded-2xl shadow-lg hover:shadow-2xl border border-gray-100 transition-all duration-500 hover:-translate-y-2 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${300 + index * 100}ms` }}
              >
                {/* CENTERED ICON */}
                <div className="flex justify-center">
                  <div
                    className={`w-16 h-16 bg-gradient-to-br ${usp.bgColor} rounded-2xl flex items-center justify-center mb-6`}
                  >
                    <div
                      className={`w-12 h-12 bg-gradient-to-br ${usp.color} rounded-xl flex items-center justify-center`}
                    >
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                  </div>
                </div>

                {/* HEADING */}
                <h3 className="text-xl md:text-2xl font-bold text-center mb-4">
                  <span className="text-gray-900">
                    {usp.title.split(" ").slice(0, 2).join(" ")}
                  </span>{" "}
                  <span style={{ color: "#df4607" }}>
                    {usp.title.split(" ").slice(2).join(" ")}
                  </span>
                </h3>

                {/* DESCRIPTION */}
                <p className="text-gray-700 leading-relaxed text-center">
                  {usp.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Bottom Note */}
        <div
          className={`mt-16 text-center transition-all duration-700 delay-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-orange-100 rounded-full border border-orange-200">
            <CheckCircle className="w-5 h-5 text-orange-600" />
            <span className="text-gray-800 font-medium">
              All benefits included with every order
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};

export default USPs;
