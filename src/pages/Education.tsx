import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { GraduationCap, School, University } from 'lucide-react';
import { Magnetic } from '../components/Magnetic';

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
    <div ref={containerRef} className="relative h-[300vh] bg-transparent overflow-visible text-[var(--text-primary)]">
      <div className="sticky top-0 h-screen w-full flex items-center overflow-hidden">
        {/* Background Depth & Splashes */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          {/* Holi Splash Backgrounds */}
        <div className="holi-splash w-[800px] h-[800px] bg-[var(--accent-primary)] top-[-10%] right-[-10%] opacity-10" />
        <div className="holi-splash w-[1000px] h-[1000px] bg-[var(--accent-secondary)] bottom-[-20%] left-[-10%] opacity-10" />
        <div className="holi-splash w-[600px] h-[600px] bg-[var(--accent-tertiary)] top-[40%] right-[10%] opacity-05" />
        </div>

        {/* Progress Line Background */}
        <div className="absolute top-1/2 left-0 w-full h-[2px] bg-[var(--glass-border)] -z-10" />
        
        {/* Animated Progress Line */}
        <motion.div 
          style={{ scaleX: scrollYProgress, transformOrigin: "left" }}
          className="absolute top-1/2 left-0 w-full h-[2px] bg-[var(--accent-primary)] z-0 shadow-[0_0_20px_var(--accent-primary)]"
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
                    className="text-[30vw] font-heavy text-[var(--text-primary)]"
                  >
                    {edu.id}
                  </motion.span>
              </div>

              <motion.div 
                className="relative z-10 max-w-4xl w-full"
                style={{
                  rotateY: useTransform(scrollYProgress, 
                    [(i)/EDUCATION.length, (i+0.5)/EDUCATION.length, (i+1)/EDUCATION.length], 
                    ['-15deg', '0deg', '15deg']
                  ),
                  transformPerspective: 1000
                }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                   <motion.div
                     initial={{ opacity: 0, x: -50 }}
                     whileInView={{ opacity: 1, x: 0 }}
                     transition={{ duration: 0.8 }}
                   >
                       <div className="mb-6 flex items-center gap-4">
                         <span className="px-5 py-1.5 bg-[var(--bg-secondary)] border border-[var(--glass-border)] text-[10px] font-black tracking-widest text-[var(--accent-primary)] rounded-full">{edu.year}</span>
                         {edu.current && (
                           <span className="flex items-center gap-2 px-5 py-1.5 bg-[var(--bg-secondary)] text-[var(--accent-primary)] text-[10px] font-black tracking-widest rounded-full border border-[var(--accent-primary)]/20">
                             <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                             CURRENT
                           </span>
                         )}
                      </div>
                      
                      <Magnetic strength={20}>
                        <h3 className="text-5xl md:text-7xl font-display font-black mb-8 leading-tight tracking-tighter text-[var(--text-primary)] uppercase cursor-default">
                          {edu.title}
                        </h3>
                      </Magnetic>
                      
                       <p className="text-xl text-[var(--text-secondary)] font-light leading-relaxed italic border-l-2 border-[var(--accent-primary)]/30 pl-6">
                         {edu.school}
                       </p>
                   </motion.div>

                    <motion.div
                     initial={{ opacity: 0, scale: 0.8 }}
                     whileInView={{ opacity: 1, scale: 1 }}
                     transition={{ duration: 0.8, delay: 0.2 }}
                      className="bg-[var(--card-bg)] border border-[var(--glass-border)] p-10 md:p-14 rounded-[40px] shadow-2xl relative group watercolor-border"
                   >
                      <div className="absolute top-6 right-6 p-8 text-[var(--accent-primary)]/10 group-hover:text-[var(--accent-primary)]/20 transition-colors">
                         <edu.icon size={100} />
                      </div>
                      <p className="text-xl md:text-2xl text-[var(--text-primary)] mb-12 font-light leading-relaxed relative z-10">
                         "{edu.desc}"
                      </p>
                       <div className="flex flex-wrap gap-4 relative z-10">
                         {["Computer Science", "Engineering", "Flutter"].map(tag => (
                           <span key={tag} className="text-[9px] font-black tracking-widest uppercase text-[var(--text-secondary)] opacity-60">{tag}</span>
                         ))}
                      </div>
                   </motion.div>
                </div>
              </motion.div>

              {/* Floating year above station */}
               <motion.div 
                initial={{ opacity: 0, y: -40 }}
                whileInView={{ opacity: 0.05, y: -200 }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 text-8xl font-heavy text-[var(--text-primary)] pointer-events-none uppercase"
              >
                {edu.year.split(" ")[0]}
              </motion.div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Intro label */}
       <div className="absolute top-48 left-12 z-20">
          <span className="text-[var(--accent-primary)] font-mono text-[11px] font-black tracking-[0.4em] block opacity-90 uppercase">// ACADEMIC ODYSSEY</span>
       </div>
    </div>
  );
};
