/**
 * DevTerminal.tsx
 * Hidden terminal easter egg — triggered by pressing ` (backtick) anywhere on the site.
 * Visitors can type commands: open projects, change theme, see skills, etc.
 *
 * SETUP:
 * 1. import { DevTerminal } from './components/DevTerminal';
 * 2. Place <DevTerminal /> in App.tsx (inside Router, outside other components)
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

interface TerminalLine {
  type: 'input' | 'output' | 'error' | 'success' | 'info';
  content: string;
}

const COMMANDS: Record<string, (navigate: (path: string) => void) => TerminalLine[]> = {
  help: () => [
    { type: 'info', content: '┌─ AVAILABLE COMMANDS ──────────────────────────┐' },
    { type: 'output', content: '  nav <page>     → navigate (home|projects|about|skills|contact)' },
    { type: 'output', content: '  projects        → list all projects' },
    { type: 'output', content: '  skills          → show skill tree' },
    { type: 'output', content: '  whoami          → identity' },
    { type: 'output', content: '  stack           → tech stack' },
    { type: 'output', content: '  github          → open GitHub profile' },
    { type: 'output', content: '  linkedin        → open LinkedIn' },
    { type: 'output', content: '  hire            → are you hiring?' },
    { type: 'output', content: '  clear            → clear terminal' },
    { type: 'info', content: '└────────────────────────────────────────────────┘' },
  ],

  whoami: () => [
    { type: 'success', content: '▶ ALINS BINU' },
    { type: 'output', content: '  Role       → Flutter Developer' },
    { type: 'output', content: '  Location   → Kattappana, Idukki, Kerala 🌿' },
    { type: 'output', content: '  Status     → Final year B.Tech CS @ AJCE' },
    { type: 'output', content: '  Vibe       → Building real products, obsessing over motion design' },
  ],

  projects: () => [
    { type: 'success', content: '▶ PROJECT ARCHIVE' },
    { type: 'output', content: '  [01] Light Suvara   → Flutter · Firebase · Church Hub · Play Store LIVE' },
    { type: 'output', content: '  [02] Prism Studio   → React · AI · 12+ Tools · prismstudioai.vercel.app' },
    { type: 'output', content: '  [03] CarDash        → Flutter · GPS · Automotive · WIP' },
    { type: 'info', content: '  Type "nav projects" to see full archive' },
  ],

  skills: () => [
    { type: 'success', content: '▶ SKILL TREE' },
    { type: 'output', content: '  ████████████  Flutter/Dart     (95%)' },
    { type: 'output', content: '  ████████████  Firebase         (90%)' },
    { type: 'output', content: '  ████████████  React/TypeScript (85%)' },
    { type: 'output', content: '  ██████████░░  Python           (75%)' },
    { type: 'output', content: '  █████████░░░  Java             (70%)' },
    { type: 'info', content: '  + Three.js · GSAP · Framer Motion · Tailwind CSS' },
  ],

  stack: () => [
    { type: 'success', content: '▶ CURRENT TECH STACK' },
    { type: 'output', content: '  Mobile  → Flutter · Dart · Firebase · Android Studio' },
    { type: 'output', content: '  Web     → React · TypeScript · Vite · Tailwind CSS v4' },
    { type: 'output', content: '  3D/Fx   → Three.js · GSAP · Framer Motion · @react-three/fiber' },
    { type: 'output', content: '  Deploy  → Vercel · GitHub Pages · Google Play Store' },
  ],

  hire: () => [
    { type: 'success', content: '▶ ARE YOU HIRING?' },
    { type: 'output', content: '  Yes! Alins is actively looking for opportunities.' },
    { type: 'output', content: '  Open to internships, part-time, or freelance Flutter work.' },
    { type: 'info', content: '  → alinsbinukochuthovala@gmail.com' },
    { type: 'info', content: '  Type "nav contact" to get in touch' },
  ],

  github: (navigate) => {
    window.open('https://github.com/AlinsBinuP', '_blank');
    return [{ type: 'success', content: '✓ Opening GitHub profile...' }];
  },

  linkedin: () => {
    window.open('https://www.linkedin.com/in/alinsbinu/', '_blank');
    return [{ type: 'success', content: '✓ Opening LinkedIn...' }];
  },
};

export const DevTerminal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [lines, setLines] = useState<TerminalLine[]>([
    { type: 'info', content: '╔══════════════════════════════════════════╗' },
    { type: 'info', content: '║      ALINS BINU · PORTFOLIO TERMINAL     ║' },
    { type: 'info', content: '╚══════════════════════════════════════════╝' },
    { type: 'output', content: 'Type "help" for available commands.' },
  ]);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === '`' && !e.ctrlKey && !e.metaKey) {
        const tag = (e.target as HTMLElement).tagName;
        if (tag === 'INPUT' || tag === 'TEXTAREA') return;
        e.preventDefault();
        setIsOpen(o => !o);
      }
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 100);
  }, [isOpen]);

  useEffect(() => {
    outputRef.current?.scrollTo(0, outputRef.current.scrollHeight);
  }, [lines]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const raw = input.trim();
    if (!raw) return;

    setHistory(h => [raw, ...h]);
    setHistoryIdx(-1);
    setLines(l => [...l, { type: 'input', content: `> ${raw}` }]);
    setInput('');

    const parts = raw.toLowerCase().split(' ');
    const cmd = parts[0];
    const arg = parts[1];

    if (cmd === 'clear') {
      setLines([{ type: 'output', content: 'Terminal cleared. Type "help" to start.' }]);
      return;
    }

    if (cmd === 'nav' && arg) {
      const routes: Record<string, string> = {
        home: '/', projects: '/projects', about: '/about',
        skills: '/skills', education: '/education', contact: '/contact'
      };
      if (routes[arg]) {
        navigate(routes[arg]);
        setIsOpen(false);
        setLines(l => [...l, { type: 'success', content: `✓ Navigating to /${arg}...` }]);
      } else {
        setLines(l => [...l, { type: 'error', content: `✗ Unknown page: "${arg}". Try: home|projects|about|skills|contact` }]);
      }
      return;
    }

    if (COMMANDS[cmd]) {
      const result = COMMANDS[cmd](navigate);
      setLines(l => [...l, ...result]);
    } else {
      setLines(l => [...l, { type: 'error', content: `✗ Command not found: "${raw}". Type "help" for commands.` }]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      const newIdx = Math.min(historyIdx + 1, history.length - 1);
      setHistoryIdx(newIdx);
      setInput(history[newIdx] || '');
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const newIdx = Math.max(historyIdx - 1, -1);
      setHistoryIdx(newIdx);
      setInput(newIdx === -1 ? '' : history[newIdx]);
    }
  };

  const lineColor: Record<string, string> = {
    input: 'text-[var(--accent-primary)]',
    output: 'text-[var(--text-secondary)]',
    error: 'text-red-500 dark:text-red-400',
    success: 'text-emerald-600 dark:text-emerald-400',
    info: 'text-[var(--text-secondary)] opacity-60',
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-[600] bg-black/40 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.97 }}
            transition={{ type: 'spring', damping: 25, stiffness: 400 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[601] w-[680px] max-w-[95vw] bg-[var(--card-bg)] rounded-[20px] border border-[var(--glass-border)] shadow-[0_40px_80px_rgba(0,0,0,0.4)] overflow-hidden"
          >
            {/* Terminal Titlebar */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-[var(--glass-border)] bg-[var(--bg-secondary)]">
              <div className="flex items-center gap-2">
                <button onClick={() => setIsOpen(false)} className="w-3 h-3 rounded-full bg-[#ff5f57] hover:opacity-80" />
                <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                <div className="w-3 h-3 rounded-full bg-[#28c840]" />
              </div>
              <span className="text-[11px] font-mono text-[var(--text-secondary)]/60">alins@portfolio ~ /terminal</span>
              <span className="text-[10px] font-mono text-[var(--text-secondary)]/40">Press ` to close</span>
            </div>

            {/* Output */}
            <div ref={outputRef} className="px-5 py-4 h-64 overflow-y-auto font-mono text-[12px] leading-[1.8] space-y-0.5 bg-[var(--bg-primary)]/50">
              {lines.map((line, i) => (
                <div key={i} className={lineColor[line.type]}>
                  {line.content}
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="px-5 py-3 border-t border-[var(--glass-border)] bg-[var(--bg-secondary)]">
              <form onSubmit={handleSubmit} className="flex items-center gap-2">
                <span className="text-emerald-500 dark:text-emerald-400 font-mono text-[12px]">$</span>
                <input
                  ref={inputRef}
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1 bg-transparent font-mono text-[12px] text-[var(--text-primary)] outline-none placeholder:text-[var(--text-secondary)]/30 caret-emerald-500"
                  placeholder="type a command..."
                  spellCheck={false}
                  autoComplete="off"
                />
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
