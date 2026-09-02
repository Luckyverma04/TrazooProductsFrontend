import { useSEO } from "../hooks/useSEO";
import { seoMetadata } from "../utils/seo";
import HeroHome from "../components/HeroHome";
import About from "../components/About";  // ← CHANGE THIS LINE
import Process from "../components/Process";
import OurWork from "../components/OurWork";
import Footer from "../components/Footer";

const Home = () => {
  useSEO(seoMetadata.home);
  return (
    <>
      <main>
        <HeroHome />
        <About />
        <Process />
        <OurWork />
      </main>
    </>
  );
};

export default Home;