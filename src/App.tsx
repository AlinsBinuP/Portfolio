/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, NavLink } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Github, Linkedin, Mail, Sparkles } from 'lucide-react';
import { Navbar } from './components/Navbar';
import { ContextCursor } from './components/ContextCursor';
import { Preloader } from './components/Preloader';
import { CinematicOverlay } from './components/CinematicOverlay';
import { GlobalMeshBackground } from './components/GlobalMeshBackground';
import { AIChatbot } from './components/AIChatbot';
import { MusicPlayer } from './components/MusicPlayer';
import { DevTerminal } from './components/DevTerminal';
import { ABLogo } from './components/ABLogo';
import { MusicProvider } from './context/MusicContext';

// Lazy load pages for performance
const Home = lazy(() => import('./pages/Home').then(m => ({ default: m.Home })));
const About = lazy(() => import('./pages/About').then(m => ({ default: m.About })));
const Projects = lazy(() => import('./pages/Projects').then(m => ({ default: m.Projects })));
const Skills = lazy(() => import('./pages/Skills').then(m => ({ default: m.Skills })));
const Education = lazy(() => import('./pages/Education').then(m => ({ default: m.Education })));
const Contact = lazy(() => import('./pages/Contact').then(m => ({ default: m.Contact })));

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Premium Loading State for Page Transitions
const PageLoader = () => (
  <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/20 backdrop-blur-3xl">
    <div className="flex items-center gap-4 animate-pulse">
      <ABLogo size={32} />
      <span className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.4em]">Initializing Module...</span>
    </div>
  </div>
);

const PageWrapper = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  return (
    <motion.div
      key={location.pathname}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }} // Faster, lighter transition
    >

      <Suspense fallback={<PageLoader />}>
        {children}
      </Suspense>
    </motion.div>
  );
};

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const onCompleteStable = React.useCallback(() => setIsLoading(false), []);
  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

  return (
    <MusicProvider>
      <Router>
        <ScrollToTop />
        <AnimatePresence>
          {isLoading && (
            <Preloader onComplete={onCompleteStable} />
          )}
        </AnimatePresence>

        <div className="relative min-h-screen">
          <GlobalMeshBackground />
          <CinematicOverlay />
          <div className="noise-overlay" />
          <ContextCursor />
          {!isLoading && (
            <>
              <Navbar theme={theme} toggleTheme={toggleTheme} />

              <main className="relative z-10">
                <AnimatePresence mode="wait">
                  <Routes>
                    <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
                    <Route path="/about" element={<PageWrapper><About /></PageWrapper>} />
                    <Route path="/projects" element={<PageWrapper><Projects /></PageWrapper>} />
                    <Route path="/skills" element={<PageWrapper><Skills /></PageWrapper>} />
                    <Route path="/arsenal" element={<PageWrapper><Skills /></PageWrapper>} />
                    <Route path="/education" element={<PageWrapper><Education /></PageWrapper>} />
                    <Route path="/contact" element={<PageWrapper><Contact /></PageWrapper>} />
                  </Routes>
                </AnimatePresence>
              </main>

              {/* High-End Light Footer */}
              <footer className="py-24 px-8 lg:px-24 bg-white border-t border-gray-50 select-none relative z-30">
                <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 justify-between">

                  {/* Brand & Info */}
                  <div className="flex flex-col gap-8 max-w-sm">
                    <div className="flex items-center gap-4">
                      <ABLogo size={48} />
                      <div className="flex flex-col leading-none">
                        <span className="font-display font-black text-[24px] tracking-tighter text-[#0c0a28]">ALINS</span>
                        <span className="font-display font-black text-[24px] tracking-tighter text-[#0c0a28] opacity-20">BINU</span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-4">
                      <p className="text-sm font-black text-[#0c0a28]/80 uppercase tracking-tight">Flutter Architect & Full Stack Developer</p>
                      <p className="text-[11px] text-gray-400 font-medium leading-relaxed">
                        Crafting experiences that live on the edge of design and technology.
                      </p>
                    </div>
                    <span className="text-[10px] text-gray-300 font-bold uppercase tracking-widest mt-4">© 2025 ALINS BINU. ALL RIGHTS RESERVED.</span>
                  </div>

                  {/* Navigation Columns */}
                  <div className="flex flex-col md:flex-row gap-16 lg:gap-24">

                    {/* Quick Links */}
                    <div className="flex flex-col gap-6">
                      <span className="text-[11px] font-black text-[#0c0a28] uppercase tracking-widest">Quick Links</span>
                      <div className="flex flex-col gap-3">
                        {['Home', 'Projects', 'About', 'Arsenal', 'Contact'].map(l => (
                          <NavLink
                            key={l}
                            to={l === 'Home' ? '/' : `/${l.toLowerCase()}`}
                            onMouseEnter={() => {
                              // Prefetch lazy component on hover
                              const path = l.toLowerCase();
                              if (path === 'about') import('./pages/About');
                              if (path === 'arsenal') import('./pages/Skills');
                              if (path === 'projects') import('./pages/Projects');
                            }}
                            className="text-[10px] text-gray-400 hover:text-[#6366f1] transition-colors font-bold uppercase tracking-widest"
                          >
                            {l}
                          </NavLink>
                        ))}

                      </div>
                    </div>

                    {/* Social Connect */}
                    <div className="flex flex-col gap-6">
                      <span className="text-[11px] font-black text-[#0c0a28] uppercase tracking-widest">Let's Connect</span>
                      <p className="text-[10px] text-gray-400 font-bold uppercase leading-relaxed max-w-[150px]">
                        Let's build something<br />meaningful together.
                      </p>
                      <div className="flex gap-4">
                        {[Github, Linkedin, Mail].map((Icon, i) => (
                          <motion.a
                            key={i}
                            href="#"
                            whileHover={{ y: -4, scale: 1.1 }}
                            className="w-11 h-11 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-white hover:text-[#6366f1] hover:shadow-xl hover:shadow-gray-100 transition-all border border-gray-100/50"
                          >
                            <Icon size={18} />
                          </motion.a>
                        ))}
                      </div>
                    </div>

                  </div>

                  {/* Newsletter Section */}
                  <div className="bg-gray-50/50 p-10 rounded-[40px] border border-gray-100/50 flex flex-col gap-6 max-w-md w-full">
                    <div className="flex flex-col gap-2">
                      <span className="text-[11px] font-black text-[#0c0a28] uppercase tracking-widest">Stay in the Loop</span>
                      <p className="text-[10px] text-gray-400 font-bold uppercase leading-relaxed">
                        Get updates on my projects and thoughts.
                      </p>
                    </div>
                    <div className="flex gap-3 items-center">
                      <input
                        type="email"
                        placeholder="Enter your email"
                        className="bg-white flex-1 px-6 py-4 rounded-2xl text-[10px] text-[#0c0a28] outline-none border border-gray-100 focus:border-indigo-200 transition-all font-bold placeholder:text-gray-300 shadow-sm"
                      />
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="bg-gradient-to-r from-[#8b5cf6] to-[#6366f1] text-white px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-indigo-100 transition-all"
                      >
                        Subscribe
                      </motion.button>
                    </div>
                  </div>

                </div>
              </footer>
              <AIChatbot />
              <MusicPlayer />
              <DevTerminal />
            </>
          )}
        </div>
      </Router>
    </MusicProvider>
  );
}
