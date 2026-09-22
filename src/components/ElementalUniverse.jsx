import React, { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Float } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.esm';

export const ElementalUniverse = () => {
  const particlesRef = useRef();
  const torusRef = useRef();
  const isoRef1 = useRef();
  const isoRef2 = useRef();
  const isoRef3 = useRef();

  // Antimatter particle field
  const sphere = useMemo(() => random.inSphere(new Float32Array(5000 * 3), { radius: 4 }), []);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();
    
    // 4D Time-based Volatility (Francium/Astatine)
    if (particlesRef.current) {
      particlesRef.current.rotation.x -= delta / 20;
      particlesRef.current.rotation.y -= delta / 30;
    }
    
    // 5D Complex Geometry (Antimatter Core Structure)
    if (torusRef.current) {
      torusRef.current.rotation.x = time * 0.15;
      torusRef.current.rotation.y = time * 0.2;
    }
    
    // Iridium Dense Metallic Shards rotation
    if (isoRef1.current) isoRef1.current.rotation.y += delta * 0.4;
    if (isoRef2.current) isoRef2.current.rotation.x -= delta * 0.6;
    if (isoRef3.current) {
      isoRef3.current.rotation.z += delta * 0.3;
      isoRef3.current.rotation.x += delta * 0.2;
    }

    // Scroll-based 4D movement (Camera moves through the elements)
    const scrollY = window.scrollY;
    // As you scroll down, the camera sinks into the void
    state.camera.position.y = -scrollY * 0.003;
    state.camera.position.z = 3 - scrollY * 0.001;
  });

  return (
    <group>
      {/* Antimatter Particles (Astatine/Francium energy) */}
      <Points ref={particlesRef} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial transparent color="#8B5CF6" size={0.015} sizeAttenuation={true} depthWrite={false} blending={2} />
      </Points>

      {/* 5D Antimatter/Polonium Core (Wireframe Torus Knot) */}
      <mesh ref={torusRef} position={[0, -1, -2]}>
        <torusKnotGeometry args={[2, 0.08, 300, 32, 4, 9]} />
        <meshStandardMaterial color="#39FF14" wireframe emissive="#39FF14" emissiveIntensity={2} transparent opacity={0.15} />
      </mesh>

      {/* Iridium Solid Metallic Structures (Dense, reflective shards) */}
      <Float speed={2} rotationIntensity={2} floatIntensity={2}>
        <mesh ref={isoRef1} position={[3, 1, -1]}>
          <icosahedronGeometry args={[0.6, 0]} />
          <meshStandardMaterial color="#1F1F24" metalness={1} roughness={0.05} />
        </mesh>
      </Float>

      <Float speed={3} rotationIntensity={3} floatIntensity={3}>
        <mesh ref={isoRef2} position={[-3, -3, -1.5]}>
          <octahedronGeometry args={[0.5, 0]} />
          <meshStandardMaterial color="#1F1F24" metalness={0.9} roughness={0.1} />
        </mesh>
      </Float>

      <Float speed={1.5} rotationIntensity={1} floatIntensity={4}>
        <mesh ref={isoRef3} position={[2.5, -6, -2]}>
          <tetrahedronGeometry args={[0.7, 0]} />
          <meshStandardMaterial color="#1F1F24" metalness={1} roughness={0.15} />
        </mesh>
      </Float>
    </group>
  );
};
