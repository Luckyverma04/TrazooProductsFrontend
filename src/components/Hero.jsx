import { useSEO } from "../hooks/useSEO";
import { seoMetadata } from "../utils/seo";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import heroImage from "../assets/Home.jpeg";
import Footer from "../components/Footer";

// ================= SHIPMENT DATA =================
const shipments = [
  { id: "TRZ 8891", route: "Mumbai to Delhi", status: "IN TRANSIT" },
  { id: "TRZ 8892", route: "Bangalore to Pune", status: "DELIVERED" },
];

const Solutions = () => {
  useSEO(seoMetadata.solutions);

  const [isVisible, setIsVisible] = useState(false);

  const navigate = useNavigate();

  // ===== VISIBILITY =====
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // ===== NAVIGATION =====
  const goToRequirements = () => {
    navigate("/requirements");
  };

  const goToProducts = () => {
    navigate("/products");
  };

  return (
    <>
      <main id="solutions">
        {/* ================= SOLUTIONS HERO ================= */}
        <section
          id="hero"
          className="bg-[#FFFDF9] pt-12 md:pt-16 lg:pt-20 pb-12 md:pb-16 lg:pb-20 px-6 flex items-center border-b border-[#DED8D2]"
        >
          <div className="max-w-7xl mx-auto w-full">
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

              {/* ---------- LEFT: TEXT ---------- */}
              <div
                className={`transition-all duration-700 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
              >
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[64px] leading-[1.05] font-extrabold tracking-[-0.03em] text-[#111111]">
                  Corporate Gifting,
                  <br />
                  Managed From Idea
                  <br />
                  to Delivery
                </h1>

                <p className="mt-6 max-w-2xl text-base md:text-lg leading-7 md:leading-8 text-[#6E6A67]">
                  At Trazoo Global LLP, we provide end-to-end gifting and
                  merchandise solutions designed for organisations, teams and
                  institutions. From product selection and customisation to
                  branding, packaging and fulfilment, we manage the complete
                  execution based on your requirement.
                </p>

                {/* CTA BUTTONS */}
                <div className="flex flex-wrap gap-4 mt-8">

                  {/* GET A QUOTE */}
                  <button
                    onClick={goToRequirements}
                    className="
                      group
                      relative
                      overflow-hidden
                      inline-flex
                      items-center
                      justify-center
                      gap-2
                      px-7
                      py-3.5
                      bg-[#DF4607]
                      text-white
                      text-sm
                      md:text-base
                      font-semibold
                      rounded-lg
                      shadow-sm
                      hover:bg-[#C93E05]
                      hover:shadow-md
                      active:scale-[0.98]
                      transition-all
                      duration-300
                    "
                  >
                    <span className="relative z-10">
                      Get a Quote
                    </span>

                    <span
                      className="
                        relative
                        z-10
                        transition-transform
                        duration-300
                        group-hover:translate-x-1
                      "
                    >
                      →
                    </span>

                    {/* animated shine */}
                    <span
                      className="
                        absolute
                        inset-y-0
                        -left-full
                        w-1/2
                        skew-x-[-20deg]
                        bg-white/20
                        group-hover:left-[140%]
                        transition-all
                        duration-700
                      "
                    />
                  </button>

                  {/* EXPLORE PRODUCTS */}
                  <button
                    onClick={goToProducts}
                    className="
                      px-7
                      py-3.5
                      bg-transparent
                      text-[#111111]
                      text-sm
                      md:text-base
                      font-semibold
                      rounded-lg
                      border
                      border-[#111111]
                      hover:bg-[#111111]
                      hover:text-white
                      active:scale-[0.98]
                      transition-all
                      duration-300
                    "
                  >
                    Explore Products
                  </button>

                </div>
              </div>

              {/* ---------- RIGHT: IMAGE - FULL WIDTH NO PADDING ---------- */}
              <div
                className={`transition-all duration-700 delay-150 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
              >
                <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-[#DED8D2] bg-white shadow-lg">
                  <img
                    src={heroImage}
                    alt="Trazoo corporate gifting and merchandise"
                    className="w-full h-full object-cover"
                    loading="eager"
                  />
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ================= WHY CHOOSE TRAZOO ================= */}
        <section className="bg-[#FFFDF9] border-b border-[#DED8D2]">
          <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-14 xl:px-20 py-16 md:py-20">
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#111111] mb-12 text-center">
              Why Choose Trazoo
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <div className="flex gap-4 mb-6">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-orange-100 text-[#DF4607]">
                      ✓
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#111111] mb-2">
                      Complete Ownership
                    </h3>
                    <p className="text-[#6E6A67]">
                      From ideation to execution, we handle every aspect — sourcing, customisation, quality checks, packaging, and delivery.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 mb-6">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-orange-100 text-[#DF4607]">
                      ✓
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#111111] mb-2">
                      Enterprise Quality
                    </h3>
                    <p className="text-[#6E6A67]">
                      Rigorous quality checks at every step ensure your brand is represented flawlessly.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-orange-100 text-[#DF4607]">
                      ✓
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#111111] mb-2">
                      Pan-India Coverage
                    </h3>
                    <p className="text-[#6E6A67]">
                      Deliver to 12,000+ PIN codes with an average turnaround of just 3 days.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex gap-4 mb-6">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-orange-100 text-[#DF4607]">
                      ✓
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#111111] mb-2">
                      Customisation at Scale
                    </h3>
                    <p className="text-[#6E6A67]">
                      Whether 50 units or 50,000 — we deliver the same level of customisation and attention.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 mb-6">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-orange-100 text-[#DF4607]">
                      ✓
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#111111] mb-2">
                      Dedicated Support
                    </h3>
                    <p className="text-[#6E6A67]">
                      A single point of contact for all your gifting needs — no vendor juggling.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-orange-100 text-[#DF4607]">
                      ✓
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#111111] mb-2">
                      Transparent Pricing
                    </h3>
                    <p className="text-[#6E6A67]">
                      No hidden costs. Upfront quotes with detailed breakdowns.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= REAL-TIME SHIPMENT VISIBILITY ================= */}
        <section className="bg-[#FFFDF9] border-b border-[#DED8D2]">
          <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-14 xl:px-20 py-16 md:py-20">

            <h2 className="text-3xl md:text-4xl font-extrabold tracking-[-0.02em] text-[#111111]">
              Real-time Shipment Visibility
            </h2>

            <p className="mt-3 text-[#6E6A67] text-base md:text-lg">
              Track all your enterprise deliveries in one place.
            </p>

            <div className="mt-10 space-y-3">
              {shipments.map((s) => (
                <div
                  key={s.id}
                  className="flex items-center justify-between rounded-xl border border-[#DED8D2] bg-white px-7 py-6 hover:shadow-md transition-all"
                >
                  <div>
                    <div className="text-base font-semibold text-[#111111]">
                      Shipment #{s.id}
                    </div>

                    <div className="text-sm text-[#6E6A67] mt-1">
                      {s.route}
                    </div>
                  </div>

                  <span
                    className={`text-xs font-bold tracking-wide px-3 py-1.5 rounded-full ${
                      s.status === "IN TRANSIT"
                        ? "bg-orange-100 text-[#DF4607]"
                        : "bg-green-100 text-green-600"
                    }`}
                  >
                    {s.status}
                  </span>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* ================= CTA: HAVE A REQUIREMENT ================= */}
        <section className="bg-gradient-to-r from-[#DF4607] to-[#C93E05]">
          <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-14 xl:px-20 py-16 md:py-20 text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
              Have a Requirement in Mind?
            </h2>
            <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
              Tell us what you need. We'll help you choose, customise and deliver it.
            </p>
            <button
              onClick={goToRequirements}
              className="
                inline-flex
                items-center
                justify-center
                px-8
                py-4
                bg-white
                text-[#DF4607]
                text-base
                font-semibold
                rounded-lg
                hover:bg-gray-100
                active:scale-[0.98]
                transition-all
                shadow-md
                hover:shadow-lg
              "
            >
              Get a Quote
            </button>
          </div>
        </section>
      </main>

   
    </>
  );
};

export default Solutions;