import {
  Send,
  User,
  Mail,
  Phone,
  Building,
  MapPin,
  Sparkles,
} from "lucide-react";
import { useState, useEffect } from "react";
import GiftKitModal from "./giftKit/GiftKitModal";

const API = import.meta.env.VITE_API_URL;

const FinalCTA = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showModal, setShowModal] = useState(false);

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
      const response = await fetch(`${API}/api/enquiry`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
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
    <section
      id="enquiry"
      className="py-20 px-6 bg-gradient-to-br from-orange-50 to-orange-100"
    >
      ================= BUILD KIT BUTTON =================
      {/* <div className="flex justify-center mb-12">
        <button
          onClick={() => setShowModal(true)}
          className="group flex items-center gap-3 bg-black text-white px-10 py-5 rounded-2xl font-semibold text-lg
                     transition-all duration-300 ease-out
                     hover:bg-gray-900 hover:scale-105 hover:shadow-2xl"
        >
          <Sparkles className="w-6 h-6 transition-transform duration-300 group-hover:rotate-12" />
          Build Your Gift Kit
        </button>
      </div> */}

      {/* ================= GIFT KIT MODAL ================= */}
      <GiftKitModal isOpen={showModal} onClose={() => setShowModal(false)} />

      {/* ================= ENQUIRY FORM ================= */}
      <div
        className={`max-w-4xl mx-auto transition-opacity duration-1000 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <h3 className="text-4xl font-bold text-center mb-4">
          Ready to Design Your{" "}
          <span className="text-orange-600">Next Welcome Kit?</span>
        </h3>

        <p className="text-center mb-8 text-gray-700">
          Share a few details and our team will get back to you.
        </p>

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
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {/* FULL NAME */}
            <InputField
              icon={<User />}
              label="Full Name"
              value={formData.fullName}
              onChange={(e) => handleChange("fullName", e.target.value)}
            />

            {/* EMAIL */}
            <InputField
              icon={<Mail />}
              label="Email"
              type="email"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
            />

            {/* PHONE */}
            <InputField
              icon={<Phone />}
              label="Phone"
              value={formData.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
            />

            {/* COMPANY */}
            <InputField
              icon={<Building />}
              label="Company"
              value={formData.company}
              onChange={(e) => handleChange("company", e.target.value)}
            />

            {/* LOCATION */}
            <InputField
              icon={<MapPin />}
              label="Location"
              value={formData.location}
              onChange={(e) => handleChange("location", e.target.value)}
            />

            {/* LOOKING FOR */}
            <InputField
              icon={<Sparkles />}
              label="Looking For"
              value={formData.lookingFor}
              onChange={(e) => handleChange("lookingFor", e.target.value)}
            />
          </form>

          <button
            disabled={isLoading}
            onClick={handleSubmit}
            className="mt-8 w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-lg
                       font-semibold transition-all duration-200
                       hover:shadow-xl disabled:opacity-50"
          >
            {isLoading ? "Submitting..." : "Submit Enquiry"}
          </button>
        </div>
      </div>
    </section>
  );
};

/* ================= INPUT FIELD COMPONENT ================= */

const InputField = ({ icon, label, type = "text", value, onChange }) => (
  <div>
    <label className="flex items-center gap-2 text-sm font-medium text-black mb-2">
      <span className="w-4 h-4 text-blue-500">{icon}</span>
      {label}
    </label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      className="w-full border border-gray-300 p-3 rounded-lg bg-blue-50
                 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
      required={label !== "Company" && label !== "Location"}
    />
  </div>
);

export default FinalCTA;
