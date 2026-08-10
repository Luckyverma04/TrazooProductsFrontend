import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Send,
  Loader2,
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
    selectedProducts = {},
    logo,
    budget,
    userDetails,
  } = kitData;

  /* ======================
     LOGO PREVIEW
  ====================== */
  useEffect(() => {
    if (!logo) {
      setLogoPreview(null);
      return;
    }

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
        const payload = {
          quantity,
          selectedProducts: Object.values(selectedProducts || {}).map((p) => ({
            productId: p._id,
            brandingType: "logo",
          })),
        };

        console.log("PRICE API PAYLOAD:", payload);

        const res = await API.post("/api/kit/calculate-price", payload);
        setPricing(res.data);
      } catch (err) {
        alert("Failed to calculate price");
      } finally {
        setLoading(false);
      }
    };

    // ✅ FIX: Object.values — works correctly with null-stripped selectedProducts
    if (quantity && Object.values(selectedProducts || {}).length) {
      calculatePrice();
    }
  }, [quantity, selectedProducts]);

  /* ======================
     SUBMIT HANDLER
  ====================== */
  const handleSubmit = async () => {
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
        selectedProducts: Object.values(selectedProducts || {}).map((p) => ({
          productId: p._id,
          category: p.category,
          price: p.unitPrice,
        })),
        perKitPrice: pricing?.perKitPrice || 0,
        totalPrice: pricing?.totalPrice || 0,
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
  if (loading || !pricing) {
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

        {/* PRODUCTS — with logo overlay */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
          {Object.values(selectedProducts || {}).map((item) => (
            <div
              key={item._id}
              className="border rounded-lg p-3 bg-white text-center"
            >
              {/* ✅ Product image + logo overlay */}
              <div className="relative inline-block mx-auto">
                <img
                  src={item.images?.[0]}
                  alt={item.name}
                  className="h-20 object-contain block"
                />
                {logoPreview && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <img
                      src={logoPreview}
                      alt="Brand Logo"
                      className="w-8 h-8 object-contain opacity-85"
                      style={{ mixBlendMode: "multiply" }}
                    />
                  </div>
                )}
              </div>
              <p className="font-semibold mt-2">{item.name}</p>
              <p className="text-sm text-gray-600">₹{item.unitPrice}</p>
            </div>
          ))}
        </div>

        {/* LOGO */}
        <div className="bg-white rounded-lg p-4 mb-6">
          {/* ✅ Updated label */}
          <h3 className="font-semibold mb-2">Brand Logo (Applied to selected products)</h3>
          {logoPreview ? (
            <img src={logoPreview} alt="Logo" className="h-20" />
          ) : (
            <p className="text-gray-500">No logo uploaded</p>
          )}
        </div>

        {/* USER DETAILS */}
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
            <span>Budget</span>
            <span>₹{budget}</span>
          </p>
          <p className="flex justify-between">
            <span>Quantity</span>
            <span>{quantity}</span>
          </p>
          <p className="flex justify-between">
            <span>Per Kit</span>
            <span>₹{pricing.perKitPrice.toLocaleString("en-IN")}</span>
          </p>
          <p className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>₹{pricing.totalPrice.toLocaleString("en-IN")}</span>
          </p>
          <p className="text-xs text-gray-500 mt-2">
            GST will be applicable separately
          </p>
        </div>

        {/* ACTIONS */}
        <div className="flex gap-4 pb-8">
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
