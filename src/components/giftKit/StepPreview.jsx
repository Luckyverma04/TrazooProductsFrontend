import { useEffect, useState } from "react";
import {
  ShoppingCart,
  Package,
  IndianRupee,
  User,
  Mail,
  Phone,
  Image,
  CheckCircle2,
  ArrowLeft,
  Send,
  Loader2,
  Receipt,
  Sparkles,
} from "lucide-react";

import API from "../../config/api";

const StepPreview = ({
  kitData,
  onBack,
  onNeedUserDetails,
  onSuccess,
}) => {
  const [pricing, setPricing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [logoPreview, setLogoPreview] = useState(null);

  const {
    quantity,
    selectedProducts,
    logo,
    budget,
    userDetails,
  } = kitData;

  /* ======================
     LOGO PREVIEW
  ====================== */
  useEffect(() => {
    if (!logo) return;

    if (logo instanceof File || logo instanceof Blob) {
      const reader = new FileReader();
      reader.onloadend = () => setLogoPreview(reader.result);
      reader.readAsDataURL(logo);
    } else {
      setLogoPreview(logo);
    }
  }, [logo]);

  /* ======================
     PRICE CALCULATION
  ====================== */
  useEffect(() => {
    const calculatePrice = async () => {
      try {
        const res = await API.post("/api/kit/calculate-price", {
          quantity,
          selectedProducts: Object.values(selectedProducts).map(
            (p) => ({
              productId: p._id,
              brandingType: "logo",
            })
          ),
        });
        setPricing(res.data);
      } catch (err) {
        alert("Failed to calculate price");
      } finally {
        setLoading(false);
      }
    };

    calculatePrice();
  }, [quantity, selectedProducts]);

  /* ======================
     SUBMIT HANDLER
  ====================== */
  const handleSubmit = async () => {
    // 🔥 Guest → Ask details
    if (!userDetails) {
      onNeedUserDetails();
      return;
    }

    try {
      setSubmitting(true);

      const payload = {
        name: userDetails.name,
        email: userDetails.email,
        phone: userDetails.phone,
        budget,
        quantity,
        brandLogo: logoPreview,
        selectedProducts: Object.values(selectedProducts).map(
          (p) => ({
            productId: p._id,
            category: p.category,
            price: p.unitPrice,
          })
        ),
        perKitPrice: pricing.perKitPrice,
        totalPrice: pricing.totalPrice,
      };

      await API.post("/api/kit-enquiry", payload);
      onSuccess();
    } catch (err) {
      alert("Failed to submit enquiry");
    } finally {
      setSubmitting(false);
    }
  };

  /* ======================
     LOADING
  ====================== */
  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="w-10 h-10 animate-spin text-purple-600" />
      </div>
    );
  }

  return (
    <div className="w-full h-screen overflow-y-auto bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold">Review Your Kit</h2>
          <p className="text-gray-600">
            Check details before submitting enquiry
          </p>
        </div>

        {/* PRODUCTS */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
          {Object.values(selectedProducts).map((item) => (
            <div
              key={item._id}
              className="border rounded-lg p-3 bg-white text-center"
            >
              <img
                src={item.images?.[0]}
                alt={item.name}
                className="h-20 mx-auto object-contain"
              />
              <p className="font-semibold mt-2">{item.name}</p>
              <p className="text-sm text-gray-600">
                ₹{item.unitPrice}
              </p>
            </div>
          ))}
        </div>

        {/* LOGO */}
        <div className="bg-white rounded-lg p-4 mb-6">
          <h3 className="font-semibold mb-2">Brand Logo</h3>
          {logoPreview ? (
            <img
              src={logoPreview}
              alt="Logo"
              className="h-20"
            />
          ) : (
            <p className="text-gray-500">No logo uploaded</p>
          )}
        </div>

        {/* USER DETAILS (IF AVAILABLE) */}
        {userDetails && (
          <div className="bg-white rounded-lg p-4 mb-6">
            <h3 className="font-semibold mb-2">Contact Details</h3>
            <p>{userDetails.name}</p>
            <p>{userDetails.email}</p>
            <p>{userDetails.phone}</p>
          </div>
        )}

        {/* PRICING */}
        <div className="bg-white rounded-lg p-4 mb-6">
          <p className="flex justify-between">
            <span>Quantity</span>
            <span>{quantity}</span>
          </p>
          <p className="flex justify-between">
            <span>Per Kit</span>
            <span>₹{pricing.perKitPrice}</span>
          </p>
          <p className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>₹{pricing.totalPrice}</span>
          </p>
        </div>

        {/* ACTIONS */}
        <div className="flex gap-4">
          <button
            onClick={onBack}
            className="flex-1 border py-3 rounded-lg"
          >
            <ArrowLeft className="inline mr-2" />
            Back
          </button>

          <button
            onClick={handleSubmit}
            disabled={submitting}
            className="flex-1 bg-purple-600 text-white py-3 rounded-lg"
          >
            {submitting ? (
              <>
                <Loader2 className="inline animate-spin mr-2" />
                Submitting...
              </>
            ) : (
              <>
                <Send className="inline mr-2" />
                Submit Enquiry
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default StepPreview;
