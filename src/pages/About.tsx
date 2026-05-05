import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Download, Globe, Layers } from 'lucide-react';
import { Magnetic } from '../components/Magnetic';

const STATS = [
  { label: "Live Projects", value: "3" },
  { label: "Current Year", value: "4th" },
  { label: "Focus", value: "Flutter" }
];

const STACK_IMAGES = [
  "/about-1.jpg",
  "/about-2.jpg",
  "/about-3.jpg"
];

export const About = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const yImage = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const yText = useTransform(scrollYProgress, [0, 1], [20, -20]);

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [stackOrder, setStackOrder] = useState([0, 1, 2]);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const handleMouseMove = (e: React.MouseEvent) => {
    const x = (e.clientX - window.innerWidth / 2) / 40;
    const y = (e.clientY - window.innerHeight / 2) / 40;
    setMousePos({ x, y });
  };

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setStackOrder(prev => {
        const next = [...prev];
        const last = next.pop()!;
        next.unshift(last);
        return next;
      });
    }, 4000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const handleStackClick = (clickedIdx: number) => {
    setIsAutoPlaying(false);
    
    setStackOrder(prev => {
      const next = prev.filter(idx => idx !== clickedIdx);
      return [clickedIdx, ...next];
    });
  };

  return (
    <div 
      ref={containerRef}
      className="min-h-screen pt-48 pb-40 px-8 md:px-20 overflow-hidden bg-transparent text-[var(--text-primary)]"
      onMouseMove={handleMouseMove}
    >
      <div className="absolute inset-0 z-0 pointer-events-none">
         <div className="holi-splash w-[800px] h-[800px] bg-[var(--accent-secondary)] top-0 right-[-10%] opacity-10" />
         <div className="holi-splash w-[700px] h-[700px] bg-[var(--accent-primary)] top-[20%] left-[-10%] opacity-10" />
         <div className="holi-splash w-[500px] h-[500px] bg-[var(--accent-tertiary)] bottom-0 left-[20%] opacity-10" />
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-20 lg:gap-32 items-center relative z-10">
        <motion.div style={{ y: yImage, perspective: '2000px' }} className="lg:col-span-6 relative order-2 lg:order-1 h-[600px] flex items-center justify-center">
           <div className="relative w-full max-w-[420px] aspect-[3/4] z-10">
              <motion.div 
                 animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
                 transition={{ duration: 20, repeat: Infinity }}
                 className="absolute inset-0 bg-[var(--accent-primary)]/10 blur-[120px] -z-10"
              />

              <div className="relative w-full h-full watercolor-border p-1 rounded-[40px]">
                <div className="relative w-full h-full overflow-hidden rounded-[39px]">
                  <AnimatePresence mode="popLayout">
                    {stackOrder.map((imgIdx, position) => (
                      <motion.div
                        key={imgIdx}
                        layout
                        initial={{ opacity: 0, scale: 0.8, y: 50 }}
                        animate={{ 
                          opacity: position === 0 ? 1 : 0.8 - position * 0.2,
                          scale: 1 - position * 0.05,
                          y: position === 0 ? 0 : position * 20,
                          x: position === 0 ? 0 : position * 15,
                          rotate: position === 0 ? 0 : position * 3,
                          zIndex: 10 - position
                        }}
                        whileHover={position !== 0 ? { 
                          scale: 1 - position * 0.05 + 0.02, 
                          y: position * 30,
                          x: position * 40,
                          rotate: position * 8,
                          transition: { type: "spring", stiffness: 300, damping: 25 }
                        } : {
                          y: -5,
                          transition: { type: "spring", stiffness: 300, damping: 25 }
                        }}
                        whileTap={{ 
                          scale: 1.1,
                          rotate: 0,
                          zIndex: 100,
                          transition: { duration: 0.2 }
                        }}
                        onClick={() => handleStackClick(imgIdx)}
                        exit={{ opacity: 0, scale: 0.5, x: 200, rotate: 25 }}
                        transition={{ type: "spring", stiffness: 100, damping: 20 }}
                        className="absolute inset-0 bg-[var(--card-bg)] p-3 shadow-2xl border border-[var(--glass-border)] group rounded-[40px] cursor-pointer"
                      >
                        <div className="w-full h-full relative rounded-[28px] overflow-hidden">
                          <img 
                            src={STACK_IMAGES[imgIdx]} 
                            className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${position === 0 ? 'grayscale-0' : 'grayscale'}`}
                            alt={`About Stack ${imgIdx}`} 
                          />
                        </div>
                        {position === 0 && (
                          <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="absolute inset-0 z-10 pointer-events-none"
                          >
                            <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)]/40 via-transparent to-[var(--text-primary)]/10 mix-blend-overlay" />
                          </motion.div>
                        )}
                        
                        {position !== 0 && (
                          <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors flex items-center justify-center">
                             <Layers className="text-white/20 group-hover:text-white/60 transition-colors" />
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>

              <Magnetic strength={40}>
                <motion.div 
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -top-12 -right-6 bg-[var(--glass-bg)] backdrop-blur-md border border-[var(--glass-border)] px-6 py-3 flex items-center gap-3 z-30 shadow-xl rounded-full cursor-pointer"
                >
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                    <span className="text-[10px] font-black tracking-[0.2em] uppercase text-[var(--text-secondary)]">STATUS: BUILDING</span>
                </motion.div>
              </Magnetic>
           </div>
        </motion.div>

        <motion.div style={{ y: yText }} className="lg:col-span-6 space-y-12 order-1 lg:order-2">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.15
                  }
                }
              }}
            >
              <motion.span 
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  visible: { opacity: 1, x: 0 }
                }}
                className="text-[var(--accent-secondary)] font-mono text-[11px] font-bold tracking-[0.4em] mb-6 block uppercase opacity-90"
              >
                // ORIGIN STORY
              </motion.span>
              
              <div className="mb-12">
                 <div className="overflow-hidden">
                  <Magnetic strength={10}>
                    <motion.h2 
                      variants={{ hidden: { opacity: 0, y: 100 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } } }}
                      className="text-6xl md:text-8xl font-display font-black leading-[0.9] tracking-tighter text-[var(--text-primary)] uppercase"
                    >
                      Crafting
                    </motion.h2>
                  </Magnetic>
                 </div>
                 <div className="overflow-hidden mt-2">
                  <Magnetic strength={10}>
                    <motion.h2 
                      variants={{ hidden: { opacity: 0, y: 100 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } } }}
                      className="text-6xl md:text-8xl font-display font-black leading-[0.9] tracking-tighter text-[var(--text-primary)] uppercase"
                    >
                      <span className="text-[var(--accent-primary)] italic font-serif">Intentional</span> Products.
                    </motion.h2>
                  </Magnetic>
                 </div>
              </div>

              <motion.div 
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
                className="space-y-8 text-lg md:text-xl text-[var(--text-secondary)] leading-[1.8] font-sans font-light max-w-xl"
              >
                <p>I'm Alins Binu, a Computer Science student from <span className="text-[var(--text-primary)] font-bold italic underline decoration-[var(--accent-secondary)] underline-offset-4">Kattappana, Idukki.</span> I don't just study code — I build real products that solve real problems.</p>
                <p>From custom infrastructure for communities to specialized mobile interfaces, I focus on the intersection of utility and high-end design. I thrive at the edge of "impossible" ideas.</p>
              </motion.div>
            </motion.div>

            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1,
                    delayChildren: 0.3
                  }
                }
              }}
              className="grid grid-cols-3 gap-6 md:gap-12 pt-12 border-t border-[var(--glass-border)]"
            >
                {STATS.map((stat) => (
                  <motion.div 
                    key={stat.label} 
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0 }
                    }}
                  >
                     <div className="text-4xl md:text-6xl font-display font-black text-[var(--text-primary)] mb-2">{stat.value}</div>
                     <div className="text-[9px] font-mono font-bold tracking-[0.2em] text-[var(--text-secondary)] uppercase leading-relaxed">{stat.label}</div>
                  </motion.div>
                ))}
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-10 pt-4"
            >
              <Magnetic strength={20}>
                <button className="relative overflow-hidden group bg-[var(--text-primary)] text-[var(--bg-primary)] px-12 py-5 rounded-full font-mono font-bold text-[10px] tracking-widest uppercase flex items-center gap-4 shadow-xl border border-[var(--glass-border)] transition-all hover:scale-105 active:scale-95">
                  <span className="relative z-10 flex items-center gap-4 group-hover:text-[var(--bg-primary)] transition-colors duration-300">Resume <Download className="w-4 h-4" /></span>
                  <div className="absolute inset-0 bg-[var(--accent-primary)] translate-y-[101%] group-hover:translate-y-0 transition-transform duration-500 ease-[0.16,1,0.3,1] rounded-full" />
                </button>
              </Magnetic>
              
              <button className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] font-mono font-bold text-[10px] tracking-widest uppercase transition-colors border-b border-[var(--accent-primary)] pb-1">
                Read Blog
              </button>
            </motion.div>
        </motion.div>
      </div>
    </div>
  );
};
