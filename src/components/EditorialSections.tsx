import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Zap, Globe, Cpu } from 'lucide-react';
import { Magnetic } from './Magnetic';

const EditorialCard = ({ number, title, category, description, image }: any) => (
  <motion.div 
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="group relative grid grid-cols-1 md:grid-cols-2 gap-12 py-24 border-b border-[var(--glass-border)]"
  >
    <div className="space-y-8">
      <div className="flex items-center gap-6">
        <span className="font-mono text-[12px] font-black text-[var(--accent-primary)] opacity-40">{number}</span>
        <span className="font-mono text-[10px] font-black tracking-[0.4em] uppercase text-[var(--text-primary)] opacity-60">{category}</span>
      </div>
      
      <Magnetic strength={20}>
        <h3 className="text-5xl md:text-7xl font-display font-black text-[var(--text-primary)] uppercase leading-[0.85] tracking-tighter group-hover:opacity-70 transition-all duration-500">
          {title}
        </h3>
      </Magnetic>

      <p className="text-xl text-[var(--text-primary)] opacity-60 font-sans font-light leading-relaxed max-w-md">
        {description}
      </p>

      <motion.button 
        whileHover={{ x: 10 }}
        className="flex items-center gap-4 text-[11px] font-mono font-black uppercase tracking-[0.3em] text-[var(--accent-primary)]"
      >
        View Case Study <ArrowRight size={16} />
      </motion.button>
    </div>

    <div className="relative aspect-[4/3] overflow-hidden rounded-[32px] premium-rgb-border p-1">
      <div className="absolute inset-0 bg-[var(--bg-primary)] rounded-[31px] overflow-hidden">
        <motion.div 
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="w-full h-full bg-gradient-to-br from-[var(--accent-primary)]/20 to-[var(--accent-secondary)]/20 flex items-center justify-center"
        >
          {/* Placeholder for project image/visual */}
          <div className="relative">
            <div className="absolute inset-0 blur-3xl bg-[var(--accent-primary)] opacity-20 animate-pulse" />
            <span className="relative font-display font-black text-8xl text-[var(--text-primary)] opacity-10 uppercase tracking-tighter select-none">
              {title.split(" ")[0]}
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  </motion.div>
);

export const EditorialSections = () => {
  return (
    <section className="px-8 md:px-20 py-24 bg-transparent relative overflow-hidden">
      {/* Background Splashes */}
      <div className="holi-splash w-[800px] h-[800px] bg-[var(--accent-primary)] top-0 right-[-10%] opacity-10" />
      <div className="holi-splash w-[700px] h-[700px] bg-[var(--accent-secondary)] bottom-0 left-[-10%] opacity-10" />
      <div className="holi-splash w-[500px] h-[500px] bg-[var(--accent-tertiary)] top-[40%] left-[30%] opacity-06" />

      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col gap-0">
          <EditorialCard 
            number="01"
            title="Surgical Precision"
            category="MOBILE ARCHITECTURE"
            description="Developing hyper-optimized Flutter ecosystems with a focus on atomic design and industrial-grade stability."
          />
          <EditorialCard 
            number="02"
            title="Cinematic Motion"
            category="UX ENGINEERING"
            description="Bridging the void between high-end aesthetics and fluid interaction physics to create products that feel alive."
          />
          <EditorialCard 
            number="03"
            title="System Logic"
            category="FULLSTACK INFRA"
            description="Architecting robust backend integrations and real-time data pipelines for global-scale applications."
          />
        </div>

        <div className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { icon: <Zap size={24} />, label: "Performance", value: "99.9%" },
            { icon: <Globe size={24} />, label: "Global Reach", value: "24/7" },
            { icon: <Cpu size={24} />, label: "AI Integration", value: "CORE" }
          ].map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-8 rounded-[32px] bg-[var(--card-bg)] border border-[var(--glass-border)] shadow-md watercolor-border"
            >
              <div className="text-[var(--accent-primary)] mb-6">{stat.icon}</div>
              <div className="text-[10px] font-mono font-black uppercase tracking-[0.4em] text-[var(--text-primary)] opacity-40 mb-2">{stat.label}</div>
              <div className="text-4xl font-display font-black text-[var(--text-primary)] uppercase tracking-tighter">{stat.value}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
