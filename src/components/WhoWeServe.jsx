import { Building2, GraduationCap, BookOpen, Users } from "lucide-react";
import { useEffect, useState } from "react";

const WhoWeServe = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const audiences = [
    {
      icon: <Building2 className="w-8 h-8" />,
      title: "Corporate HR & People Teams",
      description:
        "Employee welcome kits, festival gifts and milestone hampers.",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: "EdTechs & Training Companies",
      description:
        "Learner starter kits, programme kits and completion gifts.",
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
    },
    {
      icon: <GraduationCap className="w-8 h-8" />,
      title: "Colleges & Institutes",
      description:
        "Admission kits, orientation welcome kits and alumni gifting.",
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Founders & CXOs",
      description:
        "Curated joining kits and leadership-level gifting.",
      iconBg: "bg-orange-100",
      iconColor: "text-orange-600",
    },
  ];

  return (
    <section id="who-we-serve" className="py-20 px-6 relative">
      <div className="max-w-7xl mx-auto">

        {/* SECTION HEADING */}
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-bold leading-tight">
            <span className="text-gray-900">Trusted by HR, Admissions &</span>{" "}
            <span style={{ color: "#df4607" }}>People Teams</span>
          </h2>
        </div>

        {/* SUBTEXT */}
        <p className="text-lg text-gray-700 text-center max-w-3xl mx-auto mb-14">
          TRAZOO partners with organisations across industries to deliver
          meaningful onboarding and gifting experiences.
        </p>

        {/* 4 CARDS IN ONE ROW */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
          {audiences.map((audience, index) => (
            <div
              key={index}
              className={`bg-white/80 backdrop-blur p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-orange-200 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
            >
              {/* ICON (COLORFUL) */}
              <div
                className={`w-14 h-14 ${audience.iconBg} ${audience.iconColor} rounded-xl flex items-center justify-center mb-4`}
              >
                {audience.icon}
              </div>

              {/* TITLE */}
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                {audience.title}
              </h3>

              {/* DESCRIPTION */}
              <p className="text-gray-700 text-sm leading-relaxed">
                {audience.description}
              </p>
            </div>
          ))}
        </div>

        {/* CLOSING LINE */}
        <div className="bg-white/80 backdrop-blur p-8 rounded-2xl border border-orange-200 shadow-md">
          <p className="text-lg text-center leading-relaxed max-w-4xl mx-auto">
            <span className="text-gray-900">
              Whether you’re onboarding new employees, students or leadership teams,
            </span>{" "}
            <span style={{ color: "#df4607" }}>
              we scale seamlessly to match your growth.
            </span>
          </p>
        </div>

      </div>
    </section>
  );
};

export default WhoWeServe;
