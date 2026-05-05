import React from 'react';
import { motion } from 'framer-motion';

interface SectionLabelProps {
  number: string;
  label: string;
  side?: 'left' | 'right';
}

export const SectionLabel: React.FC<SectionLabelProps> = ({ number, label, side = 'left' }) => {
  return (
    <div className={`absolute ${side === 'left' ? 'left-8 md:left-20' : 'right-8 md:right-20'} top-0 h-full pointer-events-none hidden xl:flex flex-col items-center py-40 z-10`}>
      <motion.div 
        initial={{ height: 0 }}
        whileInView={{ height: '100px' }}
        transition={{ duration: 1.5, ease: "circOut" }}
        className="w-[1px] bg-gradient-to-b from-transparent via-indigo-500/30 to-transparent mb-8"
      />
      <div className="flex flex-col items-center gap-4">
        <span className="mono-label text-indigo-500 font-bold">{number}</span>
        <span className="text-vertical mono-label opacity-20 h-40 flex items-center justify-center">
          {label}
        </span>
      </div>
      <motion.div 
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        transition={{ duration: 2, ease: "circOut" }}
        className="flex-grow w-[1px] bg-gradient-to-b from-transparent via-[var(--glass-border)] to-transparent mt-8 origin-top"
      />
    </div>
  );
};
