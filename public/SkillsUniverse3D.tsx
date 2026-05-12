import React, { useRef, useState, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { 
  OrbitControls, 
  Float, 
  MeshDistortMaterial, 
  Billboard, 
  Html,
  MeshTransmissionMaterial,
  Environment,
  ContactShadows,
  Points,
  PointMaterial,
  Sparkles
} from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'framer-motion';

const SKILLS = [
  // orbit 4 — ring 1 (closest)
  { id: 'flutter', name: 'Flutter',      level: 98,  orbit: 4,  speed: 0.35, color: '#02569B', icon: 'flutter',    category: 'Core Stack',  catColor: '#02569B' },
  { id: 'dart',    name: 'Dart',         level: 95,  orbit: 4,  speed: 0.35, color: '#0175C2', icon: 'dart',       category: 'Language',    catColor: '#0175C2' },
  // orbit 7 — ring 2
  { id: 'react',   name: 'React',        level: 92,  orbit: 7,  speed: 0.25, color: '#61DAFB', icon: 'react',      category: 'Frontend',    catColor: '#61DAFB' },
  { id: 'tailwind',name: 'Tailwind CSS', level: 90,  orbit: 7,  speed: 0.25, color: '#38B2AC', icon: 'tailwind',   category: 'Styling',     catColor: '#38B2AC' },
  { id: 'js',      name: 'JavaScript',   level: 95,  orbit: 7,  speed: 0.25, color: '#F7DF1E', icon: 'js',         category: 'Language',    catColor: '#F7DF1E' },
  // orbit 10 — ring 3
  { id: 'firebase',name: 'Firebase',     level: 88,  orbit: 10, speed: 0.18, color: '#FFCA28', icon: 'firebase',   category: 'Backend',     catColor: '#FFCA28' },
  { id: 'nodejs',  name: 'Node.js',      level: 88,  orbit: 10, speed: 0.18, color: '#339933', icon: 'nodejs',     category: 'Backend',     catColor: '#339933' },
  { id: 'github',  name: 'GitHub',       level: 94,  orbit: 10, speed: 0.18, color: '#181717', icon: 'github',     category: 'Tools',       catColor: '#444' },
  { id: 'python',  name: 'Python',       level: 82,  orbit: 10, speed: 0.18, color: '#3776AB', icon: 'python',     category: 'Language',    catColor: '#3776AB' },
  // orbit 13 — ring 4 (outermost)
  { id: 'docker',  name: 'Docker',       level: 85,  orbit: 13, speed: 0.12, color: '#2496ED', icon: 'docker',     category: 'Tools',       catColor: '#2496ED' },
  { id: 'mongodb', name: 'MongoDB',      level: 85,  orbit: 13, speed: 0.12, color: '#47A248', icon: 'mongodb',    category: 'Database',    catColor: '#47A248' },
  { id: 'figma',   name: 'Figma',        level: 88,  orbit: 13, speed: 0.12, color: '#F24E1E', icon: 'figma',      category: 'Design',      catColor: '#F24E1E' },
];

const SkillNode = ({ skill, onClick, onHover }) => {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  // Spread nodes evenly per orbit ring
  const offsetAngle = useMemo(() => {
    const sameOrbit = SKILLS.filter(s => s.orbit === skill.orbit);
    const idx = sameOrbit.findIndex(s => s.id === skill.id);
    return (idx / sameOrbit.length) * Math.PI * 2;
  }, [skill]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime() * skill.speed + offsetAngle;
    const x = Math.cos(t) * skill.orbit;
    const z = Math.sin(t) * skill.orbit * 0.75; // slight ellipse
    const y = Math.sin(t * 0.6 + offsetAngle) * 0.8;
    if (groupRef.current) groupRef.current.position.set(x, y, z);
  });

  return (
    <group ref={groupRef}>
      <Billboard
        follow={true}
        onPointerOver={() => { setHovered(true); onHover(skill); document.body.style.cursor = 'pointer'; }}
        onPointerOut={() => { setHovered(false); onHover(null); document.body.style.cursor = 'auto'; }}
        onClick={() => onClick(skill)}
      >
        <Html transform distanceFactor={10} position={[0, 0, 0]}>
          <motion.div
            animate={{ scale: hovered ? 1.15 : 1, y: hovered ? -4 : 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            className={`flex items-center gap-2 px-3 py-1.5 bg-white rounded-full shadow-lg border cursor-pointer pointer-events-auto ${hovered ? 'shadow-2xl border-indigo-200 ring-2 ring-indigo-300/30' : 'border-gray-100'}`}
            style={{ minWidth: 110 }}
          >
            <div className="w-7 h-7 rounded-full bg-gray-50 flex items-center justify-center flex-shrink-0 border border-gray-100 overflow-hidden">
              <img src={`https://skillicons.dev/icons?i=${skill.icon}`} className="w-4 h-4 object-contain" alt={skill.name} />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-black text-[#0c0a28] whitespace-nowrap uppercase tracking-tight leading-none">{skill.name}</span>
              <div className="flex items-center gap-1 mt-0.5">
                <div className="w-1 h-1 rounded-sm" style={{ backgroundColor: skill.catColor }} />
                <span className="text-[7px] font-bold text-gray-400 uppercase tracking-widest leading-none">{skill.category}</span>
              </div>
            </div>
          </motion.div>
        </Html>
      </Billboard>
    </group>
  );
};

const OrbitRing = ({ radius }: { radius: number }) => {
  const points = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i <= 128; i++) {
      const a = (i / 128) * Math.PI * 2;
      pts.push(new THREE.Vector3(Math.cos(a) * radius, 0, Math.sin(a) * radius * 0.75));
    }
    return pts;
  }, [radius]);

  const geo = useMemo(() => new THREE.BufferGeometry().setFromPoints(points), [points]);

  return (
    <line geometry={geo}>
      <lineBasicMaterial color="#6366f1" transparent opacity={0.06} />
    </line>
  );
};

const EnergyRing = ({ radius, color, speed = 1 }) => {
  const ref = useRef<THREE.Group>(null);
  useFrame((s) => {
    if (ref.current) {
      ref.current.rotation.y = s.clock.getElapsedTime() * speed;
      ref.current.rotation.x = Math.sin(s.clock.getElapsedTime() * 0.4) * 0.15;
    }
  });
  return (
    <group ref={ref}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[radius, 0.012, 16, 100]} />
        <meshBasicMaterial color={color} transparent opacity={0.5} />
      </mesh>
    </group>
  );
};

const Scene = ({ onSkillSelect, onHover }) => {
  const sceneRef = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (sceneRef.current) {
      sceneRef.current.rotation.x = THREE.MathUtils.lerp(sceneRef.current.rotation.x, state.mouse.y * 0.04, 0.04);
      sceneRef.current.rotation.y = THREE.MathUtils.lerp(sceneRef.current.rotation.y, state.mouse.x * 0.04, 0.04);
    }
  });

  return (
    <group ref={sceneRef}>
      {/* Core sphere */}
      <Float speed={2} rotationIntensity={0.15} floatIntensity={0.15}>
        <group>
          <mesh>
            <sphereGeometry args={[2.2, 64, 64]} />
            <meshBasicMaterial color="#4f46e5" transparent opacity={0.9} />
          </mesh>
          <mesh>
            <sphereGeometry args={[2.1, 64, 64]} />
            <MeshDistortMaterial color="#7c3aed" speed={5} distort={0.35} emissive="#9333ea" emissiveIntensity={2} />
          </mesh>
          <mesh>
            <sphereGeometry args={[2.4, 64, 64]} />
            <MeshTransmissionMaterial thickness={2} roughness={0.02} transmission={1} ior={1.5} chromaticAberration={0.06} backside color="#ffffff" />
          </mesh>
          <EnergyRing radius={3} color="#818cf8" speed={0.7} />
          <EnergyRing radius={3.3} color="#c084fc" speed={-0.45} />
          <group position={[-2, 1.2, 1.8]}>
            <Sparkles count={6} scale={1.5} size={6} speed={1} color="white" />
          </group>
          <Billboard>
            <Html transform distanceFactor={4} position={[0, 0, 0]} pointerEvents="none">
              <div className="flex flex-col items-center justify-center text-center select-none pointer-events-none">
                <span className="text-[9px] font-black text-white/60 uppercase tracking-[0.5em] mb-2 italic">{"</>"}</span>
                <span className="text-[7px] font-black text-white/40 uppercase tracking-[0.35em] mb-2">CORE STACK</span>
                <span className="text-2xl font-black text-white uppercase tracking-tight leading-none mb-2">Flutter</span>
                <div className="h-[1px] w-10 bg-white/30 mb-2" />
                <span className="text-[8px] font-bold text-white/80 uppercase tracking-widest">Full Stack Dev</span>
              </div>
            </Html>
          </Billboard>
        </group>
      </Float>

      {/* Orbit rings */}
      {[4, 7, 10, 13].map(r => <OrbitRing key={r} radius={r} />)}

      {/* Skill nodes */}
      {SKILLS.map(skill => (
        <SkillNode key={skill.id} skill={skill} onHover={onHover} onClick={onSkillSelect} />
      ))}
    </group>
  );
};

export const SkillsUniverse3D = ({ onSkillSelect }) => {
  return (
    <div className="w-full h-[700px] relative overflow-hidden bg-transparent">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_45%_50%,#fdfdff_0%,#f5f8ff_60%,#eef2ff_100%)] opacity-95" />

      <Canvas
        shadows
        dpr={[1, 1.5]}
        camera={{ position: [0, 12, 28], fov: 42 }}  // ← fixed: closer, wider FOV
        gl={{ antialias: true }}
      >
        <Suspense fallback={null}>
          <Environment preset="city" />
          <OrbitControls
            enableZoom={false}
            autoRotate
            autoRotateSpeed={0.4}
            maxPolarAngle={Math.PI / 1.7}
            minPolarAngle={Math.PI / 2.8}
            enableDamping
            dampingFactor={0.05}
          />
          <ambientLight intensity={1.2} />
          <pointLight position={[15, 15, 15]} intensity={2} color="#818cf8" />
          <pointLight position={[-15, -15, -15]} intensity={1.5} color="#f472b6" />
          <Scene onSkillSelect={onSkillSelect} onHover={() => {}} />
          <ContactShadows position={[0, -15, 0]} opacity={0.15} scale={60} blur={2} far={30} />
        </Suspense>
      </Canvas>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-8 bg-white/80 backdrop-blur-2xl px-10 py-3.5 rounded-full border border-white shadow-xl shadow-indigo-100/40 pointer-events-none">
        {[['🖐️', 'Drag to rotate'], ['🖱️', 'Scroll to zoom'], ['👆', 'Click a node']].map(([emoji, label]) => (
          <div key={label} className="flex items-center gap-2">
            <span className="text-base">{emoji}</span>
            <span className="text-[10px] font-black text-[#0c0a28] uppercase tracking-[0.2em]">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
