import { useState } from "react";
import axios from "axios";
import { Mail, Shield, CheckCircle, AlertCircle, Sparkles } from "lucide-react";

const API = import.meta.env.VITE_API_URL; // ✅ Correct backend URL

const VerifyOTP = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [resending, setResending] = useState(false);

  const handleOtpChange = (index, value) => {
    if (value && !/^\d+$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
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
      const res = await axios.post(`${API}/api/auth/verify-otp`, {
        email,
        otp: otpString,
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
      await axios.post(`${API}/api/auth/resend-otp`, { email });

      alert("OTP sent successfully!");
      setOtp(["", "", "", "", "", ""]);

    } catch (err) {
      setError(err.response?.data?.message || "Failed to resend OTP");
    }

    setResending(false);
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 px-4 py-12 relative overflow-hidden">

      {/* Background decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-300 rounded-full blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-300 rounded-full blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-pink-300 rounded-full blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob { animation: blob 7s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
      `}</style>

      <div className="w-full max-w-md bg-white shadow-2xl rounded-3xl p-10 relative z-10">

        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center mb-4">
            <Shield className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Verify Your Email</h2>
          <p className="text-gray-600">Enter the 6-digit OTP sent to your email</p>
        </div>

        <form onSubmit={handleVerify} className="space-y-6">

          {/* Email */}
          <div>
            <label className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
              <Mail className="w-4 h-4 text-indigo-600" /> Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                className="w-full p-4 pl-12 border-2 border-gray-200 rounded-xl"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Mail className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          {/* OTP input */}
          <div>
            <label className="text-gray-700 font-semibold mb-3">
              Enter OTP Code
            </label>
            <div className="flex gap-3 justify-center">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  className="w-14 h-16 text-center text-2xl border-2 border-gray-200 rounded-xl focus:border-indigo-500"
                />
              ))}
            </div>
          </div>

          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-xl font-semibold shadow-lg hover:scale-[1.02]"
          >
            {loading ? "Verifying..." : "Verify Email"}
          </button>

        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600 text-sm">Didn't receive the code?</p>
          <button
            onClick={handleResendOTP}
            disabled={resending}
            className="text-indigo-600 font-semibold hover:underline mt-1"
          >
            {resending ? "Sending..." : "Resend OTP"}
          </button>
        </div>

        <div className="mt-6 text-center border-t pt-4">
          <a href="/auth" className="text-gray-600 hover:text-gray-900 text-sm">
            ← Back to Login
          </a>
        </div>

      </div>
    </div>
  );
};

export default VerifyOTP;
