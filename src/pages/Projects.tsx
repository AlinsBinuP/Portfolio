import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Gauge, Church, X, Github, ExternalLink, Box, Sparkles } from 'lucide-react';
import { Magnetic } from '../components/Magnetic';

const PROJECTS = [
  {
    id: 'light-suvara',
    title: 'Light Suvara',
    description: 'A mission-critical Flutter app for church communities—managing schedules, announcements, and prayer requests.',
    longDescription: 'Designed and built from scratch for a specific church community. Light Suvara handles announcements, event schedules, and community features — all tailored to the congregation\'s exact workflows. A live product used by real people every day. Built with Flutter, Dart, and Firebase.',
    tags: ['Flutter', 'Dart', 'Firebase', 'Android', 'iOS'],
    category: 'FLUTTER · CHURCH HUB',
    color: '#3b82f6',
    image: "/1776942620907.png",
    mockup: "church",
    featured: true,
    liveUrl: "https://play.google.com/store/apps/details?id=in.cse.ajce.sundayschool&hl=en_IN"
  },
  {
    id: 'prism-studio',
    title: 'Prism Studio',
    description: 'An all-in-one AI powerhouse—image generation, background removal, and multi-modal productivity tools.',
    longDescription: 'Prism Studio is a full-stack web application and all-in-one AI powerhouse. Features include: AI Image Generation, 3D Motion, Background Removal, Magic Eraser, YouTube Notes, Text-to-Speech, Essay Writer, PDF Tools, Deepfake Detector, Doc Summarizer, and Image Upscaler — all in one place. Built for speed, privacy, and multi-modal AI workflows.',
    tags: ['Web App', 'AI', 'Full Stack', 'Vercel'],
    category: 'WEB · AI ECOSYSTEM',
    color: '#8b5cf6',
    image: "/image_fd8fb534.png",
    mockup: "prism",
    featured: true,
    liveUrl: 'https://prismstudioai.vercel.app/',
    badge: '12+ AI Tools'
  },
  {
    id: 'cardash',
    title: 'CarDash',
    description: 'Replacing standard car displays with high-performance Flutter dashboards—GPS, Maps, and music integration.',
    longDescription: 'Built to replace a missing in-built car display. CarDash runs on Android and iOS, featuring a live GPS speedometer, Google Maps integration, music app shortcuts, a dialpad, Screen Wake Lock so the display never dims while driving, and a night mode for low-light use. No dependencies — built entirely in Flutter and Dart.',
    tags: ['Flutter', 'Dart', 'GPS API', 'Google Maps', 'Android', 'iOS'],
    category: 'FLUTTER · AUTOMOTIVE',
    color: '#0ea5e9',
    image: "/aauto.jpg",
    mockup: "speedometer",
    featured: false
  }
];

const ProjectCard = ({ project, onClick, className = "" }: { project: typeof PROJECTS[0], onClick: () => void, className?: string }) => {
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
      className={`group cursor-pointer overflow-hidden p-8 md:p-12 flex flex-col h-full bg-white border border-black/[0.06] hover:border-[#0369a1]/20 hover:shadow-[0_45px_100px_rgba(3,105,161,0.12)] transition-all ease-out duration-500 ${className}`}
      style={{
        transformStyle: 'preserve-3d',
        transform: `perspective(1000px) rotateX(${mousePos.y * -10}deg) rotateY(${mousePos.x * 10}deg)`,
      }}
    >
      <div className="relative aspect-[16/10] rounded-[40px] overflow-hidden mb-12 border border-black/[0.05] bg-[#f8fafc] shadow-2xl group-hover:scale-[1.02] transition-transform duration-700">
        <motion.div
          animate={{ x: mousePos.x * -25, y: mousePos.y * -25 }}
          transition={{ type: "spring", damping: 40, stiffness: 120 }}
          className="w-full h-full scale-125"
        >
          <img 
            src={project.image} 
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110 opacity-80 group-hover:opacity-100" 
            alt={project.title}
          />
        </motion.div>
        
        {/* Glass Overlay on Hover */}
        <div className="absolute inset-0 bg-sky-900/0 group-hover:bg-sky-900/5 transition-colors duration-500" />
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none ring-1 ring-inset ring-white/20 rounded-[40px]" />

        {project.id === 'cardash' && (
          <motion.div initial={{ opacity: 0 }} whileHover={{ opacity: 1 }} className="absolute top-8 right-8 z-10 pointer-events-none">
            <svg width="80" height="80" viewBox="0 0 80 80">
              <circle cx="40" cy="40" r="35" stroke="rgba(56,189,248,0.3)" strokeWidth="2" fill="none"/>
              <motion.line x1="40" y1="40" x2="62" y2="20"
                stroke="#38bdf8" strokeWidth="2" strokeLinecap="round"
                animate={{ rotate: [-40, 40, -40] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                style={{ transformOrigin: '40px 40px' }}
              />
              <text x="40" y="56" textAnchor="middle" fontSize="10" fill="rgba(56,189,248,0.8)">km/h</text>
            </svg>
          </motion.div>
        )}
        
        {project.id === 'prism-studio' && (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="absolute top-8 right-8 w-16 h-16 rounded-full opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
            style={{ background: 'conic-gradient(from 0deg, #7c3aed, #06b6d4, #f59e0b, #7c3aed)' }}
          />
        )}

        <div className="absolute inset-x-0 bottom-0 p-10 flex justify-end pointer-events-none transform translate-z-10">
           {project.mockup === "speedometer" && <Gauge className="w-24 h-24 text-[#0369a1] opacity-5 group-hover:opacity-20 transition-opacity" />}
           {project.mockup === "church" && <Church className="w-24 h-24 text-[#f59e0b] opacity-5 group-hover:opacity-20 transition-opacity" />}
           {project.mockup === "prism" && <Sparkles className="w-24 h-24 text-[#7c3aed] opacity-5 group-hover:opacity-20 transition-opacity" />}
        </div>
      </div>

      <div className="flex-1 transform translate-z-20">
        <div className="flex items-center gap-4 mb-8">
           <span className="text-[10px] font-mono font-bold tracking-[0.5em] text-sky-700 uppercase">{project.category}</span>
           {project.badge && <span className="text-[9px] font-mono font-bold tracking-widest text-sky-600 bg-sky-50 px-3 py-1 rounded-full border border-sky-100">{project.badge}</span>}
        </div>
        <h3 className="text-4xl md:text-6xl font-display font-extrabold mb-8 tracking-tighter leading-none text-[#0a0a0a] group-hover:text-black transition-all uppercase">{project.title}</h3>
        <p className="text-xl text-[#64748b] mb-12 leading-relaxed max-w-sm font-sans font-normal group-hover:text-[#334155] transition-colors">{project.description}</p>
      </div>

      <div className="flex items-center justify-between mt-auto transform translate-z-30">
        <div className="flex flex-wrap gap-2">
          {project.tags.slice(0, 3).map(tag => (
            <span key={tag} className="px-4 py-2 bg-[#f8fafc] border border-black/[0.04] text-[9px] font-mono font-bold tracking-widest uppercase text-[#475569] rounded-full">{tag}</span>
          ))}
        </div>
        <Magnetic strength={30}>
          <div className="w-16 h-16 rounded-full bg-[#0a0a0a] text-white flex items-center justify-center group-hover:bg-sky-700 group-hover:scale-110 transition-all duration-500 shadow-2xl">
            <ArrowUpRight className="w-6 h-6" />
          </div>
        </Magnetic>
      </div>
    </motion.div>
  );
};

export const Projects = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const selectedProject = PROJECTS.find(p => p.id === selectedId);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative min-h-screen bg-transparent pt-48 pb-60 px-6 md:px-20 overflow-hidden"
    >
      {/* Background depth & Hover Glow Effect */}
      <div className="absolute inset-0 z-0 pointer-events-none">
         <div className="absolute top-0 left-0 w-full h-[60vh] bg-[radial-gradient(ellipse_at_center,_#c8e8ff_0%,_transparent_70%)] opacity-30" />
         <AnimatePresence>
            {hoveredProject && (
               <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-[#2563eb] blur-[150px] transition-all duration-700"
               />
            )}
         </AnimatePresence>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-32">
          <span className="text-sky-700 font-mono text-[11px] font-bold tracking-[0.4em] mb-6 block uppercase opacity-70">// ARCHIVE</span>
          <h2 className="text-7xl md:text-[10vw] font-display font-extrabold tracking-tighter leading-none text-[#0a0a0a] uppercase flex flex-col md:flex-row items-baseline gap-6">
            <span>PROJECTS</span>
            <motion.span 
              initial={{ width: 0 }}
              whileInView={{ width: 'auto' }}
              className="h-[1px] bg-black/10 flex-1 hidden lg:block"
            />
          </h2>
          <p className="text-[#64748b] text-2xl font-sans font-light italic mt-4 max-w-2xl opacity-80">
            A curated collection of Flutter architectures and real-world digital systems.
          </p>
        </div>

        {/* Asymmetrical Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-10 gap-8">
           {/* Primary Item */}
           <div 
             className="md:col-span-6"
             onMouseEnter={() => setHoveredProject(PROJECTS[0].id)}
             onMouseLeave={() => setHoveredProject(null)}
           >
              <ProjectCard 
                project={PROJECTS[0]} 
                onClick={() => setSelectedId(PROJECTS[0].id)} 
                className="rounded-[48px] h-full"
              />
           </div>

           <div className="md:col-span-4 flex flex-col gap-8">
              {PROJECTS.slice(1).map((project) => (
                <div 
                  key={project.id} 
                  className="flex-1"
                  onMouseEnter={() => setHoveredProject(project.id)}
                  onMouseLeave={() => setHoveredProject(null)}
                >
                  <ProjectCard 
                    project={project} 
                    onClick={() => setSelectedId(project.id)} 
                    className="rounded-[40px] !p-8 h-full shadow-[0_45px_80px_rgba(3,105,161,0.05)] hover:shadow-[0_45px_100px_rgba(3,105,161,0.1)] transition-all"
                  />
                </div>
              ))}
           </div>
        </div>

        {/* Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-10 border-t border-black/[0.06] pt-20">
               {[
                 { label: 'PROJECTS', val: '03' },
                 { label: 'FLUTTER EXP', val: '3Y+' },
                 { label: 'LIVE TOOLS', val: '12+' },
                 { label: 'COUNTRIES', val: '01' }
               ].map(stat => (
                 <div key={stat.label} className="space-y-2">
                    <span className="text-[10px] font-mono font-bold tracking-[0.3em] text-[#64748b] uppercase opacity-50">{stat.label}</span>
                    <p className="text-5xl font-display font-bold text-[#0a0a0a]">{stat.val}</p>
                 </div>
               ))}
            </div>
      </div>

      <AnimatePresence>
        {selectedId && selectedProject && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center px-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedId(null)}
              className="absolute inset-0 bg-white/90 backdrop-blur-3xl"
            />
            
            <motion.div
              layoutId={`card-${selectedId}`}
              className="w-full max-w-6xl bg-white rounded-[40px] overflow-hidden relative shadow-[0_40px_120px_rgba(0,0,0,0.15)] p-8 md:p-16 border border-black/[0.05]"
            >
              <button 
                onClick={() => setSelectedId(null)}
                className="absolute top-10 right-10 w-14 h-14 rounded-full bg-[#f8fafc] border border-black/[0.06] flex items-center justify-center hover:bg-[#0a0a0a] text-[#0a0a0a] hover:text-white transition-all z-30"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                 <div className="aspect-[4/3] rounded-[32px] overflow-hidden border border-black/[0.06] shadow-xl relative group">
                    <img src={selectedProject.image} className="w-full h-full object-cover" alt={selectedProject.title} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                 </div>
                 
                 <div className="space-y-10">
                    <div className="space-y-4">
                      <span className="text-xs font-black tracking-[0.5em] text-[#0369a1] uppercase block opacity-70">{selectedProject.category}</span>
                      <h2 className="text-6xl md:text-8xl font-heavy uppercase leading-tight text-[#0a0a0a] tracking-tighter">{selectedProject.title}</h2>
                    </div>
                    
                    <p className="text-xl text-[#4a5568] leading-relaxed font-light">
                      {selectedProject.longDescription}
                    </p>

                    <div className="flex flex-wrap gap-2">
                       {selectedProject.tags.map(tag => (
                          <span key={tag} className="px-5 py-2 bg-[#f1f5f9] border border-black/[0.03] text-[10px] font-bold tracking-widest uppercase text-[#64748b]">{tag}</span>
                       ))}
                    </div>

                    <div className="flex flex-wrap gap-6 pt-10">
                       {selectedProject.liveUrl && (
                         <Magnetic strength={20}>
                           <a href={selectedProject.liveUrl} target="_blank" rel="noreferrer" className="bg-[#0369a1] text-white px-10 py-5 rounded-full font-black text-[10px] tracking-widest uppercase flex items-center gap-4 hover:bg-[#075985] transition-all shadow-xl">
                             Visit Link <ExternalLink className="w-4 h-4" />
                           </a>
                         </Magnetic>
                       )}
                       
                       <Magnetic strength={20}>
                         <button className="bg-[#f8fafc] border border-black/[0.06] px-10 py-5 flex items-center gap-4 font-black uppercase text-[10px] tracking-widest text-[#0a0a0a] hover:bg-[#f1f5f9] transition-all">
                           Details <Github className="w-4 h-4" />
                         </button>
                       </Magnetic>
                    </div>
                 </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
