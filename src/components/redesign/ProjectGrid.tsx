import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Plus } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const PROJECTS = [
  { title: 'Light Suvara',   category: 'Church Community App',  image: '/1776942620907.png', color: '#3b82f6', type: 'app' },
  { title: 'Prism Studio',   category: 'AI Content Studio',     image: '/image_fd8fb534.png', color: '#8b5cf6', type: 'web' },
  { title: 'CarDash',        category: 'Automotive Dashboard',  image: '/aauto.jpg',          color: '#0ea5e9', type: 'app' },
];

import { InteractiveTitle } from './InteractiveTitle';

export const ProjectGrid = () => {
  return (
    <section className="py-32 px-8 lg:px-16 bg-white overflow-hidden flex flex-col items-center">
      <div className="max-w-7xl w-full">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-24 gap-8">
          <div className="space-y-4">
             <motion.span 
               initial={{ opacity: 0, x: -20 }}
               whileInView={{ opacity: 1, x: 0 }}
               className="text-indigo-600 font-mono text-[11px] font-bold tracking-[0.4em] uppercase block"
             >
                // Selected Works
             </motion.span>
             <InteractiveTitle 
               text="FEATURED PROJECTS" 
               highlight="PROJECTS"
               gradient="purple-blue"
               className="text-5xl md:text-7xl font-display font-black tracking-tighter text-[#0c0a28]" 
             />
          </div>

          <NavLink to="/projects">
             <motion.button
               whileHover={{ x: 5, color: '#6366f1' }}
               className="flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.3em] text-gray-400 border-b-2 border-gray-100 pb-2 transition-all hover:border-indigo-200"
             >
               View Full Archive <ArrowRight size={16} />
             </motion.button>
          </NavLink>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.title} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

const ProjectCard = ({ project, index }: { project: any, index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex flex-col"
    >
      <div className="relative aspect-[3/4] rounded-[48px] overflow-hidden bg-gray-50 border border-gray-100 shadow-[0_40px_80px_rgba(0,0,0,0.03)] transition-all duration-700 group-hover:shadow-[0_60px_100px_rgba(99,102,241,0.12)] group-hover:border-indigo-100">
         {/* Background Glow */}
         <div 
           className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-700" 
           style={{ background: `radial-gradient(circle at center, ${project.color} 0%, transparent 70%)` }}
         />

         {/* Image Content */}
         <img 
           src={project.image} 
           className="w-full h-full object-cover transition-all duration-1000 grayscale-[40%] group-hover:grayscale-0 group-hover:scale-105" 
           alt={project.title} 
         />

         {/* Glassmorphic Badge Top */}
         <div className="absolute top-8 left-8 flex items-center gap-2">
            <div className="px-4 py-2 rounded-full bg-white/40 backdrop-blur-xl border border-white/40 shadow-sm">
               <span className="text-[10px] font-black text-[#0c0a28] uppercase tracking-widest">{project.category}</span>
            </div>
         </div>

         {/* Floating White icon */}
         <div className="absolute top-8 right-8 w-12 h-12 bg-white text-[#0c0a28] rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 shadow-xl border border-gray-100">
            <ArrowRight size={20} />
         </div>

         {/* Bottom Info Overlay - White Text for Readability */}
         <div className="absolute inset-x-0 bottom-0 p-10 translate-y-6 group-hover:translate-y-0 transition-transform duration-700 bg-gradient-to-t from-black/60 via-black/20 to-transparent">
            <div className="flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
               <span className="text-[10px] font-bold text-indigo-300 uppercase tracking-[0.4em] mb-1">Architecture</span>
               <h3 className="text-3xl font-display font-black text-white uppercase tracking-tighter leading-none shadow-sm">{project.title}</h3>
            </div>
         </div>
      </div>

      {/* Static Labels (Visible when not hovering) */}
      <div className="mt-8 flex justify-between items-center px-6 group-hover:opacity-0 transition-opacity duration-300">
         <div className="flex flex-col gap-1">
            <h3 className="text-lg font-black text-[#0c0a28] uppercase tracking-tighter leading-none">{project.title}</h3>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{project.category}</span>
         </div>
         <div className="w-10 h-[1px] bg-gray-100" />
      </div>
    </motion.div>
  );
};
