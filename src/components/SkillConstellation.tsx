/**
 * SkillConstellation.tsx
 * Interactive skill bubbles — click a skill to see related projects.
 * Uses pure canvas, no D3 needed.
 *
 * SETUP: import { SkillConstellation } from '../components/SkillConstellation';
 */
import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Magnetic } from './Magnetic';

const SKILLS = [
  { name: 'Flutter', size: 60, color: '#02569B', projects: ['CarDash', 'Light Suvara'], x: 0, y: 0, vx: 0, vy: 0 },
  { name: 'Dart', size: 48, color: '#0175C2', projects: ['CarDash', 'Light Suvara'], x: 0, y: 0, vx: 0, vy: 0 },
  { name: 'Firebase', size: 44, color: '#FFCA28', projects: ['Light Suvara'], x: 0, y: 0, vx: 0, vy: 0 },
  { name: 'React', size: 44, color: '#61DAFB', projects: ['Prism Studio', 'Portfolio'], x: 0, y: 0, vx: 0, vy: 0 },
  { name: 'TypeScript', size: 40, color: '#3178C6', projects: ['Prism Studio', 'Portfolio'], x: 0, y: 0, vx: 0, vy: 0 },
  { name: 'Three.js', size: 36, color: 'var(--text-primary)', projects: ['Portfolio'], x: 0, y: 0, vx: 0, vy: 0 },
];

export const SkillConstellation = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodesRef = useRef(SKILLS.map(s => ({ ...s })));
  const mouseRef = useRef({ x: -999, y: -999 });
  const rafRef = useRef(0);
  const [hovered, setHovered] = useState<typeof SKILLS[0] | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    let W = 0, H = 0;

    const resize = () => {
      W = canvas.offsetWidth; H = canvas.offsetHeight;
      canvas.width = W * devicePixelRatio; canvas.height = H * devicePixelRatio;
      ctx.scale(devicePixelRatio, devicePixelRatio);
      nodesRef.current.forEach((n, i) => {
        if (n.x === 0) { n.x = W * 0.1 + Math.random() * W * 0.8; n.y = H * 0.1 + Math.random() * H * 0.8; }
        n.vx = (Math.random() - 0.5) * 0.3; n.vy = (Math.random() - 0.5) * 0.3;
      });
    };
    resize();
    window.addEventListener('resize', resize);

    const tick = () => {
      ctx.clearRect(0, 0, W, H);
      const nodes = nodesRef.current;
      
      // Get theme colors from DOM for canvas
      const styles = getComputedStyle(document.documentElement);
      const accent = styles.getPropertyValue('--accent-primary').trim();
      const textPrimary = styles.getPropertyValue('--text-primary').trim();

      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x, dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 160) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = accent.includes('var') ? 'rgba(79, 70, 229, 0.08)' : `${accent}${Math.floor(0.08 * (1 - dist / 160) * 255).toString(16).padStart(2, '0')}`;
            // Fallback for connecting lines in canvas
            ctx.strokeStyle = `rgba(124, 58, 237, ${0.1 * (1 - dist / 160)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }
      // Update & draw nodes
      let newHovered: typeof SKILLS[0] | null = null;
      nodes.forEach(n => {
        const mx = mouseRef.current.x, my = mouseRef.current.y;
        const dx = mx - n.x, dy = my - n.y, d = Math.sqrt(dx * dx + dy * dy);
        if (d < 120 && d > 0) { n.vx -= dx / d * 0.4; n.vy -= dy / d * 0.4; }
        n.vx *= 0.96; n.vy *= 0.96;
        n.x += n.vx; n.y += n.vy;
        if (n.x < n.size) { n.x = n.size; n.vx *= -1; }
        if (n.x > W - n.size) { n.x = W - n.size; n.vx *= -1; }
        if (n.y < n.size) { n.y = n.size; n.vy *= -1; }
        if (n.y > H - n.size) { n.y = H - n.size; n.vy *= -1; }
        const hover = Math.sqrt((mx - n.x) ** 2 + (my - n.y) ** 2) < n.size;
        if (hover) newHovered = n;
        
        const activeColor = n.color.startsWith('var') ? textPrimary : n.color;

        ctx.save();
        ctx.shadowColor = activeColor; ctx.shadowBlur = hover ? 20 : 8;
        ctx.beginPath(); ctx.arc(n.x, n.y, n.size / 2, 0, Math.PI * 2);
        ctx.fillStyle = hover ? activeColor : `${activeColor}22`;
        ctx.fill();
        ctx.strokeStyle = activeColor; ctx.lineWidth = 1.5; ctx.stroke();
        ctx.restore();
        ctx.fillStyle = hover ? '#fff' : activeColor;
        ctx.font = `bold ${Math.max(9, n.size / 5)}px Inter,sans-serif`;
        ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.fillText(n.name, n.x, n.y);
      });
      setHovered(newHovered);
      if (newHovered) setTooltipPos({ x: newHovered.x, y: newHovered.y - newHovered.size / 2 - 12 });
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(rafRef.current); window.removeEventListener('resize', resize); };
  }, []);

  const handleMouse = (e: React.MouseEvent) => {
    const r = canvasRef.current!.getBoundingClientRect();
    mouseRef.current = { x: e.clientX - r.left, y: e.clientY - r.top };
  };

  return (
    <section className="px-8 md:px-20 py-32 border-t border-[var(--glass-border)] bg-transparent relative overflow-hidden">
      {/* Watercolor Splash Background */}
      <div className="holi-splash w-[900px] h-[900px] bg-[var(--accent-primary)] top-[-20%] left-[-20%] opacity-10" />
      <div className="holi-splash w-[700px] h-[700px] bg-[var(--accent-secondary)] bottom-[-10%] right-[-10%] opacity-10" />
      <div className="holi-splash w-[500px] h-[500px] bg-[var(--accent-tertiary)] top-[30%] right-[10%] opacity-06" />

      <div className="max-w-5xl mx-auto relative z-10">
        <span className="text-[var(--accent-primary)] font-mono text-[11px] font-black tracking-[0.4em] uppercase opacity-90 block mb-6">// SKILL CONSTELLATION</span>
        
        <h2 className="text-6xl md:text-8xl font-display font-black tracking-tighter text-[var(--text-primary)] uppercase mb-12 cursor-default">The Arsenal.</h2>

        <div className="relative bg-[var(--card-bg)] backdrop-blur-3xl rounded-[48px] border border-[var(--glass-border)] overflow-hidden watercolor-border shadow-xl" style={{ height: 520 }}>
          <canvas ref={canvasRef} onMouseMove={handleMouse} onMouseLeave={() => { mouseRef.current = { x: -999, y: -999 }; }} className="w-full h-full cursor-none" />
          
          <AnimatePresence>
            {hovered && (
              <motion.div initial={{ opacity: 0, scale: 0.9, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9 }}
                className="absolute pointer-events-none bg-[var(--card-bg)] backdrop-blur-2xl border border-[var(--glass-border)] rounded-3xl px-8 py-5 shadow-lg z-50 watercolor-border"
                style={{ left: tooltipPos.x, top: tooltipPos.y, transform: 'translateX(-50%)' }}>
                <p className="font-display font-black text-2xl text-[var(--text-primary)] uppercase tracking-tighter">{hovered.name}</p>
                <p className="text-[10px] font-mono font-black text-[var(--accent-primary)] mt-1 uppercase tracking-widest opacity-80">Used in: {hovered.projects.join(' · ')}</p>
              </motion.div>
            )}
          </AnimatePresence>
          
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[9px] font-mono font-black text-[var(--text-primary)] opacity-40 tracking-[0.4em] uppercase whitespace-nowrap">
            Hover to ignite · bubbles repel focus
          </div>
          
          {/* Decorative Corner HUD */}
          <div className="absolute top-8 right-8 text-[8px] font-mono text-[var(--accent-primary)] font-black uppercase tracking-[0.2em] opacity-40">
            ARSENAL_REF: v2.0.4
          </div>
        </div>
      </div>
    </section>
  );
};
