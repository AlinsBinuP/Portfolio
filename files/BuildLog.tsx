/**
 * BuildLog.tsx
 * Minimal devlog — shows momentum even without many collaborations.
 * Add a new entry to ENTRIES each week. Shows growth mindset.
 *
 * SETUP:
 * import { BuildLog } from '../components/BuildLog';
 * Drop into Home.tsx or a dedicated /log section.
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Code2, BookOpen, Wrench, Rocket, ChevronDown } from 'lucide-react';

type EntryType = 'shipped' | 'learned' | 'exploring' | 'fixed' | 'launched';

interface LogEntry {
  week: string;
  date: string;
  type: EntryType;
  title: string;
  description: string;
  tags: string[];
}

// ─── ADD NEW ENTRIES AT THE TOP ───────────────────────────────────────────────
const ENTRIES: LogEntry[] = [
  {
    week: 'Week 18',
    date: 'May 2026',
    type: 'shipped',
    title: 'Portfolio v2 — all interactive features',
    description: 'Rebuilt portfolio with AI chatbot, dev terminal, skills constellation, scroll storytelling, bookshelf, devlog, and live project embeds. Used Three.js for 3D hero, GSAP ScrollTrigger for storytelling, D3 for skill visualization.',
    tags: ['React', 'Three.js', 'GSAP', 'Gemini API'],
  },
  {
    week: 'Week 16',
    date: 'Apr 2026',
    type: 'launched',
    title: 'HealthBrain Agent — Cognizant Technoverse Hackathon',
    description: 'Built a healthcare AI agent on PTIALRECORD platform using Superset Agent Builder. Integrated drag-and-drop sub-agents: Calendar, Pharmacy, Wearable Sync, Nutrition, and Fitness nodes.',
    tags: ['AI Agents', 'Hackathon', 'Healthcare'],
  },
  {
    week: 'Week 14',
    date: 'Apr 2026',
    type: 'learned',
    title: 'Mastered Kosaraju\'s Algorithm & amortized analysis',
    description: 'Deep dived into Strongly Connected Components using DFS + transpose graph approach. Also studied aggregate method for amortized analysis for dynamic arrays.',
    tags: ['Algorithms', 'Graph Theory', 'CS Theory'],
  },
  {
    week: 'Week 12',
    date: 'Mar 2026',
    type: 'exploring',
    title: 'Experimenting with Pothole Detection using ML',
    description: 'Exploring computer vision approaches for final-year project. Testing YOLOv8 for real-time pothole detection — comparing against traditional CV methods.',
    tags: ['ML', 'Computer Vision', 'Python'],
  },
  {
    week: 'Week 10',
    date: 'Mar 2026',
    type: 'fixed',
    title: 'Fixed GPS accuracy issues in CarDash',
    description: 'Tracked down a Flutter Geolocator accuracy bug on older Android devices. Fixed by tuning desiredAccuracy settings and adding location smoothing with a Kalman filter approach.',
    tags: ['Flutter', 'GPS', 'Android'],
  },
  {
    week: 'Week 08',
    date: 'Feb 2026',
    type: 'shipped',
    title: 'Light Suvara v1.3 — major update',
    description: 'Shipped announcement system overhaul, push notifications via FCM, and a new Sunday School attendance tracker. ~200 daily active users in the community.',
    tags: ['Flutter', 'Firebase', 'FCM'],
  },
];
// ─────────────────────────────────────────────────────────────────────────────

const TYPE_CONFIG: Record<EntryType, { label: string; icon: React.ElementType; color: string; bg: string }> = {
  shipped: { label: 'SHIPPED', icon: Rocket, color: '#0369a1', bg: '#eff6ff' },
  learned: { label: 'LEARNED', icon: BookOpen, color: '#7c3aed', bg: '#f5f3ff' },
  exploring: { label: 'EXPLORING', icon: Code2, color: '#0891b2', bg: '#ecfeff' },
  fixed: { label: 'FIXED', icon: Wrench, color: '#059669', bg: '#ecfdf5' },
  launched: { label: 'LAUNCHED', icon: Zap, color: '#d97706', bg: '#fffbeb' },
};

const SHOW_INITIAL = 3;

export const BuildLog = () => {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? ENTRIES : ENTRIES.slice(0, SHOW_INITIAL);

  return (
    <section className="relative bg-transparent px-8 md:px-20 py-32 border-t border-black/[0.06] overflow-hidden">
      <div className="absolute top-0 left-1/4 w-96 h-64 bg-violet-50/40 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-3xl mx-auto relative z-10">
        {/* Header */}
        <div className="mb-14">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-[#0369a1] font-mono text-[11px] font-bold tracking-[0.4em] uppercase opacity-70 block mb-4"
          >
            // BUILD LOG
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-6xl font-display font-black tracking-tighter text-[#0a0a0a] uppercase leading-[0.9]"
          >
            What I've<br /><span className="font-serif italic opacity-40">been building.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="text-[#64748b] text-sm font-sans mt-4 max-w-md"
          >
            A running log of what I ship, learn, and explore each week.
          </motion.p>
        </div>

        {/* Entries */}
        <div className="space-y-3">
          {visible.map((entry, i) => {
            const cfg = TYPE_CONFIG[entry.type];
            const Icon = cfg.icon;
            const isExpanded = expanded === entry.week;

            return (
              <motion.div
                key={entry.week}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
              >
                <button
                  onClick={() => setExpanded(isExpanded ? null : entry.week)}
                  className="w-full text-left bg-white border border-black/[0.06] rounded-[20px] px-6 py-5 hover:border-black/[0.12] transition-all hover:shadow-sm"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4 min-w-0">
                      {/* Type badge */}
                      <div
                        className="flex items-center gap-1.5 px-3 py-1 rounded-full flex-shrink-0 text-[10px] font-mono font-bold tracking-widest"
                        style={{ background: cfg.bg, color: cfg.color }}
                      >
                        <Icon className="w-3 h-3" />
                        {cfg.label}
                      </div>
                      <div className="min-w-0">
                        <p className="font-bold text-[14px] text-[#0a0a0a] truncate">{entry.title}</p>
                        <p className="text-[10px] font-mono text-[#94a3b8]">{entry.week} · {entry.date}</p>
                      </div>
                    </div>
                    <motion.div
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      className="flex-shrink-0"
                    >
                      <ChevronDown className="w-4 h-4 text-[#94a3b8]" />
                    </motion.div>
                  </div>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="pt-4 mt-4 border-t border-black/[0.05]">
                          <p className="text-[13px] text-[#374151] leading-relaxed mb-4">{entry.description}</p>
                          <div className="flex flex-wrap gap-2">
                            {entry.tags.map(tag => (
                              <span
                                key={tag}
                                className="text-[10px] font-mono font-bold px-3 py-1 rounded-full border"
                                style={{ background: cfg.bg, color: cfg.color, borderColor: `${cfg.color}30` }}
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              </motion.div>
            );
          })}
        </div>

        {/* Show more */}
        {ENTRIES.length > SHOW_INITIAL && (
          <motion.button
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            onClick={() => setShowAll(s => !s)}
            className="mt-6 w-full py-4 border border-dashed border-black/[0.12] rounded-[20px] text-[11px] font-mono font-bold tracking-widest uppercase text-[#64748b] hover:text-[#0a0a0a] hover:border-black/[0.2] transition-all"
          >
            {showAll ? '↑ Show less' : `↓ Show ${ENTRIES.length - SHOW_INITIAL} more entries`}
          </motion.button>
        )}
      </div>
    </section>
  );
};
