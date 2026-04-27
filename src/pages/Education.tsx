import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { GraduationCap, School, University } from 'lucide-react';

const EDUCATION = [
  {
    id: "01",
    title: "10th Grade",
    school: "Auxilium ICSE School, Kattappana",
    desc: "Foundation in technology and logic.",
    year: "2019",
    icon: School,
    color: "#60a5fa"
  },
  {
    id: "02",
    title: "+2 / Higher Secondary",
    school: "St. George HSS, Kattappana",
    desc: "Science Stream with focus on Mathematics.",
    year: "2021",
    icon: GraduationCap,
    color: "#38bdf8"
  },
  {
    id: "03",
    title: "B.Tech Computer Science",
    school: "Amal Jyothi College, Kanjirappally",
    desc: "4th Year · Flutter & Cross-plat Architectures.",
    year: "2021 - Present",
    current: true,
    icon: University,
    color: "#02569B"
  }
];

export const Education = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-66.6%"]);

  return (
    <div ref={containerRef} className="relative h-[300vh] bg-white overflow-visible">
      <div className="sticky top-0 h-screen w-full flex items-center overflow-hidden">
        {/* Background Depth */}
        <div className="absolute inset-0 z-0 pointer-events-none">
           <div className="absolute top-0 left-0 w-full h-[60vh] bg-[radial-gradient(ellipse_at_center,_#c8e8ff_0%,_transparent_70%)] opacity-30" />
        </div>

        {/* Progress Line Background */}
        <div className="absolute top-1/2 left-0 w-full h-[2px] bg-black/[0.04] -z-10" />
        
        {/* Animated Progress Line */}
        <motion.div 
          style={{ scaleX: scrollYProgress, transformOrigin: "left" }}
          className="absolute top-1/2 left-0 w-full h-[2px] bg-[#0369a1] z-0"
        />

        <motion.div style={{ x }} className="flex h-full items-center">
          {EDUCATION.map((edu, i) => (
            <div 
              key={edu.id} 
              className="w-screen flex-shrink-0 flex items-center justify-center px-8 md:px-20 relative"
            >
              {/* Massive Decorative Number */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                 <motion.span 
                   initial={{ opacity: 0 }}
                   whileInView={{ opacity: 0.05 }}
                   className="text-[30vw] font-heavy text-[#0a0a0a]"
                 >
                   {edu.id}
                 </motion.span>
              </div>

              <div className="relative z-10 max-w-4xl w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                   <motion.div
                     initial={{ opacity: 0, x: -50 }}
                     whileInView={{ opacity: 1, x: 0 }}
                     transition={{ duration: 0.8 }}
                   >
                      <div className="mb-6 flex items-center gap-4">
                         <span className="px-5 py-1.5 bg-[#f1f5f9] border border-black/[0.03] text-[10px] font-black tracking-widest text-[#0369a1]">{edu.year}</span>
                         {edu.current && (
                           <span className="flex items-center gap-2 px-5 py-1.5 bg-sky-50 text-[#0369a1] text-[10px] font-black tracking-widest rounded-full border border-[#0369a1]/10">
                             <span className="w-1.5 h-1.5 bg-[#10b981] rounded-full animate-pulse" />
                             CURRENT
                           </span>
                         )}
                      </div>
                      <h3 className="text-5xl md:text-7xl font-heavy mb-8 leading-tight tracking-tighter text-[#0a0a0a] uppercase">
                         {edu.title}
                      </h3>
                      <p className="text-xl text-[#64748b] font-light leading-relaxed italic border-l-2 border-[#0369a1]/20 pl-6">
                         {edu.school}
                      </p>
                   </motion.div>

                   <motion.div
                     initial={{ opacity: 0, scale: 0.8 }}
                     whileInView={{ opacity: 1, scale: 1 }}
                     transition={{ duration: 0.8, delay: 0.2 }}
                     className="bg-white p-10 md:p-14 border border-black/[0.06] rounded-[40px] shadow-2xl relative group"
                   >
                      <div className="absolute top-6 right-6 p-8 text-[#0369a1]/[0.05] group-hover:text-[#0369a1]/10 transition-colors">
                         <edu.icon size={100} />
                      </div>
                      <p className="text-xl md:text-2xl text-[#4a5568] mb-12 font-light leading-relaxed">
                         "{edu.desc}"
                      </p>
                      <div className="flex flex-wrap gap-4">
                         {["Computer Science", "Engineering", "Flutter"].map(tag => (
                           <span key={tag} className="text-[9px] font-black tracking-widest uppercase text-[#94a3b8]">{tag}</span>
                         ))}
                      </div>
                   </motion.div>
                </div>
              </div>

              {/* Floating year above station */}
              <motion.div 
                initial={{ opacity: 0, y: -40 }}
                whileInView={{ opacity: 0.05, y: -200 }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 text-8xl font-heavy text-[#0a0a0a] pointer-events-none uppercase"
              >
                {edu.year.split(" ")[0]}
              </motion.div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Intro label */}
      <div className="absolute top-48 left-12 z-20">
         <span className="text-[#0369a1] font-mono text-[11px] font-black tracking-[0.4em] block opacity-70 uppercase">// ACADEMIC ODYSSEY</span>
      </div>
    </div>
  );
};
