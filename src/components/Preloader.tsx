import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ABLogo } from './ABLogo';

export const Preloader = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 2500; // Slightly longer for cinematic effect
    const interval = 20;
    const steps = duration / interval;
    const increment = 100 / steps;

    const timer = setInterval(() => {
      setProgress((prev) => Math.min(prev + increment, 100));
    }, interval);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      const timeout = setTimeout(() => {
        onComplete();
      }, 800);
      return () => clearTimeout(timeout);
    }
  }, [progress, onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[10000] bg-white flex flex-col items-center justify-center overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0,
        transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
      }}
    >
      {/* Background Polish */}
      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-500 via-transparent to-transparent" />
      <div className="noise-overlay opacity-[0.02] pointer-events-none" />
      
      <div className="relative flex flex-col items-center w-full max-w-md px-12">
        {/* Animated Logo Container */}
        <motion.div 
          className="mb-16"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <ABLogo size={120} />
        </motion.div>

        {/* Brand Reveal */}
        <div className="flex flex-col items-center gap-3 mb-16 overflow-hidden">
          <motion.h2 
            className="font-display font-black text-[32px] md:text-[42px] tracking-[-0.05em] text-[#0c0a28] leading-none"
            initial={{ y: 50 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            Alins Binu
          </motion.h2>
          <motion.div
            className="flex items-center gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
          >
            <div className="w-8 h-[1px] bg-gray-200" />
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]">Creative Engineering</span>
            <div className="w-8 h-[1px] bg-gray-200" />
          </motion.div>
        </div>

        {/* High-End Progress Section */}
        <div className="w-full flex flex-col gap-6">
          <div className="relative h-[2px] w-full bg-gray-100 rounded-full overflow-hidden">
            <motion.div
              className="absolute top-0 left-0 h-full bg-[#0c0a28]"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.1, ease: 'linear' }}
            />
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-[9px] font-black text-gray-300 uppercase tracking-widest">
              Initializing Experience
            </span>
            <span className="text-[11px] font-mono font-black text-[#0c0a28]">
              {Math.round(progress)}%
            </span>
          </div>
        </div>
      </div>

      {/* Decorative Bottom Tag */}
      <motion.div 
        className="absolute bottom-12 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <span className="text-[10px] font-black text-gray-200 uppercase tracking-[0.4em]">Portfolio MMXXV</span>
      </motion.div>
    </motion.div>
  );
};
