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
      className="fixed inset-0 z-[10000] bg-[var(--bg-primary)] flex flex-col items-center justify-center overflow-hidden"
      initial={{ y: 0 }}
      exit={{ y: '-100%' }}
      transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
    >
      <div className="preloader-grid absolute inset-0 opacity-[0.03] dark:opacity-10 bg-grid-dot" />
      
      <div className="relative flex flex-col items-center">
        {/* Monogram Logo */}
        <div className="mb-12">
          <ABLogo size={100} inverted={true} />
        </div>

        {/* Name Text */}
        <motion.h2 
          className="font-display font-black text-[32px] tracking-[0.4em] text-[var(--text-primary)] mb-8 uppercase"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          ALINS BINU
        </motion.h2>

        {/* Progress Bar */}
        <div className="w-64 h-[2px] bg-[var(--glass-border)] relative overflow-hidden mb-3">
          <motion.div
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-cyan-400 to-purple-500 shadow-[0_0_15px_rgba(34,211,238,0.5)]"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.1, ease: 'linear' }}
          />
        </div>

        <span className="text-[var(--text-secondary)]/40 text-[10px] tracking-[0.3em] font-mono uppercase">
          Initializing Codex... {Math.round(progress)}%
        </span>
      </div>
    </motion.div>
  );
};
