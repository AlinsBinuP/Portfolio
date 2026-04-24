import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Gauge, Church, X, Github, ExternalLink } from 'lucide-react';
import { Magnetic } from '../components/Magnetic';

const PROJECTS = [
  {
    id: 'cardash',
    title: 'CarDash 🚗',
    description: 'A smartphone PWA that replaces a missing in-built car display.',
    longDescription: 'Features live GPS speedometer, Google Maps navigation, music app shortcuts, a dialpad, night mode, and Screen Wake Lock API so the screen never dims while driving. Built entirely with vanilla HTML, CSS, and JS to ensure maximum compatibility and performance.',
    tags: ['Flutter', 'PWA', 'GPS API', 'WakeLock'],
    category: 'UTILITY · OPEN SOURCE',
    color: '#2563eb',
    image: "https://images.unsplash.com/photo-1549233861-46821219cd5b?q=80&w=800",
    mockup: "speedometer"
  },
  {
    id: 'light-suvara',
    title: 'Light Suvara ⛪',
    description: 'A complete community app for church management and engagement.',
    longDescription: 'Built with Flutter and Firebase, this app serves an entire church community with announcements, event tracking, family records, and real-time notifications. It bridges the gap between traditional community management and digital accessibility.',
    tags: ['Flutter', 'Firebase', 'Realtime DB'],
    category: 'COMMUNITY · PRODUCT',
    color: '#f59e0b',
    image: "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=800",
    mockup: "church"
  }
];

const ProjectCard = ({ project, onClick }: { project: typeof PROJECTS[0], onClick: () => void }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  return (
    <motion.div
      layoutId={`card-${project.id}`}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setMousePos({ x: 0, y: 0 })}
      className="cinematic-glass group cursor-pointer overflow-hidden p-6 md:p-10 flex flex-col h-full bg-midnight/30 border-white/5 hover:border-white/20 transition-colors"
    >
      <div className="relative aspect-video rounded-3xl overflow-hidden mb-10 border border-white/5 bg-midnight shadow-2xl">
        <motion.div
          animate={{ x: mousePos.x * -20, y: mousePos.y * -20 }}
          transition={{ type: "spring", damping: 30, stiffness: 100 }}
          className="w-full h-full scale-110"
        >
          <img 
            src={project.image} 
            className="w-full h-full object-cover grayscale-[0.5] group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105" 
            alt={project.title}
          />
        </motion.div>
        
        {/* Advanced Mockup Overlays */}
        <div className="absolute inset-0 bg-midnight/60 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-12">
            {project.mockup === "speedometer" ? (
               <div className="w-48 h-48 rounded-full border-[10px] border-white/10 relative flex flex-col items-center justify-center bg-black/40 shadow-[0_0_50px_rgba(37,99,235,0.4)]">
                  <div className="absolute inset-0 rounded-full border-t-[10px] border-sky-blue-glow animate-spin-slow rotate-[45deg]" />
                  <motion.div 
                    animate={{ rotate: [-20, 60, -10, 40] }} 
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                    className="w-1 h-20 bg-sky-blue-glow origin-bottom absolute bottom-1/2 shadow-glow-sm" 
                  />
                  <span className="text-4xl font-display font-black text-white italic mt-4">84</span>
                  <span className="text-[10px] font-bold tracking-[0.2em] text-white/40">KM/H</span>
               </div>
            ) : (
               <div className="flex flex-col items-center gap-6">
                 <Church className="w-24 h-24 text-amber-accent drop-shadow-[0_0_20px_rgba(245,158,11,0.5)]" />
                 <div className="flex gap-2">
                    <div className="w-2 h-2 bg-amber-accent rounded-full animate-ping" />
                    <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-amber-accent/80">Live Community</span>
                 </div>
               </div>
            )}
        </div>
      </div>

      <div className="flex-1">
        <span className="text-[10px] font-bold tracking-[0.4em] text-sky-blue-glow uppercase mb-6 block drop-shadow-glow">{project.category}</span>
        <h3 className="text-4xl md:text-5xl font-display font-black mb-6 tracking-tight leading-none group-hover:text-glow transition-all">{project.title}</h3>
        <p className="text-lg text-white/50 mb-10 leading-relaxed max-w-md">{project.description}</p>
      </div>

      <div className="flex items-center justify-between mt-auto">
        <div className="flex gap-2">
          {project.tags.map(tag => (
            <span key={tag} className="px-4 py-2 cinematic-glass border-white/5 text-[9px] font-bold tracking-widest uppercase text-white/40">{tag}</span>
          ))}
        </div>
        <Magnetic strength={20}>
          <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-midnight group-hover:scale-110 transition-all duration-500">
            <ArrowUpRight className="w-6 h-6" />
          </div>
        </Magnetic>
      </div>
    </motion.div>
  );
};

export const Projects = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selectedProject = PROJECTS.find(p => p.id === selectedId);

  return (
    <div className="max-w-7xl mx-auto px-6 pt-48 pb-40 min-h-screen">
      <div className="mb-20">
        <span className="text-sky-blue-glow font-mono text-sm tracking-[0.2em] mb-4 block">// SELECTED WORK</span>
        <h2 className="text-7xl font-display font-black tracking-tight leading-none">Real projects.</h2>
        <h2 className="text-7xl font-display font-black tracking-tight leading-none text-white/20">Real impact.</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {PROJECTS.map((project) => (
          <ProjectCard key={project.id} project={project} onClick={() => setSelectedId(project.id)} />
        ))}
      </div>

      <AnimatePresence>
        {selectedId && selectedProject && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center px-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedId(null)}
              className="absolute inset-0 bg-midnight/95 backdrop-blur-3xl"
            />
            
            <motion.div
              layoutId={`card-${selectedId}`}
              className="w-full max-w-5xl bg-cobalt rounded-[40px] overflow-hidden relative cinematic-glass p-8 md:p-12"
            >
              <button 
                onClick={() => setSelectedId(null)}
                className="absolute top-8 right-8 w-12 h-12 rounded-full cinematic-glass border-white/20 flex items-center justify-center hover:bg-white/10 transition-all"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                 <div className="aspect-[4/3] rounded-3xl overflow-hidden border border-white/5">
                   <img src={selectedProject.image} className="w-full h-full object-cover" alt={selectedProject.title} />
                 </div>
                 
                 <div className="space-y-8">
                    <div>
                      <span className="text-xs font-bold tracking-[0.4em] text-white/40 uppercase mb-4 block">{selectedProject.category}</span>
                      <h2 className="text-6xl font-display font-extrabold">{selectedProject.title}</h2>
                    </div>
                    
                    <p className="text-xl text-white/70 leading-relaxed">
                      {selectedProject.longDescription}
                    </p>

                    <div className="flex flex-wrap gap-4">
                       {selectedProject.tags.map(tag => (
                          <span key={tag} className="px-4 py-2 cinematic-glass border-white/10 text-xs font-bold tracking-widest">{tag}</span>
                       ))}
                    </div>

                    <div className="flex gap-6 pt-8">
                       <Magnetic strength={20}>
                         <button className="bg-white text-midnight px-8 py-4 rounded-full font-bold flex items-center gap-3">
                           See Live Demo <ExternalLink className="w-4 h-4" />
                         </button>
                       </Magnetic>
                       <Magnetic strength={20}>
                         <button className="cinematic-glass px-8 py-4 flex items-center gap-3 border-white/10 font-bold">
                           GitHub <Github className="w-4 h-4" />
                         </button>
                       </Magnetic>
                    </div>
                 </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
