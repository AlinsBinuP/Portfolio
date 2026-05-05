/**
 * LiveDemoSection.tsx
 * Embed live projects inside device mockup frames.
 * CarDash shown in a phone frame. Prism Studio in a browser frame.
 *
 * SETUP:
 * import { LiveDemoSection } from '../components/LiveDemoSection';
 * Add to Projects.tsx page or Home.tsx
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Smartphone, Monitor, ExternalLink, Play } from 'lucide-react';

const DEMOS = [
  {
    id: 'prism',
    name: 'Prism Studio',
    description: 'Live AI tool suite — try it directly here.',
    url: 'https://prismstudioai.vercel.app',
    type: 'browser' as const,
    tag: 'WEB · AI',
    color: '#7c3aed',
    badge: '12+ Tools',
  },
];

// Phone frame for CarDash (uses a screenshot since it's a native app)
const PhoneFrame = ({ children }: { children: React.ReactNode }) => (
  <div className="relative mx-auto" style={{ width: 280 }}>
    {/* Phone body */}
    <div className="relative bg-[#0a0a0a] rounded-[44px] p-3 shadow-[0_50px_100px_rgba(0,0,0,0.4)]">
      {/* Notch */}
      <div className="absolute top-3 left-1/2 -translate-x-1/2 w-20 h-6 bg-[#0a0a0a] rounded-b-xl z-10" />
      {/* Screen */}
      <div className="bg-black rounded-[36px] overflow-hidden" style={{ height: 550 }}>
        {children}
      </div>
      {/* Home indicator */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-24 h-1 bg-white/20 rounded-full" />
    </div>
    {/* Side buttons */}
    <div className="absolute top-20 -left-1 w-1 h-10 bg-[#1a1a1a] rounded-l-sm" />
    <div className="absolute top-32 -left-1 w-1 h-8 bg-[#1a1a1a] rounded-l-sm" />
    <div className="absolute top-24 -right-1 w-1 h-14 bg-[#1a1a1a] rounded-r-sm" />
  </div>
);

// Browser frame for web apps
const BrowserFrame = ({ url, children }: { url: string; children: React.ReactNode }) => (
  <div className="relative rounded-[16px] overflow-hidden border border-black/[0.08] shadow-2xl">
    {/* Browser chrome */}
    <div className="bg-[#f3f4f6] px-4 py-3 flex items-center gap-3 border-b border-black/[0.06]">
      <div className="flex gap-1.5">
        <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
        <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
        <div className="w-3 h-3 rounded-full bg-[#28c840]" />
      </div>
      <div className="flex-1 bg-white rounded-md px-3 py-1.5 flex items-center gap-2">
        <div className="w-2.5 h-2.5 rounded-full border border-[#94a3b8]" />
        <span className="text-[11px] font-mono text-[#94a3b8] truncate">{url}</span>
      </div>
    </div>
    {children}
  </div>
);

export const LiveDemoSection = () => {
  const [cardashPlaying, setCardashPlaying] = useState(false);

  return (
    <section className="relative bg-transparent px-8 md:px-20 py-32 border-t border-black/[0.06] overflow-hidden">
      <div className="absolute -top-20 right-0 w-[500px] h-[400px] bg-violet-50/30 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-[#0369a1] font-mono text-[11px] font-bold tracking-[0.4em] uppercase opacity-70 block mb-4"
          >
            // LIVE DEMOS
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-6xl font-display font-black tracking-tighter text-[#0a0a0a] uppercase leading-[0.9]"
          >
            Try it<br /><span className="font-serif italic opacity-40">right here.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="text-[#64748b] text-sm font-sans mt-4 max-w-md"
          >
            No screenshots. No descriptions. Live products, playable directly in this page.
          </motion.p>
        </div>

        {/* CarDash — Phone mockup with screenshot */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex justify-center"
          >
            <PhoneFrame>
              <div className="relative w-full h-full bg-[#020617]">
                {/* CarDash UI Mockup */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
                  {/* Speedometer */}
                  <div className="relative mb-6">
                    <svg width="180" height="100" viewBox="0 0 180 100">
                      <path d="M 15 95 A 75 75 0 0 1 165 95" fill="none" stroke="#1e293b" strokeWidth="12" strokeLinecap="round" />
                      <motion.path
                        d="M 15 95 A 75 75 0 0 1 165 95"
                        fill="none"
                        stroke="#38bdf8"
                        strokeWidth="12"
                        strokeLinecap="round"
                        strokeDasharray="235"
                        animate={{ strokeDashoffset: cardashPlaying ? [235, 100, 160, 80] : 200 }}
                        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                      />
                      <text x="90" y="88" textAnchor="middle" fontSize="28" fontWeight="bold" fill="white" fontFamily="monospace">
                        {cardashPlaying ? '72' : '0'}
                      </text>
                      <text x="90" y="76" textAnchor="middle" fontSize="10" fill="#64748b" fontFamily="monospace">km/h</text>
                    </svg>
                  </div>

                  <div className="text-[#64748b] text-[10px] font-mono tracking-widest uppercase mb-6">
                    {cardashPlaying ? 'GPS ACTIVE · 12 SATELLITES' : 'TAP TO START DEMO'}
                  </div>

                  {/* Stats row */}
                  {cardashPlaying && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="grid grid-cols-3 gap-4 w-full mb-6"
                    >
                      {[
                        { label: 'RPM', val: '2400' },
                        { label: 'FUEL', val: '68%' },
                        { label: 'TEMP', val: '92°C' },
                      ].map(stat => (
                        <div key={stat.label} className="bg-[#0f172a] rounded-xl p-3 text-center">
                          <p className="text-[#38bdf8] font-mono font-bold text-[16px]">{stat.val}</p>
                          <p className="text-[#475569] text-[9px] font-mono tracking-wider">{stat.label}</p>
                        </div>
                      ))}
                    </motion.div>
                  )}

                  {/* Map placeholder */}
                  <div className="w-full bg-[#0f172a] rounded-2xl flex items-center justify-center" style={{ height: 120 }}>
                    {cardashPlaying ? (
                      <div className="relative w-full h-full rounded-2xl overflow-hidden">
                        <div className="absolute inset-0 bg-[#0f172a]" style={{
                          backgroundImage: `linear-gradient(rgba(56,189,248,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,0.1) 1px, transparent 1px)`,
                          backgroundSize: '20px 20px'
                        }} />
                        <motion.div
                          animate={{ x: [-20, 20, -20], y: [-10, 10, -10] }}
                          transition={{ duration: 3, repeat: Infinity }}
                          className="absolute top-1/2 left-1/2 w-3 h-3 bg-sky-400 rounded-full -translate-x-1/2 -translate-y-1/2"
                        >
                          <div className="absolute inset-0 bg-sky-400 rounded-full animate-ping opacity-50" />
                        </motion.div>
                        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[9px] font-mono text-[#38bdf8]">MAPS ACTIVE</div>
                      </div>
                    ) : (
                      <p className="text-[#1e293b] font-mono text-[11px]">Google Maps</p>
                    )}
                  </div>
                </div>

                {/* Play overlay */}
                {!cardashPlaying && (
                  <button
                    onClick={() => setCardashPlaying(true)}
                    className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm rounded-[36px]"
                  >
                    <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center">
                      <Play className="w-6 h-6 text-white ml-1" />
                    </div>
                  </button>
                )}
              </div>
            </PhoneFrame>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div>
              <span className="text-[#0369a1] font-mono text-[10px] font-bold tracking-[0.4em] uppercase opacity-70">FLUTTER · AUTOMOTIVE</span>
              <h3 className="text-5xl font-display font-black tracking-tighter text-[#0a0a0a] uppercase mt-2">CarDash</h3>
            </div>
            <p className="text-[#64748b] text-[15px] leading-relaxed">
              Replaced a missing in-built car display with a full Flutter dashboard. Live GPS speedometer, Google Maps, music shortcuts, Screen Wake Lock so it never dims while driving.
            </p>
            <div className="flex flex-wrap gap-2">
              {['Flutter', 'Dart', 'GPS API', 'Google Maps', 'Android'].map(t => (
                <span key={t} className="text-[10px] font-mono font-bold px-3 py-1.5 bg-[#f1f5f9] rounded-full text-[#475569]">{t}</span>
              ))}
            </div>
            <p className="text-[12px] font-mono text-[#94a3b8] italic">
              → No dependencies. Pure Flutter/Dart.
            </p>
          </motion.div>
        </div>

        {/* Prism Studio — Browser embed */}
        {DEMOS.map(demo => (
          <motion.div
            key={demo.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="flex items-end justify-between">
              <div>
                <span className="text-[#7c3aed] font-mono text-[10px] font-bold tracking-[0.4em] uppercase opacity-70">{demo.tag}</span>
                <h3 className="text-5xl font-display font-black tracking-tighter text-[#0a0a0a] uppercase mt-1">{demo.name}</h3>
                <p className="text-[#64748b] text-[13px] mt-2">{demo.description}</p>
              </div>
              <a
                href={demo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 bg-[#0a0a0a] text-white rounded-full text-[10px] font-mono font-bold tracking-widest uppercase hover:bg-[#7c3aed] transition-colors"
              >
                Open <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
            <BrowserFrame url={demo.url}>
              <iframe
                src={demo.url}
                className="w-full border-0"
                style={{ height: 520 }}
                title={demo.name}
                loading="lazy"
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
              />
            </BrowserFrame>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
