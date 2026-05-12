import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Gauge, Church, X, Github, ExternalLink, Sparkles } from 'lucide-react';
import { InteractiveTitle } from '../components/redesign/InteractiveTitle';

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

const ProjectCard = ({ project, onClick, className = "" }: { project: typeof PROJECTS[0], onClick: () => void, className?: string, cursor?: string }) => {
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
      className={`group cursor-pointer overflow-hidden p-8 md:p-12 flex flex-col h-full bg-white border border-gray-100 hover:border-indigo-200 hover:shadow-[0_45px_100px_rgba(0,0,0,0.05)] transition-all ease-out duration-500 ${className}`}
      style={{
        transformStyle: 'preserve-3d',
        transform: `perspective(1000px) rotateX(${mousePos.y * -10}deg) rotateY(${mousePos.x * 10}deg)`,
      }}
    >
      <div className="relative aspect-[16/10] rounded-[40px] overflow-hidden mb-12 border border-gray-100 bg-gray-50/30 group-hover:scale-[1.02] transition-transform duration-700">
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
        
        <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-500" />
        
        <div className="absolute inset-x-0 bottom-0 p-10 flex justify-end pointer-events-none transform translate-z-10">
           {project.mockup === "speedometer" && <Gauge className="w-24 h-24 text-indigo-600 opacity-5 group-hover:opacity-20 transition-opacity" />}
           {project.mockup === "church" && <Church className="w-24 h-24 text-amber-600 opacity-5 group-hover:opacity-20 transition-opacity" />}
           {project.mockup === "prism" && <Sparkles className="w-24 h-24 text-purple-600 opacity-5 group-hover:opacity-20 transition-opacity" />}
        </div>
      </div>

      <div className="flex-1 transform translate-z-20">
        <div className="flex items-center gap-4 mb-8">
           <span className="text-[10px] font-mono font-bold tracking-[0.5em] text-indigo-600 uppercase">{project.category}</span>
           {project.badge && <span className="text-[9px] font-mono font-bold tracking-widest text-indigo-500 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">{project.badge}</span>}
        </div>
        <h3 className="text-4xl md:text-6xl font-display font-extrabold mb-8 tracking-tighter leading-none text-[#0c0a28] group-hover:text-indigo-600 transition-all uppercase">{project.title}</h3>
        <p className="text-xl text-gray-500 mb-12 leading-relaxed max-w-sm font-sans font-normal group-hover:text-gray-600 transition-colors">{project.description}</p>
      </div>

      <div className="flex items-center justify-between mt-auto transform translate-z-30">
        <div className="flex flex-wrap gap-2">
          {project.tags.slice(0, 3).map(tag => (
            <span key={tag} className="px-4 py-2 bg-gray-50 border border-gray-100 text-[9px] font-mono font-bold tracking-widest uppercase text-gray-400 rounded-full">{tag}</span>
          ))}
        </div>
        <div className="w-16 h-16 rounded-2xl bg-gray-50 text-[#0c0a28] flex items-center justify-center group-hover:bg-[#0c0a28] group-hover:text-white group-hover:scale-110 transition-all duration-500 shadow-sm border border-gray-100">
          <ArrowUpRight className="w-6 h-6" />
        </div>
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
      className="relative min-h-screen bg-white pt-48 pb-60 px-6 md:px-20 overflow-hidden text-[#0c0a28]"
    >
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
         <div className="absolute top-[10%] left-[5%] w-[600px] h-[600px] bg-purple-50 blur-[120px] rounded-full opacity-60" />
         <div className="absolute bottom-[10%] right-[5%] w-[700px] h-[700px] bg-blue-50 blur-[150px] rounded-full opacity-40" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-32">
          <motion.span 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="text-indigo-600 font-mono text-[11px] font-bold tracking-[0.4em] mb-6 block uppercase opacity-90"
          >
            // ARCHIVE
          </motion.span>
          
          <div className="flex flex-col md:flex-row items-baseline gap-6">
            <InteractiveTitle 
              text="PROJECTS" 
              highlight="PROJECTS"
              gradient="purple-pink"
              className="text-7xl md:text-[10vw] font-display font-black tracking-tighter leading-none uppercase cursor-default" 
            />
            <motion.span 
              initial={{ width: 0 }}
              whileInView={{ width: 'auto' }}
              className="h-[1px] bg-gray-100 flex-1 hidden lg:block"
            />
          </div>
          
          <p className="text-gray-500 text-2xl font-sans font-light italic mt-6 max-w-2xl">
            A curated collection of Flutter architectures and real-world digital systems.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-10 gap-8">
           <div 
             className="md:col-span-6"
             onMouseEnter={() => setHoveredProject(PROJECTS[0].id)}
             onMouseLeave={() => setHoveredProject(null)}
           >
              <ProjectCard 
                project={PROJECTS[0]} 
                onClick={() => setSelectedId(PROJECTS[0].id)} 
                className="rounded-[48px] h-full border border-gray-100 p-1 shadow-sm"
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
                    className="rounded-[40px] !p-8 h-full shadow-sm hover:shadow-indigo-50 transition-all border border-gray-100 p-1"
                  />
                </div>
              ))}
           </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 border-t border-gray-100 pt-20 mt-32">
           {[
             { label: 'PROJECTS', val: '03' },
             { label: 'FLUTTER EXP', val: '3Y+' },
             { label: 'LIVE TOOLS', val: '12+' },
             { label: 'COUNTRIES', val: '01' }
           ].map(stat => (
             <div key={stat.label} className="space-y-2">
                 <span className="text-[10px] font-mono font-bold tracking-[0.3em] text-gray-400 uppercase opacity-60">{stat.label}</span>
                 <p className="text-5xl font-display font-black text-[#0c0a28]">{stat.val}</p>
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
              className="absolute inset-0 bg-white/95 backdrop-blur-3xl"
            />
            
            <motion.div
              layoutId={`card-${selectedId}`}
              className="w-full max-w-6xl bg-white rounded-[48px] overflow-hidden relative shadow-[0_40px_120px_rgba(0,0,0,0.1)] p-8 md:p-16 border border-gray-100"
            >
              <button 
                onClick={() => setSelectedId(null)}
                className="absolute top-10 right-10 w-14 h-14 rounded-full bg-[#0c0a28] text-white flex items-center justify-center hover:scale-110 transition-all z-30"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                 <div className="aspect-[4/3] rounded-[32px] overflow-hidden border border-gray-100 shadow-2xl relative group">
                    <img src={selectedProject.image} className="w-full h-full object-cover" alt={selectedProject.title} />
                    <div className="absolute inset-0 bg-gradient-to-t from-white/40 to-transparent" />
                 </div>
                 
                 <div className="space-y-10">
                     <div className="space-y-4">
                       <span className="text-xs font-black tracking-[0.5em] text-indigo-600 uppercase block">{selectedProject.category}</span>
                       <h2 className="text-6xl md:text-8xl font-display font-black uppercase leading-tight text-[#0c0a28] tracking-tighter">{selectedProject.title}</h2>
                    </div>
                    
                     <p className="text-xl text-gray-500 leading-relaxed font-medium">
                      {selectedProject.longDescription}
                    </p>

                    <div className="flex flex-wrap gap-2">
                        {selectedProject.tags.map(tag => (
                          <span key={tag} className="px-5 py-2 bg-gray-50 border border-gray-100 text-[10px] font-bold tracking-widest uppercase text-gray-400 rounded-full">{tag}</span>
                       ))}
                    </div>

                    <div className="flex flex-wrap gap-6 pt-10">
                        {selectedProject.liveUrl && (
                          <a href={selectedProject.liveUrl} target="_blank" rel="noreferrer" className="bg-[#0c0a28] text-white px-10 py-5 rounded-2xl font-black text-[10px] tracking-widest uppercase flex items-center gap-4 hover:scale-105 transition-all shadow-xl shadow-indigo-100">
                             Visit Link <ExternalLink className="w-4 h-4" />
                          </a>
                       )}
                       
                       <button className="bg-white border border-gray-100 px-10 py-5 flex items-center gap-4 font-black uppercase text-[10px] tracking-widest text-[#0c0a28] hover:bg-gray-50 transition-all rounded-2xl">
                         Details <Github className="w-4 h-4" />
                       </button>
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
