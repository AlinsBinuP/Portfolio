import React from 'react';
import { motion } from 'framer-motion';

export const ABLogo = ({ size = 36, inverted = false }: { size?: number, inverted?: boolean }) => {
  const primaryColor = inverted ? "#0c1a3a" : "#00FFFF";
  // Stronger glow and added a dark drop shadow for visibility on light backgrounds
  const glow = inverted ? "drop-shadow(0 0 2px rgba(255,255,255,0.8))" : "drop-shadow(0 0 4px rgba(0,0,0,0.5)) drop-shadow(0 0 12px #00FFFF) drop-shadow(0 0 25px #00CCFF)";
  
  return (
    <div className="relative flex items-center justify-center">
      <svg 
        width={size} 
        height={size} 
        viewBox="0 0 120 120" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        style={{ filter: glow, overflow: 'visible' }}
      >
        <defs>
          <linearGradient id="bGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={inverted ? "#0c1a3a" : "#00FFFF"} />
            <stop offset="100%" stopColor={inverted ? "#1e3a8a" : "#CC00FF"} />
          </linearGradient>
          {/* Subtle drop shadow for the strokes themselves */}
          <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="2" />
            <feOffset dx="1" dy="1" result="offsetblur" />
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.5" />
            </feComponentTransfer>
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        
        <g filter="url(#shadow)">
          {/* Letter A (Triangle, no crossbar) */}
          <motion.path 
            d="M 15 95 L 55 15 L 95 95" 
            stroke={primaryColor} 
            strokeWidth="10" 
            strokeLinecap="square" 
            strokeLinejoin="miter"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
          
          {/* Letter B - sharing A's right leg (55 15 to 95 95) */}
          <motion.path 
            d="M 55 15 H 105 V 55 H 75 M 105 55 V 95 H 95" 
            stroke="url(#bGradient)" 
            strokeWidth="10" 
            strokeLinecap="square" 
            strokeLinejoin="miter"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
          />
        </g>
      </svg>
    </div>
  );
};
