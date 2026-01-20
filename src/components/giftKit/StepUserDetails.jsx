import { useState } from "react";
import { User, Mail, Phone, ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";

const StepUserDetails = ({ onNext, onBack, initialData }) => {
  const [form, setForm] = useState({
    name: initialData?.name || "",
    email: initialData?.email || "",
    phone: initialData?.phone || "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const isValid =
    form.name.trim() &&
    form.email.trim() &&
    form.phone.trim();

  return (
    <div className="w-full h-screen overflow-y-auto bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        
        {/* Header */}
        <div className="text-center mb-8 sm:mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl mb-4 shadow-lg">
            <User className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Your Contact Details
          </h2>
          <p className="text-sm sm:text-base text-gray-600">
            We'll use this information to send you the quote
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl border-2 border-gray-100 p-6 sm:p-8 md:p-10 mb-6">
          <div className="space-y-5 sm:space-y-6">
            
            {/* Name Field */}
            <div className="group">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Full Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className={`w-5 h-5 transition-colors ${form.name ? 'text-indigo-600' : 'text-gray-400'}`} />
                </div>
                <input
                  name="name"
                  placeholder="Enter your full name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-400
                    focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none transition-all duration-200
                    hover:border-gray-300"
                />
                {form.name.trim() && (
                  <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                  </div>
                )}
              </div>
            </div>

            {/* Email Field */}
            <div className="group">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className={`w-5 h-5 transition-colors ${form.email ? 'text-indigo-600' : 'text-gray-400'}`} />
                </div>
                <input
                  name="email"
                  type="email"
                  placeholder="your@email.com"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-400
                    focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none transition-all duration-200
                    hover:border-gray-300"
                />
                {form.email.trim() && (
                  <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                  </div>
                )}
              </div>
            </div>

            {/* Phone Field */}
            <div className="group">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Phone className={`w-5 h-5 transition-colors ${form.phone ? 'text-indigo-600' : 'text-gray-400'}`} />
                </div>
                <input
                  name="phone"
                  type="tel"
                  placeholder="+91 XXXXX XXXXX"
                  value={form.phone}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-400
                    focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none transition-all duration-200
                    hover:border-gray-300"
                />
                {form.phone.trim() && (
                  <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                  </div>
                )}
              </div>
            </div>

          </div>

          {/* Info Box */}
          <div className="mt-6 p-4 bg-indigo-50 border border-indigo-200 rounded-xl">
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-indigo-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-xs font-bold">i</span>
              </div>
              <p className="text-xs sm:text-sm text-indigo-900">
                Your information is secure and will only be used to send you the quotation and follow-up communications.
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <button
            onClick={onBack}
            className="w-full sm:flex-1 border-2 border-gray-300 text-gray-700 py-3.5 rounded-xl font-semibold 
              hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 flex items-center justify-center gap-2
              active:scale-[0.98] shadow-sm"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>

          <button
            disabled={!isValid}
            onClick={() => onNext(form)}
            className="w-full sm:flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3.5 rounded-xl font-semibold 
              disabled:opacity-50 disabled:cursor-not-allowed disabled:from-gray-400 disabled:to-gray-400
              hover:shadow-xl hover:scale-[1.02] transition-all duration-200 active:scale-[0.98]
              flex items-center justify-center gap-2 shadow-lg"
          >
            <span>Continue</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Indicator */}
        {isValid && (
          <div className="mt-6 text-center">
            <p className="text-sm text-green-600 font-medium flex items-center justify-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              All fields completed! Ready to continue.
            </p>
          </div>
        )}

      </div>
    </div>
  );
};

export default StepUserDetails;