import React, { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';

export const CustomCursor = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [cursorType, setCursorType] = useState<'default' | 'pointer' | 'text'>('default');
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 250 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const style = window.getComputedStyle(target);
      
      if (style.cursor === 'pointer' || target.tagName === 'BUTTON' || target.tagName === 'A') {
        setCursorType('pointer');
        setIsHovering(true);
      } else if (style.cursor === 'text' || target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
        setCursorType('text');
        setIsHovering(true);
      } else {
        setCursorType('default');
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);
    
    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] hidden md:block">
      {/* Main Ring */}
      <motion.div
        style={{
          translateX: cursorXSpring,
          translateY: cursorYSpring,
          left: -15,
          top: -15,
        }}
        className={`absolute w-8 h-8 border rounded-full transition-colors duration-300 ${
          cursorType === 'pointer' ? 'border-purple-500 scale-150 bg-purple-500/5' : 
          cursorType === 'text' ? 'border-white/50 w-1 h-8 rounded-none' : 
          'border-white/20'
        }`}
      />
      
      {/* Center Dot */}
      <motion.div
        style={{
          translateX: cursorX,
          translateY: cursorY,
          left: -2,
          top: -2,
        }}
        className={`absolute w-1 h-1 bg-white rounded-full transition-transform duration-300 ${
          isHovering ? 'scale-0' : 'scale-100'
        }`}
      />

      {/* Trailing Glow */}
      <motion.div
        style={{
          translateX: cursorXSpring,
          translateY: cursorYSpring,
          left: -40,
          top: -40,
        }}
        className="absolute w-20 h-20 bg-purple-500/5 blur-2xl rounded-full"
      />
    </div>
  );
};
