/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { CinematicCursor } from './components/CinematicCursor';
import { StarBackground } from './components/StarBackground';
import { Preloader } from './components/Preloader';
import { CinematicOverlay } from './components/CinematicOverlay';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Projects } from './pages/Projects';
import { Skills } from './pages/Skills';
import { Education } from './pages/Education';
import { Contact } from './pages/Contact';

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

  return (
    <Router>
      <AnimatePresence>
        {isLoading && (
          <Preloader onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      <div className="relative min-h-screen">
        <CinematicOverlay />
        <div className="noise-overlay" />
        <CinematicCursor />
        {!isLoading && (
          <>
            <StarBackground />
            <Navbar />
            
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

            <footer className="py-20 px-12 text-center border-t border-white/5 flex flex-col md:flex-row items-center justify-between text-white/40 bg-midnight/50 backdrop-blur-md relative z-30">
              <span className="font-mono text-[10px] uppercase tracking-widest font-bold">
                Alins Binu © 2026 — Built with intention.
              </span>
              <div className="flex gap-12 font-bold text-white/50 text-[10px] tracking-widest uppercase">
                <a href="https://github.com/alinsbinu" className="hover:text-sky-blue-glow transition-colors">GitHub</a>
                <a href="https://linkedin.com/in/alinsbinu" className="hover:text-sky-blue-glow transition-colors">LinkedIn</a>
                <a href="#" className="hover:text-sky-blue-glow transition-colors">Email</a>
              </div>
            </footer>
          </>
        )}
      </div>
    </Router>
  );
}


