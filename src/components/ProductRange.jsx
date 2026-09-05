import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Filter, X } from "lucide-react";
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
    price: 249,
    image: new URL('../assets/range/apparel.webp', import.meta.url).href,
  },
  {
    id: 2,
    name: 'Drinkware',
    spec: 'Bottles, tumblers, flasks, mugs',
    price: 149,
    image: new URL('../assets/range/drinkware.webp', import.meta.url).href,
  },
  {
    id: 3,
    name: 'Bags & Travel',
    spec: 'Backpacks, laptop bags, totes',
    price: 399,
    image: new URL('../assets/range/bags.webp', import.meta.url).href,
  },
  {
    id: 4,
    name: 'Stationery & Desk',
    spec: 'Notebooks, diaries, pens, planners',
    price: 99,
    image: new URL('../assets/range/stationery.webp', import.meta.url).href,
  },
  {
    id: 5,
    name: 'Tech & Accessories',
    spec: 'Chargers, speakers, headphones',
    price: 399,
    image: new URL('../assets/range/tech.webp', import.meta.url).href,
  },
  {
    id: 6,
    name: 'Gourmet & Packaging',
    spec: 'Hampers, boxes, sleeves, inserts',
    price: 149,
    image: new URL('../assets/range/gourmet.webp', import.meta.url).href,
  },
  {
    id: 7,
    name: 'Welcome Kits',
    spec: 'Boxed sets, ready for day one',
    price: 299,
    image: new URL('../assets/range/welcome-kits.webp', import.meta.url).href,
  },
  {
    id: 8,
    name: 'Curated Kits',
    spec: 'Mixed-range kits built to one brief',
    price: 499,
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
  const autoScrollIntervalRef = useRef(null);

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

  // Auto-scroll function
  const autoScroll = () => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const { scrollLeft, scrollWidth, clientWidth } = carousel;
    const maxScroll = scrollWidth - clientWidth;

    // If reached end, scroll back to start
    if (scrollLeft >= maxScroll - 10) {
      carousel.scrollTo({
        left: 0,
        behavior: 'smooth',
      });
    } else {
      const amount = carousel.clientWidth * 0.85;
      carousel.scrollBy({
        left: amount,
        behavior: 'smooth',
      });
    }
  };

  // Start auto-scroll on mount
  useEffect(() => {
    updateScrollState();

    const carousel = carouselRef.current;
    if (!carousel) return;

    // Auto-scroll every 5 seconds
    autoScrollIntervalRef.current = setInterval(autoScroll, 5000);

    carousel.addEventListener('scroll', updateScrollState, { passive: true });
    window.addEventListener('resize', updateScrollState);

    return () => {
      if (autoScrollIntervalRef.current) {
        clearInterval(autoScrollIntervalRef.current);
      }
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

      {/* Navigation arrows - Desktop Only */}
      <div className="absolute -left-14 top-1/2 -translate-y-1/2 z-20 hidden 2xl:block">
        <button
          onClick={() => scroll('left')}
          disabled={!canScrollLeft}
          aria-label="Previous programmes"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-gray-300 bg-white shadow-sm transition-opacity hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-30"
        >
          <ChevronLeft size={20} color="#111111" strokeWidth={2} />
        </button>
      </div>

      <div className="absolute -right-14 top-1/2 -translate-y-1/2 z-20 hidden 2xl:block">
        <button
          onClick={() => scroll('right')}
          disabled={!canScrollRight}
          aria-label="Next programmes"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-gray-300 bg-white shadow-sm transition-opacity hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-30"
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
                  width="640"
                  height="744"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                  decoding="async"
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

/* ================= MOBILE FILTER DRAWER ================= */
const MobileFilterDrawer = ({ isOpen, onClose, filters, onToggle, onClearFilters }) => {
  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed inset-0 bg-white z-40 md:hidden overflow-y-auto transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-y-0' : 'translate-y-full'
        }`}
        style={{
          top: 'auto',
          bottom: isOpen ? 0 : 'auto',
          maxHeight: isOpen ? '90vh' : 0,
        }}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
          <button
            type="button"
            onClick={onClose}
            className="flex h-11 w-11 items-center justify-center rounded-lg text-gray-600 hover:text-gray-900"
            aria-label="Close filters"
          >
            <X size={24} />
          </button>
        </div>

        {/* Filter Content */}
        <div className="p-4 pb-24">
          <button
            type="button"
            onClick={onClearFilters}
            className="min-h-11 text-orange-500 text-sm font-bold hover:underline mb-6"
          >
            Clear All Filters
          </button>

          <FilterGroup
            title="Category"
            options={CATEGORIES}
            selected={filters.category}
            onToggle={onToggle('category')}
          />

          <FilterGroup
            title="Budget"
            options={PRICE_RANGES.map((r) => r.label)}
            selected={filters.price}
            onToggle={onToggle('price')}
          />

          <FilterGroup
            title="Best For"
            options={BEST_FOR}
            selected={filters.bestFor}
            onToggle={onToggle('bestFor')}
          />
        </div>

        {/* Footer Action */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 md:hidden">
          <button
            type="button"
            onClick={onClose}
            className="min-h-11 w-full rounded-lg bg-orange-500 py-3 font-semibold text-white transition-colors hover:bg-orange-600"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </>
  );
};

/* ================= PRODUCT CARD ================= */
const ProductCard = ({ product, isShortlisted, onShortlist }) => {
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow bg-white">
      {/* Image */}
      <div className="aspect-square bg-gray-100 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          width="640"
          height="640"
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
          loading="lazy"
          decoding="async"
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
          <button
            type="button"
            className="min-h-11 w-full rounded-md bg-black py-2.5 text-xs font-semibold text-white transition-colors hover:bg-gray-900"
          >
            Customize
          </button>
          <button
            onClick={() => onShortlist(product)}
            className={`min-h-11 w-full rounded-md border py-2 text-xs font-semibold transition-colors ${
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
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);

  // Count active filters
  const activeFilterCount = 
    filters.category.length + filters.price.length + filters.bestFor.length;

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

      <main className="bg-white pt-20 pb-20 px-4 md:px-8">
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
            <h1 className="text-4xl md:text-5xl font-serif text-gray-900 mb-12">
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
            <div>
              {/* Mobile Filter Button */}
              <div className="mb-6 md:hidden">
                <button
                  type="button"
                  onClick={() => setIsFilterDrawerOpen(true)}
                  className="flex min-h-11 w-full items-center justify-center gap-2 rounded-lg border border-gray-300 px-4 py-3 font-semibold text-gray-900 transition-colors hover:bg-gray-50"
                >
                  <Filter size={20} />
                  <span>Filters</span>
                  {activeFilterCount > 0 && (
                    <span className="ml-auto bg-orange-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                      {activeFilterCount}
                    </span>
                  )}
                </button>
              </div>

              {/* Desktop Sidebar + Mobile Products Grid */}
              <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-12">
                {/* Desktop SIDEBAR - Hidden on mobile */}
                <aside className="hidden md:block md:border-r md:border-gray-200 md:pr-8">
                  <div className="sticky top-24">
                    <div className="mb-8">
                      <button
                        onClick={clearFilters}
                        className="min-h-11 text-orange-500 text-sm font-bold hover:underline"
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

                {/* PRODUCT GRID - Full width on mobile */}
                <div>
                  <div className="mb-8 text-sm text-gray-600">
                    Show {PRODUCT_RANGES.length} products
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
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
          </div>

          {/* ===== CTA SECTION ===== */}
          <section className="mt-24 text-center py-16">
            <p className="text-xs font-bold uppercase tracking-widest text-orange-500 mb-4">
              Next Steps
            </p>
            <h2 className="text-3xl md:text-4xl font-serif text-gray-900 mb-4">
              Tell us what you need to send.
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-8 text-sm md:text-base">
              Quantity, budget, audience and timeline. Enough for a shortlist and a delivery plan.
            </p>
            <button 
              onClick={openForm}
              className="min-h-11 rounded-lg bg-orange-500 px-8 py-3 font-semibold text-white transition-colors hover:bg-orange-600"
            >
              Request a Proposal
            </button>
          </section>
        </div>
      </main>

      {/* ===== SHORTLIST BAR ===== */}
      {shortlist.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white py-4 px-4 md:px-6 border-t border-gray-800">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            <div className="text-sm font-semibold">
              Shortlist ({shortlist.length} {shortlist.length === 1 ? 'item' : 'items'})
            </div>
            <button className="px-6 py-2 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors text-sm md:text-base">
              View Shortlist
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <Footer />

      {/* ===== MOBILE FILTER DRAWER ===== */}
      <MobileFilterDrawer
        isOpen={isFilterDrawerOpen}
        onClose={() => setIsFilterDrawerOpen(false)}
        filters={filters}
        onToggle={toggle}
        onClearFilters={clearFilters}
      />

      {/* ===== FORM MODAL ===== */}
      <FormModal
        isOpen={isFormOpen}
        onClose={closeForm}
      />
    </>
  );
};

export default ProductRange;