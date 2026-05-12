import React from 'react';
import { motion } from 'framer-motion';

interface ABLogoProps {
  size?: number;
  className?: string;
  color?: string;
}

export const ABLogo: React.FC<ABLogoProps> = ({ size = 48, className = "", color = "#0c0a28" }) => {
  return (
    <motion.div 
      className={`relative flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
      initial="initial"
      whileHover="hover"
      animate="animate"
    >
      <svg 
        viewBox="0 0 100 100" 
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="abGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6366f1" />
            <stop offset="100%" stopColor="#a855f7" />
          </linearGradient>
        </defs>

        {/* Outer Circle (Optional subtle rim) */}
        <circle cx="50" cy="50" r="48" fill="none" stroke="#f1f5f9" strokeWidth="1" />

        {/* Monogram A & B Fusion */}
        {/* The 'A' part */}
        <motion.path
          d="M25 75 L50 25 L75 75"
          stroke="url(#abGradient)"
          strokeWidth="12"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          variants={{
            initial: { pathLength: 0, opacity: 0 },
            animate: { 
              pathLength: 1, 
              opacity: 1,
              transition: { duration: 1.5, ease: "easeInOut" }
            }
          }}
        />

        {/* The 'B' part (Interlocking with A) */}
        <motion.path
          d="M50 25 H70 C85 25 85 45 70 50 C85 55 85 75 70 75 H50"
          stroke={color}
          strokeWidth="12"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          variants={{
            initial: { pathLength: 0, opacity: 0 },
            animate: { 
              pathLength: 1, 
              opacity: 1,
              transition: { duration: 1.5, delay: 0.3, ease: "easeInOut" }
            },
            hover: {
              stroke: "#6366f1",
              transition: { duration: 0.3 }
            }
          }}
        />

        {/* Crossbar for A (Hidden to maintain minimalism, but can be added if needed) */}
        {/* <motion.path d="M38 55 H62" stroke="url(#abGradient)" strokeWidth="8" strokeLinecap="round" /> */}

      </svg>
    </motion.div>
  );
};
