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

  // ✅ Validation
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);
  const isPhoneValid = /^[0-9]{10}$/.test(form.phone.replace(/\D/g, ""));

  const isValid =
    form.name.trim().length > 2 &&
    isEmailValid &&
    isPhoneValid;

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

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-xl border-2 border-gray-100 p-6 sm:p-8 md:p-10 mb-6 space-y-6">
          
          {/* Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Full Name *
            </label>
            <div className="relative">
              <User className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl"
              />
              {form.name.trim().length > 2 && (
                <CheckCircle2 className="absolute right-4 top-3.5 w-5 h-5 text-green-500" />
              )}
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email Address *
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="your@email.com"
                className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl"
              />
              {isEmailValid && (
                <CheckCircle2 className="absolute right-4 top-3.5 w-5 h-5 text-green-500" />
              )}
            </div>
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Phone Number *
            </label>
            <div className="relative">
              <Phone className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
              <input
                name="phone"
                type="tel"
                value={form.phone}
                onChange={handleChange}
                placeholder="9876543210"
                className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl"
              />
              {isPhoneValid && (
                <CheckCircle2 className="absolute right-4 top-3.5 w-5 h-5 text-green-500" />
              )}
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-4">
          <button onClick={onBack} className="flex-1 border py-3 rounded-xl">
            <ArrowLeft className="inline mr-2" /> Back
          </button>

          <button
            disabled={!isValid}
            onClick={() =>
              onNext({
                name: form.name.trim(),
                email: form.email.trim(),
                phone: form.phone.replace(/\D/g, ""),
              })
            }
            className="flex-1 bg-indigo-600 text-white py-3 rounded-xl disabled:opacity-50"
          >
            Continue <ArrowRight className="inline ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default StepUserDetails;
