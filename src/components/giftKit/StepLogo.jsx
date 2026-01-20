import { useState } from "react";
import { 
  Upload, 
  Image, 
  ArrowLeft, 
  ArrowRight, 
  Loader2, 
  Check,
  X,
  FileImage
} from "lucide-react";

// Note: Replace with actual import
// import API from "../../config/api";
const API = {
  post: async () => ({ data: { logoUrl: "https://example.com/logo.png" } })
};

const StepLogo = ({ onNext, onBack }) => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (!selected) return;

    // Validate file type
    if (!selected.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    // Validate file size (max 5MB)
    if (selected.size > 5 * 1024 * 1024) {
      alert('File size should be less than 5MB');
      return;
    }

    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const selected = e.dataTransfer.files[0];
      
      if (!selected.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }

      if (selected.size > 5 * 1024 * 1024) {
        alert('File size should be less than 5MB');
        return;
      }

      setFile(selected);
      setPreview(URL.createObjectURL(selected));
    }
  };

  const handleRemove = () => {
    setFile(null);
    setPreview(null);
  };

  const handleContinue = async () => {
    if (!file) {
      alert("Please select a logo");
      return;
    }

    setLoading(true);
    try {
      // Upload to server (optional)
      const formData = new FormData();
      formData.append("productImage", file);
      
      // Uncomment this if you want to upload first
      // const res = await API.post("/api/upload/logo", formData, {
      //   headers: { "Content-Type": "multipart/form-data" },
      // });

      // Pass the FILE OBJECT to next step - This is the key fix!
      onNext(file);
      
    } catch (error) {
      alert("Failed to process logo");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen overflow-y-auto bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        
        {/* Header */}
        <div className="text-center mb-8 sm:mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl mb-4 shadow-lg">
            <Image className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Upload Your Brand Logo
          </h2>
          <p className="text-sm sm:text-base text-gray-600">
            Add your logo to personalize your corporate kit
          </p>
        </div>

        {/* Upload Area */}
        <div className="bg-white rounded-2xl shadow-xl border-2 border-gray-100 p-6 sm:p-8 md:p-10 mb-6">
          
          {!preview ? (
            /* Upload Zone */
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              className={`relative border-3 border-dashed rounded-2xl p-8 sm:p-12 text-center transition-all duration-300 ${
                dragActive
                  ? 'border-purple-500 bg-purple-50'
                  : 'border-gray-300 bg-gray-50 hover:border-purple-400 hover:bg-purple-50/50'
              }`}
            >
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                id="file-upload"
              />
              
              <div className="pointer-events-none">
                <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl mb-4">
                  <Upload className="w-8 h-8 sm:w-10 sm:h-10 text-purple-600" />
                </div>
                
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                  Drop your logo here
                </h3>
                <p className="text-sm sm:text-base text-gray-600 mb-4">
                  or click to browse from your device
                </p>
                
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border-2 border-gray-300 rounded-lg text-sm font-semibold text-gray-700">
                  <FileImage className="w-4 h-4" />
                  Choose File
                </div>
                
                <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <Check className="w-3 h-3 text-green-500" />
                    PNG, JPG, JPEG
                  </span>
                  <span className="flex items-center gap-1">
                    <Check className="w-3 h-3 text-green-500" />
                    Max 5MB
                  </span>
                  <span className="flex items-center gap-1">
                    <Check className="w-3 h-3 text-green-500" />
                    Transparent Background Supported
                  </span>
                </div>
              </div>
            </div>
          ) : (
            /* Preview Zone */
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2">
                  <Check className="w-5 h-5 text-green-500" />
                  Logo Preview
                </h3>
                <button
                  onClick={handleRemove}
                  className="flex items-center gap-2 px-3 py-1.5 text-sm font-semibold text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
                >
                  <X className="w-4 h-4" />
                  Remove
                </button>
              </div>

              <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 sm:p-12 border-2 border-dashed border-gray-300 flex items-center justify-center min-h-[250px] sm:min-h-[300px]">
                {/* Checkered background pattern for transparency */}
                <div className="absolute inset-0 opacity-10" style={{
                  backgroundImage: 'repeating-conic-gradient(#808080 0% 25%, transparent 0% 50%) 50% / 20px 20px'
                }}></div>
                
                <img
                  src={preview}
                  alt="Logo preview"
                  className="relative max-h-48 sm:max-h-64 max-w-full object-contain drop-shadow-lg"
                />
              </div>

              {/* File Info */}
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FileImage className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 text-sm truncate">
                      {file?.name}
                    </p>
                    <p className="text-xs text-gray-600 mt-0.5">
                      {(file?.size / 1024).toFixed(2)} KB • {file?.type}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 bg-green-100 text-green-700 px-2 py-1 rounded-full">
                    <Check className="w-3 h-3" />
                    <span className="text-xs font-semibold">Ready</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Info Box */}
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-xs font-bold">i</span>
              </div>
              <div className="text-xs sm:text-sm text-blue-900">
                <p className="font-semibold mb-1">Logo Guidelines:</p>
                <ul className="space-y-1 text-blue-800">
                  <li>• Use high-resolution images for best print quality</li>
                  <li>• Transparent PNG format recommended</li>
                  <li>• Square or rectangular logos work best</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <button
            onClick={onBack}
            disabled={loading}
            className="w-full sm:flex-1 border-2 border-gray-300 text-gray-700 py-3.5 rounded-xl font-semibold 
              hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 flex items-center justify-center gap-2
              active:scale-[0.98] shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>

          <button
            onClick={handleContinue}
            disabled={!file || loading}
            className="w-full sm:flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3.5 rounded-xl font-semibold 
              disabled:opacity-50 disabled:cursor-not-allowed disabled:from-gray-400 disabled:to-gray-400
              hover:shadow-xl hover:scale-[1.02] transition-all duration-200 active:scale-[0.98]
              flex items-center justify-center gap-2 shadow-lg"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Processing...</span>
              </>
            ) : (
              <>
                <span>Continue</span>
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </div>

        {/* Optional Skip */}
        <div className="text-center mt-4">
          <button
            onClick={() => onNext(null)}
            disabled={loading}
            className="text-sm text-gray-500 hover:text-gray-700 font-medium underline disabled:opacity-50"
          >
            Skip for now (continue without logo)
          </button>
        </div>
      </div>
    </div>
  );
};

export default StepLogo;