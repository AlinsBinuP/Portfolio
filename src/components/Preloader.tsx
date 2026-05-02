import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ABLogo } from './ABLogo';

export const Preloader = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 2200;
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
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [progress, onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[10000] bg-[#fafafa] flex flex-col items-center justify-center overflow-hidden"
      initial={{ y: 0 }}
      exit={{ y: '-100%' }}
      transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
    >
      <div className="relative flex flex-col items-center">
        {/* AB Monogram Logo - No container circle as per specs */}
        <div className="mb-12">
          <ABLogo size={100} inverted={false} />
        </div>

        {/* Name Text */}
        <motion.h2 
          className="font-heavy text-[28px] tracking-[0.3em] text-[#0c1a3a] mb-8"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          ALINS BINU
        </motion.h2>

        {/* Progress Bar - thin 2px */}
        <div className="w-64 h-[2px] bg-[#94a3b8]/20 relative overflow-hidden mb-3">
          <motion.div
            className="absolute top-0 left-0 h-full bg-[#38bdf8]"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.1, ease: 'linear' }}
          />
        </div>

        <span className="text-[#94a3b8] text-[11px] tracking-[0.15em] font-medium">
          Loading experience...
        </span>
      </div>
    </motion.div>
  );
};
