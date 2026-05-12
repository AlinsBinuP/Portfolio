import React from 'react';
import { motion } from 'framer-motion';

interface SectionTitleProps {
  main: string;
  highlight: string;
  className?: string;
}

export const SectionTitle: React.FC<SectionTitleProps> = ({ main, highlight, className = "" }) => {
  return (
    <motion.h2
      className={`text-4xl md:text-5xl font-black tracking-tight uppercase leading-none cursor-default transition-all duration-300 ${className}`}
      whileHover={{ 
        scale: 1.05,
        color: "#6366f1",
      }}
    >
      <span className="text-[#0c0a28]">{main} </span>
      <span className="text-indigo-600">{highlight}</span>
    </motion.h2>
  );
};
