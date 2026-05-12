import React from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { TrendingUp, ChevronDown, Coffee, Infinity as InfinityIcon, Users, Briefcase } from 'lucide-react';

const TASKS = [
  { name: "CarDash Mobile App", role: "Full Stack Development", progress: 85, color: "from-blue-600 to-indigo-400" },
];

const STATS = [
  { label: 'Active Projects', value: '1', icon: Briefcase, color: 'text-blue-600' },
  { label: 'Collaborations', value: '0', icon: Users, color: 'text-pink-500' },
  { label: 'Ideas Brewing', value: '5+', icon: InfinityIcon, color: 'text-purple-600' },
  { label: 'Cups of Coffee', value: '140+', icon: Coffee, color: 'text-indigo-600' },
];

const WEEKLY_DATA = [30, 45, 35, 55, 40, 65, 50]; // Productivity per day

import { InteractiveTitle } from './InteractiveTitle';

export const StatusBoard = () => {
  return (
    <section className="py-32 px-8 lg:px-24 bg-white overflow-hidden flex flex-col items-center select-none">
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        
        {/* Left Side: Tasks & Stats (8 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-12">
          
          {/* Header */}
          <div className="flex flex-col gap-3 cursor-default w-fit">
             <InteractiveTitle 
               text="WHAT I'M WORKING ON" 
               highlight="WORKING ON"
               gradient="rose-pink"
               className="text-4xl md:text-5xl font-display font-black tracking-tighter text-[#1a1a2e]" 
             />
             <p className="text-base text-gray-400 font-medium tracking-tight">
               Real time updates from my universe.
             </p>
          </div>

          {/* Stats Container */}
          <div className="bg-gray-50/30 rounded-[32px] p-8 border border-gray-100/50 grid grid-cols-2 md:grid-cols-4 gap-8 shadow-sm">
             {STATS.map(s => (
               <div key={s.label} className="flex flex-col gap-1">
                  <span className={`text-2xl font-black ${s.color} leading-none flex items-center gap-2`}>
                    {s.value}
                  </span>
                  <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">{s.label}</span>
               </div>
             ))}
          </div>

          {/* Task List */}
          <div className="flex flex-col gap-10 pr-4">
             {TASKS.map((task, i) => (
               <motion.div 
                 key={task.name}
                 initial={{ opacity: 0, x: -20 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 viewport={{ once: true }}
                 transition={{ delay: i * 0.1 }}
                 className="flex flex-col gap-4 group"
               >
                  <div className="flex justify-between items-end">
                     <div className="flex flex-col">
                        <span className="text-sm font-black text-[#1a1a2e] uppercase tracking-tight group-hover:text-indigo-600 transition-colors">
                          {task.name}
                        </span>
                        <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-1">{task.role}</span>
                     </div>
                     <span className="text-[12px] font-black text-[#1a1a2e]">{task.progress}%</span>
                  </div>
                  <div className="w-full h-[4px] bg-gray-50 rounded-full overflow-hidden">
                     <motion.div 
                       initial={{ width: 0 }}
                       whileInView={{ width: `${task.progress}%` }}
                       transition={{ duration: 1.5, ease: "circOut", delay: 0.5 + i * 0.1 }}
                       className={`h-full bg-gradient-to-r ${task.color} shadow-[0_0_10px_rgba(99,102,241,0.2)]`}
                     />
                  </div>
               </motion.div>
             ))}
          </div>
        </div>

        {/* Right Side: Productivity Dashboard (5 cols) */}
        <div className="lg:col-span-5 w-full">
           <div className="bg-white rounded-[48px] p-10 border border-gray-100 shadow-[0_30px_100px_rgba(0,0,0,0.04)] flex flex-col gap-10 relative overflow-hidden group/dash transition-transform duration-500 hover:scale-[1.01]">
              
              {/* Card Header */}
              <div className="flex justify-between items-center relative z-10">
                 <span className="text-[11px] font-black text-[#1a1a2e] uppercase tracking-widest">FOCUS MODE</span>
                 <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-2xl border border-gray-100 cursor-pointer hover:bg-gray-100 transition-colors">
                    <span className="text-[10px] font-bold text-gray-500 uppercase">This Week</span>
                    <ChevronDown size={12} className="text-gray-400" />
                 </div>
              </div>

              {/* Central Productivity Chart */}
              <div className="flex flex-col items-center justify-center relative py-4">
                 <svg className="w-56 h-56 transform -rotate-90">
                    <circle cx="112" cy="112" r="90" fill="none" stroke="#f8fafc" strokeWidth="16" />
                    <motion.circle 
                      cx="112" cy="112" r="90" fill="none" stroke="url(#prod-gradient)" strokeWidth="16" 
                      strokeDasharray="565" 
                      strokeLinecap="round"
                      initial={{ strokeDashoffset: 565 }}
                      whileInView={{ strokeDashoffset: 565 * (1 - 0.87) }}
                      viewport={{ once: true }}
                      transition={{ duration: 2.5, ease: [0.22, 1, 0.36, 1] }}
                    />
                    <defs>
                       <linearGradient id="prod-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#8b5cf6" />
                          <stop offset="100%" stopColor="#3b82f6" />
                       </linearGradient>
                    </defs>
                 </svg>
                 <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <motion.span 
                      initial={{ scale: 0.5, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      className="text-6xl font-display font-black text-[#1a1a2e] tracking-tighter"
                    >
                      87%
                    </motion.span>
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">Productivity</span>
                 </div>
              </div>

              {/* Legend & Mini Metrics */}
              <div className="flex flex-col gap-4 relative z-10">
                 {[
                   { label: 'Focus', value: '72%', color: 'bg-indigo-600' },
                   { label: 'Break', value: '18%', color: 'bg-indigo-200' },
                   { label: 'Other', value: '10%', color: 'bg-gray-100' },
                 ].map((l, i) => (
                   <div key={l.label} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                         <div className={`w-2.5 h-2.5 rounded-full ${l.color} shadow-sm`} />
                         <span className="text-[10px] font-bold text-gray-400 uppercase">{l.label}</span>
                      </div>
                      <span className="text-[11px] font-black text-[#1a1a2e]">{l.value}</span>
                   </div>
                 ))}
              </div>

              {/* Weekly Line Chart (Custom SVG) */}
              <div className="pt-10 border-t border-gray-50 mt-4">
                 <div className="h-32 w-full relative">
                    <svg viewBox="0 0 700 200" className="w-full h-full overflow-visible">
                       {/* Gradient Fill */}
                       <defs>
                          <linearGradient id="area-gradient" x1="0" y1="0" x2="0" y2="1">
                             <stop offset="0%" stopColor="#6366f1" stopOpacity="0.2" />
                             <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
                          </linearGradient>
                       </defs>
                       
                       {/* Area path */}
                       <motion.path
                         d="M0,200 L0,140 L116,110 L233,130 L350,150 L466,120 L583,100 L700,80 L700,200 Z"
                         fill="url(#area-gradient)"
                         initial={{ opacity: 0 }}
                         whileInView={{ opacity: 1 }}
                       />

                       {/* Line path */}
                       <motion.path
                         d="M0,140 L116,110 L233,130 L350,150 L466,120 L583,100 L700,80"
                         fill="none"
                         stroke="#6366f1"
                         strokeWidth="4"
                         strokeLinecap="round"
                         strokeLinejoin="round"
                         initial={{ pathLength: 0 }}
                         whileInView={{ pathLength: 1 }}
                         transition={{ duration: 2, ease: "easeInOut" }}
                       />

                       {/* Data Points */}
                       {[0, 116, 233, 350, 466, 583, 700].map((x, i) => (
                         <motion.circle
                           key={i}
                           cx={x}
                           cy={[140, 110, 130, 150, 120, 100, 80][i]}
                           r="6"
                           fill="#6366f1"
                           stroke="white"
                           strokeWidth="2"
                           initial={{ scale: 0 }}
                           whileInView={{ scale: 1 }}
                           transition={{ delay: 1 + i * 0.1 }}
                         />
                       ))}
                    </svg>
                 </div>
                 {/* X-Axis Labels */}
                 <div className="flex justify-between mt-4 px-1">
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                      <span key={day} className="text-[9px] font-bold text-gray-300 uppercase">{day}</span>
                    ))}
                 </div>
              </div>

           </div>
        </div>

      </div>
    </section>
  );
};
