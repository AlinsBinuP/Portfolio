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
import { Magnetic } from '../components/Magnetic';

export const Skills = () => {
  return (
    <div className="relative min-h-screen pt-48 pb-60 overflow-hidden bg-transparent">
      {/* Background depth & Splash */}
      <div className="absolute inset-0 z-0 pointer-events-none">
         <div className="holi-splash w-[900px] h-[900px] bg-[var(--accent-primary)] top-[-10%] left-[-10%] opacity-10" />
         <div className="holi-splash w-[800px] h-[800px] bg-[var(--accent-secondary)] bottom-[-10%] right-[-10%] opacity-10" />
         <div className="holi-splash w-[600px] h-[600px] bg-[var(--accent-tertiary)] top-[20%] right-[30%] opacity-05" />
      </div>

      <div className="max-w-7xl mx-auto px-6 mb-24 text-center relative z-10">
        <motion.span 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-[var(--accent-primary)] font-mono text-[11px] font-bold tracking-[0.5em] mb-6 block uppercase opacity-90"
        >
          // PERFORMANCE ENGINE
        </motion.span>
        
        <Magnetic strength={20}>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-7xl md:text-[8vw] font-display font-black tracking-tighter leading-none text-[var(--text-primary)] uppercase cursor-default"
          >
            THE ARSENAL.
          </motion.h2>
        </Magnetic>
        
        <p className="text-[var(--text-secondary)] text-xl font-sans font-light italic mt-6 max-w-xl mx-auto">
          A breakdown of the tools and languages that power my hybrid ecosystems.
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div
           initial={{ opacity: 0, scale: 0.95 }}
           whileInView={{ opacity: 1, scale: 1 }}
           transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
           className="watercolor-border p-1 rounded-[40px]"
        >
          <div className="bg-[var(--bg-primary)] rounded-[39px] overflow-hidden">
            <SkillsUniverse />
          </div>
        </motion.div>
      </div>

      <div className="max-w-2xl mx-auto px-6 mt-24 text-center relative z-10">
        <div className="flex flex-wrap justify-center gap-6 mb-16">
           {[
             { label: 'Core Stack', count: '2', color: 'bg-[var(--accent-primary)]' },
             { label: 'Tools', count: '4', color: 'bg-[var(--accent-secondary)]' },
             { label: 'Languages', count: '6', color: 'bg-emerald-500' }
           ].map(cat => (
             <span key={cat.label} className="px-6 py-2.5 bg-[var(--bg-secondary)] border border-[var(--glass-border)] shadow-sm rounded-xl flex items-center gap-4">
               <span className={`w-2 h-2 rounded-full ${cat.color} animate-pulse`} />
               <span className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-[var(--text-secondary)]">{cat.label}</span>
               <span className="text-[10px] font-sans font-bold text-[var(--text-primary)]/40">· {cat.count}</span>
             </span>
           ))}
        </div>
        
        <p className="text-[var(--text-secondary)] text-[10px] font-mono tracking-[0.3em] leading-relaxed max-w-lg mx-auto font-bold uppercase opacity-40">
          HOVER AND INTERACT WITH THE ORBITAL SYSTEM. EACH NODE REACTS TO YOUR CURSOR AND SHOWS DEEPER PROFICIENCY DATA.
        </p>
      </div>

    </div>
  );
};
