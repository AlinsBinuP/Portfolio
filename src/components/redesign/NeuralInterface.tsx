import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Send, ChevronRight, Sparkles, Code2, Globe, Laptop, Smartphone } from 'lucide-react';

const SYSTEM_RESPONSES: Record<string, string[]> = {
  'init': ['ALINS_OS v4.0.1 sequence initiated...', 'Loading neural architecture...', 'Status: OPTIMIZED'],
  'stack': ['Core: Flutter/Dart (Mobile)', 'Web: React/TypeScript/Vite', '3D: Three.js/Framer Motion'],
  'vision': ['Crafting intentional products.', 'Merging aesthetics with performance.', 'Redefining digital boundaries.'],
  'contact': ['Signal source: Kattappana, IN', 'Primary link: alinsbinukochuthovala@gmail.com', 'Ready for transmission.'],
};

export const NeuralInterface = () => {
  const [logs, setLogs] = useState<string[]>(SYSTEM_RESPONSES.init);
  const [activeTab, setActiveTab] = useState('init');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  const handleCommand = (cmd: string) => {
    setActiveTab(cmd);
    const newLogs = SYSTEM_RESPONSES[cmd] || [`Command ${cmd} not recognized.`];
    setLogs(prev => [...prev, `> RUN system_query --${cmd}`, ...newLogs]);
  };

  return (
    <div className="w-full max-w-sm bg-[#0c0a28] rounded-3xl border border-indigo-500/20 shadow-[0_30px_60px_rgba(0,0,0,0.4)] overflow-hidden flex flex-col h-[280px]">
      {/* Header */}
      <div className="px-5 py-3 border-b border-white/5 bg-white/[0.02] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            <div className="w-2 h-2 rounded-full bg-red-500/50" />
            <div className="w-2 h-2 rounded-full bg-amber-500/50" />
            <div className="w-2 h-2 rounded-full bg-emerald-500/50" />
          </div>
          <span className="text-[10px] font-mono text-indigo-300/60 ml-2 tracking-widest uppercase">Neural Interface</span>
        </div>
        <Sparkles size={12} className="text-indigo-400 animate-pulse" />
      </div>

      {/* Terminal View */}
      <div 
        ref={scrollRef}
        className="flex-1 p-5 font-mono text-[11px] overflow-y-auto custom-scrollbar bg-black/20"
      >
        <AnimatePresence mode="popLayout">
          {logs.map((log, i) => (
            <motion.div
              key={i + log}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className={`mb-1 ${log.startsWith('>') ? 'text-indigo-400' : 'text-gray-400'}`}
            >
              {log}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Navigation Controls */}
      <div className="p-2 border-t border-white/5 bg-white/[0.01] flex gap-1 justify-around">
        {[
          { id: 'stack', icon: Code2, label: 'Stack' },
          { id: 'vision', icon: Sparkles, label: 'Vision' },
          { id: 'contact', icon: Globe, label: 'Signal' }
        ].map((btn) => (
          <button
            key={btn.id}
            onClick={() => handleCommand(btn.id)}
            className={`flex-1 flex flex-col items-center py-2 rounded-xl transition-all ${
              activeTab === btn.id ? 'bg-indigo-600/20 text-indigo-300' : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'
            }`}
          >
            <btn.icon size={14} className="mb-1" />
            <span className="text-[9px] font-black uppercase tracking-tighter">{btn.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
