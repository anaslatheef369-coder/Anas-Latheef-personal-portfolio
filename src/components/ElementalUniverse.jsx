import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Float } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.esm';

export const ElementalUniverse = () => {
  const particlesRef = useRef();
  const ringRef1 = useRef();
  const ringRef2 = useRef();

  // White ball graphics all over the website area (larger radius)
  const sphere = useMemo(() => random.inSphere(new Float32Array(15000 * 3), { radius: 15 }), []);

  useFrame((state, delta) => {
    // Rotation of the white particle universe
    if (particlesRef.current) {
      particlesRef.current.rotation.x -= delta / 30;
      particlesRef.current.rotation.y -= delta / 40;
    }

    // Moving 3D Graphics (Red and Green Rings)
    if (ringRef1.current) {
      ringRef1.current.rotation.x += delta * 0.2;
      ringRef1.current.rotation.y += delta * 0.3;
    }
    if (ringRef2.current) {
      ringRef2.current.rotation.x -= delta * 0.3;
      ringRef2.current.rotation.y -= delta * 0.4;
    }

    // Camera movement based on scroll
    const scrollY = window.scrollY;
    state.camera.position.y = -scrollY * 0.003;
    state.camera.position.z = 5 - scrollY * 0.001;
  });

  return (
    <group>
      {/* Background Deep Blue Fog */}
      <fog attach="fog" args={['#00102A', 2, 20]} />

      {/* White Particles Everywhere */}
      <Points ref={particlesRef} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial transparent color="#FFFFFF" size={0.02} sizeAttenuation={true} depthWrite={false} blending={2} />
      </Points>

      {/* Moving 3D Graphics (Red and Green Rings) */}
      <Float speed={2} rotationIntensity={2} floatIntensity={2}>
        <mesh ref={ringRef1} position={[-4, 2, -3]}>
          <torusGeometry args={[1.5, 0.02, 16, 100]} />
          <meshStandardMaterial color="#FF003C" emissive="#FF003C" emissiveIntensity={2} wireframe />
        </mesh>
      </Float>

      <Float speed={3} rotationIntensity={3} floatIntensity={2}>
        <mesh ref={ringRef2} position={[4, -3, -4]}>
          <torusGeometry args={[2, 0.02, 16, 100]} />
          <meshStandardMaterial color="#00FF41" emissive="#00FF41" emissiveIntensity={2} wireframe />
        </mesh>
      </Float>
    </group>
  );
};
