import { useNavigate } from "react-router-dom";

// Image src/assets/hero-home.png se import ho rahi hai.
// IMPORTANT: "../assets/hero-home.png" path tabhi sahi hai jab HeroHome.jsx
// "src" ke andar EK folder mein ho, jaise src/components/HeroHome.jsx
// (assets bhi src ke andar, sibling folder).
//
// Agar tumhari file kahin aur hai to path adjust karo:
//   src/HeroHome.jsx                     -> "./assets/hero-home.png"
//   src/components/HeroHome.jsx          -> "../assets/hero-home.png"
//   src/pages/home/HeroHome.jsx          -> "../../assets/hero-home.png"
//
// File ka naam bhi EXACT match hona chahiye (case-sensitive):
// hero-home.png, HeroHome.png, Hero-Home.png sab alag files maani jaayengi.
import heroImage from "../assets/hero-home.png";

// ================= DATA =================
const stats = [
  { value: "30,000+", label: "Shipments Delivered" },
  { value: "12,000+", label: "PIN Codes Covered" },
  { value: "2,600+", label: "Products Available" },
  { value: "1,500+", label: "Brand Partners" },
  { value: "3 days", label: "Average Turnaround" },
  { value: "20+", label: "Enterprise Clients" },
];

const oldWayPoints = [
  "Multiple fragmented suppliers",
  "Inconsistent quality control",
  "Logistics nightmares & delays",
];

const trazooWayPoints = [
  "Unified procurement platform",
  "Guaranteed enterprise quality",
  "Pan-India door-to-door fulfilment",
];

const solutions = [
  { name: "Corporate Gifting", price: "₹500 onwards" },
  { name: "Festive & Holiday Gifting", price: "₹500 onwards" },
  { name: "Events & Conferences", price: "₹500 onwards" },
  { name: "Employee & Joining Kits", price: "₹500 onwards", highlighted: true },
  { name: "Custom Merchandise", price: "₹500 onwards" },
  { name: "Institutional Gifting", price: "₹500 onwards" },
];

const shipments = [
  { id: "TRZ 8891", route: "Mumbai to Delhi", status: "IN TRANSIT" },
  { id: "TRZ 8892", route: "Bangalore to Pune", status: "DELIVERED" },
];

const statusColor = {
  "IN TRANSIT": "text-[#DF4607]",
  DELIVERED: "text-green-600",
};

// ================= PAGE =================
const HeroHome = () => {
  const navigate = useNavigate();

  const handleRequirement = () => {
    navigate("/requirements");
  };

  return (
    <>
      {/* ================= HERO ================= */}
      <section id="hero" className="bg-[#FFFDF9] border-b border-[#DED8D2]">
        <div className="w-full px-6 md:px-10 lg:px-14 xl:px-20 pt-16 md:pt-20 pb-10">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-2xl">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[64px] leading-[1.05] font-extrabold tracking-[-0.03em] text-[#111111]">
                Corporate gifting.
                <br />
                Without the vendor chaos.
              </h1>

              <p className="mt-6 max-w-2xl text-base md:text-lg leading-7 md:leading-8 text-[#6E6A67]">
                From customised merchandise to thousands of individually
                packed gifts across India, Trazoo handles sourcing, branding,
                quality checks, packaging and delivery through one team.
              </p>

              <button
                type="button"
                onClick={handleRequirement}
                className="
                  mt-8
                  inline-flex
                  items-center
                  justify-center
                  px-7
                  py-3.5
                  bg-[#DF4607]
                  text-white
                  text-sm
                  md:text-base
                  font-semibold
                  rounded-lg
                  hover:bg-[#C93E05]
                  active:scale-[0.98]
                  transition-all
                "
              >
                Share Your Requirement
              </button>
            </div>
          </div>
        </div>

        <div className="px-1 md:px-2 pb-6">
          <div
            className="
              relative
              w-full
              h-[220px]
              sm:h-[280px]
              md:h-[360px]
              lg:h-[430px]
              overflow-hidden
              rounded-lg
              border
              border-[#DED8D2]
              bg-[#F7F2EC]
            "
          >
            <img
              src={heroImage}
              alt="Trazoo corporate gifting products — mouse, notebook, pen, water bottle in a branded gift box"
              className="absolute inset-0 w-full h-full object-cover object-center"
              loading="eager"
              fetchPriority="high"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          </div>
        </div>
      </section>

      {/* ================= TRUSTED BY / LOGOS ================= */}
      <section className="bg-[#FFFDF9] border-b border-[#DED8D2]">
        <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-14 xl:px-20 py-10 text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#9A9691]">
            Trusted by Industry Leaders
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-16 gap-y-6">
            {["LOGO", "LOGO", "LOGO", "LOGO"].map((logo, i) => (
              <span
                key={i}
                className="text-lg font-bold tracking-widest text-[#B8B3AC]"
              >
                {logo}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ================= STATS ================= */}
      <section className="bg-[#FFFDF9] border-b border-[#DED8D2]">
        <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-14 xl:px-20 py-14 md:py-16">
          <div className="grid grid-cols-2 gap-x-16 gap-y-10">
            {stats.map((stat) => (
              <div key={stat.label}>
                <div className="text-3xl md:text-4xl font-extrabold text-[#DF4607] tracking-[-0.02em]">
                  {stat.value}
                </div>
                <div className="mt-1 text-sm md:text-base text-[#6E6A67]">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= OLD WAY VS TRAZOO WAY ================= */}
      <section className="bg-[#FFFDF9] border-b border-[#DED8D2]">
        <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-14 xl:px-20 py-14 md:py-16">
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-[-0.02em] text-[#111111]">
            The Old Way vs. The Trazoo Way
          </h2>

          <div className="mt-8 space-y-4">
            {/* Vendor Chaos */}
            <div className="rounded-lg border border-[#DED8D2] bg-[#F7F2EC] px-6 py-6">
              <div className="flex items-center gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-white text-xs">
                  ✕
                </span>
                <h3 className="text-lg font-bold text-[#111111]">
                  Vendor Chaos
                </h3>
              </div>
              <ul className="mt-3 space-y-1.5 pl-7">
                {oldWayPoints.map((point) => (
                  <li
                    key={point}
                    className="text-sm text-[#6E6A67] flex gap-2"
                  >
                    <span>–</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Single Partner */}
            <div className="relative rounded-lg border border-[#DF4607] bg-[#FDEDE7] px-6 py-6">
              <span className="absolute top-3 right-3 flex h-5 w-5 items-center justify-center rounded-full bg-white/70 text-[#DF4607] text-xs">
                ✓
              </span>

              <div className="flex items-center gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#DF4607] text-white text-xs">
                  ✓
                </span>
                <h3 className="text-lg font-bold text-[#111111]">
                  Single Partner
                </h3>
              </div>
              <ul className="mt-3 space-y-1.5 pl-7">
                {trazooWayPoints.map((point) => (
                  <li
                    key={point}
                    className="text-sm text-[#6E6A67] flex gap-2"
                  >
                    <span>+</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ================= END-TO-END SOLUTIONS ================= */}
      <section className="bg-[#FFFDF9] border-b border-[#DED8D2]">
        <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-14 xl:px-20 py-14 md:py-16">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#DF4607]">
            Our Expertise
          </p>
          <h2 className="mt-2 text-2xl md:text-3xl font-extrabold tracking-[-0.02em] text-[#111111]">
            End-to-End Solutions
          </h2>

          <div className="mt-8 space-y-3">
            {solutions.map((item) => (
              <button
                key={item.name}
                type="button"
                className={`
                  w-full text-left
                  flex items-center justify-between
                  rounded-lg px-6 py-5
                  transition-colors
                  ${
                    item.highlighted
                      ? "border border-[#DF4607] bg-[#FDEDE7]"
                      : "border border-[#DED8D2] bg-white hover:border-[#DF4607] hover:bg-[#FDEDE7]"
                  }
                `}
              >
                <span className="font-semibold text-[#111111]">
                  {item.name}
                </span>
                <span className="text-sm text-[#6E6A67]">{item.price}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ================= REAL-TIME SHIPMENT VISIBILITY ================= */}
      <section className="bg-[#FFFDF9] border-b border-[#DED8D2]">
        <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-14 xl:px-20 py-14 md:py-16">
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-[-0.02em] text-[#111111]">
            Real-time Shipment Visibility
          </h2>
          <p className="mt-2 text-[#6E6A67]">
            Track all your enterprise deliveries in one place.
          </p>

          <div className="mt-8 space-y-3">
            {shipments.map((s) => (
              <div
                key={s.id}
                className="flex items-center justify-between rounded-lg border border-[#DED8D2] bg-white px-6 py-5"
              >
                <div>
                  <div className="text-sm font-semibold text-[#111111]">
                    Shipment #{s.id}
                  </div>
                  <div className="text-sm text-[#6E6A67]">{s.route}</div>
                </div>
                <span
                  className={`text-xs font-bold tracking-wide ${statusColor[s.status]}`}
                >
                  {s.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= BOTTOM CTA ================= */}
      <section className="bg-[#FFFDF9]">
        <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-14 xl:px-20 py-16 text-center">
          <button
            type="button"
            onClick={handleRequirement}
            className="
              inline-flex
              items-center
              justify-center
              px-7
              py-3.5
              bg-[#DF4607]
              text-white
              text-sm
              md:text-base
              font-semibold
              rounded-lg
              hover:bg-[#C93E05]
              active:scale-[0.98]
              transition-all
            "
          >
            Share Your Requirement
          </button>
        </div>
      </section>
    </>
  );
};

export default HeroHome;