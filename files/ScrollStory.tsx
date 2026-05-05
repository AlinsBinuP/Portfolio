/**
 * ScrollStory.tsx
 * Scroll-driven storytelling — each scroll step animates a chapter of Alins's story.
 * Uses Framer Motion scroll instead of GSAP to avoid SSR issues, same visual effect.
 *
 * SETUP:
 * import { ScrollStory } from '../components/ScrollStory';
 * Add as a full section in Home.tsx — replace the "05 // FOUNDATION" section or add before it.
 */

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';

interface Chapter {
  id: string;
  year: string;
  label: string;
  title: string;
  subtitle: string;
  body: string;
  accent: string;
  icon: string;
}

const CHAPTERS: Chapter[] = [
  {
    id: 'origin',
    year: '2019',
    label: 'The Beginning',
    title: 'Kattappana,\nIdukki.',
    subtitle: 'Where it all started',
    body: 'Grew up in the hills of Idukki, Kerala. Picked up a computer, opened a text editor, and never really stopped. The quiet of the Western Ghats gave plenty of time to think about how things work.',
    accent: '#0369a1',
    icon: '🌿',
  },
  {
    id: 'flutter',
    year: '2021',
    label: 'The Tool',
    title: 'Started\nFlutter.',
    subtitle: 'One framework. Infinite possibilities.',
    body: 'Discovered Flutter while looking for a way to build something real for Android. The hot reload, the widget tree, the Dart language — it clicked immediately. Three years and counting.',
    accent: '#02569B',
    icon: '💙',
  },
  {
    id: 'cardash',
    year: '2022',
    label: 'First Real Build',
    title: 'Built\nCarDash.',
    subtitle: 'Scratching your own itch',
    body: 'The car had no dashboard screen. Instead of complaining, I built one — a full Flutter app with GPS speedometer, Google Maps, music shortcuts, and a night mode. No dependencies. Pure Flutter/Dart.',
    accent: '#0ea5e9',
    icon: '🚗',
  },
  {
    id: 'prism',
    year: '2023',
    label: 'Going Broader',
    title: 'Shipped\nPrism Studio.',
    subtitle: '12+ AI tools. One webapp.',
    body: 'Built a multi-modal AI powerhouse with React + Vite. Image generation, background removal, deepfake detection, PDF tools, and more — all in one place. Deployed on Vercel, used by real people.',
    accent: '#7c3aed',
    icon: '🔮',
  },
  {
    id: 'lightsuvara',
    year: '2024',
    label: 'Community',
    title: 'Light Suvara\nGoes Live.',
    subtitle: 'Real users. Real impact.',
    body: 'Co-built a Flutter + Firebase app for a church community — announcements, event schedules, prayer requests, Sunday School management. It hit the Play Store and people started using it every single day.',
    accent: '#3b82f6',
    icon: '🏛️',
  },
  {
    id: 'now',
    year: '2026',
    label: 'Right Now',
    title: 'Final Year.\nStill Building.',
    subtitle: 'The story continues.',
    body: 'Finishing B.Tech CS at AJCE, deepening expertise in algorithms, ML, and system design. Portfolio rebuilt from scratch. Looking for the next great problem to solve with Flutter.',
    accent: '#059669',
    icon: '🚀',
  },
];

const ChapterBlock = ({ chapter, index }: { chapter: Chapter; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: 0.5 });

  return (
    <div ref={ref} className="min-h-screen flex items-center justify-center sticky top-0">
      <motion.div
        animate={{
          opacity: isInView ? 1 : 0.15,
          scale: isInView ? 1 : 0.92,
          y: isInView ? 0 : 40,
        }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-4xl w-full mx-auto px-8 md:px-20"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          {/* Left — Year + Label */}
          <div className="space-y-6">
            <motion.div
              animate={{ x: isInView ? 0 : -30, opacity: isInView ? 1 : 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <span
                className="text-[11px] font-mono font-bold tracking-[0.4em] uppercase block mb-3 opacity-60"
                style={{ color: chapter.accent }}
              >
                {chapter.year} · {chapter.label}
              </span>
              <h2
                className="text-6xl md:text-8xl font-display font-black tracking-tighter leading-[0.85] uppercase text-[#0a0a0a]"
                style={{ whiteSpace: 'pre-line' }}
              >
                {chapter.title}
              </h2>
            </motion.div>

            <motion.div
              animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : -20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center gap-3"
            >
              <div className="h-[2px] w-12 rounded-full" style={{ background: chapter.accent }} />
              <span className="text-[13px] font-sans text-[#64748b] italic">{chapter.subtitle}</span>
            </motion.div>
          </div>

          {/* Right — Content card */}
          <motion.div
            animate={{
              opacity: isInView ? 1 : 0,
              x: isInView ? 0 : 30,
              rotateY: isInView ? '0deg' : '8deg',
            }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="bg-white border border-black/[0.06] rounded-[32px] p-10 shadow-2xl relative overflow-hidden"
            style={{ transformPerspective: '1000px', transformOrigin: 'left center' }}
          >
            {/* Accent line */}
            <div
              className="absolute top-0 left-0 right-0 h-[3px]"
              style={{ background: `linear-gradient(90deg, ${chapter.accent}, ${chapter.accent}50, transparent)` }}
            />

            {/* Big emoji */}
            <div className="text-5xl mb-6">{chapter.icon}</div>

            <p className="text-[15px] text-[#374151] leading-[1.8] font-sans">{chapter.body}</p>

            {/* Progress dots */}
            <div className="flex items-center gap-2 mt-8">
              {CHAPTERS.map((_, i) => (
                <div
                  key={i}
                  className="h-1 rounded-full transition-all duration-500"
                  style={{
                    width: i === index ? 24 : 6,
                    background: i === index ? chapter.accent : '#e2e8f0',
                  }}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export const ScrollStory = () => {
  return (
    <section className="relative bg-transparent overflow-hidden border-t border-black/[0.06]">
      {/* Ambient background that shifts per chapter */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-1/3 left-1/3 w-[600px] h-[400px] bg-sky-50/40 blur-[150px] rounded-full" />
      </div>

      {/* Section label — fixed while scrolling */}
      <div className="sticky top-32 z-10 px-8 md:px-20 pointer-events-none">
        <span className="text-[#0369a1] font-mono text-[11px] font-bold tracking-[0.4em] uppercase opacity-70">
          // THE STORY
        </span>
      </div>

      {/* Scroll offset so label appears before chapters */}
      <div style={{ height: '20vh' }} />

      {/* Chapters — stacked, each takes full viewport */}
      <div className="relative" style={{ height: `${CHAPTERS.length * 80}vh` }}>
        <div className="sticky top-0 h-screen overflow-hidden">
          {CHAPTERS.map((chapter, index) => (
            <div
              key={chapter.id}
              className="absolute inset-0"
              style={{ zIndex: index }}
            >
              <ChapterBlock chapter={chapter} index={index} />
            </div>
          ))}
        </div>
      </div>

      {/* Spacer */}
      <div style={{ height: '20vh' }} />
    </section>
  );
};

/**
 * ALTERNATIVE: For the full GSAP ScrollTrigger version (more precise scrubbing):
 *
 * Install: npm install gsap
 *
 * Then replace the ChapterBlock useInView logic with:
 *
 * import { gsap } from 'gsap';
 * import { ScrollTrigger } from 'gsap/ScrollTrigger';
 * gsap.registerPlugin(ScrollTrigger);
 *
 * useEffect(() => {
 *   const ctx = gsap.context(() => {
 *     chapters.forEach((chapter, i) => {
 *       ScrollTrigger.create({
 *         trigger: `.chapter-${i}`,
 *         start: 'top center',
 *         end: 'bottom center',
 *         onEnter: () => setActiveChapter(i),
 *         onEnterBack: () => setActiveChapter(i),
 *       });
 *     });
 *   });
 *   return () => ctx.revert();
 * }, []);
 */
