import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

const CombinedAuth = () => {
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        const res = await axios.post(`${API}/api/auth/login`, {
          email: formData.email,
          password: formData.password,
        });

        const { token, user } = res.data;
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));

        if (user.role === "admin") {
          navigate("/admin/dashboard", { replace: true });
        } else {
          navigate("/associate", { replace: true });
        }
      } else {
        await axios.post(`${API}/api/auth/register`, {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        });

        localStorage.setItem("pendingEmail", formData.email);
        alert("Signup successful! Please verify OTP.");
        navigate("/verify-otp");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong");
    }

    setLoading(false);
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setFormData({ name: "", email: "", password: "" });
    setShowPassword(false);
  };

  return (
    <div className="min-h-screen bg-[#FFFDF9] flex items-center justify-center px-4 py-8">
      {/* CENTERED BOX */}
      <div className="w-full max-w-sm bg-white border border-[#DED8D2] rounded-2xl p-8 shadow-sm">
        
        {/* LOGO */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-[#DF4607] rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">T</span>
          </div>
          <h1 className="text-2xl font-bold text-[#111111]">Trazoo</h1>
        </div>

        {/* HEADING */}
        <h2 className="text-2xl font-semibold text-[#111111] mb-2">
          {isLogin ? "Sign In" : "Create Account"}
        </h2>
        <p className="text-sm text-[#6E6A67] mb-6">
          {isLogin
            ? "Access your Trazoo dashboard"
            : "Join Trazoo today"}
        </p>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* NAME (Register only) */}
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-[#111111] mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                placeholder="Your name"
                className="w-full px-4 py-2.5 border border-[#DED8D2] rounded-lg bg-white text-[#111111] placeholder-[#9A9691] text-sm focus:outline-none focus:ring-2 focus:ring-[#DF4607] focus:border-transparent transition-all"
                required
              />
            </div>
          )}

          {/* EMAIL */}
          <div>
            <label className="block text-sm font-medium text-[#111111] mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-2.5 pl-10 border border-[#DED8D2] rounded-lg bg-white text-[#111111] placeholder-[#9A9691] text-sm focus:outline-none focus:ring-2 focus:ring-[#DF4607] focus:border-transparent transition-all"
                required
              />
              <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#6E6A67]" />
            </div>
          </div>

          {/* PASSWORD */}
          <div>
            <label className="block text-sm font-medium text-[#111111] mb-1.5">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={(e) => handleChange("password", e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-2.5 pl-10 pr-10 border border-[#DED8D2] rounded-lg bg-white text-[#111111] placeholder-[#9A9691] text-sm focus:outline-none focus:ring-2 focus:ring-[#DF4607] focus:border-transparent transition-all"
                required
              />
              <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#6E6A67]" />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6E6A67] hover:text-[#111111]"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-6 bg-[#DF4607] hover:bg-[#C93E05] text-white py-2.5 rounded-lg font-semibold text-sm transition-colors disabled:opacity-50"
          >
            {loading ? "Processing..." : isLogin ? "Sign In" : "Create Account"}
          </button>
        </form>

        {/* TOGGLE MODE */}
        <div className="mt-6 text-center">
          <p className="text-sm text-[#6E6A67]">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={toggleMode}
              className="text-[#DF4607] font-semibold hover:underline"
            >
              {isLogin ? "Sign up" : "Sign in"}
            </button>
          </p>
        </div>

        {/* FOOTER */}
        <div className="mt-6 pt-6 border-t border-[#DED8D2] text-center text-xs text-[#6E6A67]">
          <p>© 2025 Trazoo. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default CombinedAuth;