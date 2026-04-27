import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue, AnimatePresence } from 'framer-motion';

export const CustomCursor = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [hoverType, setHoverType] = useState<'default' | 'link' | 'project'>('default');

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 450 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  const trailX = useSpring(mouseX, { damping: 40, stiffness: 200 });
  const trailY = useSpring(mouseY, { damping: 40, stiffness: 200 });

  useEffect(() => {
    const moveMouse = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a') || target.closest('button')) {
        setIsHovering(true);
        setHoverType('link');
      } else if (target.closest('.project-node') || target.closest('.group')) {
        setIsHovering(true);
        setHoverType('project');
      } else {
        setIsHovering(false);
        setHoverType('default');
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', moveMouse);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', moveMouse);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [mouseX, mouseY]);

  return (
    <>
      {/* Outer Glow Trail */}
      <motion.div
        className="fixed top-0 left-0 w-12 h-12 rounded-full border border-sky-500/20 pointer-events-none z-[9998] mix-blend-screen"
        style={{ x: trailX, y: trailY, translateX: '-50%', translateY: '-50%' }}
        animate={{ scale: isHovering ? 1.5 : 1, opacity: isClicking ? 0 : 1 }}
      />
      
      {/* Main Cursor */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-[#0a0a0a] pointer-events-none z-[9999] mix-blend-difference flex items-center justify-center"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isClicking ? 0.8 : isHovering ? 2.5 : 1,
          backgroundColor: isHovering ? '#ffffff' : 'rgba(255,255,255,0)',
        }}
      >
        <AnimatePresence>
          {isHovering && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="text-[4px] font-black uppercase tracking-[0.2em] text-[#0a0a0a] pointer-events-none text-center leading-none"
            >
              {hoverType === 'project' ? 'DISCOVER' : 'ENTER'}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
};
