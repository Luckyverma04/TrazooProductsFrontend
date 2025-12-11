import { Building2, GraduationCap, BookOpen, Users, Sparkles } from 'lucide-react';
import { useState, useEffect } from 'react';

const WhoWeServe = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const audiences = [
    {
      icon: <Building2 className="w-8 h-8" />,
      title: "Corporate HR & People Teams",
      description: "Employee welcome kits, festival gifts and milestone hampers.",
      color: "from-blue-50 to-cyan-50",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      borderColor: "border-blue-200"
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: "EdTechs & Training Companies",
      description: "Learner starter kits, programme kits and completion gifts.",
      color: "from-purple-50 to-pink-50",
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
      borderColor: "border-purple-200"
    },
    {
      icon: <GraduationCap className="w-8 h-8" />,
      title: "Colleges & Institutes",
      description: "Admission kits, orientation welcome kits and alumni gifting.",
      color: "from-green-50 to-emerald-50",
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
      borderColor: "border-green-200"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Founders & CXOs",
      description: "Curated joining kits and leadership-level gifting.",
      color: "from-orange-50 to-amber-50",
      iconBg: "bg-orange-100",
      iconColor: "text-orange-600",
      borderColor: "border-orange-200"
    }
  ];

  return (
    <section
      id="who-we-serve"
      className="py-20 px-6 bg-gradient-to-b from-white to-slate-50"
    >
      <div className="max-w-6xl mx-auto">
        {/* Animated Badge */}
        <div className={`flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-md mb-6 border border-purple-100 mx-auto w-fit transition-all duration-700 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <Sparkles className="w-4 h-4 text-purple-600" />
          <span className="text-sm font-medium text-gray-700">Who We Serve</span>
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <h3 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            Trusted by HR, Admissions & People Teams
          </h3>
        </div>

        {/* Intro Text */}
        <p className="text-lg text-gray-700 text-center max-w-3xl mx-auto leading-relaxed mb-12">
          TRAZOO partners with:
        </p>

        {/* Audience Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {audiences.map((audience, index) => (
            <div
              key={index}
              className={`group relative bg-gradient-to-br ${audience.color} p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border ${audience.borderColor}`}
            >
              {/* Decorative corner accent */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-white/40 to-transparent rounded-bl-full"></div>
              
              {/* Icon */}
              <div className={`${audience.iconBg} ${audience.iconColor} w-16 h-16 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-sm`}>
                {audience.icon}
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {audience.title}
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {audience.description}
              </p>
            </div>
          ))}
        </div>

        {/* Closing Statement */}
        <div className="bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 p-8 rounded-2xl border border-purple-100 shadow-md">
          <p className="text-lg text-gray-700 text-center leading-relaxed max-w-3xl mx-auto">
            Whether you're running multiple cohorts across cities or onboarding a new batch every month, 
            we build a kit programme that keeps pace with your growth.
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhoWeServe;