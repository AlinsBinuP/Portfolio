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
    <div ref={containerRef} className="relative h-[300vh] bg-transparent overflow-visible">
      <div className="sticky top-0 h-screen w-full flex items-center overflow-hidden">
        {/* Progress Line Background */}
        <div className="absolute top-1/2 left-0 w-full h-[2px] bg-white/5 -z-10" />
        
        {/* Animated Progress Line */}
        <motion.div 
          style={{ scaleX: scrollYProgress, transformOrigin: "left" }}
          className="absolute top-1/2 left-0 w-full h-[2px] bg-sky-blue-glow shadow-glow-sm z-0"
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
                   whileInView={{ opacity: 0.08 }}
                   className="text-[30vw] font-display font-black text-white"
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
                        <span className="px-4 py-1 cinematic-glass border-white/20 text-[10px] font-black tracking-widest text-sky-blue-glow">{edu.year}</span>
                        {edu.current && (
                          <span className="flex items-center gap-2 px-4 py-1 bg-sky-blue-vibrant/20 text-sky-blue-glow text-[10px] font-black tracking-widest rounded-full border border-sky-blue-vibrant/30">
                            <span className="w-1.5 h-1.5 bg-sky-blue-glow rounded-full animate-pulse" />
                            CURRENT
                          </span>
                        )}
                     </div>
                     <h3 className="text-4xl md:text-6xl font-display font-black mb-6 leading-tight tracking-tight">
                        {edu.title}
                     </h3>
                     <p className="text-xl text-white/40 font-light leading-relaxed">
                        {edu.school}
                     </p>
                   </motion.div>

                   <motion.div
                     initial={{ opacity: 0, scale: 0.8 }}
                     whileInView={{ opacity: 1, scale: 1 }}
                     transition={{ duration: 0.8, delay: 0.2 }}
                     className="cinematic-glass p-8 md:p-12 border-white/10 relative group"
                   >
                     <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-30 transition-opacity">
                        <edu.icon size={80} />
                     </div>
                     <p className="text-lg md:text-xl text-white/60 mb-8 font-light italic">
                        "{edu.desc}"
                     </p>
                     <div className="flex gap-2">
                        {["Computer Science", "Engineering", "Flutter"].map(tag => (
                          <span key={tag} className="text-[9px] font-black tracking-widest uppercase text-white/30">{tag}</span>
                        ))}
                     </div>
                   </motion.div>
                </div>
              </div>

              {/* Floating year above station */}
              <motion.div 
                initial={{ opacity: 0, y: -40 }}
                whileInView={{ opacity: 0.1, y: -200 }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 text-8xl font-display font-black text-white pointer-events-none"
              >
                {edu.year.split(" ")[0]}
              </motion.div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Intro label */}
      <div className="absolute top-48 left-12 z-20">
         <span className="text-sky-blue-glow font-mono text-sm tracking-[0.4em] block drop-shadow-glow">// ACADEMIC ODYSSEY</span>
      </div>
    </div>
  );
};
