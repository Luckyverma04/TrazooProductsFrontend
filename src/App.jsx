import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { initLenis } from "./utils/lenis";

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
import AssociateDashboard from "./pages/associate/AssociateDashboard";
import MyLeads from "./pages/associate/MyLeads";
import LeadDetail from "./pages/associate/LeadDetail";

import AdminRoute from "./routes/AdminRoute";
import AssociateRoute from "./routes/AssociateRoute";

function HomePage() {
  return (
    <>
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
    </>
  );
}

function App() {
  useEffect(() => {
    initLenis();
  }, []);

  return (
    <Routes>
      {/* PUBLIC */}
      <Route path="/" element={<HomePage />} />
      <Route path="/auth" element={<CombinedAuth />} />
      <Route path="/verify-otp" element={<VerifyOTP />} />

      {/* ADMIN */}
      <Route
        path="/admin/dashboard"
        element={
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        }
      />

      {/* ASSOCIATE */}
      <Route
        path="/associate"
        element={
          <AssociateRoute>
            <AssociateDashboard />
          </AssociateRoute>
        }
      />
      <Route
        path="/associate/leads"
        element={
          <AssociateRoute>
            <MyLeads />
          </AssociateRoute>
        }
      />
      <Route
        path="/associate/leads/:id"
        element={
          <AssociateRoute>
            <LeadDetail />
          </AssociateRoute>
        }
      />

      {/* FALLBACK */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
