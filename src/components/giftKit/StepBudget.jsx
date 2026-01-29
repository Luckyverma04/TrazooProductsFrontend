import { useState } from "react";
import { 
  IndianRupee, 
  Package, 
  ArrowRight, 
  Loader2, 
  Check,
  AlertCircle,
  X
} from "lucide-react";

const StepBudget = ({ onSubmit, onClose }) => {
  const [budget, setBudget] = useState(null);
  const [quantity, setQuantity] = useState(20);
  const [loading, setLoading] = useState(false);

  const budgetOptions = [
    { value: 500, label: "Basic", icon: "💼", description: "Essential items" },
    { value: 800, label: "Standard", icon: "⭐", description: "Quality selection" },
    { value: 1200, label: "Premium", icon: "💎", description: "High-end products" },
    { value: 1500, label: "Luxury", icon: "👑", description: "Executive collection" }
  ];

  const handleNext = async () => {
    if (!budget) {
      alert("Please select a budget");
      return;
    }

    if (quantity < 20) {
      alert("Minimum quantity is 20");
      return;
    }

    setLoading(true);
    await onSubmit(budget, quantity);
    setLoading(false);
  };

  return (
    <div className="w-full h-screen overflow-y-auto bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        
        {/* Close Button */}
        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 bg-white hover:bg-red-50 rounded-full flex items-center justify-center text-gray-600 hover:text-red-600 transition-all shadow-lg z-10"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        {/* Header */}
        <div className="text-center mb-8 sm:mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl mb-4 shadow-lg">
            <IndianRupee className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Select Your Budget
          </h2>
          <p className="text-sm sm:text-base text-gray-600">
            Choose a budget range that fits your needs
          </p>
        </div>

        {/* Budget Options */}
        <div className="bg-white rounded-2xl shadow-xl border-2 border-gray-100 p-6 sm:p-8 mb-6">
          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-900 mb-1">Budget per Kit</h3>
            <p className="text-sm text-gray-600">Select your preferred budget range</p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {budgetOptions.map((option) => {
              const isSelected = budget === option.value;
              
              return (
                <button
                  key={option.value}
                  onClick={() => setBudget(option.value)}
                  className={`relative group p-4 sm:p-5 rounded-xl sm:rounded-2xl border-2 transition-all duration-300
                    hover:shadow-lg hover:-translate-y-1 text-left
                    ${
                      isSelected
                        ? "border-blue-500 bg-gradient-to-br from-blue-50 to-indigo-50 shadow-xl ring-4 ring-blue-100"
                        : "border-gray-200 bg-white hover:border-blue-300"
                    }`}
                >
                  {/* Selected Badge */}
                  {isSelected && (
                    <div className="absolute -top-2 -right-2 bg-gradient-to-br from-blue-500 to-indigo-500 text-white rounded-full p-1.5 shadow-lg">
                      <Check className="w-3 h-3 sm:w-4 sm:h-4" strokeWidth={3} />
                    </div>
                  )}

                  {/* Icon */}
                  <div className="text-2xl sm:text-3xl mb-2">{option.icon}</div>
                  
                  {/* Label */}
                  <div className="mb-1">
                    <span className="text-xs sm:text-sm font-semibold text-gray-600 block">
                      {option.label}
                    </span>
                    <div className="flex items-center gap-1 mt-1">
                      <IndianRupee className="w-4 h-4 sm:w-5 sm:h-5 text-gray-900" />
                      <span className="text-xl sm:text-2xl font-bold text-gray-900">
                        {option.value}
                      </span>
                    </div>
                  </div>
                  
                  {/* Description */}
                  <p className="text-xs text-gray-600 mt-1">
                    {option.description}
                  </p>

                  {/* Hover Effect */}
                  {!isSelected && (
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-indigo-500/0 group-hover:from-blue-500/5 group-hover:to-indigo-500/5 rounded-xl sm:rounded-2xl transition-all duration-300 pointer-events-none" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Quantity Selection */}
        <div className="bg-white rounded-2xl shadow-xl border-2 border-gray-100 p-6 sm:p-8 mb-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center flex-shrink-0">
              <Package className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <label className="block text-lg font-bold text-gray-900 mb-1">
                Quantity
              </label>
              <p className="text-sm text-gray-600 mb-4">
                Minimum order quantity is 20 units
              </p>
              
              <div className="flex items-center gap-4">
                <div className="relative flex-1 max-w-xs">
                  <input
                    type="number"
                    min={20}
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(20, parseInt(e.target.value) || 20))}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-gray-900 font-semibold text-lg
                      focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none transition-all"
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">
                    units
                  </div>
                </div>

                {/* Quick Select Buttons */}
                <div className="hidden sm:flex gap-2">
                  {[20, 50, 100].map((qty) => (
                    <button
                      key={qty}
                      onClick={() => setQuantity(qty)}
                      className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                        quantity === qty
                          ? 'bg-indigo-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {qty}
                    </button>
                  ))}
                </div>
              </div>

              {quantity < 20 && (
                <div className="mt-3 flex items-center gap-2 text-red-600 text-sm">
                  <AlertCircle className="w-4 h-4" />
                  <span>Minimum quantity is 20 units</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Info Box - Replaces Estimated Total */}
        <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4 sm:p-5 mb-6">
          <div className="flex items-start gap-3">
            <div className="w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-white text-xs font-bold">i</span>
            </div>
            <div className="text-xs sm:text-sm text-blue-900">
              <p className="font-semibold mb-1">Note:</p>
              <ul className="space-y-1 text-blue-800">
                <li>• Final pricing will be calculated based on selected products</li>
                <li>• GST will be applicable as per government norms</li>
                <li>• Bulk discounts may apply for larger quantities</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={handleNext}
          disabled={!budget || quantity < 20 || loading}
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-xl font-bold text-lg
            disabled:opacity-50 disabled:cursor-not-allowed disabled:from-gray-400 disabled:to-gray-400
            hover:shadow-2xl hover:scale-[1.02] transition-all duration-200 active:scale-[0.98]
            flex items-center justify-center gap-3 shadow-lg"
        >
          {loading ? (
            <>
              <Loader2 className="w-6 h-6 animate-spin" />
              <span>Loading Products...</span>
            </>
          ) : (
            <>
              <span>Continue to Product Selection</span>
              <ArrowRight className="w-6 h-6" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default StepBudget;