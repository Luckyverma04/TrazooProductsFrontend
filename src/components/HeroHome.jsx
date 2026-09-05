import { useEffect, useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

/* ============================================================
   IMPORT IMAGES
   ============================================================ */

const slideFiles = import.meta.glob("../assets/slides/optimized/*.webp", {
  eager: true,
  query: "?url",
  import: "default",
});

const getOptimizedSlide = (name) => {
  const get = (width) =>
    slideFiles[`../assets/slides/optimized/${name}-${width}.webp`];

  return {
    src: get(640),
    srcSet: `${get(320)} 320w, ${get(480)} 480w, ${get(640)} 640w`,
  };
};

/* ============================================================
   HERO PRODUCT DATA
   ============================================================ */

const AUTO_SLIDE_INTERVAL = 2600;

const products = [
  {
    title: "Apparel",
    subtitle: "Branded apparel curated for your teams",
    image: getOptimizedSlide("apparel"),
  },
  {
    title: "Bags",
    subtitle: "Smart bags designed around your brand",
    image: getOptimizedSlide("bags"),
  },
  {
    title: "Curated Kits",
    subtitle: "Mixed-range kits built to one brief",
    image: getOptimizedSlide("curated-kits"),
  },
  {
    title: "Drinkware",
    subtitle: "Everyday drinkware with your brand",
    image: getOptimizedSlide("drinkware"),
  },
  {
    title: "Gourmet",
    subtitle: "Thoughtful gourmet gifting for every occasion",
    image: getOptimizedSlide("gourmet"),
  },
  {
    title: "Stationery",
    subtitle: "Premium stationery made for work",
    image: getOptimizedSlide("stationery"),
  },
  {
    title: "Tech",
    subtitle: "Useful technology gifts with your identity",
    image: getOptimizedSlide("tech"),
  },
  {
    title: "Welcome Kits",
    subtitle: "Boxed sets, ready for day one",
    image: getOptimizedSlide("welcome-kits"),
  },
];

/* ============================================================
   HERO HOME
   ============================================================ */

export default function HeroHome({ onEnquireClick }) {
  const [activeIndex, setActiveIndex] = useState(2);
  const [isPaused, setIsPaused] = useState(false);

  /* ==========================================================
     AUTO SLIDER
     ========================================================== */

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % products.length);
    }, AUTO_SLIDE_INTERVAL);

    return () => clearInterval(interval);
  }, [isPaused]);

  /* ==========================================================
     PREVIOUS
     ========================================================== */

  const goPrevious = () => {
    setActiveIndex((current) =>
      current === 0 ? products.length - 1 : current - 1
    );
  };

  /* ==========================================================
     NEXT
     ========================================================== */

  const goNext = () => {
    setActiveIndex((current) => (current + 1) % products.length);
  };

  /* ==========================================================
     RELATIVE POSITION
     ========================================================== */

  const getRelativeIndex = (index) => {
    let relative = index - activeIndex;

    const half = Math.floor(products.length / 2);

    if (relative > half) {
      relative -= products.length;
    }

    if (relative < -half) {
      relative += products.length;
    }

    return relative;
  };

  return (
    <section className="relative overflow-hidden bg-[#FFFDF9] py-0">
      {/* ======================================================
          HERO CONTENT
      ====================================================== */}

      <div
        className="
          mx-auto
          w-full
          max-w-7xl
          px-5
          pb-3
          pt-0
          sm:px-6
          md:pb-4
          lg:px-6
          lg:pt-0
        "
      >
        <div
          className="
            grid
            items-center
            gap-4
            lg:grid-cols-[0.9fr_1.1fr]
            lg:gap-3
          "
        >
          {/* ==================================================
              LEFT CONTENT
          ================================================== */}

          <div
            className="
              relative
              z-40
              -ml-1
              w-full
              max-w-[760px]
              lg:-ml-2
            "
          >
            {/* CORPORATE GIFTING PARTNER */}

            <div className="mb-3 ml-5 mt-12 inline-flex items-center">
              <span
                className="
                  text-[12px]
                  font-bold
                  uppercase
                  tracking-[0.18em]
                  text-[#666]
                "
              >
                Corporate Gifting Partner
              </span>
            </div>

            {/* ==================================================
                MAIN HEADING
            ================================================== */}

            <h1
              className="
                m-0
                mt-1
                ml-5
                p-0
                font-serif
                text-[38px]
                font-normal
                leading-[0.92]
                tracking-[-0.035em]
                text-[#111]
                sm:text-[48px]
                md:text-[56px]
                lg:text-[60px]
              "
              style={{
                fontFamily: "'Fraunces', Georgia, 'Times New Roman', serif",
              }}
            >
              <span className="block whitespace-nowrap">
                We run the gifting.
              </span>

              <span
                className="mt-2 block whitespace-nowrap text-[#B84D0D]"
                style={{
                  fontStyle: "italic",
                  fontFamily:
                    "'Fraunces', Georgia, 'Times New Roman', serif",
                  fontWeight: 300,
                }}
              >
                You take the credit.
              </span>
            </h1>

            {/* ==================================================
                DESCRIPTION
            ================================================== */}

            <p
              className="
                mt-6
                max-w-[600px]
                text-[15px]
                font-semibold
                leading-[1.45]
                text-[#707070]
                sm:text-[16px]
              "
            >
              From one brief to thousands of deliveries, Trazoo curates,
              <br />
              brands and executes corporate gifting across India.
            </p>

            {/* ==================================================
                CTA
            ================================================== */}

            <div className="mt-7 flex flex-wrap items-center gap-4">
              {/* PRIMARY BUTTON */}

              <button
                type="button"
                onClick={onEnquireClick}
                className="
                  group
                  inline-flex
                  h-[58px]
                  items-center
                  gap-3
                  rounded-[18px]
                  bg-[#B84D0D]
                  px-10
                  text-[16px]
                  font-bold
                  text-white
                  transition-[background-color,box-shadow]
                  duration-300
                  hover:bg-[#df5f16]
                  hover:shadow-lg
                "
              >
                Request a Proposal

                <ArrowRight
                  size={20}
                  strokeWidth={2}
                  className="
                    transition-transform
                    duration-300
                    group-hover:translate-x-1
                  "
                />
              </button>

              {/* SECONDARY BUTTON */}

              <button
                type="button"
                onClick={() => {
                  const element = document.getElementById("process");

                  if (element) {
                    element.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
                  }
                }}
                className="
                  hidden
                  h-[58px]
                  items-center
                  rounded-full
                  border
                  border-[#D9D9D9]
                  bg-white
                  px-8
                  text-[16px]
                  font-semibold
                  text-[#222]
                  transition-[width,background-color]
                  duration-300
                  hover:border-[#F36F21]
                  hover:text-[#B84D0D]
                  lg:inline-flex
                "
              >
                How we work
              </button>
            </div>

            {/* ==================================================
                STATS
            ================================================== */}

            <div
              className="
                mt-7
                flex
                flex-wrap
                items-center
                gap-x-5
                gap-y-2
                text-[14px]
                text-[#666]
              "
            >
              <div className="whitespace-nowrap">
                <span className="font-bold text-[#B84D0D]">
                  30,000+
                </span>{" "}
                kits shipped
              </div>

              <span className="h-5 w-px bg-[#D8D8D8]" />

              <div className="whitespace-nowrap">
                <span className="font-bold text-[#B84D0D]">
                  12,000+
                </span>{" "}
                PIN codes reached
              </div>

              <span className="h-5 w-px bg-[#D8D8D8]" />

              <div className="whitespace-nowrap">
                <span className="font-bold text-[#B84D0D]">
                  12+
                </span>{" "}
                enterprise clients
              </div>
            </div>
          </div>

          {/* ==================================================
              RIGHT PRODUCT CAROUSEL
          ================================================== */}

          <div
            className="
              relative
              z-20
              h-[300px]
              w-full
              sm:h-[340px]
              lg:h-[380px]
            "
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* =================================================
                SOFT BACKGROUND GLOW
            ================================================= */}

            <div
              className="
                pointer-events-none
                absolute
                left-1/2
                top-1/2
                h-[200px]
                w-[200px]
                -translate-x-1/2
                -translate-y-1/2
                rounded-full
                bg-[#B84D0D]/10
                blur-3xl
              "
            />

            {/* =================================================
                PRODUCT CARDS
            ================================================= */}

            <div className="absolute inset-0">
              {products.map((product, index) => {
                const relative = getRelativeIndex(index);

                if (Math.abs(relative) > 2) {
                  return null;
                }

                const isActive = relative === 0;

                let transform = "";
                let opacity = 1;
                let zIndex = 20;

                /* CENTER */

                if (relative === 0) {
                  transform =
                    "translateX(-50%) translateY(-50%) translateX(0px) translateY(0px) scale(1)";
                  opacity = 1;
                  zIndex = 30;
                }

                /* LEFT */

                else if (relative === -1) {
                  transform =
                    "translateX(-50%) translateY(-50%) translateX(-140px) translateY(15px) scale(0.78)";
                  opacity = 0.5;
                  zIndex = 20;
                }

                /* RIGHT */

                else if (relative === 1) {
                  transform =
                    "translateX(-50%) translateY(-50%) translateX(140px) translateY(15px) scale(0.78)";
                  opacity = 0.5;
                  zIndex = 20;
                }

                /* FAR LEFT */

                else if (relative === -2) {
                  transform =
                    "translateX(-50%) translateY(-50%) translateX(-240px) translateY(35px) scale(0.62)";
                  opacity = 0.2;
                  zIndex = 10;
                }

                /* FAR RIGHT */

                else {
                  transform =
                    "translateX(-50%) translateY(-50%) translateX(240px) translateY(35px) scale(0.62)";
                  opacity = 0.2;
                  zIndex = 10;
                }

                return (
                  <div
                    key={`${product.title}-${index}`}
                    onClick={() => setActiveIndex(index)}
                    className={`
                      absolute
                      left-1/2
                      top-1/2
                      w-[180px]
                      cursor-pointer
                      overflow-hidden
                      rounded-[16px]
                      border
                      border-[#E8E8E8]
                      bg-white
                      shadow-[0_12px_30px_rgba(0,0,0,0.06)]
                      transition-all
                      duration-700
                      ease-out
                      sm:w-[220px]
                      md:w-[260px]
                      ${
                        isActive
                          ? "shadow-[0_20px_50px_rgba(0,0,0,0.1)]"
                          : ""
                      }
                    `}
                    style={{
                      transform,
                      opacity,
                      zIndex,
                    }}
                  >
                    {/* IMAGE */}

                    <div className="relative aspect-[1/0.88] overflow-hidden bg-[#F6F5F1]">
                      <img
                        src={product.image.src}
                        srcSet={product.image.srcSet}
                        sizes="(max-width: 640px) 180px, (max-width: 768px) 220px, 260px"
                        alt={product.title}
                        className="
                          h-full
                          w-full
                          object-cover
                          transition-transform
                          duration-700
                        "
                        loading={isActive ? "eager" : "lazy"}
                        fetchPriority={isActive ? "high" : "low"}
                        decoding="async"
                        width="260"
                        height="229"
                        draggable="false"
                      />

                      {/* NUMBER */}

                      {isActive && (
                        <div
                          className="
                            absolute
                            right-2
                            top-2
                            flex
                            h-7
                            w-7
                            items-center
                            justify-center
                            rounded-full
                            bg-white
                            text-[10px]
                            font-bold
                            text-[#B84D0D]
                            shadow-sm
                          "
                        >
                          {String(index + 1).padStart(2, "0")}
                        </div>
                      )}
                    </div>

                    {/* ACTIVE CARD CONTENT */}

                    {isActive && (
                      <div className="px-3 pb-3 pt-2">
                        <div className="mb-2 h-px w-full bg-[#E7E7E7]" />

                        <h2 className="text-[13px] font-bold text-[#222]">
                          {product.title}
                        </h2>

                        <p className="mt-0.5 text-[10px] leading-4 text-[#666]">
                          {product.subtitle}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* =================================================
                CAROUSEL ARROWS
            ================================================= */}

            <button
              type="button"
              onClick={goPrevious}
              aria-label="Previous product"
              className="
                absolute
                left-1
                top-1/2
                z-40
                flex
                h-11
                w-11
                -translate-y-1/2
                items-center
                justify-center
                rounded-full
                border
                border-[#E2E2E2]
                bg-white
                text-[#222]
                shadow-sm
                transition-[border-color,color,box-shadow]
                duration-300
                hover:border-[#F36F21]
                hover:text-[#B84D0D]
                hover:shadow-md
              "
            >
              <ChevronLeft size={18} aria-hidden="true" />
            </button>

            <button
              type="button"
              onClick={goNext}
              aria-label="Next product"
              className="
                absolute
                right-1
                top-1/2
                z-40
                flex
                h-11
                w-11
                -translate-y-1/2
                items-center
                justify-center
                rounded-full
                border
                border-[#E2E2E2]
                bg-white
                text-[#222]
                shadow-sm
                transition-[border-color,color,box-shadow]
                duration-300
                hover:border-[#F36F21]
                hover:text-[#B84D0D]
                hover:shadow-md
              "
            >
              <ChevronRight size={18} aria-hidden="true" />
            </button>

            {/* =================================================
                DOTS
            ================================================= */}

            <div
              className="
                absolute
                bottom-2
                left-1/2
                z-40
                flex
                -translate-x-1/2
                items-center
                gap-1.5
              "
            >
              {products.map((product, index) => (
                <button
                  key={product.title}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  aria-label={`Go to ${product.title}`}
                  className="
                    flex
                    h-11
                    w-11
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    p-0
                  "
                >
                  <span
                    aria-hidden="true"
                    className={`
                      block
                      h-1
                      rounded-full
                      transition-[width,background-color]
                      duration-300
                      ${
                        index === activeIndex
                          ? "w-5 bg-[#B84D0D]"
                          : "w-1 bg-[#888888]"
                      }
                    `}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ======================================================
          MARQUEE SECTION
      ====================================================== */}

      <div className="relative overflow-hidden border-t border-[#ECECEC] bg-[#FFFDF9]">
        <style>{`
          @keyframes marquee {
            0% {
              transform: translateX(0);
            }

            100% {
              transform: translateX(-50%);
            }
          }

          .tz-marquee__track {
            display: flex;
            width: max-content;
            align-items: center;
            gap: 2rem;
            animation: marquee 40s linear infinite;
            will-change: transform;
          }

          .tz-marquee:hover .tz-marquee__track {
            animation-play-state: paused;
          }

          @media (prefers-reduced-motion: reduce) {
            .tz-marquee__track {
              animation: none;
              transform: none;
            }
          }

          .tz-marquee__item {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            white-space: nowrap;
            font-size: 13px;
            font-weight: 600;
            color: #555555;
            text-transform: uppercase;
            letter-spacing: 0.08em;
            flex-shrink: 0;
          }

          .tz-marquee__item i {
            display: inline-block;
            height: 6px;
            width: 6px;
            flex-shrink: 0;
            border-radius: 50%;
            background-color: #F36F21;
          }
        `}</style>

        <div className="tz-marquee overflow-hidden px-5 py-2 sm:px-6 lg:px-6">
          <div className="tz-marquee__track" id="tzMarquee">
            {/* ==================================================
                FIRST SET
            ================================================== */}

            <span className="tz-marquee__item">
              <i></i>
              Employee onboarding kits
            </span>

            <span className="tz-marquee__item">
              <i></i>
              Festive gifting programmes
            </span>

            <span className="tz-marquee__item">
              <i></i>
              Rewards &amp; recognition
            </span>

            <span className="tz-marquee__item">
              <i></i>
              Event &amp; conference merchandise
            </span>

            <span className="tz-marquee__item">
              <i></i>
              Client &amp; partner gifting
            </span>

            <span className="tz-marquee__item">
              <i></i>
              Institutional programmes
            </span>

            {/* ==================================================
                DUPLICATE SET FOR SEAMLESS LOOP
            ================================================== */}

            <span
              className="tz-marquee__item"
              aria-hidden="true"
            >
              <i></i>
              Employee onboarding kits
            </span>

            <span
              className="tz-marquee__item"
              aria-hidden="true"
            >
              <i></i>
              Festive gifting programmes
            </span>

            <span
              className="tz-marquee__item"
              aria-hidden="true"
            >
              <i></i>
              Rewards &amp; recognition
            </span>

            <span
              className="tz-marquee__item"
              aria-hidden="true"
            >
              <i></i>
              Event &amp; conference merchandise
            </span>

            <span
              className="tz-marquee__item"
              aria-hidden="true"
            >
              <i></i>
              Client &amp; partner gifting
            </span>

            <span
              className="tz-marquee__item"
              aria-hidden="true"
            >
              <i></i>
              Institutional programmes
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}