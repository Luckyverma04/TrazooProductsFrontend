import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Sparkles,
  Shield,
  Zap,
} from "lucide-react";

const API = import.meta.env.VITE_API_URL;

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
        // ================= LOGIN =================
        const res = await axios.post(`${API}/api/auth/login`, {
          email: formData.email,
          password: formData.password,
        });

        const { token, user } = res.data;

        // 🔐 SAVE AUTH DATA
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));

        // 🚀 ROLE BASED REDIRECT (FIXED)
        if (user.role === "admin") {
          navigate("/admin/dashboard", { replace: true });
        } else {
          navigate("/associate", { replace: true });
        }
      } else {
        // ================= REGISTER =================
        await axios.post(`${API}/api/auth/register`, {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        });

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
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 px-4 py-12">

      <div className="w-full max-w-5xl flex bg-white shadow-2xl rounded-3xl overflow-hidden">

        {/* LEFT INFO */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 p-12 flex-col justify-between text-white">
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center">
                <Sparkles className="w-7 h-7 text-indigo-600" />
              </div>
              <h1 className="text-3xl font-bold">TRAZOO</h1>
            </div>

            <h2 className="text-4xl font-bold mb-4">
              {isLogin ? "Welcome Back!" : "Create Your Account"}
            </h2>

            <p className="text-blue-100 mb-8">
              {isLogin
                ? "Login to manage your leads"
                : "Join TRAZOO CRM today"}
            </p>

            <Feature icon={Shield} title="Secure" />
            <Feature icon={Zap} title="Fast & Reliable" />
            <Feature icon={Sparkles} title="Modern UI" />
          </div>

          <p className="text-blue-100 text-sm">
            © 2025 TRAZOO. All rights reserved.
          </p>
        </div>

        {/* RIGHT FORM */}
        <div className="w-full lg:w-1/2 p-8 sm:p-12">
          <h2 className="text-3xl font-bold mb-2">
            {isLogin ? "Sign In" : "Create Account"}
          </h2>
          <p className="text-gray-600 mb-6">
            {isLogin
              ? "Access your dashboard"
              : "Register and verify OTP"}
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <InputField
                label="Full Name"
                icon={User}
                value={formData.name}
                onChange={(v) => handleChange("name", v)}
              />
            )}

            <InputField
              label="Email"
              icon={Mail}
              value={formData.email}
              onChange={(v) => handleChange("email", v)}
            />

            <PasswordField
              value={formData.password}
              show={showPassword}
              toggle={() => setShowPassword(!showPassword)}
              onChange={(v) => handleChange("password", v)}
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-xl font-semibold"
            >
              {loading ? "Processing..." : isLogin ? "Login" : "Register"}
            </button>
          </form>

          <p className="text-center mt-6 text-gray-600">
            {isLogin ? "New user?" : "Already have an account?"}{" "}
            <button
              onClick={toggleMode}
              className="text-indigo-600 font-semibold"
            >
              {isLogin ? "Create account" : "Login"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

const Feature = ({ icon: Icon, title }) => (
  <div className="flex items-center gap-3 mb-4">
    <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
      <Icon className="w-5 h-5" />
    </div>
    <span>{title}</span>
  </div>
);

const InputField = ({ label, icon: Icon, value, onChange }) => (
  <div>
    <label className="text-gray-700 font-semibold">{label}</label>
    <div className="relative mt-1">
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-4 pl-12 border rounded-xl"
        required
      />
      <Icon className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
    </div>
  </div>
);

const PasswordField = ({ value, show, toggle, onChange }) => (
  <div>
    <label className="text-gray-700 font-semibold">Password</label>
    <div className="relative mt-1">
      <input
        type={show ? "text" : "password"}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-4 pl-12 pr-12 border rounded-xl"
        required
      />
      <Lock className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
      <button
        type="button"
        onClick={toggle}
        className="absolute right-4 top-1/2 -translate-y-1/2"
      >
        {show ? <EyeOff /> : <Eye />}
      </button>
    </div>
  </div>
);

export default CombinedAuth;
