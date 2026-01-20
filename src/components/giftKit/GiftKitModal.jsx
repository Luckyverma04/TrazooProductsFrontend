import { useState, useEffect } from "react";
import API from "../../config/api";

import StepBudget from "./StepBudget";
import StepProducts from "./StepProducts";
import StepLogo from "./StepLogo";
import StepUserDetails from "./StepUserDetails";
import StepPreview from "./StepPreview";

const GiftKitModal = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);

  const [kitData, setKitData] = useState({
    budget: null,
    quantity: 20,
    box: null,
    products: {},
    selectedProducts: null,
    logo: null,
    userDetails: null,
  });

  /* ======================
     AUTO FETCH LOGGED USER
  ====================== */
  useEffect(() => {
    if (!isOpen) return;

    const token = localStorage.getItem("token");
    if (!token) return;

    const fetchUser = async () => {
      try {
        const res = await API.get("/api/auth/me");
        setKitData((prev) => ({
          ...prev,
          userDetails: res.data.user,
        }));
      } catch (error) {
        console.log("Guest user");
      }
    };

    fetchUser();
  }, [isOpen]);

  /* ======================
     STEP 1: BUDGET
  ====================== */
  const handleBudgetSubmit = async (budget, quantity) => {
    try {
      const res = await API.get(
        `/api/kit/suggestions?budget=${budget}`
      );

      setKitData((prev) => ({
        ...prev,
        budget,
        quantity,
        box: res.data.box,
        products: res.data.categories,
        selectedProducts: null,
        logo: null,
      }));

      setStep(2);
    } catch (error) {
      alert("Failed to load kit suggestions");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
      <div className="bg-white w-full max-w-6xl rounded-xl p-6 relative">

        {/* CLOSE */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black"
        >
          ✕
        </button>

        {/* PROGRESS */}
        <div className="flex gap-2 mb-6">
          {[1, 2, 3, 4, 5].map((s) => (
            <div
              key={s}
              className={`flex-1 h-1 rounded ${
                step >= s ? "bg-black" : "bg-gray-200"
              }`}
            />
          ))}
        </div>

        {/* STEP 1 */}
        {step === 1 && (
          <StepBudget onSubmit={handleBudgetSubmit} />
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <StepProducts
            kitData={kitData}
            onBack={() => setStep(1)}
            onNext={(selectedProducts) => {
              setKitData((prev) => ({
                ...prev,
                selectedProducts,
              }));
              setStep(3);
            }}
          />
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <StepLogo
            onBack={() => setStep(2)}
            onNext={(logoUrl) => {
              setKitData((prev) => ({
                ...prev,
                logo: logoUrl,
              }));

              // 🔥 SKIP USER DETAILS IF LOGGED IN
              if (kitData.userDetails) {
                setStep(5);
              } else {
                setStep(4);
              }
            }}
          />
        )}

        {/* STEP 4 - USER DETAILS */}
        {step === 4 && (
          <StepUserDetails
            initialData={kitData.userDetails}
            onBack={() => setStep(3)}
            onNext={(details) => {
              setKitData((prev) => ({
                ...prev,
                userDetails: details,
              }));
              setStep(5);
            }}
          />
        )}

        {/* STEP 5 - PREVIEW */}
        {step === 5 && (
          <StepPreview
            kitData={kitData}
            onBack={() =>
              kitData.userDetails ? setStep(3) : setStep(4)
            }
            onSuccess={() => setStep(6)}
            onClose={onClose}
          />
        )}

        {/* STEP 6 - SUCCESS */}
        {step === 6 && (
          <div className="text-center py-20">
            <h2 className="text-3xl font-bold mb-4">
              🎉 Enquiry Submitted!
            </h2>
            <p className="text-gray-600 mb-6">
              Our team will contact you shortly.
            </p>

            <button
              onClick={onClose}
              className="bg-black text-white px-6 py-3 rounded-lg"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default GiftKitModal;