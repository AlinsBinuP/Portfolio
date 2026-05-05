/**
 * NowSection.tsx
 * A "What I'm doing now" section — personality-rich, no collaborations needed.
 * Update the NOW_DATA object whenever things change.
 *
 * SETUP:
 * Add anywhere in Home.tsx or create a /now route.
 * import { NowSection } from '../components/NowSection';
 */

import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Code2, BookOpen, Music, Lightbulb, GraduationCap } from 'lucide-react';

// ─── UPDATE THIS WHENEVER THINGS CHANGE ──────────────────────────────────────
const NOW_DATA = {
  updatedAt: 'May 2026',
  building: 'Personal portfolio v2 — interactive, AI-powered, cinematic.',
  learning: 'Algorithms (Master Theorem, SCC, amortized analysis) + international trade economics.',
  listening: {
    artist: 'Currently rediscovering Malayalam indie',
    track: 'Rotating playlist — ask me in person',
  },
  reading: 'Exploring system design patterns for Flutter at scale.',
  location: 'Kattappana, Idukki, Kerala 🌿',
  status: 'Final year B.Tech, building & shipping.',
  openTo: 'Flutter internships · Freelance mobile work · Collaborations on interesting problems.',
};
// ─────────────────────────────────────────────────────────────────────────────

const Card = ({ icon: Icon, label, value, delay = 0, color = '#0369a1' }: {
  icon: React.ElementType; label: string; value: string; delay?: number; color?: string;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay }}
    className="group bg-white border border-black/[0.06] rounded-[24px] p-7 hover:shadow-xl hover:border-black/[0.12] transition-all duration-500 relative overflow-hidden"
  >
    <div
      className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
      style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }}
    />
    <div className="flex items-start gap-4">
      <div
        className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ backgroundColor: `${color}15` }}
      >
        <Icon className="w-4 h-4" style={{ color }} />
      </div>
      <div className="min-w-0">
        <p className="text-[10px] font-mono font-bold tracking-[0.25em] uppercase mb-2" style={{ color }}>
          {label}
        </p>
        <p className="text-[14px] text-[#374151] leading-relaxed font-sans">{value}</p>
      </div>
    </div>
  </motion.div>
);

export const NowSection = () => {
  return (
    <section className="relative bg-transparent px-8 md:px-20 py-32 border-t border-black/[0.06] overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-0 left-1/3 w-[500px] h-[300px] bg-sky-100/40 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-[#0369a1] font-mono text-[11px] font-bold tracking-[0.4em] uppercase opacity-70 block mb-4"
            >
              // NOW
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-display font-black tracking-tighter text-[#0a0a0a] uppercase leading-[0.9]"
            >
              What I'm<br />
              <span className="font-serif italic opacity-40">doing</span> now.
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col items-start md:items-end gap-2"
          >
            <div className="flex items-center gap-2 px-4 py-2 bg-white border border-black/[0.07] rounded-full shadow-sm">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              <span className="text-[11px] font-mono text-[#64748b] font-bold">Updated {NOW_DATA.updatedAt}</span>
            </div>
            <p className="text-[11px] text-[#94a3b8] font-mono">Inspired by nownownow.com</p>
          </motion.div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <Card icon={Code2} label="Building" value={NOW_DATA.building} delay={0.1} color="#0369a1" />
          <Card icon={GraduationCap} label="Learning" value={NOW_DATA.learning} delay={0.15} color="#7c3aed" />
          <Card icon={Music} label="Listening" value={`${NOW_DATA.listening.artist} — ${NOW_DATA.listening.track}`} delay={0.2} color="#059669" />
          <Card icon={BookOpen} label="Reading" value={NOW_DATA.reading} delay={0.25} color="#d97706" />
          <Card icon={MapPin} label="Location" value={NOW_DATA.location} delay={0.3} color="#dc2626" />
          <Card icon={Lightbulb} label="Open to" value={NOW_DATA.openTo} delay={0.35} color="#0369a1" />
        </div>

        {/* Status pill */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="inline-flex items-center gap-3 px-6 py-3 bg-[#0a0a0a] text-white rounded-full"
        >
          <span className="w-2 h-2 bg-sky-400 rounded-full animate-pulse" />
          <span className="text-[11px] font-mono font-bold uppercase tracking-widest">{NOW_DATA.status}</span>
        </motion.div>
      </div>
    </section>
  );
};
