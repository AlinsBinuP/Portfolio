import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

const SKILLS = [
  { id: 'flutter', size: 'xl', x: 20, y: 10, color: '#02569B' },
  { id: 'dart', size: 'xl', x: -15, y: -15, color: '#0175C2' },
  { id: 'firebase', size: 'l', x: 40, y: -30, color: '#FFCA28' },
  { id: 'python', size: 'm', x: -45, y: 20, color: '#3776AB' },
  { id: 'js', size: 'm', x: 10, y: 40, color: '#F7DF1E' },
  { id: 'html', size: 's', x: 50, y: 30, color: '#E34F26' },
  { id: 'css', size: 's', x: 60, y: 10, color: '#1572B6' },
  { id: 'git', size: 'm', x: -60, y: -40, color: '#F05032' },
  { id: 'github', size: 'm', x: -40, y: -50, color: '#181717' },
  { id: 'androidstudio', size: 'l', x: -70, y: 10, color: '#3DDC84' },
  { id: 'vscode', size: 'm', x: 70, y: -40, color: '#007ACC' },
  { id: 'java', size: 's', x: -80, y: 40, color: '#007396' },
  { id: 'c', size: 's', x: -20, y: 60, color: '#00599C' }
];

const getSizeValue = (size: string) => {
  switch(size) {
    case 'xl': return 160;
    case 'l': return 130;
    case 'm': return 100;
    case 's': return 80;
    default: return 100;
  }
};

import { SkillsUniverse } from '../components/SkillsUniverse';

export const Skills = () => {
  return (
    <div className="relative min-h-screen pt-48 pb-60 overflow-hidden bg-transparent">
      {/* Background depth */}
      <div className="absolute inset-0 z-0 pointer-events-none">
         <div className="absolute top-0 left-0 w-full h-[60vh] bg-[radial-gradient(ellipse_at_center,_#c8e8ff_0%,_transparent_70%)] opacity-30" />
      </div>

      <div className="max-w-7xl mx-auto px-6 mb-24 text-center relative z-10">
        <motion.span 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-sky-700 font-mono text-[11px] font-bold tracking-[0.5em] mb-6 block uppercase opacity-70"
        >
          // PERFORMANCE ENGINE
        </motion.span>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-7xl md:text-[8vw] font-display font-extrabold tracking-tighter leading-none text-[#0a0a0a] uppercase"
        >
          THE ARSENAL.
        </motion.h2>
        <p className="text-[#64748b] text-xl font-sans font-light italic mt-6 max-w-xl mx-auto opacity-80">
          A breakdown of the tools and languages that power my hybrid ecosystems.
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div
           initial={{ opacity: 0, scale: 0.95 }}
           whileInView={{ opacity: 1, scale: 1 }}
           transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <SkillsUniverse />
        </motion.div>
      </div>

      <div className="max-w-2xl mx-auto px-6 mt-24 text-center relative z-10">
        <div className="flex flex-wrap justify-center gap-6 mb-16">
           {[
             { label: 'Core Stack', count: '2', color: 'bg-sky-700' },
             { label: 'Tools', count: '4', color: 'bg-violet-600' },
             { label: 'Languages', count: '6', color: 'bg-emerald-500' }
           ].map(cat => (
             <span key={cat.label} className="px-6 py-2.5 bg-white border border-black/[0.06] shadow-sm rounded-xl flex items-center gap-4">
               <span className={`w-2 h-2 rounded-full ${cat.color}`} />
               <span className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-[#475569]">{cat.label}</span>
               <span className="text-[10px] font-sans font-bold text-[#94a3b8]">· {cat.count}</span>
             </span>
           ))}
        </div>
        
        <p className="text-[#94a3b8] text-[10px] font-mono tracking-[0.3em] leading-relaxed max-w-lg mx-auto font-bold uppercase opacity-60">
          HOVER AND INTERACT WITH THE ORBITAL SYSTEM. EACH NODE REACTS TO YOUR CURSOR AND SHOWS DEEPER PROFICIENCY DATA.
        </p>
      </div>

    </div>
  );
};
