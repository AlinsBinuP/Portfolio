import React from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { Search, Lightbulb, FlaskConical, PenTool, Code2, Rocket } from 'lucide-react';

const STEPS = [
  { 
    id: 'research',
    icon: Search, 
    label: 'Research', 
    desc: 'Explore problems\ndeeply', 
    side: 'left',
    color: '#ef4444', // Red
    pos: { top: '10%', left: '5%' }
  },
  { 
    id: 'ideate',
    icon: Lightbulb, 
    label: 'Ideate', 
    desc: 'Turn insights\ninto concepts', 
    side: 'left',
    color: '#8b5cf6', // Purple
    pos: { top: '45%', left: '0%' }
  },
  { 
    id: 'test',
    icon: FlaskConical, 
    label: 'Test', 
    desc: 'Refining for\nperfection', 
    side: 'left',
    color: '#f97316', // Orange
    pos: { top: '80%', left: '5%' }
  },
  { 
    id: 'design',
    icon: PenTool, 
    label: 'Design', 
    desc: 'Craft intuitive\ninterfaces', 
    side: 'right',
    color: '#3b82f6', // Blue
    pos: { top: '10%', right: '5%' }
  },
  { 
    id: 'build',
    icon: Code2, 
    label: 'Build', 
    desc: 'Engineering\nrobust solutions', 
    side: 'right',
    color: '#ec4899', // Pink
    pos: { top: '45%', right: '0%' }
  },
  { 
    id: 'deploy',
    icon: Rocket, 
    label: 'Deploy', 
    desc: 'Delivering impact\nat scale', 
    side: 'right',
    color: '#06b6d4', // Cyan
    pos: { top: '80%', right: '5%' }
  },
];

import { InteractiveTitle } from './InteractiveTitle';

export const Ideation = () => {
  return (
    <section className="py-32 px-8 lg:px-24 bg-white overflow-hidden flex flex-col items-center select-none relative">
      <div className="max-w-7xl w-full flex flex-col gap-20 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col gap-2">
           <div className="flex flex-col gap-2 cursor-default w-fit">
              <InteractiveTitle 
                text="IDEATION PROCESS" 
                highlight="PROCESS"
                className="text-4xl md:text-5xl font-display font-black tracking-tighter text-[#1a1a2e]" 
              />
              <div className="w-20 h-1 bg-gradient-to-r from-purple-600 to-transparent rounded-full" />
           </div>
        </div>

        {/* Central Visualization Area */}
        <div className="relative w-full h-[600px] flex items-center justify-center mt-10">
           
           {/* Orbiting Lines */}
           <div className="absolute inset-0 flex items-center justify-center">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="absolute w-[600px] h-[350px] border border-blue-100 rounded-[100%] opacity-40 rotate-[25deg]"
              />
              <motion.div 
                animate={{ rotate: -360 }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                className="absolute w-[550px] h-[400px] border border-purple-100 rounded-[100%] opacity-40 -rotate-[15deg]"
              />
              
              {/* Orbiting Particles */}
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ 
                    rotate: 360,
                    scale: [1, 1.2, 1]
                  }}
                  transition={{ 
                    rotate: { duration: 15 + i * 5, repeat: Infinity, ease: "linear" },
                    scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                  }}
                  className="absolute w-2 h-2 rounded-full blur-[1px]"
                  style={{ 
                    backgroundColor: i % 2 === 0 ? '#8b5cf6' : '#3b82f6',
                    offsetPath: i % 2 === 0 ? 'ellipse(300px 175px at center)' : 'ellipse(275px 200px at center)',
                    offsetDistance: `${i * 72}%`
                  }}
                />
              ))}
           </div>

           {/* Central Brain */}
           <motion.div
             initial={{ scale: 0.8, opacity: 0 }}
             whileInView={{ scale: 1, opacity: 1 }}
             viewport={{ once: true }}
             animate={{ 
               y: [0, -20, 0],
               filter: ["brightness(1) contrast(1)", "brightness(1.1) contrast(1.05)", "brightness(1) contrast(1)"]
             }}
             transition={{ 
               y: { duration: 6, repeat: Infinity, ease: "easeInOut" },
               filter: { duration: 4, repeat: Infinity, ease: "easeInOut" }
             }}
             className="relative z-20 w-[450px] h-[450px]"
           >
              <img src="/brain_3d.png" className="w-full h-full object-contain drop-shadow-[0_0_80px_rgba(139,92,246,0.2)]" alt="3D Brain" />
              {/* Core Glow */}
              <div className="absolute inset-0 bg-blue-500/10 blur-[100px] -z-10 rounded-full" />
              <div className="absolute inset-0 bg-purple-500/5 blur-[120px] -z-10 rounded-full animate-pulse" />
           </motion.div>

           {/* Process Steps Overlay */}
           <div className="absolute inset-0 pointer-events-none">
              {STEPS.map((step, i) => (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, x: step.side === 'left' ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + i * 0.1, duration: 0.8 }}
                  className="absolute pointer-events-auto flex items-center gap-6 group"
                  style={{ 
                    ...step.pos,
                    flexDirection: step.side === 'left' ? 'row' : 'row-reverse'
                  }}
                >
                   {/* Icon Bubble */}
                   <div className="relative">
                      <motion.div 
                        whileHover={{ scale: 1.1, rotate: 10 }}
                        className="w-16 h-16 rounded-full bg-white border border-gray-100 shadow-[0_10px_30px_rgba(0,0,0,0.05)] flex items-center justify-center transition-all group-hover:border-[var(--step-color)]"
                        style={{ '--step-color': step.color } as any}
                      >
                         <step.icon className="w-6 h-6 text-gray-400 group-hover:text-[var(--step-color)] transition-colors" />
                      </motion.div>
                      {/* Sub-dot indicator */}
                      <div 
                        className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-4 border-white shadow-sm"
                        style={{ backgroundColor: step.color }}
                      />
                   </div>

                   {/* Text Content */}
                   <div className={`flex flex-col ${step.side === 'left' ? 'items-start' : 'items-end'} transition-transform group-hover:translate-x-2`}>
                      <span className="text-[12px] font-black text-[#1a1a2e] uppercase tracking-tighter leading-none group-hover:text-[var(--step-color)] transition-colors">
                        {step.label}
                      </span>
                      <p className={`text-[10px] text-gray-400 font-medium leading-tight whitespace-pre-line mt-1 ${step.side === 'left' ? 'text-left' : 'text-right'}`}>
                        {step.desc}
                      </p>
                   </div>
                </motion.div>
              ))}
           </div>

        </div>
      </div>

      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-purple-50/30 blur-[150px] -z-10 rounded-full" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-50/20 blur-[120px] -z-10 rounded-full" />
    </section>
  );
};

