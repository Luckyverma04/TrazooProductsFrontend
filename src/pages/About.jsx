import { useState, useEffect, useRef } from "react";
import { Heart, Gift, Users, ShieldCheck, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

// Import your image here
import aboutus_1 from "../assets/aboutus_1.jpeg";

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setIsVisible(true),
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const highlights = [
    {
      icon: Gift,
      title: "Complete Execution",
      description: "From sourcing to fulfilment under one roof",
    },
    {
      icon: ShieldCheck,
      title: "Quality Assured",
      description: "Every detail handled with care and precision",
    },
    {
      icon: Users,
      title: "Hassle-Free Process",
      description: "One team, one requirement, complete responsibility",
    },
  ];

  const services = [
    "Product Sourcing & Customisation",
    "Branding & Packaging",
    "Kitting & Assembly",
    "Quality Checks",
    "Pan-India Fulfilment",
  ];

  const handleShareRequirement = () => {
    navigate("/requirements");
  };

  return (
    <>
      <main id="about">
        <section
          ref={sectionRef}
          className="relative pt-28 pb-20 px-6 overflow-hidden bg-gradient-to-b from-[#FFFDF9] to-white"
        >
          {/* Fine grid texture */}
          <div
            className="absolute inset-0 opacity-[0.02] pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(#222 1px, transparent 1px), linear-gradient(90deg, #222 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />

          <div className="max-w-6xl mx-auto relative z-10">
            {/* HEADER */}
            <div className="text-center mb-16">
              <h2
                className={`text-4xl md:text-5xl lg:text-5xl font-bold tracking-tight leading-tight mb-6 transition-all duration-700 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
              >
                <span className="text-[#222222]">We manage the work</span>
                <br />
                <span className="text-[#df4607]">behind the gift</span>
              </h2>

              <p
                className={`text-lg text-[#666] max-w-2xl mx-auto leading-relaxed transition-all duration-700 delay-100 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
              >
                Founded in 2025, Trazoo Global LLP is a B2B corporate gifting and merchandise company built to make corporate gifting easier to manage and execute at scale.
              </p>
            </div>

            {/* HERO IMAGE */}
            <div
              className={`mb-16 rounded-2xl overflow-hidden border-2 border-[#DED8D2] shadow-lg transition-all duration-700 delay-200 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
            >
              <img
                src={aboutus_1}
                alt="Trazoo Global Products"
                className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* MAIN CONTENT */}
            <div
              className={`grid md:grid-cols-2 gap-8 mb-12 transition-all duration-700 delay-150 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
            >
              {/* LEFT: WHO WE ARE */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-[#222222] mb-4">
                    Who We Are
                  </h3>
                  <p className="text-base text-[#666] leading-relaxed">
                    We work with organisations to create employee kits, corporate merchandise, festive hampers, event kits and institutional requirements—all tailored to their brand, budget and purpose.
                  </p>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-[#222222] mb-4">
                    What We Do
                  </h3>
                  <p className="text-base text-[#666] leading-relaxed mb-5">
                    From product sourcing and customisation to branding, packaging, kitting, quality checks and fulfilment, our team manages the complete execution under one roof.
                  </p>

                  <div className="space-y-3">
                    {services.map((service) => (
                      <div key={service} className="flex items-center gap-3">
                        <CheckCircle2 size={20} className="text-[#df4607] flex-shrink-0" />
                        <span className="text-[#666] font-medium">{service}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* RIGHT: OUR PROMISE */}
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-orange-50 to-white border-2 border-orange-200 rounded-2xl p-8">
                  <div className="w-12 h-12 bg-[#df4607]/10 border border-[#df4607]/20 rounded-lg flex items-center justify-center mb-6">
                    <Heart className="w-6 h-6 text-[#df4607]" />
                  </div>
                  <h4 className="text-xl font-bold text-[#222222] mb-3">Our Promise</h4>
                  <p className="text-base text-[#666] leading-relaxed">
                    Corporate gifting should not mean coordinating with multiple vendors, following up on every small detail, or worrying about what happens after the order is placed. We take that responsibility off your team.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-white border-2 border-blue-200 rounded-2xl p-8">
                  <div className="w-12 h-12 bg-[#df4607]/10 border border-[#df4607]/20 rounded-lg flex items-center justify-center mb-6">
                    <Gift className="w-6 h-6 text-[#df4607]" />
                  </div>
                  <h4 className="text-xl font-bold text-[#222222] mb-3">Our Approach</h4>
                  <p className="text-base text-[#666] leading-relaxed">
                    Every requirement is handled with care, consistency and attention to detail. We combine product expertise, customisation and execution to help organisations deliver thoughtful, well-branded experiences at scale.
                  </p>
                </div>
              </div>
            </div>

            {/* FEATURE HIGHLIGHTS */}
            <div
              className={`grid grid-cols-1 md:grid-cols-3 gap-6 transition-all duration-700 delay-200 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
            >
              {highlights.map(({ icon: Icon, title, description }) => (
                <div
                  key={title}
                  className="group bg-white border-2 border-[#ddd] rounded-2xl p-8 hover:border-[#df4607] hover:shadow-lg transition-all duration-300"
                >
                  <div className="w-14 h-14 bg-orange-100/50 border-2 border-[#df4607]/20 rounded-xl flex items-center justify-center mb-5 group-hover:bg-orange-100 transition-all">
                    <Icon className="w-7 h-7 text-[#df4607]" />
                  </div>
                  <h4 className="text-lg font-bold text-[#222222] mb-2">{title}</h4>
                  <p className="text-sm text-[#666]">{description}</p>
                </div>
              ))}
            </div>

            {/* CTA SECTION WITH BUTTON */}
            <div
              className={`mt-16 text-center transition-all duration-700 delay-300 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
            >
              <div className="bg-gradient-to-r from-[#df4607] to-[#c93e05] rounded-2xl p-12 text-white">
                <h3 className="text-3xl font-bold mb-4">Ready to elevate your gifting experience?</h3>
                <p className="text-lg text-white/90 mb-8">
                  One requirement. One team. Complete execution.
                </p>
                <button
                  onClick={handleShareRequirement}
                  className="px-8 py-3 bg-white text-[#df4607] font-semibold rounded-lg hover:bg-gray-100 transition-all duration-300 hover:shadow-lg hover:scale-105"
                >
                  Share Your Requirement
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default About;