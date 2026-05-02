import React from 'react';
import { motion } from 'framer-motion';

export const GlobalMeshBackground = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#fdfdfd]">
      {/* 
        This global mesh replicates the soft, diffuse, warm aesthetic glow requested.
        Yellow/Amber on the left, Warm Ivory/Peach in the center, Sky Blue on the right.
        It sits behind all transparent sections across the entire site.
      */}
      
      {/* Soft Amber / Yellow Left Glow */}
      <motion.div 
        animate={{ 
          x: [0, 40, 0],
          y: [0, -30, 0],
          scale: [1, 1.05, 1]
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-[10%] -left-[10%] w-[60vw] h-[80vh] bg-[#fde68a]/30 rounded-full blur-[140px] mix-blend-multiply"
      />

      {/* Warm Peach / Ivory Bottom Center Glow */}
      <motion.div 
        animate={{ 
          x: [0, -20, 0],
          y: [0, 40, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute -bottom-[20%] left-[20%] w-[50vw] h-[60vh] bg-[#ffedd5]/40 rounded-full blur-[120px] mix-blend-multiply"
      />
      
      {/* Soft Sky Blue / Teal Right Glow */}
      <motion.div 
        animate={{ 
          x: [0, -40, 0],
          y: [0, 30, 0],
          scale: [1, 1.08, 1]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute top-[15%] -right-[10%] w-[55vw] h-[75vh] bg-[#bae6fd]/30 rounded-full blur-[130px] mix-blend-multiply"
      />

      {/* Very Subtle Noise Overlay to blend the gradients seamlessly */}
      <div 
        className="absolute inset-0 opacity-[0.02] mix-blend-overlay" 
        style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }}
      />
    </div>
  );
};
