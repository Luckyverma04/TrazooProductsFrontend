import { useState } from "react";

import Navbar from "./Navbar";
import Footer from "./Footer";
import Intro from "./Intro";
import HeroHome from "./HeroHome";
import Gallery from "./Gallery";
import WhyUs from "./Whyus";
import AboutSection from "./AboutSection";
import FormModal from "./FormModal";
import MobileNav from "./MobileNav";
import HailButton from "./HailButton";

export default function LandingPage() {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);

  // ============================================
  // FORM
  // ============================================

  const openForm = () => {
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
  };

  // ============================================
  // MOBILE NAV
  // ============================================

  const openMobileNav = () => {
    setIsMobileNavOpen(true);
  };

  const closeMobileNav = () => {
    setIsMobileNavOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#FFFDF9]">

      {/* ============================================
          INTRO
      ============================================ */}

      <Intro />

      {/* ============================================
          NAVBAR
      ============================================ */}

      <Navbar
        onMobileNavOpen={openMobileNav}
        onEnquireClick={openForm}
      />

      {/* ============================================
          MAIN
      ============================================ */}

      <main>

        {/* ============================================
            HERO
        ============================================ */}

        <HeroHome
          onEnquireClick={openForm}
        />

        {/* ============================================
            ABOUT
            Navbar → About Us → /#about
        ============================================ */}
   <section
          id="why"
          className="scroll-mt-24"
        >
          <WhyUs />
        </section>

        <section
          id="about"
          className="scroll-mt-24"
        >
          <AboutSection
            onEnquireClick={openForm}
          />
        </section>


     

        <section
          id="process"
          className="scroll-mt-24"
        >
          <Gallery
            onEnquireClick={openForm}
          />
        </section>

      </main>

      {/* ============================================
          FOOTER
      ============================================ */}

      <Footer />

      {/* ============================================
          FORM MODAL
      ============================================ */}

      <FormModal
        isOpen={isFormOpen}
        onClose={closeForm}
      />

      {/* ============================================
          MOBILE NAVIGATION
      ============================================ */}

      <MobileNav
        isOpen={isMobileNavOpen}
        onClose={closeMobileNav}
        onEnquireClick={openForm}
      />

      {/* ============================================
          FLOATING ENQUIRE BUTTON
      ============================================ */}

      <HailButton
        onEnquireClick={openForm}
      />

    </div>
  );
}