import { useEffect, useRef, useState } from "react";
import {
  ClipboardList,
  Tag,
  Pencil,
  Package,
  CheckCircle2,
  Truck,
  ArrowRight,
} from "lucide-react";

// ============================================================
// GALLERY IMAGES
// ============================================================

const galleryFiles = import.meta.glob(
  "../assets/gallery/optimized/*.webp",
  {
    eager: true,
    query: "?url",
    import: "default",
  }
);

const imageNames = [
  "Gallery-30.jpeg",
  "Gallery-16.jpeg",
  "Gallery-18.jpeg",
  "Gallery-29.jpeg",
  "Gallery-12.jpeg",
  "Gallery-27.jpeg",
  "Gallery-7.jpeg",
  "Gallery-26.jpeg",
  "Gallery-19.jpeg",
  "Gallery-28.jpeg",
  "Gallery-15.jpeg",
  "Gallery-11.jpeg",
  "Gallery-24.jpeg",
  "Gallery-1.jpeg",
  "Gallery-4.jpeg",
  "Gallery-6.jpeg",
  "Gallery-9.jpeg",
  "Gallery-23.jpeg",
  "Gallery-21.jpeg",
  "Gallery-14.jpeg",
  "Gallery-3.jpeg",
  "Gallery-22.jpeg",
  "Gallery-31.jpeg",
  "Gallery-13.jpeg",
  "Gallery-2.jpeg",
  "Gallery-8.jpeg",
  "Gallery-5.jpeg",
  "Gallery-10.jpeg",
  "Gallery-20.jpeg",
  "Gallery-25.jpeg",
  "Gallery-17.jpeg",
];

const getOptimizedImage = (fileName) => {
const baseName = fileName.replace(/\.(jpeg|jpg|png|webp)$/i, "");
  const findUrl = (width) => {
    const key = Object.keys(galleryFiles).find(
      (path) => path.endsWith(`/${baseName}-${width}.webp`)
    );
    return key ? galleryFiles[key] : null;
  };

  const url320 = findUrl(320);
  const url480 = findUrl(480);
  const url640 = findUrl(640);

  return {
    src: url640,
    srcSet: [
      url320 && `${url320} 320w`,
      url480 && `${url480} 480w`,
      url640 && `${url640} 640w`,
    ]
      .filter(Boolean)
      .join(", "),
  };
};

// ============================================================
// HOW WE WORK DATA
// ============================================================

const workSteps = [
  {
    number: "01",
    title: "Understand",
    description:
      "Your audience, use-case, quantity and purpose.",
    icon: ClipboardList,
  },
  {
    number: "02",
    title: "Curate",
    description:
      "Options shortlisted against your brief.",
    icon: Tag,
  },
  {
    number: "03",
    title: "Customise",
    description:
      "Artwork, branding and samples approved.",
    icon: Pencil,
  },
  {
    number: "04",
    title: "Execute",
    description:
      "Approved products move into production.",
    icon: Package,
  },
  {
    number: "05",
    title: "QC & Pack",
    description:
      "Inspected, matched and packed.",
    icon: CheckCircle2,
  },
  {
    number: "06",
    title: "Deliver",
    description:
      "Tracked delivery to your destination.",
    icon: Truck,
  },
];

// ============================================================
// COMPONENT
// ============================================================

const Gallery = ({ onEnquireClick }) => {
  const scrollRef = useRef(null);

  const galleryImages = imageNames
    .map((name) => {
      const optimized = getOptimizedImage(name);

      return {
        name,
        src: optimized.src,
        srcSet: optimized.srcSet,
      };
    })
    .filter((image) => image.src);

  // ============================================================
  // STEP ACTIVATION — EXACT CLIENT SEQUENCE
  // 01 → 02 → 03 → 04 → 03 → 05 → 06 → repeat
  // ============================================================

  const stepSequence = [0, 1, 2, 3, 2, 4, 5];

  const [sequenceIndex, setSequenceIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSequenceIndex((prev) => (prev + 1) % stepSequence.length);
    }, 900);

    return () => clearInterval(interval);
  }, []);

  const activeStep = stepSequence[sequenceIndex];

  // ============================================================
  // AUTO SCROLL GALLERY
  // ============================================================

  useEffect(() => {
    const container = scrollRef.current;

    if (!container) return;

    let animationId;
    let isPaused = false;

    // Faster but still smooth
    const speed = 1.15;

    const animate = () => {
      if (!isPaused) {
        container.scrollLeft += speed;

        if (container.scrollLeft >= container.scrollWidth / 2) {
          container.scrollLeft = 0;
        }
      }

      animationId = requestAnimationFrame(animate);
    };

    const handleMouseEnter = () => {
      isPaused = true;
    };

    const handleMouseLeave = () => {
      isPaused = false;
    };

    container.addEventListener("mouseenter", handleMouseEnter);
    container.addEventListener("mouseleave", handleMouseLeave);

    animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
      container.removeEventListener("mouseenter", handleMouseEnter);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <section className="w-full overflow-hidden bg-[#FAFAF8]">

      {/* ======================================================
          ENQUIRE CTA — ABOVE HOW WE WORK
      ====================================================== */}

      <section
        id="enquire"
        className="
          relative
          w-full
          overflow-hidden
          bg-[#B95816]
        "
      >
        {/* Subtle leather/warm texture */}
        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            inset-0
            opacity-30
            bg-[radial-gradient(circle_at_20%_30%,rgba(255,255,255,0.12),transparent_28%),radial-gradient(circle_at_75%_60%,rgba(80,25,0,0.16),transparent_35%),linear-gradient(110deg,#C9681E,#A94B0D,#C15D13)]
          "
        />

        <div
          className="
            relative
            mx-auto
            flex
            min-h-[190px]
            w-full
            max-w-[1400px]
            items-center
            justify-between
            gap-8
            px-6
            py-8
            sm:px-8
            md:min-h-[210px]
            md:px-12
            lg:px-14
            xl:px-16
          "
        >
          {/* LEFT CONTENT */}
          <div className="max-w-[620px]">

            <h2
              className="
                font-serif
                text-[24px]
                font-medium
                leading-[1.12]
                tracking-[-0.02em]
                text-white
                sm:text-[27px]
                md:text-[30px]
                lg:text-[32px]
              "
              style={{
                fontFamily:
                  "'Fraunces', Georgia, 'Times New Roman', serif",
              }}
            >
              Give us the requirement.
              <br />
              <em className="font-normal italic">
                We handle the rest.
              </em>
            </h2>

            <p
              className="
                mt-3
                max-w-[600px]
                text-[12px]
                leading-[1.55]
                text-white/80
                sm:text-[13px]
                md:text-[14px]
              "
            >
              Share quantity, budget, audience and timeline.
              We come back with a curated shortlist and a
              committed delivery plan.
            </p>
          </div>

          {/* CTA BUTTON */}
          <button
            type="button"
            onClick={onEnquireClick}
            className="
              group
              hidden
              shrink-0
              items-center
              gap-4
              rounded-[13px]
              bg-white
              px-7
              py-4
              text-[15px]
              font-semibold
              text-[#171717]
              shadow-[0_8px_25px_rgba(0,0,0,0.10)]
              transition-all
              duration-300
              hover:-translate-y-0.5
              hover:shadow-[0_12px_30px_rgba(0,0,0,0.16)]
              md:inline-flex
            "
          >
            Request a Proposal

            <ArrowRight
              size={18}
              strokeWidth={1.7}
              className="
                transition-transform
                duration-300
                group-hover:translate-x-1
              "
            />
          </button>

          {/* MOBILE BUTTON */}
          <button
            type="button"
            onClick={onEnquireClick}
            className="
              inline-flex
              shrink-0
              items-center
              gap-2
              rounded-[10px]
              bg-white
              px-4
              py-3
              text-[12px]
              font-semibold
              text-[#171717]
              md:hidden
            "
          >
            Proposal
            <ArrowRight size={15} aria-hidden="true" />
          </button>
        </div>
      </section>

      {/* ======================================================
          HOW WE WORK
      ====================================================== */}

      <section
        id="how-we-work"
        aria-labelledby="how-we-work-title"
        className="
          bg-[#FAFAF8]
          py-16
          md:py-20
        "
      >
        <div className="mx-auto w-full max-w-6xl px-6">

          {/* HEADING */}
          <div className="mb-12 max-w-[700px] md:mb-14">

            <p
              className="
                mb-3
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.25em]
                text-[#777]
                md:text-[11px]
              "
            >
              How we work
            </p>

            <h2
              className="
                font-serif
                text-[34px]
                leading-[1.05]
                tracking-[-0.025em]
                text-[#111]
                sm:text-[40px]
                md:text-[46px]
              "
              style={{
                fontFamily:
                  "'Fraunces', Georgia, 'Times New Roman', serif",
              }}
            >
              From brief to{" "}
              <em className="italic text-[#B84D0D]">
                doorstep.
              </em>
            </h2>

            <p
              className="
                mt-4
                max-w-[650px]
                text-[13px]
                leading-[1.6]
                text-[#666]
                md:text-[15px]
              "
            >
              One team owns every step, with clear visibility
              from brief to final delivery.
            </p>
          </div>

          {/* ==================================================
              STEPS
          ================================================== */}

          <div className="relative">

            {/* CONNECTING LINE - THICKER */}
            <div
              className="
                pointer-events-none
                absolute
                left-[7%]
                right-[7%]
                top-[77px]
                hidden
                h-1
                bg-[#B84D0D]/20
                md:block
              "
            >
              <div
                className="
                  h-full
                  origin-left
                  bg-[#B84D0D]
                "
                style={{
                  animation:
                    "travelLine 2s ease-in-out infinite",
                }}
              />
            </div>

            <div className="grid grid-cols-2 gap-x-5 gap-y-9 md:grid-cols-6 md:gap-x-4">

              {workSteps.map((step, index) => {
                const Icon = step.icon;
                const isActive = activeStep === index;

                return (
                  <div
                    key={step.number}
                    className="
                      relative
                      flex
                      flex-col
                      items-center
                      text-center
                    "
                  >

                    {/* NUMBER */}
                    <span
                      className={`
                        mb-3
                        font-serif
                        text-[13px]
                        tracking-wide
                        transition-colors
                        duration-500
                        md:text-[15px]
                        ${
                          isActive
                            ? "text-[#B84D0D]"
                            : "text-[#777]"
                        }
                      `}
                    >
                      {step.number}
                    </span>

                    {/* ICON CIRCLE */}
                    <div
                      style={{
                        backgroundColor: isActive ? "#F36F21" : "#FFFFFF",
                        borderColor: isActive ? "#F36F21" : "rgba(243, 111, 33, 0.3)",
                        transform: isActive ? "scale(1.05)" : "scale(1)",
                        boxShadow: isActive ? "0 10px 28px rgba(243, 111, 33, 0.3)" : "none",
                      }}
                      className={`
                        relative
                        z-10
                        flex
                        h-[76px]
                        w-[76px]
                        items-center
                        justify-center
                        rounded-full
                        border-[2.5px]
                        transition-all
                        duration-500
                        md:h-[86px]
                        md:w-[86px]
                      `}
                    >
                      <Icon
                        size={28}
                        strokeWidth={1.8}
                        className="md:h-[32px] md:w-[32px]"
                        color={isActive ? "#FFFFFF" : "#F36F21"}
                        stroke={isActive ? "#FFFFFF" : "#F36F21"}
                      />
                    </div>

                    {/* TITLE */}
                    <h3
                      className="
                        mt-5
                        text-[14px]
                        font-semibold
                        leading-[1.2]
                        text-[#222]
                        md:text-[16px]
                      "
                    >
                      {step.title}
                    </h3>

                    {/* SMALL ORANGE UNDERLINE */}
                    {isActive && (
                      <span
                        className="
                          mt-4
                          h-[3px]
                          w-[40px]
                          bg-[#B84D0D]
                          rounded-full
                        "
                      />
                    )}

                    {!isActive && (
                      <span
                        className="
                          mt-4
                          h-[2px]
                          w-[32px]
                          bg-[#E8E8E8]
                        "
                      />
                    )}

                    {/* DESCRIPTION */}
                    <p
                      className="
                        mt-3
                        max-w-[145px]
                        text-[10px]
                        leading-[1.5]
                        text-[#666]
                        md:text-[12px]
                      "
                    >
                      {step.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* LINE ANIMATION */}
        <style>{`
          @keyframes travelLine {
            0% {
              width: 0%;
            }

            50% {
              width: 100%;
            }

            100% {
              width: 0%;
            }
          }
        `}</style>
      </section>

      {/* ======================================================
          GALLERY
      ====================================================== */}

      <section
        id="gallery"
        className="
          overflow-hidden
          bg-[#FAFAF8]
          pb-14
          md:pb-18
        "
      >

        {/* GALLERY HEADING */}
        <div
          className="
            mx-auto
            mb-8
            max-w-7xl
            px-6
            md:px-10
            lg:px-14
            xl:px-20
          "
        >
          <p
            className="
              mb-2
              text-[10px]
              font-semibold
              uppercase
              tracking-[0.25em]
              text-[#777]
            "
          >
            Gallery
          </p>

          <h2
            id="how-we-work-title"
            className="
              font-serif
              text-[30px]
              leading-tight
              tracking-[-0.02em]
              text-[#111]
              md:text-[38px]
            "
            style={{
              fontFamily:
                "'Fraunces', Georgia, 'Times New Roman', serif",
            }}
          >
            Work we have{" "}
            <em className="italic text-[#B84D0D]">
              shipped.
            </em>
          </h2>
        </div>

        {/* IMAGE STRIP */}
        <div className="relative">

          <div
            ref={scrollRef}
            className="
              flex
              gap-2
              overflow-x-auto
              px-0
              scrollbar-hide
              md:gap-3
            "
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {[...galleryImages, ...galleryImages].map(
              (image, index) => (
                <div
                  key={`${image.name}-${index}`}
                  className="
                    h-[180px]
                    w-[230px]
                    flex-shrink-0
                    overflow-hidden
                    rounded-[6px]
                    bg-white
                    sm:h-[200px]
                    sm:w-[260px]
                    md:h-[225px]
                    md:w-[290px]
                    lg:h-[245px]
                    lg:w-[315px]
                  "
                >
                  <img
                    src={image.src}
                    srcSet={image.srcSet}
                    sizes="(min-width: 1024px) 315px, (min-width: 768px) 290px, (min-width: 640px) 260px, 230px"
                    alt={`Trazoo corporate gifting work sample ${(index % galleryImages.length) + 1}`}
                    width="315"
                    height="245"
                    className="
                      block
                      h-full
                      w-full
                      object-cover
                      transition-transform
                      duration-500
                      hover:scale-[1.03]
                    "
                    loading={index < 2 ? "eager" : "lazy"}
                    decoding="async"
                    fetchPriority={index < 2 ? "high" : "auto"}
                    draggable="false"
                  />
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* ======================================================
          BOTTOM CTA
      ====================================================== */}

      <section
        className="
          border-t
          border-[#EEEEEE]
          bg-white
          py-12
          md:py-16
        "
      >
        <div className="mx-auto max-w-2xl px-6 text-center">

          <p
            className="
              mb-2
              text-[10px]
              font-semibold
              uppercase
              tracking-[0.25em]
              text-[#B84D0D]
            "
          >
            Show us what you are
          </p>

          <h2
            className="
              font-serif
              text-[24px]
              text-[#111]
              md:text-[30px]
            "
          >
            Tell us what you need to send.
          </h2>

          <p
            className="
              mx-auto
              mt-3
              max-w-md
              text-[11px]
              leading-relaxed
              text-[#666]
              md:text-[12px]
            "
          >
            Quantity, budget, audience and timelines.
            Enough for a shortlist and a delivery plan.
          </p>

          <button
            type="button"
            onClick={onEnquireClick}
            className="
              mt-5
              inline-flex
              items-center
              gap-3
              rounded-[8px]
              bg-[#B84D0D]
              px-6
              py-3
              text-[12px]
              font-semibold
              text-white
              transition-colors
              duration-200
              hover:bg-[#963D0A]
            "
          >
            Request a Proposal
            <ArrowRight size={15} aria-hidden="true" />
          </button>
        </div>
      </section>

      {/* HIDE SCROLLBAR */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default Gallery;