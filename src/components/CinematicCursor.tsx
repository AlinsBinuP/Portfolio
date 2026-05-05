import React, { useState, useEffect } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export const CinematicCursor = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const ringX = useSpring(mouseX, { damping: 30, stiffness: 400 });
  const ringY = useSpring(mouseY, { damping: 30, stiffness: 400 });

  const [isHovering, setIsHovering] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      const target = e.target as HTMLElement;
      setIsHovering(!!target.closest('button, a, .cursor-pointer, .group, .project-node'));
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [mouseX, mouseY]);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-1 h-1 bg-white rounded-full z-[11000] pointer-events-none"
        style={{ x: mouseX, y: mouseY, translateX: '-50%', translateY: '-50%' }}
      />
      <motion.div
        className="fixed top-0 left-0 z-[10000] pointer-events-none rounded-full flex items-center justify-center overflow-visible"
        style={{ x: ringX, y: ringY, translateX: '-50%', translateY: '-50%' }}
        animate={{
          width: isClicked ? 24 : (isHovering ? 80 : 40),
          height: isClicked ? 24 : (isHovering ? 80 : 40),
          border: isHovering ? '1px solid rgba(168, 85, 247, 0.8)' : '1px solid rgba(255, 255, 255, 0.2)',
          backgroundColor: isHovering ? 'rgba(168, 85, 247, 0.1)' : 'transparent',
          boxShadow: isHovering ? '0 0 20px rgba(168, 85, 247, 0.2)' : 'none',
        }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      />
    </>
  );
};
