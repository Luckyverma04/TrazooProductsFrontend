import { useState, useEffect, useRef } from "react";
import {
  Package,
  Sparkles,
  ShoppingBag,
  BookOpen,
  Pen,
  Shirt,
  Coffee,
  Gift,
} from "lucide-react";

// ✅ IMAGE IMPORT
import firstImg from "../assets/First.png";
import secondImg from "../assets/Second.png";
import thirdImg from "../assets/Third.png";
import fourthImg from "../assets/Bottles.png";
import fifthImg from "../assets/BagsandNotebooks.png";
import sixthImg from "../assets/Notebooks.png";
const ProductRange = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeCard, setActiveCard] = useState(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setIsVisible(true),
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const products = [
    {
      icon: Coffee,
      image: fourthImg,
      title: "Premium Bottles & Sippers",
      description:
        "Branded, durable and leak-proof bottles that travel with your brand wherever they go.",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: Shirt,
      image: thirdImg,
      title: "T-Shirts & Hoodies",
      description:
        "Comfortable, well-fitted apparel with your logo and colours – perfect for building team identity from day one.",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: BookOpen,
      image: sixthImg,
      title: "Notebooks & Diaries",
      description:
        "Elegant notebooks, planners and journals that look professional on any desk.",
      gradient: "from-orange-500 to-red-500",
    },
    {
      icon: Pen,
      image:  fifthImg,
      title: "Pens & Stationery",
      description:
        "Smooth-writing pens, bookmarks and other stationery that bring everyday utility to your brand.",
      gradient: "from-green-500 to-emerald-500",
    },
    {
      icon: ShoppingBag,
      image:firstImg,
      title: "Bags & Laptop Sleeves",
      description:
        "Backpacks, tote bags or laptop sleeves that combine style, comfort and functionality.",
      gradient: "from-indigo-500 to-blue-500",
    },
    {
      icon: Gift,
      image: secondImg,
      title: "Add-Ons & Goodies",
      description:
        "Stickers, badges, welcome letters, ID card holders, lanyards, desk accessories and more.",
      gradient: "from-pink-500 to-rose-500",
    },
  ];

  return (
    <section
      id="products"
      ref={sectionRef}
      className="relative py-20 px-6 overflow-hidden bg-gradient-to-br from-orange-50 via-white to-orange-50"
    >
      {/* 🔥 HERO STYLE BACKGROUND */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-orange-500 rounded-full blur-3xl opacity-20 animate-blob" />
        <div className="absolute top-40 right-10 w-72 h-72 bg-orange-600 rounded-full blur-3xl opacity-15 animate-blob animation-delay-2000" />
        <div className="absolute bottom-10 left-1/2 w-72 h-72 bg-orange-500 rounded-full blur-3xl opacity-20 animate-blob animation-delay-4000" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* SECTION HEADING */}
        <h2
          className={`text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-6 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <span className="text-gray-900">What Can Go Inside</span>{" "}
          <span style={{ color: "#df4607" }}>Your Kit?</span>
        </h2>

        {/* INTRO */}
        <p
          className={`text-lg text-gray-700 text-center max-w-3xl mx-auto mb-12 transition-all duration-700 delay-150 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          We curate a mix of branded essentials and thoughtful add-ons that people
          actually use and remember.
        </p>

        {/* PRODUCTS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => {
            const Icon = product.icon;
            return (
              <div
                key={index}
                onMouseEnter={() => setActiveCard(index)}
                onMouseLeave={() => setActiveCard(null)}
                className={`relative bg-white/90 backdrop-blur p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-6"
                }`}
                style={{ transitionDelay: `${200 + index * 100}ms` }}
              >
                {/* IMAGE */}
                <div className="w-full h-40 rounded-xl overflow-hidden mb-6">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* ICON */}
                <div
                  className={`w-14 h-14 bg-gradient-to-br ${product.gradient} rounded-xl flex items-center justify-center mb-4 shadow-md`}
                >
                  <Icon className="w-7 h-7 text-white" />
                </div>

                {/* TITLE */}
                <h3 className="text-xl font-bold mb-3 text-gray-900">
                  {product.title}
                </h3>

                {/* DESCRIPTION */}
                <p className="text-gray-700 leading-relaxed">
                  {product.description}
                </p>

                {/* ACCENT LINE */}
                <div
                  className={`mt-6 h-1 w-0 group-hover:w-full bg-gradient-to-r ${product.gradient} rounded-full transition-all duration-500`}
                />

                {/* SPARKLE */}
                {activeCard === index && (
                  <Sparkles className="absolute top-4 right-4 w-5 h-5 text-orange-400" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProductRange;
