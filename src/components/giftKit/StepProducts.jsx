import { Check, Package, Sparkles, CheckCircle2, ArrowLeft, ArrowRight } from "lucide-react";
import { useState } from "react";

/**
 * IMPORTANT:
 * Backend categories are PLURAL
 * We must map them explicitly to avoid bugs like:
 * diaries -> diarie ❌
 */
const CATEGORY_MAP = {
  diaries: "Diary",
  pens: "Pen",
  bottles: "Bottle",
  keychains: "Keychain",
};

// Category icons for visual enhancement
const CATEGORY_ICONS = {
  Diary: "📔",
  Pen: "✒️",
  Bottle: "🍶",
  Keychain: "🔑",
};

const StepProducts = ({ kitData, onNext, onBack }) => {
  const { products, box } = kitData;

  // Selected products (ONE per category)
  const [selected, setSelected] = useState({
    Diary: null,
    Pen: null,
    Bottle: null,
    Keychain: null,
  });

  const handleSelect = (categoryKey, product) => {
    setSelected((prev) => ({
      ...prev,
      [categoryKey]: product,
    }));
  };

  // Check if all required categories are selected
  const missing = Object.keys(selected).filter(
    (key) => !selected[key]
  );
  const isReady = missing.length === 0;

  // Calculate progress
  const totalCategories = Object.keys(selected).length;
  const selectedCount = Object.values(selected).filter(Boolean).length;
  const progressPercentage = (selectedCount / totalCategories) * 100;

  return (
    <div className="w-full h-screen overflow-y-auto bg-gray-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8">
        
        {/* HEADER WITH PROGRESS */}
        <div className="text-center mb-4 sm:mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl mb-3 sm:mb-4 shadow-lg">
            <Package className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">
            Build Your Perfect Kit
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-gray-600 mb-3 sm:mb-4">
            Select one product from each category
          </p>
          
          {/* Progress Indicator */}
          <div className="max-w-md mx-auto px-4">
            <div className="flex items-center justify-between text-xs sm:text-sm font-semibold mb-2">
              <span className="text-gray-700">
                {selectedCount} of {totalCategories} selected
              </span>
              <span className="text-blue-600">{Math.round(progressPercentage)}%</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 transition-all duration-500 ease-out"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        </div>

        {/* BOX (AUTO INCLUDED) */}
        {box && (
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200 rounded-xl sm:rounded-2xl p-4 sm:p-6 relative overflow-hidden mb-4 sm:mb-6 shadow-sm">
            <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-amber-200/30 rounded-full -mr-12 sm:-mr-16 -mt-12 sm:-mt-16" />
            <div className="absolute bottom-0 left-0 w-16 h-16 sm:w-24 sm:h-24 bg-orange-200/30 rounded-full -ml-8 sm:-ml-12 -mb-8 sm:-mb-12" />
            
            <div className="relative flex items-center gap-3 sm:gap-4">
              <div className="w-10 h-10 sm:w-14 sm:h-14 bg-gradient-to-br from-amber-500 to-orange-500 rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
                <Package className="w-5 h-5 sm:w-7 sm:h-7 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-bold text-gray-900 text-sm sm:text-base md:text-lg truncate">Premium Packaging</h3>
                  <span className="bg-amber-500 text-white text-xs px-2 py-0.5 rounded-full font-semibold whitespace-nowrap">
                    Included
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-gray-700 truncate">{box.name}</p>
              </div>
              <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-amber-500 flex-shrink-0" />
            </div>
          </div>
        )}

        {/* PRODUCT CATEGORIES */}
        <div className="space-y-6 sm:space-y-8 mb-4 sm:mb-6">
          {Object.entries(products).map(([category, items]) => {
            const categoryKey = CATEGORY_MAP[category];

            // Safety check
            if (!categoryKey) return null;

            return (
              <div key={category} className="space-y-3 sm:space-y-4">
                {/* CATEGORY HEADER */}
                <div className="flex items-center justify-between bg-white rounded-xl p-3 sm:p-4 border-2 border-gray-200 shadow-sm sticky top-0 z-10">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <span className="text-xl sm:text-2xl">{CATEGORY_ICONS[categoryKey]}</span>
                    <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900">
                      {categoryKey}
                    </h3>
                  </div>
                  
                  {selected[categoryKey] ? (
                    <span className="flex items-center gap-1.5 sm:gap-2 text-green-600 text-xs sm:text-sm font-bold bg-green-50 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full border border-green-200">
                      <CheckCircle2 className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span className="hidden sm:inline">Selected</span>
                      <span className="sm:hidden">✓</span>
                    </span>
                  ) : (
                    <span className="flex items-center gap-1.5 text-gray-400 text-xs sm:text-sm font-semibold bg-gray-100 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full">
                      Choose one
                    </span>
                  )}
                </div>

                {/* PRODUCT GRID */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
                  {items.map((item) => {
                    const isSelected = selected[categoryKey]?._id === item._id;

                    return (
                      <div
                        key={item._id}
                        onClick={() => handleSelect(categoryKey, item)}
                        className={`group relative cursor-pointer rounded-xl sm:rounded-2xl border-2 bg-white overflow-hidden
                          transition-all duration-300 hover:shadow-xl hover:-translate-y-1
                          ${
                            isSelected
                              ? "border-blue-500 ring-4 ring-blue-100 shadow-xl scale-105"
                              : "border-gray-200 hover:border-blue-300"
                          }`}
                      >
                        {/* SELECTED BADGE */}
                        {isSelected && (
                          <div className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-gradient-to-br from-blue-500 to-cyan-500 text-white rounded-full p-1 sm:p-1.5 shadow-lg z-10">
                            <Check className="w-3 h-3 sm:w-4 sm:h-4" strokeWidth={3} />
                          </div>
                        )}

                        {/* IMAGE CONTAINER */}
                        <div className="relative h-32 sm:h-40 md:h-44 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-2 sm:p-3 md:p-4 overflow-hidden">
                          {/* Background decoration */}
                          <div className={`absolute inset-0 bg-gradient-to-br transition-opacity duration-300 ${
                            isSelected 
                              ? "from-blue-100/50 to-cyan-100/50 opacity-100" 
                              : "from-transparent to-transparent opacity-0 group-hover:opacity-100"
                          }`} />
                          
                          <img
                            src={item.images?.[0]}
                            alt={item.name}
                            className="relative h-24 sm:h-32 md:h-36 w-full object-contain transition-transform duration-300 group-hover:scale-110"
                          />
                        </div>

                        {/* PRODUCT INFO */}
                        <div className={`p-2 sm:p-3 md:p-4 transition-colors duration-300 ${
                          isSelected ? "bg-blue-50" : "bg-white"
                        }`}>
                          <p className="font-semibold text-gray-900 text-center text-xs sm:text-sm mb-0.5 sm:mb-1 line-clamp-2">
                            {item.name}
                          </p>
                          {item.unitPrice && (
                            <p className="text-xs sm:text-sm text-gray-600 text-center font-medium">
                              ₹{item.unitPrice}
                            </p>
                          )}
                        </div>

                        {/* HOVER OVERLAY */}
                        {!isSelected && (
                          <div className="absolute inset-0 bg-gradient-to-t from-blue-500/0 to-blue-500/0 group-hover:from-blue-500/10 group-hover:to-transparent transition-all duration-300 pointer-events-none" />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* WARNING MESSAGE */}
        {!isReady && missing.length > 0 && (
          <div className="bg-red-50 border-2 border-red-200 rounded-lg sm:rounded-xl p-3 sm:p-4 flex items-start gap-2 sm:gap-3 mb-4 sm:mb-6">
            <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-red-500 flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-white text-xs font-bold">!</span>
            </div>
            <div>
              <p className="font-semibold text-red-900 text-xs sm:text-sm mb-0.5 sm:mb-1">
                Selection Incomplete
              </p>
              <p className="text-xs sm:text-sm text-red-700">
                Please select: <span className="font-semibold">{missing.join(", ")}</span>
              </p>
            </div>
          </div>
        )}

        {/* ACTION BUTTONS - STICKY AT BOTTOM */}
        <div className="sticky bottom-0 left-0 right-0 bg-white border-t-2 border-gray-200 shadow-lg p-3 sm:p-4 -mx-3 sm:-mx-4 md:-mx-6 lg:-mx-8">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row gap-2 sm:gap-3">
            <button
              onClick={onBack}
              className="w-full sm:flex-1 border-2 border-gray-300 text-gray-700 py-2.5 sm:py-3 rounded-lg sm:rounded-xl font-semibold 
                hover:bg-gray-50 transition-all duration-200 hover:border-gray-400 flex items-center justify-center gap-2
                active:scale-[0.98]"
            >
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="text-sm sm:text-base">Back</span>
            </button>

            <button
              onClick={() => onNext(selected)}
              disabled={!isReady}
              className="w-full sm:flex-1 bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-2.5 sm:py-3 rounded-lg sm:rounded-xl font-semibold 
                disabled:opacity-50 disabled:cursor-not-allowed disabled:from-gray-400 disabled:to-gray-400
                hover:shadow-xl hover:scale-[1.02] transition-all duration-200 
                active:scale-[0.98] flex items-center justify-center gap-2"
            >
              <span className="text-sm sm:text-base">
                {isReady ? "Continue" : `Select ${missing.length} More`}
              </span>
              {isReady && <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepProducts;