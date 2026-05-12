import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { GraduationCap, School, University } from 'lucide-react';
import { InteractiveTitle } from '../components/redesign/InteractiveTitle';

const EDUCATION = [
  {
    id: "01",
    title: "10th GRADE",
    school: "Auxilium ICSE School, Kattappana",
    desc: "Foundation in technology and logic. First steps into the world of computer science.",
    year: "2019",
    icon: School,
    image: "/2025-04-24.webp",
    gradient: "blue-cyan" as const,
    tags: ["ICSE", "Logic", "Foundation"]
  },
  {
    id: "02",
    title: "HIGHER SECONDARY",
    school: "St. George HSS, Kattappana",
    desc: "Science Stream with focus on Mathematics. Developing analytical thinking.",
    year: "2021",
    icon: GraduationCap,
    image: "/st-george-higher-secondary-school-kattappana-south-idukki-senior-secondary-schools-jtclzoukqt-250.webp",
    gradient: "purple-pink" as const,
    tags: ["Science", "Maths", "Analytical"]
  },
  {
    id: "03",
    title: "CS ENGINEERING",
    school: "Amal Jyothi College, Kanjirappally",
    desc: "4th Year · Flutter & Cross-platform Architectures. Mastering the art of building production-ready apps.",
    year: "2021 - Present",
    current: true,
    icon: University,
    image: "/ajce_campus_location_imgae1.jpg",
    gradient: "indigo-violet" as const,
    tags: ["B.Tech", "CS", "Flutter Lead"]
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
    <div ref={containerRef} className="relative h-[300vh] bg-white overflow-visible text-[#0c0a28]">
      <div className="sticky top-0 h-screen w-full flex items-center overflow-hidden">
        
        {/* Soft Background Glows */}
        <div className="absolute inset-0 z-0 pointer-events-none">
           <div className="absolute top-[20%] left-[10%] w-[500px] h-[500px] bg-purple-50 blur-[120px] rounded-full opacity-60" />
           <div className="absolute bottom-[20%] right-[10%] w-[600px] h-[600px] bg-blue-50 blur-[150px] rounded-full opacity-40" />
        </div>

        {/* Progress Line Background */}
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gray-100 -z-10" />
        
        {/* Animated Progress Line */}
        <motion.div 
          style={{ scaleX: scrollYProgress, transformOrigin: "left" }}
          className="absolute top-1/2 left-0 w-full h-[1px] bg-indigo-600 z-0 shadow-[0_0_10px_rgba(79,70,229,0.2)]"
        />

        <motion.div style={{ x }} className="flex h-full items-center">
          {EDUCATION.map((edu, i) => (
            <div 
              key={edu.id} 
              className="w-screen flex-shrink-0 flex items-center justify-center px-8 lg:px-24 relative"
            >
              {/* Massive Decorative Number */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none overflow-hidden w-full h-full flex items-center justify-center">
                  <motion.span 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 0.05 }}
                    className="text-[45vw] font-black text-[#0c0a28] select-none"
                  >
                    {edu.id}
                  </motion.span>
              </div>

              <motion.div 
                className="relative z-10 max-w-7xl w-full"
                style={{
                  rotateY: useTransform(scrollYProgress, 
                    [(i)/EDUCATION.length, (i+0.5)/EDUCATION.length, (i+1)/EDUCATION.length], 
                    ['-5deg', '0deg', '5deg']
                  ),
                  transformPerspective: 2000
                }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
                   
                   {/* Left: Text Content */}
                   <motion.div
                     initial={{ opacity: 0, x: -50 }}
                     whileInView={{ opacity: 1, x: 0 }}
                     transition={{ duration: 0.8 }}
                     className="lg:col-span-5 flex flex-col gap-8"
                   >
                        <div className="flex items-center gap-4">
                          <span className="px-6 py-2 bg-[#0c0a28] text-white text-[10px] font-black tracking-widest rounded-2xl">{edu.year}</span>
                          {edu.current && (
                            <span className="flex items-center gap-2 px-6 py-2 bg-emerald-50 text-emerald-600 text-[10px] font-black tracking-widest rounded-2xl border border-emerald-100 shadow-sm">
                              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                              ACTIVE
                            </span>
                          )}
                       </div>
                      
                       <div className="flex flex-col gap-2">
                          <InteractiveTitle 
                            text={edu.title} 
                            highlight={edu.title.split(" ")[0]}
                            gradient={edu.gradient}
                            className="text-6xl md:text-8xl font-display font-black tracking-tighter leading-none" 
                          />
                          <p className="text-xl md:text-2xl text-gray-400 font-medium leading-tight max-w-md mt-2">
                            {edu.school}
                          </p>
                       </div>

                       <div className="h-px w-20 bg-indigo-100" />
                      
                       <p className="text-lg text-gray-500 font-medium leading-relaxed max-w-sm italic">
                         "{edu.desc}"
                       </p>

                       <div className="flex flex-wrap gap-3">
                          {edu.tags.map(tag => (
                            <span key={tag} className="px-4 py-1.5 bg-gray-50 border border-gray-100 text-[9px] font-black tracking-widest uppercase text-gray-400 rounded-full">{tag}</span>
                          ))}
                       </div>
                   </motion.div>

                   {/* Right: Image Visual */}
                   <motion.div
                     initial={{ opacity: 0, scale: 0.9, x: 50 }}
                     whileInView={{ opacity: 1, scale: 1, x: 0 }}
                     transition={{ duration: 0.8, delay: 0.2 }}
                     className="lg:col-span-7 relative group"
                   >
                      <div className="relative aspect-[16/10] overflow-hidden rounded-[48px] shadow-[0_40px_100px_rgba(0,0,0,0.12)] border border-gray-100">
                         <motion.img 
                           src={edu.image} 
                           alt={edu.school}
                           className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                           whileHover={{ scale: 1.1 }}
                         />
                         <div className="absolute inset-0 bg-gradient-to-t from-[#0c0a28]/60 via-transparent to-transparent opacity-60" />
                         
                         {/* Floating Icon Over Image */}
                         <div className="absolute bottom-10 right-10 w-20 h-20 bg-white/90 backdrop-blur-md rounded-3xl flex items-center justify-center text-[#0c0a28] shadow-2xl border border-white/20 transform rotate-12 group-hover:rotate-0 transition-transform duration-500">
                            <edu.icon size={32} />
                         </div>
                      </div>

                      {/* Decorative Floating Elements */}
                      <div className="absolute -top-10 -right-10 w-32 h-32 bg-indigo-50 blur-3xl rounded-full opacity-50 group-hover:opacity-80 transition-opacity" />
                      <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-pink-50 blur-3xl rounded-full opacity-40 group-hover:opacity-70 transition-opacity" />
                   </motion.div>
                </div>
              </motion.div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Header Label */}
      <div className="fixed top-48 left-12 z-20 pointer-events-none">
         <span className="text-indigo-600/40 font-black text-[10px] tracking-[0.5em] block uppercase">Academic Odyssey</span>
      </div>
    </div>
  );
};
