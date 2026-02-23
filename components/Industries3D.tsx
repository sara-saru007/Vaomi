
import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html, OrbitControls, Sphere, Stars } from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'framer-motion';

// Explicit constants to bypass IntrinsicElements type checks if needed in strict environments
const Group = 'group' as any;
const MeshBasicMaterial = 'meshBasicMaterial' as any;
const ThreePoints = 'points' as any;
const SphereGeometry = 'sphereGeometry' as any;
const PointsMaterial = 'pointsMaterial' as any;
const AmbientLight = 'ambientLight' as any;
const PointLight = 'pointLight' as any;

// Reduced list for cleaner visual
const sectors = [
  { label: "Deeptech", color: "#db2777" }, // Pink
  { label: "Consumer", color: "#2563eb" }, // Blue
  { label: "Fintech", color: "#16a34a" },  // Green
  { label: "BioTech", color: "#9333ea" },  // Purple
  { label: "GenAI", color: "#0891b2" },    // Cyan
  { label: "Defense", color: "#4b5563" },  // Grey
];

// Reduced list for cleaner visual
const familyOffices = [
  { label: "Gulf Family Office", color: "#eab308" }, // Gold
  { label: "Swiss Multi-FO", color: "#ef4444" }, // Red
  { label: "Singapore FO", color: "#f97316" }, // Orange
  { label: "NY Single FO", color: "#3b82f6" }, // Blue
  { label: "London FO", color: "#6366f1" }, // Indigo
];

const allPointers = [...sectors, ...familyOffices];

const Marker: React.FC<{ position: [number, number, number]; label: string; color: string }> = ({ position, label, color }) => {
  return (
    <Group position={position}>
      <Html center distanceFactor={10} zIndexRange={[100, 0]}>
        <div className="pointer-events-none relative flex flex-col items-center">
            {/* The Label Pill - Smaller size, no icon */}
            <motion.div 
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="flex items-center gap-1.5 px-1 py-0.5 md:px-2 md:py-1 rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.5)] border border-white/10"
                style={{ backgroundColor: color }}
            >
                <span className="text-white text-[6px] md:text-[10px] font-bold font-mono whitespace-nowrap">{label}</span>
            </motion.div>
            
            {/* Line connecting to globe surface */}
            <div className="w-px h-2 md:h-6 bg-white/30" />
            <div className="w-0.5 h-0.5 md:w-1 md:h-1 rounded-full bg-white animate-pulse" />
        </div>
      </Html>
    </Group>
  );
};

const Globe = () => {
  const sphereRef = useRef<THREE.Mesh>(null!);
  const groupRef = useRef<THREE.Group>(null!);
  const [scale, setScale] = React.useState(1);
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      // Reduce scale on mobile, but increased slightly from previous version to fit text
      setScale(mobile ? 0.85 : 1);
    };
    
    // Set initial
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Generate random positions on sphere surface for markers
  const markers = useMemo(() => {
    return allPointers.map((item) => {
      const phi = Math.acos(-1 + (2 * Math.random()));
      const theta = Math.sqrt(Math.PI * (Math.random() * 100)) * phi;
      const r = 4.2; // Slightly above surface
      
      return {
        ...item,
        position: [
          r * Math.cos(theta) * Math.sin(phi),
          r * Math.sin(theta) * Math.sin(phi),
          r * Math.cos(phi)
        ] as [number, number, number]
      };
    });
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
        // Slow rotation of the entire globe system
        groupRef.current.rotation.y += 0.001;
        // Add a slight wobble on X axis for more dynamic movement
        groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    }
  });

  // Filter markers on mobile to reduce clutter
  const displayMarkers = isMobile ? markers.slice(0, 6) : markers;

  return (
    <Group ref={groupRef} scale={[scale, scale, scale]}>
      {/* The Globe Mesh */}
      <Sphere ref={sphereRef} args={[4, 64, 64]}>
        <MeshBasicMaterial color="#000000" />
      </Sphere>
      
      {/* Grid/Wireframe visual on top */}
      <Sphere args={[4.01, 32, 32]}>
         <MeshBasicMaterial color="#333333" wireframe transparent opacity={0.3} />
      </Sphere>
      
      {/* Dotted Atmosphere */}
      <ThreePoints>
         <SphereGeometry args={[4.1, 64, 64]} />
         <PointsMaterial color="#ffffff" size={0.02} transparent opacity={0.2} sizeAttenuation />
      </ThreePoints>

      {/* Markers */}
      {displayMarkers.map((marker, i) => (
        <Marker key={i} position={marker.position} label={marker.label} color={marker.color} />
      ))}
    </Group>
  );
};

const Industries3D: React.FC = () => {
  return (
    <section className="h-[60vh] md:h-[80vh] bg-black relative overflow-hidden flex flex-col items-center justify-center border-t border-white/5">
         
         <div className="container mx-auto px-6 text-center relative z-20 mt-12 mb-4 pointer-events-none">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
            >
                {/* Reverted size to text-2xl/4xl (smaller than standard 5xl/6xl) */}
                <h3 className="text-2xl md:text-4xl font-display text-gray-300 max-w-7xl mx-auto leading-relaxed">
                    And because conviction has no boundaries, we operate across every modern sector — from <span className="text-white font-bold">deeptech</span> to <span className="text-white font-bold">consumer</span> — mapping where global conviction is headed.
                </h3>
            </motion.div>
         </div>

        <div className="w-full h-full absolute inset-0 cursor-move">
            <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
                <AmbientLight intensity={0.5} />
                <PointLight position={[10, 10, 10]} intensity={1} />
                
                {/* Starfield background */}
                <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
                
                <Globe />
                
                <OrbitControls 
                    enableZoom={false} 
                    enablePan={false}
                    autoRotate={true}
                    autoRotateSpeed={0.5}
                    minPolarAngle={Math.PI / 3}
                    maxPolarAngle={Math.PI / 1.5}
                />
            </Canvas>
        </div>
    </section>
  );
};

export default Industries3D;