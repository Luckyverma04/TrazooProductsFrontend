import { Send, User, Mail, Phone, Building, MapPin, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";

const API = import.meta.env.VITE_API_URL;

const FinalCTA = () => {
  const [isVisible, setIsVisible] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    company: "",
    location: "",
    lookingFor: "",
  });

  const [alert, setAlert] = useState({ type: "", message: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setAlert({ type: "", message: "" });

    try {
      const response = await fetch(`${API}/api/enquiry`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
          location: formData.location,
          lookingFor: formData.lookingFor,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setShowModal(true);

        setFormData({
          fullName: "",
          email: "",
          phone: "",
          company: "",
          location: "",
          lookingFor: "",
        });

        setTimeout(() => {
          setShowModal(false);
        }, 4000);
      }
    } catch (error) {
      setAlert({
        type: "error",
        message: "Something went wrong. Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="enquiry" className="py-20 px-6 bg-gradient-to-br from-orange-50 to-orange-100">
      
      {/* SUCCESS MODAL POPUP */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl animate-bounce-in">
            <div className="text-center">
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Success!</h3>
              <p className="text-gray-600 mb-6">
                Enquiry submitted successfully! Our team will contact you soon.
              </p>
              <button
                onClick={() => setShowModal(false)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <div className={`max-w-4xl mx-auto transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        
        <h3 className="text-4xl font-bold text-center mb-4">
          Ready to Design Your <span className="text-orange-600">Next Welcome Kit?</span>
        </h3>

        <p className="text-center mb-8 text-gray-700">
          Share a few details and our team will get back to you.
        </p>

        {/* SUCCESS / ERROR ALERT */}
        {alert.message && (
          <div
            className={`p-4 text-center rounded-lg mb-6 font-semibold border ${
              alert.type === "success"
                ? "bg-green-50 text-green-700 border-green-300"
                : "bg-red-50 text-red-700 border-red-300"
            }`}
          >
            {alert.message}
          </div>
        )}

        <div className="bg-white p-8 rounded-2xl shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* FULL NAME */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-black mb-2">
                <User className="w-4 h-4 text-blue-500" />
                Full Name
              </label>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => handleChange("fullName", e.target.value)}
                className="w-full border border-gray-300 p-3 rounded-lg bg-blue-50 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>

            {/* EMAIL */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-black mb-2">
                <Mail className="w-4 h-4 text-blue-500" />
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                className="w-full border border-gray-300 p-3 rounded-lg bg-blue-50 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>

            {/* PHONE */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-black mb-2">
                <Phone className="w-4 h-4 text-blue-500" />
                Phone
              </label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                className="w-full border border-gray-300 p-3 rounded-lg bg-blue-50 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>

            {/* COMPANY */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-black mb-2">
                <Building className="w-4 h-4 text-blue-500" />
                Company
              </label>
              <input
                type="text"
                value={formData.company}
                onChange={(e) => handleChange("company", e.target.value)}
                className="w-full border border-gray-300 p-3 rounded-lg bg-blue-50 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* LOCATION */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-black mb-2">
                <MapPin className="w-4 h-4 text-blue-500" />
                Location
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => handleChange("location", e.target.value)}
                className="w-full border border-gray-300 p-3 rounded-lg bg-blue-50 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* LOOKING FOR */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-black mb-2">
                <Sparkles className="w-4 h-4 text-blue-500" />
                Looking For
              </label>
              <input
                type="text"
                value={formData.lookingFor}
                onChange={(e) => handleChange("lookingFor", e.target.value)}
                className="w-full border border-gray-300 p-3 rounded-lg bg-blue-50 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>

          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="mt-8 w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-lg font-semibold transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <Send className="w-5 h-5" />
            {isLoading ? "Submitting..." : "Submit Enquiry"}
          </button>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;