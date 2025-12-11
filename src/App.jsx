import { Routes, Route } from "react-router-dom";

// Home Page Sections
import Navbar from "./components/Navbar";
import Footer from "./components/footer";
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

function HomePage() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <USPs />
      <ValueProposition />
      <ProductRange />
      <Branding />
      <Process />
      <WhoWeServe />
      <FinalCTA />
      <Footer />
    </>
  );
}

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/auth" element={<CombinedAuth />} />
      <Route path="/verify-otp" element={<VerifyOTP />} />

      {/* Protected Admin Route */}
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
