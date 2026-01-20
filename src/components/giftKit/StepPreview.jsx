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
  Sparkles
} from "lucide-react";

// Note: Replace with actual import
// import API from "../../config/api";
const API = {
  post: async () => ({ data: { perKitPrice: 680, totalPrice: 13600 } })
};

const StepPreview = ({ kitData, onBack, onSuccess }) => {
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
     LOGO PREVIEW HANDLER
  ====================== */
  useEffect(() => {
    if (logo) {
      // Check if logo is a File object
      if (logo instanceof File || logo instanceof Blob) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setLogoPreview(reader.result);
        };
        reader.readAsDataURL(logo);
      } else if (typeof logo === 'string') {
        // If it's already a URL string
        setLogoPreview(logo);
      }
    } else {
      setLogoPreview(null);
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
          selectedProducts: Object.values(selectedProducts).map(
            (p) => ({
              productId: p._id,
              brandingType: "logo",
            })
          ),
        };

        const res = await API.post(
          "/api/kit/calculate-price",
          payload
        );

        setPricing(res.data);
      } catch (error) {
        alert("Price calculation failed");
      } finally {
        setLoading(false);
      }
    };

    calculatePrice();
  }, [quantity, selectedProducts]);

  /* ======================
     SUBMIT ENQUIRY
  ====================== */
  const handleSubmit = async () => {
    try {
      setSubmitting(true);

      const payload = {
        name: userDetails?.name || "Guest",
        email: userDetails?.email || "",
        phone: userDetails?.phone || "",
        budget,
        quantity,
        brandLogo: logoPreview, // Use the preview URL (base64)
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
    } catch (error) {
      console.error(error);
      alert("Failed to submit enquiry");
    } finally {
      setSubmitting(false);
    }
  };

  /* ======================
     HANDLE BACK - PRESERVE DATA
  ====================== */
  const handleBack = () => {
    onBack();
  };

  /* ======================
     LOADING STATE
  ====================== */
  if (loading) {
    return (
      <div className="fixed inset-0 bg-gray-50 flex items-center justify-center p-4 z-50">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="relative">
            <div className="w-16 h-16 sm:w-20 sm:h-20 border-4 border-purple-200 rounded-full"></div>
            <div className="w-16 h-16 sm:w-20 sm:h-20 border-4 border-purple-600 rounded-full border-t-transparent animate-spin absolute top-0"></div>
          </div>
          <div className="text-center">
            <p className="text-base sm:text-lg font-semibold text-gray-900">Calculating Your Quote...</p>
            <p className="text-xs sm:text-sm text-gray-600 mt-1">This will just take a moment</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-screen overflow-y-auto bg-gray-50">
      <div className="w-full max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8">
        
        {/* HEADER */}
        <div className="text-center mb-4 sm:mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl mb-2 sm:mb-4">
            <Receipt className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">
            Review Your Kit
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-gray-600">
            Confirm your selection and submit your enquiry
          </p>
        </div>

        {/* MAIN CONTENT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 mb-4 sm:mb-6">
          
          {/* LEFT COLUMN - PRODUCTS & LOGO */}
          <div className="lg:col-span-2 space-y-3 sm:space-y-4 md:space-y-6">
            
            {/* SELECTED PRODUCTS */}
            <div className="bg-white border-2 border-gray-200 rounded-xl p-3 sm:p-4 md:p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-3 sm:mb-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Package className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <h3 className="text-sm sm:text-base md:text-lg font-bold text-gray-900">Selected Products</h3>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3">
                {Object.values(selectedProducts).map((item) => (
                  <div
                    key={item._id}
                    className="relative border-2 border-gray-200 rounded-lg p-2 sm:p-3 text-center bg-white hover:border-blue-300 transition-all duration-300"
                  >
                    <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-4 h-4 sm:w-6 sm:h-6 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center shadow-md">
                      <CheckCircle2 className="w-2.5 h-2.5 sm:w-4 sm:h-4 text-white" />
                    </div>

                    <div className="h-12 sm:h-16 md:h-20 flex items-center justify-center mb-1 sm:mb-2">
                      <img
                        src={item.images?.[0]}
                        alt={item.name}
                        className="h-full w-full object-contain"
                      />
                    </div>
                    <p className="text-xs sm:text-sm font-semibold text-gray-900 line-clamp-2">
                      {item.name}
                    </p>
                    {item.unitPrice && (
                      <p className="text-xs text-gray-600 mt-0.5">₹{item.unitPrice}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* BRAND LOGO */}
            <div className="bg-white border-2 border-gray-200 rounded-xl p-3 sm:p-4 md:p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-3 sm:mb-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Image className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <h3 className="text-sm sm:text-base md:text-lg font-bold text-gray-900">Your Brand Logo</h3>
              </div>
              
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-4 sm:p-6 border-2 border-dashed border-gray-300 flex items-center justify-center min-h-[100px] sm:min-h-[140px]">
                {logoPreview ? (
                  <img
                    src={logoPreview}
                    alt="Brand Logo"
                    className="max-h-16 sm:max-h-24 max-w-full object-contain"
                  />
                ) : (
                  <div className="text-center">
                    <Image className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-500">No logo uploaded</p>
                    <p className="text-xs text-gray-400 mt-1">Logo data: {logo ? 'Present but not converted' : 'Not provided'}</p>
                  </div>
                )}
              </div>
            </div>

            {/* USER DETAILS */}
            {userDetails && (
              <div className="bg-white border-2 border-gray-200 rounded-xl p-3 sm:p-4 md:p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-3 sm:mb-4">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <User className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <h3 className="text-sm sm:text-base md:text-lg font-bold text-gray-900">Contact Information</h3>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2 p-2 sm:p-3 bg-gray-50 rounded-lg">
                    <User className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 flex-shrink-0" />
                    <span className="text-xs sm:text-sm md:text-base text-gray-900 font-medium truncate">{userDetails.name}</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 sm:p-3 bg-gray-50 rounded-lg">
                    <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 flex-shrink-0" />
                    <span className="text-xs sm:text-sm md:text-base text-gray-900 font-medium truncate">{userDetails.email}</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 sm:p-3 bg-gray-50 rounded-lg">
                    <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 flex-shrink-0" />
                    <span className="text-xs sm:text-sm md:text-base text-gray-900 font-medium">{userDetails.phone}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* RIGHT COLUMN - PRICING */}
          <div className="lg:col-span-1 space-y-3 sm:space-y-4">
            
            {/* PRICING CARD */}
            <div className="bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 border-2 border-purple-200 rounded-xl p-3 sm:p-4 md:p-6 relative overflow-hidden shadow-lg">
              <div className="absolute -top-10 -right-10 w-20 h-20 sm:w-32 sm:h-32 bg-purple-200/30 rounded-full blur-2xl"></div>
              <div className="absolute -bottom-10 -left-10 w-20 h-20 sm:w-32 sm:h-32 bg-pink-200/30 rounded-full blur-2xl"></div>
              
              <div className="relative">
                <div className="flex items-center gap-2 mb-3 sm:mb-4 md:mb-6">
                  <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-purple-600 flex-shrink-0" />
                  <h3 className="text-sm sm:text-base md:text-lg font-bold text-gray-900">Pricing Summary</h3>
                </div>

                <div className="space-y-2 sm:space-y-3">
                  {/* Quantity */}
                  <div className="flex justify-between items-center pb-2 border-b border-purple-200">
                    <span className="text-xs sm:text-sm md:text-base text-gray-700 font-medium">Quantity</span>
                    <span className="text-base sm:text-lg md:text-xl font-bold text-gray-900">{quantity} units</span>
                  </div>

                  {/* Per Kit Price */}
                  <div className="flex justify-between items-center pb-2 border-b border-purple-200">
                    <span className="text-xs sm:text-sm md:text-base text-gray-700 font-medium">Per Kit Price</span>
                    <div className="flex items-center gap-0.5 text-base sm:text-lg md:text-xl font-bold text-gray-900">
                      <IndianRupee className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                      {pricing.perKitPrice}
                    </div>
                  </div>

                  {/* Total Price */}
                  <div className="bg-white/80 backdrop-blur-sm rounded-lg p-2 sm:p-3 md:p-4 border border-purple-200">
                    <div className="flex justify-between items-center gap-2">
                      <span className="text-xs sm:text-sm md:text-lg text-gray-700 font-semibold">Total Amount</span>
                      <div className="flex items-center gap-0.5 text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                        <IndianRupee className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-purple-600" />
                        <span className="whitespace-nowrap">{pricing.totalPrice.toLocaleString('en-IN')}</span>
                      </div>
                    </div>
                  </div>

                  {/* GST Notice */}
                  <div className="flex items-start gap-1.5 sm:gap-2 p-2 sm:p-2.5 bg-amber-50 border border-amber-200 rounded-lg">
                    <Receipt className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                    <p className="text-xs text-amber-800">
                      <span className="font-semibold">Note:</span> GST will be applicable separately as per government norms
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* SUMMARY STATS */}
            <div className="grid grid-cols-2 gap-2 sm:gap-3">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-2 sm:p-3 md:p-4 text-center">
                <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-blue-600 mx-auto mb-1 sm:mb-1.5" />
                <p className="text-lg sm:text-xl md:text-2xl font-bold text-blue-900">{Object.keys(selectedProducts).length}</p>
                <p className="text-xs text-blue-700 font-medium">Products</p>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-2 sm:p-3 md:p-4 text-center">
                <Package className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-green-600 mx-auto mb-1 sm:mb-1.5" />
                <p className="text-lg sm:text-xl md:text-2xl font-bold text-green-900">{quantity}</p>
                <p className="text-xs text-green-700 font-medium">Total Kits</p>
              </div>
            </div>
          </div>
        </div>

        {/* ACTION BUTTONS - FIXED AT BOTTOM */}
        <div className="sticky bottom-0 left-0 right-0 bg-white border-t-2 border-gray-200 shadow-lg p-3 sm:p-4 -mx-3 sm:-mx-4 md:-mx-6 lg:-mx-8">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row gap-2 sm:gap-3">
            <button
              onClick={handleBack}
              className="w-full sm:flex-1 border-2 border-gray-300 text-gray-700 py-2.5 sm:py-3 rounded-lg font-semibold 
                hover:bg-gray-50 transition-all duration-200 hover:border-gray-400 flex items-center justify-center gap-2
                active:scale-[0.98]"
            >
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="text-sm sm:text-base">Back</span>
            </button>

            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="w-full sm:flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2.5 sm:py-3 rounded-lg font-semibold 
                disabled:opacity-50 disabled:cursor-not-allowed disabled:from-gray-400 disabled:to-gray-400
                hover:shadow-xl hover:scale-[1.02] transition-all duration-200 active:scale-[0.98]
                flex items-center justify-center gap-2"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                  <span className="text-sm sm:text-base">Submitting...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="text-sm sm:text-base">Submit Enquiry</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepPreview;