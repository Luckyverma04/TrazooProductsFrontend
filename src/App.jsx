import { useEffect, lazy, Suspense } from "react";

import {
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

// ============================================
// PUBLIC PAGES
// ============================================

// Keep the homepage eager because it is the main/LCP page.
import LandingPage from "./components/LandingPage";

// ============================================
// PUBLIC PAGES - LAZY LOADED
// ============================================

const FAQ = lazy(() => import("./pages/FAQ"));
const Products = lazy(() => import("./components/ProductRange"));

// ============================================
// LEGAL - LAZY LOADED
// ============================================

const Terms = lazy(() => import("./pages/Terms"));
const Privacy = lazy(() => import("./pages/Privacy"));

// ============================================
// AUTH - LAZY LOADED
// ============================================

const CombinedAuth = lazy(() => import("./pages/CombinedAuth"));
const VerifyOTP = lazy(() => import("./pages/VerifyOTP"));

// ============================================
// ADMIN - LAZY LOADED
// ============================================

const AdminDashboard = lazy(
  () => import("./pages/admin/AdminDashboard")
);

const KitEnquiries = lazy(
  () => import("./pages/admin/KitEnquiries")
);

const ProductsManager = lazy(
  () => import("./pages/admin/ProductsManager")
);

const AdminLeadDetails = lazy(
  () => import("./pages/admin/AdminLeadDetails")
);

// ============================================
// ASSOCIATE - LAZY LOADED
// ============================================

const AssociateDashboard = lazy(
  () => import("./pages/associate/AssociateDashboard")
);

const MyLeads = lazy(
  () => import("./pages/associate/MyLeads")
);

const LeadDetail = lazy(
  () => import("./pages/associate/LeadDetail")
);

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

      // Give LandingPage time to render.
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
// LOADING FALLBACK
// ============================================

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFFDF9] text-[#222222] antialiased">
      <div className="text-sm font-medium">
        Loading...
      </div>
    </div>
  );
}

// ============================================
// APP
// ============================================

function App() {
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

      {/* ============================================
          LAZY PAGE LOADING
          ============================================ */}

      <Suspense fallback={<PageLoader />}>
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
      </Suspense>
    </div>
  );
}

export default App;
