import { Canvas, useFrame } from "@react-three/fiber";
import { RoundedBox, Environment, Text } from "@react-three/drei";
import { useRef, useState } from "react";

function MiniProduct({ position, delay, type, isOpen }) {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      const targetY = isOpen ? position[1] : 0;
      const targetX = isOpen ? position[0] : 0;
      const targetZ = isOpen ? position[2] : 0;
      
      meshRef.current.position.x += (targetX - meshRef.current.position.x) * 0.1;
      meshRef.current.position.y += (targetY - meshRef.current.position.y) * 0.1;
      meshRef.current.position.z += (targetZ - meshRef.current.position.z) * 0.1;
      
      if (isOpen) {
        meshRef.current.rotation.y += 0.02;
        meshRef.current.position.y += Math.sin(state.clock.elapsedTime * 2 + delay) * 0.05;
      }
      
      const targetScale = hovered ? 1.2 : 1;
      meshRef.current.scale.x += (targetScale - meshRef.current.scale.x) * 0.1;
      meshRef.current.scale.y += (targetScale - meshRef.current.scale.y) * 0.1;
      meshRef.current.scale.z += (targetScale - meshRef.current.scale.z) * 0.1;
    }
  });

  const getProductGeometry = () => {
    switch(type) {
      case "bottle":
        return (
          <group>
            <mesh position={[0, 0, 0]}>
              <cylinderGeometry args={[0.15, 0.15, 0.7, 16]} />
              <meshStandardMaterial color="#df4607" roughness={0.2} metalness={0.8} />
            </mesh>
            <mesh position={[0, 0.4, 0]}>
              <cylinderGeometry args={[0.1, 0.1, 0.15, 16]} />
              <meshStandardMaterial color="#1a1a1a" />
            </mesh>
          </group>
        );
      case "tshirt":
        return (
          <RoundedBox args={[0.6, 0.7, 0.1]} radius={0.05}>
            <meshStandardMaterial color="#2c2c2c" />
          </RoundedBox>
        );
      case "notebook":
        return (
          <RoundedBox args={[0.5, 0.6, 0.08]} radius={0.03}>
            <meshStandardMaterial color="#4a4a4a" />
          </RoundedBox>
        );
      case "pen":
        return (
          <mesh rotation={[0, 0, Math.PI / 4]}>
            <cylinderGeometry args={[0.04, 0.04, 0.8, 8]} />
            <meshStandardMaterial color="#df4607" />
          </mesh>
        );
      case "bag":
        return (
          <RoundedBox args={[0.5, 0.6, 0.2]} radius={0.05}>
            <meshStandardMaterial color="#1a1a1a" />
          </RoundedBox>
        );
      case "gift":
        return (
          <RoundedBox args={[0.4, 0.4, 0.4]} radius={0.05}>
            <meshStandardMaterial color="#df4607" roughness={0.3} />
          </RoundedBox>
        );
      default:
        return (
          <RoundedBox args={[0.4, 0.4, 0.4]} radius={0.05}>
            <meshStandardMaterial color="#df4607" />
          </RoundedBox>
        );
    }
  };

  return (
    <group 
      ref={meshRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {getProductGeometry()}
    </group>
  );
}

function ProductBox({ isOpen, onClick }) {
  const groupRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (groupRef.current && !isOpen) {
      groupRef.current.rotation.y += 0.005;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.15;
    }
    
    if (groupRef.current && isOpen) {
      groupRef.current.rotation.y += 0.001;
    }
  });

  return (
    <>
      <group 
        ref={groupRef} 
        scale={isOpen ? 0.8 : 1.5}
        onClick={onClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        style={{ cursor: 'pointer' }}
      >
        {/* MAIN BOX */}
        <RoundedBox args={[2.2, 3, 0.6]} radius={0.25} smoothness={4}>
          <meshStandardMaterial
            color={hovered ? "#1a1a1a" : "#0f0f0f"}
            roughness={0.5}
            metalness={0.3}
          />
        </RoundedBox>

        {/* FRONT TEXT */}
        <Text
          position={[0, 0.6, 0.31]}
          fontSize={0.32}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
        >
          Trazoo
        </Text>

        <Text
          position={[0, 0.2, 0.31]}
          fontSize={0.22}
          color="#df4607"
          anchorX="center"
          anchorY="middle"
        >
          Products
        </Text>

        <Text
          position={[0, -0.4, 0.31]}
          fontSize={0.14}
          color="#888888"
          anchorX="center"
          anchorY="middle"
        >
          {isOpen ? "Click to Close" : "Click to Open"}
        </Text>

        {/* BACK TEXT */}
        <Text
          position={[0, 0.6, -0.31]}
          rotation={[0, Math.PI, 0]}
          fontSize={0.32}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
        >
          Trazoo
        </Text>

        <Text
          position={[0, 0.2, -0.31]}
          rotation={[0, Math.PI, 0]}
          fontSize={0.22}
          color="#df4607"
          anchorX="center"
          anchorY="middle"
        >
          Products
        </Text>
      </group>

      MINI PRODUCTS
      <MiniProduct position={[-2, 1.5, 0]} delay={0} type="bottle" isOpen={isOpen} />
      <MiniProduct position={[2, 1.5, 0]} delay={0.5} type="tshirt" isOpen={isOpen} />
      <MiniProduct position={[-2, -1.5, 0]} delay={1} type="notebook" isOpen={isOpen} />
      <MiniProduct position={[2, -1.5, 0]} delay={1.5} type="pen" isOpen={isOpen} />
      <MiniProduct position={[0, 2.5, 1]} delay={2} type="bag" isOpen={isOpen} />
      <MiniProduct position={[0, -2.5, 1]} delay={2.5} type="gift" isOpen={isOpen} />
    </>
  );
}

const CenterProduct3D = ({ onClick }) => {
  return (
    <div
      onClick={onClick}
      className="h-[420px] hidden lg:block cursor-pointer"
    >
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[3, 5, 2]} intensity={1.2} />
        <Environment preset="studio" />
        <ProductBox />
      </Canvas>
    </div>
  );
};



export default CenterProduct3D;