import { Send, User, Mail, Phone, Building, MapPin, Sparkles, Package } from 'lucide-react';
import { useState, useEffect } from 'react';
import axios from "axios";

const FinalCTA = () => {
  const [isVisible, setIsVisible] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    location: '',
    lookingFor: '',
    quantity: '' // not sent to backend
  });

  const [alert, setAlert] = useState({ type: "", message: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setAlert({ type: "", message: "" });

    try {
      const res = await axios.post("http://localhost:5000/api/enquiry", {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
        location: formData.location,
        lookingFor: formData.lookingFor
      });

      // Show success modal
      setShowSuccessModal(true);

      // Reset form after success  
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        company: '',
        location: '',
        lookingFor: '',
        quantity: ''
      });

    } catch (error) {
      setAlert({ type: "error", message: "Something went wrong. Please try again later." });
      console.error(error);
      
      // Auto-clear error alert after 5 seconds
      setTimeout(() => setAlert({ type: "", message: "" }), 5000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section
      id="enquiry"
      className="py-20 px-6 bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 text-white relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>

      <div className="max-w-4xl mx-auto relative z-10">

        {/* Top Badge */}
        <div
          className={`flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full shadow-lg mb-6 border border-white/30 mx-auto w-fit transition-all duration-700 transform ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <Sparkles className="w-4 h-4 text-white" />
          <span className="text-sm font-medium text-white">Final CTA / Enquiry Section</span>
        </div>

        {/* Heading */}
        <div className="text-center mb-6">
          <h3 className="text-4xl md:text-5xl font-bold leading-tight">
            Ready to Design Your Next Welcome Kit?
          </h3>
        </div>

        {/* Sub text */}
        <p className="text-lg text-center max-w-2xl mx-auto opacity-95 leading-relaxed mb-10">
          Share a few basic details and our team will get back to you with curated kit ideas,
          timelines and a customised quote.
        </p>

        {/* Alert Message */}
        {alert.message && (
          <div
            className={`p-4 text-center rounded-lg mb-6 font-semibold ${
              alert.type === "success"
                ? "bg-green-200 text-green-800 border border-green-400"
                : "bg-red-200 text-red-800 border border-red-400"
            }`}
          >
            {alert.message}
          </div>
        )}

        {/* Form */}
        <div className="bg-white text-gray-900 p-8 md:p-10 rounded-2xl shadow-2xl">
          <form onSubmit={handleSubmit}>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* Full Name */}
              <div>
                <label className="font-semibold text-gray-700 flex items-center gap-2 mb-1">
                  <User className="w-4 h-4 text-blue-600" /> Full Name
                </label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => handleChange('fullName', e.target.value)}
                  className="w-full border-2 border-gray-200 rounded-lg p-3 focus:border-blue-500 outline-none"
                  required
                />
              </div>

              {/* Work Email */}
              <div>
                <label className="font-semibold text-gray-700 flex items-center gap-2 mb-1">
                  <Mail className="w-4 h-4 text-blue-600" /> Work Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  className="w-full border-2 border-gray-200 rounded-lg p-3 focus:border-blue-500 outline-none"
                  required
                />
              </div>

              {/* Phone */}
              <div>
                <label className="font-semibold text-gray-700 flex items-center gap-2 mb-1">
                  <Phone className="w-4 h-4 text-blue-600" /> Phone Number
                </label>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  className="w-full border-2 border-gray-200 rounded-lg p-3 focus:border-blue-500 outline-none"
                  required
                />
              </div>

              {/* Company */}
              <div>
                <label className="font-semibold text-gray-700 flex items-center gap-2 mb-1">
                  <Building className="w-4 h-4 text-blue-600" /> Company / Institute
                </label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => handleChange('company', e.target.value)}
                  className="w-full border-2 border-gray-200 rounded-lg p-3 focus:border-blue-500 outline-none"
                />
              </div>

              {/* Location */}
              <div>
                <label className="font-semibold text-gray-700 flex items-center gap-2 mb-1">
                  <MapPin className="w-4 h-4 text-blue-600" /> City / Location
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => handleChange('location', e.target.value)}
                  className="w-full border-2 border-gray-200 rounded-lg p-3 focus:border-blue-500 outline-none"
                />
              </div>

              {/* Looking For */}
              <div>
                <label className="font-semibold text-gray-700 flex items-center gap-2 mb-1">
                  <Package className="w-4 h-4 text-blue-600" /> What are you looking for?
                </label>
                <input
                  type="text"
                  value={formData.lookingFor}
                  onChange={(e) => handleChange('lookingFor', e.target.value)}
                  className="w-full border-2 border-gray-200 rounded-lg p-3 focus:border-blue-500 outline-none"
                />
              </div>

            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="mt-8 w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-4 rounded-lg hover:scale-[1.02] transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Submitting...</span>
                </>
              ) : (
                <>
                  Submit Enquiry
                  <Send className="w-5 h-5" />
                </>
              )}
            </button>

          </form>
        </div>

      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl transform animate-[scale-in_0.3s_ease-out] relative">
            
            {/* Close Button */}
            <button
              onClick={() => setShowSuccessModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Success Icon */}
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>

            {/* Success Message */}
            <h3 className="text-2xl font-bold text-gray-900 text-center mb-2">
              Thank You!
            </h3>
            <p className="text-gray-600 text-center mb-6 leading-relaxed">
              Your enquiry has been submitted successfully. Our team will contact you soon with curated kit ideas and a customized quote.
            </p>

            {/* Action Button */}
            <button
              onClick={() => setShowSuccessModal(false)}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 rounded-lg hover:scale-[1.02] transition-all shadow-lg"
            >
              Got it!
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default FinalCTA;