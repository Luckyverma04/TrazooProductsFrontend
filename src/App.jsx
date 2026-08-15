import { useEffect } from "react";
import {
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

import Navbar from "./components/Navbar";

// Public pages
import Home from "./pages/Home";
import Hero from "./components/Hero";
import About from "./pages/About";
import ProductRange from "./components/ProductRange";
import Customization from "./components/Customization";
import Requirements from "./components/Requirements";
import Fulfilment from "./components/Fulfilment";
import OurWork from "./components/OurWork";
import FAQ from "./pages/FAQ";
import Footer from "./components/Footer";

// Legal pages
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";

// Auth
import CombinedAuth from "./pages/CombinedAuth";
import VerifyOTP from "./pages/VerifyOTP";

// Admin
import AdminDashboard from "./pages/admin/AdminDashboard";
import KitEnquiries from "./pages/admin/KitEnquiries";
import ProductsManager from "./pages/admin/ProductsManager";
import AdminLeadDetails from "./pages/admin/AdminLeadDetails";

// Associate
import AssociateDashboard from "./pages/associate/AssociateDashboard";
import MyLeads from "./pages/associate/MyLeads";
import LeadDetail from "./pages/associate/LeadDetail";

// Protection
import AdminRoute from "./routes/AdminRoute";
import AssociateRoute from "./routes/AssociateRoute";


// ======================================================
// SCROLL TO TOP
// ======================================================

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, [pathname]);

  return null;
}


// ======================================================
// SOLUTIONS PAGE
// ======================================================

function SolutionsPage() {
  return (
    <>
      <Hero />
      <Footer />
    </>
  );
}


// ======================================================
// APP
// ======================================================

function App() {
  useEffect(() => {
    const id = "trazoo-manrope-font";

    if (document.getElementById(id)) {
      return;
    }

    const link = document.createElement("link");

    link.id = id;
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap";

    document.head.appendChild(link);
  }, []);

  return (
    <div
      className="min-h-screen bg-[#FFFDF9] text-[#222222] antialiased"
      style={{
        fontFamily: "'Manrope', system-ui, sans-serif",
      }}
    >

      {/* ONE GLOBAL NAVBAR ONLY */}
      <Navbar />

      {/* RESET SCROLL POSITION ON EVERY ROUTE CHANGE */}
      <ScrollToTop />

      <Routes>

        {/* ================= PUBLIC ================= */}

        {/* HOME */}
        <Route
          path="/"
          element={<Home />}
        />

        {/* ABOUT US */}
        <Route
          path="/about"
          element={<About />}
        />

        {/* SOLUTIONS */}
        <Route
          path="/solutions"
          element={<SolutionsPage />}
        />

        {/* PRODUCTS */}
        <Route
          path="/products"
          element={<ProductRange />}
        />

        {/* ✅ CUSTOMIZATION - FIXED PATH */}
        <Route
          path="/customize"
          element={<Customization />}
        />

        {/* REQUIREMENTS */}
        <Route
          path="/requirements"
          element={<Requirements />}
        />

        {/* FULFILMENT */}
        <Route
          path="/fulfilment"
          element={<Fulfilment />}
        />

        {/* OUR WORK */}
        <Route
          path="/our-work"
          element={<OurWork />}
        />

        {/* FAQ */}
        <Route
          path="/faq"
          element={<FAQ />}
        />


        {/* ================= LEGAL ================= */}

        {/* TERMS OF SERVICE */}
        <Route
          path="/terms"
          element={<Terms />}
        />

        {/* PRIVACY POLICY */}
        <Route
          path="/privacy"
          element={<Privacy />}
        />


        {/* ================= AUTH ================= */}

        <Route
          path="/auth"
          element={<CombinedAuth />}
        />

        <Route
          path="/verify-otp"
          element={<VerifyOTP />}
        />


        {/* ================= ADMIN ================= */}

        <Route
          path="/admin/dashboard"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/products"
          element={
            <AdminRoute>
              <ProductsManager />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/kit-enquiries"
          element={
            <AdminRoute>
              <KitEnquiries />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/lead/:id"
          element={
            <AdminRoute>
              <AdminLeadDetails />
            </AdminRoute>
          }
        />


        {/* ================= ASSOCIATE ================= */}

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


        {/* ================= 404 ================= */}

        <Route
          path="*"
          element={
            <Navigate
              to="/"
              replace
            />
          }
        />

      </Routes>
    </div>
  );
}

export default App;