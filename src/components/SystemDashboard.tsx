import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Activity, Cpu, Database, Zap } from 'lucide-react';

export const SystemDashboard = () => {
  const [metrics, setMetrics] = useState({
    cpu: 12,
    memory: 45,
    latency: 12,
    throughput: 89
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics({
        cpu: Math.floor(Math.random() * 20) + 10,
        memory: Math.floor(Math.random() * 5) + 42,
        latency: Math.floor(Math.random() * 4) + 10,
        throughput: Math.floor(Math.random() * 10) + 85
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const MetricItem = ({ icon: Icon, label, value, unit, color }: any) => (
    <div className="flex items-center gap-4 group">
      <div className={`p-2 rounded-lg bg-[var(--bg-secondary)] border border-[var(--glass-border)] transition-colors shadow-sm`}>
        <Icon size={14} className={`text-[var(--accent-primary)]`} />
      </div>
      <div className="flex flex-col">
        <span className="text-[9px] font-mono font-bold text-[var(--text-secondary)] tracking-widest uppercase">{label}</span>
        <div className="flex items-baseline gap-1">
          <span className="text-sm font-display font-black text-[var(--text-primary)]">{value}</span>
          <span className="text-[8px] font-mono text-[var(--text-secondary)] opacity-50">{unit}</span>
        </div>
      </div>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      className="fixed right-8 bottom-8 z-[60] hidden lg:block"
    >
      <div className="editorial-card p-6 min-w-[220px] relative overflow-hidden group">
        {/* Animated Accent Line */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan-500 via-purple-500 to-indigo-500 bg-[length:200%_100%] animate-ticker" />
        
        <div className="flex items-center gap-3 mb-6">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
          <span className="text-[10px] font-mono font-black tracking-[0.3em] uppercase text-[var(--text-primary)]">System Node Active</span>
        </div>

        <div className="space-y-4">
          <MetricItem icon={Cpu} label="Neural Load" value={metrics.cpu} unit="%" color="cyan" />
          <MetricItem icon={Database} label="Memory Stack" value={metrics.memory} unit="GB" color="purple" />
          <MetricItem icon={Zap} label="Latency" value={metrics.latency} unit="MS" color="amber" />
          <MetricItem icon={Activity} label="Throughput" value={metrics.throughput} unit="OPS" color="indigo" />
        </div>

        {/* Micro-graph mock */}
        <div className="mt-6 pt-4 border-t border-[var(--glass-border)] flex items-end gap-1 h-8">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ height: [10, Math.random() * 20 + 10, 10] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
              className="w-full bg-[var(--accent-primary)]/20 rounded-t-[1px]"
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};
