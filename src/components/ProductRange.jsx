import { useSEO } from "../hooks/useSEO";
import { seoMetadata } from "../utils/seo";
import { useState, useMemo, useEffect, memo } from "react";
import { CheckCircle2, X } from "lucide-react";

import Footer from "./Footer";
import TrustSection from "./TrustSection";

// Fallback images
import firstImg from "../assets/First.png";
import secondImg from "../assets/Second.png";
import thirdImg from "../assets/Third.png";
import bottlesImg from "../assets/Bottles.png";
import bagsImg from "../assets/BagsandNotebooks.png";
import notebooksImg from "../assets/Notebooks.png";

// Company Logos
import LogoCompany1 from "../assets/Logo_company1.jpeg";
import LogoCompany2 from "../assets/Logo_company2.jpeg";
import LogoCompany3 from "../assets/Logo_company3.jpeg";
import LogoCompany4 from "../assets/Logo_company4.jpeg";
import LogoCompany5 from "../assets/Logo_company5.jpeg";
import Logo_company6 from "../assets/Logo_company7.png";

// Fallback images mapping
const FALLBACK_IMAGES = {
  Apparel: thirdImg,
  Stationery: notebooksImg,
  Drinkware: bottlesImg,
  Bags: bagsImg,
  Packaging: secondImg,
  Electronics: thirdImg,
  "Electronics & Tech": thirdImg,
  Travel: bagsImg,
  Wellness: bottlesImg,
  "Food & Hampers": firstImg,
  "Awards & Recognition": secondImg,
  "Event Merchandise": firstImg,
};

// Company logos data
const companies = [
  { name: "IIM Trichy", logo: LogoCompany1 },
  { name: "IIT Mandi", logo: LogoCompany2 },
  { name: "IIM Ranchi", logo: LogoCompany3 },
  { name: "UPRIO", logo: LogoCompany4 },
  { name: "IHUB DivyaSampark", logo: LogoCompany5 },
  { name: "Masai", logo: Logo_company6 },
];

/* ================= FILTER OPTIONS ================= */
const CATEGORIES = [
  "Apparel",
  "Drinkware",
  "Stationery",
  "Bags",
  "Electronics & Tech",
  "Travel",
  "Wellness",
  "Food & Hampers",
  "Awards & Recognition",
  "Event Merchandise",
  "Packaging",
];

const PRICE_RANGES = [
  { label: "Under ₹500", min: 0, max: 499 },
  { label: "₹500 - ₹1,000", min: 500, max: 1000 },
  { label: "₹1,000 - ₹2,500", min: 1001, max: 2500 },
  { label: "₹2,500+", min: 2501, max: Infinity },
  { label: "Custom Budget", min: 0, max: Infinity },
];

const CUSTOMISATION = [
  "Printing",
  "Embroidery",
  "Engraving",
  "Personalisation",
  "Custom Packaging",
  "Other",
];

const USE_CASES = [
  "Employee Joining",
  "Festival",
  "Event",
  "Client Gifting",
  "Recognition",
  "Institutional",
  "Custom Merchandise",
];

const QUANTITIES = ["10–25", "25–50", "50–100", "100–500", "500+"];

/* ================= FILTER GROUP ================= */
const FilterGroup = ({ title, options, selected, onToggle }) => (
  <div className="mb-8">
    <h4 className="text-xs font-bold tracking-[0.1em] uppercase text-[#111111] mb-3">
      {title}
    </h4>
    <div className="space-y-2">
      {options.map((opt) => (
        <label key={opt} className="flex items-center gap-2.5 cursor-pointer group">
          <input
            type="checkbox"
            checked={selected.includes(opt)}
            onChange={() => onToggle(opt)}
            className="w-3.5 h-3.5 rounded-sm border-[#DED8D2] text-[#DF4607] focus:ring-[#DF4607] focus:ring-offset-0 cursor-pointer"
          />
          <span className="text-[13px] text-[#4A4644] group-hover:text-[#111111] transition-colors">
            {opt}
          </span>
        </label>
      ))}
    </div>
  </div>
);

/* ================= PRODUCT CARD ================= */
const ProductCard = memo(({ product, isShortlisted, onShortlist, onEnquire }) => (
  <div className="rounded-lg border border-[#DED8D2] bg-white overflow-hidden flex flex-col group">
    {/* Image — beige backdrop */}
    <div className="aspect-square bg-[#EDE4DA] overflow-hidden">
      <img
        src={product.image}
        alt={product.title}
        loading="lazy"
        decoding="async"
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        onError={(e) => {
          e.target.src = FALLBACK_IMAGES[product.category] || firstImg;
        }}
      />
    </div>

    {/* Body */}
    <div className="p-3.5 flex flex-col flex-1">
      <h3 className="text-[13px] font-bold text-[#111111] leading-snug mb-0.5">
        {product.title}
      </h3>
      <p className="text-[11px] text-[#6E6A67] mb-2">
        {product.spec || "Premium quality product"}
      </p>

      <p className="text-[13px] font-semibold text-[#DF4607] mb-1.5">
        ₹{product.price.toLocaleString("en-IN")} onwards
      </p>

      <div className="flex items-center gap-1.5 text-[10px] text-[#4A4644] mb-3">
        <CheckCircle2 size={11} className="text-[#DF4607] shrink-0" />
        <span>Custom branding available</span>
      </div>

      <div className="flex flex-col gap-1.5 mt-auto">
        <button
          onClick={onEnquire}
          className="w-full py-2 bg-[#DF4607] text-white text-[12px] font-semibold rounded-md hover:bg-[#C93E05] transition-colors"
        >
          Customise &amp; Enquire
        </button>
        <button
          onClick={() => onShortlist(product)}
          className={`w-full py-2 text-[12px] font-semibold rounded-md border transition-colors ${
            isShortlisted
              ? "border-[#DF4607] text-[#DF4607] bg-[#FFF3EE]"
              : "border-[#DED8D2] text-[#111111] hover:border-[#111111]"
          }`}
        >
          {isShortlisted ? "Added" : "Add to Shortlist"}
        </button>
      </div>
    </div>
  </div>
));

/* ================= MAIN ================= */
const ProductRange = () => {
  useSEO(seoMetadata.products);
  const [filters, setFilters] = useState({
    category: [],
    price: [],
    customisation: [],
    useCase: [],
    quantity: [],
  });
  const [shortlist, setShortlist] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ SMART API URL - LOCAL vs DEPLOYED
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        // 🔧 Smart API URL selection based on hostname
        let API_BASE;

        if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") {
          // LOCAL DEVELOPMENT
          API_BASE = "http://localhost:5000";
        } else {
          // PRODUCTION/DEPLOYED
          API_BASE = import.meta.env.VITE_API_URL || "https://api.trazooglobal.com";
        }

        const API_URL = `${API_BASE}/api/products/active`;

        console.log("🌍 Hostname:", window.location.hostname);
        console.log("🔗 Fetching from:", API_URL);

        const response = await fetch(API_URL);

        console.log("📊 Response status:", response.status);

        if (!response.ok) {
          throw new Error(`API Error: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        console.log("✅ Products fetched:", data.length);

        // Map backend response to component format
        const mappedProducts = data.map((product) => ({
          id: product._id,
          title: product.name,
          spec: product.spec || "Premium quality product",
          price: product.unitPrice,
          category: product.category,
          image: product.images?.[0] || FALLBACK_IMAGES[product.category],
          useCases: product.useCases || [],
        }));

        setProducts(mappedProducts);
        setError(null);
      } catch (err) {
        console.error("❌ Error fetching products:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

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

  const goToEnquiry = () =>
    document
      .querySelector("#footer")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const catOk =
        filters.category.length === 0 || filters.category.includes(p.category);

      const priceOk =
        filters.price.length === 0 ||
        filters.price.some((label) => {
          const r = PRICE_RANGES.find((x) => x.label === label);
          return r && p.price >= r.min && p.price <= r.max;
        });

      const useOk =
        filters.useCase.length === 0 ||
        filters.useCase.some((u) => p.useCases?.includes(u));

      return catOk && priceOk && useOk;
    });
  }, [filters, products]);

  const clearAll = () =>
    setFilters({
      category: [],
      price: [],
      customisation: [],
      useCase: [],
      quantity: [],
    });

  const activeCount = Object.values(filters).reduce((n, a) => n + a.length, 0);

  return (
    <>
      <main id="products" className="bg-[#FFFDF9] pt-28 pb-24 px-6">
        <div className="max-w-7xl mx-auto">
          {/* ---------- HEADING ---------- */}
          <h1 className="text-lg md:text-xl font-semibold text-[#111111] mb-3">
            If it can carry your brand, chances are we can source it.
          </h1>
          <p className="text-sm text-[#4A4644] leading-relaxed max-w-2xl mb-12">
            Browse commonly requested categories or tell us what you're looking
            for. Trazoo can source and customise products across the corporate
            gifting and merchandise market.
          </p>

          {/* ---------- FILTERS + GRID ---------- */}
          <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-10">
            {/* ===== SIDEBAR ===== */}
            <aside>
              {activeCount > 0 && (
                <button
                  onClick={clearAll}
                  className="text-xs font-semibold text-[#DF4607] hover:underline mb-6"
                >
                  Clear all ({activeCount})
                </button>
              )}

              <FilterGroup
                title="Category"
                options={CATEGORIES}
                selected={filters.category}
                onToggle={toggle("category")}
              />
              <FilterGroup
                title="Price"
                options={PRICE_RANGES.map((r) => r.label)}
                selected={filters.price}
                onToggle={toggle("price")}
              />
              <FilterGroup
                title="Customisation"
                options={CUSTOMISATION}
                selected={filters.customisation}
                onToggle={toggle("customisation")}
              />
              <FilterGroup
                title="Use Case"
                options={USE_CASES}
                selected={filters.useCase}
                onToggle={toggle("useCase")}
              />
              <FilterGroup
                title="Quantity"
                options={QUANTITIES}
                selected={filters.quantity}
                onToggle={toggle("quantity")}
              />
            </aside>

            {/* ===== GRID ===== */}
            <div>
              {loading ? (
                <div className="text-center py-12">
                  <p className="text-sm text-[#6E6A67]">Loading products...</p>
                </div>
              ) : error ? (
                <div className="rounded-lg border border-dashed border-[#DED8D2] p-12 text-center">
                  <p className="text-sm text-red-500 mb-3">❌ Error: {error}</p>
                  <p className="text-xs text-[#6E6A67] mb-3">
                    Check browser console for details
                  </p>
                </div>
              ) : filtered.length ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4">
                  {filtered.map((p) => (
                    <ProductCard
                      key={p.id}
                      product={p}
                      isShortlisted={shortlist.some((s) => s.id === p.id)}
                      onShortlist={toggleShortlist}
                      onEnquire={goToEnquiry}
                    />
                  ))}
                </div>
              ) : (
                <div className="rounded-lg border border-dashed border-[#DED8D2] p-12 text-center">
                  <p className="text-sm text-[#6E6A67] mb-3">
                    In filters se koi product match nahi hua.
                  </p>
                  <button
                    onClick={clearAll}
                    className="text-sm text-[#DF4607] font-semibold hover:underline"
                  >
                    Clear all filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* ================= TRUSTED BY / LOGOS ================= */}
      <section className="bg-[#FFFDF9] border-b border-[#DED8D2] overflow-hidden">
        <div className="w-full py-14 md:py-16">

          {/* Heading */}
          <div className="text-center px-6 mb-10 md:mb-12">
            <p className="text-xs md:text-sm font-bold uppercase tracking-[0.18em] text-[#DF4607]">
              Trusted by Leading Organizations
            </p>

            <h2 className="mt-3 text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-[-0.03em] text-[#111111]">
              Trusted by teams that value quality
            </h2>

            <p className="mt-3 max-w-2xl mx-auto text-sm md:text-base leading-6 text-[#6E6A67]">
              Organizations trust Trazoo for reliable gifting, merchandise and
              end-to-end fulfilment.
            </p>
          </div>

          {/* Logos */}
          <div className="w-full overflow-hidden">
            <div className="flex items-center justify-center gap-10 md:gap-14 lg:gap-16 animate-logo-scroll">

              {companies.map((company, i) => (
                <div
                  key={i}
                  className="flex items-center justify-center shrink-0"
                >
                  <img
                    src={company.logo}
                    alt={company.name}
                    className="
                      h-14
                      md:h-16
                      lg:h-[68px]
                      w-auto
                      max-w-[150px]
                      md:max-w-[170px]
                      lg:max-w-[180px]
                      object-contain
                      border-0
                      outline-none
                      shadow-none
                      transition-transform duration-300
                      hover:scale-105
                    "
                    loading="lazy"
                  />
                </div>
              ))}

            </div>
          </div>

        </div>
      </section>

      <Footer />

      {/* ---------- SHORTLIST BAR ---------- */}
      {shortlist.length > 0 && (
        <div className="fixed bottom-0 left-0 w-full bg-[#1A1210] z-40">
          <div className="max-w-7xl mx-auto px-6 py-3 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold tracking-[0.1em] uppercase text-white">
                Requirement Shortlist
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-[#DF4607] text-white text-[11px] font-semibold">
                {shortlist.length} Item{shortlist.length > 1 ? "s" : ""}
              </span>
            </div>

            <div className="hidden lg:flex flex-wrap gap-2 flex-1 justify-center">
              {shortlist.map((p) => (
                <span
                  key={p.id}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[11px] text-white/80"
                >
                  {p.title}
                  <button
                    onClick={() => toggleShortlist(p)}
                    aria-label={`Remove ${p.title}`}
                    className="hover:text-[#DF4607]"
                  >
                    <X size={11} />
                  </button>
                </span>
              ))}
            </div>

            <button
              onClick={goToEnquiry}
              className="px-5 py-2.5 bg-[#DF4607] text-white text-[13px] font-semibold rounded-md hover:bg-[#C93E05] transition-colors"
            >
              Enquire for Selected Products
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductRange;