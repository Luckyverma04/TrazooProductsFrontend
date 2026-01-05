import { Star, Brush, Package, Award, TrendingUp } from "lucide-react";
import { useEffect, useRef } from "react";

const ValueProposition = () => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    const observer = new IntersectionObserver(
      ([e]) => e.isIntersecting && el.classList.add("show"),
      { threshold: 0.15 }
    );
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const values = [
    { icon: Star, title: "Memorable First Impressions", desc: "Emotion-driven onboarding kits." },
    { icon: Brush, title: "Fully Customised", desc: "Every touchpoint reflects your brand." },
    { icon: Package, title: "End-to-End Execution", desc: "From sourcing to delivery." },
    { icon: Award, title: "Quality You Can Trust", desc: "Strict quality checks." },
    { icon: TrendingUp, title: "Flexible & Scalable", desc: "50 to 5000 kits." },
  ];

  return (
    <section id="why-trazoo" ref={ref} className="reveal py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">
          Why Choose <span className="text-[#df4607]">TRAZOO</span>
        </h2>

        <div className="space-y-8">
          {values.map((v, i) => {
            const Icon = v.icon;
            return (
              <div
                key={i}
                className="card flex gap-6"
                style={{ transitionDelay: `${i * 120}ms` }}
              >
                <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
                  <Icon className="w-6 h-6 text-[#df4607]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-1">{v.title}</h3>
                  <p className="text-gray-700">{v.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ValueProposition;
