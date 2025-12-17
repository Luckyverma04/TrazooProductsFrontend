import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { initLenis } from "./utils/lenis";

/* imports remain SAME */
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import About from "./components/About";
import USPs from "./components/USPs";
import ValueProposition from "./components/ValueProposition";
import ProductRange from "./components/ProductRange";
import Branding from "./components/Branding";
import Process from "./components/Process";
import WhoWeServe from "./components/WhoWeServe";
import FinalCTA from "./components/FinalCTA";

import CombinedAuth from "./pages/CombinedAuth";
import VerifyOTP from "./pages/VerifyOTP";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminRoute from "./routes/AdminRoute";
import GlobalBackground from "./components/GlobalBackground";

function HomePage() {
  return (
    <GlobalBackground>
      <Navbar />
      <Hero />
      <ProductRange />
      <About />
      <USPs />
      <ValueProposition />
      <Branding />
      <Process />
      <WhoWeServe />
      <FinalCTA />
      <Footer />
    </GlobalBackground>
  );
}

function App() {
  useEffect(() => {
    initLenis();   // ✅ Lenis starts here
  }, []);

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/auth" element={<CombinedAuth />} />
      <Route path="/verify-otp" element={<VerifyOTP />} />
      <Route
        path="/admin/dashboard"
        element={
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        }
      />
    </Routes>
  );
}

export default App;
