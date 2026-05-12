import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { 
  Search, 
  Layers, 
  Quote, 
  Zap, 
  X, 
  TrendingUp, 
  Activity, 
  ArrowUpRight,
  Hexagon,
  Sparkles,
  BookOpen,
  MousePointer2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Headphones,
  Mail,
  Instagram,
  Linkedin
} from 'lucide-react';
import { SkillsUniverse3D } from '../components/SkillsUniverse3D';
import { AudioPlayer } from '../components/AudioPlayer';

const CATEGORIES = [
  { id: 'all', label: 'ALL', color: 'indigo' },
  { id: 'core', label: 'CORE STACK', color: 'blue' },
  { id: 'frontend', label: 'FRONTEND', color: 'cyan' },
  { id: 'backend', label: 'BACKEND', color: 'emerald' },
  { id: 'tools', label: 'TOOLS', color: 'purple' },
  { id: 'design', label: 'DESIGN', color: 'pink' },
  { id: 'languages', label: 'LANGUAGES', color: 'orange' }
];

const ALL_TOOLS = [
  { id: 'flutter', name: 'Flutter', category: 'core', icon: 'flutter', desc: 'Mastery in building high-performance apps.', level: 98, experience: '3+ Years' },
  { id: 'js', name: 'JavaScript', category: 'languages', icon: 'js', desc: 'The backbone of modern web development.', level: 96, experience: '3+ Years' },
  { id: 'ts', name: 'TypeScript', category: 'languages', icon: 'ts', desc: 'Typed JavaScript for scalable applications.', level: 92, experience: '2+ Years' },
  { id: 'firebase', name: 'Firebase', category: 'backend', icon: 'firebase', desc: 'Real-time database and backend made simple.', level: 95, experience: '3+ Years' },
  { id: 'tailwind', name: 'Tailwind CSS', category: 'frontend', icon: 'tailwind', desc: 'Rapidly build modern websites.', level: 94, experience: '2+ Years' },
  { id: 'react', name: 'React', category: 'frontend', icon: 'react', desc: 'Create interactive user interfaces.', level: 92, experience: '2+ Years' },
  { id: 'nextjs', name: 'Next.js', category: 'frontend', icon: 'nextjs', desc: 'The React framework for production.', level: 85, experience: '1+ Year' },
  { id: 'threejs', name: 'Three.js', category: 'design', icon: 'threejs', desc: '3D graphics on the web.', level: 80, experience: '1+ Year' },
  { id: 'nodejs', name: 'Node.js', category: 'backend', icon: 'nodejs', desc: 'Scalable server-side applications.', level: 88, experience: '2+ Years' },
  { id: 'mongodb', name: 'MongoDB', category: 'backend', icon: 'mongodb', desc: 'NoSQL database for modern apps.', level: 85, experience: '2+ Years' },
  { id: 'sql', name: 'SQL', category: 'backend', icon: 'mysql', desc: 'Relational database management.', level: 82, experience: '2+ Years' },
  { id: 'python', name: 'Python', category: 'languages', icon: 'python', desc: 'Versatile language for AI and backend.', level: 80, experience: '2+ Years' },
  { id: 'java', name: 'Java', category: 'languages', icon: 'java', desc: 'Enterprise-grade application development.', level: 75, experience: '1+ Year' },
  { id: 'dart', name: 'Dart', category: 'languages', icon: 'dart', desc: 'Optimized language for Flutter.', level: 95, experience: '3+ Years' },
  { id: 'github', name: 'GitHub', category: 'tools', icon: 'github', desc: 'Version control and collaboration.', level: 95, experience: '3+ Years' },
  { id: 'git', name: 'Git', category: 'tools', icon: 'git', desc: 'Distributed version control system.', level: 95, experience: '3+ Years' },
  { id: 'figma', name: 'Figma', category: 'design', icon: 'figma', desc: 'Interface design and prototyping.', level: 88, experience: '2+ Years' },
  { id: 'android', name: 'Android Studio', category: 'tools', icon: 'androidstudio', desc: 'The IDE for Android development.', level: 90, experience: '3+ Years' },
  { id: 'vscode', name: 'VS Code', category: 'tools', icon: 'vscode', desc: 'Powerful, extensible code editor.', level: 98, experience: '3+ Years' },
  { id: 'postman', name: 'Postman', category: 'tools', icon: 'postman', desc: 'API development and testing.', level: 85, experience: '1+ Year' },
  { id: 'html5', name: 'HTML5', category: 'frontend', icon: 'html', desc: 'The standard markup for web.', level: 98, experience: '3+ Years' },
  { id: 'css3', name: 'CSS3', category: 'frontend', icon: 'css', desc: 'Stunning layouts and animations.', level: 95, experience: '3+ Years' },
  { id: 'c', name: 'C', category: 'languages', icon: 'c', desc: 'Low-level systems programming.', level: 70, experience: '1+ Year' },
  { id: 'cpp', name: 'C++', category: 'languages', icon: 'cpp', desc: 'Powerful high-performance computing.', level: 75, experience: '1+ Year' }
];

const GENERAL_WORKS_WITH = [
  { name: 'React', icon: 'react' },
  { name: 'Node.js', icon: 'nodejs' },
  { name: 'Firebase', icon: 'firebase' },
  { name: 'Figma', icon: 'figma' },
  { name: 'MongoDB', icon: 'mongodb' },
  { name: 'Git', icon: 'git' }
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, x: 100, rotate: 5 },
  visible: { 
    opacity: 1, 
    x: 0,
    rotate: 0,
    transition: {
      duration: 1,
      type: "spring",
      bounce: 0.3
    }
  }
};

export const Skills = () => {
  const [selectedSkill, setSelectedSkill] = useState<any>(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const scrollRef = useRef<HTMLDivElement>(null);

  const filteredTools = ALL_TOOLS.filter(tool => 
    activeCategory === 'all' || tool.category === activeCategory
  );

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth / 2 : scrollLeft + clientWidth / 2;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#fcfcff] text-[#0c0a28] selection:bg-indigo-600 selection:text-white font-sans pb-32 overflow-x-hidden">
      
      {/* Background Decor Layer */}
      <div className="fixed inset-0 z-0 pointer-events-none">
         <div className="absolute top-[-10%] right-[-5%] w-[900px] h-[900px] bg-indigo-50/60 blur-[180px] rounded-full opacity-70" />
         <div className="absolute bottom-[10%] left-[-10%] w-[700px] h-[700px] bg-purple-50/60 blur-[180px] rounded-full opacity-50" />
      </div>

      <div className="max-w-[1600px] mx-auto px-10 relative z-10 pt-32">
        
        {/* Header Section */}
        <div className="mb-20 flex flex-col lg:flex-row lg:items-start justify-between gap-10">
           <motion.div 
             initial={{ opacity: 0, x: -50 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             className="max-w-3xl"
           >
              <span className="text-[11px] font-black text-purple-500 uppercase tracking-[0.5em] mb-6 block leading-none">{"// PERFORMANCE ENGINE"}</span>
              <h1 className="text-8xl font-display font-black text-[#0c0a28] leading-none tracking-tighter mb-8">
                THE <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">ARSENAL.</span>
              </h1>
              <p className="text-2xl text-gray-400 font-medium leading-relaxed max-w-2xl">
                A powerful ecosystem of tools, technologies and languages that fuel my <span className="text-[#0c0a28] font-bold">creativity</span> and bring <span className="text-[#0c0a28] font-bold">ideas</span> to life.
              </p>
           </motion.div>

           <motion.div 
             initial={{ opacity: 0, x: 50 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             className="bg-white/70 backdrop-blur-3xl border border-white p-8 rounded-[40px] shadow-2xl shadow-indigo-100/20 flex items-center gap-8 min-w-[420px]"
           >
              <div className="w-20 h-20 rounded-2xl bg-black flex items-center justify-center relative shadow-inner border border-gray-800 overflow-hidden p-4">
                 <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" className="w-full h-full object-contain invert" alt="Next.js" />
                 <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white animate-pulse" />
              </div>
              <div>
                 <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2">Always Learning</span>
                 <p className="text-sm font-bold text-[#0c0a28] leading-tight">
                    Currently exploring<br/>
                    <span className="text-indigo-600 font-black">Next.js & Three.js</span>
                 </p>
              </div>
           </motion.div>
        </div>

        {/* 3D Workspace */}
        <div className="relative mb-24 grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch min-h-[850px]">
           <motion.div 
             initial={{ opacity: 0, scale: 0.95 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             className="lg:col-span-8 relative rounded-[72px] border border-gray-100 bg-white/40 backdrop-blur-3xl overflow-hidden shadow-2xl shadow-indigo-50/50"
           >
              <SkillsUniverse3D onSkillSelect={setSelectedSkill} />
              
              <div className="absolute top-1/2 -translate-y-1/2 right-6 flex flex-col items-center gap-4 py-8 px-2 bg-white/40 backdrop-blur-md rounded-full border border-white/50">
                 <div className="w-1 h-12 bg-indigo-100 rounded-full overflow-hidden relative">
                    <motion.div 
                      animate={{ y: [0, 48, 0] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute top-0 w-full h-4 bg-indigo-600"
                    />
                 </div>
                 <span className="[writing-mode:vertical-lr] text-[9px] font-black text-indigo-400 uppercase tracking-[0.3em]">Scroll Gutter</span>
              </div>
           </motion.div>

           <motion.div 
             initial={{ opacity: 0, x: 30 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             className="lg:col-span-4 flex flex-col"
           >
              <div className="flex-1 bg-white/60 backdrop-blur-3xl border border-white p-12 rounded-[56px] shadow-2xl shadow-indigo-100/30 relative overflow-hidden flex flex-col">
                 <AnimatePresence mode="wait">
                    {selectedSkill ? (
                      <motion.div
                        key={selectedSkill.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="h-full flex flex-col"
                      >
                         <div className="flex justify-between items-center mb-16">
                            <span className="text-[11px] font-black text-gray-400 uppercase tracking-[0.6em] leading-none">{"< DETAILS />"}</span>
                            <button 
                              onClick={() => setSelectedSkill(null)}
                              className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:text-red-500 transition-all border border-gray-100"
                            >
                               <X size={18} />
                            </button>
                         </div>

                         <div className="flex items-center gap-8 mb-16">
                            <div className="relative w-24 h-24 flex items-center justify-center">
                               <Hexagon size={90} className="text-indigo-600/10 fill-indigo-50/50 absolute" strokeWidth={1} />
                               <div className="relative z-10 w-12 h-12 bg-white rounded-2xl shadow-xl flex items-center justify-center border border-gray-50">
                                  <img src={`https://skillicons.dev/icons?i=${selectedSkill.icon}`} className="w-8 h-8 object-contain" alt="" />
                               </div>
                            </div>
                            <div>
                               <h3 className="text-4xl font-display font-black text-[#0c0a28] tracking-tighter leading-none mb-2">{selectedSkill.name}</h3>
                               <div className="flex items-center gap-3">
                                  <span className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.2em]">{selectedSkill.category}</span>
                               </div>
                            </div>
                         </div>

                         <div className="space-y-12">
                            <div>
                               <div className="flex justify-between items-baseline mb-4">
                                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Proficiency</span>
                                  <span className="text-2xl font-display font-black text-[#0c0a28]">{selectedSkill.level}%</span>
                               </div>
                               <div className="w-full h-2 bg-gray-50 rounded-full overflow-hidden shadow-inner">
                                  <motion.div initial={{ width: 0 }} animate={{ width: `${selectedSkill.level}%` }} className="h-full bg-[#fbbf24] rounded-full" />
                               </div>
                            </div>

                            <div>
                               <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] block mb-2">Experience</span>
                               <span className="text-3xl font-display font-black text-[#0c0a28]">{selectedSkill.experience}</span>
                            </div>

                            <div className="pt-8 border-t border-gray-50">
                               <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] block mb-6">Works well with</span>
                               <div className="flex flex-wrap gap-3">
                                  {GENERAL_WORKS_WITH.map(tool => (
                                    <div key={tool.name} className="px-4 py-2 bg-gray-50 rounded-xl border border-gray-100 flex items-center gap-2 group hover:border-indigo-200 transition-all cursor-default">
                                       <img src={`https://skillicons.dev/icons?i=${tool.icon}`} className="w-4 h-4 object-contain opacity-60 group-hover:opacity-100 transition-opacity" alt="" />
                                       <span className="text-[10px] font-black text-[#0c0a28] uppercase tracking-tighter opacity-60 group-hover:opacity-100">{tool.name}</span>
                                    </div>
                                  ))}
                               </div>
                            </div>
                         </div>

                         <div className="mt-auto p-8 rounded-3xl bg-indigo-50/30 border border-indigo-100/50">
                            <p className="text-[12px] font-medium text-gray-500 leading-relaxed italic">
                               "This technology forms a critical part of my high-performance development ecosystem, enabling scalable and beautiful solutions."
                            </p>
                         </div>
                      </motion.div>
                    ) : (
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="h-full flex flex-col items-center justify-center text-center p-10"
                      >
                         <div className="w-20 h-20 rounded-3xl bg-indigo-50 flex items-center justify-center text-indigo-600 mb-8 border border-indigo-100 shadow-inner">
                            <MousePointer2 size={32} />
                         </div>
                         <h4 className="text-2xl font-black text-[#0c0a28] tracking-tighter mb-4">Select a Node</h4>
                         <p className="text-sm text-gray-400 font-medium leading-relaxed">
                            Click on any technology in the 3D universe to view detailed proficiency and experience metrics.
                         </p>
                      </motion.div>
                    )}
                 </AnimatePresence>
              </div>

              <div className="mt-6 px-10 py-6 flex items-center justify-between bg-white/40 backdrop-blur-xl rounded-[32px] border border-white">
                 <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white shadow-lg">
                       <ChevronDown size={20} className="animate-bounce" />
                    </div>
                    <span className="text-[11px] font-black text-[#0c0a28] uppercase tracking-widest">Scroll down for full list</span>
                 </div>
              </div>
           </motion.div>
        </div>

        {/* Filter Bar with Navigation Arrows */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative mb-12 group"
        >
           <div className="bg-white/60 backdrop-blur-3xl border border-white/80 p-4 rounded-[32px] shadow-2xl shadow-indigo-100/30 flex items-center relative overflow-hidden">
              {/* Left Arrow */}
              <button 
                onClick={() => {
                  const el = document.getElementById('category-scroll');
                  if (el) el.scrollBy({ left: -200, behavior: 'smooth' });
                }}
                className="absolute left-4 z-20 w-10 h-10 rounded-full bg-white/80 border border-gray-100 flex items-center justify-center text-gray-400 hover:text-indigo-600 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
              >
                 <ChevronLeft size={18} />
              </button>

              <div 
                id="category-scroll"
                className="flex items-center gap-2 overflow-x-auto no-scrollbar px-12 w-full scroll-smooth"
              >
                 {CATEGORIES.map((cat) => (
                   <button
                     key={cat.id}
                     onClick={() => setActiveCategory(cat.id)}
                     className={`flex items-center gap-6 px-10 py-5 rounded-[24px] transition-all relative group/btn min-w-max ${activeCategory === cat.id ? 'bg-[#f0f0ff] shadow-lg shadow-indigo-100/50' : 'hover:bg-gray-50/50'}`}
                   >
                      <div className="flex items-center gap-4">
                         {cat.id === 'all' ? (
                           <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${activeCategory === 'all' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-400'}`}>
                              <Layers size={16} />
                           </div>
                         ) : (
                           <div className={`w-2 h-2 rounded-full`} style={{ backgroundColor: cat.color === 'blue' ? '#3b82f6' : cat.color === 'cyan' ? '#06b6d4' : cat.color === 'emerald' ? '#10b981' : cat.color === 'purple' ? '#a855f7' : cat.color === 'pink' ? '#ec4899' : '#f97316' }} />
                         )}
                         <span className={`text-[12px] font-black uppercase tracking-[0.2em] ${activeCategory === cat.id ? 'text-indigo-600' : 'text-gray-400'}`}>{cat.label}</span>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-[10px] font-black ${activeCategory === cat.id ? 'bg-white text-indigo-600' : 'bg-gray-100 text-gray-400'}`}>
                         {cat.id === 'all' ? ALL_TOOLS.length : ALL_TOOLS.filter(t => t.category === cat.id).length}
                      </div>
                   </button>
                 ))}
              </div>

              {/* Right Arrow */}
              <button 
                onClick={() => {
                  const el = document.getElementById('category-scroll');
                  if (el) el.scrollBy({ left: 200, behavior: 'smooth' });
                }}
                className="absolute right-4 z-20 w-10 h-10 rounded-full bg-white/80 border border-gray-100 flex items-center justify-center text-gray-400 hover:text-indigo-600 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
              >
                 <ChevronRight size={18} />
              </button>
           </div>
        </motion.div>

        {/* Bento Grid with Feature Pillar Style Entrance */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-10"
        >
           
           <motion.div 
             variants={itemVariants}
             className="lg:col-span-4 bg-white/60 backdrop-blur-3xl border border-white p-12 rounded-[56px] shadow-2xl shadow-indigo-100/30 flex flex-col justify-between group"
           >
              <div>
                 <div className="flex items-center gap-4 mb-16">
                    <TrendingUp size={20} className="text-indigo-600" />
                    <span className="text-[12px] font-black text-[#0c0a28] uppercase tracking-[0.3em]">Arsenal Overview</span>
                 </div>

                 <div className="grid grid-cols-2 gap-y-16 gap-x-10">
                    {[
                      { val: '24+', label: 'Technologies Mastered' },
                      { val: '3+', label: 'Years of Experience' },
                      { val: '3', label: 'Live Projects Built' },
                      { val: '100%', label: 'Passion & Dedication', highlight: true }
                    ].map((stat) => (
                      <div key={stat.label}>
                         <h4 className={`text-4xl font-display font-black tracking-tighter leading-none mb-3 ${stat.highlight ? 'bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent' : 'text-[#0c0a28]'}`}>{stat.val}</h4>
                         <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest leading-relaxed max-w-[120px]">{stat.label}</p>
                      </div>
                    ))}
                 </div>
              </div>

              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="mt-20 p-10 rounded-[48px] bg-gradient-to-br from-indigo-50/50 to-purple-50/50 border border-white relative overflow-hidden group/quote min-h-[220px] flex flex-col justify-center"
              >
                 <div className="relative z-10">
                    <Quote size={28} className="text-indigo-400 mb-6 opacity-40 fill-indigo-400" />
                    <p className="text-2xl font-bold text-[#0c0a28] leading-tight max-w-[280px]">
                       The right tool in the right hands can <span className="font-black">change the world.</span>
                    </p>
                    <p className="mt-6 text-[13px] font-bold text-gray-400 uppercase tracking-widest">— That's my arsenal.</p>
                 </div>
                 <img 
                   src="/arsenal_crystal_icon.png" 
                   className="absolute -right-8 -bottom-8 w-56 h-56 object-contain opacity-90 group-hover/quote:scale-110 group-hover/quote:rotate-12 transition-transform duration-1000" 
                   alt="3D Crystal" 
                 />
              </motion.div>
           </motion.div>

           {/* FILTERED INTERACTIVE TOOL SLIDER */}
           <motion.div 
             variants={itemVariants}
             className="lg:col-span-8 bg-white/60 backdrop-blur-3xl border border-white p-12 rounded-[56px] shadow-2xl shadow-indigo-100/30 relative"
           >
              <div className="flex items-center justify-between mb-16">
                 <div className="flex items-center gap-4">
                    <Activity size={20} className="text-indigo-600" />
                    <span className="text-[12px] font-black text-[#0c0a28] uppercase tracking-[0.3em]">
                       {activeCategory === 'all' ? 'All Mastered Tools' : `${activeCategory} Tools`}
                    </span>
                 </div>
                 <div className="flex gap-4">
                    <button 
                      onClick={() => scroll('left')}
                      className="w-12 h-12 rounded-2xl bg-white border border-gray-100 flex items-center justify-center text-gray-400 hover:text-indigo-600 hover:border-indigo-100 transition-all shadow-lg"
                    >
                       <ChevronLeft size={20} />
                    </button>
                    <button 
                      onClick={() => scroll('right')}
                      className="w-12 h-12 rounded-2xl bg-white border border-gray-100 flex items-center justify-center text-gray-400 hover:text-indigo-600 hover:border-indigo-100 transition-all shadow-lg"
                    >
                       <ChevronRight size={20} />
                    </button>
                 </div>
              </div>

              <div 
                ref={scrollRef}
                className="flex gap-6 overflow-x-auto no-scrollbar pb-10 px-2"
              >
                 <AnimatePresence mode="popLayout">
                    {filteredTools.map((tool, idx) => (
                      <motion.div 
                        key={tool.id}
                        layout
                        initial={{ opacity: 0, x: 100, rotate: 5 }}
                        whileInView={{ opacity: 1, x: 0, rotate: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.05, duration: 0.8, type: "spring", bounce: 0.3 }}
                        whileHover={{ y: -12, scale: 1.02 }}
                        className="min-w-[240px] bg-white border border-gray-50 p-8 rounded-[40px] shadow-xl shadow-indigo-50/20 flex flex-col items-center text-center group transition-all hover:border-indigo-100"
                      >
                         <div className="w-20 h-20 rounded-3xl bg-gray-50 flex items-center justify-center mb-8 border border-gray-100 group-hover:scale-110 transition-transform shadow-inner overflow-hidden">
                            <img src={`https://skillicons.dev/icons?i=${tool.icon}`} className="w-10 h-10 object-contain" alt={tool.name} />
                         </div>
                         <h5 className="text-xl font-black text-[#0c0a28] tracking-tighter mb-2">{tool.name}</h5>
                         <div className="px-4 py-1.5 rounded-full bg-indigo-50 text-[9px] font-black text-indigo-600 uppercase tracking-widest mb-6">
                            {tool.category}
                         </div>
                         <p className="text-[11px] font-medium text-gray-400 leading-relaxed mb-10 h-12 overflow-hidden">
                            {tool.desc}
                         </p>
                         <div className="w-full">
                            <div className="flex justify-between text-[9px] font-black text-gray-400 uppercase tracking-widest mb-2 px-1">
                               <span>Level</span>
                               <span>{tool.level}%</span>
                            </div>
                            <div className="w-full h-1.5 bg-gray-50 rounded-full p-0.5 shadow-inner">
                               <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full" style={{ width: `${tool.level}%` }} />
                            </div>
                         </div>
                      </motion.div>
                    ))}
                 </AnimatePresence>
              </div>
           </motion.div>
        </motion.div>

        {/* EXTRA UTILITY ROW: Audio Player & Connection Card */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-10"
        >
           {/* THE RETRO RADIO BENTO CARD */}
           <motion.div 
             variants={itemVariants}
             className="lg:col-span-5 bg-[#0c0a28] rounded-[56px] shadow-2xl overflow-hidden relative"
           >
              <AudioPlayer />
           </motion.div>

           {/* CONNECTION / SOCIAL CARD */}
           <motion.div 
             variants={itemVariants}
             className="lg:col-span-7 bg-white/60 backdrop-blur-3xl border border-white p-16 rounded-[56px] shadow-2xl shadow-indigo-100/30 flex flex-col justify-center relative overflow-hidden group"
           >
              <div className="relative z-10">
                 <span className="text-[11px] font-black text-indigo-600 uppercase tracking-[0.6em] mb-6 block leading-none">{"// DIGITAL PRESENCE"}</span>
                 <h2 className="text-6xl font-display font-black text-[#0c0a28] tracking-tighter mb-10 leading-[0.9]">
                    LET'S BUILD THE <br/> 
                    <span className="text-gray-300">FUTURE TOGETHER.</span>
                 </h2>
                 
                 <div className="flex flex-wrap gap-6">
                    {[
                      { icon: Mail, label: 'Email Me', color: 'indigo' },
                      { icon: Linkedin, label: 'LinkedIn', color: 'blue' },
                      { icon: Instagram, label: 'Instagram', color: 'pink' }
                    ].map(social => (
                      <button key={social.label} className="px-8 py-4 rounded-2xl bg-white border border-gray-100 flex items-center gap-4 shadow-xl shadow-indigo-50/20 hover:border-indigo-200 transition-all group/btn">
                         <social.icon size={20} className={`text-${social.color}-600 group-hover/btn:scale-110 transition-transform`} />
                         <span className="text-[12px] font-black text-[#0c0a28] uppercase tracking-widest">{social.label}</span>
                         <ArrowUpRight size={16} className="text-gray-300" />
                      </button>
                    ))}
                 </div>
              </div>

              {/* Decorative Element */}
              <div className="absolute top-1/2 -right-20 -translate-y-1/2 w-80 h-80 bg-indigo-50 rounded-full blur-[100px] opacity-40 group-hover:opacity-100 transition-opacity" />
           </motion.div>
        </motion.div>

      </div>
    </div>
  );
};
