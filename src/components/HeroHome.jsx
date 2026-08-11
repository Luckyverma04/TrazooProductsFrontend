import { useNavigate } from "react-router-dom";
import heroImage from "../assets/hero-home.png";

// ================= COMPANY LOGOS DATA =================
const companies = [
  {
    name: "Infosys",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Infosys_logo.svg/1200px-Infosys_logo.svg.png",
  },
  {
    name: "HCLTech",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/HCL_Technologies_Logo.svg/1200px-HCL_Technologies_Logo.svg.png",
  },
  {
    name: "Amazon",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1200px-Amazon_logo.svg.png",
  },
  {
    name: "Flipkart",
    logo: "https://upload.wikimedia.org/wikipedia/en/thumb/0/0c/Flipkart_logo.svg/1200px-Flipkart_logo.svg.png",
  },
  {
    name: "Rapido",
    logo: "https://www.rapido.bike/img/rapido_logo_dark.svg",
  },
  {
    name: "Masai",
    logo: "https://assets.masaischool.com/masai-logo-dark.png",
  },
  {
    name: "IIT Madras",
    logo: "https://upload.wikimedia.org/wikipedia/en/thumb/b/b0/IIT_Madras_Logo.svg/1200px-IIT_Madras_Logo.svg.png",
  },
  {
    name: "IIM Mumbai",
    logo: "https://upload.wikimedia.org/wikipedia/en/thumb/5/56/IIM_Mumbai_Logo.svg/1200px-IIM_Mumbai_Logo.svg.png",
  },
  {
    name: "BITSoM",
    logo: "https://upload.wikimedia.org/wikipedia/en/thumb/a/a9/Birla_Institute_of_Technology_and_Science_Pilani_Logo.svg/1200px-Birla_Institute_of_Technology_and_Science_Pilani_Logo.svg.png",
  },
];

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
      {/* ================= HERO SECTION (2-COLUMN) ================= */}
      <section id="hero" className="bg-[#FFFDF9] border-b border-[#DED8D2]">
        <div className="w-full px-6 md:px-10 lg:px-14 xl:px-20 py-12 md:py-16 lg:py-20">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
              
              {/* LEFT: Text Content */}
              <div>
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

              {/* RIGHT: Hero Image */}
              <div className="order-first lg:order-last">
                <div
                  className="
                    relative
                    w-full
                    h-[280px]
                    sm:h-[360px]
                    md:h-[420px]
                    lg:h-[480px]
                    overflow-hidden
                    rounded-2xl
                    border
                    border-[#DED8D2]
                    bg-[#F7F2EC]
                    shadow-lg
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
            </div>
          </div>
        </div>
      </section>

      {/* ================= TRUSTED BY / LOGOS ================= */}
      <section className="bg-[#FFFDF9] border-b border-[#DED8D2]">
        <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-14 xl:px-20 py-14 md:py-16">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#9A9691] text-center mb-2">
            Trusted by Industry Leaders
          </p>
          <p className="text-sm text-[#6E6A67] text-center mb-12">
            Leading enterprises choose Trazoo for corporate gifting
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-9 gap-4 md:gap-6 items-center justify-items-center">
            {companies.map((company, i) => (
              <div
                key={i}
                className="
                  flex items-center justify-center
                  h-20 md:h-24
                  w-full
                  px-4
                  py-4
                  rounded-lg
                  border border-[#DED8D2]
                  bg-white
                  hover:border-[#DF4607]
                  hover:shadow-lg
                  transition-all
                  group
                  overflow-hidden
                "
              >
                <img
                  src={company.logo}
                  alt={company.name}
                  className="
                    h-12 md:h-14
                    object-contain
                    filter
                    group-hover:brightness-110
                    transition-all
                  "
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                    if (e.currentTarget.nextElementSibling) {
                      e.currentTarget.nextElementSibling.style.display = "block";
                    }
                  }}
                />
                <span 
                  className="
                    text-xs sm:text-sm font-bold text-[#6E6A67] 
                    group-hover:text-[#DF4607] 
                    text-center transition-colors
                    hidden
                  "
                >
                  {company.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= STATS ================= */}
      <section className="bg-[#FFFDF9] border-b border-[#DED8D2]">
        <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-14 xl:px-20 py-16 md:py-20">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-12 gap-y-14">
            {stats.map((stat) => (
              <div key={stat.label}>
                <div className="text-3xl md:text-4xl font-extrabold text-[#DF4607] tracking-[-0.02em]">
                  {stat.value}
                </div>
                <div className="mt-2 text-sm md:text-base text-[#6E6A67] font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= OLD WAY VS TRAZOO WAY ================= */}
      <section className="bg-[#FFFDF9] border-b border-[#DED8D2]">
        <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-14 xl:px-20 py-16 md:py-20">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-[-0.02em] text-[#111111] mb-3">
            The Old Way vs. The Trazoo Way
          </h2>
          <p className="text-[#6E6A67] mb-10">
            Why enterprises choose Trazoo for their gifting needs
          </p>

          <div className="space-y-5">
            {/* Vendor Chaos */}
            <div className="rounded-xl border border-[#DED8D2] bg-[#F7F2EC] px-8 py-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white text-xs font-bold">
                  ✕
                </span>
                <h3 className="text-lg font-bold text-[#111111]">
                  Vendor Chaos
                </h3>
              </div>
              <ul className="space-y-2.5 pl-9">
                {oldWayPoints.map((point) => (
                  <li
                    key={point}
                    className="text-sm text-[#6E6A67] flex gap-3"
                  >
                    <span className="text-red-400">–</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Single Partner */}
            <div className="relative rounded-xl border-2 border-[#DF4607] bg-[#FDEDE7] px-8 py-8">
              <span className="absolute top-4 right-4 inline-flex h-6 w-6 items-center justify-center rounded-full bg-white text-[#DF4607] text-xs font-bold">
                ✓
              </span>

              <div className="flex items-center gap-3 mb-4">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#DF4607] text-white text-xs font-bold">
                  ✓
                </span>
                <h3 className="text-lg font-bold text-[#111111]">
                  Single Partner (Trazoo)
                </h3>
              </div>
              <ul className="space-y-2.5 pl-9">
                {trazooWayPoints.map((point) => (
                  <li
                    key={point}
                    className="text-sm text-[#6E6A67] flex gap-3"
                  >
                    <span className="text-[#DF4607]">+</span>
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
        <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-14 xl:px-20 py-16 md:py-20">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#DF4607]">
            Our Expertise
          </p>
          <h2 className="mt-3 text-3xl md:text-4xl font-extrabold tracking-[-0.02em] text-[#111111] mb-10">
            End-to-End Solutions
          </h2>

          <div className="space-y-3">
            {solutions.map((item) => (
              <button
                key={item.name}
                type="button"
                className={`
                  w-full text-left
                  flex items-center justify-between
                  rounded-xl px-7 py-6
                  transition-all
                  font-medium
                  ${
                    item.highlighted
                      ? "border-2 border-[#DF4607] bg-[#FDEDE7] hover:shadow-md"
                      : "border border-[#DED8D2] bg-white hover:border-[#DF4607] hover:bg-[#FDEDE7]"
                  }
                `}
              >
                <span className="text-[#111111] font-semibold">
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
                  <div className="text-sm text-[#6E6A67] mt-1">{s.route}</div>
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

      {/* ================= BOTTOM CTA ================= */}
      <section className="bg-[#FFFDF9]">
        <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-14 xl:px-20 py-16 md:py-20 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#111111] mb-6">
            Ready to Transform Your Gifting?
          </h2>
          <p className="text-lg text-[#6E6A67] mb-8 max-w-2xl mx-auto">
            Share your requirement and let our team create the perfect solution for your brand.
          </p>
          <button
            type="button"
            onClick={handleRequirement}
            className="
              inline-flex
              items-center
              justify-center
              px-8
              py-4
              bg-[#DF4607]
              text-white
              text-base
              font-semibold
              rounded-lg
              hover:bg-[#C93E05]
              active:scale-[0.98]
              transition-all
              shadow-md
              hover:shadow-lg
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