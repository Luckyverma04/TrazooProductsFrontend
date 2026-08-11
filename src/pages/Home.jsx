import { useSEO } from "../hooks/useSEO";
import { seoMetadata } from "../utils/seo";
import HeroHome from "../components/HeroHome";
import Footer from "../components/Footer";

const Home = () => {
   useSEO(seoMetadata.home);
  return (
    <>
      <main>
        <HeroHome />
      </main>

      <Footer />
    </>
  );
};

export default Home;