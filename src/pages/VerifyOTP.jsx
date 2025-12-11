import { useState } from "react";
import axios from "axios";
import { Mail, Shield, CheckCircle, AlertCircle, Sparkles } from "lucide-react";

const VerifyOTP = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [resending, setResending] = useState(false);

  const handleOtpChange = (index, value) => {
    // Only allow numbers
    if (value && !/^\d+$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1); // Take only the last character
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Handle backspace
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);
    if (!/^\d+$/.test(pastedData)) return;

    const newOtp = [...otp];
    for (let i = 0; i < pastedData.length && i < 6; i++) {
      newOtp[i] = pastedData[i];
    }
    setOtp(newOtp);

    // Focus the last filled input or next empty one
    const nextEmptyIndex = newOtp.findIndex(val => !val);
    const focusIndex = nextEmptyIndex === -1 ? 5 : nextEmptyIndex;
    document.getElementById(`otp-${focusIndex}`)?.focus();
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    setError("");
    
    const otpString = otp.join("");
    if (otpString.length !== 6) {
      setError("Please enter all 6 digits");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/api/auth/verify-otp", {
        email,
        otp: otpString
      });

      alert("Email verified successfully!");
      window.location.href = "/auth";
    } catch (err) {
      setError(err.response?.data?.message || "OTP verification failed");
    }

    setLoading(false);
  };

  const handleResendOTP = async () => {
    if (!email) {
      setError("Please enter your email first");
      return;
    }

    setResending(true);
    setError("");

    try {
      await axios.post("http://localhost:5000/api/auth/resend-otp", { email });
      alert("OTP sent successfully! Check your email.");
      setOtp(["", "", "", "", "", ""]);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to resend OTP");
    }

    setResending(false);
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 px-4 py-12 relative overflow-hidden">
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>

      <div className="w-full max-w-md bg-white shadow-2xl rounded-3xl p-8 sm:p-10 relative z-10">
        
        {/* Header with Icon */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl mb-4 shadow-lg">
            <Shield className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            Verify Your Email
          </h2>
          <p className="text-gray-600">
            Enter the 6-digit code sent to your email
          </p>
        </div>

        <form onSubmit={handleVerify} className="space-y-6">

          {/* Email Input */}
          <div>
            <label className="text-gray-700 font-semibold mb-2 flex items-center gap-2">
              <Mail className="w-4 h-4 text-indigo-600" /> Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                className="w-full p-4 pl-12 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none transition-all"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Mail className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" />
            </div>
          </div>

          {/* OTP Input Boxes */}
          <div>
            <label className="text-gray-700 font-semibold mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-600" /> Enter OTP Code
            </label>
            <div className="flex gap-2 sm:gap-3 justify-center">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  className="w-12 h-14 sm:w-14 sm:h-16 text-center text-2xl font-bold border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none transition-all"
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={index === 0 ? handlePaste : undefined}
                />
              ))}
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <p className="text-sm font-medium">{error}</p>
            </div>
          )}

          {/* Verify Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-4 rounded-xl font-semibold transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Verifying...
              </>
            ) : (
              <>
                <CheckCircle className="w-5 h-5" />
                Verify Email
              </>
            )}
          </button>
        </form>

        {/* Resend OTP */}
        <div className="mt-6 text-center">
          <p className="text-gray-600 text-sm mb-2">
            Didn't receive the code?
          </p>
          <button
            onClick={handleResendOTP}
            disabled={resending}
            className="text-indigo-600 font-semibold hover:text-indigo-700 hover:underline transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {resending ? "Sending..." : "Resend OTP"}
          </button>
        </div>

        {/* Back to Login */}
        <div className="mt-6 text-center pt-6 border-t border-gray-100">
          <a
            href="/auth"
            className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium"
          >
            ← Back to Login
          </a>
        </div>

        {/* Security Badge */}
        <div className="mt-6 flex items-center justify-center gap-2 text-gray-500 text-xs">
          <Shield className="w-4 h-4" />
          <span>Secure verification powered by TrazooProducts</span>
        </div>
      </div>
    </div>
  );
};

export default VerifyOTP;