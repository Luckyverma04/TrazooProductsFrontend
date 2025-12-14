import {
  CheckCircle2,
  Package,
  Palette,
  ClipboardCheck,
  Truck,
} from "lucide-react";
import { useState, useEffect } from "react";

const Process = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const steps = [
    {
      icon: <ClipboardCheck className="w-8 h-8" />,
      title: "Share Your Requirement",
      description: "Tell us about your audience, quantity, locations and budget.",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      icon: <Package className="w-8 h-8" />,
      title: "Kit Design & Curation",
      description: "Our team proposes kit options with mockups and pricing.",
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
    },
    {
      icon: <Palette className="w-8 h-8" />,
      title: "Branding & Finalisation",
      description: "Branding, artwork and packaging details are locked.",
      iconBg: "bg-pink-100",
      iconColor: "text-pink-600",
    },
    {
      icon: <CheckCircle2 className="w-8 h-8" />,
      title: "Production & Quality Check",
      description: "Each piece goes through strict quality checks.",
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      icon: <Truck className="w-8 h-8" />,
      title: "Dispatch & Delivery",
      description: "Pan-India delivery with tracking and support.",
      iconBg: "bg-orange-100",
      iconColor: "text-orange-600",
    },
  ];

  return (
    <section
      id="process"
      className="relative py-20 px-6 overflow-hidden bg-gradient-to-br from-orange-50 via-white to-orange-50"
    >
      {/* 🔥 SAME BG */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-orange-500 rounded-full blur-3xl opacity-20 animate-blob" />
        <div className="absolute top-40 right-10 w-72 h-72 bg-orange-600 rounded-full blur-3xl opacity-15 animate-blob animation-delay-2000" />
        <div className="absolute bottom-10 left-1/2 w-72 h-72 bg-orange-500 rounded-full blur-3xl opacity-20 animate-blob animation-delay-4000" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">

        {/* HEADING */}
        <h3 className="text-4xl md:text-5xl font-bold text-center mb-16">
          <span className="text-gray-900">From Brief to</span>{" "}
          <span style={{ color: "#df4607" }}>Doorstep</span>{" "}
          <span className="text-gray-900">– Our</span>{" "}
          <span style={{ color: "#df4607" }}>5-Step Process</span>
        </h3>

        {/* STEPS */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`bg-white/90 backdrop-blur p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* ICON */}
              <div
                className={`w-16 h-16 ${step.iconBg} ${step.iconColor} rounded-xl flex items-center justify-center mb-4`}
              >
                {step.icon}
              </div>

              {/* TITLE */}
              <h4 className="text-lg font-semibold text-gray-900 mb-3">
                {step.title}
              </h4>

              {/* DESCRIPTION */}
              <p className="text-gray-700 text-sm leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* BOTTOM */}
        <div className="mt-16 text-center">
          <p className="text-lg font-medium">
            <span className="text-gray-900">Ready to get started?</span>{" "}
            <span style={{ color: "#df4607" }}>
              Let’s create something amazing together.
            </span>
          </p>
        </div>

      </div>
    </section>
  );
};

export default Process;
