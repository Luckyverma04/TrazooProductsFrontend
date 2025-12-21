import { Send, User, Mail, Phone, Building, MapPin, Package } from "lucide-react";
import { useState, useEffect } from "react";
import axios from "axios";

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
      const res = await axios.post(`${API}/api/enquiry`, {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
        location: formData.location,
        lookingFor: formData.lookingFor,
      });

      if (res.data.success) {
        setAlert({
          type: "success",
          message: "Enquiry submitted successfully! Our team will contact you soon.",
        });

        setFormData({
          fullName: "",
          email: "",
          phone: "",
          company: "",
          location: "",
          lookingFor: "",
        });
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
    <section id="enquiry" className="py-20 px-6 bg-orange-50">
      <div className="max-w-4xl mx-auto">

        <h3 className="text-4xl font-bold text-center mb-4">
          Ready to Design Your <span className="text-orange-600">Next Welcome Kit?</span>
        </h3>

        <p className="text-center mb-8 text-gray-700">
          Share a few details and our team will get back to you.
        </p>

        {/* ✅ SUCCESS / ERROR ALERT */}
        {alert.message && (
          <div
            className={`p-4 text-center rounded-lg mb-6 font-semibold border ${
              alert.type === "success"
                ? "bg-green-100 text-green-800 border-green-400"
                : "bg-red-100 text-red-800 border-red-400"
            }`}
          >
            {alert.message}
          </div>
        )}

        <div className="bg-white p-8 rounded-2xl shadow-lg">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              <input
                type="text"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={(e) => handleChange("fullName", e.target.value)}
                className="border p-3 rounded-lg"
                required
              />

              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                className="border p-3 rounded-lg"
                required
              />

              <input
                type="text"
                placeholder="Phone"
                value={formData.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                className="border p-3 rounded-lg"
                required
              />

              <input
                type="text"
                placeholder="Company"
                value={formData.company}
                onChange={(e) => handleChange("company", e.target.value)}
                className="border p-3 rounded-lg"
              />

              <input
                type="text"
                placeholder="Location"
                value={formData.location}
                onChange={(e) => handleChange("location", e.target.value)}
                className="border p-3 rounded-lg"
              />

              <input
                type="text"
                placeholder="Looking For"
                value={formData.lookingFor}
                onChange={(e) => handleChange("lookingFor", e.target.value)}
                className="border p-3 rounded-lg"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="mt-8 w-full bg-orange-600 text-white py-4 rounded-lg font-semibold"
            >
              {isLoading ? "Submitting..." : "Submit Enquiry"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
