import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Globe, Layers } from 'lucide-react';
import { Magnetic } from '../components/Magnetic';

const STATS = [
  { label: "Live Apps", value: "2" },
  { label: "Current Year", value: "4th" },
  { label: "Focus", value: "Flutter" }
];

const STACK_IMAGES = [
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000",
  "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=800",
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=800"
];

export const About = () => {
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
    
    // Add a slight delay to allow a "tap" animation if desired, 
    // but framer-motion's layout and whileTap already provide great feedback.
    setStackOrder(prev => {
      const next = prev.filter(idx => idx !== clickedIdx);
      return [clickedIdx, ...next];
    });
  };

  return (
    <div 
      className="min-h-screen pt-48 pb-40 px-8 md:px-20 overflow-hidden bg-transparent"
      onMouseMove={handleMouseMove}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-20 lg:gap-32 items-center">
        <div className="lg:col-span-6 relative perspective-2000 order-2 lg:order-1 h-[600px] flex items-center justify-center">
           <div className="relative w-full max-w-[420px] aspect-[3/4] z-10">
              {/* Decorative backgrounds */}
              <motion.div 
                 animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
                 transition={{ duration: 20, repeat: Infinity }}
                 className="absolute inset-0 bg-sky-blue-vibrant/10 blur-[120px] -z-10"
              />

              <div className="relative w-full h-full">
                <AnimatePresence mode="popLayout">
                  {stackOrder.map((imgIdx, position) => (
                    <motion.div
                      key={imgIdx}
                      layout
                      initial={{ opacity: 0, scale: 0.8, y: 50 }}
                      animate={{ 
                        opacity: position === 0 ? 1 : 0.4 - position * 0.1,
                        scale: 1 - position * 0.08,
                        y: position * 40,
                        x: position * 30 + mousePos.x * (0.5 + position * 0.2),
                        rotate: position * 5 + mousePos.y * (0.2 + position * 0.1),
                        zIndex: 10 - position
                      }}
                      whileHover={position !== 0 ? { 
                        scale: 1 - position * 0.08 + 0.05, 
                        y: position * 40 - 10,
                        transition: { duration: 0.3 }
                      } : {}}
                      whileTap={{ 
                        scale: 1.1,
                        rotate: 0,
                        zIndex: 100,
                        transition: { duration: 0.2 }
                      }}
                      onClick={() => handleStackClick(imgIdx)}
                      exit={{ opacity: 0, scale: 0.5, x: 200, rotate: 25 }}
                      transition={{ type: "spring", stiffness: 100, damping: 20 }}
                      className="absolute inset-0 cinematic-glass overflow-hidden shadow-2xl border-white/10 group rounded-[30px] cursor-pointer"
                    >
                      <img 
                        src={STACK_IMAGES[imgIdx]} 
                        className={`w-full h-full object-cover transition-all duration-700 ${position === 0 ? 'grayscale-0' : 'grayscale'}`}
                        alt={`About Stack ${imgIdx}`} 
                      />
                      {position === 0 && (
                        <motion.div 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="absolute inset-0"
                        >
                          <div className="absolute inset-0 bg-gradient-to-t from-midnight/60 to-transparent" />
                          <div className="absolute bottom-8 left-8">
                             <span className="text-[10px] font-black tracking-[0.4em] text-white/40 uppercase block mb-1">CRAFTING FROM</span>
                             <span className="text-xl font-display font-bold">Idukki, Kerala</span>
                          </div>
                        </motion.div>
                      )}
                      
                      {/* Interaction hint on background images */}
                      {position !== 0 && (
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors flex items-center justify-center">
                           <Layers className="text-white/20 group-hover:text-white/60 transition-colors" />
                        </div>
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Identity Pill */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-12 -right-6 cinematic-glass px-6 py-3 flex items-center gap-3 border-white/20 z-30 shadow-glow-sm"
              >
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                  <span className="text-[10px] font-black tracking-[0.3em] uppercase text-white/80">Active Projects: 2</span>
              </motion.div>
           </div>
        </div>

        <div className="lg:col-span-6 space-y-12 order-1 lg:order-2">
            <div>
              <motion.span 
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="text-sky-blue-glow font-mono text-sm tracking-[0.3em] mb-6 block drop-shadow-glow"
              >
                // ORIGIN STORY
              </motion.span>
              
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-5xl md:text-8xl font-display font-black leading-[0.95] tracking-tight mb-10"
              >
                Code that <span className="opacity-40 italic">actually</span> matters.
              </motion.h2>

              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="space-y-8 text-lg md:text-xl text-white/50 leading-relaxed font-light max-w-xl"
              >
                <p>I'm Alins Binu, a Computer Science student from the hills of <span className="text-white font-medium italic">Kattappana, Idukki.</span> I don't just study code — I build real products that real people use every day.</p>
                <p>From a custom church app serving an entire community to a car dashboard running off a smartphone, I chase ideas that bridge the gap between what exists and what should exist.</p>
              </motion.div>
            </div>

            <div className="grid grid-cols-3 gap-6 md:gap-12 pt-12 border-t border-white/10">
                {STATS.map((stat, i) => (
                  <motion.div 
                    key={stat.label} 
                    initial={{ opacity: 0, y: 30 }} 
                    whileInView={{ opacity: 1, y: 0 }} 
                    transition={{ delay: i * 0.1 }}
                  >
                     <div className="text-4xl md:text-5xl font-display font-black text-white mb-2 drop-shadow-glow-sm">{stat.value}</div>
                     <div className="text-[9px] font-black tracking-[0.4em] text-white/30 uppercase">{stat.label}</div>
                  </motion.div>
                ))}
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex gap-8 pt-4"
            >
              <Magnetic strength={20}>
                <button className="bg-white text-midnight px-12 py-5 rounded-full font-black text-[10px] tracking-widest uppercase flex items-center gap-4 hover:bg-sky-blue-glow transition-all shadow-2xl">
                  Resume <Download className="w-4 h-4" />
                </button>
              </Magnetic>
              
              <button className="text-white/40 hover:text-white font-bold text-[10px] tracking-widest uppercase transition-colors">
                Read Blog
              </button>
            </motion.div>
        </div>
      </div>
    </div>
  );
};
