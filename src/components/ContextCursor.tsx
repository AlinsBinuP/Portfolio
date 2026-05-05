/**
 * ContextCursor.tsx — replaces CinematicCursor.tsx
 * Changes shape/label based on what section/element is hovered.
 * CarDash icon over projects, Flutter logo near skills, etc.
 *
 * SETUP:
 * Replace <CinematicCursor /> in App.tsx with <ContextCursor />
 * Add data-cursor="car" / data-cursor="flutter" / data-cursor="view" to elements.
 */
import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';

type CursorType = 'default' | 'link' | 'view' | 'drag' | 'car' | 'flutter' | 'ai' | 'book';

const CURSOR_CONTENT: Record<CursorType, { label: string; emoji?: string; size: number; border: string; bg: string }> = {
  default:  { label: '',        size: 32,  border: 'rgba(15,23,42,0.2)',  bg: 'transparent' },
  link:     { label: 'ENTER',   size: 64,  border: 'rgba(3,105,161,1)',   bg: 'rgba(3,105,161,0.06)' },
  view:     { label: 'VIEW',    size: 72,  border: 'rgba(3,105,161,1)',   bg: 'rgba(3,105,161,0.08)' },
  drag:     { label: 'DRAG',    size: 72,  border: 'rgba(234,88,12,1)',   bg: 'rgba(234,88,12,0.06)' },
  car:      { label: '🚗',      emoji: '🚗', size: 68, border: 'rgba(14,165,233,1)', bg: 'rgba(14,165,233,0.08)' },
  flutter:  { label: '💙',      emoji: '💙', size: 68, border: 'rgba(2,86,155,1)',   bg: 'rgba(2,86,155,0.08)' },
  ai:       { label: '✦ AI',   size: 72,  border: 'rgba(124,58,237,1)',  bg: 'rgba(124,58,237,0.06)' },
  book:     { label: '📚',      emoji: '📚', size: 68, border: 'rgba(217,119,6,1)',  bg: 'rgba(217,119,6,0.06)' },
};

export const ContextCursor = () => {
  const mx = useMotionValue(0), my = useMotionValue(0);
  const rx = useSpring(mx, { damping: 28, stiffness: 400 });
  const ry = useSpring(my, { damping: 28, stiffness: 400 });
  const [type, setType] = useState<CursorType>('default');
  const [clicked, setClicked] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      mx.set(e.clientX); my.set(e.clientY); setVisible(true);
      const el = e.target as HTMLElement;
      if (!el || !el.closest) return;
      const cursor = el.closest('[data-cursor]')?.getAttribute('data-cursor') as CursorType | null;
      if (cursor && cursor in CURSOR_CONTENT) { setType(cursor); return; }
      if (el.closest('button, a, [role=button]')) { setType('link'); return; }
      if (el.closest('.project-node, [data-drag]')) { setType('drag'); return; }
      setType('default');
    };
    const down = () => setClicked(true);
    const up = () => setClicked(false);
    const leave = () => setVisible(false);
    window.addEventListener('mousemove', move);
    window.addEventListener('mousedown', down);
    window.addEventListener('mouseup', up);
    document.documentElement.addEventListener('mouseleave', leave);
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mousedown', down);
      window.removeEventListener('mouseup', up);
      document.documentElement.removeEventListener('mouseleave', leave);
    };
  }, [mx, my]);

  const cfg = CURSOR_CONTENT[type];

  if (!visible) return null;

  return (
    <>
      {/* Dot */}
      <motion.div className="fixed top-0 left-0 w-1.5 h-1.5 bg-[#0a0a0a] rounded-full z-[11001] pointer-events-none"
        style={{ x: mx, y: my, translateX: '-50%', translateY: '-50%' }} />
      {/* Ring */}
      <motion.div
        className="fixed top-0 left-0 z-[11000] pointer-events-none rounded-full flex items-center justify-center"
        animate={{ width: clicked ? cfg.size * 0.7 : cfg.size, height: clicked ? cfg.size * 0.7 : cfg.size, borderColor: cfg.border, backgroundColor: cfg.bg, scale: clicked ? 0.88 : 1 }}
        transition={{ type: 'spring', stiffness: 350, damping: 22 }}
        // @ts-ignore
        style={{ x: rx, y: ry, translateX: '-50%', translateY: '-50%', border: `1.5px solid ${cfg.border}`, backgroundColor: cfg.bg }}
      >
        <AnimatePresence mode="wait">
          {type !== 'default' && (
            <motion.span key={type} initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.6 }}
              className="text-[9px] font-mono font-black tracking-widest text-[#0a0a0a] select-none"
              style={{ color: cfg.border }}>
              {cfg.label}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
};
