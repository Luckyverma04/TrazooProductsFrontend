import { useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { RoundedBox, Environment, Text } from "@react-three/drei";
import {
  ShoppingBag,
  BookOpen,
  Pen,
  Shirt,
  Coffee,
  Gift,
} from "lucide-react";

// Import your images
import firstImg from "../assets/First.png";
import secondImg from "../assets/Second.png";
import thirdImg from "../assets/Third.png";
import fourthImg from "../assets/Bottles.png";
import fifthImg from "../assets/BagsandNotebooks.png";
import sixthImg from "../assets/Notebooks.png";

/* ================= MAIN PRODUCT BOX (No Mini Products) ================= */
function ProductBox({ isOpen, toggleOpen }) {
  const boxRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (!boxRef.current) return;

    boxRef.current.rotation.y += isOpen ? 0.001 : 0.005;
    boxRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.15;
  });

  return (
    <group
      ref={boxRef}
      scale={isOpen ? 0.85 : 1.4}
      onClick={toggleOpen}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <RoundedBox args={[2.2, 3, 0.6]} radius={0.25}>
        <meshStandardMaterial
          color={hovered ? "#1a1a1a" : "#0f0f0f"}
          roughness={0.5}
          metalness={0.3}
        />
      </RoundedBox>

      {/* FRONT TEXT */}
      <Text position={[0, 0.6, 0.31]} fontSize={0.32} color="#fff">
        Trazoo
      </Text>
      <Text position={[0, 0.2, 0.31]} fontSize={0.22} color="#df4607">
        Products
      </Text>
      <Text position={[0, -0.4, 0.31]} fontSize={0.14} color="#888">
        {isOpen ? "Click to Close" : "Click to Open"}
      </Text>

      {/* BACK TEXT */}
      <Text
        position={[0, 0.6, -0.31]}
        rotation={[0, Math.PI, 0]}
        fontSize={0.32}
        color="#fff"
      >
        Trazoo
      </Text>
      <Text
        position={[0, 0.2, -0.31]}
        rotation={[0, Math.PI, 0]}
        fontSize={0.22}
        color="#df4607"
      >
        Products
      </Text>
    </group>
  );
}

/* ================= CENTER PRODUCT 3D ================= */
const CenterProduct3D = ({ isOpen, toggleOpen }) => {
  return (
    <div className="h-[420px] hidden lg:block cursor-pointer">
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[3, 5, 2]} intensity={1.2} />
        <Environment preset="studio" />

        <ProductBox isOpen={isOpen} toggleOpen={toggleOpen} />
      </Canvas>
    </div>
  );
};

/* ================= PRODUCT CARD ================= */
const ProductCard = ({ product }) => {
  const Icon = product.icon;

  return (
    <div className="relative h-64 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group">
      <img
        src={product.image}
        alt={product.title}
        className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />

      <div className="absolute bottom-0 p-6 z-10">
        <div className="flex items-center gap-2 mb-2">
          <Icon className="w-6 h-6 text-orange-500" />
          <h4 className="font-bold text-white text-lg">
            {product.title}
          </h4>
        </div>
        <p className="text-sm text-gray-200">
          {product.description}
        </p>
      </div>
    </div>
  );
};

/* ================= MAIN COMPONENT ================= */
const ProductRange = () => {
  const [isOpen, setIsOpen] = useState(false);

  const products = [
    { icon: Coffee, image: fourthImg, title: "Premium Bottles & Sippers", description: "Branded, durable and leak-proof bottles that travel with your brand." },
    { icon: Shirt, image: thirdImg, title: "T-Shirts & Hoodies", description: "Comfortable, well-fitted apparel with your logo and colours." },
    { icon: BookOpen, image: sixthImg, title: "Notebooks & Diaries", description: "Elegant notebooks and planners for everyday productivity." },
    { icon: Pen, image: fifthImg, title: "Pens & Stationery", description: "Smooth-writing pens and stationery essentials." },
    { icon: ShoppingBag, image: firstImg, title: "Bags & Laptop Sleeves", description: "Stylish and functional bags for modern professionals." },
    { icon: Gift, image: secondImg, title: "Add-Ons & Goodies", description: "Stickers, badges, desk accessories and more." },
  ];

  return (
    <section id="products" className="relative py-16 md:py-24 lg:py-32 px-6 bg-gradient-to-br from-orange-50 via-white to-orange-50">
      <div className="max-w-7xl mx-auto text-center">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 md:mb-12 lg:mb-16">
          <span className="text-gray-900">Explore</span>{" "}
          <span style={{ color: "#df4607" }}>Trazoo Kits</span>
        </h2>

        {/* DESKTOP LAYOUT - Around Center */}
        <div className="hidden lg:block relative">
          {/* Product Cards Around Center */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* LEFT COLUMN */}
            <div className="space-y-8">
              <div
                className={`transition-all duration-700 transform ${
                  isOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-20 pointer-events-none"
                }`}
              >
                <ProductCard product={products[0]} />
              </div>
              <div
                className={`transition-all duration-700 transform delay-100 ${
                  isOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-20 pointer-events-none"
                }`}
              >
                <ProductCard product={products[1]} />
              </div>
            </div>

            {/* CENTER COLUMN */}
            <div className="flex flex-col items-center justify-center">
              <CenterProduct3D isOpen={isOpen} toggleOpen={() => setIsOpen(!isOpen)} />
              
              <p className="mt-6 text-sm text-gray-500">
                Click the product to {isOpen ? "close" : "view"} items inside the kit
              </p>
            </div>

            {/* RIGHT COLUMN */}
            <div className="space-y-8">
              <div
                className={`transition-all duration-700 transform ${
                  isOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-20 pointer-events-none"
                }`}
              >
                <ProductCard product={products[2]} />
              </div>
              <div
                className={`transition-all duration-700 transform delay-100 ${
                  isOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-20 pointer-events-none"
                }`}
              >
                <ProductCard product={products[3]} />
              </div>
            </div>
          </div>

          {/* BOTTOM ROW */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mt-8 max-w-4xl mx-auto">
            <div
              className={`transition-all duration-700 transform delay-200 ${
                isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20 pointer-events-none"
              }`}
            >
              <ProductCard product={products[4]} />
            </div>
            <div
              className={`transition-all duration-700 transform delay-300 ${
                isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20 pointer-events-none"
              }`}
            >
              <ProductCard product={products[5]} />
            </div>
          </div>
        </div>

        {/* MOBILE VIEW - Simple Grid (Always Visible) */}
        <div className="lg:hidden grid grid-cols-1 md:grid-cols-2 gap-6">
          {products.map((product, i) => (
            <ProductCard key={i} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductRange;