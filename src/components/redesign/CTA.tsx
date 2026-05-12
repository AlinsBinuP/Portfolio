import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Download } from 'lucide-react';
import { Link } from 'react-router-dom';
import { InteractiveTitle } from './InteractiveTitle';

export const CTA = () => {
  return (
    <section className="py-24 px-8 lg:px-24 bg-white relative overflow-hidden min-h-[600px] flex items-center">
      
      {/* Background Decorative Glows */}
      <div className="absolute inset-0 z-0 pointer-events-none">
         <div className="absolute top-[20%] left-[10%] w-[400px] h-[400px] bg-purple-50/50 blur-[100px] rounded-full" />
         <div className="absolute bottom-[20%] right-[30%] w-[500px] h-[500px] bg-blue-50/30 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        
        {/* Left Side: Content */}
        <div className="flex flex-col gap-10">
           <div className="flex flex-col gap-2">
              <InteractiveTitle 
                text="LET'S CREATE" 
                highlight="CREATE"
                gradient="purple-pink"
                color="#0c0a28"
                className="text-5xl md:text-6xl font-display font-black tracking-tighter uppercase leading-none" 
              />
              <InteractiveTitle 
                text="SOMETHING EPIC" 
                highlight="EPIC"
                gradient="blue-cyan"
                color="#0c0a28"
                className="text-5xl md:text-6xl font-display font-black tracking-tighter uppercase leading-none" 
              />
              <p className="text-base text-gray-400 font-medium leading-relaxed max-w-sm mt-6">
                I'm always open to new opportunities and interesting conversations.
              </p>
           </div>

           <div className="flex flex-wrap items-center gap-6">
             <Link to="/contact">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(99,102,241,0.2)' }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-[#1a1a2e] to-[#6366f1] text-white px-12 py-5 rounded-2xl font-black text-[12px] uppercase tracking-widest flex items-center gap-4 transition-all shadow-xl shadow-indigo-100"
                >
                  Start a Project <ArrowRight size={18} />
                </motion.button>
             </Link>

             <motion.a 
               href="/Alins Binu Resume.pdf"
               download="Alins Binu Resume.pdf"
               whileHover={{ scale: 1.05, backgroundColor: '#f8fafc' }}
               whileTap={{ scale: 0.95 }}
               className="bg-white text-[#0c0a28] border border-gray-100 px-10 py-5 rounded-2xl font-black text-[11px] uppercase tracking-widest flex items-center gap-4 transition-all shadow-sm cursor-pointer"
             >
               Download Resume <Download size={18} />
             </motion.a>
           </div>
        </div>

        {/* Right Side: Astronaut Visual */}
        <div className="relative flex items-center justify-center">
           <motion.div
             animate={{ 
               y: [0, -30, 0],
               rotate: [0, 5, 0]
             }}
             transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
             className="relative w-full max-w-md aspect-square"
           >
              <img src="/astronaut.png" className="w-full h-full object-contain drop-shadow-[0_20px_50px_rgba(99,102,241,0.15)]" alt="Astronaut" />
              
              {/* Floating Rocks / Spheres from image */}
              {[...Array(4)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ 
                    y: [0, -20, 0],
                    rotate: [0, 360, 0]
                  }}
                  transition={{ duration: 12 + i * 3, repeat: Infinity, ease: "linear" }}
                  className="absolute w-8 h-8 bg-indigo-50/80 blur-[1px] backdrop-blur-sm rounded-full border border-white/40 shadow-inner"
                  style={{ 
                    top: `${10 + i * 25}%`, 
                    left: i % 2 === 0 ? '-5%' : '105%',
                  }}
                />
              ))}
           </motion.div>
        </div>

      </div>
    </section>
  );
};
