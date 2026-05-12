import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useSpring, useTransform, AnimatePresence, useMotionValue, animate } from 'framer-motion';
import { MousePointer2, ChevronRight } from 'lucide-react';

const PILLARS = [
  {
    title: 'Cinematic\nExperiences',
    desc: 'Immersive, emotional and visually stunning journeys.',
    icon: '/build_cinematic.png',
    glow: 'rgba(168, 85, 247, 0.4)', // Purple
    innerGlow: 'rgba(168, 85, 247, 0.2)'
  },
  {
    title: 'Surgical\nPrecision',
    desc: 'Clean code. Precise logic. Pixel perfect execution.',
    icon: '/build_precision.png',
    glow: 'rgba(236, 72, 153, 0.4)', // Pink
    innerGlow: 'rgba(236, 72, 153, 0.2)'
  },
  {
    title: 'System\nLogic',
    desc: 'Scalable, efficient and engineered for performance.',
    icon: '/build_logic.png',
    glow: 'rgba(59, 130, 246, 0.4)', // Blue
    innerGlow: 'rgba(59, 130, 246, 0.2)'
  },
  {
    title: 'Ideation\n& Craft',
    desc: 'Ideas transformed into meaningful products.',
    icon: '/build_ideation.png',
    glow: 'rgba(249, 115, 22, 0.4)', // Orange
    innerGlow: 'rgba(249, 115, 22, 0.2)'
  },
  {
    title: 'Performance\nOptimization',
    desc: 'Blazing fast speeds and optimized resource management.',
    icon: '/build_performance.png',
    glow: 'rgba(16, 185, 129, 0.4)', // Emerald
    innerGlow: 'rgba(16, 185, 129, 0.2)'
  },
];

export const FeaturePillars = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const outerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeIndex, setActiveIndex] = useState(1);
  const [constraints, setConstraints] = useState({ right: 0, left: 0 });
  const x = useMotionValue(0);
  const progressValue = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 30 });

  const scrollToIndex = (index: number) => {
    if (containerRef.current && outerRef.current) {
      const maxScroll = containerRef.current.scrollWidth - outerRef.current.offsetWidth;
      const targetX = -(index * (maxScroll / (PILLARS.length - 1)));
      animate(x, targetX, {
        type: "spring",
        stiffness: 300,
        damping: 30
      });
    }
  };

  useEffect(() => {
    if (containerRef.current && outerRef.current) {
      const outerWidth = outerRef.current.offsetWidth;
      const innerWidth = containerRef.current.scrollWidth;
      setConstraints({ right: 0, left: -(innerWidth - outerWidth + 100) });
    }
  }, []);

  return (
    <section className="py-32 px-8 lg:px-24 bg-[#fafafa] overflow-hidden flex flex-col gap-16 select-none">

      {/* Header Row */}
      <div className="max-w-[1400px] mx-auto w-full flex flex-col md:flex-row justify-between items-end gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col gap-6"
        >
          <div className="flex items-center gap-3 group/label cursor-default">
            <motion.div
              whileHover={{ scaleY: 1.5, backgroundColor: '#8b5cf6' }}
              className="w-1.5 h-4 bg-purple-600 rounded-full transition-all"
            />
            <motion.span
              whileHover={{ x: 5, color: '#8b5cf6' }}
              className="text-[11px] font-mono font-black tracking-[0.4em] text-gray-400 uppercase transition-all"
            >
              BUILD
            </motion.span>
          </div>

          <h2 className="text-5xl md:text-7xl font-display font-black tracking-tighter text-[#1a1a2e] leading-[0.9] flex flex-col items-start">
            <motion.span
              whileHover={{ scale: 1.05, color: '#6366f1' }}
              className="cursor-default transition-colors duration-300"
            >
              Digital Experiences
            </motion.span>
            <span className="relative flex flex-wrap gap-x-4 items-center">
              <motion.span
                whileHover={{ scale: 1.05, color: '#ec4899' }}
                className="cursor-default transition-colors duration-300"
              >
                that create
              </motion.span>
              <span className="italic font-serif font-medium text-purple-600/90 relative inline-block group/impact cursor-default">
                <motion.span whileHover={{ scale: 1.1, color: '#06b6d4' }} className="inline-block transition-colors duration-300">
                  impact
                </motion.span>
                <motion.svg
                  className="absolute -bottom-2 left-0 w-full"
                  viewBox="0 0 200 20"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  transition={{ duration: 1, delay: 0.5 }}
                >
                  <motion.path
                    d="M5,15 Q100,5 195,15"
                    fill="none"
                    stroke="url(#impact-gradient)"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                  <defs>
                    <linearGradient id="impact-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#8b5cf6" />
                      <stop offset="100%" stopColor="#ec4899" />
                    </linearGradient>
                  </defs>
                </motion.svg>
              </span>
            </span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-end gap-4"
        >
          <div className="flex items-center gap-4 text-[10px] font-mono font-bold tracking-[0.3em] text-gray-400 uppercase">
            <span>DRAG TO EXPLORE</span>
            <ChevronRight className="w-4 h-4" />
          </div>
          <div className="w-6 h-10 border-2 border-gray-200 rounded-full flex justify-center p-1">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-1.5 h-1.5 bg-gray-300 rounded-full"
            />
          </div>
        </motion.div>
      </div>

      {/* Slider Row */}
      <div ref={outerRef} className="relative w-full overflow-hidden">
        <motion.div
          ref={containerRef}
          drag="x"
          style={{ x }}
          dragConstraints={constraints}
          onUpdate={(latest: any) => {
            if (containerRef.current && outerRef.current) {
              const maxScroll = containerRef.current.scrollWidth - outerRef.current.offsetWidth;
              if (maxScroll <= 0) return;

              const progress = Math.abs(latest.x) / maxScroll;
              const currentProgress = Math.min(1, Math.max(0, progress));
              setScrollProgress(currentProgress);
              progressValue.set(currentProgress);

              // Calculate active index (1 to PILLARS.length)
              const index = Math.round(currentProgress * (PILLARS.length - 1)) + 1;
              if (!isNaN(index)) {
                setActiveIndex(Math.min(PILLARS.length, Math.max(1, index)));
              }
            }
          }}
          className="flex gap-10 px-4 md:px-24 cursor-grab active:cursor-grabbing"
        >
          {PILLARS.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, x: 100, rotate: 5 }}
              whileInView={{ opacity: 1, x: 0, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.8, type: "spring", bounce: 0.3 }}
              onClick={() => scrollToIndex(i)}
              className="min-w-[320px] aspect-[3/4] rounded-[60px] bg-white border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.03)] flex flex-col items-center justify-between p-10 group relative overflow-hidden cursor-pointer"
            >
              {/* Card Glow Background */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                style={{ background: `radial-gradient(circle at center, ${p.innerGlow} 0%, transparent 70%)` }}
              />

              {/* Icon Container */}
              <div className="relative w-32 h-32 flex items-center justify-center pointer-events-none">
                <div
                  className="absolute inset-0 rounded-full blur-2xl opacity-40"
                  style={{ backgroundColor: p.glow }}
                />
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="relative z-10 w-full h-full flex items-center justify-center"
                >
                  <img src={p.icon} alt={p.title} className="w-24 h-24 object-contain drop-shadow-2xl" />
                </motion.div>
              </div>

              {/* Content */}
              <div className="flex flex-col items-center text-center gap-4 relative z-10">
                <motion.h3
                  whileHover={{ scale: 1.05, color: p.glow.replace('0.4', '1') }}
                  className="text-xl md:text-2xl font-display font-black text-[#1a1a2e] uppercase leading-tight whitespace-pre-line tracking-tight transition-colors duration-300 cursor-default"
                >
                  {p.title}
                </motion.h3>
                <motion.p
                  whileHover={{ color: '#1a1a2e' }}
                  className="text-[11px] text-gray-400 font-medium leading-relaxed max-w-[200px] transition-colors duration-300 cursor-default"
                >
                  {p.desc}
                </motion.p>
              </div>

              {/* Bottom Decoration */}
              <div className="w-12 h-1 bg-gray-50 rounded-full group-hover:w-20 group-hover:bg-purple-100 transition-all duration-500" />
            </motion.div>
          ))}
        </motion.div>
      </div>

    </section>
  );
};

