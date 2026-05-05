import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, MeshDistortMaterial, Sphere } from '@react-three/drei';
import * as THREE from 'three';

const SKILLS = [
  'Flutter', 'Dart', 'Firebase', 'Rust', 'Golang', 
  'Node.js', 'React', 'Next.js', 'Clean Architecture',
  'GraphQL', 'PostgreSQL', 'Docker', 'AWS', 'TDD', 'CI/CD'
];

function SkillWord({ word, index, count }: { word: string; index: number; count: number }) {
  const ref = useRef<THREE.Group>(null);
  const [hovered, setHovered] = React.useState(false);
  
  const phi = Math.acos(-1 + (2 * index) / count);
  const theta = Math.sqrt(count * Math.PI) * phi;
  
  const x = 4 * Math.cos(theta) * Math.sin(phi);
  const y = 4 * Math.sin(theta) * Math.sin(phi);
  const z = 4 * Math.cos(phi);

  useFrame((state) => {
    if (ref.current) {
      ref.current.lookAt(0, 0, 0);
      // Subtle floating effect manually
      const time = state.clock.getElapsedTime();
      ref.current.position.y = y + Math.sin(time + index) * 0.1;
    }
  });

  return (
    <Text
      ref={ref as any}
      position={[x, y, z]}
      fontSize={hovered ? 0.5 : 0.35}
      color={hovered ? "#4f46e5" : "#ffffff"}
      font="https://fonts.gstatic.com/s/plusjakartasans/v11/L0x8DFK8qJt_vHn26535V6H_994.woff"
      anchorX="center"
      anchorY="middle"
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      fillOpacity={hovered ? 1 : 0.4}
    >
      {word}
    </Text>
  );
}

function Scene() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.0005;
      
      const targetRotationX = (state.mouse.y * Math.PI) * 0.02;
      const targetRotationY = (state.mouse.x * Math.PI) * 0.02;
      
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotationX, 0.01);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotationY, 0.01);
    }
  });

  return (
    <group ref={groupRef}>
      <Sphere args={[2, 32, 32]}>
        <MeshDistortMaterial
          color="#030303"
          roughness={0.1}
          metalness={0.8}
          distort={0.15}
          speed={1.5}
          transparent
          opacity={0.8}
        />
      </Sphere>
      
      {SKILLS.map((skill, i) => (
        <SkillWord key={skill} word={skill} index={i} count={SKILLS.length} />
      ))}
      
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} color="#4f46e5" intensity={1.5} />
      <pointLight position={[-10, -10, -10]} color="#0ea5e9" intensity={0.5} />
    </group>
  );
}

export const SkillSphere = () => {
  return (
    <div className="w-full h-full opacity-80">
      <Canvas 
        camera={{ position: [0, 0, 12], fov: 40 }}
        dpr={[1, 2]} 
        gl={{ powerPreference: "high-performance", antialias: true }}
      >
        <Scene />
      </Canvas>
    </div>
  );
};
