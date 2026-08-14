import { ArrowRight } from "lucide-react";
import Footer from "../components/Footer";
import caseStudy1 from "../assets/Trazoo-office-1.png";
import caseStudy2 from "../assets/case-study-2.png";

// ================= CASE STUDIES DATA =================
const CASE_STUDIES = [
  {
    id: 1,
    title: "Case Study 1 (2,600 kits)",
    category: "Enterprise Rollout",
    categoryColor: "orange",
    requirement: "Onboarding Kits",
    quantity: "2,600 Units",
    timeline: "4 Weeks",
    locations: "Multiple Locations",
    image: caseStudy2,
  },
  {
    id: 2,
    title: "Case Study 2 (1,500+ kits)",
    category: "Holiday Program",
    categoryColor: "blue",
    requirement: "Premium Holiday Gifting",
    quantity: "1,500+ Units",
    timeline: "8 Weeks",
    locations: "8 Multiple Offices",
    image: caseStudy1
  },
];

// ================= PAGE =================
const OurWork = () => {
  return (
    <>
      <main className="bg-[#FFFDF9] min-h-screen">
        
        {/* ================= HERO ================= */}
        <section className="bg-[#FFFDF9] border-b border-[#DED8D2]">
          <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-14 xl:px-20 py-16 md:py-20">
            <h1 className="text-4xl md:text-5xl font-extrabold text-[#111111] mb-4">
              Our Work
            </h1>
            <p className="text-lg text-[#6E6A67] max-w-2xl">
              Operational precision at scale. Explore how we deliver complex gifting and merchandise programs with zero vendor chaos.
            </p>
          </div>
        </section>

        {/* ================= CASE STUDIES GRID ================= */}
        <section className="bg-[#FFFDF9] py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-14 xl:px-20">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {CASE_STUDIES.map((caseStudy) => (
                <div
                  key={caseStudy.id}
                  className="bg-white rounded-xl border border-[#DED8D2] overflow-hidden hover:shadow-lg transition-all"
                >
                  {/* Image */}
                  <div className="w-full h-64 bg-gray-200 overflow-hidden">
                    <img
                      src={caseStudy.image}
                      alt={caseStudy.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-6 md:p-8">
                    
                    {/* Category Badge */}
                    <span
                      className={`
                        inline-block px-3 py-1 rounded-full text-xs font-bold mb-4
                        ${
                          caseStudy.categoryColor === "orange"
                            ? "bg-orange-100 text-[#DF4607]"
                            : "bg-blue-100 text-blue-600"
                        }
                      `}
                    >
                      {caseStudy.category}
                    </span>

                    {/* Title */}
                    <h3 className="text-2xl font-bold text-[#111111] mb-6">
                      {caseStudy.title}
                    </h3>

                    {/* Details Grid */}
                    <div className="space-y-4 mb-8">
                      
                      {/* Requirement */}
                      <div>
                        <p
                          className={`
                            text-xs font-semibold uppercase mb-1
                            ${
                              caseStudy.categoryColor === "orange"
                                ? "text-[#DF4607]"
                                : "text-blue-600"
                            }
                          `}
                        >
                          Requirement
                        </p>
                        <p className="text-[#111111] font-semibold">
                          {caseStudy.requirement}
                        </p>
                      </div>

                      {/* Quantity */}
                      <div className="flex justify-between">
                        <div>
                          <p
                            className={`
                              text-xs font-semibold uppercase mb-1
                              ${
                                caseStudy.categoryColor === "orange"
                                  ? "text-[#DF4607]"
                                  : "text-blue-600"
                              }
                            `}
                          >
                            Quantity
                          </p>
                          <p className="text-[#111111] font-semibold">
                            {caseStudy.quantity}
                          </p>
                        </div>

                        {/* Timeline */}
                        <div>
                          <p
                            className={`
                              text-xs font-semibold uppercase mb-1
                              ${
                                caseStudy.categoryColor === "orange"
                                  ? "text-[#DF4607]"
                                  : "text-blue-600"
                              }
                            `}
                          >
                            Timeline
                          </p>
                          <p className="text-[#111111] font-semibold">
                            {caseStudy.timeline}
                          </p>
                        </div>
                      </div>

                      {/* Locations */}
                      <div>
                        <p
                          className={`
                            text-xs font-semibold uppercase mb-1
                            ${
                              caseStudy.categoryColor === "orange"
                                ? "text-[#DF4607]"
                                : "text-blue-600"
                            }
                          `}
                        >
                          Locations
                        </p>
                        <p className="text-[#111111] font-semibold">
                          {caseStudy.locations}
                        </p>
                      </div>

                    </div>

                    {/* Button */}
                    <button
                      className={`
                        flex items-center gap-2 font-semibold transition-all
                        ${
                          caseStudy.categoryColor === "orange"
                            ? "text-[#DF4607] hover:gap-3"
                            : "text-blue-600 hover:gap-3"
                        }
                      `}
                    >
                      View Case Study
                      <ArrowRight size={18} />
                    </button>

                  </div>

                </div>
              ))}
            </div>

          </div>
        </section>

      </main>

      <Footer />
    </>
  );
};

export default OurWork;