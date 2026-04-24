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
    <div className="relative min-h-screen pt-48 pb-40 overflow-hidden bg-transparent">
      <div className="max-w-7xl mx-auto px-6 mb-20 text-center relative z-10">
        <motion.span 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-sky-blue-glow font-mono text-sm tracking-[0.4em] mb-4 block drop-shadow-glow"
        >
          // PERFORMANCE ENGINE
        </motion.span>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-6xl md:text-9xl font-display font-black tracking-tight leading-none"
        >
          The Arsenal.
        </motion.h2>
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div
           initial={{ opacity: 0, scale: 0.95 }}
           whileInView={{ opacity: 1, scale: 1 }}
           transition={{ duration: 1 }}
        >
          <SkillsUniverse />
        </motion.div>
      </div>

      <div className="max-w-2xl mx-auto px-6 mt-16 text-center">
        <div className="flex flex-wrap justify-center gap-4 mb-12">
           {[
             { label: 'Core Stack', count: '2', color: 'bg-sky-blue-glow' },
             { label: 'Tools', count: '4', color: 'bg-indigo-400' },
             { label: 'Languages', count: '5', color: 'bg-emerald-400' }
           ].map(cat => (
             <span key={cat.label} className="px-5 py-2 cinematic-glass border-white/5 flex items-center gap-3">
               <span className={`w-1.5 h-1.5 rounded-full ${cat.color}`} />
               <span className="text-[10px] font-black tracking-widest uppercase text-white/40">{cat.label}</span>
               <span className="text-[10px] font-bold text-white/20">· {cat.count}</span>
             </span>
           ))}
        </div>
        
        <p className="text-white/30 text-sm italic font-light max-w-lg mx-auto">
          Hover and interact with the orbital system. Each node reacts to your cursor and shows deeper proficiency data.
        </p>
      </div>

      {/* Grid Pattern Background */}
      <div className="fixed inset-0 pointer-events-none opacity-5 z-[-1]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>
    </div>
  );
};
