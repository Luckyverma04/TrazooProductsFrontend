import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSEO } from "../hooks/useSEO";
import { seoMetadata } from "../utils/seo";
import {
  ArrowRight,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

import Footer from "./Footer";

// Company Logos
import LogoCompany1 from "../assets/Logo_company1.jpeg";
import LogoCompany2 from "../assets/Logo_company2.jpeg";
import LogoCompany3 from "../assets/Logo_company3.jpeg";
import LogoCompany4 from "../assets/Logo_company4.jpeg";
import LogoCompany5 from "../assets/Logo_company5.jpeg";
import Logo_company6 from "../assets/Logo_company7.png";

// Company logos data
const companies = [
  { name: "IIM Trichy", logo: LogoCompany1 },
  { name: "IIT Mandi", logo: LogoCompany2 },
  { name: "IIM Ranchi", logo: LogoCompany3 },
  { name: "UPRIO", logo: LogoCompany4 },
  { name: "IHUB DivyaSampark", logo: LogoCompany5 },
  { name: "Masai", logo: Logo_company6 },
];

// Duplicate companies for seamless carousel loop
const companiesWithDuplicate = [...companies, ...companies];

const Requirements = () => {
  useSEO(seoMetadata.requirements);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    companyName: "",
    numberOfRecipients: "",
    budget: "",
    timeline: "",
    category: "",
    requirements: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const [submitError, setSubmitError] = useState("");

  const API = import.meta.env.VITE_API_URL;

  // ==================================================
  // FORM SUBMIT
  // ==================================================

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitMessage("");
    setSubmitError("");

    // Validation
    if (!formData.fullName.trim()) {
      setSubmitError("Please enter your full name");
      return;
    }
    if (!formData.email.trim()) {
      setSubmitError("Please enter your email");
      return;
    }
    if (!formData.phone.trim()) {
      setSubmitError("Please enter your phone number");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`${API}/api/kit-enquiry`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          companyName: formData.companyName,
          numberOfRecipients: formData.numberOfRecipients
            ? Number(formData.numberOfRecipients)
            : undefined,
          budget: formData.budget,
          timeline: formData.timeline,
          category: formData.category,
          requirements: formData.requirements,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to submit");
      }

      setSubmitMessage(
        "✅ Thank you! We'll review your requirement and get back soon."
      );

      // Reset form
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        companyName: "",
        numberOfRecipients: "",
        budget: "",
        timeline: "",
        category: "",
        requirements: "",
      });

      // Scroll to success message
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 300);
    } catch (error) {
      setSubmitError(error.message || "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-[#FFFDF9]">

      {/* ==================================================
          HERO
      ================================================== */}

      <section className="bg-gradient-to-br from-[#FFFDF9] to-[#F5F0EA] border-b border-[#DED8D2] pt-28 pb-16 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-[#DF4607] text-xs font-semibold tracking-widest uppercase mb-4">
            Let's create something great
          </p>

          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-[#111111] mb-4">
            Share your requirement
          </h1>

          <p className="text-lg text-[#77716C] max-w-2xl mx-auto mb-8">
            Tell us what you need, and our team will work with you to create
            the perfect solution for your brand.
          </p>
        </div>
      </section>

      <main className="pb-20 px-6">
        <div className="max-w-7xl mx-auto">

          {/* ==================================================
              FORM SECTION
          ================================================== */}

          <section className="grid lg:grid-cols-[1fr_360px] gap-12 items-start -mt-16 relative z-10">

            {/* FORM */}

            <form
              onSubmit={handleSubmit}
              className="bg-white border border-[#E3DDD7] rounded-2xl p-6 md:p-10 shadow-lg"
            >

              {submitMessage && (
                <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm">
                  {submitMessage}
                </div>
              )}

              {submitError && (
                <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                  {submitError}
                </div>
              )}

              <h2 className="text-3xl font-bold mb-2">
                Tell us about your needs
              </h2>

              <p className="text-[#77716C] mb-8">
                The more details you share, the better we can tailor our
                solution for you.
              </p>

              {/* NAME & EMAIL */}

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <input
                  type="text"
                  name="fullName"
                  placeholder="Your Full Name"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full border border-[#D9D1CA] rounded-xl px-4 py-3 outline-none focus:border-[#DF4607]"
                  required
                />

                <input
                  type="email"
                  name="email"
                  placeholder="your.email@company.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border border-[#D9D1CA] rounded-xl px-4 py-3 outline-none focus:border-[#DF4607]"
                  required
                />
              </div>

              {/* PHONE & COMPANY */}

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <input
                  type="tel"
                  name="phone"
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full border border-[#D9D1CA] rounded-xl px-4 py-3 outline-none focus:border-[#DF4607]"
                  required
                />

                <input
                  type="text"
                  name="companyName"
                  placeholder="Your Company Name"
                  value={formData.companyName}
                  onChange={handleChange}
                  className="w-full border border-[#D9D1CA] rounded-xl px-4 py-3 outline-none focus:border-[#DF4607]"
                />
              </div>

              {/* RECIPIENTS & BUDGET */}

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <input
                  type="number"
                  name="numberOfRecipients"
                  placeholder="Number of Recipients (e.g., 100)"
                  value={formData.numberOfRecipients}
                  onChange={handleChange}
                  className="w-full border border-[#D9D1CA] rounded-xl px-4 py-3 outline-none focus:border-[#DF4607]"
                  min="1"
                />

                <select
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  className="w-full border border-[#D9D1CA] rounded-xl px-4 py-3 outline-none focus:border-[#DF4607]"
                >
                  <option value="">Select Budget Range</option>
                  <option value="under-500">Under ₹500 per unit</option>
                  <option value="500-1000">₹500 - ₹1,000</option>
                  <option value="1000-2500">₹1,000 - ₹2,500</option>
                  <option value="2500-plus">₹2,500+</option>
                  <option value="custom">Custom Budget</option>
                </select>
              </div>

              {/* TIMELINE & CATEGORY */}

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <select
                  name="timeline"
                  value={formData.timeline}
                  onChange={handleChange}
                  className="w-full border border-[#D9D1CA] rounded-xl px-4 py-3 outline-none focus:border-[#DF4607]"
                >
                  <option value="">When do you need this?</option>
                  <option value="urgent">Urgent (Within 7 days)</option>
                  <option value="2weeks">2 Weeks</option>
                  <option value="1month">1 Month</option>
                  <option value="flexible">Flexible Timeline</option>
                </select>

                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full border border-[#D9D1CA] rounded-xl px-4 py-3 outline-none focus:border-[#DF4607]"
                >
                  <option value="">Product Category</option>
                  <option value="apparel">Apparel</option>
                  <option value="drinkware">Drinkware</option>
                  <option value="stationery">Stationery</option>
                  <option value="bags">Bags</option>
                  <option value="electronics">Electronics & Tech</option>
                  <option value="travel">Travel</option>
                  <option value="wellness">Wellness</option>
                  <option value="food">Food & Hampers</option>
                  <option value="awards">Awards & Recognition</option>
                  <option value="merchandise">Event Merchandise</option>
                  <option value="packaging">Packaging</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* REQUIREMENTS */}

              <textarea
                name="requirements"
                placeholder="Describe your requirement in detail. What are you looking for? Any specific preferences for customization, colors, themes, or brand messaging?"
                value={formData.requirements}
                onChange={handleChange}
                rows="5"
                className="w-full border border-[#D9D1CA] rounded-xl px-4 py-3 outline-none focus:border-[#DF4607] resize-none mb-6"
              />

              {/* SUBMIT */}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#DF4607] hover:bg-[#C93E05] disabled:opacity-60 text-white font-semibold py-4 rounded-xl flex items-center justify-center gap-2 transition"
              >
                {isSubmitting ? "Submitting..." : "Submit Requirement"}

                {!isSubmitting && <ArrowRight size={18} />}
              </button>

            </form>

            {/* SIDE INFO */}

            <aside className="lg:sticky lg:top-28 space-y-6">

              <div className="bg-[#F5F0EA] rounded-2xl p-6">
                <p className="text-xs tracking-widest text-[#DF4607] font-semibold uppercase mb-4">
                  Quick Tips
                </p>

                <ul className="space-y-3 text-sm text-[#77716C]">
                  <li>✓ Be specific about your needs</li>
                  <li>✓ Share budget and timeline</li>
                  <li>✓ Mention customization preferences</li>
                  <li>✓ Add any reference images or ideas</li>
                </ul>
              </div>

              <div className="bg-white border border-[#DED8D2] rounded-2xl p-6">
                <p className="text-xs tracking-widest text-[#DF4607] font-semibold uppercase mb-4">
                  Contact Us
                </p>

                <div className="space-y-4">
                  <a
                    href="mailto:hello@trazooglobal.com"
                    className="flex items-center gap-3 text-sm hover:text-[#DF4607] transition"
                  >
                    <Mail size={18} className="text-[#DF4607]" />
                    <span>hello@trazooglobal.com</span>
                  </a>

                  <a
                    href="tel:+919876543210"
                    className="flex items-center gap-3 text-sm hover:text-[#DF4607] transition"
                  >
                    <Phone size={18} className="text-[#DF4607]" />
                    <span>+91 9876 543 210</span>
                  </a>

                  <div className="flex items-center gap-3 text-sm">
                    <MapPin size={18} className="text-[#DF4607]" />
                    <span>Bhopal, India</span>
                  </div>
                </div>
              </div>

            </aside>

          </section>

        </div>
      </main>

      {/* ================= TRUSTED BY / LOGOS - MOBILE CAROUSEL ================= */}
      <section className="bg-[#FFFDF9] border-t border-[#DED8D2] overflow-hidden">
        <div className="w-full py-14 md:py-16">

          {/* Heading */}
          <div className="text-center px-6 mb-10 md:mb-12">
            <p className="text-xs md:text-sm font-bold uppercase tracking-[0.18em] text-[#DF4607]">
              Trusted by Leading Organizations
            </p>

            <h2 className="mt-3 text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-[-0.03em] text-[#111111]">
              Trusted by teams that value quality
            </h2>

            <p className="mt-3 max-w-2xl mx-auto text-sm md:text-base leading-6 text-[#6E6A67]">
              Organizations trust Trazoo for reliable gifting, merchandise and
              end-to-end fulfilment.
            </p>
          </div>

          {/* Logos */}
          <div className="w-full overflow-hidden">
            {/* Mobile: Carousel Animation - FASTER with SPACING */}
            <div className="md:hidden">
              <div className="mobile-carousel scrollbar-hide">
                {companiesWithDuplicate.map((company, i) => (
                  <div
                    key={i}
                    className="mobile-carousel-item flex items-center justify-center shrink-0"
                  >
                    <img
                      src={company.logo}
                      alt={company.name}
                      className="
                        h-12
                        w-auto
                        max-w-[120px]
                        object-contain
                        border-0
                        outline-none
                        shadow-none
                        transition-transform duration-300
                        hover:scale-105
                      "
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Desktop: Static Grid (NO Animation) */}
            <div className="hidden md:block">
              <div className="flex items-center justify-center flex-wrap gap-10 md:gap-14 lg:gap-16 px-6">
                {companies.map((company, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-center"
                  >
                    <img
                      src={company.logo}
                      alt={company.name}
                      className="
                        h-14
                        md:h-16
                        lg:h-[68px]
                        w-auto
                        max-w-[150px]
                        md:max-w-[170px]
                        lg:max-w-[180px]
                        object-contain
                        border-0
                        outline-none
                        shadow-none
                        transition-transform duration-300
                        hover:scale-105
                      "
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Requirements;