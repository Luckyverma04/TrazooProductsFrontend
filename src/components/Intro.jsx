import { useEffect, useState } from "react";

import closedGift from "../assets/loader/closed.webp";
import openingGift from "../assets/loader/opening.webp";
import burstGift from "../assets/loader/burst.webp";

const Intro = () => {
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    const seen = sessionStorage.getItem("tz_intro_seen");

    if (seen) {
      setShowIntro(false);
      return;
    }

    const timer = setTimeout(() => {
      setShowIntro(false);
      sessionStorage.setItem("tz_intro_seen", "true");
    }, 3800);

    return () => clearTimeout(timer);
  }, []);

  const handleSkip = () => {
    setShowIntro(false);
    sessionStorage.setItem("tz_intro_seen", "true");
  };

  if (!showIntro) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-white flex flex-col items-center justify-center overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="
            absolute
            top-1/2
            left-1/2
            -translate-x-1/2
            -translate-y-1/2
            w-80
            h-80
            md:w-96
            md:h-96
            bg-gradient-to-r
            from-[#F36F21]/20
            to-transparent
            rounded-full
            blur-3xl
            animate-pulse
          "
        />
      </div>

      {/* Gift animation */}
      <div className="relative z-10 w-64 h-64 md:w-72 md:h-72 mb-8 md:mb-10">
        {/* Closed gift */}
        <img
          src={closedGift}
          alt=""
          aria-hidden="true"
          className="
            absolute
            inset-0
            w-full
            h-full
            object-contain
          "
          style={{
            animation: "tzGiftClosed 0.8s ease-out forwards",
          }}
        />

        {/* Opening gift */}
        <img
          src={openingGift}
          alt=""
          aria-hidden="true"
          className="
            absolute
            inset-0
            w-full
            h-full
            object-contain
          "
          style={{
            opacity: 0,
            animation: "tzGiftOpening 1s ease-out 0.8s forwards",
          }}
        />

        {/* Burst */}
        <img
          src={burstGift}
          alt=""
          aria-hidden="true"
          className="
            absolute
            inset-0
            w-[125%]
            h-[125%]
            object-contain
            -top-[12.5%]
            -left-[12.5%]
          "
          style={{
            opacity: 0,
            animation: "tzGiftBurst 1.2s ease-out 1.6s forwards",
          }}
        />
      </div>

      {/* Brand */}
      <h1
        className="
          relative
          z-10
          text-5xl
          md:text-6xl
          font-extrabold
          tracking-tight
          text-[#111111]
        "
      >
        Trazoo
      </h1>

      {/* Progress */}
      <div className="relative z-10 mt-8 w-32 md:w-40 h-1 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-[#F36F21] to-[#FF8C42] rounded-full"
          style={{
            width: "0%",
            animation: "tzProgress 3.8s ease-in-out forwards",
          }}
        />
      </div>

      {/* Skip */}
      <button
        type="button"
        onClick={handleSkip}
        className="
          absolute
          top-6
          right-6
          md:top-8
          md:right-8
          z-20
          px-3
          py-2
          text-sm
          font-medium
          text-gray-500
          hover:text-[#111111]
          transition-colors
        "
      >
        Skip
      </button>

      <style>{`
        @keyframes tzGiftClosed {
          0% {
            opacity: 1;
            transform: scale(1);
          }

          100% {
            opacity: 0;
            transform: scale(0.92);
          }
        }

        @keyframes tzGiftOpening {
          0% {
            opacity: 0;
            transform: scale(0.94);
          }

          40% {
            opacity: 1;
            transform: scale(1);
          }

          100% {
            opacity: 0;
            transform: scale(1.03);
          }
        }

        @keyframes tzGiftBurst {
          0% {
            opacity: 0;
            transform: scale(0.5);
          }

          40% {
            opacity: 1;
            transform: scale(1);
          }

          100% {
            opacity: 0;
            transform: scale(1.08);
          }
        }

        @keyframes tzProgress {
          0% {
            width: 0%;
          }

          100% {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default Intro;