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
      } catch {
        console.log("Guest user");
      }
    };

    fetchUser();
  }, [isOpen]);

  /* ======================
     STEP 1: BUDGET
  ====================== */
  const handleBudgetSubmit = async (budget, quantity) => {
    const res = await API.get(`/api/kit/suggestions?budget=${budget}`);

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
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
      <div className="bg-white w-full max-w-6xl rounded-xl p-6 relative">

        {/* CLOSE */}
        <button onClick={onClose} className="absolute top-4 right-4">✕</button>

        {/* STEP 1 */}
        {step === 1 && <StepBudget onSubmit={handleBudgetSubmit} />}

        {/* STEP 2 */}
        {step === 2 && (
          <StepProducts
            kitData={kitData}
            onBack={() => setStep(1)}
            onNext={(selectedProducts) => {
              setKitData((p) => ({ ...p, selectedProducts }));
              setStep(3);
            }}
          />
        )}

        {/* STEP 3 → ALWAYS PREVIEW */}
        {step === 3 && (
          <StepLogo
            onBack={() => setStep(2)}
            onNext={(logo) => {
              setKitData((p) => ({ ...p, logo }));
              setStep(4);
            }}
          />
        )}

        {/* STEP 4 → PREVIEW */}
        {step === 4 && (
          <StepPreview
            kitData={kitData}
            onBack={() => setStep(3)}
            onNeedUserDetails={() => setStep(5)}
            onSuccess={() => setStep(6)}
          />
        )}

        {/* STEP 5 → USER DETAILS (ONLY FOR GUEST) */}
        {step === 5 && (
          <StepUserDetails
            initialData={kitData.userDetails}
            onBack={() => setStep(4)}
            onNext={(details) => {
              setKitData((p) => ({ ...p, userDetails: details }));
              setStep(4); // 👈 back to preview, auto submit happens
            }}
          />
        )}

        {/* STEP 6 → SUCCESS */}
        {step === 6 && (
          <div className="text-center py-20">
            <h2 className="text-3xl font-bold">🎉 Enquiry Submitted!</h2>
            <p className="text-gray-600 mt-2">Our team will contact you shortly.</p>
            <button onClick={onClose} className="mt-6 bg-black text-white px-6 py-3 rounded-lg">
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default GiftKitModal;
