import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.esm';

export const ParticleStorm = () => {
  const ref = useRef();
  
  // Create 5000 particles in a sphere representing the void/antimatter field
  const sphere = useMemo(() => random.inSphere(new Float32Array(5000 * 3), { radius: 1.5 }), []);

  useFrame((state, delta) => {
    // 4D Motion: Rotate the storm constantly, creating a sense of volatility
    ref.current.rotation.x -= delta / 10;
    ref.current.rotation.y -= delta / 15;
    
    // Pulse the position slightly based on time (Francium/Astatine instability)
    const time = state.clock.getElapsedTime();
    ref.current.position.y = Math.sin(time * 0.5) * 0.1;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#8B5CF6" // Promethium Violet glow
          size={0.005}
          sizeAttenuation={true}
          depthWrite={false}
          blending={2} // Additive blending for bioluminescent feel
        />
      </Points>
    </group>
  );
};
