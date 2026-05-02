import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

interface GameObject {
  x: number;
  y: number;
  speed: number;
  type: 'flutter' | 'dart' | 'firebase' | 'bug';
  caught: boolean;
  id: number;
  rotation: number;
  rotationSpeed: number;
}

const EMOJIS = {
  flutter: '💙',
  dart: '🎯',
  firebase: '🔥',
  bug: '❌'
};

export const FlutterGame = ({ active, onClose }: { active: boolean; onClose: () => void }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(12);
  const [gameState, setGameState] = useState<'playing' | 'ended'>('playing');
  const objectsRef = useRef<GameObject[]>([]);
  const requestRef = useRef<number>(0);
  const lastSpawnRef = useRef<number>(0);

  useEffect(() => {
    if (!active) {
      setScore(0);
      setTimeLeft(12);
      setGameState('playing');
      objectsRef.current = [];
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const spawnObject = (timestamp: number) => {
      if (timestamp - lastSpawnRef.current > 800) {
        const rand = Math.random();
        let type: GameObject['type'] = 'flutter';
        if (rand > 0.85) type = 'bug';
        else if (rand > 0.6) type = 'firebase';
        else if (rand > 0.3) type = 'dart';

        objectsRef.current.push({
          x: Math.random() * (width - 100) + 50,
          y: -50,
          speed: Math.random() * 3 + 3,
          type,
          caught: false,
          id: Math.random(),
          rotation: 0,
          rotationSpeed: (Math.random() - 0.5) * 0.1
        });
        lastSpawnRef.current = timestamp;
      }
    };

    const draw = (timestamp: number) => {
      if (gameState !== 'playing') return;
      ctx.clearRect(0, 0, width, height);

      spawnObject(timestamp);

      // Draw objects
      objectsRef.current.forEach(obj => {
        if (obj.caught) return;
        obj.y += obj.speed;
        obj.rotation += obj.rotationSpeed;

        ctx.save();
        ctx.translate(obj.x, obj.y);
        ctx.rotate(obj.rotation);
        ctx.font = '40px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(EMOJIS[obj.type], 0, 0);
        ctx.restore();
      });

      // Remove off-screen objects
      objectsRef.current = objectsRef.current.filter(obj => obj.y < height + 100 && !obj.caught);

      requestRef.current = requestAnimationFrame(draw);
    };

    requestRef.current = requestAnimationFrame(draw);

    const timer = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          clearInterval(timer);
          setGameState('ended');
          cancelAnimationFrame(requestRef.current);
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(requestRef.current);
      clearInterval(timer);
      window.removeEventListener('resize', handleResize);
    };
  }, [active, gameState]);

  const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (gameState !== 'playing') return;
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    objectsRef.current.forEach(obj => {
      if (obj.caught) return;
      const dist = Math.hypot(obj.x - x, obj.y - y);
      if (dist < 45) { // Hit radius
        obj.caught = true;
        if (obj.type === 'bug') {
          setScore(s => s - 20);
        } else {
          setScore(s => s + 10);
        }
      }
    });
  };

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '100%', opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed inset-0 z-[200] overflow-hidden backdrop-blur-sm bg-white/30"
        >
          {gameState === 'playing' && (
            <>
              {/* Timer Bar */}
              <div className="absolute top-0 left-0 w-full h-2 bg-sky-100">
                <motion.div
                  initial={{ width: '100%' }}
                  animate={{ width: '0%' }}
                  transition={{ duration: 12, ease: 'linear' }}
                  className="h-full bg-sky-500"
                />
              </div>
              
              <div className="absolute top-8 left-0 right-0 text-center pointer-events-none">
                <h2 className="font-display font-extrabold text-7xl text-[#0a0a0a] uppercase tracking-tighter">
                  {score}
                </h2>
              </div>
              
              <canvas
                ref={canvasRef}
                onClick={handleClick}
                className="absolute inset-0 cursor-crosshair touch-none"
              />
            </>
          )}

          {gameState === 'ended' && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/80 backdrop-blur-md">
              <h2 className="text-6xl md:text-8xl font-display font-black text-[#0a0a0a] uppercase mb-4 text-center">
                Score: {score}
              </h2>
              <p className="text-2xl font-serif italic text-slate-600 mb-12">
                Not bad. Hire me?
              </p>
              <div className="flex gap-6">
                <Link to="/contact">
                  <button className="bg-[#0a0a0a] text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest text-sm hover:scale-105 transition-transform shadow-xl">
                    Get in touch
                  </button>
                </Link>
                <button
                  onClick={onClose}
                  className="bg-white border border-slate-200 text-[#0a0a0a] px-8 py-4 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-slate-50 hover:scale-105 transition-transform shadow-lg"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
