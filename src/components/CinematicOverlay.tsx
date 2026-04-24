import React from 'react';
import { motion } from 'framer-motion';

export const CinematicOverlay = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      {/* Noise Grain */}
      <div className="absolute inset-0 opacity-[0.03] noise-bg" />
      
      {/* Vignette */}
      <div className="absolute inset-0 shadow-[inset_0_0_200px_rgba(0,0,0,0.5)] md:shadow-[inset_0_0_300px_rgba(0,0,0,0.6)]" />
      
      {/* Scanline Effect */}
      <div className="absolute inset-0 bg-scanline opacity-[0.02] pointer-events-none" />

      {/* Subtle Lens Flare (Top Right) */}
      <motion.div 
        animate={{ 
          opacity: [0.1, 0.2, 0.1],
          scale: [1, 1.1, 1] 
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-sky-blue-glow blur-[150px] mix-blend-screen opacity-20"
      />

      {/* Subtle Lens Flare (Bottom Left) */}
      <motion.div 
        animate={{ 
          opacity: [0.05, 0.1, 0.05],
          scale: [1.1, 1, 1.1] 
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute -bottom-60 -left-60 w-[800px] h-[800px] bg-cobalt blur-[200px] mix-blend-screen opacity-10"
      />
    </div>
  );
};
