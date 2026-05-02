import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { ArrowRight, Globe, User, Cpu, Code, BookOpen, Zap, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Magnetic } from '../components/Magnetic';
import { SkillSphere } from '../components/SkillSphere';
import { ScrollPhoto } from '../components/ScrollPhoto';
import { FlutterGame } from '../components/FlutterGame';

const InteractiveName = () => {
  const alins = "ALINS".split("");
  const binu = "BINU".split("");
  const [hoveredIndex, setHoveredIndex] = useState<{word: 'alins' | 'binu', index: number} | null>(null);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 500, damping: 28 });
  const springY = useSpring(mouseY, { stiffness: 500, damping: 28 });

  const alinsRef = useRef<HTMLDivElement>(null);
  const binuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      
      [alinsRef, binuRef].forEach((ref) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const distance = Math.hypot(e.clientX - centerX, e.clientY - centerY);
        
        if (distance < 150) {
          const x = (e.clientX - centerX) * 0.08;
          const y = (e.clientY - centerY) * 0.08;
          const clampedX = Math.max(-8, Math.min(8, x));
          const clampedY = Math.max(-8, Math.min(8, y));
          ref.current.style.transform = `translate(${clampedX}px, ${clampedY}px)`;
        } else {
          ref.current.style.transform = `translate(0, 0)`;
        }
      });
    };

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
              filter: 'blur(8px)' 
            }}
            animate={{ 
              y: isHovered ? -12 : isNeighbor ? -5 : 0, 
              opacity: 1, 
              filter: 'blur(0px)',
              scale: isHovered ? 1.08 : isNeighbor ? 1.03 : 1,
              color: word === 'alins' && isHovered ? '#0369a1' : undefined
            }}
            whileTap={{ scale: 0.85 }}
            transition={{
              y: { duration: isHovered || isNeighbor ? 0.2 : 0.7, ease: [0.16, 1, 0.3, 1], delay: isHovered || isNeighbor ? 0 : (word === 'alins' ? i * 0.06 : 0.3 + i * 0.06) },
              opacity: { duration: 0.7, delay: (word === 'alins' ? i * 0.06 : 0.3 + i * 0.06) },
              filter: { duration: 0.7, delay: (word === 'alins' ? i * 0.06 : 0.3 + i * 0.06) },
              scale: { type: "spring", stiffness: 400, damping: 10 }
            }}
            className={`inline-block cursor-none px-[0.01em] ${word === 'binu' ? 'text-hollow-heavy' : ''}`}
            style={{ 
              WebkitTextStrokeColor: word === 'binu' && isHovered ? '#0369a1' : undefined,
              textShadow: word === 'binu' && isHovered ? '0 0 30px rgba(251,191,36,0.3)' : undefined,
              transition: 'color 0.2s, -webkit-text-stroke-color 0.2s, text-shadow 0.2s' 
            }}
          >
            {char}
          </motion.span>
        </span>
      )
    })
  }

  return (
    <div className="flex flex-col w-full overflow-visible select-none relative">
      {/* Custom Cursor Dot */}
      <AnimatePresence>
        {hoveredIndex && (
          <motion.div 
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            className="fixed w-12 h-12 bg-sky-500/20 rounded-full pointer-events-none z-[100] blur-sm"
            style={{ x: springX, y: springY, translateX: '-50%', translateY: '-50%' }}
          />
        )}
      </AnimatePresence>
      
      <div ref={alinsRef} className="transition-transform duration-300 ease-out will-change-transform">
        <h1 className="font-accent font-extrabold text-[clamp(80px,13vw,180px)] text-[#0a0a0a] leading-[0.85] tracking-[-0.04em]">
          {renderLetters(alins, 'alins')}
        </h1>
      </div>
      <div ref={binuRef} className="transition-transform duration-300 ease-out will-change-transform">
        <h1 className="font-accent font-extrabold text-[clamp(80px,13vw,180px)] leading-[0.85] tracking-[-0.04em]">
          {renderLetters(binu, 'binu')}
        </h1>
      </div>
    </div>
  )
}

const InteractiveRole = () => {
  const flutter = "FLUTTER".split("");
  const developer = "DEVELOPER".split("");
  
  return (
    <div className="flex flex-col items-end text-right group relative z-30">
      <div className="flex items-center gap-4 md:gap-8">
        {/* Sky Blue Accent Line */}
        <motion.div 
          initial={{ height: 0 }}
          whileInView={{ height: "auto" }}
          transition={{ duration: 1.5, delay: 1.5 }}
          className="w-[3px] h-16 md:h-24 bg-sky-600 transition-all duration-700 group-hover:h-32 group-hover:bg-orange-600"
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
                  whileHover={{ y: -8, color: "#0369a1", scale: 1.1 }}
                  className="inline-block font-accent font-extrabold text-[clamp(32px,5vw,72px)] text-[#0a0a0a] leading-[0.9] tracking-[-0.03em] cursor-default select-none hover:drop-shadow-[0_0_12px_rgba(56,189,248,0.4)]"
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
                  whileHover={{ y: -8, scale: 1.1, color: "#0369a1" }}
                  className="inline-block font-accent font-extrabold text-hollow-thin text-[clamp(22px,3.8vw,56px)] leading-[0.9] tracking-[-0.02em] cursor-default select-none hover:drop-shadow-[0_0_12px_rgba(56,189,248,0.4)]"
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
  const heroScale = useTransform(scrollY, [0, 600], [1, 0.92]);
  const heroBlur = useTransform(scrollY, [0, 400], [0, 4]);
  const nameZ = useTransform(scrollY, [0, 600], [0, -80]);
  const bgParallax = useTransform(scrollY, [0, 800], [0, 120]);

  const [clickCount, setClickCount] = useState(0);
  const [gameActive, setGameActive] = useState(false);

  useEffect(() => {
    if (clickCount >= 3) {
      setGameActive(true);
      setClickCount(0);
    }
  }, [clickCount]);

  // Scroll animations for the 3D Sphere
  const sphereScale = useTransform(scrollY, [0, 300], [1, 0.2]);
  const sphereOpacity = useTransform(scrollY, [0, 250, 400], [1, 1, 0]);
  const sphereY = useTransform(scrollY, [0, 500], [0, 300]);

  return (
    <div className="relative min-h-screen bg-transparent text-[#0a0a0a]" ref={containerRef}>
      {/* Background Depth */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Grain Effect Overlay removed for performance */}
        
        {/* Scanline Effect */}
        <div className="scanline-effect" />

        {/* Hero Edge Glow / Vignette */}
        <div className="absolute inset-0 z-[6] pointer-events-none shadow-[inset_0_0_100px_rgba(3,105,161,0.05),_inset_0_0_200px_rgba(255,255,255,1)]" />

        {/* Subtle Grid Pattern Overlay */}
        <div 
          className="absolute inset-0 opacity-[0.08] z-1" 
          style={{ 
            backgroundImage: `linear-gradient(#0a0a0a 1px, transparent 1px), linear-gradient(90deg, #0a0a0a 1px, transparent 1px)`,
            backgroundSize: '30px 30px'
          }}
        />
        {/* Madison warm radial gradient - sky blue depth */}
        <motion.div 
          className="absolute inset-0 hero-gradient"
          style={{ y: bgParallax }}
        />
        
        {/* Ghost Script Text */}
        <div className="absolute inset-0 flex items-center justify-center z-[1] pointer-events-none select-none overflow-hidden">
           <motion.span
             initial={{ opacity: 0, scale: 0.8 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ duration: 2 }}
             className="font-script italic text-[clamp(80px,14vw,170px)] text-black/[0.05] whitespace-nowrap"
           >
              Hey, I'm
           </motion.span>
        </div>
        
        {/* Pervasive Vibrant Glows */}
        <motion.div animate={{ opacity:[0.6,1,0.6], scale:[1,1.4,1], rotate:[0,90,0] }}
          transition={{ duration:18, repeat:Infinity }}
          className="absolute -top-40 right-[-10%] w-[90vw] h-[90vw] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(56,189,248,0.25) 0%, transparent 65%)', filter: 'blur(80px)' }}
        />
        <motion.div animate={{ opacity:[0.5,0.8,0.5], scale:[1,1.5,1] }}
          transition={{ duration:22, repeat:Infinity, delay:3 }}
          className="absolute bottom-[-20%] left-[-10%] w-[70vw] h-[70vw] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(251,191,36,0.18) 0%, transparent 65%)', filter: 'blur(100px)' }}
        />
        <motion.div animate={{ opacity:[0.4,0.7,0.4], x:[0,30,0], y:[0,-20,0] }}
          transition={{ duration:14, repeat:Infinity, delay:1 }}
          className="absolute top-[40%] right-[5%] w-[50vw] h-[50vw] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(249,115,22,0.12) 0%, transparent 65%)', filter: 'blur(90px)' }}
        />

        {/* Abstract Floating Icons */}
        <div className="absolute inset-0 z-0">
           {[Code, Cpu, Globe].map((Icon, i) => (
             <motion.div
               key={i}
               initial={{ opacity: 0 }}
               animate={{ 
                 opacity: [0, 0.1, 0],
                 y: [100 * i, 100 * i - 20, 100 * i],
                 rotate: [0, 10, 0]
               }}
               transition={{ duration: 5, delay: i * 2, repeat: Infinity }}
               className="absolute text-[#0369a1] pointer-events-none"
               style={{ 
                 left: `${20 + i * 25}%`,
                 top: `${15 + i * 20}%`
               }}
             >
                <Icon size={40} />
             </motion.div>
           ))}
        </div>
      </div>

      {/* Hero Footnotes */}
      <div className="absolute bottom-12 left-8 md:left-20 right-8 md:right-20 flex items-center justify-between z-30 pointer-events-none opacity-40">
        <div className="flex items-center gap-8 text-[10px] font-mono tracking-[0.3em] text-[#0a0a0a] uppercase">
          <span>SCROLL TO DIVE</span>
          <motion.div 
            animate={{ y: [0, 10, 0] }} 
            transition={{ duration: 2, repeat: Infinity }}
            className="w-[1px] h-12 bg-[#0a0a0a]/20" 
          />
        </div>
      </div>

      <section id="hero-section" className="relative h-[150vh] w-full">
        <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        {/* Scroll-reactive Background Skill Sphere */}
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

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 z-30"
        >
           <span className="text-[10px] font-mono font-bold tracking-[0.4em] uppercase text-black/30">Scroll to Explore</span>
           <motion.div 
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-[1px] h-12 bg-gradient-to-b from-sky-700 to-transparent"
           />
        </motion.div>

        {/* Kinetic Hero Headline */}
        <div className="absolute inset-0 z-20 flex flex-col justify-center px-[4%]">
           {/* Available Pill */}
           <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             className="absolute top-[18%] left-[4%] z-40"
           >
              <div className="flex items-center gap-2 px-4 py-2 bg-white border border-black/10 rounded-full shadow-[0_2px_10px_rgba(0,0,0,0.06)]">
                 <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                 <span className="text-[12px] font-sans text-gray-700">Available for Opportunities</span>
              </div>
           </motion.div>

           <div className="relative w-full max-w-7xl flex flex-col justify-center h-full pt-12">
              {/* Name Block - Visual Pyramid */}
              <div className="flex flex-col items-start gap-0">
                 <motion.span 
                   initial={{ opacity: 0, y: 20 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ duration: 0.8 }}
                   className="font-script italic text-[clamp(28px,4vw,52px)] text-black/18 leading-none mb-2 tracking-[0.01em]"
                 >
                    I AM
                 </motion.span>
                 
                 <motion.div 
                   className="name-layer"
                   style={{ y: nameY, scale: heroScale, filter: heroBlur.get() > 0 ? `blur(${heroBlur.get()}px)` : undefined, z: nameZ }}
                   onClick={() => setClickCount(c => c + 1)}
                 >
                   <InteractiveName />
                 </motion.div>
                 
                 <motion.div
                   initial={{ opacity: 0, x: -20 }}
                   animate={{ opacity: 1, x: 0 }}
                   transition={{ delay: 0.8, duration: 1 }}
                   className="mt-4 flex flex-col gap-2"
                 >
                    <span className="font-accent font-extrabold text-[clamp(24px,4vw,64px)] text-[#0a0a0a] leading-none tracking-tighter uppercase">
                       Flutter Developer
                    </span>
                    <div className="w-20 h-1 bg-sky-600" />
                 </motion.div>

                 {/* Option B: Ticker Strip */}
                 <div className="w-full border-y border-black/5 py-3 mt-10 overflow-hidden relative">
                    <motion.div 
                      animate={{ x: [0, -500] }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      className="flex gap-16 whitespace-nowrap"
                    >
                       {[1, 2, 3].map(i => (
                         <span key={i} className="font-dm-mono text-[11px] tracking-[0.2em] uppercase text-black/35 flex gap-16">
                           <span>FLUTTER DEVELOPER · MOBILE ARCHITECT</span>
                         </span>
                       ))}
                    </motion.div>
                 </div>

                 {/* Description Text */}
                 <motion.p 
                   initial={{ opacity: 0 }}
                   animate={{ opacity: 1 }}
                   transition={{ delay: 1, duration: 1 }}
                   className="mt-6 text-sm font-light font-sans text-[#64748b] leading-[1.8] max-w-[340px]"
                 >
                    Flutter developer specializing in building scalable, high-performance mobile applications that solve real-world problems.
                 </motion.p>
              </div>

              {/* Role Descriptor - Interactive */}
              <div className="absolute right-[4%] bottom-[12%] md:bottom-[15%]">
                <InteractiveRole />
              </div>
           </div>
        </div>

        {/* User Photo with Pinned 3D Parallax */}
        <ScrollPhoto />

        {/* Global Horizon Line */}
        <motion.div 
           initial={{ scaleX: 0 }}
           animate={{ scaleX: 1 }}
           transition={{ duration: 2, delay: 1 }}
           className="absolute bottom-[20%] left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-black/5 to-transparent z-10"
        />
        <div className="absolute bottom-4 right-4 text-black/[0.15] font-mono text-[9px] pointer-events-none">
          // click the name 3× for a surprise
        </div>
        </div>
      </section>

      <FlutterGame active={gameActive} onClose={() => setGameActive(false)} />

      {/* Content Sections */}
      <div className="relative z-20">
        {/* 01 // IDENTITY */}
        <motion.section 
          initial={{ opacity: 0, rotateX: 8, y: 60, transformPerspective: 1200 }}
          whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformOrigin: 'top center' }}
          className="bg-transparent px-8 md:px-20 py-40 border-t border-black/[0.06] overflow-hidden relative"
        >
          <div className="absolute top-1/4 -left-20 w-80 h-80 bg-sky-100/30 blur-[100px] pointer-events-none rounded-full" />
          
          {/* Tech Ticker */}
          <div className="flex w-full overflow-hidden mb-24 opacity-[0.15] whitespace-nowrap select-none italic font-serif text-[clamp(40px,8vw,120px)] tracking-tighter leading-none grayscale">
             <motion.div 
               animate={{ x: [0, -1000] }}
               transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
               className="flex gap-20 pr-20"
             >
                <span>Flutter Dart Firebase Python Javascript HTML CSS Java C</span>
                <span>Flutter Dart Firebase Python Javascript HTML CSS Java C</span>
                <span>Flutter Dart Firebase Python Javascript HTML CSS Java C</span>
             </motion.div>
          </div>

          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-20 relative">
             <motion.div 
               initial="hidden"
               whileInView="visible"
               viewport={{ once: true, margin: "-100px" }}
               variants={{
                  hidden: { opacity: 0 },
                  visible: {
                     opacity: 1,
                     transition: {
                        staggerChildren: 0.15
                     }
                  }
               }}
               className="md:w-1/2 space-y-10"
             >
                <motion.span 
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    visible: { opacity: 1, x: 0 }
                  }}
                  className="text-sky-700 font-mono text-[11px] tracking-[0.3em] uppercase opacity-70"
                >
                  01 // IDENTITY
                </motion.span>
                <motion.h2 
                   variants={{
                     hidden: { opacity: 0, y: 30 },
                     visible: { opacity: 1, y: 0 }
                   }}
                   className="text-6xl md:text-8xl font-display font-black text-[#0a0a0a] tracking-tighter uppercase flex flex-wrap gap-x-4"
                >
                  {"About Me".split(" ").map((word, i) => (
                    <span key={i} className="inline-block overflow-hidden py-2">
                      <motion.span
                        whileHover={{ y: -5, color: "#0369a1" }}
                        className="inline-block"
                      >
                        {word}
                      </motion.span>
                    </span>
                  ))}
                </motion.h2>
                <motion.p 
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 }
                  }}
                  className="text-[#64748b] text-lg leading-[1.8] max-w-xl font-sans font-light"
                >
                  I started drawn to clean interfaces and layout systems. That pulled me deeper into app development and product building — and now I work on projects where I can shape both the <span className="text-[#0a0a0a] font-medium italic underline decoration-sky-700/30 underline-offset-4 font-serif">interface and the implementation</span>, end to end.
                </motion.p>
                <motion.div
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    visible: { opacity: 1, x: 0 }
                  }}
                >
                  <Link to="/about">
                     <motion.button 
                       whileHover={{ x: 15 }}
                       className="flex items-center gap-6 group"
                     >
                        <div className="w-14 h-14 rounded-full bg-[#0a0a0a] text-white flex items-center justify-center group-hover:bg-sky-700 transition-colors shadow-lg">
                           <ArrowRight size={20} />
                        </div>
                        <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-[#0a0a0a]">Discover More</span>
                     </motion.button>
                  </Link>
                </motion.div>
             </motion.div>
             <motion.div 
               initial={{ opacity: 0, scale: 0.9 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
               className="md:w-1/2 relative"
             >
                <div className="aspect-[4/3] rounded-[24px] overflow-hidden bg-[#f8fafc] border border-black/[0.05] shadow-2xl p-2 relative group">
                   <img src="https://images.unsplash.com/photo-1550439062-609e1531270e?q=80&w=1200" className="w-full h-full object-cover rounded-[18px] grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000" alt="About" />
                </div>
             </motion.div>
          </div>
        </motion.section>

        {/* 02 // ARCHIVE */}
        <motion.section 
          initial={{ opacity: 0, rotateX: 8, y: 60, transformPerspective: 1200 }}
          whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformOrigin: 'top center' }}
          className="bg-transparent px-8 md:px-20 py-40 border-t border-black/[0.06] relative overflow-hidden"
        >
          <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-orange-100/20 blur-[100px] pointer-events-none rounded-full" />
          
          <div className="max-w-7xl mx-auto space-y-20">
             <div className="flex flex-col md:flex-row justify-between items-end gap-8 border-b border-black/[0.06] pb-10">
                <div className="space-y-6">
                   <span className="text-sky-700 font-mono text-[11px] tracking-[0.3em] uppercase opacity-70">02 // ARCHIVE</span>
                   <h2 className="text-5xl md:text-7xl font-display font-black text-[#0a0a0a] tracking-tight leading-[0.8] uppercase flex flex-wrap gap-x-4">
                      {"PROJECTS".split("").map((char, i) => (
                        <motion.span
                          key={i}
                          initial={{ y: 50, opacity: 0 }}
                          whileInView={{ y: 0, opacity: 1 }}
                          transition={{ delay: i * 0.05 }}
                          whileHover={{ scale: 1.2, color: "#0369a1", rotate: i % 2 === 0 ? 5 : -5 }}
                          className="inline-block cursor-default"
                        >
                          {char}
                        </motion.span>
                      ))}
                   </h2>
                </div>
                <div className="max-w-xs text-right">
                   <p className="text-[#64748b] text-[13px] font-sans font-light leading-relaxed italic">
                      A curated collection of mobile architectures and high-end Flutter systems.
                   </p>
                </div>
             </div>

             <div className="max-w-[560px] relative">
                <div className="absolute -left-20 top-0 h-full w-[1px] bg-black/[0.05] hidden xl:block" />
                {[
                  { 
                    id: "01", 
                    title: "Light Suvara", 
                    tag: "FLUTTER · CHURCH HUB", 
                    live: false
                  },
                  { 
                    id: "02", 
                    title: "Prism Studio", 
                    tag: "WEB · AI ECOSYSTEM", 
                    live: true
                  },
                  { 
                    id: "03", 
                    title: "CarDash", 
                    tag: "FLUTTER · AUTOMOTIVE", 
                    live: false
                  }
                ].map((proj) => (
                  <Link to="/projects" key={proj.id} className="group flex items-center justify-between h-[72px] border-b border-black/[0.07] px-2 hover:bg-sky-700/[0.04] transition-all">
                     <div className="flex items-center gap-6">
                        <span className="font-mono text-[11px] text-black/30 w-6">{proj.id}</span>
                        <span className="font-display font-bold text-[clamp(20px,2.5vw,32px)] text-[#0a0a0a]">{proj.title}</span>
                     </div>
                     <div className="flex items-center gap-6">
                        <span className="hidden sm:inline font-mono text-[10px] tracking-[0.14em] text-sky-700 uppercase">{proj.tag}</span>
                        <div className="flex items-center gap-3">
                           {proj.live && <span className="font-sans text-[10px] text-emerald-600 font-bold tracking-tighter">↗ LIVE</span>}
                           <ArrowRight size={16} className="text-black/30 group-hover:translate-x-2 transition-transform" />
                        </div>
                     </div>
                  </Link>
                ))}
                
                <div className="mt-12">
                  <Link to="/projects" className="text-sky-700 font-sans font-medium text-sm flex items-center gap-2 hover:gap-3 transition-all">
                    View Full Archive <ArrowRight size={14} />
                  </Link>
                </div>
             </div>
          </div>
        </motion.section>

        {/* 03 // CAPABILITIES */}
        <motion.section 
          initial={{ opacity: 0, rotateX: 8, y: 60, transformPerspective: 1200 }}
          whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformOrigin: 'top center' }}
          className="bg-transparent px-8 md:px-20 pt-40 pb-20 border-t border-black/[0.06] relative overflow-hidden"
        >
          {/* Subtle background glow */}
          <div className="absolute -right-20 top-0 w-96 h-96 bg-sky-100/30 blur-[120px] rounded-full pointer-events-none" />
          
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16 md:gap-32">
             <div className="md:w-1/2 space-y-16">
                <div className="space-y-6">
                   <span className="text-sky-700 font-mono text-[11px] tracking-[0.3em] uppercase opacity-70">03 // CAPABILITIES</span>
                   <h2 className="text-6xl md:text-8xl font-display font-black text-[#0a0a0a] tracking-tighter uppercase leading-[0.85]">
                      {"IDEATION & CRAFT".split(" ").map((word, i) => (
                        <span key={i} className="inline-block overflow-hidden py-1 mr-4">
                           <Magnetic strength={20}>
                            <motion.span
                              initial={{ y: "100%" }}
                              whileInView={{ y: 0 }}
                              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                              whileHover={{ scale: 1.1, color: "#0369a1" }}
                              className="inline-block cursor-default"
                            >
                              {word}
                            </motion.span>
                           </Magnetic>
                        </span>
                      ))}
                   </h2>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pb-8">
                   {[
                     { title: "Mobile Systems", desc: "Building scalable architectures using Flutter and native patterns." },
                     { title: "System Design", desc: "Thinking in components to build maintainable and reusable codebases." }
                   ].map((cap, i) => (
                     <motion.div 
                       key={cap.title}
                       initial={{ opacity: 0, y: 20 }}
                       whileInView={{ opacity: 1, y: 0 }}
                       transition={{ delay: i * 0.1 }}
                       className="group bg-[#f8fafc] border border-black/[0.04] p-10 rounded-[32px] space-y-4 hover:border-sky-700/[0.1] hover:bg-white transition-all duration-500 shadow-sm hover:shadow-xl"
                     >
                        <div className="w-12 h-12 rounded-2xl bg-white border border-black/[0.05] flex items-center justify-center group-hover:scale-110 transition-transform">
                           {i === 0 ? <Code size={20} className="text-sky-700" /> : <Cpu size={20} className="text-sky-700" />}
                        </div>
                        <h4 className="text-xl font-display font-bold uppercase tracking-tight">{cap.title}</h4>
                        <p className="text-[#64748b] text-sm font-sans font-light leading-relaxed">{cap.desc}</p>
                     </motion.div>
                   ))}
                </div>

                <motion.div 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  className="border-l-[3px] border-sky-700/[0.2] pl-8 py-2"
                >
                   <p className="text-2xl italic font-serif text-[#475569] leading-relaxed max-w-xl">
                     "The best apps aren't just functional — they're felt. Every animation, every transition is a conversation with the person behind the screen."
                   </p>
                </motion.div>
             </div>
             
             <div className="md:w-1/2 relative h-[500px] md:h-[700px] w-full flex items-center justify-center">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#e0f2fe_0%,_transparent_70%)] opacity-40" />
                <div className="relative w-full h-full scale-110">
                   <SkillSphere />
                </div>
             </div>
          </div>
        </motion.section>

        {/* 04 // EXPERIMENT */}
        <motion.section 
          initial={{ opacity: 0, rotateX: 8, y: 60, transformPerspective: 1200 }}
          whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformOrigin: 'top center' }}
          className="bg-transparent px-8 md:px-20 pt-20 pb-40 border-t border-black/[0.06] relative"
        >
          {/* Side Glows */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-orange-100/30 blur-[100px] pointer-events-none rounded-full" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-sky-100/30 blur-[100px] pointer-events-none rounded-full" />
          
          <div className="max-w-7xl mx-auto text-center space-y-24">
             <div className="space-y-6">
                <span className="text-sky-700 font-mono text-[11px] tracking-[0.3em] uppercase opacity-70">INTERACTIVE // EXPERIMENT</span>
                <h2 className="text-5xl md:text-7xl font-display font-black text-[#0a0a0a] tracking-tight uppercase">
                   {"PROJECT GRAVITY".split(" ").map((word, i) => (
                      <span key={i} className="inline-block overflow-hidden py-1 mr-4">
                         <Magnetic strength={20}>
                          <motion.span
                            initial={{ y: "100%" }}
                            whileInView={{ y: 0 }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            whileHover={{ scale: 1.1, color: "#ea580c" }}
                            className="inline-block cursor-default"
                          >
                            {word}
                          </motion.span>
                         </Magnetic>
                      </span>
                   ))}
                </h2>
                <p className="text-[#64748b] text-lg font-sans font-light max-w-xl mx-auto">
                   A physics-based project explorer. Drag the nodes around to play with the gravity of my work.
                </p>
             </div>

             <div className="relative h-[600px] w-full bg-[#f8fafc] border border-black/[0.06] rounded-[40px] overflow-hidden cursor-crosshair group shadow-inner">
                {/* Floating Geometric Shapes */}
                <motion.div 
                  animate={{ rotate: 360, scale: [1, 1.2, 1] }} 
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute -top-20 -right-20 w-64 h-64 border border-sky-700/10 rounded-full" 
                />
                <motion.div 
                  animate={{ rotate: -360, scale: [1, 0.8, 1] }} 
                  transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                  className="absolute -bottom-10 -left-20 w-48 h-48 border border-sky-700/5 rotate-45" 
                />

                <div className="absolute top-8 left-8 z-10">
                   <div className="bg-white border border-black/[0.08] px-4 py-2 rounded-full flex items-center gap-4 shadow-sm">
                      <div className="flex gap-1">
                         {[1, 2, 3].map(i => (
                            <motion.div 
                               key={i}
                               animate={{ height: [4, 12, 4] }}
                               transition={{ duration: 0.8, delay: i * 0.2, repeat: Infinity }}
                               className="w-1 bg-emerald-500 rounded-full"
                            />
                         ))}
                      </div>
                      <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#64748b]">Engine: Real-time Physics</span>
                   </div>
                </div>

                <div className="absolute inset-0 z-0 opacity-40">
                   <div className="w-full h-full" style={{ backgroundImage: 'radial-gradient(#0a0a0a 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
                </div>

                {/* Interactive Project Nodes */}
                {[
                  { id: "01", name: "Church Hub", color: "bg-sky-500", pos: { x: "20%", y: "20%" }, desc: "Community management & scheduling." },
                  { id: "02", name: "AI Ecosystem", color: "bg-violet-500", pos: { x: "75%", y: "25%" }, desc: "Multi-modal AI productivity suite." },
                  { id: "03", name: "Car Dashboard", color: "bg-emerald-500", pos: { x: "50%", y: "50%" }, desc: "Flutter-based automotive interfaces." },
                  { id: "04", name: "Architecture", color: "bg-orange-500", pos: { x: "85%", y: "60%" }, desc: "Clean mobile system patterns." },
                  { id: "05", name: "UI Systems", color: "bg-rose-500", pos: { x: "15%", y: "70%" }, desc: "High-end component libraries." }
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
                    className={`project-node absolute w-32 h-32 md:w-40 md:h-40 rounded-full flex flex-col items-center justify-center p-6 text-center cursor-grab shadow-2xl border border-white/20 backdrop-blur-md ${node.color}/10 group/node transition-shadow hover:shadow-sky-500/20`}
                    style={{ left: node.pos.x, top: node.pos.y }}
                  >
                     <div className={`w-3 h-3 rounded-full ${node.color} mb-3 shadow-[0_0_15px_${node.color === 'bg-sky-500' ? '#0ea5e980' : '#0a0a0a20'}] group-hover/node:scale-150 transition-transform`} />
                     <span className="text-[11px] font-mono font-bold tracking-tight text-[#0a0a0a] uppercase leading-tight">{node.name}</span>
                     
                     <AnimatePresence>
                        {activeNode === node.name && (
                           <motion.div 
                              initial={{ opacity: 0, scale: 0.5, y: 10 }}
                              animate={{ opacity: 1, scale: 1, y: 0 }}
                              exit={{ opacity: 0, scale: 0.8, y: 5 }}
                              className="absolute inset-0 rounded-full border-4 border-sky-500/30 animate-pulse pointer-events-none"
                           />
                        )}
                     </AnimatePresence>
                  </motion.div>
                ))}

                {/* Center Attraction Field */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10 group-hover:opacity-30 transition-opacity">
                   <div className="w-[400px] h-[400px] border border-sky-700/20 rounded-full animate-[spin_30s_linear_infinite]" />
                   <div className="absolute w-[300px] h-[300px] border border-sky-700/10 rounded-full animate-[spin_40s_linear_infinite_reverse]" />
                </div>
              </div>
           </div>
        </motion.section>

        {/* 05 // FOUNDATION */}
        <motion.section 
          initial={{ opacity: 0, rotateX: 8, y: 60, transformPerspective: 1200 }}
          whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformOrigin: 'top center' }}
          className="bg-transparent px-8 md:px-20 py-40 border-t border-black/[0.06] relative overflow-hidden"
        >
          <div className="absolute top-1/2 -right-40 w-96 h-96 bg-amber-100/20 blur-[120px] pointer-events-none rounded-full" />
          <div className="absolute bottom-0 -left-20 w-64 h-64 bg-sky-100/30 blur-[100px] pointer-events-none rounded-full" />
          
          {/* Background Decorative Text */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20vw] font-display font-black text-black/[0.02] select-none pointer-events-none uppercase">
            History
          </div>
          
          <div className="max-w-7xl mx-auto text-center space-y-24 relative z-10">
             <div className="space-y-6">
                <span className="text-sky-700 font-mono text-[11px] tracking-[0.3em] uppercase opacity-70">05 // FOUNDATION</span>
                <h2 className="text-7xl md:text-[12vw] font-display font-extrabold text-[#0a0a0a] leading-none tracking-tighter uppercase relative">
                   {["THE", "JOURNEY"].map((word, wordIdx) => (
                      <span key={wordIdx} className="inline-block mx-4">
                        {word.split("").map((char, charIdx) => (
                          <motion.span
                            key={charIdx}
                            initial={{ opacity: 0, y: 100 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: (wordIdx * word.length + charIdx) * 0.03, duration: 0.8 }}
                            whileHover={{ scale: 1.2, color: "#0369a1", y: -20 }}
                            className="inline-block"
                          >
                            {char}
                          </motion.span>
                        ))}
                      </span>
                   ))}
                </h2>
                <p className="text-[#64748b] text-xl font-sans font-light italic opacity-80">A chronicle of academic milestones and continuous growth.</p>
             </div>

             <Link to="/education" className="block max-w-4xl mx-auto group">
                <div className="bg-white border border-black/[0.06] p-16 md:p-24 rounded-[60px] group-hover:shadow-[0_40px_80px_rgba(0,0,0,0.06)] transition-all relative overflow-hidden text-left">
                   <div className="absolute top-0 right-0 p-16 text-sky-700/[0.02] rotate-12 group-hover:rotate-0 transition-transform">
                      <BookOpen size={300} />
                   </div>
                   <div className="relative z-10 space-y-12">
                      <div className="space-y-3">
                         <h3 className="text-4xl md:text-6xl font-display font-bold text-[#0a0a0a] tracking-tight uppercase">B.Tech CS Engineering</h3>
                         <p className="text-sky-700 font-mono text-xl uppercase tracking-wider font-bold">Amal Jyothi College of Engineering</p>
                      </div>
                      <div className="flex flex-wrap gap-12 text-[#64748b]">
                         <div className="flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-sky-700" />
                            <span className="text-xs font-mono font-bold uppercase tracking-widest italic opacity-60">Senior Year</span>
                         </div>
                         <div className="flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-sky-700" />
                            <span className="text-xs font-mono font-bold uppercase tracking-widest italic opacity-60">Kanjirappally, Kerala</span>
                         </div>
                      </div>
                      <div className="pt-12">
                         <div className="inline-flex items-center gap-4 bg-[#0a0a0a] text-white px-10 py-5 rounded-full font-mono font-bold text-[10px] tracking-widest uppercase transition-transform group-hover:scale-105">
                            See Full Archive <ArrowRight size={14} />
                         </div>
                      </div>
                   </div>
                </div>
             </Link>
          </div>
        </motion.section>

        {/* 06 // CONNECT - CREATIVE FOOTER CALL TO ACTION */}
        <section className="bg-[#0a0a0a] text-white px-8 md:px-20 py-60 relative overflow-hidden">
           <div className="absolute inset-0 opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay"></div>
           <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-sky-700 to-transparent"></div>
           
           <div className="max-w-7xl mx-auto flex flex-col items-center text-center space-y-16 relative z-10">
              <motion.span 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 0.5 }}
                className="text-sky-400 font-mono text-[11px] tracking-[0.5em] uppercase"
              >
                // LET'S CRAFT SOMETHING GREAT
              </motion.span>
              
              <motion.h2 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="text-7xl md:text-[10vw] font-display font-extrabold tracking-tighter leading-none uppercase"
              >
                HAVE AN <br /> IDEA?
              </motion.h2>
              
              <Link to="/contact">
                <Magnetic strength={30}>
                   <button className="w-48 h-48 md:w-64 md:h-64 rounded-full border border-white/20 flex flex-col items-center justify-center gap-4 group hover:bg-white hover:text-[#0a0a0a] transition-all duration-700">
                      <ArrowRight size={32} className="group-hover:rotate-[-45deg] transition-transform" />
                      <span className="text-[10px] font-mono font-bold tracking-widest uppercase">Start Project</span>
                   </button>
                </Magnetic>
              </Link>
           </div>
        </section>
      </div>
    </div>
  );
};

