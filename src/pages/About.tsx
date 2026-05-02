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
      className="min-h-screen pt-48 pb-40 px-8 md:px-20 overflow-hidden bg-transparent text-[#0a0a0a]"
      onMouseMove={handleMouseMove}
    >
      <div className="absolute inset-0 z-0 pointer-events-none">
         <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_#eef8ff_0%,_transparent_60%)] opacity-50" />
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-20 lg:gap-32 items-center relative z-10">
        <motion.div style={{ y: yImage, perspective: '2000px' }} className="lg:col-span-6 relative order-2 lg:order-1 h-[600px] flex items-center justify-center">
           <div className="relative w-full max-w-[420px] aspect-[3/4] z-10">
              <motion.div 
                 animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
                 transition={{ duration: 20, repeat: Infinity }}
                 className="absolute inset-0 bg-[#0369a1]/5 blur-[120px] -z-10"
              />

              <div className="relative w-full h-full">
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
                      className="absolute inset-0 bg-white/20 backdrop-blur-xl p-3 shadow-[0_32px_80px_rgba(0,0,0,0.1)] border border-white/40 group rounded-[40px] cursor-pointer"
                    >
                      <div className="absolute inset-0 border-[1px] border-white/20 z-20 pointer-events-none rounded-[40px]" />
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
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-white/10 mix-blend-overlay" />
                          {/* Dynamic Glare Effect */}
                          <div 
                            className="absolute inset-0 opacity-40 transition-transform duration-200"
                            style={{
                              background: 'radial-gradient(circle at 50% 0%, rgba(255,255,255,0.4) 0%, transparent 60%)',
                              transform: `translate(${mousePos.x * 20}px, ${mousePos.y * 20}px)`
                            }}
                          />
                        </motion.div>
                      )}
                      
                      {position !== 0 && (
                        <div className="absolute inset-0 bg-white/40 group-hover:bg-transparent transition-colors flex items-center justify-center">
                           <Layers className="text-[#0a0a0a]/20 group-hover:text-[#0a0a0a]/60 transition-colors" />
                        </div>
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              <Magnetic strength={40}>
                <motion.div 
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -top-12 -right-6 bg-white/90 backdrop-blur-md border border-black/[0.06] px-6 py-3 flex items-center gap-3 z-30 shadow-xl rounded-full cursor-pointer"
                >
                    <div className="w-2 h-2 bg-[#10b981] rounded-full animate-pulse" />
                    <span className="text-[10px] font-black tracking-[0.2em] uppercase text-[#374151]">STATUS: BUILDING</span>
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
                className="text-sky-700 font-mono text-[11px] font-bold tracking-[0.4em] mb-6 block uppercase opacity-70"
              >
                // ORIGIN STORY
              </motion.span>
              
              <div className="mb-12">
                 <div className="overflow-hidden">
                   <motion.h2 
                     variants={{ hidden: { opacity: 0, y: 100 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } } }}
                     className="text-6xl md:text-8xl font-display font-black leading-[0.9] tracking-tighter text-[#0a0a0a] uppercase"
                   >
                     Crafting
                   </motion.h2>
                 </div>
                 <div className="overflow-hidden">
                   <motion.h2 
                     variants={{ hidden: { opacity: 0, y: 100 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } } }}
                     className="text-6xl md:text-8xl font-display font-black leading-[0.9] tracking-tighter text-[#0a0a0a] uppercase mt-2"
                   >
                     <span className="opacity-30 italic font-serif">Intentional</span> Products.
                   </motion.h2>
                 </div>
              </div>

              <motion.div 
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
                className="space-y-8 text-lg md:text-xl text-[#64748b] leading-[1.8] font-sans font-light max-w-xl"
              >
                <p>I'm Alins Binu, a Computer Science student from <span className="text-[#0a0a0a] font-medium italic underline decoration-sky-700/20 underline-offset-4">Kattappana, Idukki.</span> I don't just study code — I build real products that solve real problems.</p>
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
              className="grid grid-cols-3 gap-6 md:gap-12 pt-12 border-t border-black/[0.06]"
            >
                {STATS.map((stat) => (
                  <motion.div 
                    key={stat.label} 
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0 }
                    }}
                  >
                     <div className="text-4xl md:text-6xl font-display font-black text-[#0a0a0a] mb-2">{stat.value}</div>
                     <div className="text-[9px] font-mono font-bold tracking-[0.2em] text-[#64748b] uppercase leading-relaxed opacity-60">{stat.label}</div>
                  </motion.div>
                ))}
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="flex items-center gap-10 pt-4"
            >
              <Magnetic strength={20}>
                <button className="relative overflow-hidden group bg-[#0a0a0a] text-white px-12 py-5 rounded-full font-mono font-bold text-[10px] tracking-widest uppercase flex items-center gap-4 shadow-xl border border-black/10 transition-transform hover:scale-105 active:scale-95">
                  <span className="relative z-10 flex items-center gap-4 group-hover:text-white transition-colors duration-300">Resume <Download className="w-4 h-4" /></span>
                  <div className="absolute inset-0 bg-sky-600 translate-y-[101%] group-hover:translate-y-0 transition-transform duration-500 ease-[0.16,1,0.3,1] rounded-full" />
                </button>
              </Magnetic>
              
              <button className="text-[#64748b] hover:text-[#0a0a0a] font-mono font-bold text-[10px] tracking-widest uppercase transition-colors border-b border-black/10 pb-1">
                Read Blog
              </button>
            </motion.div>
        </motion.div>
      </div>
    </div>
  );
};
