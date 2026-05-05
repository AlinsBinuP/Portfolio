import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, Send } from 'lucide-react';
import { Magnetic } from '../components/Magnetic';

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
    <div className="min-h-screen pt-48 pb-40 px-8 md:px-20 bg-transparent text-[var(--text-primary)] relative overflow-hidden">
      {/* Background Depth & Splashes */}
      <div className="absolute inset-0 z-0 pointer-events-none">
         <div className="holi-splash w-[900px] h-[900px] bg-[var(--accent-primary)] top-[-10%] right-[-10%] opacity-10" />
         <div className="holi-splash w-[800px] h-[800px] bg-[var(--accent-secondary)] bottom-[-20%] left-[-10%] opacity-10" />
         <div className="holi-splash w-[600px] h-[600px] bg-[var(--accent-tertiary)] top-[40%] left-[30%] opacity-08" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32">
          {/* Header & Connections */}
          <div>
            <motion.span 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-[var(--accent-secondary)] font-mono text-[11px] font-black tracking-[0.4em] mb-6 block uppercase opacity-90"
            >
              // INITIATE CONTACT
            </motion.span>
            
            <Magnetic strength={20}>
              <motion.h2 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-7xl md:text-9xl font-display font-black tracking-tighter leading-[0.85] mb-12 text-[var(--text-primary)] uppercase cursor-default"
              >
                Let's <br/><span className="text-[var(--accent-primary)] italic font-serif">talk.</span>
              </motion.h2>
            </Magnetic>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="space-y-12 mb-16">
              <div className="group cursor-pointer">
                <span className="text-[10px] font-black tracking-[0.4em] text-[var(--text-secondary)] uppercase block mb-3 opacity-40">Email Me</span>
                <span className="text-3xl font-display font-bold group-hover:text-[var(--accent-secondary)] transition-all text-[var(--text-primary)] tracking-tighter">alinsbinukochuthovala<br/>@gmail.com</span>
              </div>
              <div className="group cursor-pointer">
                <span className="text-[10px] font-black tracking-[0.4em] text-[var(--text-secondary)] uppercase block mb-3 opacity-40">Location</span>
                <span className="text-3xl font-display font-bold text-[var(--text-primary)] tracking-tighter">Kattappana, Kerala</span>
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
                    className="text-[11px] font-black tracking-[0.2em] uppercase text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-all border-b border-[var(--glass-border)] pb-1"
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
            className="p-8 md:p-16 rounded-[48px] shadow-2xl relative group overflow-hidden bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--glass-border)] watercolor-border"
          >
             <div className="relative z-10">
               <form ref={formRef} className="space-y-12" onSubmit={sendEmail}>
                  <div className="space-y-1 group">
                     <label className="text-[10px] font-black tracking-[0.3em] text-[var(--text-secondary)] uppercase group-focus-within:text-[var(--accent-primary)] transition-colors opacity-40">Your Name</label>
                     <input required name="name" type="text" className="w-full bg-transparent border-b border-[var(--glass-border)] py-4 text-xl outline-none focus:border-[var(--accent-primary)] transition-all font-light text-[var(--text-primary)]" placeholder="Alins Binu" />
                  </div>
                  <div className="space-y-1 group">
                     <label className="text-[10px] font-black tracking-[0.3em] text-[var(--text-secondary)] uppercase group-focus-within:text-[var(--accent-primary)] transition-colors opacity-40">Email Address</label>
                     <input required name="email" type="email" className="w-full bg-transparent border-b border-[var(--glass-border)] py-4 text-xl outline-none focus:border-[var(--accent-primary)] transition-all font-light text-[var(--text-primary)]" placeholder="alins@example.com" />
                  </div>
                  <div className="space-y-1 group">
                     <label className="text-[10px] font-black tracking-[0.3em] text-[var(--text-secondary)] uppercase group-focus-within:text-[var(--accent-primary)] transition-colors opacity-40">The Brief</label>
                     <textarea required name="message" rows={4} className="w-full bg-transparent border-b border-[var(--glass-border)] py-4 text-xl outline-none focus:border-[var(--accent-primary)] transition-all font-light resize-none text-[var(--text-primary)]" placeholder="How can I help you?"></textarea>
                  </div>

                  <div className="flex flex-col gap-4 pt-6">
                    <Magnetic strength={20}>
                      <button 
                        type="submit" 
                        disabled={isSubmitting}
                        className="group w-full bg-[var(--text-primary)] text-[var(--bg-primary)] py-6 rounded-full font-black text-[10px] tracking-[0.3em] uppercase hover:bg-[var(--accent-primary)] hover:text-white transition-all shadow-xl flex items-center justify-center gap-4 disabled:opacity-50 disabled:cursor-not-allowed"
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
