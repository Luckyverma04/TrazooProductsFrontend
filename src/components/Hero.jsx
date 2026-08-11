import { useSEO } from "../hooks/useSEO"; 
import { seoMetadata } from "../utils/seo";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import heroVideo from "../assets/kling_20260729_VIDEO_Create_an__5433_0.mp4";

const Hero = () => {
    useSEO(seoMetadata.solutions);
  const [isVisible, setIsVisible] = useState(false);
  const videoRef = useRef(null);
  const playedThisVisitRef = useRef(false);

  const navigate = useNavigate();

  // ===== VISIBILITY =====
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // ===== VIDEO LOGIC =====
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!playedThisVisitRef.current) {
            playedThisVisitRef.current = true;

            video.currentTime = 0;

            video.play().catch(() => {});
          }
        } else {
          video.pause();
          playedThisVisitRef.current = false;
        }
      },
      { threshold: 0.35 }
    );

    observer.observe(video);

    return () => observer.disconnect();
  }, []);

  // ===== NAVIGATION =====

  const goToRequirements = () => {
    navigate("/requirements");
  };

  const goToProducts = () => {
    navigate("/products");
  };

  return (
    <section
      id="hero"
      className="min-h-screen bg-[#FFFDF9] pt-28 pb-20 px-6 flex items-center"
    >
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* ---------- LEFT: TEXT ---------- */}
          <div
            className={`transition-all duration-700 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#111111] leading-tight">
              Corporate gifting.
              <br />
              Without the vendor chaos.
            </h1>

            <p className="text-lg text-[#4A4644] leading-relaxed max-w-xl mt-6 mb-10">
              From customised merchandise to thousands of individually packed
              gifts across India, Trazoo handles sourcing, branding, quality
              checks, packaging and delivery through one team.
            </p>

            {/* CTA BUTTONS */}
            <div className="flex flex-wrap gap-4">

              {/* SHARE YOUR REQUIREMENT */}
              <button
                onClick={goToRequirements}
                className="px-8 py-4 bg-[#DF4607] text-white text-sm md:text-base font-semibold rounded-lg hover:bg-[#C93E05] transition-colors"
              >
                Share Your Requirement
              </button>

              {/* EXPLORE PRODUCTS */}
              <button
                onClick={goToProducts}
                className="px-8 py-4 bg-transparent text-[#111111] text-sm md:text-base font-semibold rounded-lg border border-[#111111] hover:bg-[#111111] hover:text-white transition-colors"
              >
                Explore Products
              </button>

            </div>
          </div>

          {/* ---------- RIGHT: VIDEO CARD ---------- */}
          <div
            className={`transition-all duration-700 delay-150 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
          >
            <div className="rounded-2xl bg-[#F7F2EC] border border-[#DED8D2] p-5">
              <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-white">
                <video
                  ref={videoRef}
                  muted
                  playsInline
                  preload="metadata"
                  className="w-full h-full object-cover"
                >
                  <source
                    src={heroVideo}
                    type="video/mp4"
                  />

                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;