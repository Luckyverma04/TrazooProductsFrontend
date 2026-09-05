import { useEffect, useState } from "react";

import closedGift from "../assets/loader/closed.webp";
import openingGift from "../assets/loader/opening.webp";
import burstGift from "../assets/loader/burst.webp";

const INTRO_DURATION = 3800;
const INTRO_STORAGE_KEY = "tz_intro_seen";

const Intro = () => {
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    const seen = sessionStorage.getItem(INTRO_STORAGE_KEY);

    if (seen) {
      setShowIntro(false);
      return;
    }

    const timer = setTimeout(() => {
      setShowIntro(false);
      sessionStorage.setItem(INTRO_STORAGE_KEY, "true");
    }, INTRO_DURATION);

    return () => clearTimeout(timer);
  }, []);

  const handleSkip = () => {
    setShowIntro(false);
    sessionStorage.setItem(INTRO_STORAGE_KEY, "true");
  };

  if (!showIntro) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden bg-white">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="
            absolute
            left-1/2
            top-1/2
            h-80
            w-80
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            bg-gradient-to-r
            from-[#F36F21]/20
            to-transparent
            blur-3xl
            animate-pulse
            md:h-96
            md:w-96
          "
        />
      </div>

      {/* Gift animation */}
      <div className="relative z-10 mb-8 h-64 w-64 md:mb-10 md:h-72 md:w-72">
        {/* Closed gift */}
        <img
          src={closedGift}
          alt=""
          aria-hidden="true"
          width="288"
          height="288"
          decoding="async"
          className="absolute inset-0 h-full w-full object-contain"
          style={{
            animation: "tzGiftClosed 0.8s ease-out forwards",
          }}
        />

        {/* Opening gift */}
        <img
          src={openingGift}
          alt=""
          aria-hidden="true"
          width="288"
          height="288"
          decoding="async"
          className="absolute inset-0 h-full w-full object-contain"
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
          width="360"
          height="360"
          decoding="async"
          className="
            absolute
            -left-[12.5%]
            -top-[12.5%]
            h-[125%]
            w-[125%]
            object-contain
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
          font-extrabold
          tracking-tight
          text-[#111111]
          md:text-6xl
        "
      >
        Trazoo
      </h1>

      {/* Progress */}
      <div className="relative z-10 mt-8 h-1 w-32 overflow-hidden rounded-full bg-gray-200 md:w-40">
        <div
          className="h-full rounded-full bg-gradient-to-r from-[#F36F21] to-[#FF8C42]"
          style={{
            width: "0%",
            animation: `tzProgress ${INTRO_DURATION}ms ease-in-out forwards`,
          }}
        />
      </div>

      {/* Skip */}
      <button
        type="button"
        onClick={handleSkip}
        className="
          absolute
          right-6
          top-6
          z-20
          px-3
          py-2
          text-sm
          font-medium
          text-gray-500
          transition-colors
          hover:text-[#111111]
          md:right-8
          md:top-8
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