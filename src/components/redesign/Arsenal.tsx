import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

const TECH = [
  { name: "Flutter", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg" },
  { name: "Dart", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg" },
  { name: "Firebase", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" },
  { name: "React", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "Node.js", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
  { name: "Python", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { name: "GitHub", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
  { name: "Git", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
  { name: "VS Code", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" },
  { name: "Android Studio", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/androidstudio/androidstudio-original.svg" },
  { name: "Figma", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
  { name: "MongoDB", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
];

import { InteractiveTitle } from './InteractiveTitle';

export const Arsenal = () => {
  return (
    <section className="py-24 px-8 lg:px-24 bg-white overflow-hidden flex flex-col items-center select-none">
      <div className="max-w-7xl w-full flex flex-col gap-16">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
           <div className="flex flex-col gap-3">
              <InteractiveTitle 
                text="THE ARSENAL" 
                highlight="ARSENAL"
                gradient="ocean-blue"
                isGradient={true}
                className="text-4xl md:text-5xl font-display font-black tracking-tighter text-[#1a1a2e]" 
              />
              <p className="text-base text-gray-400 font-medium leading-relaxed max-w-sm">
                Tools, technologies and superpowers I use to build high-performance products.
              </p>
           </div>

           <div className="z-[100] relative">
             <Link
               to="/skills"
               className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-indigo-600 hover:text-indigo-800 transition-all group px-4 py-2 border border-transparent hover:border-indigo-100 rounded-xl bg-white/50 backdrop-blur-sm"
             >
               <span>View All Skills</span> 
               <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
             </Link>
           </div>
        </div>

        {/* Tech Slider Container */}
        <div className="relative flex items-center group">
           <div className="flex-1 overflow-hidden py-4">
              <motion.div 
                className="flex gap-10 w-fit"
                animate={{ x: ["0%", "-50%"] }}
                transition={{ 
                   duration: 30, 
                   repeat: Infinity, 
                   ease: "linear" 
                }}
              >
                 {/* Double the items for seamless loop */}
                 {[...TECH, ...TECH].map((t, i) => (
                   <div key={i} className="flex flex-col items-center gap-4 flex-shrink-0">
                      <motion.div 
                        whileHover={{ y: -8, scale: 1.02 }}
                        className="w-32 h-32 bg-white rounded-[32px] border border-gray-50 shadow-[0_15px_40px_rgba(0,0,0,0.04)] flex items-center justify-center p-8 group cursor-pointer transition-all hover:shadow-[0_25px_60px_rgba(99,102,241,0.08)]"
                      >
                         <img 
                           src={t.img} 
                           className="w-full h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-500 transform group-hover:scale-110" 
                           alt={t.name} 
                         />
                      </motion.div>
                      <span className="text-[12px] font-bold text-gray-400 group-hover:text-[#1a1a2e] transition-colors uppercase tracking-widest opacity-80">
                         {t.name}
                      </span>
                   </div>
                 ))}
              </motion.div>
           </div>
        </div>

      </div>
    </section>
  );
};
