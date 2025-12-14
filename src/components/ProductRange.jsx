import { useState, useEffect, useRef } from 'react';
import { Package, Sparkles, ShoppingBag, BookOpen, Pen, Shirt, Coffee, Gift } from 'lucide-react';

const ProductRange = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeCard, setActiveCard] = useState(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const products = [
    {
      icon: Coffee,
      title: "Premium Bottles & Sippers",
      description: "Branded, durable and leak-proof bottles that travel with your brand wherever they go.",
      gradient: "from-blue-500 to-cyan-500",
      bgGradient: "from-blue-50 to-cyan-50"
    },
    {
      icon: Shirt,
      title: "T-Shirts & Hoodies",
      description: "Comfortable, well-fitted apparel with your logo and colours – perfect for building team identity from day one.",
      gradient: "from-purple-500 to-pink-500",
      bgGradient: "from-purple-50 to-pink-50"
    },
    {
      icon: BookOpen,
      title: "Notebooks & Diaries",
      description: "Elegant notebooks, planners and journals that look professional on any desk.",
      gradient: "from-orange-500 to-red-500",
      bgGradient: "from-orange-50 to-red-50"
    },
    {
      icon: Pen,
      title: "Pens & Stationery",
      description: "Smooth-writing pens, bookmarks and other stationery that bring everyday utility to your brand.",
      gradient: "from-green-500 to-emerald-500",
      bgGradient: "from-green-50 to-emerald-50"
    },
    {
      icon: ShoppingBag,
      title: "Bags & Laptop Sleeves",
      description: "Backpacks, tote bags or laptop sleeves that combine style, comfort and functionality.",
      gradient: "from-indigo-500 to-blue-500",
      bgGradient: "from-indigo-50 to-blue-50"
    },
    {
      icon: Gift,
      title: "Add-Ons & Goodies",
      description: "Stickers, badges, welcome letters, ID card holders, lanyards, desk accessories and more – all customised as per your theme.",
      gradient: "from-pink-500 to-rose-500",
      bgGradient: "from-pink-50 to-rose-50"
    }
  ];

  return (
    <section
      id="products"
      ref={sectionRef}
      className="py-20 px-6 bg-gradient-to-b from-blue-50 via-white to-purple-50 relative overflow-hidden"
    >
      {/* Decorative Background */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-80 h-80 bg-blue-200 rounded-full filter blur-3xl opacity-20"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-purple-200 rounded-full filter blur-3xl opacity-20"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">

        {/* Badge */}
        {/* <div className={`flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-md mb-6 border border-blue-100 mx-auto w-fit transition-all duration-700 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <Package className="w-4 h-4 text-blue-600" />
          <span className="text-sm font-medium text-gray-700">Product Range / What We Offer</span>
        </div> */}

        {/* Section Title */}
        <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold text-center text-gray-900 mb-6 transition-all duration-700 delay-100 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          What Can Go Inside{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
            Your Kit?
          </span>
        </h2>

        {/* Intro Line */}
        <p className={`text-lg text-gray-700 text-center max-w-3xl mx-auto leading-relaxed mb-12 transition-all duration-700 delay-200 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          We curate a mix of branded essentials and thoughtful add-ons that people actually use and remember.
        </p>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {products.map((product, index) => {
            const Icon = product.icon;
            return (
              <div
                key={index}
                onMouseEnter={() => setActiveCard(index)}
                onMouseLeave={() => setActiveCard(null)}
                className={`group relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl border-2 border-gray-100 hover:border-transparent transition-all duration-500 hover:-translate-y-3 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'} overflow-hidden`}
                style={{ transitionDelay: `${300 + index * 100}ms` }}
              >
                {/* Animated Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${product.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>

                {/* Content */}
                <div className="relative z-10">
                  {/* Icon */}
                  <div className={`w-16 h-16 bg-gradient-to-br ${product.gradient} rounded-2xl flex items-center justify-center mb-6 shadow-lg transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300">
                    {product.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-700 leading-relaxed text-base">
                    {product.description}
                  </p>

                  {/* Decorative Line */}
                  <div className={`mt-6 h-1 w-0 group-hover:w-full bg-gradient-to-r ${product.gradient} rounded-full transition-all duration-500`}></div>
                </div>

                {/* Sparkle Effect */}
                <div className={`absolute top-4 right-4 transition-all duration-300 ${activeCard === index ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
                  <Sparkles className={`w-5 h-5 text-${product.gradient.split('-')[1]}-500`} />
                </div>

                {/* Corner Decoration */}
                <div className={`absolute -bottom-4 -right-4 w-32 h-32 bg-gradient-to-br ${product.gradient} opacity-5 rounded-tl-full transition-all duration-500 group-hover:scale-150`}></div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA Section */}
        <div className={`mt-16 text-center transition-all duration-700 delay-700 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="inline-flex flex-col items-center gap-4 px-8 py-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl border-2 border-blue-100 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                <Package className="w-6 h-6 text-white" />
              </div>
              <span className="text-lg font-bold text-gray-900">
                Mix & Match Products
              </span>
            </div>
            <p className="text-gray-600 text-sm max-w-md">
              Not sure what to choose? Share your requirements and we'll suggest the perfect combination for your team
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ProductRange;