import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { ArrowRight, Globe, User, Cpu, Code, BookOpen, Zap, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Magnetic } from '../components/Magnetic';
import { SkillSphere } from '../components/SkillSphere';
import { ScrollPhoto } from '../components/ScrollPhoto';
import { FlutterGame } from '../components/FlutterGame';
import { InfoBook } from '../components/InfoBook';
import { Typewriter } from '../components/Typewriter';
import { ProjectGalaxy } from '../components/ProjectGalaxy';
import { EditorialSections } from '../components/EditorialSections';
import { SectionLabel } from '../components/SectionLabel';
import { NowSection } from '../components/NowSection';
import { ScrollStory } from '../components/ScrollStory';
import { ShelfSection } from '../components/ShelfSection';
import { BuildLog } from '../components/BuildLog';
import { LiveDemoSection } from '../components/LiveDemoSection';
import { SkillConstellation } from '../components/SkillConstellation';
import { SystemDashboard } from '../components/SystemDashboard';

const InteractiveName = () => {
  const alins = "ALINS".split("");
  const binu = "BINU".split("");
  const [hoveredIndex, setHoveredIndex] = useState<{ word: 'alins' | 'binu', index: number } | null>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 500, damping: 28 });
  const springY = useSpring(mouseY, { stiffness: 500, damping: 28 });

  const alinsRef = useRef<HTMLDivElement>(null);
  const binuRef = useRef<HTMLDivElement>(null);

  const rects = useRef<{ alins?: DOMRect, binu?: DOMRect }>({});

  useEffect(() => {
    const updateRects = () => {
      rects.current = {
        alins: alinsRef.current?.getBoundingClientRect(),
        binu: binuRef.current?.getBoundingClientRect()
      };
    };
    updateRects();
    window.addEventListener('resize', updateRects);
    return () => window.removeEventListener('resize', updateRects);
  }, []);

  const handleMouseMove = (e: MouseEvent) => {
    if (Math.abs(mouseX.get() - e.clientX) < 5 && Math.abs(mouseY.get() - e.clientY) < 5) return;

    mouseX.set(e.clientX);
    mouseY.set(e.clientY);

    const alinsRect = rects.current.alins;
    const binuRect = rects.current.binu;

    if (alinsRect && alinsRef.current) {
      const centerX = alinsRect.left + alinsRect.width / 2;
      const centerY = alinsRect.top + alinsRect.height / 2;
      const dist = Math.hypot(e.clientX - centerX, e.clientY - centerY);
      if (dist < 150) {
        alinsRef.current.style.transform = `translate(${(e.clientX - centerX) * 0.05}px, ${(e.clientY - centerY) * 0.05}px)`;
      } else {
        alinsRef.current.style.transform = `translate(0, 0)`;
      }
    }

    if (binuRect && binuRef.current) {
      const centerX = binuRect.left + binuRect.width / 2;
      const centerY = binuRect.top + binuRect.height / 2;
      const dist = Math.hypot(e.clientX - centerX, e.clientY - centerY);
      if (dist < 150) {
        binuRef.current.style.transform = `translate(${(e.clientX - centerX) * 0.05}px, ${(e.clientY - centerY) * 0.05}px)`;
      } else {
        binuRef.current.style.transform = `translate(0, 0)`;
      }
    }
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const renderLetters = (letters: string[], word: 'alins' | 'binu') => {
    return letters.map((char, i) => {
      const isHovered = hoveredIndex?.word === word && hoveredIndex?.index === i;
      const isNeighbor = hoveredIndex?.word === word && Math.abs(hoveredIndex?.index - i) === 1;

      return (
        <span
          key={i}
          className="relative inline-block"
          onMouseEnter={() => setHoveredIndex({ word, index: i })}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <motion.span
            initial={{
              y: word === 'alins' ? -80 : 80,
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
              scale: isHovered ? 1.2 : isNeighbor ? 1.1 : 1,
              color: isHovered ? 'var(--accent-primary)' : 'var(--text-primary)',
            }}
            transition={{
              y: { duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] },
              opacity: { duration: 0.8, delay: i * 0.1 },
              scale: { type: 'spring', stiffness: 300, damping: 15 },
              color: { duration: 0.2 }
            }}
            style={{
              WebkitTextStrokeColor: word === 'binu' ? '#a855f7' : undefined,
              textShadow: isHovered ? '0 0 40px rgba(168, 85, 247, 0.5), 0 0 80px rgba(255,255,255,0.2)' : '0 0 20px rgba(168, 85, 247, 0.1)',
            }}
            className={`cursor-default select-none transition-all duration-300 ${isHovered ? 'watercolor-text' : ''}`}
          >
            {char}
          </motion.span>
        </span>
      )
    })
  }

  return (
    <div className="flex flex-col w-full overflow-visible select-none relative">
      <AnimatePresence>
        {hoveredIndex && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            className="fixed w-12 h-12 bg-indigo-500/20 rounded-full pointer-events-none z-[100] blur-sm"
            style={{ x: springX, y: springY, translateX: '-50%', translateY: '-50%' }}
          />
        )}
      </AnimatePresence>

      <div ref={alinsRef} className="transition-transform duration-300 ease-out will-change-transform">
        <h1 className="font-display font-black text-[clamp(60px,10vw,140px)] text-white/90 leading-[0.9] tracking-[-0.04em] uppercase">
          {renderLetters(alins, 'alins')}
        </h1>
      </div>
      <div ref={binuRef} className="transition-transform duration-300 ease-out will-change-transform">
        <h1 className="font-display font-black text-[clamp(60px,10vw,140px)] leading-[0.9] tracking-[-0.04em] uppercase">
          {renderLetters(binu, 'binu')}
        </h1>
      </div>
    </div>
  )
}

const SidebarProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <div className="fixed left-6 top-1/2 -translate-y-1/2 z-50 hidden xl:flex flex-col items-center gap-6">
      <div className="h-40 w-[1px] bg-[var(--glass-border)] relative overflow-hidden">
        <motion.div
          className="absolute top-0 left-0 right-0 bg-[var(--accent-primary)] shadow-[0_0_15px_var(--glow-cyan)] origin-top"
          style={{ height: '100%', scaleY }}
        />
      </div>
      <div className="flex flex-col gap-4">
        {['01', '02', '03', '04', '05'].map((num) => (
          <div key={num} className="text-[8px] font-mono font-bold text-[var(--text-secondary)]/30 tracking-tighter">
            {num}
          </div>
        ))}
      </div>
    </div>
  );
};

const InteractiveRole = () => {
  const flutter = "FLUTTER".split("");
  const developer = "DEVELOPER".split("");

  return (
    <div className="flex flex-col items-end text-right group relative z-30">
      <div className="flex items-center gap-4 md:gap-8">
        <motion.div
          initial={{ height: 0 }}
          whileInView={{ height: "auto" }}
          transition={{ duration: 1.5, delay: 1.5 }}
          className="w-[3px] h-16 md:h-24 bg-[var(--accent-secondary)] transition-all duration-700 group-hover:h-32 group-hover:bg-[var(--accent-primary)]"
        />
        <div className="flex flex-col">
          <div className="flex justify-end overflow-hidden">
            <div className="flex">
              {flutter.map((char, i) => (
                <motion.span
                  key={i}
                  initial={{ y: "110%", opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{
                    duration: 0.8,
                    delay: 1.2 + (i * 0.05),
                    ease: [0.16, 1, 0.3, 1]
                  }}
                  whileHover={{ y: -8, color: "var(--accent-secondary)", scale: 1.1 }}
                  className="inline-block font-accent font-extrabold text-[clamp(32px,5vw,72px)] text-[var(--text-primary)] leading-[0.9] tracking-[-0.03em] cursor-default select-none hover:drop-shadow-[0_0_12px_var(--glow-purple)]"
                >
                  {char}
                </motion.span>
              ))}
            </div>
          </div>
          <div className="flex justify-end overflow-hidden">
            <div className="flex">
              {developer.map((char, i) => (
                <motion.span
                  key={i}
                  initial={{ y: "110%", opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{
                    duration: 0.8,
                    delay: 1.4 + (i * 0.05),
                    ease: [0.16, 1, 0.3, 1]
                  }}
                  whileHover={{ y: -8, scale: 1.1, color: "var(--accent-primary)" }}
                  className="inline-block font-display font-bold text-hollow-thin text-[clamp(18px,3vw,44px)] leading-[1] tracking-[-0.02em] cursor-default select-none"
                  style={{
                    transition: 'color 0.2s, -webkit-text-stroke-color 0.2s'
                  }}
                >
                  {char}
                </motion.span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export const Home = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const { scrollY } = useScroll();

  const textY = useTransform(scrollY, [0, 800], [0, 250]);
  const nameY = useTransform(scrollY, [0, 800], [0, -150]);
  const heroScale = useTransform(scrollY, [0, 600], [1, 0.95]);
  const heroBlur = useTransform(scrollY, [0, 400], [0, 2]);
  const bgParallax = useTransform(scrollY, [0, 800], [0, 50]);

  const [clickCount, setClickCount] = useState(0);
  const [gameActive, setGameActive] = useState(false);

  useEffect(() => {
    if (clickCount >= 3) {
      setGameActive(true);
      setClickCount(0);
    }
  }, [clickCount]);

  const sphereScale = useTransform(scrollY, [0, 300], [1, 0.2]);
  const sphereOpacity = useTransform(scrollY, [0, 250, 400], [1, 1, 0]);
  const sphereY = useTransform(scrollY, [0, 500], [0, 300]);

  return (
    <div className="relative min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] overflow-x-hidden transition-colors duration-500" ref={containerRef}>
      <SidebarProgress />
      <SystemDashboard />
      <div className="noise-overlay" />
      <div className="vignette-overlay" />

      <div className="edge-glow-left" />
      <div className="edge-glow-right" />

      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-[var(--bg-primary)]">
        <div className="absolute inset-0 opacity-[0.08] z-1 bg-grid-dot" />
        
        <div className="absolute inset-0 z-[2] overflow-hidden pointer-events-none">
          <div className="absolute inset-0 z-0">
          <div className="holi-splash w-[800px] h-[800px] bg-[var(--accent-primary)] top-[-10%] right-[-10%] opacity-15" />
          <div className="holi-splash w-[600px] h-[600px] bg-[var(--accent-secondary)] bottom-[-5%] left-[-5%] opacity-15" />
          <div className="holi-splash w-[500px] h-[500px] bg-[var(--accent-tertiary)] top-[20%] left-[10%] opacity-10" />
        </div>

          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "100%" }}
            transition={{ duration: 2, ease: "circOut" }}
            className="absolute left-[5%] top-0 w-[1px] bg-gradient-to-b from-transparent via-[var(--accent-primary)] to-transparent opacity-40 shadow-[0_0_10px_var(--accent-primary)]"
          >
            <div className="absolute top-[20%] -left-1 text-[8px] font-mono tracking-[0.4em] text-[var(--accent-primary)] text-vertical font-black">COORD_X: 47.129</div>
            <div className="absolute top-[40%] -left-1 text-[8px] font-mono tracking-[0.4em] text-[var(--accent-primary)] text-vertical font-black">LAT: 9.9482° N</div>
          </motion.div>

          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "100%" }}
            transition={{ duration: 2, ease: "circOut", delay: 0.5 }}
            className="absolute right-[5%] top-0 w-[1px] bg-gradient-to-b from-transparent via-[var(--accent-secondary)] to-transparent opacity-40 shadow-[0_0_10px_var(--accent-secondary)]"
          >
            <div className="absolute bottom-[20%] -right-1 text-[8px] font-mono tracking-[0.4em] text-[var(--accent-secondary)] text-vertical font-black text-right">SYSTEM_STATUS: NOMINAL</div>
            <div className="absolute bottom-[40%] -right-1 text-[8px] font-mono tracking-[0.4em] text-[var(--accent-secondary)] text-vertical font-black text-right">LONG: 76.9744° E</div>
          </motion.div>

          <div className="absolute top-10 left-10 text-[9px] font-mono text-[var(--text-secondary)] uppercase tracking-[0.4em] leading-relaxed font-black opacity-60">
            CORE_V: 1.0.4<br />
            BUILD: PRODUCTION
          </div>

          <div className="absolute top-10 right-10 text-[9px] font-mono text-[var(--text-secondary)] uppercase tracking-[0.4em] text-right leading-relaxed font-black opacity-60">
            INDEX_REF: 099-H<br />
            AUTH: DEV_ALINS
          </div>

          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.2, 0.5, 0.2], y: [0, -150, 0] }}
              transition={{ duration: 10 + i * 2, repeat: Infinity, ease: "linear" }}
              className="absolute w-1.5 h-1.5 rounded-full bg-[var(--accent-primary)] blur-[1px] shadow-[0_0_8px_var(--accent-primary)]"
              style={{
                left: `${10 + i * 12}%`,
                top: `${30 + (i * 10)}%`
              }}
            />
          ))}
        </div>
      </div>

      <div className="absolute bottom-12 left-8 md:left-20 right-8 md:right-20 flex items-center justify-between z-30 pointer-events-none">
        <div className="flex items-center gap-8 text-[10px] font-mono tracking-[0.5em] text-[var(--text-primary)] uppercase font-black opacity-60">
          <span>SCROLL TO DIVE</span>
          <motion.div
            animate={{ y: [0, 10, 0], opacity: [0.2, 1, 0.2] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-[2px] h-12 bg-[var(--accent-primary)] shadow-[0_0_10px_var(--accent-primary)]"
          />
        </div>
      </div>

      <section id="hero-section" className="relative h-[120vh] w-full">
        <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
          <motion.div
            style={{
              scale: sphereScale,
              opacity: sphereOpacity,
              y: sphereY
            }}
            className="absolute inset-0 z-0 pointer-events-none"
          >
            <SkillSphere />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 z-30"
          >
            <span className="text-[10px] font-mono font-black tracking-[0.5em] uppercase text-[var(--text-primary)] animate-pulse shadow-[0_0_10px_var(--text-primary)]">Scroll to Explore</span>
            <motion.div
              animate={{ y: [0, 15, 0], height: [40, 60, 40] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-[2px] h-12 bg-gradient-to-b from-[var(--accent-primary)] to-transparent shadow-[0_0_10px_var(--accent-primary)]"
            />
          </motion.div>

          <div className="absolute top-0 left-0 right-0 h-16 border-b border-[var(--glass-border)] flex items-center justify-between px-10 z-40 bg-[var(--bg-primary)]/80 backdrop-blur-3xl">
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--accent-primary)]/0 via-[var(--accent-primary)]/5 to-[var(--accent-primary)]/0 opacity-30" />
            <div className="flex gap-10 text-[9px] font-mono tracking-[0.4em] text-[var(--text-primary)] relative z-10 font-black">
              <span className="flex items-center gap-3">
                <motion.span
                  animate={{ opacity: [1, 0.2, 1], scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_12px_#10b981]"
                />
                LIVE_STREAM_ACTIVE
              </span>
              <span>BITRATE: 8.4 GB/S</span>
            </div>
            <div className="flex gap-10 text-[9px] font-mono tracking-[0.4em] text-[var(--text-primary)] relative z-10 font-black">
              <span className="hidden md:inline opacity-40 uppercase">EST_2024</span>
              <span className="hidden lg:inline opacity-20 uppercase tracking-tighter">Kerala // 09°28' N // 76°31' E</span>
              <span className="text-[var(--accent-primary)] font-black watercolor-text">{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</span>
            </div>
          </div>
          
          <div className="absolute inset-0 z-20 flex flex-col justify-center px-[4%]">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute top-[20%] left-[4%] z-40"
            >
              <div className="flex items-center gap-3 px-6 py-2.5 bg-[var(--bg-primary)] border border-[var(--accent-primary)]/30 backdrop-blur-3xl rounded-full shadow-2xl watercolor-border">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_#10b981]" />
                <span className="text-[10px] font-mono font-black tracking-[0.4em] text-[var(--text-primary)] uppercase">Available for Hire</span>
              </div>
            </motion.div>

            <div className="relative w-full max-w-7xl flex flex-col justify-center h-full pt-16">
              <div className="flex flex-col items-start gap-0">
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="font-mono text-[10px] font-black tracking-[0.8em] text-[var(--accent-primary)] leading-none mb-8 block uppercase watercolor-text"
                >
                  ENGINEERED BY ALINS // 2024
                </motion.span>

                <motion.div
                  className="name-layer relative"
                  style={{ y: nameY, scale: heroScale }}
                  onClick={() => setClickCount(c => c + 1)}
                >
                  <InteractiveName />
                  <div className="absolute -top-12 -right-12 text-[8px] font-mono text-[var(--accent-primary)]/40 font-black tracking-widest">001_INDEX_HERO</div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1, duration: 1 }}
                  className="mt-6 flex flex-col gap-3"
                >
                  <Magnetic strength={10}>
                    <span className="font-display font-black text-[clamp(28px,5vw,80px)] text-[var(--text-primary)] leading-none tracking-tighter uppercase watercolor-text cursor-default">
                      Flutter Architect
                    </span>
                  </Magnetic>
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: 120 }}
                    transition={{ delay: 1.5, duration: 1 }}
                    className="h-1.5 bg-[var(--accent-primary)] shadow-[0_0_20px_var(--accent-primary)] rounded-full" 
                  />
                </motion.div>

                <div className="w-full border-y border-[var(--glass-border)] py-4 mt-12 overflow-hidden relative bg-[var(--accent-primary)]/5 backdrop-blur-sm">
                  <motion.div
                    animate={{ x: [0, -600] }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    className="flex gap-20 whitespace-nowrap"
                  >
                    {[1, 2, 3, 4].map(i => (
                      <span key={i} className="font-mono text-[12px] font-black tracking-[0.5em] uppercase text-[var(--text-primary)] flex gap-20 opacity-80">
                        <span>FLUTTER DEVELOPER <span className="text-[var(--accent-primary)]">//</span> MOBILE ARCHITECT <span className="text-[var(--accent-secondary)]">//</span> UI ENGINEER</span>
                      </span>
                    ))}
                  </motion.div>
                </div>
                <div className="mt-8 text-lg font-light font-sans text-[var(--text-secondary)] leading-[2] max-w-[400px] min-h-[60px]">
                  <Typewriter
                    text="Architecting fluid, high-performance mobile ecosystems that redefine the intersection of engineering and luxury design."
                    speed={20}
                    delay={2500}
                  />
                </div>

              </div>

              <div className="absolute right-[4%] bottom-[15%] md:bottom-[18%]">
                <InteractiveRole />
              </div>
            </div>
          </div>

          <ScrollPhoto />

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 2, delay: 1.5 }}
            className="absolute bottom-[20%] left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[var(--accent-primary)] to-transparent z-10 shadow-[0_0_15px_var(--accent-primary)]"
          />
          <div className="absolute bottom-6 right-8 text-[var(--accent-primary)]/30 font-mono text-[10px] font-black tracking-[0.4em] pointer-events-none uppercase">
            // INIT_SURPRISE_SEQUENCE_3X
          </div>
        </div>
      </section>

      <FlutterGame active={gameActive} onClose={() => setGameActive(false)} />

      <ProjectGalaxy />

      <div className="relative z-20">
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="bg-transparent px-8 md:px-20 py-48 border-t border-[var(--glass-border)] overflow-hidden relative"
        >
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[var(--accent-primary)]/10 blur-[150px] pointer-events-none rounded-full animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[var(--accent-secondary)]/10 blur-[150px] pointer-events-none rounded-full animate-pulse delay-700" />
          <SectionLabel number="01" label="IDENTITY" />
          
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-24 relative z-10">
            <div className="lg:w-1/2 space-y-12">
              <motion.h2
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="text-6xl md:text-8xl font-display font-black tracking-tighter text-[var(--text-primary)] uppercase leading-[0.85]"
              >
                Building<br /><span className="watercolor-text">The Future.</span>
              </motion.h2>
 
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="mt-12 text-[var(--text-primary)] text-xl md:text-2xl leading-relaxed max-w-xl font-sans font-light opacity-80"
              >
                I am a <span className="text-[var(--accent-primary)] font-black italic">Creative Engineer</span> specialized in bridging the void between high-end aesthetics and industrial-grade mobile performance.
              </motion.p>
 
              <div className="mt-16 grid grid-cols-2 gap-12 border-t border-[var(--glass-border)] pt-12">
                <div>
                  <span className="text-[10px] font-mono font-black tracking-[0.5em] uppercase text-[var(--accent-primary)] block mb-4">Location</span>
                  <p className="text-[var(--text-primary)] font-display font-black text-2xl uppercase tracking-tighter">Kottayam, Kerala</p>
                </div>
                <div>
                  <span className="text-[10px] font-mono font-black tracking-[0.5em] uppercase text-[var(--accent-primary)] block mb-4">Focus</span>
                  <p className="text-[var(--text-primary)] font-display font-black text-2xl uppercase tracking-tighter">Mobile Systems</p>
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                <Link to="/about" className="inline-block">
                  <Magnetic strength={20}>
                    <button className="flex items-center gap-8 group">
                      <div className="w-16 h-16 rounded-full bg-[var(--text-primary)] text-[var(--bg-primary)] flex items-center justify-center group-hover:scale-110 transition-all shadow-[0_0_30px_rgba(0,0,0,0.2)]">
                        <ArrowRight size={24} />
                      </div>
                      <span className="text-[11px] font-mono font-black tracking-[0.4em] uppercase text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors">Discover Core</span>
                    </button>
                  </Magnetic>
                </Link>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="lg:w-1/2 relative group p-1 watercolor-border rounded-[40px]"
            >
              <div className="bg-[var(--bg-primary)] rounded-[39px] overflow-hidden">
                <InfoBook />
              </div>
              <div className="absolute -bottom-10 right-0 text-[10px] font-mono text-[var(--accent-primary)] font-black uppercase tracking-[0.4em] opacity-40 animate-pulse">
                    // AUTH_ENCRYPTED_ARCHIVE_01
              </div>
            </motion.div>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, rotateX: 8, y: 60, transformPerspective: 1200 }}
          whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformOrigin: 'top center' }}
          className="bg-transparent px-8 md:px-20 py-48 border-t border-[var(--glass-border)] relative overflow-hidden"
        >
          <SectionLabel number="02" label="ARCHIVE" side="right" />
          <div className="absolute bottom-1/4 -right-20 w-[600px] h-[600px] bg-[var(--accent-secondary)]/10 blur-[150px] pointer-events-none rounded-full" />

          <div className="max-w-7xl mx-auto space-y-24">
            <div className="flex flex-col md:flex-row justify-between items-end gap-12 border-b border-[var(--glass-border)] pb-16">
              <div className="space-y-8">
                <span className="text-[var(--accent-secondary)] font-mono text-[12px] tracking-[0.6em] uppercase font-black">// 02 SELECTED WORKS</span>

                <div className="absolute -right-20 top-0 hidden xl:block pointer-events-none">
                  <span className="text-[160px] font-black text-[var(--text-primary)]/5 uppercase select-none text-vertical tracking-[-0.1em] leading-none">
                    ENGINEERED
                  </span>
                </div>
                
                <Magnetic strength={20}>
                  <h2 className="text-7xl md:text-9xl font-display font-black text-[var(--text-primary)] tracking-tighter leading-[0.8] uppercase watercolor-text cursor-default">
                    PROJECTS
                  </h2>
                </Magnetic>
              </div>
              <div className="max-w-sm text-right">
                <p className="text-[var(--text-primary)] text-xl font-sans font-light leading-relaxed italic opacity-70">
                  A selection of mobile infrastructures and high-end digital systems architecture.
                </p>
              </div>
            </div>

            <div className="max-w-3xl relative space-y-4">
              <div className="absolute -left-20 top-0 h-full w-[2px] bg-[var(--accent-primary)]/10 hidden xl:block" />
              {[
                { id: "01", title: "Light Suvara", tag: "FLUTTER · CHURCH HUB", year: "2024", live: false },
                { id: "02", title: "Prism Studio", tag: "WEB · AI ECOSYSTEM", year: "2024", live: true },
                { id: "03", title: "CarDash", tag: "FLUTTER · AUTOMOTIVE", year: "2023", live: false }
              ].map((proj) => (
                <Link to="/projects" key={proj.id} className="group flex items-center justify-between h-[100px] border-b border-[var(--glass-border)] px-4 hover:bg-[var(--accent-primary)]/10 transition-all rounded-xl watercolor-border border-transparent hover:border-[var(--accent-primary)]/20">
                  <div className="flex items-center gap-10">
                    <span className="font-mono text-[12px] font-black text-[var(--accent-primary)] w-8 opacity-40">{proj.id}</span>
                    <div className="flex flex-col">
                      <span className="font-display font-black text-[clamp(24px,3vw,40px)] text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-all uppercase tracking-tighter">{proj.title}</span>
                      <span className="font-mono text-[10px] text-[var(--accent-secondary)] uppercase tracking-[0.4em] font-black">{proj.tag}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-12">
                    <span className="hidden sm:inline font-mono text-[11px] tracking-[0.3em] text-[var(--text-primary)] uppercase font-black opacity-40">{proj.year}</span>
                    <div className="flex items-center gap-6">
                      {proj.live && <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_15px_#10b981]" />}
                      <ArrowRight size={24} className="text-[var(--text-primary)] opacity-20 group-hover:opacity-100 group-hover:translate-x-3 transition-all" />
                    </div>
                  </div>
                </Link>
              ))}

              <div className="mt-16 pt-8">
                <Link to="/projects">
                  <Magnetic strength={20}>
                    <button className="text-[var(--accent-primary)] font-mono font-black text-[12px] tracking-[0.5em] flex items-center gap-4 uppercase hover:scale-105 transition-all">
                      View Full Archive <ArrowRight size={18} />
                    </button>
                  </Magnetic>
                </Link>
              </div>
            </div>
          </div>
        </motion.section>

        <EditorialSections />

        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="bg-transparent px-8 md:px-20 py-48 border-t border-[var(--glass-border)] relative overflow-hidden"
        >
          <SectionLabel number="03" label="CAPABILITIES" />
          <div className="absolute -right-20 top-0 w-[800px] h-[800px] bg-[radial-gradient(circle,var(--accent-primary),transparent_70%)] opacity-[0.05] blur-[150px] rounded-full pointer-events-none" />

          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-24 md:gap-40">
            <div className="md:w-1/2 space-y-20">
              <div className="space-y-8">
                <span className="text-[var(--accent-primary)] font-mono text-[12px] tracking-[0.6em] uppercase font-black opacity-80">03 // CORE ENGINE</span>
                <h2 className="text-7xl md:text-9xl font-display font-black text-[var(--text-primary)] tracking-tighter uppercase leading-[0.8] watercolor-text">
                  IDEATION & CRAFT
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                {[
                  { title: "Mobile Systems", desc: "Building scalable architectures using Flutter and native patterns." },
                  { title: "System Design", desc: "Thinking in components to build maintainable and reusable codebases." }
                ].map((cap, i) => (
                  <motion.div
                    key={cap.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="group editorial-card space-y-6 shadow-2xl watercolor-border p-8 rounded-3xl"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--accent-primary)]/20 flex items-center justify-center group-hover:scale-110 group-hover:bg-[var(--accent-primary)] group-hover:text-white transition-all shadow-xl">
                      {i === 0 ? <Code size={24} /> : <Cpu size={24} />}
                    </div>
                    <h4 className="text-2xl font-display font-black uppercase tracking-tight text-[var(--text-primary)]">{cap.title}</h4>
                    <p className="text-[var(--text-primary)] text-lg font-sans font-light leading-relaxed opacity-60">{cap.desc}</p>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="border-l-[4px] border-[var(--accent-primary)] pl-10 py-4 bg-[var(--accent-primary)]/5 rounded-r-2xl shadow-inner"
              >
                <p className="text-3xl italic font-serif text-[var(--text-primary)] leading-relaxed max-w-xl opacity-90">
                  "The best apps aren't just functional – they're felt. Every animation is a conversation."
                </p>
              </motion.div>
            </div>

            <div className="md:w-1/2 relative h-[600px] md:h-[800px] w-full flex items-center justify-center">
              <div className="absolute inset-0 bg-[radial-gradient(circle,var(--accent-secondary),transparent_70%)] opacity-[0.08] blur-[150px]" />
                <div className="relative group cursor-pointer watercolor-border p-1 rounded-3xl overflow-hidden shadow-2xl">
                <div className="bg-[var(--bg-primary)] rounded-full h-full w-full">
                  <SkillSphere />
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="bg-transparent px-8 md:px-20 pt-20 pb-48 border-t border-[var(--glass-border)] relative"
        >
          <SectionLabel number="04" label="EXPERIMENT" side="right" />
          <div className="max-w-7xl mx-auto text-center space-y-32">
            <div className="space-y-10">
              <span className="text-[var(--accent-primary)] font-mono text-[12px] tracking-[0.8em] uppercase font-black opacity-80">INTERACTIVE // ARCHIVE_04</span>
              <Magnetic strength={20}>
                <h2 className="text-7xl md:text-9xl font-display font-black text-[var(--text-primary)] tracking-tighter uppercase watercolor-text">
                  PROJECT GRAVITY
                </h2>
              </Magnetic>
              <p className="text-[var(--text-primary)] text-2xl font-sans font-light max-w-2xl mx-auto opacity-70 italic">
                A physics-based project explorer. Interact with the gravity of my digital work.
              </p>
            </div>

            <div className="relative h-[700px] w-full bg-[var(--bg-primary)] border border-[var(--glass-border)] rounded-[48px] overflow-hidden cursor-crosshair group shadow-2xl watercolor-border p-1">
              <div className="absolute inset-0 z-0 opacity-[0.1]">
                <div className="w-full h-full bg-grid-dot" />
              </div>

              <div className="absolute top-10 left-10 z-10">
                <div className="bg-[var(--bg-primary)]/80 backdrop-blur-3xl border border-[var(--accent-primary)]/30 px-6 py-3 rounded-full flex items-center gap-6 shadow-2xl">
                  <div className="flex gap-2">
                    {[1, 2, 3].map(i => (
                      <motion.div
                        key={i}
                        animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
                        transition={{ repeat: Infinity, duration: 1.5, delay: i * 0.2 }}
                        className="w-2 h-2 rounded-full bg-[var(--accent-primary)] shadow-[0_0_10px_var(--accent-primary)]"
                      />
                    ))}
                  </div>
                  <span className="text-[10px] font-mono font-black tracking-[0.4em] text-[var(--text-primary)] uppercase">Physics Engine Active</span>
                </div>
              </div>

              {[
                { id: "01", name: "Church Hub", color: "bg-sky-500", pos: { x: "20%", y: "20%" } },
                { id: "02", name: "AI Ecosystem", color: "bg-violet-500", pos: { x: "75%", y: "25%" } },
                { id: "03", name: "Car Dashboard", color: "bg-emerald-500", pos: { x: "50%", y: "50%" } },
                { id: "04", name: "Architecture", color: "bg-orange-500", pos: { x: "85%", y: "60%" } },
                { id: "05", name: "UI Systems", color: "bg-rose-500", pos: { x: "15%", y: "70%" } }
              ].map((node, i) => (
                <motion.div
                  key={node.name}
                  drag
                  dragConstraints={containerRef}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 * i, type: "spring" }}
                  whileDrag={{ scale: 1.1, zIndex: 100, cursor: "grabbing" }}
                  onDragStart={() => setActiveNode(node.name)}
                  onDragEnd={() => setActiveNode(null)}
                  className={`project-node absolute w-32 h-32 md:w-40 md:h-40 rounded-full flex flex-col items-center justify-center p-6 text-center cursor-grab shadow-2xl border border-[var(--glass-border)] backdrop-blur-md ${node.color}/10 group/node transition-shadow hover:shadow-sky-500/20`}
                  style={{ left: node.pos.x, top: node.pos.y }}
                >
                  <div className={`w-3 h-3 rounded-full ${node.color} mb-3 group-hover/node:scale-150 transition-transform`} />
                  <span className="text-[11px] font-mono font-bold tracking-tight text-[var(--text-primary)] uppercase leading-tight">{node.name}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        <NowSection />

        <LiveDemoSection />

        <SkillConstellation />

        <ShelfSection />

        <BuildLog />

        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="bg-transparent px-8 md:px-20 py-40 border-t border-[var(--glass-border)] relative overflow-hidden"
        >
          <SectionLabel number="05" label="FOUNDATION" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20vw] font-display font-black text-[var(--text-primary)]/[0.03] select-none pointer-events-none uppercase">
            History
          </div>

          <div className="max-w-7xl mx-auto text-center space-y-24 relative z-10">
            <div className="space-y-6">
              <span className="text-[var(--accent-primary)] font-mono text-[11px] tracking-[0.3em] uppercase opacity-70">05 // FOUNDATION</span>
              <h2 className="text-7xl md:text-[12vw] font-display font-extrabold text-[var(--text-primary)] leading-none tracking-tighter uppercase relative">
                {["THE", "JOURNEY"].map((word, wordIdx) => (
                  <span key={wordIdx} className="inline-block mx-4">
                    {word.split("").map((char, charIdx) => (
                      <motion.span
                        key={charIdx}
                        initial={{ opacity: 0, y: 100 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: (wordIdx * word.length + charIdx) * 0.03, duration: 0.8 }}
                        whileHover={{ scale: 1.2, color: "var(--accent-primary)", y: -20 }}
                        className="inline-block"
                      >
                        {char}
                      </motion.span>
                    ))}
                  </span>
                ))}
              </h2>
              <p className="text-[var(--text-secondary)] text-xl font-sans font-light italic opacity-80">A chronicle of academic milestones and continuous growth.</p>
            </div>

            <Link to="/education" className="block max-w-4xl mx-auto group p-1 watercolor-border rounded-3xl">
              <div className="editorial-card p-16 md:p-24 group-hover:shadow-indigo-500/10 transition-all relative overflow-hidden text-left bg-[var(--bg-primary)]">
                <div className="relative z-10 space-y-12">
                  <div className="space-y-3">
                    <h3 className="text-4xl md:text-6xl font-display font-bold text-[var(--text-primary)] tracking-tight uppercase">B.Tech CS Engineering</h3>
                    <p className="text-[var(--accent-primary)] font-mono text-xl uppercase tracking-wider font-bold">Amal Jyothi College of Engineering</p>
                  </div>
                  <div className="flex flex-wrap gap-12 text-[var(--text-secondary)]">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-[var(--accent-primary)]" />
                      <span className="text-xs font-mono font-bold uppercase tracking-widest italic opacity-60">Senior Year</span>
                    </div>
                  </div>
                  <div className="pt-12">
                    <div className="inline-flex items-center gap-4 bg-[var(--text-primary)] text-[var(--bg-primary)] px-10 py-5 rounded-full font-mono font-bold text-[10px] tracking-widest uppercase transition-transform group-hover:scale-105">
                      See Full Archive <ArrowRight size={14} />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </motion.section>

        <section className="bg-[var(--bg-primary)] text-[var(--text-primary)] px-8 md:px-20 py-60 relative overflow-hidden border-t border-[var(--glass-border)]">
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[var(--accent-primary)]/50 to-transparent"></div>

          <div className="max-w-7xl mx-auto flex flex-col items-center text-center space-y-16 relative z-10">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 0.5 }}
              className="text-[var(--accent-primary)] font-mono text-[10px] tracking-[0.5em] uppercase"
            >
                // AVAILABLE FOR NEW ADVENTURES
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <h1 className="text-8xl md:text-[14vw] font-display font-black leading-[0.85] tracking-tighter uppercase relative z-10 mix-blend-difference text-white">
                ALIN S <br /> <span className="italic font-serif lowercase text-[var(--accent-primary)]">Binu.</span>
              </h1>
            </motion.h2>

            <Link to="/contact">
              <Magnetic strength={30}>
                <button className="w-48 h-48 md:w-64 md:h-64 rounded-full border border-[var(--glass-border)] flex flex-col items-center justify-center gap-6 group hover:bg-[var(--text-primary)] hover:border-[var(--text-primary)] transition-all duration-700">
                  <ArrowRight size={40} className="group-hover:rotate-[-45deg] group-hover:text-[var(--bg-primary)] transition-all duration-500" />
                  <span className="text-[10px] font-mono font-bold tracking-[0.4em] uppercase group-hover:text-[var(--bg-primary)]">Start Project</span>
                </button>
              </Magnetic>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};
