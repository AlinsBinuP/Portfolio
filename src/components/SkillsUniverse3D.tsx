import React, { useRef, useState, useMemo, Suspense, memo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import {
  OrbitControls,
  Float,
  Billboard,
  Html,
  MeshTransmissionMaterial,
  Environment,
  ContactShadows,
  Sparkles,
  AdaptiveDpr,
  AdaptiveEvents
} from '@react-three/drei';
import * as THREE from 'three';
import { motion, useScroll, useTransform } from 'framer-motion';

interface Skill {
  id: string;
  name: string;
  orbit: number;
  speed: number;
  color: string;
  icon: string;
  category: string;
  catColor: string;
  level: number;
  experience: string;
  desc?: string;
}

const SKILLS: Skill[] = [
  { id: 'android', name: 'Android Studio', orbit: 6, speed: 0.15, color: '#3DDC84', icon: 'androidstudio', category: 'Tools', catColor: '#3DDC84', level: 90, experience: '3+ Years' },
  { id: 'react', name: 'React', orbit: 6, speed: 0.15, color: '#61DAFB', icon: 'react', category: 'Frontend', catColor: '#61DAFB', level: 92, experience: '2+ Years' },
  { id: 'js', name: 'JavaScript', orbit: 6, speed: 0.15, color: '#F7DF1E', icon: 'js', category: 'Languages', catColor: '#F7DF1E', level: 96, experience: '3+ Years' },
  { id: 'firebase', name: 'Firebase', orbit: 10, speed: 0.12, color: '#FFCA28', icon: 'firebase', category: 'Backend', catColor: '#FFCA28', level: 95, experience: '3+ Years' },
  { id: 'nodejs', name: 'Node.js', orbit: 10, speed: 0.12, color: '#339933', icon: 'nodejs', category: 'Backend', catColor: '#339933', level: 88, experience: '2+ Years' },
  { id: 'mongodb', name: 'MongoDB', orbit: 10, speed: 0.12, color: '#47A248', icon: 'mongodb', category: 'Backend', catColor: '#47A248', level: 85, experience: '2+ Years' },
  { id: 'tailwind', name: 'Tailwind CSS', orbit: 10, speed: 0.12, color: '#06B6D4', icon: 'tailwind', category: 'Frontend', catColor: '#06B6D4', level: 94, experience: '2+ Years' },
  { id: 'github', name: 'GitHub', orbit: 14, speed: 0.08, color: '#181717', icon: 'github', category: 'Tools', catColor: '#444', level: 95, experience: '3+ Years' },
  { id: 'figma', name: 'Figma', orbit: 14, speed: 0.08, color: '#F24E1E', icon: 'figma', category: 'Design', catColor: '#F24E1E', level: 88, experience: '2+ Years' },
  { id: 'sql', name: 'SQL', orbit: 14, speed: 0.08, color: '#336791', icon: 'mysql', category: 'Backend', catColor: '#336791', level: 82, experience: '2+ Years' },
  { id: 'python', name: 'Python', orbit: 14, speed: 0.08, color: '#3776AB', icon: 'python', category: 'Languages', catColor: '#3776AB', level: 80, experience: '2+ Years' },
  { id: 'java', name: 'Java', orbit: 14, speed: 0.08, color: '#007396', icon: 'java', category: 'Languages', catColor: '#007396', level: 75, experience: '1+ Year' },
  { id: 'git', name: 'Git', orbit: 14, speed: 0.08, color: '#F05032', icon: 'git', category: 'Tools', catColor: '#F05032', level: 95, experience: '3+ Years' },
];

const FLUTTER_SKILL: Skill = {
  id: 'flutter',
  name: 'Flutter',
  level: 98,
  experience: '3+ Years',
  category: 'Core Stack',
  orbit: 0,
  speed: 0,
  color: '#02569B',
  catColor: '#02569B',
  icon: 'flutter',
  desc: 'Mastery in building high-performance, beautiful apps for mobile, web, and desktop from a single codebase.'
};

const SkillNode = memo(({ skill, onClick }: { skill: Skill, onClick: (s: Skill) => void }) => {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  const offsetAngle = useMemo(() => {
    const sameOrbit = SKILLS.filter(s => s.orbit === skill.orbit);
    const idx = sameOrbit.findIndex(s => s.id === skill.id);
    return (idx / sameOrbit.length) * Math.PI * 2;
  }, [skill]);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime() * skill.speed + offsetAngle;
    const x = Math.cos(t) * skill.orbit * 1.35;
    const z = Math.sin(t) * skill.orbit * 0.85;
    groupRef.current.position.set(x, Math.sin(t * 0.3) * 0.2, z);
  });

  return (
    <group ref={groupRef}>
      <Billboard>
        <Html 
          transform 
          distanceFactor={12} 
          occlude 
          pointerEvents="none"
          style={{ 
            background: 'transparent',
            border: 'none',
            padding: 0,
            margin: 0
          }}
        >
          <motion.div
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
            onClick={(e) => { e.stopPropagation(); onClick(skill); }}
            className={`flex items-center gap-3 px-5 py-2.5 bg-white/95 backdrop-blur-xl rounded-full border cursor-pointer pointer-events-auto transition-shadow ${hovered ? 'border-indigo-400 shadow-xl' : 'border-white shadow-sm'}`}
            style={{ minWidth: 140 }}
          >
            <img
              src={`https://skillicons.dev/icons?i=${skill.icon}`}
              className="w-6 h-6 object-contain"
              alt={skill.name}
            />
            <span className="text-[11px] font-black text-[#0c0a28] whitespace-nowrap uppercase tracking-tighter">{skill.name}</span>
          </motion.div>
        </Html>
      </Billboard>
    </group>
  );
});

const OptimizedOrbit = memo(({ radius, color = "#6366f1" }: { radius: number, color?: string }) => {
  const points = useMemo(() => {
    const pts = [];
    const segments = 128;
    for (let i = 0; i <= segments; i++) {
      const angle = (i / segments) * Math.PI * 2;
      pts.push(new THREE.Vector3(Math.cos(angle) * radius * 1.35, 0, Math.sin(angle) * radius * 0.85));
    }
    return pts;
  }, [radius]);

  const geometry = useMemo(() => new THREE.BufferGeometry().setFromPoints(points), [points]);

  return (
    <group rotation={[0.1, 0, 0]}>
      <primitive object={new THREE.Line(geometry, new THREE.LineBasicMaterial({ color: color, transparent: true, opacity: 0.15 }))} raycast={() => null} />
    </group>
  );
});

const Scene = ({ onSkillSelect, scrollProgress }: { onSkillSelect: (s: Skill) => void, scrollProgress: any }) => {
  const sceneRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (sceneRef.current) {
      const { x, y } = state.mouse;
      // Combine mouse movement and scroll progress for 3D depth
      sceneRef.current.rotation.x = THREE.MathUtils.lerp(sceneRef.current.rotation.x, y * 0.05 + (scrollProgress.get() * Math.PI * 0.1), 0.05);
      sceneRef.current.rotation.y = THREE.MathUtils.lerp(sceneRef.current.rotation.y, x * 0.05 + (scrollProgress.get() * Math.PI * 0.5), 0.05);
    }
  });

  return (
    <group ref={sceneRef}>
      <pointLight position={[0, 0, 0]} intensity={10} color="#ffffff" distance={25} />
      <pointLight position={[0, 0, 0]} intensity={15} color="#ec4899" distance={15} />
      <pointLight position={[0, 0, 0]} intensity={15} color="#6366f1" distance={15} />

      <Sparkles count={40} scale={25} size={1.5} speed={0.4} color="#ec4899" opacity={0.3} />

      <Float speed={1} rotationIntensity={0.1} floatIntensity={0.1}>
        <group>
          <mesh raycast={() => null}>
            <sphereGeometry args={[4.5, 32, 32]} />
            <meshBasicMaterial color="#ec4899" transparent opacity={0.08} blending={THREE.AdditiveBlending} />
          </mesh>
          <mesh raycast={() => null}>
            <sphereGeometry args={[5.5, 32, 32]} />
            <meshBasicMaterial color="#6366f1" transparent opacity={0.04} blending={THREE.AdditiveBlending} />
          </mesh>

          <mesh raycast={() => null}>
            <sphereGeometry args={[3, 32, 32]} />
            <meshStandardMaterial color="#2563eb" emissive="#1d4ed8" emissiveIntensity={3} roughness={0.1} metalness={0.5} />
          </mesh>

          <mesh raycast={() => null}>
            <sphereGeometry args={[3.2, 32, 32]} />
            <MeshTransmissionMaterial
              thickness={1.5}
              roughness={0.05}
              transmission={1}
              ior={1.3}
              chromaticAberration={0.1}
              backside
              color="#ffffff"
              samples={2} // Reduced from 4 for better performance
              resolution={128} // Reduced from 256 for faster rendering
            />
          </mesh>

          <Billboard position={[0, 0, 0.5]}>
            <Html transform distanceFactor={5}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                onClick={(e) => { e.stopPropagation(); onSkillSelect(FLUTTER_SKILL); }}
                className="cursor-pointer pointer-events-auto flex flex-col items-center text-center"
              >
                <img
                  src="https://skillicons.dev/icons?i=flutter"
                  className="w-24 h-24 object-contain drop-shadow-[0_0_25px_rgba(37,99,235,0.8)]"
                  alt="Flutter"
                />
                <div className="mt-4 filter drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
                  <span className="text-[10px] font-black text-white/60 uppercase tracking-[0.5em] mb-2 block">CORE STACK</span>
                  <span className="text-4xl font-display font-black text-white uppercase tracking-tighter leading-none mb-2">Flutter</span>
                  <span className="text-[11px] font-bold text-white/90 uppercase tracking-widest leading-none block mt-2">Full Stack Developer</span>
                </div>
              </motion.div>
            </Html>
          </Billboard>
        </group>
      </Float>

      <OptimizedOrbit radius={6} color="#6366f1" />
      <OptimizedOrbit radius={10} color="#ec4899" />
      <OptimizedOrbit radius={14} color="#a855f7" />

      {SKILLS.map((skill) => (
        <SkillNode
          key={skill.id}
          skill={skill}
          onClick={onSkillSelect}
        />
      ))}
    </group>
  );
};

export const SkillsUniverse3D = ({ onSkillSelect }: { onSkillSelect: (s: Skill) => void }) => {
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <div className="w-full h-[800px] relative overflow-hidden">
      {/* Multi-Color Atmospheric Background Glow with 3D Scroll Parallax */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div style={{ y: y1 }} className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(168,85,247,0.08)_0%,transparent_70%)] blur-[120px]" />
        <motion.div style={{ y: y2 }} className="absolute bottom-[-10%] left-[-10%] w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(6,182,212,0.15)_0%,transparent_70%)] blur-[100px]" />
        <motion.div style={{ y: y3 }} className="absolute bottom-[-10%] right-[-10%] w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(249,115,22,0.15)_0%,rgba(236,72,153,0.1)_40%,transparent_70%)] blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(255,255,255,0.15)_0%,transparent_60%)] blur-[80px]" />
      </div>

      <Canvas
        className="relative z-10"
        shadows={false}
        dpr={[1, 1.5]}
        camera={{ position: [0, 10, 32], fov: 40 }}
        performance={{ min: 0.5 }}
      >
        <Suspense fallback={null}>
          <AdaptiveDpr pixelated />
          <AdaptiveEvents />
          <Environment preset="city" />
          <OrbitControls
            enableZoom={true}
            minDistance={15}
            maxDistance={50}
            autoRotate
            autoRotateSpeed={0.2}
            enableDamping
          />
          <ambientLight intensity={0.6} />
          <Scene onSkillSelect={onSkillSelect} scrollProgress={scrollYProgress} />
          <ContactShadows position={[0, -15, 0]} opacity={0.1} scale={60} blur={3} far={20} />
        </Suspense>
      </Canvas>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-10 bg-white/80 backdrop-blur-2xl px-10 py-3 rounded-full border border-white shadow-xl pointer-events-none z-20">
        {[['🖐️', 'Drag'], ['🖱️', 'Zoom'], ['👆', 'Click']].map(([emoji, label]) => (
          <div key={label} className="flex items-center gap-2">
            <span className="text-gray-400">{emoji}</span>
            <span className="text-[10px] font-black text-[#0c0a28] uppercase tracking-[0.2em]">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
