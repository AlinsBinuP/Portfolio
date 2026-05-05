/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useScroll } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { ContextCursor } from './components/ContextCursor';
import { StarBackground } from './components/StarBackground';
import { Preloader } from './components/Preloader';
import { CinematicOverlay } from './components/CinematicOverlay';
import { GlobalMeshBackground } from './components/GlobalMeshBackground';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Projects } from './pages/Projects';
import { Skills } from './pages/Skills';
import { Education } from './pages/Education';
import { Contact } from './pages/Contact';
import { AIChatbot } from './components/AIChatbot';
import { MusicPlayer } from './components/MusicPlayer';
import { DevTerminal } from './components/DevTerminal';
import { Magnetic } from './components/Magnetic';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const PageWrapper = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  return (
    <motion.div
      key={location.pathname}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
};

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const onCompleteStable = React.useCallback(() => setIsLoading(false), []);
  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

  return (
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
                  <Route path="/education" element={<PageWrapper><Education /></PageWrapper>} />
                  <Route path="/contact" element={<PageWrapper><Contact /></PageWrapper>} />
                </Routes>
              </AnimatePresence>
            </main>

            <footer className="py-20 px-12 text-center border-t border-[var(--glass-border)] flex flex-col md:flex-row items-center justify-between text-[var(--text-secondary)] bg-[var(--bg-primary)]/80 backdrop-blur-3xl relative z-30">
              <div className="flex flex-col items-center md:items-start gap-2">
                <span className="font-display font-black text-xl text-[var(--text-primary)] uppercase tracking-tighter">
                  ALINS BINU
                </span>
                <span className="font-mono text-[9px] uppercase tracking-[0.4em] font-bold opacity-40">
                  © 2026 — Kerala, India.
                </span>
              </div>
              
              <div className="hidden lg:flex items-center gap-12 text-[9px] font-mono font-bold tracking-[0.4em] opacity-40">
                 <div className="flex items-center gap-3">
                    <motion.div 
                      animate={{ scale: [1, 1.4, 1], opacity: [0.5, 1, 0.5] }} 
                      transition={{ repeat: Infinity, duration: 2 }} 
                      className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.8)]" 
                    />
                    <span>SYSTEM ONLINE</span>
                 </div>
                 <span className="border border-[var(--glass-border)] px-4 py-1 rounded-full opacity-40">64 BIT ENGINE</span>
                 <span>LATENCY: 8MS</span>
              </div>

              <div className="flex gap-10 font-black text-[var(--text-secondary)] text-[10px] tracking-[0.3em] uppercase mt-8 md:mt-0">
                <Magnetic strength={20}>
                  <a href="https://github.com/AlinsBinuP" className="hover:text-[var(--accent-primary)] transition-all">GitHub</a>
                </Magnetic>
                <Magnetic strength={20}>
                  <a href="https://www.linkedin.com/in/alinsbinu/" className="hover:text-[var(--accent-secondary)] transition-all">LinkedIn</a>
                </Magnetic>
              </div>
            </footer>
            <AIChatbot />
            <MusicPlayer />
            <DevTerminal />
          </>
        )}
      </div>
    </Router>
  );
}


