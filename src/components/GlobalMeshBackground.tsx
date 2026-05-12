import React from 'react';
import { motion } from 'framer-motion';

export const GlobalMeshBackground = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[var(--bg-primary)]">
      {/* 
        Theme-Aware Cinematic Mesh.
        Adapts glows based on .dark class.
      */}

      {/* Dynamic Pulse Top Left */}
      <motion.div
        animate={{
          x: [0, 40, 0],
          y: [0, 60, 0],
          opacity: [0.1, 0.2, 0.1]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-[10%] -left-[10%] w-[60vw] h-[60vh] bg-[var(--glow-cyan)] rounded-full blur-[160px]"
      />

      {/* Dynamic Pulse Center Right */}
      <motion.div
        animate={{
          x: [0, -60, 0],
          y: [0, -30, 0],
          opacity: [0.05, 0.15, 0.05]
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute top-[30%] -right-[10%] w-[50vw] h-[70vh] bg-[var(--glow-purple)] rounded-full blur-[140px]"
      />

      {/* Soft Glow Bottom Center */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.05, 0.1, 0.05]
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-[20%] left-[10%] w-[80vw] h-[50vh] bg-indigo-500/10 rounded-full blur-[180px]"
      />

      {/* Grid Overlay with dynamic tint */}
      <div className="absolute inset-0 bg-grid-dot opacity-[0.08] dark:opacity-20 dark:invert dark:sepia-[0.2] dark:saturate-[2] dark:hue-rotate-[190deg]" />
    </div>
  );
};
