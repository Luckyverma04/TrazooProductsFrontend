import { useState, useEffect, useRef } from "react";
import { Heart, Gift, Users, ShieldCheck } from "lucide-react";

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

  const highlights = [
    {
      icon: Users,
      title: "Employee First",
      description: "Creating memorable first impressions",
    },
    {
      icon: Gift,
      title: "Fully Custom",
      description: "Tailored to your brand identity",
    },
    {
      icon: ShieldCheck,
      title: "Premium Quality",
      description: "Utility meets aesthetics",
    },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-20 px-6 overflow-hidden bg-[#0B1220]"
    >
      {/* Same fine-grid texture as Hero/Products for continuity — no blobs */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <div
            className={`inline-flex items-center gap-2 mb-5 px-3 py-1.5 rounded-md border border-white/10 bg-white/[0.03] transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#df4607]" />
            <span className="text-xs font-medium tracking-wide text-white/70 uppercase">
              Why Trazoo
            </span>
          </div>

          <h2
            className={`text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight leading-tight transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <span className="text-white">Onboarding that feels</span>{" "}
            <span className="text-[#df4607]">personal, not generic</span>
          </h2>
        </div>

        {/* CONTENT CARDS */}
        <div className="grid md:grid-cols-2 gap-6">
          <div
            className={`bg-white/[0.03] backdrop-blur rounded-xl p-8 border border-white/10 transition-all duration-500 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center mb-6">
              <Heart className="w-6 h-6 text-[#df4607]" />
            </div>
            <p className="text-base text-white/70 leading-relaxed">
              At TRAZOO, we understand that the first day sets the tone for the
              entire journey. Our welcome & joining kits are curated to make new
              employees and learners feel valued, welcomed and proud to be part
              of your organisation.
            </p>
          </div>

          <div
            className={`bg-white/[0.03] backdrop-blur rounded-xl p-8 border border-white/10 transition-all duration-500 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center mb-6">
              <Gift className="w-6 h-6 text-[#df4607]" />
            </div>
            <p className="text-base text-white/70 leading-relaxed">
              Every kit is designed to balance utility, aesthetics and brand
              storytelling – so the gifts are not just "things in a box", but a
              memorable experience that represents who you are as a brand.
            </p>
          </div>
        </div>

        {/* FEATURE HIGHLIGHTS */}
        <div
          className={`mt-6 grid grid-cols-1 md:grid-cols-3 gap-6 transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          {highlights.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="bg-white/[0.03] backdrop-blur rounded-xl p-6 border border-white/10 text-center"
            >
              <div className="w-11 h-11 bg-white/5 border border-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon className="w-5 h-5 text-[#df4607]" />
              </div>
              <h4 className="font-semibold text-white mb-1.5">{title}</h4>
              <p className="text-sm text-white/60">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;