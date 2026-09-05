import { useEffect, useState } from "react";

import { Users, ShieldCheck, Sparkles, MapPin } from "lucide-react";

const reasons = [
  {
    number: "01",
    icon: Users,
    title: "One Point of Accountability",
    description:
      "One team owns your requirement from the first brief to the final delivery.",
  },
  {
    number: "02",
    icon: ShieldCheck,
    title: "Honest Commitments",
    description:
      "No overpromising to win an order. If we see a risk in quality, availability or timelines, you hear it from us first.",
  },
  {
    number: "03",
    icon: Sparkles,
    title: "Curated Around You",
    description:
      "We shortlist around your audience, budget and brand, not around what we need to sell.",
  },
  {
    number: "04",
    icon: MapPin,
    title: "Execution at Scale",
    description:
      "From one location to thousands of individual addresses, we manage the programme without compromising the experience.",
  },
];

const AUTO_ROTATE_INTERVAL = 3000;

const WhyUs = () => {
  const [activeCard, setActiveCard] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCard((prev) => (prev + 1) % reasons.length);
    }, AUTO_ROTATE_INTERVAL);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="why"
      aria-labelledby="whyTitle"
      className="w-full overflow-x-hidden bg-white py-12 sm:py-14 md:py-16"
    >
      <div className="mx-auto w-full max-w-[1180px] px-5 sm:px-8 lg:px-10">
        <div className="mb-8 w-full max-w-[760px] md:mb-10">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#F36F21]">
            Why teams choose us
          </p>

          <h2
            id="whyTitle"
            className="font-serif text-[29px] font-medium leading-[1.1] tracking-[-0.025em] text-[#111] sm:text-[34px] md:text-[40px] lg:text-[44px]"
          >
            <span className="block">Most vendors sell you products.</span>
            <span className="block italic text-[#F36F21]">
              We take responsibility for the outcome.
            </span>
          </h2>

          <p className="mt-4 max-w-[58ch] text-[15px] leading-[1.55] text-[#666] md:text-[16px]">
            We believe good business is built on long-term relationships,
            not one-time orders. That means being clear about what is
            possible, what is not, and where we see a risk, before you commit.
          </p>

          <p className="mt-5 inline-block max-w-full border-l-[3px] border-[#F36F21] bg-[#FEF1E9] px-5 py-3.5 font-serif text-[20px] font-medium leading-tight text-[#111] sm:px-6 sm:py-4 sm:text-[23px] md:text-[25px]">
            We’d rather lose an order than your trust.
          </p>
        </div>

        <div className="w-full space-y-2.5 md:space-y-3">
          {reasons.map((reason, index) => {
            const Icon = reason.icon;
            const isActive = activeCard === index;

            return (
              <article
                key={reason.number}
                onMouseEnter={() => setActiveCard(index)}
                className={`relative grid min-h-[96px] w-full grid-cols-[72px_minmax(0,1fr)] overflow-hidden rounded-[12px] border transition-[border-color,background-color,box-shadow] duration-500 ease-out sm:grid-cols-[82px_minmax(0,1fr)] md:min-h-[104px] md:grid-cols-[92px_minmax(0,1fr)] ${
                  isActive
                    ? "border-[#F36F21] bg-white shadow-[0_6px_24px_rgba(0,0,0,0.045)]"
                    : "border-[#E5E5E5] bg-white"
                }`}
              >
                <span
                  aria-hidden="true"
                  className={`absolute bottom-0 left-0 top-0 w-[3px] bg-[#F36F21] transition-opacity duration-500 ${
                    isActive ? "opacity-100" : "opacity-0"
                  }`}
                />

                <div
                  className={`flex flex-col items-center justify-center border-r transition-[border-color,background-color,color] duration-500 ${
                    isActive
                      ? "border-[#F36F21] bg-[#F36F21] text-white"
                      : "border-[#F2DED2] bg-[#FEF1E9] text-[#C64F13]"
                  }`}
                >
                  <span className="font-serif text-[26px] leading-none md:text-[29px]">
                    {reason.number}
                  </span>
                  <Icon size={18} strokeWidth={1.5} className="mt-2" />
                </div>

                <div className="flex min-w-0 flex-col justify-center px-5 py-4 sm:px-6 md:px-7 md:py-5">
                  <h3
                    className={`text-[16px] font-semibold leading-[1.2] tracking-[-0.01em] transition-colors duration-500 md:text-[18px] ${
                      isActive ? "text-[#111]" : "text-[#171717]"
                    }`}
                  >
                    {reason.title}
                  </h3>

                  <p className="mt-1.5 max-w-[850px] text-[13px] leading-[1.45] text-[#777] md:text-[14px]">
                    {reason.description}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
