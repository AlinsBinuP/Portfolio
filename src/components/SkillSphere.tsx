import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, Float, MeshDistortMaterial, Sphere } from '@react-three/drei';
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
      // Gentle rotation looking towards center
      ref.current.lookAt(0, 0, 0);
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <Text
        ref={ref as any}
        position={[x, y, z]}
        fontSize={hovered ? 0.55 : 0.4}
        color={hovered ? "#ea580c" : "#0369a1"}
        font="https://fonts.gstatic.com/s/plusjakartasans/v11/L0x8DFK8qJt_vHn26535V6H_994.woff"
        anchorX="center"
        anchorY="middle"
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        {word}
      </Text>
    </Float>
  );
}

function Scene() {
  const sphereRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      // Base rotation
      groupRef.current.rotation.y += 0.002;
      
      // Mouse interaction
      const targetRotationX = (state.mouse.y * Math.PI) * 0.1;
      const targetRotationY = (state.mouse.x * Math.PI) * 0.1;
      
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotationX, 0.05);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotationY, 0.05);
    }
  });

  return (
    <group ref={groupRef}>
      <Sphere args={[2, 64, 64]}>
        <MeshDistortMaterial
          color="#ffffff"
          roughness={0}
          metalness={1}
          distort={0.4}
          speed={3}
          envMapIntensity={2}
          clearcoat={1}
        />
      </Sphere>
      
      {SKILLS.map((skill, i) => (
        <SkillWord key={skill} word={skill} index={i} count={SKILLS.length} />
      ))}
      
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <pointLight position={[-10, -10, -10]} color="#0ea5e9" intensity={2} />
      <pointLight position={[10, 10, 10]} color="#ffffff" intensity={1} />
    </group>
  );
}

export const SkillSphere = () => {
  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 0, 10], fov: 35 }}>
        <Scene />
      </Canvas>
    </div>
  );
};
