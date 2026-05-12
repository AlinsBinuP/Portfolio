import React from 'react';
import { motion, useMotionValue, useSpring, useScroll, useTransform } from 'framer-motion';
import { CheckCircle2, ArrowRight } from 'lucide-react';

import { InteractiveTitle } from './InteractiveTitle';

export const ProjectGravitySection = () => {
  const projects = [
    {
      id: 'light-suvara',
      title: 'Light Suvara',
      category: 'UI/UX Design',
      img: '/1776942620907.png',
      pos: { top: '10%', left: '15%' },
      orbitRadius: { x: 300, y: 150 },
      delay: 0
    },
    {
      id: 'cardash',
      title: 'CarDash',
      category: 'Automotive App',
      img: '/aauto.jpg',
      pos: { top: '15%', right: '10%' },
      orbitRadius: { x: 350, y: 180 },
      delay: 0.2
    },
    {
      id: 'prism-studio',
      title: 'Prism Studio',
      category: 'Creative Tool',
      img: '/image_fd8fb534.png',
      pos: { bottom: '15%', right: '20%' },
      orbitRadius: { x: 280, y: 140 },
      delay: 0.4
    }
  ];

  return (
    <section className="py-48 px-8 lg:px-24 bg-white overflow-hidden flex flex-col items-center select-none relative">
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-5 gap-16 items-center relative z-10">

        {/* Left Side: Content */}
        <div className="lg:col-span-2 flex flex-col gap-8">
          <div className="flex flex-col gap-4 cursor-default">
            <InteractiveTitle
              text="PROJECT GRAVITY"
              highlight="GRAVITY"
              gradient="blue-indigo"
              className="text-4xl md:text-5xl font-display font-black tracking-tighter text-[#1a1a2e]"
            />
            <p className="text-base text-gray-400 font-medium leading-relaxed max-w-xs">
              Every project pulls from curiosity and purpose, and creates impact.
            </p>
          </div>

          <motion.button
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05, gap: '20px' }}
            className="w-fit bg-gradient-to-r from-blue-600 to-purple-600 text-white px-10 py-4 rounded-2xl font-black text-[11px] uppercase tracking-widest flex items-center gap-4 transition-all shadow-xl shadow-blue-100"
          >
            Explore Gravity <ArrowRight size={16} />
          </motion.button>
        </div>

        {/* Right Side: Cosmos Visualization */}
        <div className="lg:col-span-3 relative h-[900px] flex items-center justify-center">

          {/* Slanted Orbits Layer */}
          <div
            style={{ transform: 'perspective(1200px) rotateX(60deg) rotateZ(-10deg)' }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-100"
          >
            {[1, 2, 3, 4, 5].map(i => (
              <div
                key={i}
                className="absolute border border-indigo-200 rounded-full"
                style={{
                  width: `${300 + i * 140}px`,
                  height: `${300 + i * 140}px`,
                }}
              />
            ))}
          </div>

          {/* Central Sun / Gravity Well */}
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              filter: ["brightness(1) blur(0px)", "brightness(1.2) blur(2px)", "brightness(1) blur(0px)"]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="relative z-10 w-28 h-28 flex items-center justify-center"
          >
            <div className="absolute inset-0 bg-white blur-3xl opacity-40 rounded-full" />
            <div className="absolute inset-0 bg-blue-400 blur-2xl opacity-20 rounded-full animate-pulse" />
            <div className="w-16 h-16 bg-gradient-to-tr from-purple-600 via-white to-blue-400 rounded-full shadow-[0_0_50px_rgba(139,92,246,0.6)] relative z-10" />
          </motion.div>

          {/* Orbiting Particles (Slanted) */}
          <div
            style={{ transform: 'perspective(1200px) rotateX(60deg) rotateZ(-10deg)' }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                animate={{ rotate: 360 }}
                transition={{ duration: 20 + i * 5, repeat: Infinity, ease: "linear" }}
                className="absolute w-full h-full flex items-center justify-center"
              >
                <div
                  className="absolute w-2 h-2 bg-blue-400 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.8)]"
                  style={{ transform: `translateX(${200 + i * 60}px)` }}
                />
              </motion.div>
            ))}
          </div>

          {/* Orbiting Projects (Upright) */}
          <div className="absolute inset-0 pointer-events-none">
            {projects.map((proj, i) => {
              const radius = 180 + i * 120;
              const duration = 60; // Sync durations to prevent overlap
              const startAngle = i * 120;
              const direction = 1; // All clockwise

              return (
                <motion.div
                  key={proj.id}
                  initial={{ rotate: startAngle }}
                  animate={{ rotate: startAngle + (360 * direction) }}
                  transition={{ duration: duration, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <div
                    className="absolute pointer-events-auto"
                    style={{
                      transform: `translateX(${radius}px)`
                    }}
                  >
                    <motion.div
                      initial={{ rotate: -startAngle }}
                      animate={{ rotate: -(startAngle + (360 * direction)) }}
                      transition={{ duration: duration, repeat: Infinity, ease: "linear" }}
                      className="flex flex-col items-center gap-4 group cursor-pointer"
                    >
                      {/* Card with Glass Frame */}
                      <motion.div
                        whileHover={{ y: -15, scale: 1.05 }}
                        className="w-40 aspect-[9/12] relative group/card transition-all duration-500"
                      >
                        {/* Glass Frame */}
                        <div className="absolute inset-0 bg-white/40 backdrop-blur-md rounded-[32px] border border-white/60 shadow-2xl transition-all group-hover/card:bg-white/80" />

                        {/* Image Container */}
                        <div className="absolute inset-2 rounded-[24px] overflow-hidden bg-gray-100">
                          <img src={proj.img} className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-110" alt={proj.title} />
                        </div>

                        {/* Hover Glow */}
                        <div className="absolute -inset-4 bg-gradient-to-tr from-purple-500/0 to-blue-500/0 blur-2xl rounded-full opacity-0 group-hover/card:opacity-20 transition-opacity" />
                      </motion.div>

                      {/* Labels */}
                      <div className="flex flex-col items-center text-center mt-2">
                        <span className="text-[13px] font-display font-black text-[#1a1a2e] uppercase tracking-tighter leading-none group-hover:text-blue-600 transition-colors">
                          {proj.title}
                        </span>
                        <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1.5 opacity-60">
                          {proj.category}
                        </span>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </div>

      {/* Subtle Background Elements */}
      <div className="absolute inset-0 bg-grid-dot opacity-[0.03] pointer-events-none" />
    </section>
  );
};


export const TrivitPreviewSection = () => {
  return (
    <section className="py-24 px-8 lg:px-16 bg-white overflow-hidden flex flex-col items-center">
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

        {/* Left Side: Phone Mockup from PNG */}
        <div className="relative flex items-center justify-center order-2 lg:order-1">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative z-10 w-full max-w-[320px] aspect-[9/18.5]"
          >
            {/* Phone Frame */}
            <div className="relative w-full h-full rounded-[60px] border-[10px] border-[#0c0a28] bg-[#0c0a28] shadow-[0_50px_100px_rgba(0,0,0,0.2)] overflow-hidden">
              <img src="/phone_trivit.png" className="w-full h-full object-cover" alt="Trivit App UI" />

              {/* Notch */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 w-20 h-5 bg-black rounded-full" />
            </div>

            {/* Floating Base Plate from image */}
            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[140%] h-40 bg-indigo-50/50 blur-3xl -z-10 rounded-full" />
          </motion.div>
        </div>

        {/* Right Side: Content */}
        <div className="flex flex-col gap-8 order-1 lg:order-2">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <InteractiveTitle
                text="TRIVIT — INTERACTIVE PREVIEW"
                highlight="INTERACTIVE PREVIEW"
                gradient="indigo-violet"
                className="text-4xl md:text-5xl font-display font-black tracking-tighter text-[#1a1a2e]"
              />
            </div>

            <p className="text-base text-gray-400 font-medium leading-relaxed max-w-sm">
              Engineered for high-performance interactions and community-driven design.
            </p>

            <div className="flex flex-col gap-4">
              {[
                { label: "Real-time messaging", icon: CheckCircle2 },
                { label: "Community forums", icon: CheckCircle2 },
                { label: "Secure & fast", icon: CheckCircle2 },
                { label: "Beautiful UI", icon: CheckCircle2 },
              ].map((f, i) => (
                <motion.div
                  key={f.label}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <f.icon className="w-4 h-4 text-indigo-600" />
                  <span className="text-[11px] font-black text-[#0c0a28] uppercase tracking-tighter">{f.label}</span>
                </motion.div>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.05, x: 5 }}
              className="w-fit mt-4 bg-indigo-600 text-white px-10 py-4 rounded-xl font-black text-[11px] uppercase tracking-widest flex items-center gap-4 transition-all shadow-xl shadow-indigo-100"
            >
              View Live Case <ArrowRight size={14} />
            </motion.button>
          </div>
        </div>

      </div>
    </section>
  );
};
