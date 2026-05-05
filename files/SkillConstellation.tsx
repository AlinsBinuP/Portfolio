/**
 * SkillConstellation.tsx
 * Interactive skill bubbles — click a skill to see related projects.
 * Uses pure canvas, no D3 needed.
 *
 * SETUP: import { SkillConstellation } from '../components/SkillConstellation';
 */
import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SKILLS = [
  { name: 'Flutter', size: 60, color: '#02569B', projects: ['CarDash', 'Light Suvara'], x: 0, y: 0, vx: 0, vy: 0 },
  { name: 'Dart', size: 48, color: '#0175C2', projects: ['CarDash', 'Light Suvara'], x: 0, y: 0, vx: 0, vy: 0 },
  { name: 'Firebase', size: 44, color: '#FFCA28', projects: ['Light Suvara'], x: 0, y: 0, vx: 0, vy: 0 },
  { name: 'React', size: 44, color: '#61DAFB', projects: ['Prism Studio', 'Portfolio'], x: 0, y: 0, vx: 0, vy: 0 },
  { name: 'TypeScript', size: 40, color: '#3178C6', projects: ['Prism Studio', 'Portfolio'], x: 0, y: 0, vx: 0, vy: 0 },
  { name: 'Three.js', size: 36, color: '#000000', projects: ['Portfolio'], x: 0, y: 0, vx: 0, vy: 0 },
  { name: 'GSAP', size: 36, color: '#88CE02', projects: ['Portfolio'], x: 0, y: 0, vx: 0, vy: 0 },
  { name: 'Python', size: 38, color: '#3776AB', projects: ['AI tools'], x: 0, y: 0, vx: 0, vy: 0 },
  { name: 'Tailwind', size: 36, color: '#06B6D4', projects: ['Prism Studio', 'Portfolio'], x: 0, y: 0, vx: 0, vy: 0 },
  { name: 'Git', size: 34, color: '#F05032', projects: ['All projects'], x: 0, y: 0, vx: 0, vy: 0 },
  { name: 'Java', size: 32, color: '#007396', projects: ['University work'], x: 0, y: 0, vx: 0, vy: 0 },
  { name: 'Gemini AI', size: 34, color: '#8B5CF6', projects: ['Portfolio', 'Prism Studio'], x: 0, y: 0, vx: 0, vy: 0 },
];

export const SkillConstellation = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodesRef = useRef(SKILLS.map(s => ({ ...s })));
  const mouseRef = useRef({ x: -999, y: -999 });
  const [hovered, setHovered] = useState<typeof SKILLS[0] | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const rafRef = useRef(0);

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
      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x, dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 160) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(3,105,161,${0.08 * (1 - dist / 160)})`;
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
        ctx.save();
        ctx.shadowColor = n.color; ctx.shadowBlur = hover ? 20 : 8;
        ctx.beginPath(); ctx.arc(n.x, n.y, n.size / 2, 0, Math.PI * 2);
        ctx.fillStyle = hover ? n.color : `${n.color}22`;
        ctx.fill();
        ctx.strokeStyle = n.color; ctx.lineWidth = 1.5; ctx.stroke();
        ctx.restore();
        ctx.fillStyle = hover ? '#fff' : n.color;
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
    <section className="px-8 md:px-20 py-32 border-t border-black/[0.06] bg-transparent">
      <div className="max-w-5xl mx-auto">
        <span className="text-[#0369a1] font-mono text-[11px] font-bold tracking-[0.4em] uppercase opacity-70 block mb-4">// SKILL CONSTELLATION</span>
        <h2 className="text-5xl md:text-6xl font-display font-black tracking-tighter text-[#0a0a0a] uppercase mb-8">The Arsenal.</h2>
        <div className="relative bg-[#f8fafc] rounded-[32px] border border-black/[0.05] overflow-hidden" style={{ height: 480 }}>
          <canvas ref={canvasRef} onMouseMove={handleMouse} onMouseLeave={() => { mouseRef.current = { x: -999, y: -999 }; }} className="w-full h-full cursor-none" />
          <AnimatePresence>
            {hovered && (
              <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                className="absolute pointer-events-none bg-white border border-black/[0.08] rounded-2xl px-5 py-3 shadow-xl"
                style={{ left: tooltipPos.x, top: tooltipPos.y, transform: 'translateX(-50%)' }}>
                <p className="font-bold text-[13px] text-[#0a0a0a]">{hovered.name}</p>
                <p className="text-[11px] text-[#64748b] mt-0.5">Used in: {hovered.projects.join(' · ')}</p>
              </motion.div>
            )}
          </AnimatePresence>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[10px] font-mono text-[#94a3b8] tracking-widest uppercase">
            Hover to interact · bubbles repel cursor
          </div>
        </div>
      </div>
    </section>
  );
};
