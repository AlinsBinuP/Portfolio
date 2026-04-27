import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, Send } from 'lucide-react';
import { Magnetic } from '../components/Magnetic';

export const Contact = () => {
  return (
    <div className="min-h-screen pt-48 pb-40 px-8 md:px-20 bg-white relative overflow-hidden">
      {/* Background Depth */}
      <div className="absolute inset-0 z-0 pointer-events-none">
         <div className="absolute top-0 right-0 w-full h-[60vh] bg-[radial-gradient(ellipse_at_top_right,_#c8e8ff_0%,_transparent_70%)] opacity-30" />
         <div className="absolute bottom-0 left-0 w-full h-[60vh] bg-[radial-gradient(ellipse_at_bottom_left,_#eef8ff_0%,_transparent_70%)] opacity-30" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32">
          {/* Header & Connections */}
          <div>
            <motion.span 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-[#0369a1] font-mono text-[11px] font-black tracking-[0.4em] mb-6 block opacity-70 uppercase"
            >
              // INITIATE CONTACT
            </motion.span>
            
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-7xl md:text-9xl font-heavy tracking-tighter leading-[0.85] mb-12 text-[#0a0a0a] uppercase"
            >
              Let's <br/><span className="opacity-30 italic font-serif">talk.</span>
            </motion.h2>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="space-y-12 mb-16">
              <div className="group cursor-pointer">
                <span className="text-[10px] font-black tracking-[0.4em] text-[#94a3b8] uppercase block mb-3 opacity-60">Email Me</span>
                <span className="text-3xl font-heavy group-hover:text-[#0369a1] transition-all text-[#0a0a0a] uppercase tracking-tighter">alinsbinukochuthovala<br/>@gmail.com</span>
              </div>
              <div className="group cursor-pointer">
                <span className="text-[10px] font-black tracking-[0.4em] text-[#94a3b8] uppercase block mb-3 opacity-60">Location</span>
                <span className="text-3xl font-heavy text-[#0a0a0a] uppercase tracking-tighter">Kattappana, Kerala</span>
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
                    className="text-[11px] font-black tracking-[0.2em] uppercase text-[#64748b] hover:text-[#0a0a0a] transition-all border-b border-black/10 pb-1"
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
            className="bg-white p-8 md:p-16 border border-black/[0.06] rounded-[48px] shadow-2xl relative group overflow-hidden"
          >
             <div className="absolute top-0 left-0 w-1 h-full bg-[#0369a1]/10 group-hover:bg-[#0369a1] transition-all duration-700" />
             
             <form className="space-y-12">
                <div className="space-y-1 group">
                   <label className="text-[10px] font-black tracking-[0.3em] text-[#94a3b8] uppercase group-focus-within:text-[#0369a1] transition-colors opacity-60">Your Name</label>
                   <input type="text" className="w-full bg-transparent border-b border-black/[0.08] py-4 text-xl outline-none focus:border-[#0369a1] transition-all font-light text-[#0a0a0a] uppercase" placeholder="Alins Binu" />
                </div>
                <div className="space-y-1 group">
                   <label className="text-[10px] font-black tracking-[0.3em] text-[#94a3b8] uppercase group-focus-within:text-[#0369a1] transition-colors opacity-60">Email Address</label>
                   <input type="email" className="w-full bg-transparent border-b border-black/[0.08] py-4 text-xl outline-none focus:border-[#0369a1] transition-all font-light text-[#0a0a0a] uppercase" placeholder="alins@example.com" />
                </div>
                <div className="space-y-1 group">
                   <label className="text-[10px] font-black tracking-[0.3em] text-[#94a3b8] uppercase group-focus-within:text-[#0369a1] transition-colors opacity-60">The Brief</label>
                   <textarea rows={4} className="w-full bg-transparent border-b border-black/[0.08] py-4 text-xl outline-none focus:border-[#0369a1] transition-all font-light resize-none text-[#0a0a0a] uppercase" placeholder="How can I help you?"></textarea>
                </div>

                <Magnetic strength={20}>
                  <button className="group w-full bg-[#0a0a0a] text-white py-6 rounded-full font-black text-[10px] tracking-[0.3em] uppercase hover:bg-[#0369a1] transition-all shadow-xl flex items-center justify-center gap-4">
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
