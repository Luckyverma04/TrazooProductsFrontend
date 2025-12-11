import { useState } from "react";
import axios from "axios";
import { User, Mail, Lock, Eye, EyeOff, Sparkles, Shield, Zap } from "lucide-react";

const CombinedAuth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        // --------------------------
        // 🔐 LOGIN
        // --------------------------
        const res = await axios.post("http://localhost:5000/api/auth/login", {
          email: formData.email,
          password: formData.password,
        });

        alert(res.data.message || "Login successful!");

        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));

        // Redirect user by role
        if (res.data.user.role === "admin") {
          window.location.href = "/admin/dashboard";
        } else {
          window.location.href = "/";
        }
      } else {
        // --------------------------
        // 📝 SIGNUP
        // --------------------------
        const res = await axios.post("http://localhost:5000/api/auth/register", {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        });

        alert(res.data.message || "Signup successful! Please verify OTP.");
        window.location.href = "/verify-otp";
      }
    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong!");
    }

    setLoading(false);
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setFormData({ name: "", email: "", password: "" });
    setShowPassword(false);
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 px-4 py-12 relative overflow-hidden">

      {/* Background animation */}
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
        .animate-blob { animation: blob 7s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
      `}</style>

      <div className="w-full max-w-5xl flex bg-white shadow-2xl rounded-3xl overflow-hidden relative z-10">

        {/* LEFT SIDE (Branding) */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 p-12 flex-col justify-between text-white relative overflow-hidden">
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center">
                <Sparkles className="w-7 h-7 text-indigo-600" />
              </div>
              <h1 className="text-3xl font-bold">TRAZOO</h1>
            </div>

            <h2 className="text-4xl font-bold mb-4 leading-tight">
              {isLogin ? "Welcome Back!" : "Join TRAZOO Today"}
            </h2>

            <p className="text-blue-100 text-lg mb-8">
              {isLogin
                ? "Login to your dashboard and continue your journey with us."
                : "Create your account and unlock premium onboarding features."}
            </p>

            <div className="space-y-6">
              <Feature icon={Shield} title="Secure Platform"
                text="Your login and signup are protected with advanced encryption." />

              <Feature icon={Zap} title="Fast & Reliable"
                text="Experience a smooth and efficient authentication process." />

              <Feature icon={Sparkles} title="Premium Experience"
                text="Beautiful and seamless UI for the best user journey." />
            </div>
          </div>

          <p className="relative z-10 text-blue-100 text-sm">
            © 2025 TRAZOO. All rights reserved.
          </p>
        </div>

        {/* RIGHT SIDE (FORM) */}
        <div className="w-full lg:w-1/2 p-8 sm:p-12">

          <div className="mb-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
              {isLogin ? "Sign In" : "Create Account"}
            </h2>
            <p className="text-gray-600">
              {isLogin ? "Access your dashboard" : "Start your journey with TRAZOO"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Name Field (Signup only) */}
            {!isLogin && (
              <InputField
                label="Full Name"
                icon={User}
                type="text"
                value={formData.name}
                onChange={(v) => handleChange("name", v)}
              />
            )}

            {/* Email */}
            <InputField
              label="Email Address"
              icon={Mail}
              type="email"
              value={formData.email}
              onChange={(v) => handleChange("email", v)}
            />

            {/* Password */}
            <PasswordField
              label="Password"
              value={formData.password}
              show={showPassword}
              toggle={() => setShowPassword(!showPassword)}
              onChange={(v) => handleChange("password", v)}
            />

            {/* Forgot password (Login only) */}
            {isLogin && (
              <div className="flex justify-end">
                <a href="/forgot-password" className="text-sm text-indigo-600 font-semibold hover:underline">
                  Forgot Password?
                </a>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-xl font-semibold hover:scale-[1.02] transition-all shadow-lg"
            >
              {loading ? "Processing..." : isLogin ? "Sign In" : "Create Account"}
            </button>
          </form>

          {/* Switch Auth Mode */}
          <p className="text-center mt-6 text-gray-600">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
              onClick={toggleMode}
              className="text-indigo-600 font-semibold hover:underline"
            >
              {isLogin ? "Create one" : "Sign In"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

// Small reusable components
const Feature = ({ icon: Icon, title, text }) => (
  <div className="flex items-start gap-4">
    <div className="w-10 h-10 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
      <Icon className="w-5 h-5" />
    </div>
    <div>
      <h3 className="font-semibold text-lg">{title}</h3>
      <p className="text-blue-100 text-sm">{text}</p>
    </div>
  </div>
);

const InputField = ({ label, icon: Icon, type, value, onChange }) => (
  <div>
    <label className="text-gray-700 font-semibold">{label}</label>
    <div className="relative mt-1">
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-4 pl-12 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-indigo-100 outline-none transition-all"
      />
      <Icon className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
    </div>
  </div>
);

const PasswordField = ({ label, value, show, toggle, onChange }) => (
  <div>
    <label className="text-gray-700 font-semibold">{label}</label>
    <div className="relative mt-1">
      <input
        type={show ? "text" : "password"}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-4 pl-12 pr-12 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-indigo-100 outline-none transition-all"
      />
      <Lock className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
      <button
        type="button"
        onClick={toggle}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
      >
        {show ? <EyeOff /> : <Eye />}
      </button>
    </div>
  </div>
);

export default CombinedAuth;
