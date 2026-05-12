import React from 'react';
import { motion } from 'framer-motion';

interface SmartphoneFrameProps {
  children: React.ReactNode;
  className?: string;
  glowOpacity?: any; // MotionValue
}

export const SmartphoneFrame: React.FC<SmartphoneFrameProps> = ({ children, className, glowOpacity = 0 }) => {
  return (
    <div className={`relative mx-auto ${className}`} style={{ width: '300px', height: '600px' }}>
      {/* Outer Frame */}
      <div className="absolute inset-0 bg-[#1a1a1a] rounded-[50px] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] border-[8px] border-[#2a2a2a] overflow-hidden">

        {/* Screen Container */}
        <div className="absolute inset-0 bg-black rounded-[42px] overflow-hidden">
          {children}
          
          {/* Edge Glow (Neon Effect) */}
          <motion.div 
            style={{ opacity: glowOpacity }}
            className="absolute inset-0 border-2 border-indigo-500/50 rounded-[42px] pointer-events-none z-10 shadow-[inset_0_0_20px_rgba(99,102,241,0.4)]"
          />
        </div>

        {/* Dynamic Island / Notch */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-full z-30 flex items-center justify-center">
          <div className="w-2 h-2 bg-[#1a1a1a] rounded-full ml-12" />
          <div className="w-1 h-1 bg-[#222] rounded-full ml-2" />
        </div>

        {/* Glossy Reflection */}
        <div className="absolute inset-0 pointer-events-none z-20 bg-gradient-to-tr from-white/5 to-transparent opacity-30" />
      </div>

      {/* Side Buttons */}
      <div className="absolute -left-[2px] top-24 w-[4px] h-12 bg-[#333] rounded-r-sm" />
      <div className="absolute -left-[2px] top-40 w-[4px] h-12 bg-[#333] rounded-r-sm" />
      <div className="absolute -right-[2px] top-32 w-[4px] h-16 bg-[#333] rounded-l-sm" />

      {/* Speaker Grill */}
      <div className="absolute top-2 left-1/2 -translate-x-1/2 w-12 h-1 bg-[#222] rounded-full z-40" />
    </div>
  );
};
