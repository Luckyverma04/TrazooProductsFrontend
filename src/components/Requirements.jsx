import { useState } from "react";
import {
  Package,
  MapPin,
  Pencil,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
} from "lucide-react";

const API = import.meta.env.VITE_API_URL;

const Requirements = () => {
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    fullName: "",
    company: "",
    email: "",
    phone: "",

    // Step 1
    requirement: "",
    quantity: "",
    requiredBy: "",

    // Step 2
    overallBudget: "",
    deliveryRequirement: "",
  });

  const [alert, setAlert] = useState({
    type: "",
    message: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  // ==================================================
  // HANDLE INPUT CHANGE
  // ==================================================

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // ==================================================
  // STEP 1 → STEP 2
  // ==================================================

  const handleContinue = (e) => {
    e.preventDefault();

    setAlert({
      type: "",
      message: "",
    });

    if (
      !formData.fullName.trim() ||
      !formData.company.trim() ||
      !formData.email.trim() ||
      !formData.phone.trim()
    ) {
      setAlert({
        type: "error",
        message: "Please fill all required details.",
      });

      return;
    }

    setStep(2);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // ==================================================
  // STEP 2 → SUBMIT
  // ==================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setAlert({
      type: "",
      message: "",
    });

    if (!formData.overallBudget) {
      setAlert({
        type: "error",
        message: "Please select your overall budget.",
      });

      return;
    }

    if (!formData.deliveryRequirement) {
      setAlert({
        type: "error",
        message: "Please select your delivery requirement.",
      });

      return;
    }

    setIsLoading(true);

    try {
      const payload = {
        fullName: formData.fullName,
        company: formData.company,
        email: formData.email,
        phone: formData.phone,

        // Existing backend field
        lookingFor: formData.requirement,

        // New requirement fields
        requirement: formData.requirement,

        quantity: formData.quantity
          ? Number(formData.quantity)
          : null,

        requiredBy: formData.requiredBy
          ? formData.requiredBy
          : null,

        overallBudget: formData.overallBudget,

        deliveryRequirement:
          formData.deliveryRequirement,
      };

      const response = await fetch(`${API}/api/enquiry`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.message ||
            "Failed to submit requirement."
        );
      }

      // ================================================
      // SUCCESS
      // ================================================

      setAlert({
        type: "success",
        message:
          "Requirement submitted successfully!",
      });

      // Reset form after successful submission
      setFormData({
        fullName: "",
        company: "",
        email: "",
        phone: "",
        requirement: "",
        quantity: "",
        requiredBy: "",
        overallBudget: "",
        deliveryRequirement: "",
      });

      // Go back to Step 1
      setStep(1);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } catch (error) {
      console.error(
        "Requirement submission error:",
        error
      );

      setAlert({
        type: "error",
        message:
          error.message ||
          "Something went wrong. Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // ==================================================
  // BACK TO STEP 1
  // ==================================================

  const handleBack = () => {
    setAlert({
      type: "",
      message: "",
    });

    setStep(1);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <main className="min-h-screen bg-[#FFFDF9] pt-28 pb-20 px-6">
      <div className="max-w-7xl mx-auto">

        {/* ==================================================
            STEP 1
        ================================================== */}

        {step === 1 && (
          <div className="grid lg:grid-cols-[1.55fr_0.75fr] gap-12">

            {/* ================= LEFT ================= */}

            <div>
              <p className="text-[#DF4607] text-xs font-semibold tracking-wide mb-3">
                STEP 1 OF 2
              </p>

              <h1 className="text-4xl md:text-5xl font-bold text-[#111111] leading-tight">
                Share Your Requirement
              </h1>

              <p className="text-[#8A817A] mt-3 mb-9">
                Tell us what you need. We'll take it from there.
              </p>

              {/* ALERT */}

              {alert.message && (
                <Alert
                  type={alert.type}
                  message={alert.message}
                />
              )}

              <form
                onSubmit={handleContinue}
                className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-5"
              >

                {/* FULL NAME */}

                <InputField
                  label="Full Name"
                  placeholder="John Doe"
                  value={formData.fullName}
                  onChange={(e) =>
                    handleChange(
                      "fullName",
                      e.target.value
                    )
                  }
                  required
                />

                {/* COMPANY */}

                <InputField
                  label="Company / Organisation"
                  placeholder="Company / Organisation"
                  value={formData.company}
                  onChange={(e) =>
                    handleChange(
                      "company",
                      e.target.value
                    )
                  }
                  required
                />

                {/* EMAIL */}

                <InputField
                  label="Work Email"
                  type="email"
                  placeholder="john@company.com"
                  value={formData.email}
                  onChange={(e) =>
                    handleChange(
                      "email",
                      e.target.value
                    )
                  }
                  required
                />

                {/* PHONE */}

                <InputField
                  label="Phone Number"
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={(e) =>
                    handleChange(
                      "phone",
                      e.target.value
                    )
                  }
                  required
                />

                {/* REQUIREMENT */}

                <div className="md:col-span-2">
                  <label className="block text-xs text-[#222222] mb-2">
                    Requirement
                  </label>

                  <textarea
                    rows={4}
                    placeholder="Describe what you're looking for..."
                    value={formData.requirement}
                    onChange={(e) =>
                      handleChange(
                        "requirement",
                        e.target.value
                      )
                    }
                    className="w-full bg-white border border-[#D8D2CC] rounded-lg px-4 py-3 text-sm text-[#222222] placeholder:text-[#9CA3AF] outline-none focus:border-[#DF4607] resize-none transition-colors"
                  />
                </div>

                {/* QUANTITY */}

                <InputField
                  label="Approximate Quantity"
                  type="number"
                  placeholder="e.g. 500"
                  value={formData.quantity}
                  onChange={(e) =>
                    handleChange(
                      "quantity",
                      e.target.value
                    )
                  }
                  min="1"
                />

                {/* REQUIRED BY */}

                <InputField
                  label="Required By"
                  type="date"
                  value={formData.requiredBy}
                  onChange={(e) =>
                    handleChange(
                      "requiredBy",
                      e.target.value
                    )
                  }
                />

                {/* CONTINUE */}

                <div className="md:col-span-2 pt-2">
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 bg-[#DF4607] hover:bg-[#C93E05] text-white px-8 py-3.5 rounded-lg font-semibold text-sm transition-all duration-200"
                  >
                    Continue
                    <ArrowRight size={18} />
                  </button>
                </div>
              </form>
            </div>

            {/* ================= RIGHT ================= */}

            <WhyTrazoo />
          </div>
        )}

        {/* ==================================================
            STEP 2
        ================================================== */}

        {step === 2 && (
          <div className="max-w-7xl mx-auto">

            <p className="text-[#DF4607] text-xs font-semibold tracking-wide mb-3">
              STEP 2 OF 2
            </p>

            <h1 className="text-4xl md:text-5xl font-bold text-[#111111] leading-tight">
              Share Your Requirement
            </h1>

            <p className="text-[#8A817A] text-base md:text-lg mt-3 mb-10">
              Tell us what you need, and our enterprise
              fulfillment team will handle the rest.
            </p>

            {/* TRUST CARD */}

            <div className="border border-[#DED8D2] rounded-xl p-6 mb-12 flex items-center gap-5 bg-[#FFFDF9]">

              <div className="w-16 h-16 shrink-0 rounded-full bg-white shadow-sm flex items-center justify-center">
                <Package
                  size={28}
                  strokeWidth={2}
                  className="text-[#DF4607]"
                />
              </div>

              <div>
                <h3 className="text-lg font-semibold text-[#222222]">
                  Enterprise Trusted
                </h3>

                <p className="text-base md:text-lg text-[#756E68]">
                  30,000+ Kits Shipped Successfully
                </p>
              </div>
            </div>

            {/* ALERT */}

            {alert.message && (
              <div className="mb-8">
                <Alert
                  type={alert.type}
                  message={alert.message}
                />
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              className="space-y-8"
            >

              {/* OVERALL BUDGET */}

              <div>
                <label className="block text-lg text-[#222222] mb-2">
                  Overall Budget
                </label>

                <select
                  value={formData.overallBudget}
                  onChange={(e) =>
                    handleChange(
                      "overallBudget",
                      e.target.value
                    )
                  }
                  required
                  className="w-full h-[62px] bg-white border border-[#9E9994] px-5 text-lg text-[#222222] outline-none focus:border-[#DF4607] transition-colors"
                >
                  <option value="">
                    Select a range
                  </option>

                  <option value="UNDER_50K">
                    Under ₹50,000
                  </option>

                  <option value="50K_1L">
                    ₹50,000 - ₹1 Lakh
                  </option>

                  <option value="1L_5L">
                    ₹1 Lakh - ₹5 Lakhs
                  </option>

                  <option value="5L_10L">
                    ₹5 Lakhs - ₹10 Lakhs
                  </option>

                  <option value="ABOVE_10L">
                    Above ₹10 Lakhs
                  </option>
                </select>
              </div>

              {/* DELIVERY REQUIREMENT */}

              <div>
                <label className="block text-lg text-[#222222] mb-2">
                  Delivery Requirements
                </label>

                <select
                  value={formData.deliveryRequirement}
                  onChange={(e) =>
                    handleChange(
                      "deliveryRequirement",
                      e.target.value
                    )
                  }
                  required
                  className="w-full h-[62px] bg-white border border-[#9E9994] px-5 text-lg text-[#222222] outline-none focus:border-[#DF4607] transition-colors"
                >
                  <option value="">
                    Select delivery requirement
                  </option>

                  <option value="PAN_INDIA">
                    Pan India Delivery
                  </option>

                  <option value="SINGLE_LOCATION">
                    Single Location
                  </option>

                  <option value="MULTIPLE_LOCATIONS">
                    Multiple Locations
                  </option>

                  <option value="INTERNATIONAL">
                    International Delivery
                  </option>
                </select>
              </div>

              {/* BUTTONS */}

              <div className="flex flex-col sm:flex-row gap-4 pt-2">

                {/* BACK */}

                <button
                  type="button"
                  onClick={handleBack}
                  disabled={isLoading}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg border border-[#D8D2CC] bg-white text-[#222222] font-semibold text-sm hover:bg-[#F7F2EC] transition-colors disabled:opacity-50"
                >
                  <ArrowLeft size={18} />
                  Back
                </button>

                {/* SUBMIT */}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-[#DF4607] hover:bg-[#C93E05] text-white font-semibold text-sm transition-colors disabled:opacity-50"
                >
                  {isLoading
                    ? "Submitting..."
                    : "Submit Requirement"}

                  {!isLoading && (
                    <CheckCircle2 size={18} />
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </main>
  );
};

/* ======================================================
   INPUT FIELD
====================================================== */

const InputField = ({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  required = false,
  min,
}) => {
  return (
    <div>
      <label className="block text-xs text-[#222222] mb-2">
        {label}
      </label>

      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        min={min}
        className="w-full h-[48px] bg-white border border-[#D8D2CC] rounded-lg px-4 text-sm text-[#222222] placeholder:text-[#9CA3AF] outline-none focus:border-[#DF4607] transition-colors"
      />
    </div>
  );
};

/* ======================================================
   ALERT
====================================================== */

const Alert = ({ type, message }) => {
  const isSuccess = type === "success";

  return (
    <div
      className={`p-4 rounded-lg border mb-6 text-sm font-medium ${
        isSuccess
          ? "bg-green-50 text-green-700 border-green-200"
          : "bg-red-50 text-red-700 border-red-200"
      }`}
    >
      {message}
    </div>
  );
};

/* ======================================================
   WHY TRAZOO
====================================================== */

const WhyTrazoo = () => {
  return (
    <aside className="bg-[#F7F2EC] border border-[#DED8D2] rounded-xl p-7 h-fit">

      <h2 className="text-2xl font-semibold text-[#111111] mb-8">
        Why Trazoo?
      </h2>

      <div className="space-y-7">

        <InfoItem
          icon={<Package size={19} />}
          title="30,000+ Kits shipped"
          description="Delivered in the last year alone."
        />

        <InfoItem
          icon={<MapPin size={19} />}
          title="12,000+ PIN codes reached"
          description="Pan-India fulfilment and shipment visibility."
        />

        <InfoItem
          icon={<Pencil size={19} />}
          title="Custom Branding"
          description="Premium logo placement and Custom packaging options for every gift."
        />
      </div>

      <div className="border-t border-[#DED8D2] mt-8 pt-6">

        <p className="text-[10px] tracking-[0.2em] text-[#8A817A] mb-4">
          TRUSTED BY
        </p>

        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-[#756E68]">
          <span>Infosys</span>
          <span>HCLTech</span>
          <span>Amazon</span>
          <span>Flipkart</span>
        </div>
      </div>
    </aside>
  );
};

/* ======================================================
   INFO ITEM
====================================================== */

const InfoItem = ({
  icon,
  title,
  description,
}) => {
  return (
    <div className="flex gap-4">

      <div className="text-[#DF4607] mt-1 shrink-0">
        {icon}
      </div>

      <div>
        <h3 className="font-medium text-[#222222]">
          {title}
        </h3>

        <p className="text-sm text-[#8A817A] mt-1 leading-6">
          {description}
        </p>
      </div>
    </div>
  );
};

export default Requirements;