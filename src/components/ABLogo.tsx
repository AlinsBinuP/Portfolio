import React from 'react';
import { motion } from 'framer-motion';

export const ABLogo = ({ size = 36, inverted = false }: { size?: number, inverted?: boolean }) => {
  const primaryColor = inverted ? "#ffffff" : "#0369a1"; // Blue for A
  const accentColor = "#7c3aed"; // Violet for B
  
  return (
    <div className="relative flex items-center justify-center">
      <svg 
        width={size} 
        height={size} 
        viewBox="0 0 120 120" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        style={{ overflow: 'visible' }}
      >
        <defs>
          <linearGradient id="bGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={accentColor} />
            <stop offset="100%" stopColor="#5b21b6" />
          </linearGradient>
        </defs>
        
        <g>
          {/* Letter A (Triangle, no crossbar) */}
          <motion.path 
            d="M 15 95 L 55 15 L 95 95" 
            stroke={primaryColor} 
            strokeWidth="12" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
          
          {/* Letter B - sharing A's right leg */}
          <motion.path 
            d="M 55 15 H 105 V 55 H 75 M 105 55 V 95 H 95" 
            stroke="url(#bGradient)" 
            strokeWidth="12" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
          />
        </g>
      </svg>
    </div>
  );
};
