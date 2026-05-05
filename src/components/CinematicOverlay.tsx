import React from 'react';
import { motion } from 'framer-motion';

export const CinematicOverlay = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      {/* Noise Grain */}
      <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.04] noise-bg" />
      
      {/* Theme-Aware Vignette */}
      <div className="absolute inset-0 shadow-[inset_0_0_150px_rgba(0,0,0,0.1)] dark:shadow-[inset_0_0_300px_rgba(0,0,0,0.7)] transition-shadow duration-500" />
      
      {/* Scanline Effect */}
      <div className="absolute inset-0 bg-scanline opacity-[0.01] dark:opacity-[0.02] pointer-events-none" />

      {/* Dynamic Lens Flare (Top Right) */}
      <motion.div 
        animate={{ 
          opacity: [0.05, 0.1, 0.05],
          scale: [1, 1.05, 1] 
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-sky-400/10 dark:bg-sky-500/20 blur-[150px] mix-blend-screen opacity-20"
      />

      {/* Dynamic Lens Flare (Bottom Left) */}
      <motion.div 
        animate={{ 
          opacity: [0.03, 0.06, 0.03],
          scale: [1.05, 1, 1.05] 
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute -bottom-60 -left-60 w-[800px] h-[800px] bg-indigo-400/5 dark:bg-indigo-600/15 blur-[200px] mix-blend-screen opacity-10"
      />
    </div>
  );
};
