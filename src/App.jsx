import { Routes, Route } from "react-router-dom";

// Home Page Sections
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

// Authentication Pages
import CombinedAuth from "./pages/CombinedAuth";
import VerifyOTP from "./pages/VerifyOTP";

// Admin
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminRoute from "./routes/AdminRoute";

import GlobalBackground from "./components/GlobalBackground";

function HomePage() {
  return (
    <GlobalBackground>
      <Navbar />
      <Hero />                    {/* Home */}
      <ProductRange />            {/* Our Products */}
      <About />                   {/* About Us */}
      <USPs />                    {/* Why Choose Us */}
      <ValueProposition />        {/* Why Choose Us (part 2) */}
      <Branding />
      <Process />
      <WhoWeServe />
      <FinalCTA />                {/* Contact form (Enquiry) */}
      <Footer />                  {/* Contact */}
    </GlobalBackground>
  );
}

function App() {
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

