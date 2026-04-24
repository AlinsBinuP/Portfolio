import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Globe, User, Cpu, Code, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Magnetic } from '../components/Magnetic';

export const Home = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  
  const textY = useTransform(scrollY, [0, 800], [0, 450]);
  const textOpacity = useTransform(scrollY, [0, 500], [1, 0.05]);
  const nameX = useTransform(scrollY, [0, 800], [0, -100]);
  const photoY = useTransform(scrollY, [0, 800], [0, -180]);
  const photoRotate = useTransform(scrollY, [0, 800], [0, -5]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-transparent text-white" ref={containerRef}>
      {/* Background Depth */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <motion.div
           animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
           transition={{ duration: 15, repeat: Infinity }}
           className="absolute top-[5%] right-[5%] w-[1000px] h-[1000px] bg-sky-blue-glow/10 blur-[250px] rounded-full"
        />
        <motion.div
           animate={{ scale: [1.2, 1, 1.2], opacity: [0.1, 0.2, 0.1] }}
           transition={{ duration: 12, repeat: Infinity }}
           className="absolute bottom-[5%] left-[5%] w-[1200px] h-[1200px] bg-[#CC00FF]/5 blur-[300px] rounded-full"
        />
      </div>

      <section className="relative min-h-screen flex items-center px-8 md:px-20 pt-20">
        {/* Giant Background Watermark */}
        <div className="absolute inset-0 flex items-center pointer-events-none z-0 overflow-visible">
          <motion.h1 
            style={{ x: nameX }}
            className="text-[clamp(80px,13vw,180px)] font-display font-black leading-none text-white/5 tracking-tighter whitespace-nowrap w-full overflow-visible"
          >
            ALINS BINU · ALINS BINU · ALINS BINU
          </motion.h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center w-full relative z-20">
          {/* Left: Description & Buttons */}
          <div className="lg:col-span-6 space-y-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <h3 className="font-serif italic text-white/90 mb-6" style={{ fontSize: 'clamp(32px, 4.5vw, 58px)' }}>Hey, I'm</h3>
              
              <h1 className="flex flex-col gap-0 mb-10">
                {["ALINS", "BINU"].map((name, i) => (
                  <motion.span 
                    key={i}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1.2, delay: 0.2 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="font-display font-black leading-[0.85] tracking-tighter"
                    style={{ 
                      fontSize: 'clamp(70px, 12vw, 160px)',
                      background: 'linear-gradient(90deg, #ffffff 0%, #f8fafc 50%, #e2e8f0 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      filter: 'drop-shadow(0 0 40px rgba(255,255,255,0.3))'
                    }}
                  >
                    {name}
                  </motion.span>
                ))}
              </h1>

              <p 
                className="font-tagline font-light text-white/80 max-w-[420px] text-lg md:text-xl leading-[1.7]"
              >
                Flutter developer from the hills of Kerala — building high-performance mobile architectures and crafting digital experiences that resonate.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="flex items-center gap-10"
            >
              <Magnetic strength={30}>
                <Link to="/projects" className="group bg-white text-midnight px-10 py-5 rounded-full font-black text-[10px] tracking-widest uppercase flex items-center gap-4 hover:bg-sky-blue-glow transition-all shadow-2xl">
                  View Projects <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Magnetic>
              
              <Link to="/about" className="text-white/40 hover:text-white font-black text-[10px] tracking-widest uppercase transition-colors flex items-center gap-2 group">
                 <span className="w-8 h-px bg-white/20 group-hover:w-12 transition-all" /> The Story
              </Link>
            </motion.div>
          </div>

          {/* Right Area: Photo & Role */}
          <div className="lg:col-span-6 relative h-[600px] md:h-[800px] flex items-center group/hero">
             {/* Photo Immersion */}
             <motion.div 
               initial={{ opacity: 0, scale: 1.1 }}
               animate={{ opacity: 1, scale: 1 }}
               whileHover={{ scale: 1.05, x: -10 }}
               style={{ y: photoY, rotate: photoRotate }}
               transition={{ duration: 1.5 }}
               className="absolute right-0 top-0 bottom-0 w-[120%] h-full md:w-[130%] -mr-[20%] pointer-events-none cursor-none"
             >
                <div className="w-full h-full relative">
                  <div 
                    className="absolute inset-0 z-10"
                    style={{ 
                      background: 'radial-gradient(circle at 60% 50%, transparent 0%, rgba(56, 189, 248, 0.1) 100%)',
                      mixBlendMode: 'plus-lighter'
                    }}
                  />
                  <img 
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1500" 
                    className="w-full h-full object-cover filter brightness-[1.05] saturate-[1.1] grayscale-[0.2] contrast-[1.05] group-hover/hero:saturate-[1.3] transition-all duration-700"
                    alt="Alins Binu"
                  />
                </div>
             </motion.div>

             {/* Role Descriptor Block */}
             <div className="absolute right-0 bottom-20 md:bottom-32 z-30 text-right pointer-events-auto">
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  whileHover={{ skewX: -5, x: 10 }}
                  transition={{ delay: 1, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                  className="cursor-none"
                >
                  <div className="text-white font-display font-black text-6xl md:text-9xl leading-[0.8] tracking-tighter uppercase drop-shadow-xl hover:text-sky-blue-glow transition-colors duration-500">
                    FLUTTER<br/>
                    <motion.span 
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 3, repeat: Infinity }}
                      className="text-sky-blue-glow"
                    >
                      DEV
                    </motion.span>
                  </div>
                </motion.div>
             </div>
          </div>
        </div>

      </section>

      {/* Overview Hub Section - Refactored to vertical immersive sections */}
      <section className="relative px-8 md:px-20 pt-20 pb-40 z-20 space-y-40">
        <div className="absolute inset-0 bg-grid-white/[0.02] -z-10" />
        
        {/* Section header */}
        <div className="max-w-7xl mx-auto mb-32">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-center"
          >
            <span className="text-sky-blue-glow font-mono text-[10px] tracking-[0.5em] uppercase mb-4 block">Navigation Hub</span>
            <h2 className="text-5xl md:text-8xl font-display font-bold text-white tracking-tight">Full Archive <span className="text-white/20 italic">Overview</span>.</h2>
          </motion.div>
        </div>

        {/* 1. About Section - Detailed Vertical */}
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-20">
          <div className="md:w-1/2 space-y-8">
             <div className="inline-flex items-center gap-4 text-sky-blue-glow font-display font-black text-xs tracking-widest uppercase mb-4">
                <User size={16} /> 01 // The Persona
             </div>
             <h2 className="text-4xl md:text-6xl font-display font-bold text-white leading-tight">About <span className="italic text-sky-blue-glow">Me</span></h2>
             <p className="text-white/60 text-lg leading-relaxed max-w-xl">
               I started out being drawn to visuals, layout systems, and design tools. 
               Over time, that pulled me deeper into frontend development and product building, 
               and now I enjoy working on projects where I can shape both the interface and the implementation.
             </p>
             <Link to="/about">
               <motion.button 
                 whileHover={{ scale: 1.05 }}
                 whileTap={{ scale: 0.95 }}
                 className="bg-white text-midnight px-8 py-4 rounded-full font-black text-[10px] tracking-widest uppercase flex items-center gap-4 mt-8"
               >
                 More About Me <ArrowRight size={14} />
               </motion.button>
             </Link>
          </div>
          <div className="md:w-1/2 relative flex justify-center py-20 px-4">
            {/* Visual Stack Element */}
            <div className="relative w-full max-w-[400px] h-[500px]">
               <motion.div 
                 initial={{ rotate: -10, x: -30 }}
                 whileInView={{ rotate: -5, x: 0 }}
                 className="absolute inset-0 bg-white/5 border border-white/10 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-sm z-0"
               >
                 <img src="https://images.unsplash.com/photo-1550439062-609e1531270e?q=80&w=600" className="w-full h-full object-cover opacity-30 grayscale" alt="Tech context" />
               </motion.div>
               <motion.div 
                 initial={{ rotate: 5, x: 30 }}
                 whileInView={{ rotate: 10, x: 0 }}
                 className="absolute inset-0 bg-white/5 border border-white/10 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-sm z-10 translate-y-8"
               >
                 <img src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=600" className="w-full h-full object-cover opacity-40 mix-blend-overlay" alt="Code context" />
               </motion.div>
               <motion.div 
                 initial={{ scale: 0.9, y: 50 }}
                 whileInView={{ scale: 1, y: 0 }}
                 className="absolute inset-0 z-20 rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] border-2 border-white/20"
               >
                 <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800" className="w-full h-full object-cover filter brightness-110" alt="Main Portrait" />
               </motion.div>
            </div>
          </div>
        </div>

        {/* 2. Projects Section - Immersive Detailed Card */}
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-display font-medium text-white mb-4">My Recent <span className="italic text-sky-blue-glow">Projects</span></h2>
            <p className="text-white/40 max-w-2xl mx-auto">Exploring the intersection of high-performance engineering and creative visual storytelling across multiple digital disciplines.</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
             <div className="lg:col-span-4 space-y-6">
                <div className="cinematic-glass p-10 border-white/10 space-y-6">
                   <h3 className="text-3xl font-display font-bold text-white tracking-tight">Interactive & Dynamic UIs</h3>
                   <p className="text-white/50 text-sm leading-relaxed">
                     Explore some of my recent frontend projects, featuring seamless animations, modern architectures, and highly responsive user interfaces tailored for high conversion.
                   </p>
                   <Link to="/projects">
                     <motion.button 
                       whileHover={{ x: 10 }}
                       className="text-sky-blue-glow font-black text-[10px] tracking-widest uppercase flex items-center gap-3"
                     >
                       View Projects <ArrowRight size={14} />
                     </motion.button>
                   </Link>
                </div>
             </div>
             <div className="lg:col-span-8 relative group">
                <div className="absolute -inset-4 bg-sky-blue-glow/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity rounded-full" />
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="relative cinematic-glass border-white/10 overflow-hidden rounded-[40px]"
                >
                  <img src="https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=1200" className="w-full h-[450px] object-cover opacity-80 group-hover:opacity-100 transition-opacity hover:scale-105 transition-transform duration-1000" alt="Projects Showcase" />
                  <div className="absolute inset-0 bg-gradient-to-t from-midnight to-transparent" />
                  <div className="absolute bottom-10 left-10">
                     <div className="bg-sky-blue-glow text-midnight font-bold text-[8px] px-3 py-1 rounded-full uppercase tracking-tighter mb-2">Featured Project</div>
                     <h4 className="text-2xl font-display font-bold text-white">Advanced Mobile Architecture</h4>
                  </div>
                </motion.div>
                
                {/* Decorative Sticker elements like in user image */}
                <motion.div 
                  initial={{ rotate: -15 }}
                  animate={{ y: [0, -20, 0] }}
                  transition={{ duration: 5, repeat: Infinity }}
                  className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-4 shadow-2xl z-30 hidden lg:block"
                >
                   <div className="w-full h-full rounded-2xl bg-white/10 flex items-center justify-center text-sky-blue-glow">
                      <Cpu size={48} />
                   </div>
                   <div className="absolute -top-4 -left-4 bg-sky-blue-glow text-midnight text-[8px] font-black px-3 py-1 rounded-full shadow-glow-sm">ENGINEERED</div>
                </motion.div>
             </div>
          </div>
        </div>

        {/* 3. Skills & Creative Section - Horizontal Ribbon/Visuals */}
        <div className="max-w-7xl mx-auto space-y-20">
           <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-display font-bold text-white">Creative Stuff</h2>
              <p className="text-white/40 max-w-2xl">Beyond engineering, I dive deep into visual aesthetics and digital artistry. From cinematic motion graphics to immersive 3D environments, these pieces represent my passion for pushing the boundaries of creative storytelling.</p>
           </div>
           
           <div className="relative overflow-hidden py-10 -mx-20 px-20">
              <div className="flex gap-8 overflow-x-auto pb-10 scrollbar-hide">
                 {[
                   "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&q=80",
                   "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&q=80",
                   "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=400&q=80",
                   "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=400&q=80",
                   "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?w=400&q=80",
                   "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&q=80"
                 ].map((img, i) => (
                   <Link to="/skills" key={i}>
                     <motion.div 
                       whileHover={{ scale: 1.1, rotateY: 10, y: -20 }}
                       className="min-w-[280px] h-[380px] rounded-[30px] overflow-hidden border-2 border-white/5 cursor-pointer relative group"
                     >
                        <img src={img} className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500" alt={`Creative Asset ${i}`} />
                        <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-midnight/90 to-transparent translate-y-10 group-hover:translate-y-0 transition-transform">
                           <span className="text-sky-blue-glow font-mono text-[8px] tracking-widest block mb-2 uppercase">Asset 0{i+1}</span>
                           <h4 className="text-white font-display font-bold text-lg">Visual Protocol</h4>
                        </div>
                     </motion.div>
                   </Link>
                 ))}
              </div>
           </div>
        </div>

        {/* 4. Education & Journey Section */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
           <div className="order-2 md:order-1 relative h-[400px]">
              <motion.div 
                animate={{ y: [0, 20, 0] }}
                transition={{ duration: 6, repeat: Infinity }}
                className="absolute inset-0 bg-white/5 rounded-3xl border border-white/10 p-8 flex flex-col justify-end overflow-hidden"
              >
                  <div className="absolute top-0 right-0 p-10 opacity-10">
                     <BookOpen size={200} />
                  </div>
                  <div className="relative z-10">
                     <div className="text-sky-blue-glow font-mono text-xs tracking-widest mb-2 uppercase">Core Path</div>
                     <h3 className="text-3xl font-display font-bold text-white mb-4">Academic Background</h3>
                     <p className="text-white/50 text-sm leading-relaxed mb-6">Pursuing Computer Science with a focus on human-computer interaction and mobile application development.</p>
                     <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-white italic font-serif">K</div>
                        <div>
                           <div className="text-white font-bold text-xs uppercase">Kerala AK</div>
                           <div className="text-white/30 text-[10px] uppercase">University Partner</div>
                        </div>
                     </div>
                  </div>
              </motion.div>
           </div>
           
           <div className="order-1 md:order-2 space-y-10 text-right md:text-left flex flex-col items-center md:items-start">
              <div className="inline-flex items-center gap-4 text-sky-blue-glow font-display font-black text-xs tracking-widest uppercase mb-4">
                 <BookOpen size={16} /> 04 // The Growth
              </div>
              <h2 className="text-4xl md:text-6xl font-display font-bold text-white leading-tight">Continuous <span className="italic text-sky-blue-glow text-5xl italic block lg:inline">Learning</span></h2>
              <p className="text-white/60 text-lg leading-relaxed max-w-xl">
                Education isn't just about the degree. It's about curiosity, building side projects that challenge your limits, and staying at the forefront of cross-platform technology.
              </p>
              <Link to="/education">
               <motion.button 
                 whileHover={{ scale: 1.05 }}
                 className="bg-white/5 border border-white/20 text-white px-8 py-4 rounded-full font-black text-[10px] tracking-widest uppercase flex items-center gap-4 mt-8"
               >
                 View My Path <ArrowRight size={14} />
               </motion.button>
              </Link>
           </div>
        </div>
      </section>


      {/* Hero Footnotes */}
      <div className="absolute bottom-12 left-8 md:left-20 right-8 md:right-20 flex items-center justify-between z-20 mix-blend-difference">
        <div className="flex items-center gap-8 text-[10px] font-bold tracking-[0.3em] text-white uppercase">
          <span>SCROLL TO DIVE</span>
          <motion.div 
            animate={{ y: [0, 10, 0] }} 
            transition={{ duration: 2, repeat: Infinity }}
            className="w-[1px] h-12 bg-white/30" 
          />
        </div>
        
        <div className="hidden md:flex gap-12 text-[10px] font-bold tracking-[0.3em] text-white uppercase">
          <span>KATTAPPANA, IDUKKI</span>
          <span>KERALA, INDIA</span>
        </div>
      </div>
    </div>
  );
};
