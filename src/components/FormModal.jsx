import { useState } from "react";
import { X } from "lucide-react";
import API from "../config/api";

const FormModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    programme: "Employee Onboarding",
    qty: "",
    deadline: "",
    brief: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const payload = {
        name: formData.name,
        company: formData.company,
        email: formData.email,
        phone: formData.phone,
        programme: formData.programme,
        qty: formData.qty ? parseInt(formData.qty) : null,
        deadline: formData.deadline || null,
        brief: formData.brief,
      };

      await API.post("/api/proposal-requests", payload);

      setSubmitMessage("✓ Requirement received! We'll be in touch within 1 working day.");
      setFormData({
        name: "",
        company: "",
        email: "",
        phone: "",
        programme: "Employee Onboarding",
        qty: "",
        deadline: "",
        brief: "",
      });

      // Auto close after 2 seconds
      setTimeout(() => {
        onClose();
        setSubmitMessage("");
      }, 2000);
    } catch (error) {
      console.error("Submission error:", error);
      setSubmitMessage(
        `❌ ${error.response?.data?.message || "Error submitting. Please try again."}`
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40 transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal - Slide in from right */}
      <div className="fixed right-0 top-0 h-full w-full max-w-xl bg-white z-50 shadow-2xl overflow-y-auto transform transition-transform duration-300">
        {/* Header */}
        <div className="sticky top-0 relative overflow-hidden bg-[#B95816] p-6 md:p-8">
          {/* Leather/warm texture overlay */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_20%_30%,rgba(255,255,255,0.12),transparent_28%),radial-gradient(circle_at_75%_60%,rgba(80,25,0,0.16),transparent_35%),linear-gradient(110deg,#C9681E,#A94B0D,#C15D13)]"
          />

          <button
            onClick={onClose}
            className="absolute top-6 right-6 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-white hover:bg-white/25 transition-colors"
            aria-label="Close"
          >
            <X size={20} />
          </button>

          <div className="relative">
            <p className="text-sm font-semibold uppercase tracking-widest text-white/80 mb-2">
              Request a proposal
            </p>
            <h2 className="text-3xl md:text-4xl font-light text-white mb-3">
              Give us the requirement.
            </h2>
            <p className="text-base text-white/70">
              We come back with a curated shortlist and a committed delivery plan.
            </p>
          </div>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
          {/* Row 1: Name & Company */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-[#111111] mb-2">
                Your name <span className="text-[#F36F21]">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Full name"
                required
                className="w-full px-4 py-3 border border-[#E8E8E8] rounded-lg focus:outline-none focus:border-[#F36F21] transition-colors bg-white"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#111111] mb-2">
                Company <span className="text-[#F36F21]">*</span>
              </label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="Company name"
                required
                className="w-full px-4 py-3 border border-[#E8E8E8] rounded-lg focus:outline-none focus:border-[#F36F21] transition-colors bg-white"
              />
            </div>
          </div>

          {/* Row 2: Email & Phone */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-[#111111] mb-2">
                Work email <span className="text-[#F36F21]">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@company.com"
                required
                className="w-full px-4 py-3 border border-[#E8E8E8] rounded-lg focus:outline-none focus:border-[#F36F21] transition-colors bg-white"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#111111] mb-2">
                Phone <span className="text-[#F36F21]">*</span>
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+91"
                required
                className="w-full px-4 py-3 border border-[#E8E8E8] rounded-lg focus:outline-none focus:border-[#F36F21] transition-colors bg-white"
              />
            </div>
          </div>

          {/* Programme */}
          <div>
            <label className="block text-sm font-semibold text-[#111111] mb-2">
              What is the programme?
            </label>
            <select
              name="programme"
              value={formData.programme}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-[#E8E8E8] rounded-lg focus:outline-none focus:border-[#F36F21] transition-colors bg-white"
            >
              <option>Employee Onboarding</option>
              <option>Festive Gifting</option>
              <option>Rewards & Recognition</option>
              <option>Events & Conferences</option>
              <option>Client & Partner Gifting</option>
              <option>Institutional Gifting</option>
              <option>Something else</option>
            </select>
          </div>

          {/* Row 3: Quantity & Deadline */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-[#111111] mb-2">
                Approximate quantity
              </label>
              <input
                type="text"
                name="qty"
                value={formData.qty}
                onChange={handleChange}
                placeholder="e.g. 500"
                className="w-full px-4 py-3 border border-[#E8E8E8] rounded-lg focus:outline-none focus:border-[#F36F21] transition-colors bg-white"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#111111] mb-2">
                Needed by
              </label>
              <input
                type="date"
                name="deadline"
                value={formData.deadline}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-[#E8E8E8] rounded-lg focus:outline-none focus:border-[#F36F21] transition-colors bg-white"
              />
            </div>
          </div>

          {/* Brief */}
          <div>
            <label className="block text-sm font-semibold text-[#111111] mb-2">
              Anything else?
            </label>
            <textarea
              name="brief"
              value={formData.brief}
              onChange={handleChange}
              placeholder="Budget range, audience, delivery cities…"
              rows="4"
              className="w-full px-4 py-3 border border-[#E8E8E8] rounded-lg focus:outline-none focus:border-[#F36F21] transition-colors resize-none bg-white"
            ></textarea>
          </div>

          {/* Error/Success Message */}
          {submitMessage && (
            <div className={`p-4 rounded-lg text-sm ${
              submitMessage.includes("✓")
                ? "bg-green-50 text-green-700"
                : "bg-red-50 text-red-700"
            }`}>
              {submitMessage}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 bg-gradient-to-r from-[#F36F21] to-[#FF8C42] text-white font-semibold rounded-lg hover:shadow-lg transition-all disabled:opacity-50"
          >
            {isSubmitting ? "Sending..." : "Send the requirement"}
          </button>

          {/* Assurances */}
          <ul className="space-y-3 pt-4 border-t border-[#E8E8E8]">
            <li className="flex items-center gap-3 text-sm text-[#6B6B6B]">
              <span className="text-[#F36F21]">✓</span>
              Reply within 1 working day
            </li>
            <li className="flex items-center gap-3 text-sm text-[#6B6B6B]">
              <span className="text-[#F36F21]">📞</span>
              <a href="tel:+917024804838" className="hover:text-[#F36F21]">
                +91 70248 04838
              </a>
            </li>
          </ul>
        </form>
      </div>
    </>
  );
};

export default FormModal;