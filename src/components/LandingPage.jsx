import { useState, lazy, Suspense } from "react";

import Navbar from "./Navbar";
import Footer from "./Footer";
import Intro from "./Intro";
import HeroHome from "./HeroHome";
import Gallery from "./Gallery";
import WhyUs from "./Whyus";
import AboutSection from "./AboutSection";
import HailButton from "./HailButton";
import SEO from "./SEO";

// Load these only when the user actually opens them.
// This keeps their JavaScript out of the initial homepage bundle.
const FormModal = lazy(() => import("./FormModal"));
const MobileNav = lazy(() => import("./MobileNav"));

export default function LandingPage() {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const openForm = () => setIsFormOpen(true);
  const closeForm = () => setIsFormOpen(false);

  const openMobileNav = () => setIsMobileNavOpen(true);
  const closeMobileNav = () => setIsMobileNavOpen(false);

  return (
    <div className="min-h-screen bg-[#FFFDF9]">
      {/* SEO */}
      <SEO
        title="Trazoo | Corporate Gifting & Custom Merchandise in India"
        description="Trazoo is a corporate gifting partner in India for employee onboarding, client gifting, events and rewards. Explore branded merchandise, custom kits, hampers and end-to-end delivery."
        path="/"
      />

      {/* INTRO */}
      <Intro />

      {/* NAVBAR */}
      <Navbar
        onMobileNavOpen={openMobileNav}
        onEnquireClick={openForm}
      />

      {/* MAIN */}
      <main>
        {/* HERO */}
        <HeroHome onEnquireClick={openForm} />

        {/* WHY US */}
        <section id="why" className="scroll-mt-24">
          <WhyUs />
        </section>

        {/* ABOUT */}
        <section id="about" className="scroll-mt-24">
          <AboutSection onEnquireClick={openForm} />
        </section>

        {/* PROCESS / GALLERY */}
        <section id="process" className="scroll-mt-24">
          <Gallery onEnquireClick={openForm} />
        </section>
      </main>

      {/* FOOTER */}
      <Footer />

      {/* FORM MODAL - loaded only after the user opens it */}
      {isFormOpen && (
        <Suspense fallback={null}>
          <FormModal
            isOpen={isFormOpen}
            onClose={closeForm}
          />
        </Suspense>
      )}

      {/* MOBILE NAVIGATION - loaded only after the user opens it */}
      {isMobileNavOpen && (
        <Suspense fallback={null}>
          <MobileNav
            isOpen={isMobileNavOpen}
            onClose={closeMobileNav}
            onEnquireClick={openForm}
          />
        </Suspense>
      )}

      {/* FLOATING ENQUIRE BUTTON */}
      <HailButton onEnquireClick={openForm} />
    </div>
  );
}
