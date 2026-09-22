import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Float, Sparkles, MeshDistortMaterial } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.esm';

export const ElementalUniverse = () => {
  const particlesRef = useRef();
  const blobRef1 = useRef();
  const blobRef2 = useRef();
  const light1 = useRef();
  const light2 = useRef();
  const light3 = useRef();

  // Dark particle storm so it shows up on white bg
  const sphere = useMemo(() => random.inSphere(new Float32Array(5000 * 3), { radius: 12 }), []);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    
    if (particlesRef.current) {
      particlesRef.current.rotation.x -= delta / 20;
      particlesRef.current.rotation.y -= delta / 30;
    }

    if (blobRef1.current) {
      blobRef1.current.rotation.x = t * 0.2;
      blobRef1.current.rotation.y = t * 0.3;
    }
    if (blobRef2.current) {
      blobRef2.current.rotation.x = -t * 0.2;
      blobRef2.current.rotation.y = -t * 0.1;
    }

    if (light1.current) {
      light1.current.position.x = Math.sin(t * 0.8) * 5;
      light1.current.position.z = Math.cos(t * 0.8) * 5;
    }
    if (light2.current) {
      light2.current.position.x = Math.sin(t * 0.6 + 2) * 6;
      light2.current.position.y = Math.cos(t * 0.6 + 2) * 6;
    }
    if (light3.current) {
      light3.current.position.z = Math.sin(t * 0.5 + 4) * 5;
      light3.current.position.y = Math.cos(t * 0.5 + 4) * 5;
    }

    const scrollY = window.scrollY;
    state.camera.position.y = -scrollY * 0.003;
    state.camera.position.z = 5 - scrollY * 0.001;
  });

  return (
    <group>
      {/* White Fog */}
      <fog attach="fog" args={['#FFFFFF', 3, 25]} />

      <pointLight ref={light1} color="#FF007F" intensity={15} distance={30} />
      <pointLight ref={light2} color="#00F0FF" intensity={15} distance={30} />
      <pointLight ref={light3} color="#7000FF" intensity={15} distance={30} />
      <ambientLight intensity={0.5} />

      {/* Dark Particles */}
      <Points ref={particlesRef} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial transparent color="#222222" size={0.03} sizeAttenuation={true} depthWrite={false} blending={1} />
      </Points>

      <Sparkles count={400} scale={15} size={6} speed={0.5} opacity={0.8} color="#00C0D0" />
      <Sparkles count={400} scale={15} size={6} speed={0.5} opacity={0.8} color="#FF007F" />

      {/* Silver/White 3D Objects that reflect vibrant lights brightly */}
      <Float speed={2} rotationIntensity={3} floatIntensity={4}>
        <mesh ref={blobRef1} position={[3, 1, -2]}>
          <icosahedronGeometry args={[1.5, 4]} />
          <MeshDistortMaterial color="#FFFFFF" emissive="#333333" metalness={0.9} roughness={0.05} distort={0.5} speed={3} />
        </mesh>
      </Float>

      <Float speed={3} rotationIntensity={4} floatIntensity={3}>
        <mesh ref={blobRef2} position={[-4, -2, -3]}>
          <torusKnotGeometry args={[1.2, 0.4, 128, 32]} />
          <MeshDistortMaterial color="#FFFFFF" emissive="#333333" metalness={0.9} roughness={0.1} distort={0.3} speed={2} />
        </mesh>
      </Float>
    </group>
  );
};
