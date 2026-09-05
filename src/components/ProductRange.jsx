import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Navbar";
import FormModal from "./FormModal";
import SEO from "./SEO";   
     

// Programme cards data - using programmes folder images
const PROGRAMMES = [
  {
    id: 1,
    title: 'Employee Onboarding',
    icon: '👥',
    image: new URL('../assets/programmes/onboarding.webp', import.meta.url).href,
  },
  {
    id: 2,
    title: 'Festive Gifting',
    icon: '📦',
    image: new URL('../assets/programmes/festive.webp', import.meta.url).href,
  },
  {
    id: 3,
    title: 'Rewards & Recognition',
    icon: '🏆',
    image: new URL('../assets/programmes/rewards.webp', import.meta.url).href,
  },
  {
    id: 4,
    title: 'Events & Conferences',
    icon: '🎤',
    image: new URL('../assets/programmes/events.webp', import.meta.url).href,
  },
  {
    id: 5,
    title: 'Client & Partner Gifting',
    icon: '🤝',
    image: new URL('../assets/programmes/client.webp', import.meta.url).href,
  },
  {
    id: 6,
    title: 'Institutional Gifting',
    icon: '🏛️',
    image: new URL('../assets/programmes/institutional.webp', import.meta.url).href,
  },
];

// Product ranges
const PRODUCT_RANGES = [
  {
    id: 1,
    name: 'Apparel & Wearables',
    spec: 'T-shirts, polos, jackets, caps',
    price: 500,
    image: new URL('../assets/range/apparel.webp', import.meta.url).href,
  },
  {
    id: 2,
    name: 'Drinkware',
    spec: 'Bottles, tumblers, flasks, mugs',
    price: 500,
    image: new URL('../assets/range/drinkware.webp', import.meta.url).href,
  },
  {
    id: 3,
    name: 'Bags & Travel',
    spec: 'Backpacks, laptop bags, totes',
    price: 500,
    image: new URL('../assets/range/bags.webp', import.meta.url).href,
  },
  {
    id: 4,
    name: 'Stationery & Desk',
    spec: 'Notebooks, diaries, pens, planners',
    price: 500,
    image: new URL('../assets/range/stationery.webp', import.meta.url).href,
  },
  {
    id: 5,
    name: 'Tech & Accessories',
    spec: 'Chargers, speakers, headphones',
    price: 500,
    image: new URL('../assets/range/tech.webp', import.meta.url).href,
  },
  {
    id: 6,
    name: 'Gourmet & Packaging',
    spec: 'Hampers, boxes, sleeves, inserts',
    price: 500,
    image: new URL('../assets/range/gourmet.webp', import.meta.url).href,
  },
  {
    id: 7,
    name: 'Welcome Kits',
    spec: 'Boxed sets, ready for day one',
    price: 500,
    image: new URL('../assets/range/welcome-kits.webp', import.meta.url).href,
  },
  {
    id: 8,
    name: 'Curated Kits',
    spec: 'Mixed-range kits built to one brief',
    price: 500,
    image: new URL('../assets/range/curated-kits.webp', import.meta.url).href,
  },
];

// Filter categories
const CATEGORIES = [
  'Apparel',
  'Drinkware',
  'Stationery',
  'Bags',
  'Electronics & Tech',
  'Travel',
  'Wellness',
  'Food & Hampers',
];

const PRICE_RANGES = [
  { label: 'Under ₹500', min: 0, max: 499 },
  { label: '₹500 to ₹1,000', min: 500, max: 1000 },
  { label: '₹1,000 to ₹2,500', min: 1001, max: 2500 },
  { label: '₹2,500+', min: 2501, max: Infinity },
];

const BEST_FOR = [
  'Onboarding',
  'Festive',
  'Events',
  'Rewards',
  'Client gifting',
];

/* ================= PROGRAMME CAROUSEL ================= */
const ProgrammeCarousel = () => {
  const carouselRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);

  const updateScrollState = () => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const { scrollLeft, scrollWidth, clientWidth } = carousel;
    const maxScroll = Math.max(scrollWidth - clientWidth, 0);

    setCanScrollLeft(scrollLeft > 5);
    setCanScrollRight(scrollLeft < maxScroll - 5);
    setScrollProgress(maxScroll > 0 ? (scrollLeft / maxScroll) * 100 : 0);
  };

  const scroll = (direction) => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    // Move by one complete visible "page" instead of a fixed 320px.
    // This keeps the carousel aligned even when the browser is zoomed.
    const amount = carousel.clientWidth * 0.85;

    carousel.scrollBy({
      left: direction === 'left' ? -amount : amount,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    updateScrollState();

    const carousel = carouselRef.current;
    if (!carousel) return;

    carousel.addEventListener('scroll', updateScrollState, { passive: true });
    window.addEventListener('resize', updateScrollState);

    return () => {
      carousel.removeEventListener('scroll', updateScrollState);
      window.removeEventListener('resize', updateScrollState);
    };
  }, []);

  return (
    <div className="relative mb-12">
      {/* Hide the native browser scrollbar */}
      <style>{`
        .programme-carousel-scroll {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }

        .programme-carousel-scroll::-webkit-scrollbar {
          display: none;
        }

        .programme-card {
          flex: 0 0 calc((100% - 72px) / 4);
          height: auto;
          aspect-ratio: 0.86 / 1;
        }

        @media (max-width: 1024px) {
          .programme-card {
            flex-basis: calc((100% - 24px) / 2);
            aspect-ratio: 1 / 0.9;
          }
        }

        @media (max-width: 640px) {
          .programme-card {
            flex-basis: 100%;
            aspect-ratio: 1 / 0.9;
          }
        }
      `}</style>

      {/* Navigation arrows */}
      <div className="absolute -left-14 top-1/2 -translate-y-1/2 z-20 hidden xl:block">
        <button
          onClick={() => scroll('left')}
          disabled={!canScrollLeft}
          aria-label="Previous programmes"
          className="w-10 h-10 rounded-full border border-gray-300 bg-white flex items-center justify-center hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-opacity shadow-sm"
        >
          <ChevronLeft size={20} color="#111111" strokeWidth={2} />
        </button>
      </div>

      <div className="absolute -right-14 top-1/2 -translate-y-1/2 z-20 hidden xl:block">
        <button
          onClick={() => scroll('right')}
          disabled={!canScrollRight}
          aria-label="Next programmes"
          className="w-10 h-10 rounded-full border border-gray-300 bg-white flex items-center justify-center hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-opacity shadow-sm"
        >
          <ChevronRight size={20} color="#111111" strokeWidth={2} />
        </button>
      </div>

      {/* Four cards visible on desktop */}
      <div className="overflow-hidden">
        <div
          ref={carouselRef}
          className="programme-carousel-scroll flex gap-6 overflow-x-auto scroll-smooth px-0"
          style={{ scrollBehavior: 'smooth' }}
        >
          {PROGRAMMES.map((prog) => (
            <div
              key={prog.id}
              className="programme-card rounded-3xl overflow-hidden group cursor-pointer"
            >
              <div className="relative w-full h-full">
                <img
                  src={prog.image}
                  alt={prog.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                  onError={(e) => {
                    e.target.src = firstImg;
                    e.target.style.backgroundColor = '#E8E8E8';
                  }}
                />

                {/* Dark overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                {/* Icon - Top Right */}
                <div className="absolute top-4 right-4">
                  <div className="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center text-white text-lg font-bold shadow-lg">
                    {prog.icon}
                  </div>
                </div>

                {/* Title - Bottom Left */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-white text-xl font-semibold leading-tight">
                    {prog.title}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Single slider/progress line — no native scrollbar */}
      <div className="mt-6 w-full h-1 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-orange-500 rounded-full transition-all duration-300"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>
    </div>
  );
};

/* ================= FILTER GROUP ================= */
const FilterGroup = ({ title, options, selected, onToggle }) => (
  <div className="mb-8">
    <h4 className="text-xs font-bold uppercase tracking-widest text-gray-600 mb-4">
      {title}
    </h4>
    <div className="space-y-3">
      {options.map((opt) => (
        <label key={opt} className="flex items-center gap-3 cursor-pointer group">
          <input
            type="checkbox"
            checked={selected.includes(opt)}
            onChange={() => onToggle(opt)}
            className="w-4 h-4 rounded border-gray-300 text-orange-500 cursor-pointer"
          />
          <span className="text-sm text-gray-700 group-hover:text-gray-900">
            {opt}
          </span>
        </label>
      ))}
    </div>
  </div>
);

/* ================= PRODUCT CARD ================= */
const ProductCard = ({ product, isShortlisted, onShortlist }) => {
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow bg-white">
      {/* Image */}
      <div className="aspect-square bg-gray-100 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
          loading="lazy"
          onError={(e) => {
            e.target.src = firstImg;
            e.target.style.backgroundColor = '#E8E8E8';
          }}
        />
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 text-sm mb-1">
          {product.name}
        </h3>
        <p className="text-xs text-gray-600 mb-3 leading-relaxed">
          {product.spec}
        </p>

        <p className="text-orange-500 font-bold text-sm mb-4">
          From ₹{product.price}
        </p>

        {/* Buttons */}
        <div className="space-y-2">
          <button className="w-full bg-black text-white text-xs font-semibold py-2.5 rounded-md hover:bg-gray-900 transition-colors">
            Customize
          </button>
          <button
            onClick={() => onShortlist(product)}
            className={`w-full text-xs font-semibold py-2 rounded-md border transition-colors ${
              isShortlisted
                ? 'border-orange-500 text-orange-500 bg-orange-50'
                : 'border-gray-300 text-gray-900 hover:border-gray-400 hover:bg-gray-50'
            }`}
          >
            {isShortlisted ? '✓ Added to Shortlist' : 'Add to Shortlist'}
          </button>
        </div>
      </div>
    </div>
  );
};

/* ================= MAIN COMPONENT ================= */
const ProductRange = () => {
  const [filters, setFilters] = useState({
    category: [],
    price: [],
    bestFor: [],
  });
  const [shortlist, setShortlist] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const toggle = (key) => (value) =>
    setFilters((prev) => ({
      ...prev,
      [key]: prev[key].includes(value)
        ? prev[key].filter((v) => v !== value)
        : [...prev[key], value],
    }));

  const toggleShortlist = (product) =>
    setShortlist((prev) =>
      prev.some((p) => p.id === product.id)
        ? prev.filter((p) => p.id !== product.id)
        : [...prev, product]
    );

  const clearFilters = () =>
    setFilters({
      category: [],
      price: [],
      bestFor: [],
    });

  const openForm = () => {
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
  };

  return (
    <>
      {/* SEO */}
      <SEO
        title="Corporate Gifting Products | Branded Merchandise & Custom Kits | Trazoo"
        description="Explore Trazoo corporate gifting products: branded apparel, drinkware, bags, stationery, tech accessories, gourmet hampers and custom kits for employees, clients and events across India."
        path="/products"
      />

      {/* Navbar */}
      <Navbar />

      <main className="bg-white pt-20 pb-20 px-6 md:px-8">
        <div className="max-w-7xl mx-auto">
          {/* ===== BREADCRUMB ===== */}
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-8">
           <Link to="/" className="hover:text-gray-900">Home</Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">Products</span>
          </div>

          {/* ===== HEADING ===== */}
          <div className="mb-16">
            <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-3">
              Gifting Events
            </p>
            <h1 className="text-5xl md:text-5xl font-serif text-gray-900 mb-12">
              Every occasion a company <span className="text-orange-500 italic font-serif">gifts on.</span>
            </h1>

            {/* ===== PROGRAMME CAROUSEL ===== */}
            <ProgrammeCarousel />
          </div>

          {/* ===== PRODUCT SECTION ===== */}
          <div>
            <div className="mb-10">
              <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">
                Product Range
              </p>
              <h2 className="text-3xl font-serif text-gray-900">
                Pick what goes in the box.
              </h2>
            </div>

            {/* ===== FILTERS + GRID ===== */}
            <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-12">
              {/* SIDEBAR */}
              <aside className="md:border-r md:border-gray-200 md:pr-8">
                <div className="sticky top-24">
                  <div className="mb-8">
                    <button
                      onClick={clearFilters}
                      className="text-orange-500 text-sm font-bold hover:underline"
                    >
                      Refine
                    </button>
                  </div>

                  <FilterGroup
                    title="Category"
                    options={CATEGORIES}
                    selected={filters.category}
                    onToggle={toggle('category')}
                  />

                  <FilterGroup
                    title="Budget"
                    options={PRICE_RANGES.map((r) => r.label)}
                    selected={filters.price}
                    onToggle={toggle('price')}
                  />

                  <FilterGroup
                    title="Best For"
                    options={BEST_FOR}
                    selected={filters.bestFor}
                    onToggle={toggle('bestFor')}
                  />
                </div>
              </aside>

              {/* PRODUCT GRID */}
              <div>
                <div className="mb-8 text-sm text-gray-600">
                  Show {PRODUCT_RANGES.length} products
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
                  {PRODUCT_RANGES.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      isShortlisted={shortlist.some((p) => p.id === product.id)}
                      onShortlist={toggleShortlist}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ===== CTA SECTION ===== */}
          <section className="mt-24 text-center py-16">
            <p className="text-xs font-bold uppercase tracking-widest text-orange-500 mb-4">
              Next Steps
            </p>
            <h2 className="text-4xl font-serif text-gray-900 mb-4">
              Tell us what you need to send.
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-8 text-base">
              Quantity, budget, audience and timeline. Enough for a shortlist and a delivery plan.
            </p>
            <button 
              onClick={openForm}
              className="px-8 py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors"
            >
              Request a Proposal
            </button>
          </section>
        </div>
      </main>

      {/* ===== SHORTLIST BAR ===== */}
      {shortlist.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white py-4 px-6 border-t border-gray-800">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            <div className="text-sm font-semibold">
              Shortlist ({shortlist.length} {shortlist.length === 1 ? 'item' : 'items'})
            </div>
            <button className="px-6 py-2 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors">
              View Shortlist
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <Footer />

      {/* ===== FORM MODAL ===== */}
      <FormModal
        isOpen={isFormOpen}
        onClose={closeForm}
      />
    </>
  );
};
export default ProductRange;