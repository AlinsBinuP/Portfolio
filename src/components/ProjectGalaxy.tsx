import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Text, Sphere, MeshDistortMaterial, PerspectiveCamera, Stars } from '@react-three/drei';
import * as THREE from 'three';
import { motion, useScroll, useTransform } from 'framer-motion';

const PROJECT_NODES = [
  { name: 'Light Suvara', color: '#0369a1', position: [-4, 2, 0] as [number, number, number], scale: 1.2 },
  { name: 'Prism Studio', color: '#7c3aed', position: [4, -1, 2] as [number, number, number], scale: 1.4 },
  { name: 'CarDash', color: '#0ea5e9', position: [-2, -3, -2] as [number, number, number], scale: 1.1 },
  { name: 'Prism AI', color: '#db2777', position: [3, 3, -3] as [number, number, number], scale: 1.3 },
];

const FloatingNode = ({ node }: { node: typeof PROJECT_NODES[0] }) => {
  const mesh = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (mesh.current) {
      mesh.current.position.y += Math.sin(time + node.position[0]) * 0.002;
      mesh.current.rotation.x = Math.sin(time / 2) * 0.2;
      mesh.current.rotation.y = Math.cos(time / 2) * 0.2;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <group position={node.position}>
        <Sphere args={[1, 64, 64]} scale={node.scale}>
          <MeshDistortMaterial
            color={node.color}
            speed={3}
            distort={0.4}
            radius={1}
            emissive={node.color}
            emissiveIntensity={0.5}
            roughness={0.2}
            metalness={0.8}
          />
        </Sphere>
        <Text
          position={[0, -node.scale - 0.5, 0]}
          fontSize={0.4}
          color="white"
          font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfMZhrib2Bg-4.woff"
          anchorX="center"
          anchorY="middle"
        >
          {node.name.toUpperCase()}
        </Text>
      </group>
    </Float>
  );
};

const Scene = () => {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={50} />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#0369a1" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#7c3aed" />
      
      {PROJECT_NODES.map((node, i) => (
        <FloatingNode key={i} node={node} />
      ))}
      
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
    </>
  );
};

export const ProjectGalaxy = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);

  return (
    <section ref={containerRef} className="relative h-[100vh] w-full bg-transparent overflow-hidden">
      <motion.div style={{ opacity, scale }} className="absolute inset-0 z-10 pointer-events-none">
        <div className="flex flex-col items-center justify-center h-full pt-20">
          <span className="text-cyan-400 font-mono text-[11px] font-bold tracking-[0.4em] uppercase mb-4">
            // ORBITAL ARCHIVE
          </span>
          <h2 className="text-6xl md:text-8xl font-display font-black tracking-tighter text-white/90 uppercase text-center leading-[0.85]">
            Interactive<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-magenta-500">Galaxy.</span>
          </h2>
        </div>
      </motion.div>

      <div className="absolute inset-0 cursor-grab active:cursor-grabbing">
        <Canvas dpr={[1, 2]}>
          <Scene />
        </Canvas>
      </div>

      {/* Decorative Overlays */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-[#030303] via-transparent to-[#030303] opacity-60" />
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full backdrop-blur-md">
        <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
        <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Scroll to explore universe</span>
      </div>
    </section>
  );
};
