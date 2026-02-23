import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Use explicit constants cast to any to bypass IntrinsicElements type checks
const Group = 'group' as any;
const Fog = 'fog' as any;

const ParticleField = (props: any) => {
  const ref = useRef<THREE.Points>(null!);
  const { mouse, viewport } = useThree();
  
  const particles = useMemo(() => {
    const count = 1200; // Reduced from 2500 for even less density
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    
    // Gradient Palette
    const topColor = new THREE.Color("#e2e8f0"); // Slate 200 (Off White)
    const bottomColor = new THREE.Color("#10b981"); // Emerald 500 (Vibrant Green)
    
    for (let i = 0; i < count; i++) {
      const r = 5 + Math.random() * 3;
      const theta = 2 * Math.PI * Math.random();
      const phi = Math.acos(2 * Math.random() - 1);
      
      const x = (Math.random() - 0.5) * 16;
      const y = (Math.random() - 0.5) * 12;
      const z = (Math.random() - 0.5) * 8;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      // Color Gradient Logic
      // Normalize Y from roughly -6 to 6
      // We want Top (positive Y) to be White/Silver
      // Bottom (negative Y) to be Green
      const t = (y + 6) / 12; // 0 at bottom, 1 at top
      
      const finalColor = new THREE.Color().lerpColors(bottomColor, topColor, t);

      colors[i * 3] = finalColor.r;
      colors[i * 3 + 1] = finalColor.g;
      colors[i * 3 + 2] = finalColor.b;
    }
    return { positions, colors };
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (ref.current) {
      // Continuous auto-rotation
      ref.current.rotation.y += 0.0008; 
      ref.current.rotation.x += 0.0004;
      
      // Breathing/Pulse effect
      const scale = 1 + Math.sin(t * 0.2) * 0.05;
      ref.current.scale.set(scale, scale, scale);

      // Subtle mouse parallax effect on position instead of rotation override
      const xTarget = (mouse.x * viewport.width) / 50;
      const yTarget = (mouse.y * viewport.height) / 50;
      
      ref.current.position.x = THREE.MathUtils.lerp(ref.current.position.x, xTarget, 0.05);
      ref.current.position.y = THREE.MathUtils.lerp(ref.current.position.y, yTarget, 0.05);
    }
  });

  return (
    <Group rotation={[0, 0, 0]} {...props}>
      <Points ref={ref} positions={particles.positions} colors={particles.colors} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          vertexColors
          size={0.035} // Slightly larger for better visibility
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.85}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </Group>
  );
};

const ThreeScene: React.FC = () => {
  return (
    <div className="absolute inset-0 z-0 opacity-80">
      <Canvas camera={{ position: [0, 0, 8], fov: 50 }} gl={{ antialias: true, alpha: true }}>
        {/* Fog adjusted to let gradient show through better */}
        <Fog attach="fog" args={['#000000', 6, 30]} />
        <ParticleField />
      </Canvas>
    </div>
  );
};

export default ThreeScene;