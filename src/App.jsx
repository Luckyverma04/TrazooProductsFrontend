import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import TrustSection from "./components/TrustSection";
import Footer from "./components/Footer";
import Customization from "./components/Customization";

import ProductRange from "./components/ProductRange";
import OurWork from "./components/OurWork";
import Requirements from "./components/Requirements";
import Fulfilment from "./components/Fulfilment";

import CombinedAuth from "./pages/CombinedAuth";
import VerifyOTP from "./pages/VerifyOTP";

import AdminDashboard from "./pages/admin/AdminDashboard";
import KitEnquiries from "./pages/admin/KitEnquiries";
import ProductsManager from "./pages/admin/ProductsManager";
import AdminLeadDetails from "./pages/admin/AdminLeadDetails";

import AssociateDashboard from "./pages/associate/AssociateDashboard";
import MyLeads from "./pages/associate/MyLeads";
import LeadDetail from "./pages/associate/LeadDetail";

import AdminRoute from "./routes/AdminRoute";
import AssociateRoute from "./routes/AssociateRoute";

const homeTrustColumns = [
  {
    title: "Trusted by Enterprises",
    items: ["Infosys", "HCLTech", "Amazon", "Flipkart", "Rapido", "Masai"],
  },
  {
    title: "Chosen by Institutions",
    items: [
      "IIM Mumbai",
      "BITSoM",
      "IIT Mandi",
      "IIT Roorkee",
      "IIT Madras",
      "IIIT Bangalore",
      "IIM Indore",
      "IIM Nagpur",
    ],
  },
];

function HomePage() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <TrustSection columns={homeTrustColumns} />
      </main>

      <Footer />
    </>
  );
}

function App() {
  useEffect(() => {
    const id = "trazoo-manrope-font";

    if (document.getElementById(id)) return;

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
      <Routes>

        {/* ================= PUBLIC ================= */}

        <Route path="/" element={<HomePage />} />

        <Route
          path="/products"
          element={<ProductRange />}
        />

        {/* ✅ THIS WAS MISSING */}
        <Route
          path="/requirements"
          element={<Requirements />}
        />

        <Route
          path="/our-work"
          element={<OurWork />}
        />
        <Route
  path="/customisation"
  element={<Customization />}
/>

        {/* ================= FULFILMENT ================= */}
        <Route
          path="/fulfilment"
          element={<Fulfilment />}
        />

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
          element={<Navigate to="/" replace />}
        />

      </Routes>
    </div>
  );
}

export default App;