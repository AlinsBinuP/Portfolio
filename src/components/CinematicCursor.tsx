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
      setIsHovering(!!target.closest('button, a, .cursor-pointer, .group'));
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
        className="fixed top-0 left-0 w-1 h-1 bg-space-black rounded-full z-[11000] pointer-events-none"
        style={{ x: mouseX, y: mouseY, translateX: '-50%', translateY: '-50%' }}
      />
      <motion.div
        className="fixed top-0 left-0 z-[10000] pointer-events-none rounded-full flex items-center justify-center overflow-visible"
        style={{ x: ringX, y: ringY, translateX: '-50%', translateY: '-50%' }}
        animate={{
          width: isClicked ? 20 : (isHovering ? 65 : 38),
          height: isClicked ? 20 : (isHovering ? 65 : 38),
          border: isHovering ? '1.5px solid rgba(37, 99, 235, 1)' : '1px solid rgba(15, 23, 42, 0.2)',
          backgroundColor: isHovering ? 'rgba(37, 99, 235, 0.05)' : 'rgba(37, 99, 235, 0)',
        }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      />
    </>
  );
};
