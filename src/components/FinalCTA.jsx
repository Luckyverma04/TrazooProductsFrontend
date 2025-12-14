import { Send, User, Mail, Phone, Building, MapPin, Sparkles, Package } from 'lucide-react';
import { useState, useEffect } from 'react';
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

const FinalCTA = () => {
  const [isVisible, setIsVisible] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    location: '',
    lookingFor: '',
    quantity: ''
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
      await axios.post(`${API}/api/enquiry`, {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
        location: formData.location,
        lookingFor: formData.lookingFor
      });

      setShowSuccessModal(true);
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
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section
      id="enquiry"
      className="relative py-20 px-6 overflow-hidden bg-gradient-to-br from-orange-50 via-white to-orange-50"
    >
      {/* 🔥 SAME GLOBAL ORANGE BG */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" style={{ backgroundColor: '#e16f30' }}></div>
        <div className="absolute top-40 right-10 w-72 h-72 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-blob animation-delay-2000" style={{ backgroundColor: '#df4607' }}></div>
        <div className="absolute bottom-10 left-1/2 w-72 h-72 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" style={{ backgroundColor: '#e16f30' }}></div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">

        {/* 🔶 HEADING (BLACK + ORANGE ONLY) */}
        <div className="text-center mb-6">
          <h3 className="text-4xl md:text-5xl font-bold leading-tight">
            <span className="text-gray-900">Ready to Design Your</span>{" "}
            <span style={{ color: "#df4607" }}>Next Welcome Kit?</span>
          </h3>
        </div>

        {/* SUBTEXT (UNCHANGED) */}
        <p className="text-lg text-center max-w-2xl mx-auto opacity-95 leading-relaxed mb-10 text-gray-700">
          Share a few details and our team will get back to you with curated kit ideas,
          timelines and a customized quote.
        </p>

        {/* ALERT (UNCHANGED) */}
        {alert.message && (
          <div className="p-4 text-center rounded-lg mb-6 font-semibold bg-red-200 text-red-800 border border-red-400">
            {alert.message}
          </div>
        )}

        {/* FORM — 💯 SAME AS BEFORE */}
        <div className="bg-white text-gray-900 p-8 md:p-10 rounded-2xl shadow-2xl">
          <form onSubmit={handleSubmit}>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* FULL NAME */}
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

              {/* EMAIL */}
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

              {/* PHONE */}
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

              {/* COMPANY */}
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

              {/* LOCATION */}
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

              {/* LOOKING FOR */}
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

            {/* BUTTON — UNCHANGED */}
            <button
              type="submit"
              disabled={isLoading}
              className="mt-8 w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-4 rounded-lg hover:scale-[1.02] transition-all shadow-lg flex items-center justify-center gap-2"
            >
              {isLoading ? "Submitting..." : "Submit Enquiry"}
              <Send className="w-5 h-5" />
            </button>

          </form>
        </div>
      </div>

      <style>{`
        @keyframes blob {
          0%,100% { transform: translate(0,0) scale(1); }
          33% { transform: translate(30px,-50px) scale(1.1); }
          66% { transform: translate(-20px,20px) scale(0.9); }
        }
        .animate-blob { animation: blob 7s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
      `}</style>
    </section>
  );
};

export default FinalCTA;