import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Download, 
  ArrowRight, 
  Github, 
  Linkedin, 
  Instagram, 
  Mail, 
  Rocket, 
  Code, 
  Coffee, 
  Heart,
  Search,
  Lightbulb,
  Layers,
  Zap,
  Play,
  Plus,
  MapPin,
  Cpu,
  Sparkles,
  Music
} from 'lucide-react';
import { InteractiveTitle } from '../components/redesign/InteractiveTitle';

const STACK_IMAGES = [
  "/about-1.jpg",
  "/about-2.jpg",
  "/about-3.jpg"
];

const STATS = [
  { icon: Rocket, label: "Years of Experience", value: "3+", color: "text-purple-500" },
  { icon: Code, label: "Projects Completed", value: "30+", color: "text-blue-500" },
  { icon: Coffee, label: "Technologies Mastered", value: "15+", color: "text-indigo-500" },
  { icon: Heart, label: "Dedication & Passion", value: "100%", color: "text-rose-500" }
];

const OrbitalRay = () => (
  <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 scale-125">
    <div className="relative w-[600px] h-[300px]">
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 border-[1.5px] border-indigo-400/20 rounded-[100%]"
        style={{ transform: 'rotateX(75deg)' }}
      />
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0"
        style={{ transform: 'rotateX(75deg)' }}
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-indigo-500 rounded-full shadow-[0_0_20px_#6366f1,0_0_40px_#6366f1]" />
      </motion.div>
    </div>
  </div>
);

const DecorativeSparkle = ({ className }: { className?: string }) => (
  <motion.div
    animate={{ 
      scale: [1, 1.5, 1],
      opacity: [0.3, 0.7, 0.3],
      rotate: [0, 45, 0]
    }}
    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
    className={className}
  >
    <Sparkles size={14} className="text-pink-400" />
  </motion.div>
);

export const About = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [stack, setStack] = useState([0, 1, 2]);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleNext = (idx: number) => {
    setActiveIdx(idx);
    setStack(prev => {
      const filtered = prev.filter(item => item !== idx);
      return [idx, ...filtered];
    });
  };

  const cycleStack = () => {
    setStack(prev => {
      const next = [...prev];
      const first = next.shift()!;
      next.push(first);
      setActiveIdx(next[0]);
      return next;
    });
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-white text-[#0c0a28] selection:bg-pink-100 selection:text-pink-900 overflow-x-hidden pb-40">
      
      {/* Dynamic Background with Pink/Rose Glows */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
         <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(#0c0a28 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
         <div className="absolute top-[-10%] right-[-5%] w-[800px] h-[800px] bg-rose-50 blur-[150px] rounded-full opacity-50" />
         <div className="absolute bottom-[-10%] left-[-5%] w-[900px] h-[900px] bg-indigo-50 blur-[150px] rounded-full opacity-30" />
         <div className="absolute top-[30%] left-[20%] w-[500px] h-[500px] bg-purple-50 blur-[120px] rounded-full opacity-40" />
         <div className="absolute bottom-[20%] right-[10%] w-[400px] h-[400px] bg-pink-50/50 blur-[100px] rounded-full opacity-30" />
      </div>

      {/* Social Sidebar */}
      <div className="fixed left-8 top-1/2 -translate-y-1/2 z-50 hidden xl:flex flex-col gap-6 p-4 bg-white/80 backdrop-blur-xl border border-gray-100 rounded-full shadow-2xl shadow-gray-200/50">
        {[
          { Icon: Github, url: "https://github.com/AlinsBinuP" },
          { Icon: Linkedin, url: "https://www.linkedin.com/in/alinsbinu/" },
          { Icon: Instagram, url: "#" },
          { Icon: Mail, url: "mailto:alinsbinukochuthovala@gmail.com" }
        ].map(({ Icon, url }, i) => (
          <motion.a 
            key={i} 
            href={url}
            target="_blank"
            whileHover={{ scale: 1.2, color: '#ec4899' }}
            className="text-gray-400 transition-colors p-2"
          >
            <Icon size={20} />
          </motion.a>
        ))}
      </div>

      <main className="relative pt-40 px-8 lg:px-24 max-w-[1700px] mx-auto z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-24">
          
          {/* Left: Content Area */}
          <div className="lg:col-span-6 flex flex-col gap-10">
            <div className="relative">
              <DecorativeSparkle className="absolute -top-10 -left-10" />
              
              <div className="flex items-center gap-4 mb-8">
                 <span className="text-pink-600 font-black text-xs tracking-widest">01</span>
                 <span className="text-gray-400 font-black text-[10px] uppercase tracking-[0.4em]">Origin Story</span>
              </div>
              
              <div className="flex flex-col">
                 <h1 className="text-7xl md:text-[90px] font-display font-black tracking-tighter leading-[0.8]">
                   Crafting<br/>
                   <div className="relative -mt-2">
                     <InteractiveTitle 
                       text="Intentional" 
                       highlight="Intentional"
                       gradient="purple-pink"
                       className="text-7xl md:text-[90px] font-display font-black" 
                     />
                   </div>
                   <div className="relative -mt-6">
                     <InteractiveTitle 
                       text="Products" 
                       highlight="Products"
                       gradient="rose-pink"
                       className="text-7xl md:text-[90px] font-display font-black" 
                     />
                   </div>
                 </h1>
              </div>

              <div className="mt-10 flex items-center gap-3">
                 <div className="h-[1.5px] w-14 bg-pink-100" />
                 <div className="flex gap-2">
                    {[1, 2, 3].map(i => <div key={i} className="w-1.5 h-1.5 rounded-full bg-rose-200" />)}
                 </div>
              </div>

              <p className="mt-12 text-[18px] text-gray-500 font-medium leading-relaxed max-w-xl">
                I'm Alins Binu, a Computer Science student with a passion for building products that bridge the gap between <span className="text-[#0c0a28] font-black italic underline decoration-rose-100 underline-offset-8">design and engineering.</span> Based in Kattappana, Idukki, I specialize in creating fluid mobile experiences and robust community infrastructure.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-8">
              <motion.a 
                href="/Alins Binu Resume.pdf"
                download="Alins Binu Resume.pdf"
                whileHover={{ scale: 1.05, backgroundColor: '#db2777' }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#0c0a28] text-white px-12 py-5 rounded-[20px] font-black text-[11px] uppercase tracking-widest flex items-center gap-4 shadow-2xl shadow-rose-100 cursor-pointer"
              >
                Download Resume <Download size={18} />
              </motion.a>
              
              <button className="text-[11px] font-black text-gray-400 hover:text-pink-600 transition-colors uppercase tracking-widest flex items-center gap-2 group">
                 Read My Blog <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Play My Story Section */}
            <div className="flex items-center gap-8 py-8 border-t border-gray-50 mt-4 relative">
               <div className="relative group cursor-pointer">
                  <div className="absolute inset-0 bg-pink-500/20 blur-2xl rounded-full animate-pulse" />
                  <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-pink-600 to-rose-400 flex items-center justify-center text-white shadow-xl relative z-10 group-hover:scale-110 transition-transform">
                     <Play fill="white" size={20} />
                  </div>
               </div>
               <div className="flex flex-col">
                  <span className="text-[11px] font-black text-[#0c0a28] uppercase tracking-widest">Play My Story</span>
                  <span className="text-[10px] font-bold text-gray-400 mt-1">Watch the narrative behind the code</span>
               </div>
               <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-10">
                  <Sparkles size={40} className="text-pink-600" />
               </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
              {STATS.map((stat, i) => (
                <div key={i} className="bg-white border border-gray-50 p-6 rounded-[32px] shadow-sm flex flex-col gap-4 group hover:border-pink-100 transition-all">
                  <div className={`w-10 h-10 rounded-2xl bg-rose-50 flex items-center justify-center ${stat.color} group-hover:rotate-12 transition-transform`}>
                    <stat.icon size={18} />
                  </div>
                  <div>
                    <div className="text-2xl font-display font-black text-[#0c0a28] leading-none">{stat.value}</div>
                    <div className="text-[10px] font-bold text-gray-400 uppercase tracking-tight mt-2">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* DEVELOPER ARCHETYPE SECTION */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-4 bg-[#0c0a28] rounded-[40px] p-8 relative overflow-hidden group shadow-2xl shadow-indigo-100"
            >
               <div className="relative z-10 flex flex-col gap-8">
                  <div className="flex items-center justify-between">
                     <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center text-rose-400">
                           <Zap size={20} />
                        </div>
                        <div className="flex flex-col">
                           <span className="text-[11px] font-black text-white uppercase tracking-widest leading-none">Developer Archetype</span>
                           <span className="text-[10px] font-bold text-gray-500 uppercase tracking-tighter mt-1">Specialized Focus Areas</span>
                        </div>
                     </div>
                     <div className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10">
                        <span className="text-[9px] font-black text-rose-400 uppercase tracking-widest">Active Focus</span>
                     </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                     {[
                       { label: 'Mobile Mastery', value: 'Flutter / Dart', icon: Rocket, color: 'text-blue-400' },
                       { label: 'Web Fluidity', value: 'React / Next.js', icon: Layers, color: 'text-indigo-400' },
                       { label: 'AI Orchestration', value: 'Gemini / OpenAI', icon: Sparkles, color: 'text-pink-400' }
                     ].map((focus, i) => (
                       <div key={i} className="flex flex-col gap-3 group/focus">
                          <div className={`w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center ${focus.color} group-hover/focus:scale-110 transition-transform`}>
                             <focus.icon size={16} />
                          </div>
                          <div className="flex flex-col">
                             <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest leading-none">{focus.label}</span>
                             <span className="text-[13px] font-bold text-white mt-1">{focus.value}</span>
                          </div>
                       </div>
                     ))}
                  </div>

                  <div className="flex items-center justify-between pt-6 border-t border-white/5">
                     <p className="text-[11px] text-gray-500 font-medium leading-relaxed max-w-[200px]">
                        Architecting digital solutions with a focus on <span className="text-white">performance & intent.</span>
                     </p>
                     <div className="flex -space-x-3">
                        {[...Array(3)].map((_, i) => (
                           <div key={i} className="w-8 h-8 rounded-full border-2 border-[#0c0a28] bg-white/10 backdrop-blur-md flex items-center justify-center">
                              <div className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
                           </div>
                        ))}
                     </div>
                  </div>
               </div>

               {/* Abstract Background Art */}
               <div className="absolute top-0 right-0 w-48 h-48 bg-rose-500/10 blur-[100px] rounded-full translate-x-10 -translate-y-10" />
               <div className="absolute bottom-0 left-0 w-40 h-40 bg-indigo-500/10 blur-[80px] rounded-full -translate-x-10 translate-y-10" />
            </motion.div>
          </div>

          {/* Right: Visual Stack Area */}
          <div className="lg:col-span-6 relative h-[800px] flex items-center justify-center perspective-[2000px] lg:sticky lg:top-20">
            
            <OrbitalRay />
            <DecorativeSparkle className="absolute top-1/4 right-0" />
            <DecorativeSparkle className="absolute bottom-1/4 left-0" />

            {/* Floating Element */}
            <motion.div 
              animate={{ y: [0, -15, 0], rotate: [0, 15, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-10 right-20 w-12 h-12 bg-white/90 backdrop-blur-md rounded-2xl shadow-xl border border-rose-50 flex items-center justify-center z-20"
            >
               <Cpu size={20} className="text-rose-400" />
            </motion.div>

            {/* Image Stack */}
            <div className="relative z-10 w-full max-w-[460px] aspect-[4/5] cursor-pointer" onClick={cycleStack}>
               <AnimatePresence mode="popLayout">
                 {stack.map((imgIdx, position) => (
                   <motion.div
                     key={imgIdx}
                     layout
                     initial={{ opacity: 0, scale: 0.8, x: 50 }}
                     animate={{ 
                       opacity: 1 - position * 0.15, 
                       x: position * 15, 
                       y: position * 15, 
                       rotateY: -20, 
                       rotateX: 10,
                       rotateZ: position * 2,
                       scale: 1 - position * 0.05,
                       zIndex: 10 - position 
                     }}
                     exit={{ opacity: 0, scale: 0.5, x: -100 }}
                     transition={{ type: "spring", stiffness: 300, damping: 30 }}
                     className="absolute inset-0 bg-white p-3 rounded-[56px] shadow-[30px_60px_100px_rgba(0,0,0,0.08)] border border-gray-100 overflow-hidden"
                   >
                      <img src={STACK_IMAGES[imgIdx]} className="w-full h-full object-cover rounded-[46px]" alt={`About ${imgIdx}`} />
                      
                      {/* Interactive Badges (Main Card) */}
                      {position === 0 && (
                        <>
                          <motion.div 
                            initial={{ x: 20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            className="absolute top-10 -left-8 bg-white/95 backdrop-blur-md px-6 py-4 rounded-[28px] shadow-2xl border border-rose-50 flex items-center gap-4 z-30"
                          >
                             <div className="w-10 h-10 rounded-2xl bg-rose-50 flex items-center justify-center text-rose-600">
                               <Rocket size={18} />
                             </div>
                             <div className="flex flex-col">
                               <span className="text-xl font-black text-[#0c0a28] leading-none">3+</span>
                               <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tight">Years Journey</span>
                             </div>
                          </motion.div>
                        </>
                      )}
                   </motion.div>
                 ))}
               </AnimatePresence>
            </div>

            {/* Decorative Scroll Label */}
            <div className="absolute -bottom-10 right-0 z-20 flex flex-col items-end gap-2">
               <span className="text-xs font-black text-pink-600 italic">3 Moments.</span>
               <span className="text-xs font-black text-gray-400 italic">One Journey.</span>
               <div className="w-12 h-12 rounded-full border-2 border-dashed border-pink-100 mt-2 flex items-center justify-center">
                  <ArrowRight size={20} className="text-gray-300 rotate-45" />
               </div>
            </div>
          </div>
        </div>
      </main>

    </div>
  );
};
