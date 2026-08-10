import { useEffect } from "react";
import { ArrowRight } from "lucide-react";
import Navbar from "./Navbar";
import Footer from "./Footer";

/* ================= IMAGES =================
   Abhi 2 hi screenshots hain, isliye teesra card image #1 reuse kar raha hai.

   ===== JAB CLIENT SE ASLI PHOTOS AAYEIN =====
   Option A (asaan): purani file ke upar SAME NAAM se save kar do
                     (case-study-1.png, case-study-2.png) — code mein
                     kuch nahi badalna padega.

   Option B: teesri image bhi mile to neeche wali line uncomment karo
             aur CASE_STUDIES ke teesre object mein image: caseStudy3 kar do.
=========================================== */
import caseStudy1 from "../assets/case-study-1.png";
import caseStudy2 from "../assets/case-study-2.png";
// import caseStudy3 from "../assets/case-study-3.png";

/* ================= CASE STUDIES =================
   Naya case study add karna ho to bas is array mein object daal do.
   Grid apne aap adjust ho jayega.
================================================== */
const CASE_STUDIES = [
  {
    id: 1,
    tag: "Enterprise Rollout",
    title: "Case Study 1 (2,600 kits)",
    image: caseStudy2, // warehouse wali
    stats: [
      { label: "Requirement", value: "Onboarding Kits" },
      { label: "Quantity", value: "2,600 Units" },
      { label: "Timeline", value: "4 Weeks" },
      { label: "Locations", value: "Multiple Locations" },
    ],
  },
  {
    id: 2,
    tag: "Holiday Program",
    title: "Case Study 2 (1,500+ kits)",
    image: caseStudy1, // gift box wali
    stats: [
      { label: "Requirement", value: "Premium Holiday Gifting" },
      { label: "Quantity", value: "1,500+ Units" },
      { label: "Timeline", value: "8 Weeks" },
      { label: "Locations", value: "Multiple Offices" },
    ],
  },
  {
    id: 3,
    tag: "Event Merchandise",
    title: "Case Study 3 (3-day turnaround)",
    image: caseStudy2, // TODO: teesri image aane pe caseStudy3 kar dena
    stats: [
      { label: "Requirement", value: "Event Kits" },
      { label: "Quantity", value: "500 Units" },
      { label: "Timeline", value: "3 Days" },
      { label: "Locations", value: "Single Location" },
    ],
  },
];

/* ================= CASE STUDY CARD ================= */
const CaseStudyCard = ({ study, onEnquire }) => (
  <article className="rounded-xl border border-[#DED8D2] bg-white overflow-hidden flex flex-col group">
    {/* Image — object-cover se square screenshot bhi bina white gap ke fit hogi */}
    <div className="aspect-[16/10] bg-[#EDE4DA] overflow-hidden">
      <img
        src={study.image}
        alt={study.title}
        loading="lazy"
        decoding="async"
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />
    </div>

    <div className="p-6 flex flex-col flex-1">
      {/* Tag */}
      <span className="self-start px-2.5 py-1 mb-4 rounded border border-[#DED8D2] bg-[#F7F2EC] text-[10px] font-semibold text-[#4A4644]">
        {study.tag}
      </span>

      {/* Title */}
      <h2 className="text-xl font-bold text-[#111111] mb-5">{study.title}</h2>

      {/* Stats — 2 column grid */}
      <dl className="grid grid-cols-2 gap-x-6 gap-y-4 mb-6">
        {study.stats.map((s) => (
          <div key={s.label}>
            <dt className="text-[10px] text-[#6E6A67] mb-0.5">{s.label}</dt>
            <dd className="text-[13px] text-[#DF4607] font-medium">{s.value}</dd>
          </div>
        ))}
      </dl>

      {/* Link */}
      <button
        onClick={onEnquire}
        className="mt-auto self-start inline-flex items-center gap-1.5 text-[12px] font-semibold text-[#DF4607] hover:gap-2.5 transition-all"
      >
        View Case Study
        <ArrowRight size={13} />
      </button>
    </div>
  </article>
);

/* ================= MAIN ================= */
const OurWork = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const goToEnquiry = () =>
    document
      .querySelector("#footer")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <>
      <Navbar />

      <main className="bg-[#FFFDF9] pt-28 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          {/* ---------- HEADING ---------- */}
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#111111] mb-4">
            Our Work
          </h1>
          <p className="text-sm md:text-base text-[#4A4644] leading-relaxed max-w-xl mb-12">
            Operational precision at scale. Explore how we deliver complex
            gifting and merchandise programs with zero vendor chaos.
          </p>

          {/* ---------- CASE STUDY GRID ---------- */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {CASE_STUDIES.map((study) => (
              <CaseStudyCard
                key={study.id}
                study={study}
                onEnquire={goToEnquiry}
              />
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default OurWork;