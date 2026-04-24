import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, Send } from 'lucide-react';
import { Magnetic } from '../components/Magnetic';

export const Contact = () => {
  return (
    <div className="min-h-screen pt-48 pb-40 px-8 md:px-20 bg-transparent relative overflow-hidden">
      {/* Ambient Blue Blooms */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-sky-blue-vibrant/10 blur-[200px] rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-cobalt/20 blur-[150px] rounded-full translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32">
          {/* Header & Connections */}
          <div>
            <motion.span 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-sky-blue-glow font-mono text-sm tracking-[0.4em] mb-6 block drop-shadow-glow"
            >
              // INITIATE CONTACT
            </motion.span>
            
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-6xl md:text-9xl font-display font-black tracking-tight leading-[0.9] mb-12"
            >
              Let's <br/><span className="opacity-40 italic">talk.</span>
            </motion.h2>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="space-y-12 mb-16">
              <div className="group cursor-pointer">
                <span className="text-[10px] font-black tracking-[0.4em] text-white/20 uppercase block mb-3">Email Me</span>
                <span className="text-2xl font-display font-bold group-hover:text-sky-blue-glow transition-all">alinsbinukochuthovala@gmail.com</span>
              </div>
              <div className="group cursor-pointer">
                <span className="text-[10px] font-black tracking-[0.4em] text-white/20 uppercase block mb-3">Location</span>
                <span className="text-2xl font-display font-bold">Kattappana, Idukki, Kerala</span>
              </div>
              <div className="flex gap-8">
                {[
                  { name: 'GitHub', url: 'https://github.com/alinsbinu' },
                  { name: 'LinkedIn', url: 'https://linkedin.com/in/alinsbinu' }
                ].map((social, i) => (
                  <motion.a 
                    key={social.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    href={social.url}
                    target="_blank"
                    className="text-[10px] font-black tracking-[0.3em] uppercase text-white/40 hover:text-sky-blue-glow transition-all"
                  >
                    {social.name}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Minimal Form */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="cinematic-glass p-8 md:p-16 border-white/5 relative group overflow-hidden"
          >
             <div className="absolute top-0 left-0 w-1 h-full bg-sky-blue-glow/20 group-hover:bg-sky-blue-glow transition-all duration-700" />
             
             <form className="space-y-12">
                <div className="space-y-1 group">
                   <label className="text-[10px] font-black tracking-[0.4em] text-white/30 uppercase group-focus-within:text-sky-blue-glow transition-colors">Your Name</label>
                   <input type="text" className="w-full bg-transparent border-b border-white/10 py-4 text-xl outline-none focus:border-sky-blue-glow transition-all font-light" placeholder="Alins Binu" />
                </div>
                <div className="space-y-1 group">
                   <label className="text-[10px] font-black tracking-[0.4em] text-white/30 uppercase group-focus-within:text-sky-blue-glow transition-colors">Email Address</label>
                   <input type="email" className="w-full bg-transparent border-b border-white/10 py-4 text-xl outline-none focus:border-sky-blue-glow transition-all font-light" placeholder="alins@example.com" />
                </div>
                <div className="space-y-1 group">
                   <label className="text-[10px] font-black tracking-[0.4em] text-white/30 uppercase group-focus-within:text-sky-blue-glow transition-colors">The Brief</label>
                   <textarea rows={4} className="w-full bg-transparent border-b border-white/10 py-4 text-xl outline-none focus:border-sky-blue-glow transition-all font-light resize-none" placeholder="How can I help you?"></textarea>
                </div>

                <Magnetic strength={20}>
                  <button className="group w-full bg-white text-midnight py-6 rounded-full font-black text-xs tracking-[0.3em] uppercase hover:bg-sky-blue-glow transition-all shadow-2xl flex items-center justify-center gap-3">
                    Send Signal <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </button>
                </Magnetic>
             </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
