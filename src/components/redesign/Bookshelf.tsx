import React from 'react';
import { motion } from 'framer-motion';
import { Monitor, Laptop, Keyboard, Headphones } from 'lucide-react';

const SETUP = [
  { 
    title: "MacBook Pro M3", 
    category: "Main Machine", 
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=800&auto=format&fit=crop", 
    icon: Laptop 
  },
  { 
    title: "LG UltraFine 5K", 
    category: "Display", 
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=800&auto=format&fit=crop", 
    icon: Monitor 
  },
  { 
    title: "Keychron Q1", 
    category: "Keyboard", 
    image: "https://images.unsplash.com/photo-1618384881928-bb4696482801?q=80&w=800&auto=format&fit=crop", 
    icon: Keyboard 
  },
  { 
    title: "Sony WH-1000XM5", 
    category: "Audio", 
    image: "https://images.unsplash.com/photo-1613040809024-b4ef7ba99bc3?q=80&w=800&auto=format&fit=crop", 
    icon: Headphones 
  },
];

import { InteractiveTitle } from './InteractiveTitle';

export const Bookshelf = () => {
  return (
    <section className="py-24 px-8 lg:px-24 bg-gray-50/30 overflow-hidden flex flex-col items-center select-none">
      <div className="max-w-7xl w-full flex flex-col gap-16">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
           <div className="flex flex-col gap-3">
              <InteractiveTitle 
                text="BOOKS & WISDOM" 
                highlight="WISDOM"
                gradient="indigo-violet"
                className="text-4xl md:text-5xl font-display font-black tracking-tighter text-[#1a1a2e]" 
              />
              <p className="text-base text-gray-400 font-medium leading-relaxed max-w-sm">
                Lessons from words that shaped my journey.
              </p>
           </div>
        </div>

        {/* Gear Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
           {SETUP.map((item, i) => (
             <motion.div
               key={item.title}
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ delay: i * 0.1 }}
               whileHover={{ y: -10 }}
               className="group cursor-pointer"
             >
                <div className="relative aspect-[4/5] rounded-[32px] overflow-hidden bg-white border border-gray-100 shadow-xl shadow-gray-200/50">
                   <img src={item.image} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110" alt={item.title} />
                   <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                   <div className="absolute bottom-6 left-6 right-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 opacity-0 group-hover:opacity-100">
                      <span className="text-[10px] font-black text-white/60 uppercase tracking-widest">{item.category}</span>
                      <h4 className="text-sm font-black text-white uppercase tracking-tight mt-1">{item.title}</h4>
                   </div>
                </div>
             </motion.div>
           ))}
        </div>
      </div>
    </section>
  );
};
