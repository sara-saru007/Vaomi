import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Float, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

// Explicit constants to bypass IntrinsicElements type checks
const Fog = 'fog' as any;
const AmbientLight = 'ambientLight' as any;

const BrainParticles = () => {
  const ref = useRef<THREE.Points>(null!);
  
  const particles = useMemo(() => {
    const count = 4000;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    
    const colorInside = new THREE.Color("#10b981"); // Bright Brand Green
    const colorOutside = new THREE.Color("#059669"); // Darker Emerald
    
    for (let i = 0; i < count; i++) {
        // Create two lobes
        const isRightLobe = Math.random() > 0.5;
        const xOffset = isRightLobe ? 0.6 : -0.6; // Separate hemispheres
        
        // Random point in a sphere-ish volume
        const u = Math.random();
        const v = Math.random();
        const theta = 2 * Math.PI * u;
        const phi = Math.acos(2 * v - 1);
        const r = Math.cbrt(Math.random()) * 2.2; // Radius
        
        let x = r * Math.sin(phi) * Math.cos(theta);
        let y = r * Math.sin(phi) * Math.sin(theta);
        let z = r * Math.cos(phi);

        // Morph sphere to brain shape
        // Flatten bottom slightly
        if (y < 0) y *= 0.6;
        
        // Elongate front-to-back (z-axis)
        z *= 1.2;
        
        // Squeeze side-to-side (x-axis) for each lobe
        x *= 0.6;
        
        // Apply offset to separate lobes
        x += xOffset;

        // Add some noise for gyri/sulci texture
        x += (Math.random() - 0.5) * 0.15;
        y += (Math.random() - 0.5) * 0.15;
        z += (Math.random() - 0.5) * 0.15;

        positions[i * 3] = x;
        positions[i * 3 + 1] = y;
        positions[i * 3 + 2] = z;

        // Color gradient based on depth or position
        // Inner parts brighter, outer parts darker
        const dist = Math.sqrt(x*x + y*y + z*z);
        const mixedColor = colorInside.clone().lerp(colorOutside, dist / 3.5);
        
        colors[i * 3] = mixedColor.r;
        colors[i * 3 + 1] = mixedColor.g;
        colors[i * 3 + 2] = mixedColor.b;
    }
    return { positions, colors };
  }, []);

  useFrame((state) => {
      const t = state.clock.getElapsedTime();
      if (ref.current) {
          // Slow continuous rotation
          ref.current.rotation.y = t * 0.05;
          // Neural Pulse Effect
          const scale = 1 + Math.sin(t * 2) * 0.01;
          ref.current.scale.set(scale, scale, scale);
      }
  });

  return (
    <Points ref={ref} positions={particles.positions} colors={particles.colors} stride={3}>
      <PointMaterial
        transparent
        vertexColors
        size={0.02}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.7}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
};

const SynapseLines = () => {
    // A secondary system to look like firing neurons
    const ref = useRef<THREE.Points>(null!);
    
    const particles = useMemo(() => {
        const count = 300;
        const positions = new Float32Array(count * 3);
        
        for (let i = 0; i < count; i++) {
             // Similar logic but just scattered inside
            const isRightLobe = Math.random() > 0.5;
            const xOffset = isRightLobe ? 0.6 : -0.6;
            
            const r = Math.random() * 2.0; 
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.random() * Math.PI;

            let x = r * Math.sin(phi) * Math.cos(theta);
            let y = r * Math.sin(phi) * Math.sin(theta);
            let z = r * Math.cos(phi);
            
            if (y < 0) y *= 0.6;
            z *= 1.2;
            x *= 0.6;
            x += xOffset;

            positions[i * 3] = x;
            positions[i * 3 + 1] = y;
            positions[i * 3 + 2] = z;
        }
        return positions;
    }, []);

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        if (ref.current) {
            ref.current.rotation.y = t * 0.05;
            // Flicker effect for 'activity'
            (ref.current.material as THREE.PointsMaterial).opacity = 0.4 + Math.sin(t * 10) * 0.2;
        }
    });

    return (
        <Points ref={ref} positions={particles} stride={3}>
            <PointMaterial
                transparent
                color="#ffffff"
                size={0.03}
                sizeAttenuation={true}
                depthWrite={false}
                opacity={0.5}
                blending={THREE.AdditiveBlending}
            />
        </Points>
    );
};

const NetworkBrain: React.FC = () => {
  return (
    <div className="w-full h-full min-h-[300px] md:min-h-[500px] absolute inset-0 z-0 opacity-100 cursor-move">
      <Canvas camera={{ position: [0, 0, 7], fov: 40 }} gl={{ antialias: true, alpha: true }}>
        <Fog attach="fog" args={['#000000', 3, 12]} />
        <AmbientLight intensity={0.5} />
        <Float speed={2} rotationIntensity={0.2} floatIntensity={0.2}>
             <BrainParticles />
             <SynapseLines />
        </Float>
        <OrbitControls enableZoom={false} autoRotate={false} />
      </Canvas>
    </div>
  );
};

export default NetworkBrain;