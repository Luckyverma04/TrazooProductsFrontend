import { useState, useEffect, useRef } from "react";
import {
  Star,
  Brush,
  Package,
  Award,
  TrendingUp,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

// Real product images (same assets used in ProductRange)
import firstImg from "../assets/First.png";
import secondImg from "../assets/Second.png";
import thirdImg from "../assets/Third.png";
import fourthImg from "../assets/Bottles.png";
import fifthImg from "../assets/BagsandNotebooks.png";

const ValueProposition = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [active, setActive] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const sectionRef = useRef(null);

  const values = [
    {
      icon: Star,
      image: secondImg,
      title: "Memorable First Impressions",
      desc: "Emotion-driven onboarding kits that make day one unforgettable for every new joiner.",
    },
    {
      icon: Brush,
      image: thirdImg,
      title: "Fully Customised",
      desc: "Every touchpoint reflects your brand identity — colours, logo, tone and audience.",
    },
    {
      icon: Package,
      image: fifthImg,
      title: "End-to-End Execution",
      desc: "From sourcing and printing to packing and delivery, we handle everything.",
    },
    {
      icon: Award,
      image: fourthImg,
      title: "Quality You Can Trust",
      desc: "Strict quality checks on every product, print and package before it ships.",
    },
    {
      icon: TrendingUp,
      image: firstImg,
      title: "Flexible & Scalable",
      desc: "From 50 kits to 5000 kits — we scale with your organisation's needs.",
    },
  ];

  // reveal on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setIsVisible(true),
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // AUTO-SLIDE: advances one card every 4s, pauses only while hovering
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % values.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [isPaused, values.length]);

  const goPrev = () =>
    setActive((prev) => (prev - 1 + values.length) % values.length);
  const goNext = () => setActive((prev) => (prev + 1) % values.length);

  return (
    <section
      id="why-trazoo"
      ref={sectionRef}
      className="relative py-20 px-6 bg-[#0B1220] overflow-hidden"
    >
      {/* Fine-grid texture for continuity with Hero/About */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      {/* Subtle orange glow */}
      <div
        className="absolute -bottom-40 -right-40 w-[560px] h-[560px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(223,70,7,0.12) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Eyebrow + heading */}
        <div className="text-center">
          <div
            className={`inline-flex items-center gap-2 mb-5 px-3 py-1.5 rounded-md border border-white/10 bg-white/[0.03] transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#df4607]" />
            <span className="text-xs font-medium tracking-wide text-white/70 uppercase">
              Why Choose Us
            </span>
          </div>

          <h2
            className={`text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight mb-12 transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <span className="text-white">Why Choose</span>{" "}
            <span className="text-[#df4607]">TRAZOO</span>
          </h2>
        </div>

        {/* ===== AUTO SLIDER — big image + content cards ===== */}
        <div
          className={`relative max-w-4xl mx-auto transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* sliding window */}
          <div className="overflow-hidden rounded-2xl border border-white/10 shadow-2xl shadow-black/40">
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${active * 100}%)` }}
            >
              {values.map((v, i) => {
                const Icon = v.icon;
                return (
                  <div key={i} className="w-full flex-shrink-0">
                    <div className="grid md:grid-cols-2 bg-[#0F1728] min-h-[380px]">
                      {/* LEFT: full-bleed product image */}
                      <div className="relative h-56 md:h-auto overflow-hidden">
                        <img
                          src={v.image}
                          alt={v.title}
                          loading="lazy"
                          decoding="async"
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                        {/* blend the image into the card on the right edge */}
                        <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#0F1728] via-transparent to-transparent" />
                      </div>

                      {/* RIGHT: content with BIG icon */}
                      <div className="flex flex-col justify-center p-8 md:p-12">
                        <div className="w-20 h-20 rounded-2xl bg-[#df4607]/10 border border-[#df4607]/25 flex items-center justify-center mb-7">
                          <Icon className="w-10 h-10 text-[#df4607]" />
                        </div>
                        <h3 className="text-2xl md:text-3xl font-semibold text-white mb-4 leading-tight">
                          {v.title}
                        </h3>
                        <p className="text-white/60 text-base md:text-lg leading-relaxed">
                          {v.desc}
                        </p>

                        {/* slide counter — enterprise touch */}
                        <div className="mt-8 flex items-center gap-3">
                          <span className="text-sm font-semibold text-[#df4607]">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <span className="h-px w-10 bg-white/15" />
                          <span className="text-sm text-white/40">
                            {String(values.length).padStart(2, "0")}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* prev / next arrows */}
          <button
            onClick={goPrev}
            aria-label="Previous"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 sm:-translate-x-14 w-11 h-11 rounded-full border border-white/15 bg-[#0B1220]/80 backdrop-blur flex items-center justify-center text-white/70 hover:text-white hover:border-[#df4607]/50 transition-colors duration-200"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={goNext}
            aria-label="Next"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 sm:translate-x-14 w-11 h-11 rounded-full border border-white/15 bg-[#0B1220]/80 backdrop-blur flex items-center justify-center text-white/70 hover:text-white hover:border-[#df4607]/50 transition-colors duration-200"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* dots */}
          <div className="flex justify-center gap-2.5 mt-8">
            {values.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  active === i
                    ? "w-8 bg-[#df4607]"
                    : "w-2 bg-white/20 hover:bg-white/40"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ValueProposition;