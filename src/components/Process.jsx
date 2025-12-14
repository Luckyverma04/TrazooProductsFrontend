import { CheckCircle2, Package, Palette, ClipboardCheck, Truck, Workflow } from 'lucide-react';
import { useState, useEffect } from 'react';

const Process = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const steps = [
    {
      icon: <ClipboardCheck className="w-8 h-8" />,
      title: "Share Your Requirement",
      description: "Tell us about your audience (employees / students), quantity, locations and budget.",
      color: "from-blue-50 to-blue-100",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600"
    },
    {
      icon: <Package className="w-8 h-8" />,
      title: "Kit Design & Curation",
      description: "Our team proposes kit options with mockups, product suggestions and pricing.",
      color: "from-purple-50 to-purple-100",
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600"
    },
    {
      icon: <Palette className="w-8 h-8" />,
      title: "Branding & Finalisation",
      description: "Once you select a direction, we lock in branding, artwork and packaging details.",
      color: "from-pink-50 to-pink-100",
      iconBg: "bg-pink-100",
      iconColor: "text-pink-600"
    },
    {
      icon: <CheckCircle2 className="w-8 h-8" />,
      title: "Production & Quality Check",
      description: "We source, print and assemble your kits, ensuring each piece meets our quality standards.",
      color: "from-green-50 to-green-100",
      iconBg: "bg-green-100",
      iconColor: "text-green-600"
    },
    {
      icon: <Truck className="w-8 h-8" />,
      title: "Dispatch & Delivery",
      description: "Kits are shipped to your office, campuses or individual addresses, with tracking and support along the way.",
      color: "from-orange-50 to-orange-100",
      iconBg: "bg-orange-100",
      iconColor: "text-orange-600"
    }
  ];

  return (
    <section
      id="process"
      className="py-20 px-6 bg-gradient-to-b from-slate-50 to-white"
    >
      <div className="max-w-6xl mx-auto">
        {/* Animated Badge */}
        {/* <div className={`flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-md mb-6 border border-purple-100 mx-auto w-fit transition-all duration-700 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <Workflow className="w-4 h-4 text-purple-600" />
          <span className="text-sm font-medium text-gray-700">How It Works (Process Section)</span>
        </div> */}

        {/* Header */}
        <div className="text-center mb-16">
          <h3 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            From Brief to Doorstep – Our Simple 5-Step Process
          </h3>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connection Line */}
          <div className="hidden md:block absolute top-20 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-200 via-purple-200 to-orange-200 opacity-50" 
               style={{ top: '80px' }}></div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative group">
                {/* Step Number Badge */}
                <div className="absolute -top-3 -left-3 w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg z-10">
                  {index + 1}
                </div>
                
                {/* Card */}
                <div className={`relative bg-gradient-to-br ${step.color} p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 h-full`}>
                  {/* Icon */}
                  <div className={`${step.iconBg} ${step.iconColor} w-16 h-16 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    {step.icon}
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA hint */}
        <div className="mt-16 text-center">
          <p className="text-gray-600 text-lg">
            Ready to get started? Let's create something amazing together! ✨
          </p>
        </div>
      </div>
    </section>
  );
};

export default Process;