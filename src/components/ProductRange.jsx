import { lazy, Suspense, useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Filter, X } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Navbar";
import SEO from "./SEO";

const FormModal = lazy(() => import("./FormModal"));

const PROGRAMMES = [
  { id: 1, title: "Employee Onboarding", icon: "👥", image: new URL("../assets/programmes/onboarding.webp", import.meta.url).href },
  { id: 2, title: "Festive Gifting", icon: "📦", image: new URL("../assets/programmes/festive.webp", import.meta.url).href },
  { id: 3, title: "Rewards & Recognition", icon: "🏆", image: new URL("../assets/programmes/rewards.webp", import.meta.url).href },
  { id: 4, title: "Events & Conferences", icon: "🎤", image: new URL("../assets/programmes/events.webp", import.meta.url).href },
  { id: 5, title: "Client & Partner Gifting", icon: "🤝", image: new URL("../assets/programmes/client.webp", import.meta.url).href },
  { id: 6, title: "Institutional Gifting", icon: "🏛️", image: new URL("../assets/programmes/institutional.webp", import.meta.url).href },
];

const PRODUCT_RANGES = [
  { id: 1, name: "Apparel & Wearables", spec: "T-shirts, polos, jackets, caps", price: 500, image: new URL("../assets/range/apparel.webp", import.meta.url).href },
  { id: 2, name: "Drinkware", spec: "Bottles, tumblers, flasks, mugs", price: 500, image: new URL("../assets/range/drinkware.webp", import.meta.url).href },
  { id: 3, name: "Bags & Travel", spec: "Backpacks, laptop bags, totes", price: 500, image: new URL("../assets/range/bags.webp", import.meta.url).href },
  { id: 4, name: "Stationery & Desk", spec: "Notebooks, diaries, pens, planners", price: 500, image: new URL("../assets/range/stationery.webp", import.meta.url).href },
  { id: 5, name: "Tech & Accessories", spec: "Chargers, speakers, headphones", price: 500, image: new URL("../assets/range/tech.webp", import.meta.url).href },
  { id: 6, name: "Gourmet & Packaging", spec: "Hampers, boxes, sleeves, inserts", price: 500, image: new URL("../assets/range/gourmet.webp", import.meta.url).href },
  { id: 7, name: "Welcome Kits", spec: "Boxed sets, ready for day one", price: 500, image: new URL("../assets/range/welcome-kits.webp", import.meta.url).href },
  { id: 8, name: "Curated Kits", spec: "Mixed-range kits built to one brief", price: 500, image: new URL("../assets/range/curated-kits.webp", import.meta.url).href },
];

const CATEGORIES = [
  "Apparel",
  "Drinkware",
  "Stationery",
  "Bags",
  "Electronics & Tech",
  "Travel",
  "Wellness",
  "Food & Hampers",
];

const PRICE_RANGES = [
  { label: "Under ₹500", min: 0, max: 499 },
  { label: "₹500 to ₹1,000", min: 500, max: 1000 },
  { label: "₹1,000 to ₹2,500", min: 1001, max: 2500 },
  { label: "₹2,500+", min: 2501, max: Infinity },
];

const BEST_FOR = ["Onboarding", "Festive", "Events", "Rewards", "Client gifting"];

const PROGRAMME_CARD_CLASS =
  "flex-[0_0_100%] aspect-[1/0.9] snap-start snap-always overflow-hidden rounded-3xl sm:flex-[0_0_calc((100%_-_24px)_/_2)] lg:flex-[0_0_calc((100%_-_72px)_/_4)] lg:aspect-[0.86/1]";

const ProgrammeCarousel = () => {
  const carouselRef = useRef(null);
  const autoScrollRef = useRef(null);
  const rafRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const updateScrollState = useCallback(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    if (rafRef.current) cancelAnimationFrame(rafRef.current);

    rafRef.current = requestAnimationFrame(() => {
      const { scrollLeft, scrollWidth, clientWidth } = carousel;
      const maxScroll = Math.max(scrollWidth - clientWidth, 0);

      setCanScrollLeft(scrollLeft > 5);
      setCanScrollRight(scrollLeft < maxScroll - 5);
      setScrollProgress(maxScroll > 0 ? (scrollLeft / maxScroll) * 100 : 0);
    });
  }, []);

  const scroll = useCallback((direction) => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    carousel.scrollBy({
      left: direction === "left" ? -carousel.clientWidth * 0.85 : carousel.clientWidth * 0.85,
      behavior: "smooth",
    });
  }, []);

  const autoScroll = useCallback(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const maxScroll = Math.max(carousel.scrollWidth - carousel.clientWidth, 0);

    if (maxScroll <= 0) return;

    if (carousel.scrollLeft >= maxScroll - 10) {
      carousel.scrollTo({ left: 0, behavior: "smooth" });
      return;
    }

    const amount = isMobile ? carousel.clientWidth : carousel.clientWidth * 0.22;
    carousel.scrollBy({ left: amount, behavior: "smooth" });
  }, [isMobile]);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return undefined;

    const mediaQuery = window.matchMedia("(max-width: 767px)");
    const handleMediaChange = (event) => setIsMobile(event.matches);

    setIsMobile(mediaQuery.matches);
    mediaQuery.addEventListener?.("change", handleMediaChange);

    updateScrollState();
    carousel.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState, { passive: true });

    return () => {
      carousel.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
      mediaQuery.removeEventListener?.("change", handleMediaChange);

      if (autoScrollRef.current) clearInterval(autoScrollRef.current);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [updateScrollState]);

  useEffect(() => {
    autoScrollRef.current = setInterval(autoScroll, isMobile ? 3000 : 5000);
    return () => {
      if (autoScrollRef.current) clearInterval(autoScrollRef.current);
    };
  }, [autoScroll, isMobile]);

  return (
    <div className="relative mb-12">
      <div className="absolute -left-14 top-1/2 z-20 hidden -translate-y-1/2 2xl:block">
        <button
          type="button"
          onClick={() => scroll("left")}
          disabled={!canScrollLeft}
          aria-label="Previous programmes"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-gray-300 bg-white shadow-sm transition-[opacity,background-color] duration-200 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-30"
        >
          <ChevronLeft size={20} aria-hidden="true" />
        </button>
      </div>

      <div className="absolute -right-14 top-1/2 z-20 hidden -translate-y-1/2 2xl:block">
        <button
          type="button"
          onClick={() => scroll("right")}
          disabled={!canScrollRight}
          aria-label="Next programmes"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-gray-300 bg-white shadow-sm transition-[opacity,background-color] duration-200 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-30"
        >
          <ChevronRight size={20} aria-hidden="true" />
        </button>
      </div>

      <div className="overflow-hidden">
        <div
          ref={carouselRef}
          className="flex snap-x gap-6 overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          aria-label="Gifting programmes"
        >
          {PROGRAMMES.map((programme, index) => (
            <article key={programme.id} className={PROGRAMME_CARD_CLASS}>
              <div className="group relative h-full w-full">
                <img
                  src={programme.image}
                  alt={programme.title}
                  width="640"
                  height="744"
                  sizes="(max-width: 639px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading={index < 4 ? "eager" : "lazy"}
                  decoding="async"
                />

                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                <div
                  aria-hidden="true"
                  className="absolute right-4 top-4 flex h-12 w-12 items-center justify-center rounded-full bg-orange-500 text-lg font-bold text-white shadow-lg"
                >
                  {programme.icon}
                </div>

                <div className="absolute inset-x-0 bottom-0 p-6">
                  <h3 className="text-xl font-semibold leading-tight text-white">
                    {programme.title}
                  </h3>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div
        className="mt-6 h-1 w-full overflow-hidden rounded-full bg-gray-200"
        role="progressbar"
        aria-label="Programme carousel progress"
        aria-valuemin="0"
        aria-valuemax="100"
        aria-valuenow={Math.round(scrollProgress)}
      >
        <div
          className="h-full rounded-full bg-orange-500 transition-[width] duration-300"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>
    </div>
  );
};

const FilterGroup = ({ title, options, selected, onToggle }) => (
  <fieldset className="mb-8">
    <legend className="mb-4 text-xs font-bold uppercase tracking-widest text-gray-600">
      {title}
    </legend>

    <div className="space-y-2">
      {options.map((option) => (
        <label
          key={option}
          className="flex min-h-11 cursor-pointer items-center gap-3 text-sm text-gray-700"
        >
          <input
            type="checkbox"
            checked={selected.includes(option)}
            onChange={() => onToggle(option)}
            className="h-5 w-5 cursor-pointer rounded border-gray-300 text-orange-500 focus:ring-2 focus:ring-orange-500"
          />
          <span className="transition-colors duration-200 group-hover:text-gray-900">
            {option}
          </span>
        </label>
      ))}
    </div>
  </fieldset>
);

const MobileFilterDrawer = ({
  isOpen,
  onClose,
  filters,
  onToggle,
  onClearFilters,
}) => (
  <>
    {isOpen && (
      <div
        className="fixed inset-0 z-30 bg-black/50 md:hidden"
        onClick={onClose}
        aria-hidden="true"
      />
    )}

    <div
      className={`fixed inset-x-0 bottom-0 z-40 max-h-[90vh] overflow-y-auto rounded-t-2xl bg-white shadow-2xl transition-transform duration-300 ease-in-out md:hidden ${
        isOpen ? "translate-y-0" : "pointer-events-none translate-y-full"
      }`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="mobile-filter-title"
    >
      <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-200 bg-white p-4">
        <h2 id="mobile-filter-title" className="text-lg font-semibold text-gray-900">
          Filters
        </h2>

        <button
          type="button"
          onClick={onClose}
          className="flex h-11 w-11 items-center justify-center rounded-lg text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900"
          aria-label="Close filters"
        >
          <X size={24} aria-hidden="true" />
        </button>
      </div>

      <div className="p-4 pb-24">
        <button
          type="button"
          onClick={onClearFilters}
          className="mb-6 flex min-h-11 items-center text-sm font-bold text-orange-500 hover:underline"
        >
          Clear All Filters
        </button>

        <FilterGroup
          title="Category"
          options={CATEGORIES}
          selected={filters.category}
          onToggle={onToggle("category")}
        />

        <FilterGroup
          title="Budget"
          options={PRICE_RANGES.map((range) => range.label)}
          selected={filters.price}
          onToggle={onToggle("price")}
        />

        <FilterGroup
          title="Best For"
          options={BEST_FOR}
          selected={filters.bestFor}
          onToggle={onToggle("bestFor")}
        />
      </div>

      <div className="fixed inset-x-0 bottom-0 border-t border-gray-200 bg-white p-4">
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

const ProductCard = ({ product, isShortlisted, onShortlist, onCustomize }) => (
  <article className="overflow-hidden rounded-xl border border-gray-200 bg-white transition-shadow duration-200 hover:shadow-md">
    <div className="aspect-square overflow-hidden bg-gray-100">
      <img
        src={product.image}
        alt={product.name}
        width="500"
        height="500"
        sizes="(max-width: 639px) 50vw, (max-width: 1023px) 33vw, 25vw"
        className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
        loading="lazy"
        decoding="async"
      />
    </div>

    <div className="p-4">
      <h3 className="mb-1 text-sm font-semibold text-gray-900">{product.name}</h3>

      <p className="mb-3 text-xs leading-relaxed text-gray-600">{product.spec}</p>

      <p className="mb-4 text-sm font-bold text-orange-500">From ₹{product.price}</p>

      <div className="space-y-2">
        <button
          type="button"
          onClick={onCustomize}
          className="min-h-11 w-full rounded-md bg-black px-3 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-gray-900"
        >
          Customize
        </button>

        <button
          type="button"
          onClick={() => onShortlist(product)}
          className={`min-h-11 w-full rounded-md border px-3 py-2 text-xs font-semibold transition-colors ${
            isShortlisted
              ? "border-orange-500 bg-orange-50 text-orange-500"
              : "border-gray-300 text-gray-900 hover:border-gray-400 hover:bg-gray-50"
          }`}
        >
          {isShortlisted ? "✓ Added to Shortlist" : "Add to Shortlist"}
        </button>
      </div>
    </div>
  </article>
);

const ProductRange = () => {
  const [filters, setFilters] = useState({
    category: [],
    price: [],
    bestFor: [],
  });
  const [shortlist, setShortlist] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);

  const activeFilterCount =
    filters.category.length + filters.price.length + filters.bestFor.length;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const toggle = useCallback(
    (key) => (value) => {
      setFilters((previous) => ({
        ...previous,
        [key]: previous[key].includes(value)
          ? previous[key].filter((item) => item !== value)
          : [...previous[key], value],
      }));
    },
    []
  );

  const toggleShortlist = useCallback((product) => {
    setShortlist((previous) =>
      previous.some((item) => item.id === product.id)
        ? previous.filter((item) => item.id !== product.id)
        : [...previous, product]
    );
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({ category: [], price: [], bestFor: [] });
  }, []);

  const openForm = useCallback(() => setIsFormOpen(true), []);
  const closeForm = useCallback(() => setIsFormOpen(false), []);

  return (
    <>
      <SEO
        title="Corporate Gifting Products | Branded Merchandise & Custom Kits | Trazoo"
        description="Explore Trazoo corporate gifting products: branded apparel, drinkware, bags, stationery, tech accessories, gourmet hampers and custom kits for employees, clients and events across India."
        path="/products"
      />

      <Navbar />

      <main className="bg-white px-4 pb-20 pt-20 md:px-8">
        <div className="mx-auto max-w-7xl">
          <nav
            aria-label="Breadcrumb"
            className="mb-8 flex items-center gap-2 text-sm text-gray-600"
          >
            <Link to="/" className="transition-colors hover:text-gray-900">
              Home
            </Link>
            <span aria-hidden="true">/</span>
            <span className="font-medium text-gray-900" aria-current="page">
              Products
            </span>
          </nav>

          <header className="mb-16">
            <p className="mb-3 text-xs font-bold uppercase tracking-widest text-gray-500">
              Gifting Events
            </p>

            <h1 className="mb-12 font-serif text-4xl text-gray-900 md:text-5xl">
              Every occasion a company{" "}
              <span className="font-serif italic text-orange-500">gifts on.</span>
            </h1>

            <ProgrammeCarousel />
          </header>

          <section aria-labelledby="product-range-title">
            <div className="mb-10">
              <p className="mb-2 text-xs font-bold uppercase tracking-widest text-gray-500">
                Product Range
              </p>

              <h2 id="product-range-title" className="font-serif text-3xl text-gray-900">
                Pick what goes in the box.
              </h2>
            </div>

            <div>
              <div className="mb-6 md:hidden">
                <button
                  type="button"
                  onClick={() => setIsFilterDrawerOpen(true)}
                  className="flex min-h-11 w-full items-center justify-center gap-2 rounded-lg border border-gray-300 px-4 py-3 font-semibold text-gray-900 transition-colors hover:bg-gray-50"
                  aria-haspopup="dialog"
                  aria-expanded={isFilterDrawerOpen}
                >
                  <Filter size={20} aria-hidden="true" />
                  <span>Filters</span>

                  {activeFilterCount > 0 && (
                    <span className="ml-auto flex h-6 w-6 items-center justify-center rounded-full bg-orange-500 text-xs font-bold text-white">
                      {activeFilterCount}
                    </span>
                  )}
                </button>
              </div>

              <div className="grid grid-cols-1 gap-12 md:grid-cols-[220px_1fr]">
                <aside className="hidden border-r border-gray-200 pr-8 md:block">
                  <div className="sticky top-24">
                    <div className="mb-8">
                      <button
                        type="button"
                        onClick={clearFilters}
                        className="flex min-h-11 items-center text-sm font-bold text-orange-500 hover:underline"
                      >
                        Refine
                      </button>
                    </div>

                    <FilterGroup
                      title="Category"
                      options={CATEGORIES}
                      selected={filters.category}
                      onToggle={toggle("category")}
                    />

                    <FilterGroup
                      title="Budget"
                      options={PRICE_RANGES.map((range) => range.label)}
                      selected={filters.price}
                      onToggle={toggle("price")}
                    />

                    <FilterGroup
                      title="Best For"
                      options={BEST_FOR}
                      selected={filters.bestFor}
                      onToggle={toggle("bestFor")}
                    />
                  </div>
                </aside>

                <div>
                  <div className="mb-8 text-sm text-gray-600">
                    Show {PRODUCT_RANGES.length} products
                  </div>

                  <div className="grid grid-cols-2 gap-4 md:gap-5 sm:grid-cols-3 lg:grid-cols-4">
                    {PRODUCT_RANGES.map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        isShortlisted={shortlist.some((item) => item.id === product.id)}
                        onShortlist={toggleShortlist}
                        onCustomize={openForm}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="mt-24 py-16 text-center" aria-labelledby="next-steps-title">
            <p className="mb-4 text-xs font-bold uppercase tracking-widest text-orange-500">
              Next Steps
            </p>

            <h2
              id="next-steps-title"
              className="mb-4 font-serif text-3xl text-gray-900 md:text-4xl"
            >
              Tell us what you need to send.
            </h2>

            <p className="mx-auto mb-8 max-w-2xl text-sm text-gray-600 md:text-base">
              Quantity, budget, audience and timeline. Enough for a shortlist and a
              delivery plan.
            </p>

            <button
              type="button"
              onClick={openForm}
              className="min-h-11 rounded-lg bg-orange-500 px-8 py-3 font-semibold text-white transition-colors hover:bg-orange-600"
            >
              Request a Proposal
            </button>
          </section>
        </div>
      </main>

      {shortlist.length > 0 && (
        <div className="fixed inset-x-0 bottom-0 z-30 border-t border-gray-800 bg-gray-900 px-4 py-4 text-white md:px-6">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
            <div className="text-sm font-semibold">
              Shortlist ({shortlist.length}{" "}
              {shortlist.length === 1 ? "item" : "items"})
            </div>

            <button
              type="button"
              className="min-h-11 rounded-lg bg-orange-500 px-6 py-2 text-sm font-semibold text-white transition-colors hover:bg-orange-600 md:text-base"
            >
              View Shortlist
            </button>
          </div>
        </div>
      )}

      <Footer />

      <MobileFilterDrawer
        isOpen={isFilterDrawerOpen}
        onClose={() => setIsFilterDrawerOpen(false)}
        filters={filters}
        onToggle={toggle}
        onClearFilters={clearFilters}
      />

      <Suspense fallback={null}>
        <FormModal isOpen={isFormOpen} onClose={closeForm} />
      </Suspense>
    </>
  );
};

export default ProductRange;