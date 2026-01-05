import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Mail, Shield, AlertCircle } from "lucide-react";

const API = import.meta.env.VITE_API_URL;

const VerifyOTP = () => {
  const navigate = useNavigate();

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
      document.getElementById(`otp-${index + 1}`)?.focus();
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

      // ✅ EXPECTED RESPONSE: { success, token, user }
      const { token, user } = res.data;

      // 🔐 SAVE AUTH DATA
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      // 🚀 ROLE BASED REDIRECT
      if (user.role === "admin") {
        navigate("/admin/dashboard", { replace: true });
      } else {
        navigate("/associate", { replace: true });
      }

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
      setOtp(["", "", "", "", "", ""]);
      alert("OTP sent successfully!");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to resend OTP");
    }

    setResending(false);
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">

        <h2 className="text-2xl font-bold mb-4 text-center">
          Verify Your Email
        </h2>

        <form onSubmit={handleVerify} className="space-y-4">

          <input
            type="email"
            className="w-full p-3 border rounded"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <div className="flex gap-2 justify-center">
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                maxLength={1}
                value={digit}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                className="w-12 h-12 text-center border rounded text-lg"
              />
            ))}
          </div>

          {error && (
            <div className="text-red-600 text-sm flex items-center gap-2">
              <AlertCircle size={16} /> {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-3 rounded"
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>

        <button
          onClick={handleResendOTP}
          disabled={resending}
          className="mt-4 text-indigo-600 text-sm"
        >
          {resending ? "Sending..." : "Resend OTP"}
        </button>
      </div>
    </div>
  );
};

export default VerifyOTP;
