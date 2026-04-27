import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Skill {
  id: string;
  name: string;
  level: number;
  desc: string;
}

interface Bubble {
  skill: Skill;
  orbitRadius: number;
  angle: number;
  speed: number;
  size: number;
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  id: string;
  img: HTMLImageElement;
  isDragging: boolean;
  isHovered: boolean;
}

const SKILL_DATA = {
  core: { id: 'flutter,dart', name: 'Flutter & Dart', level: 95, desc: 'Cross-platform excellence' },
  ring1: [
    { id: 'firebase', name: 'Firebase', level: 90, desc: 'BaaS & Realtime logic' },
    { id: 'androidstudio', name: 'Android Studio', level: 85, desc: 'Native tooling' },
  ],
  ring2: [
    { id: 'git', name: 'Git', level: 88, desc: 'Version control mastery' },
    { id: 'github', name: 'GitHub', level: 90, desc: 'Collaboration & CI/CD' },
    { id: 'vscode', name: 'VS Code', level: 92, desc: 'Primary environment' },
    { id: 'python', name: 'Python', level: 75, desc: 'Scripting & Automation' },
  ],
  ring3: [
    { id: 'java', name: 'Java', level: 70, desc: 'Object-oriented logic' },
    { id: 'c', name: 'C', level: 65, desc: 'Low-level foundations' },
    { id: 'js', name: 'JavaScript', level: 85, desc: 'Web interactivity' },
    { id: 'html', name: 'HTML5', level: 95, desc: 'Semantic structure' },
    { id: 'css', name: 'CSS3', level: 90, desc: 'Stunning layouts' },
  ]
};

export const SkillsUniverse = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const bubblesRef = useRef<Bubble[]>([]);
  const [hoveredSkill, setHoveredSkill] = useState<Skill | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const mouseRef = useRef({ x: 0, y: 0, isDown: false });
  const hoveredSkillRef = useRef<Skill | null>(null);
  const tooltipPosRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = canvas.offsetWidth;
    let height = canvas.offsetHeight;

    const resize = () => {
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = width * window.devicePixelRatio;
      canvas.height = height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    window.addEventListener('resize', resize);
    resize();

    // Initialize bubbles
    const initBubbles = () => {
      const bubbles: Bubble[] = [];
      const rings = [
        { data: SKILL_DATA.ring1, radius: 120, speed: 0.005 },
        { data: SKILL_DATA.ring2, radius: 220, speed: -0.003 },
        { data: SKILL_DATA.ring3, radius: 320, speed: 0.002 },
      ];

      rings.forEach((ring, ringIdx) => {
        ring.data.forEach((skill, i) => {
          const angle = (i / ring.data.length) * Math.PI * 2;
          const img = new Image();
          img.src = `https://skillicons.dev/icons?i=${skill.id.split(',')[0]}`;
          bubbles.push({
            skill,
            orbitRadius: ring.radius,
            angle,
            speed: ring.speed,
            size: ringIdx === 0 ? 50 : ringIdx === 1 ? 45 : 40,
            x: 0,
            y: 0,
            targetX: 0,
            targetY: 0,
            id: skill.id,
            img,
            isDragging: false,
            isHovered: false
          });
        });
      });
      bubblesRef.current = bubbles;
    };

    initBubbles();

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      const centerX = width / 2;
      const centerY = height / 2;

      // Draw Sun (Core)
      const sunGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 70);
      sunGradient.addColorStop(0, 'rgba(3, 105, 161, 0.08)');
      sunGradient.addColorStop(1, 'transparent');
      ctx.fillStyle = sunGradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 70, 0, Math.PI * 2);
      ctx.fill();

      // Draw Rings
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.04)';
      ctx.lineWidth = 1;
      [120, 220, 320].forEach(r => {
        ctx.beginPath();
        ctx.arc(centerX, centerY, r, 0, Math.PI * 2);
        ctx.stroke();
      });

      // Update and Draw Bubbles
      let topHovered: Bubble | null = null;

      bubblesRef.current.forEach(bubble => {
        if (!bubble.isDragging) {
          bubble.angle += bubble.speed;
          bubble.targetX = centerX + Math.cos(bubble.angle) * bubble.orbitRadius;
          bubble.targetY = centerY + Math.sin(bubble.angle) * bubble.orbitRadius;

          // Mouse Repel
          const dx = mouseRef.current.x - bubble.x;
          const dy = mouseRef.current.y - bubble.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
             const angle = Math.atan2(dy, dx);
             const force = (100 - dist) / 10;
             bubble.targetX -= Math.cos(angle) * force;
             bubble.targetY -= Math.sin(angle) * force;
          }

          // Smooth move
          bubble.x += (bubble.targetX - bubble.x) * 0.1;
          bubble.y += (bubble.targetY - bubble.y) * 0.1;
        }

        // Hover detection
        const hdx = mouseRef.current.x - bubble.x;
        const hdy = mouseRef.current.y - bubble.y;
        if (Math.sqrt(hdx * hdx + hdy * hdy) < bubble.size / 2) {
          topHovered = bubble;
        }

        // Draw bubble shadow/glow
        ctx.save();
        ctx.shadowBlur = 10;
        ctx.shadowColor = 'rgba(0, 0, 0, 0.05)';
        
        ctx.beginPath();
        ctx.arc(bubble.x, bubble.y, bubble.size / 2, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 1)';
        ctx.fill();
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.stroke();

        // Draw image
        if (bubble.img.complete) {
          const imgSize = bubble.size * 0.55;
          ctx.drawImage(
            bubble.img, 
            bubble.x - imgSize / 2, 
            bubble.y - imgSize / 2, 
            imgSize, 
            imgSize
          );
        }
        ctx.restore();
      });

      if (topHovered) {
        if (hoveredSkillRef.current?.id !== topHovered.skill.id || 
            Math.abs(tooltipPosRef.current.x - topHovered.x) > 1 || 
            Math.abs(tooltipPosRef.current.y - topHovered.y) > 1) {
          setHoveredSkill(topHovered.skill);
          setTooltipPos({ x: topHovered.x, y: topHovered.y });
          hoveredSkillRef.current = topHovered.skill;
          tooltipPosRef.current = { x: topHovered.x, y: topHovered.y };
        }
        canvas.style.cursor = 'grab';
      } else if (hoveredSkillRef.current !== null) {
        setHoveredSkill(null);
        hoveredSkillRef.current = null;
        canvas.style.cursor = 'default';
      }

      // Draw Sun Label (Simplified)
      ctx.fillStyle = '#0369a1';
      ctx.font = 'black 11px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('CORE / FLUTTER', centerX, centerY + 4);

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseRef.current.x = e.clientX - rect.left;
    mouseRef.current.y = e.clientY - rect.top;
  };

  return (
    <div className="relative w-full h-[700px] bg-[#f8fafc] rounded-[40px] overflow-hidden border border-black/[0.05]">
      <canvas 
        ref={canvasRef}
        onMouseMove={handleMouseMove}
        className="w-full h-full"
      />
      
      <AnimatePresence>
        {hoveredSkill && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            style={{ 
              left: tooltipPos.x, 
              top: tooltipPos.y - 80,
              transform: 'translateX(-50%)'
            }}
            className="absolute z-50 pointer-events-none"
          >
            <div className="bg-white px-6 py-4 border border-black/[0.06] shadow-xl rounded-2xl min-w-[200px]">
               <div className="flex justify-between items-center mb-3">
                  <span className="text-[10px] font-black tracking-widest text-[#0369a1] uppercase">{hoveredSkill.name}</span>
                  <span className="text-[10px] font-bold text-[#64748b]">{hoveredSkill.level}%</span>
               </div>
               <div className="w-full h-1 bg-black/[0.03] rounded-full overflow-hidden mb-3">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${hoveredSkill.level}%` }}
                    className="h-full bg-[#0369a1]" 
                  />
               </div>
               <p className="text-[9px] text-[#94a3b8] italic font-medium uppercase tracking-tighter">{hoveredSkill.desc}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute top-10 left-10 space-y-2">
         <div className="flex items-center gap-3">
            <span className="w-2 h-2 bg-[#0369a1] rounded-full animate-pulse" />
            <span className="text-[10px] font-black tracking-widest text-[#64748b] uppercase opacity-40">Solar Systems Interactive</span>
         </div>
      </div>
    </div>
  );
};
