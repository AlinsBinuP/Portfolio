import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, Send } from 'lucide-react';
import { Magnetic } from '../components/Magnetic';
import { InteractiveTitle } from '../components/redesign/InteractiveTitle';

export const Contact = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;
    
    setIsSubmitting(true);
    setStatus('idle');

    emailjs.sendForm('service_3nbeimv', 'template_ccuh2ql', formRef.current, '84ebuKF61MIW4N32X')
      .then(() => {
        setStatus('success');
        if (formRef.current) formRef.current.reset();
      })
      .catch((error) => {
        console.error('FAILED...', error.text);
        setStatus('error');
      })
      .finally(() => {
        setIsSubmitting(false);
        setTimeout(() => setStatus('idle'), 5000);
      });
  };

  return (
    <div className="min-h-screen pt-48 pb-40 px-8 md:px-20 bg-white text-[#0c0a28] relative overflow-hidden">
      {/* Background Depth & Glows */}
      <div className="absolute inset-0 z-0 pointer-events-none">
         <div className="absolute top-[10%] left-[5%] w-[600px] h-[600px] bg-purple-50 blur-[120px] rounded-full opacity-60" />
         <div className="absolute bottom-[10%] right-[5%] w-[700px] h-[700px] bg-blue-50 blur-[150px] rounded-full opacity-40" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32">
          {/* Header & Connections */}
          <div>
            <motion.span 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-indigo-600 font-mono text-[11px] font-black tracking-[0.4em] mb-6 block uppercase opacity-90"
            >
              // INITIATE CONTACT
            </motion.span>
            
            <div className="mb-12">
               <InteractiveTitle 
                 text="LET'S TALK." 
                 highlight="TALK"
                 gradient="rose-pink"
                 className="text-7xl md:text-[9vw] font-display font-black tracking-tighter leading-none uppercase cursor-default" 
               />
            </div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="space-y-12 mb-16">
              <div className="group cursor-pointer">
                <span className="text-[10px] font-black tracking-[0.4em] text-gray-400 uppercase block mb-3 opacity-40">Email Me</span>
                <span className="text-3xl font-display font-bold group-hover:text-indigo-600 transition-all text-[#0c0a28] tracking-tighter">alinsbinukochuthovala<br/>@gmail.com</span>
              </div>
              <div className="group cursor-pointer">
                <span className="text-[10px] font-black tracking-[0.4em] text-gray-400 uppercase block mb-3 opacity-40">Location</span>
                <span className="text-3xl font-display font-bold text-[#0c0a28] tracking-tighter">Kattappana, Kerala</span>
              </div>
              <div className="flex gap-8">
                {[
                  { name: 'GitHub', url: 'https://github.com/AlinsBinuP' },
                  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/alinsbinu/' }
                ].map((social, i) => (
                  <motion.a 
                    key={social.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    href={social.url}
                    target="_blank"
                    className="text-[11px] font-black tracking-[0.2em] uppercase text-gray-400 hover:text-indigo-600 transition-all border-b border-gray-100 pb-1"
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
            className="p-8 md:p-16 rounded-[56px] shadow-[0_40px_100px_rgba(0,0,0,0.03)] relative group overflow-hidden bg-white/50 backdrop-blur-xl border border-gray-100"
          >
             <div className="relative z-10">
               <form ref={formRef} className="space-y-12" onSubmit={sendEmail}>
                  <div className="space-y-1 group">
                     <label className="text-[10px] font-black tracking-[0.3em] text-gray-400 uppercase group-focus-within:text-indigo-600 transition-colors opacity-40">Your Name</label>
                     <input required name="name" type="text" className="w-full bg-transparent border-b border-gray-100 py-4 text-xl outline-none focus:border-indigo-600 transition-all font-medium text-[#0c0a28] placeholder:text-gray-100" placeholder="Alins Binu" />
                  </div>
                  <div className="space-y-1 group">
                     <label className="text-[10px] font-black tracking-[0.3em] text-gray-400 uppercase group-focus-within:text-indigo-600 transition-colors opacity-40">Email Address</label>
                     <input required name="email" type="email" className="w-full bg-transparent border-b border-gray-100 py-4 text-xl outline-none focus:border-indigo-600 transition-all font-medium text-[#0c0a28] placeholder:text-gray-100" placeholder="alins@example.com" />
                  </div>
                  <div className="space-y-1 group">
                     <label className="text-[10px] font-black tracking-[0.3em] text-gray-400 uppercase group-focus-within:text-indigo-600 transition-colors opacity-40">The Brief</label>
                     <textarea required name="message" rows={4} className="w-full bg-transparent border-b border-gray-100 py-4 text-xl outline-none focus:border-indigo-600 transition-all font-medium resize-none text-[#0c0a28] placeholder:text-gray-100" placeholder="How can I help you?"></textarea>
                  </div>

                  <div className="flex flex-col gap-4 pt-6">
                    <Magnetic strength={20}>
                      <button 
                        type="submit" 
                        disabled={isSubmitting}
                        className="group w-full bg-[#0c0a28] text-white py-6 rounded-2xl font-black text-[10px] tracking-[0.3em] uppercase hover:bg-indigo-600 transition-all shadow-xl shadow-indigo-50 flex items-center justify-center gap-4 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? 'Sending Signal...' : 'Send Signal'} 
                        {!isSubmitting && <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
                      </button>
                    </Magnetic>
                    
                    {status === 'success' && (
                      <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-emerald-500 text-sm font-medium text-center">
                        Signal received. I will get back to you shortly.
                      </motion.p>
                    )}
                    {status === 'error' && (
                      <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-red-500 text-sm font-medium text-center">
                        Failed to send signal. Please try again later.
                      </motion.p>
                    )}
                  </div>
               </form>
             </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
