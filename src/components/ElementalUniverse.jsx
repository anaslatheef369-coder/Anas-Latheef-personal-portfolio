import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Float, Sparkles, MeshDistortMaterial } from '@react-three/drei';

export const ElementalUniverse = () => {
  const galaxyRef = useRef();
  const blobRef1 = useRef();
  const blobRef2 = useRef();

  // Milky Way Galaxy Generator
  const particlesCount = 12000;
  const positions = useMemo(() => {
    const pos = new Float32Array(particlesCount * 3);
    for(let i = 0; i < particlesCount; i++) {
      const radius = Math.random() * 25;
      const spinAngle = radius * 0.3;
      const branchAngle = ((i % 4) * Math.PI * 2) / 4; // 4 spiral arms
      
      const randomX = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 3;
      const randomY = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 1.5;
      const randomZ = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 3;
      
      pos[i * 3] = Math.cos(branchAngle + spinAngle) * radius + randomX;
      pos[i * 3 + 1] = randomY;
      pos[i * 3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ;
    }
    return pos;
  }, []);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    
    if (galaxyRef.current) {
      galaxyRef.current.rotation.y += delta * 0.05; // Slowly spin the galaxy
      galaxyRef.current.rotation.z = 0.2; // Tilt it slightly
    }

    if (blobRef1.current) {
      blobRef1.current.rotation.x = t * 0.2;
      blobRef1.current.rotation.y = t * 0.3;
    }
    if (blobRef2.current) {
      blobRef2.current.rotation.x = -t * 0.2;
      blobRef2.current.rotation.y = -t * 0.1;
    }

    const scrollY = window.scrollY;
    state.camera.position.y = -scrollY * 0.003;
    state.camera.position.z = 5 - scrollY * 0.001;
  });

  return (
    <group>
      <fog attach="fog" args={['#030308', 3, 25]} />

      <pointLight color="#FF007F" intensity={10} position={[5, 2, 5]} distance={30} />
      <pointLight color="#00F0FF" intensity={10} position={[-5, -2, -5]} distance={30} />
      <ambientLight intensity={0.2} />

      {/* Milky Way Galaxy */}
      <Points ref={galaxyRef} positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial transparent color="#FFFFFF" size={0.03} sizeAttenuation={true} depthWrite={false} blending={2} />
      </Points>

      {/* Galaxy Core Glow / Nebula Dust */}
      <Sparkles count={500} scale={20} size={6} speed={0.5} opacity={0.4} color="#00C0D0" />
      <Sparkles count={500} scale={20} size={6} speed={0.5} opacity={0.4} color="#FF007F" />

      {/* 3D Graphics */}
      <Float speed={2} rotationIntensity={3} floatIntensity={4}>
        <mesh ref={blobRef1} position={[3, 1, -2]}>
          <icosahedronGeometry args={[1.5, 4]} />
          <MeshDistortMaterial color="#000000" emissive="#111111" metalness={1} roughness={0.1} distort={0.5} speed={3} />
        </mesh>
      </Float>

      <Float speed={3} rotationIntensity={4} floatIntensity={3}>
        <mesh ref={blobRef2} position={[-4, -2, -3]}>
          <torusKnotGeometry args={[1.2, 0.4, 128, 32]} />
          <MeshDistortMaterial color="#000000" emissive="#111111" metalness={1} roughness={0.1} distort={0.3} speed={2} />
        </mesh>
      </Float>
    </group>
  );
};
