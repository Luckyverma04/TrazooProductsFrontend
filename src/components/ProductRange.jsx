import { useState, useRef, memo } from "react";
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

// Images
import firstImg from "../assets/First.png";
import secondImg from "../assets/Second.png";
import thirdImg from "../assets/Third.png";
import fourthImg from "../assets/Bottles.png";
import fifthImg from "../assets/BagsandNotebooks.png";
import sixthImg from "../assets/Notebooks.png";

/* ================= 3D PRODUCT BOX ================= */
function ProductBox({ isOpen }) {
  const boxRef = useRef(null);

  useFrame((state) => {
    if (!boxRef.current) return;

    boxRef.current.rotation.y += isOpen ? 0.002 : 0.005;
    boxRef.current.position.y =
      Math.sin(state.clock.elapsedTime) * 0.1;
  });

  return (
    <group ref={boxRef}>
      {/* BOX */}
      <RoundedBox args={[2.2, 3, 0.6]} radius={0.25}>
        <meshStandardMaterial
          color="#0f0f0f"
          roughness={0.5}
          metalness={0.3}
        />
      </RoundedBox>

      {/* ===== FRONT TEXT ===== */}
      <Text position={[0, 0.6, 0.31]} fontSize={0.32} color="#fff">
        Trazoo
      </Text>
      <Text position={[0, 0.2, 0.31]} fontSize={0.22} color="#df4607">
        Products
      </Text>
      <Text position={[0, -0.4, 0.31]} fontSize={0.14} color="#aaa">
        Click to {isOpen ? "Close" : "Open"}
      </Text>

      {/* ===== BACK TEXT ===== */}
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
      <Text
        position={[0, -0.4, -0.31]}
        rotation={[0, Math.PI, 0]}
        fontSize={0.14}
        color="#aaa"
      >
        Click to {isOpen ? "Close" : "Open"}
      </Text>
    </group>
  );
}

/* ================= CENTER 3D ================= */
const CenterProduct3D = ({ isOpen, toggleOpen }) => {
  return (
    <div
      className="h-[420px] hidden lg:block cursor-pointer"
      onClick={toggleOpen}
    >
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 6], fov: 45 }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[3, 5, 2]} intensity={1.2} />
        <Environment preset="studio" />
        <ProductBox isOpen={isOpen} />
      </Canvas>
    </div>
  );
};

/* ================= PRODUCT CARD ================= */
const ProductCard = memo(({ product }) => {
  const Icon = product.icon;

  return (
    <div className="relative h-64 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group">
      <img
        src={product.image}
        alt={product.title}
        loading="lazy"
        decoding="async"
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
});

/* ================= MAIN COMPONENT ================= */
const ProductRange = () => {
  const [isOpen, setIsOpen] = useState(false);

  const products = [
    {
      icon: Coffee,
      image: fourthImg,
      title: "Premium Bottles & Sippers",
      description: "Branded, durable and leak-proof bottles.",
    },
    {
      icon: Shirt,
      image: thirdImg,
      title: "T-Shirts & Hoodies",
      description: "Comfortable apparel with custom branding.",
    },
    {
      icon: BookOpen,
      image: sixthImg,
      title: "Notebooks & Diaries",
      description: "Elegant notebooks for productivity.",
    },
    {
      icon: Pen,
      image: fifthImg,
      title: "Pens & Stationery",
      description: "Smooth-writing premium stationery.",
    },
    {
      icon: ShoppingBag,
      image: firstImg,
      title: "Bags & Laptop Sleeves",
      description: "Stylish and functional corporate bags.",
    },
    {
      icon: Gift,
      image: secondImg,
      title: "Add-Ons & Goodies",
      description: "Stickers, desk items & accessories.",
    },
  ];

  return (
    <section
      id="products"
      className="relative py-20 px-6 bg-gradient-to-br from-orange-50 via-white to-orange-50"
    >
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-16">
          <span className="text-gray-900">Explore</span>{" "}
          <span className="text-[#df4607]">Trazoo Kits</span>
        </h2>

        {/* DESKTOP */}
        <div className="hidden lg:grid grid-cols-3 gap-8 items-center">
          {/* LEFT */}
          <div className="space-y-8">
            {[0, 1].map((i) => (
              <div
                key={i}
                className={`transition-all duration-700 ${
                  isOpen
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-20 pointer-events-none"
                }`}
              >
                <ProductCard product={products[i]} />
              </div>
            ))}
          </div>

          {/* CENTER */}
          <CenterProduct3D
            isOpen={isOpen}
            toggleOpen={() => setIsOpen(!isOpen)}
          />

          {/* RIGHT */}
          <div className="space-y-8">
            {[2, 3].map((i) => (
              <div
                key={i}
                className={`transition-all duration-700 ${
                  isOpen
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-20 pointer-events-none"
                }`}
              >
                <ProductCard product={products[i]} />
              </div>
            ))}
          </div>
        </div>

        {/* BOTTOM */}
        <div className="hidden lg:grid grid-cols-2 gap-8 mt-10 max-w-4xl mx-auto">
          {[4, 5].map((i) => (
            <div
              key={i}
              className={`transition-all duration-700 delay-200 ${
                isOpen
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-20 pointer-events-none"
              }`}
            >
              <ProductCard product={products[i]} />
            </div>
          ))}
        </div>

        {/* MOBILE */}
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
