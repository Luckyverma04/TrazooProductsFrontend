import IndiaMap from "./IndiaMap";

const PROCESS_STEPS = ["Source", "Customise", "Brand", "Pack", "Deliver"];

const STATS = [
  {
    value: "30,000+",
    label: "Kits shipped in the last 12 months",
  },
  {
    value: "12,000+",
    label: "PIN codes reached",
  },
  {
    value: "2,600",
    label: "Kits in our largest single order",
  },
  {
    value: "1,500+",
    label: "Kits dispatched in a single day",
  },
  {
    value: "3 Hours",
    label: "Fastest turnaround",
  },
  {
    value: "12+",
    label: "Enterprise & institutional clients",
  },
];

const SERIF_FONT = "'Fraunces', Georgia, 'Times New Roman', serif";

export default function About({ onEnquireClick }) {
  return (
    <section
      id="about"
      className="w-full bg-[#FAF9F6] py-12 sm:py-14 md:py-16"
    >
      <div className="mx-auto w-full max-w-[1180px] px-5 sm:px-7 lg:px-8">
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[1.02fr_0.98fr] lg:gap-10">
          <div className="pt-1 lg:pr-2">
            <p className="mb-3 text-[9px] font-semibold uppercase tracking-[0.22em] text-[#555] sm:text-[10px]">
              About us
            </p>

            <h2
              className="max-w-[590px] font-serif text-[30px] font-normal leading-[1.02] tracking-[-0.035em] text-[#111] sm:text-[34px] md:text-[38px] lg:text-[40px]"
              style={{ fontFamily: SERIF_FONT }}
            >
              Gifting gets complicated.{" "}
              <span
                className="italic text-[#F36F21]"
                style={{ fontStyle: "italic", fontWeight: 400 }}
              >
                We make sure it doesn’t feel that way.
              </span>
            </h2>

            <p className="mt-5 max-w-[470px] text-[11px] font-normal leading-[1.45] text-[#555] sm:text-[12px] md:text-[13px]">
              One requirement can mean hundreds of products, approvals,
              addresses and deliveries. Trazoo brings all of it under one
              accountable team.
            </p>

            <p className="mt-3 max-w-[470px] text-[11px] font-normal leading-[1.45] text-[#555] sm:text-[12px] md:text-[13px]">
              From what gets selected to how it is branded, packed and finally
              received, we take responsibility for the whole experience.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-2">
              {PROCESS_STEPS.map((step) => (
                <span
                  key={step}
                  className="inline-flex items-center gap-1.5 rounded-full border border-[#E6E2DC] bg-white px-2.5 py-1 text-[8px] font-medium text-[#333] sm:px-3 sm:text-[9px]"
                >
                  <span
                    aria-hidden="true"
                    className="h-[4px] w-[4px] rounded-full bg-[#F36F21]"
                  />
                  {step}
                </span>
              ))}
            </div>

            <div className="mt-6 border-l-[2px] border-[#F36F21] pl-3 sm:mt-7 sm:pl-4">
              <p
                className="max-w-[460px] font-serif text-[15px] leading-[1.15] text-[#111] sm:text-[17px] md:text-[18px]"
                style={{ fontFamily: SERIF_FONT }}
              >
                You manage one relationship.{" "}
                <span className="italic text-[#F36F21]">
                  We manage everything behind it.
                </span>
              </p>
            </div>
          </div>

          {/* IndiaMap intentionally kept eager because it is a primary visual. */}
          <div className="flex w-full justify-end lg:pt-0">
            <div className="w-full max-w-[500px]">
              <IndiaMap />
            </div>
          </div>
        </div>

        <div className="mt-9 border-t border-[#E2DED7] pt-4 sm:mt-10 sm:pt-5 lg:mt-3">
          <div className="grid grid-cols-2 gap-y-5 sm:grid-cols-3 lg:grid-cols-6 lg:gap-0">
            {STATS.map((stat, index) => (
              <div
                key={stat.value}
                className={`min-w-0 px-3 first:pl-0 lg:border-r lg:border-[#E2DED7] lg:px-4 ${
                  index === STATS.length - 1 ? "lg:border-r-0" : ""
                }`}
              >
                <p
                  className="font-serif text-[22px] font-normal leading-none tracking-[-0.03em] text-[#F36F21] sm:text-[24px] md:text-[26px]"
                  style={{ fontFamily: SERIF_FONT }}
                >
                  {stat.value}
                </p>

                <div
                  aria-hidden="true"
                  className="mt-2 h-[1px] w-[16px] bg-[#F36F21]"
                />

                <p className="mt-2 max-w-[125px] text-[8px] leading-[1.35] text-[#666] sm:text-[9px]">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
