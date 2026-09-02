import { useEffect } from "react";

import {
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

// ============================================
// PUBLIC PAGES
// ============================================

import LandingPage from "./components/LandingPage";
import FAQ from "./pages/FAQ";
import Products from "./components/ProductRange";

// ============================================
// LEGAL
// ============================================

import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";

// ============================================
// AUTH
// ============================================

import CombinedAuth from "./pages/CombinedAuth";
import VerifyOTP from "./pages/VerifyOTP";

// ============================================
// ADMIN
// ============================================

import AdminDashboard from "./pages/admin/AdminDashboard";
import KitEnquiries from "./pages/admin/KitEnquiries";
import ProductsManager from "./pages/admin/ProductsManager";
import AdminLeadDetails from "./pages/admin/AdminLeadDetails";

// ============================================
// ASSOCIATE
// ============================================

import AssociateDashboard from "./pages/associate/AssociateDashboard";
import MyLeads from "./pages/associate/MyLeads";
import LeadDetail from "./pages/associate/LeadDetail";

// ============================================
// ROUTE PROTECTION
// ============================================

import AdminRoute from "./routes/AdminRoute";
import AssociateRoute from "./routes/AssociateRoute";

// ============================================
// SCROLL / HASH HANDLER
// ============================================

function ScrollHandler() {
  const location = useLocation();

  useEffect(() => {
    // ============================================
    // HASH PRESENT
    // Example:
    // /#why
    // /#about
    // ============================================

    if (location.hash) {
      const scrollToHash = () => {
        const id = location.hash.substring(1);

        const element = document.getElementById(id);

        if (element) {
          element.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      };

      // Give LandingPage time to render
      const timer = setTimeout(scrollToHash, 100);

      return () => clearTimeout(timer);
    }

    // ============================================
    // NORMAL PAGE / ROUTE CHANGE
    // ============================================

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, [location.pathname, location.hash]);

  return null;
}

// ============================================
// APP
// ============================================

function App() {
  // ============================================
  // LOAD MANROPE FONT
  // ============================================

  useEffect(() => {
    const id = "trazoo-manrope-font";

    // Don't load twice
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
      className="
        min-h-screen
        bg-[#FFFDF9]
        text-[#222222]
        antialiased
      "
      style={{
        fontFamily: "'Manrope', system-ui, sans-serif",
      }}
    >
      {/* ============================================
          GLOBAL SCROLL HANDLER
          ============================================ */}

      <ScrollHandler />

      <Routes>

        {/* ============================================
            PUBLIC
            ============================================ */}

        {/* HOME PAGE */}
        <Route
          path="/"
          element={<LandingPage />}
        />

        {/* ============================================
            ABOUT
            ============================================

            About is NOT a separate page anymore.

            Old /about URL automatically goes to:
            /#about
        */}

        <Route
          path="/about"
          element={
            <Navigate
              to="/#about"
              replace
            />
          }
        />

        {/* ============================================
            HOW WE WORK
            ============================================

            Client website:
            How We Work -> Gallery.jsx
        */}

        {/* ============================================
            PRODUCT
            ============================================

            Product is the ONLY separate main page.
        */}

        <Route
          path="/products"
          element={<Products />}
        />

        {/* ============================================
            FAQ
            ============================================ */}

        <Route
          path="/faq"
          element={<FAQ />}
        />

        {/* ============================================
            LEGAL
            ============================================ */}

        <Route
          path="/terms"
          element={<Terms />}
        />

        <Route
          path="/privacy"
          element={<Privacy />}
        />

        {/* ============================================
            AUTH
            ============================================ */}

        <Route
          path="/auth"
          element={<CombinedAuth />}
        />

        <Route
          path="/verify-otp"
          element={<VerifyOTP />}
        />

        {/* ============================================
            ADMIN
            ============================================ */}

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

        {/* ============================================
            ASSOCIATE
            ============================================ */}

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

        {/* ============================================
            404
            ============================================ */}

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