import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowRight, Play, Github, Linkedin, Globe, Mail, Zap, Target, Cpu, Download } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import ImageSequenceCanvas from './ImageSequenceCanvas';
import { SmartphoneFrame } from './SmartphoneFrame';
import { NeuralInterface } from './NeuralInterface';



const SOCIALS = [
  { icon: Github, label: 'GitHub', url: 'https://github.com/AlinsBinuP' },
  { icon: Linkedin, label: 'LinkedIn', url: 'https://www.linkedin.com/in/alinsbinu/' },
  { icon: Globe, label: 'Website', url: '#' },
  { icon: Mail, label: 'Email', url: 'mailto:alinsbinukochuthovala@gmail.com' }
];

const InteractiveName = ({ text }: { text: string }) => {
  return (
    <motion.div className="flex flex-wrap gap-x-2 lg:gap-x-4">
      {text.split(' ').map((word, wordIndex) => (
        <div key={wordIndex} className="flex overflow-hidden">
          {word.split('').map((char, charIndex) => (
            <motion.span
              key={charIndex}
              whileHover={{ 
                y: -10, 
                color: '#6366f1',
                transition: { duration: 0.2, ease: "easeOut" }
              }}
              className="inline-block cursor-default select-none"
            >
              {char}
            </motion.span>
          ))}
        </div>
      ))}
    </motion.div>
  );
};

export const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress: rawProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Use spring for extra smoothness across all transforms
  const scrollYProgress = useSpring(rawProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Sequential Reveal Transforms
  const introOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 1]);
  const introScale = useTransform(scrollYProgress, [0, 0.1], [1, 1.05]);
  
  const titleOpacity = useTransform(scrollYProgress, [0.02, 0.12], [0, 1]);
  const titleY = useTransform(scrollYProgress, [0.02, 0.12], [30, 0]);

  const descOpacity = useTransform(scrollYProgress, [0.1, 0.2], [0, 1]);
  const descY = useTransform(scrollYProgress, [0.1, 0.2], [30, 0]);

  const buttonsOpacity = useTransform(scrollYProgress, [0.18, 0.28], [0, 1]);
  const buttonsY = useTransform(scrollYProgress, [0.18, 0.28], [30, 0]);

  const extrasOpacity = useTransform(scrollYProgress, [0.25, 0.35], [0, 1]);
  const extrasY = useTransform(scrollYProgress, [0.25, 0.35], [30, 0]);

  // Smartphone Transforms
  const phoneOpacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]);
  const phoneScale = useTransform(scrollYProgress, [0, 0.15], [0.55, 1]); // Much smaller starting scale for mobile
  const phoneRotate = useTransform(scrollYProgress, [0, 0.3], [5, 0]);
  const phoneY = useTransform(scrollYProgress, [0, 0.1], [50, 0]);

  // Screen Glow Transform
  const screenGlow = useTransform(scrollYProgress, [0, 0.3, 0.36, 0.4], [1, 1, 0, 0]);

  return (
    <div ref={containerRef} className="relative h-[500vh]">
      <section className="sticky top-0 h-screen bg-white overflow-hidden pt-32 md:pt-32 pb-10 md:pb-20 px-6 md:px-12 lg:px-24 flex items-start lg:items-center justify-center select-none">
        
        {/* Background Decorative Elements */}
        <div className="absolute inset-0 z-0 pointer-events-none">
           <div className="absolute top-[10%] right-[20%] w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-indigo-50/50 blur-[60px] md:blur-[120px] rounded-full" />
           <div className="absolute bottom-[10%] left-[10%] w-[200px] md:w-[400px] h-[200px] md:h-[400px] bg-emerald-50/30 blur-[50px] md:blur-[100px] rounded-full" />
        </div>

        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center relative z-10">
          
          {/* Left Side: Social Floating Bar (Hidden on mobile) */}
          <div className="hidden lg:flex lg:col-span-1 flex-col items-center">
             <motion.div 
               style={{ opacity: extrasOpacity }}
               className="bg-white/40 backdrop-blur-3xl border border-gray-100 p-4 rounded-full shadow-xl shadow-gray-100/50 flex flex-col gap-8"
             >
                {SOCIALS.map((s, i) => (
                  <motion.a
                    key={s.label}
                    href={s.url}
                    whileHover={{ scale: 1.2, color: '#6366f1' }}
                    className="text-gray-400 transition-colors"
                  >
                    <s.icon size={20} />
                  </motion.a>
                ))}
             </motion.div>
          </div>

          {/* Center Content: Sequential Text Reveal */}
          <div className="lg:col-span-6 flex flex-col gap-6 md:gap-10 text-center lg:text-left items-center lg:items-start order-2 lg:order-1">
             <div className="flex flex-col gap-4 md:gap-8">
                {/* 1. Intro Label */}
                <motion.div 
                  style={{ opacity: introOpacity, scale: introScale }}
                  className="flex flex-col gap-1 mb-2 items-center lg:items-start"
                >
                   <div className="flex items-center gap-3">
                      <div className="w-8 md:w-12 h-[2px] bg-indigo-600/30" />
                      <span className="text-[10px] md:text-[11px] font-black text-indigo-600 uppercase tracking-[0.3em] md:tracking-[0.4em]">Developer & Architect</span>
                   </div>
                   <div className="text-4xl md:text-7xl lg:text-8xl font-display font-black tracking-tighter leading-none bg-clip-text text-transparent bg-gradient-to-r from-[#0c0a28] to-[#6366f1] drop-shadow-sm py-2">
                      <InteractiveName text="Alins Binu" />
                   </div>
                </motion.div>

                {/* 2. Main Heading */}
                <motion.div
                  style={{ opacity: titleOpacity, y: titleY }}
                  className="flex flex-col gap-2"
                >
                   <h1 className="text-3xl md:text-6xl font-display font-black text-[#0c0a28] tracking-tighter leading-[1] flex flex-wrap justify-center lg:justify-start gap-x-[0.3em]">
                      <span className="cursor-default hover:text-indigo-600 transition-colors duration-300">Designing</span>
                      <span className="text-indigo-600 cursor-default hover:text-purple-600 transition-colors duration-300 font-serif italic font-normal">Future,</span>
                      <br className="hidden md:block w-full" />
                      <span className="cursor-default hover:text-pink-500 transition-colors duration-300">Building</span>
                      <span className="text-pink-500 cursor-default hover:text-emerald-500 transition-colors duration-300">Reality</span>
                   </h1>
                </motion.div>

                {/* 3. Description */}
                <motion.p 
                  style={{ opacity: descOpacity, y: descY }}
                  className="text-sm md:text-xl text-gray-400 font-medium leading-relaxed max-w-md mx-auto lg:mx-0 mt-2"
                >
                  I craft digital experiences that blend creativity, technology and purpose.
                </motion.p>

                {/* 4. Action Buttons */}
                <motion.div 
                  style={{ opacity: buttonsOpacity, y: buttonsY }}
                  className="flex flex-wrap justify-center lg:justify-start gap-4 md:gap-6 pt-4"
                >
                   <NavLink to="/projects">
                      <motion.button
                        whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(99,102,241,0.2)' }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-[#0c0a28] text-white px-6 md:px-10 py-4 md:py-5 rounded-xl md:rounded-2xl font-black text-[10px] md:text-[12px] uppercase tracking-widest flex items-center gap-3 md:gap-4 transition-all"
                      >
                        Explore <ArrowRight size={16} />
                      </motion.button>
                   </NavLink>
                   
                   <motion.a
                     href="/Alins Binu Resume.pdf"
                     download="Alins Binu Resume.pdf"
                     whileHover={{ scale: 1.05, backgroundColor: '#f8fafc' }}
                     whileTap={{ scale: 0.95 }}
                     className="bg-white text-[#0c0a28] border border-gray-100 px-6 md:px-10 py-4 md:py-5 rounded-xl md:rounded-2xl font-black text-[10px] md:text-[12px] uppercase tracking-widest flex items-center gap-3 md:gap-4 transition-all shadow-sm cursor-pointer"
                   >
                     Download CV <Download size={16} />
                   </motion.a>
                </motion.div>
             </div>

             {/* 5. INTERACTIVE NEURAL INTERFACE */}
             <motion.div 
               style={{ opacity: extrasOpacity, y: extrasY }}
               className="mt-4 md:mt-8 w-full max-w-sm"
             >
                <NeuralInterface />
             </motion.div>



          </div>

          {/* Right Content: Smartphone Visual */}
          <div className="lg:col-span-5 relative flex items-center justify-center h-full min-h-[380px] md:min-h-[700px] order-1 lg:order-2 mt-4 lg:mt-0">
             <motion.div
               style={{ 
                 opacity: phoneOpacity, 
                 scale: phoneScale,
                 rotate: phoneRotate,
                 y: phoneY
               }}
               className="relative flex flex-col items-center gap-4 md:gap-8 w-full max-w-[260px] md:max-w-none"
             >
                <SmartphoneFrame glowOpacity={screenGlow} className="scale-[0.55] md:scale-100 origin-center">
                   <ImageSequenceCanvas 
                     progress={scrollYProgress} 
                     className="w-full h-full grayscale-0 transition-all duration-700" 
                   />
                </SmartphoneFrame>

                {/* Big Beautiful Flutter Architect Banner Style */}
                <motion.div
                  style={{ opacity: buttonsOpacity }}
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="w-full max-w-[260px] md:max-w-[340px] bg-white/80 backdrop-blur-3xl p-4 md:p-6 rounded-2xl md:rounded-[32px] border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.05)] flex items-center gap-4 md:gap-6 relative z-40 mt-[-60px] md:mt-0"
                >
                   <div className="w-10 md:w-14 h-10 md:h-14 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg md:rounded-2xl flex items-center justify-center shadow-inner border border-blue-100/50">
                      <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg" className="w-6 md:w-8 h-6 md:h-8 object-contain" alt="Flutter" />
                   </div>
                   <div className="flex flex-col gap-0.5 md:gap-1 text-left">
                      <div className="flex items-center gap-2">
                        <span className="text-[9px] md:text-[11px] font-black text-[#0c0a28] uppercase tracking-[0.15em] md:tracking-[0.2em]">Flutter</span>
                        <div className="w-1 h-1 bg-blue-400 rounded-full animate-pulse" />
                      </div>
                      <span className="text-[11px] md:text-[13px] font-bold text-gray-400 uppercase tracking-[0.05em] md:tracking-[0.1em]">Lead Architect</span>
                   </div>
                   <div className="ml-auto w-8 md:w-10 h-8 md:h-10 rounded-full bg-gray-50 flex items-center justify-center border border-gray-100 shadow-sm">
                      <ArrowRight size={14} md:size={16} className="text-gray-300" />
                   </div>
                </motion.div>
             </motion.div>
          </div>

        </div>
        
        {/* Background Text Overlay */}
        <div className="absolute -bottom-10 md:-bottom-20 left-0 w-full whitespace-nowrap overflow-hidden pointer-events-none opacity-[0.015] md:opacity-[0.02] select-none">
           <span className="text-[120px] md:text-[300px] font-black text-black tracking-tighter leading-none uppercase">ENGINEER DESIGNER VISIONARY</span>
        </div>
      </section>
    </div>
  );
};
